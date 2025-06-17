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
import { BadgeCheck, Loader } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export function UpdateAdmin({ user }: { user: User }) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)

  const roleMutation = useMutation({
    mutationFn: async () => {
      return await admin.setRole({
        userId: user.id,
        role: 'admin',
      })
    },
    onSuccess: (data) => {
      if (data.error) {
        toast.error(`Failed to update user role: ${data.error.message}`)
        return
      }

      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('Updated user role successfully')
    },
    onError: (error) => {
      toast.error(`Failed to update user role: ${error.message}`)
    },
    onSettled: () => {
      setOpen(false)
    },
  })

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <BadgeCheck className="size-4 cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You are changing the role of this user to admin. Are you sure you
            want to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={async () => {
              await roleMutation.mutateAsync()
            }}
          >
            {roleMutation.isPending && (
              <Loader className="animate-spin size-4" />
            )}
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
