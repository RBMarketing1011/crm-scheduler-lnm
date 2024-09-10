import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import connectDB from '@db/connectDB'
import Employee from '@db/models/employees'
import Account from '@db/models/accounts'
import Appointment from '@db/models/appointments'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from './adapter'

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
          throw new Error('Email & password required')
        }

        //connect DB
        await connectDB()

        // check for user
        const user = await Employee.findOne({ email: credentials.email })
        // if no user return null
        if (!user)
        {
          throw new Error('Please check your credentials and try again.')
        }

        //compare PW 
        const matched = await bcrypt.compare(credentials.password, user.password)

        // if pw dont match return null 
        if (!matched)
        {
          throw new Error('Please check your credentials and try again.')
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

      // connect database 
      await connectDB()

      // find user to add to session 
      const findUser = await Employee.findById(token.id).select('-password').select('-createdAt').select('-updatedAt')

      let account = await Account.findById(findUser.accountId)

      if (account.shops.length <= 0 && account.employees.length <= 0)
      {
        const newAcct = await Account.findById(findUser.accountId)
        session.account = newAcct

      } else if (account.shops.length > 0 && account.employees.length > 0)
      {
        const newAcct = await Account.findById(findUser.accountId).populate('shops').populate('employees')
        session.account = newAcct
        session.shops = newAcct.shops
        session.employees = newAcct.employees

      } else if (account.shops.length > 0 || account.employees.length > 0)
      {
        if (account.shops.length > 0)
        {
          const newAcct = await Account.findById(findUser.accountId).populate('shops')
          session.account = newAcct
          session.shops = newAcct.shops
        }

        if (account.employees.length > 0)
        {
          const newAcct = await Account.findById(findUser.accountId).populate('employees')
          session.account = newAcct
          session.employees = newAcct.employees
        }
      }

      //assign User to session 
      session.user = findUser
      session.accessToken = token.accessToken

      //return session 
      return session
    },
  },
  pages: {
    signIn: '/login',
    // error: null, // Error code passed in query string as ?error=
    // verifyRequest: null, // (used for check email message)
    // newUser: '/account/dashboard/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
}

export { authOptions }