import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { User } from '@/db/type'
import { admin } from '@/lib/auth/auth-client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader, Trash } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export function DeleteUser({ user }: { user: User }) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)

  const deleteUserMutation = useMutation({
    mutationFn: async () => {
      return await admin.removeUser({
        userId: user.id,
      })
    },
    onSuccess: (data) => {
      if (data.error) {
        toast.error(`Failed to delete user: ${data.error.message}`)
        return
      }

      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('Removed user successfully')
    },
    onError: (error) => {
      toast.error(`Failed to remove user: ${error.message}`)
    },
    onSettled: () => {
      setOpen(false)
    },
  })

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Trash className="size-4 cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You are deleting this user. This action cannot be undone. Are you
            sure you want to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={async () => {
              await deleteUserMutation.mutateAsync()
            }}
          >
            {deleteUserMutation.isPending && (
              <Loader className="animate-spin size-4" />
            )}
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
