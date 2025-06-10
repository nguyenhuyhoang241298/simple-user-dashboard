import { redirect } from 'next/navigation'
import React from 'react'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = true

  if (session) {
    redirect('/dashboard')
  }

  return children
}

export default Layout
