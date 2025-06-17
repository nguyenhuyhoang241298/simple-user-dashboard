import { User } from '@/db/type'
import { Row } from '@tanstack/react-table'
import { DeleteUser } from './delete-user'
import { UpdateAdmin } from './update-admin'

const DataTableRowActions = ({ row }: { row: Row<User> }) => {
  return (
    <div className="flex items-center gap-4">
      {row.original.role !== 'admin' && <DeleteUser user={row.original} />}
      {row.original.role !== 'admin' && <UpdateAdmin user={row.original} />}
    </div>
  )
}

export default DataTableRowActions
