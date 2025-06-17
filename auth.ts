import db from '@/db'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin } from 'better-auth/plugins'
import authSchema from './db/auth-schema'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: { ...authSchema },
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [admin()],
})
