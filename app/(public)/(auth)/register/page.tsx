import { SplineScene } from '@/components/ui/splite'
import { Spotlight } from '@/components/ui/spot-light'
import { GalleryVerticalEnd } from 'lucide-react'
import Link from 'next/link'
import { RegisterForm } from './register-form'

export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Onus
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs flex flex-col gap-3">
            <RegisterForm />
            <Link
              href="/login"
              className="text-sm text-muted-foreground text-center mt-2 hover:underline"
            >
              Đã có tài khoản? Đăng nhập
            </Link>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" />
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>
    </div>
  )
}
