import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import encrypt from '../encrypt'
import connectDB from '@config/connectDB'
import User from '@models/users'
import Account from '@models/accounts'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@utils/nextauth/adapter"

const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //   allowDangerousEmailAccountLinking: true
    // }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: 465,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize (credentials)
      {
        // console.log(credentials)
        // check for credentials
        if (!credentials.email || !credentials.password)
        {
          return { error: 'Email & password required' }
        }

        //connect DB
        await connectDB()

        // check for user
        const user = await User.findOne({ email: credentials.email })
        // if no user return null
        if (!user)
        {
          return { error: 'Please check your credentials and try again.' }
        }

        //compare PW 
        const matched = await bcrypt.compare(credentials.password, user.password)

        // if pw dont match return null 
        if (!matched)
        {
          return { error: 'Please check your credentials and try again.' }
        }

        // return user if everything checks out 
        return user
      }
    }),
  ],
  session: {
    strategy: 'jwt',
    // maxAge: 30 * 24 * 60 * 60,
    // updateAge: 24 * 60 * 60
  },
  secret: process.env.NEXTAUTH_SECRET,
  // debug: true,
  callbacks: {
    //Invoked on successful signin 
    async signIn ({ account, profile, user })
    {

      // console.log('ACCOUNT:   ' + account)
      // console.log('PROFILE:   ' + profile)
      // console.log('USER:   ' + user)

      // if no user found return false
      if (user?.error)
      {
        return false
      }

      //return true to allow signIn 
      return true
    },
    async jwt ({ token, account, profile })
    {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account)
      {
        token.accessToken = account.access_token
        token.id = token.sub || profile.id || account.providerAccountId
      }
      return token
    },
    //Modify session object 
    async session ({ session, token, user })
    {
      // console.log(token)
      // console.log(session)

      // connect database 
      await connectDB()

      // find user to add to session 
      const findUser = await User.findById(token.id).select('-password').select('-createdAt').select('-updatedAt')

      const account = await Account.findById(findUser.accountId)

      //assign User to session 
      session.user = findUser
      session.account = account
      session.shops = account.populate('shops') || null
      session.accessToken = token.accessToken

      //return session 
      return session
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: null, // Error code passed in query string as ?error=
    // verifyRequest: null, // (used for check email message)
    // newUser: '/dashboard/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
}

export { authOptions }