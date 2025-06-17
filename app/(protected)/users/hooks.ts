import { useQuery } from '@tanstack/react-query'
import { getUsers } from './actions'

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })
}
