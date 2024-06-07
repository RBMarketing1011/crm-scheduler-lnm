import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import encrypt from './encrypt'
import connectDB from '@config/connectDB'
import User from '@models/users'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@utils/adapter"

const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
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
        email: { label: 'Email', type: 'text', placeholder: 'username@example.com' },
        password: { label: 'Password', type: 'password', placeholder: '******' }
      },
      async authorize (credentials)
      {
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
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    //Invoked on successful signin 
    async signIn ({ account, profile, user })
    {

      if (user?.error)
      {
        throw new Error(user.error)
      }

      // profile === user signed in with oAuth provider
      if (account.provider === 'google')
      {
        // connect database
        await connectDB()
        // create user
        const firstname = profile.given_name
        const lastname = profile.family_name
        const email = profile.email
        const password = await encrypt(profile.sub)
        const image = profile.picture
        const phone = null
        const address1 = null
        const address2 = null
        const city = null
        const state = null
        const zip = null
        const fullAddress = null
        const okForMarketing = true
        const emailVerified = true
        const deletedDate = null

        const userExists = await User.findOne({ email })
        // if user exists login
        if (userExists)
        {
          return true
        } else // if user dont exist create user
        {
          await User.create({ firstname, lastname, email, password, image, phone, address: { address1, address2, city, state, zip, fullAddress }, okForMarketing, emailVerified, deletedDate })
        }
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
      // connect database 
      await connectDB()

      // find user to add to session 
      const findUser = await User.findById(token.id).select('-password').select('-createdAt').select('-updatedAt')

      //assign User to session 
      session.user = findUser
      session.accessToken = token.accessToken

      //return session 
      return session
    }
  },
  pages: {
    signIn: '/login',
    error: null
  }
}

export { authOptions }