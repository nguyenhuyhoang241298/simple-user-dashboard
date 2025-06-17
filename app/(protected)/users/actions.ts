'use server'

import db from '@/db'
import { user } from '@/db/auth-schema'

export const getUsers = async () => {
  return await db.select().from(user)
}
