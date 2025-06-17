import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from '@/db/type'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { DataTableColumnHeader } from './components/data-table-column-header'
import DataTableRowActions from './components/data-table-row-actions'

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={row.original.image || ''} />
            <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{row.getValue('name')}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div>{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'emailVerified',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Verified" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue('emailVerified') ? 'Yes' : 'No'}</div>
    ),
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => <div>{row.getValue('role')}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => (
      <div>{format(row.getValue('createdAt'), 'dd/MM/yyyy HH:mm')}</div>
    ),
  },
  {
    id: 'actions',
    header: () => 'Actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
