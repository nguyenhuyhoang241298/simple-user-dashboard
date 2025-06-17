import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { admin } from '@/lib/auth/auth-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email('Invalid email address.'),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
})

export function AddUserPopup() {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const addUserMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      return await admin.createUser({
        email: values.email,
        name: values.name,
        password: values.password,
      })
    },
    onSuccess: (data) => {
      if (data.error) {
        toast.error(`Failed to add user: ${data.error.message}`)
        return
      }

      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User added successfully')
    },
    onError: (error) => {
      toast.error(`Failed to add user: ${error.message}`)
    },
    onSettled: () => {
      setOpen(false)
      form.reset()
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    addUserMutation.mutate(values)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new user.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button isLoading={addUserMutation.isPending} type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
