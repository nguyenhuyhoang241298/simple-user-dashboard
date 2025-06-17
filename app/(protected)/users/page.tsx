'use client'

import { DataTable } from './components/data-table'
import { useUsers } from './hooks'

export default function UsersPage() {
  const { data: users, isFetching, isError } = useUsers()

  if (isFetching || isError || !users) return <div>Loading...</div>

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of all users in your database.
          </p>
        </div>
      </div>
      <DataTable data={users} />
    </div>
  )
}
