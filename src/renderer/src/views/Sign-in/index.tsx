import { Card } from '@/components/ui/card'
import { UserAuthForm } from './components/user-auth-form'
import { Link } from 'react-router-dom'
import LogoImg from '@/assets/bunny.png'

export default function SignIn() {
  return (
    <>
      <div className="container grid h-svh flex-col items-center justify-center bg-background lg:max-w-none lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8">
          <div className="mb-4 flex items-center justify-center">
            <img src={LogoImg} alt="Faneco Logo" className="h-16 w-16" />
            <h1 className="text-xl font-medium">Bunny</h1>
          </div>
          <Card className="p-6">
            <div className="flex flex-col space-y-2 text-left">
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and password below <br />
                to log into your account
              </p>
            </div>
            <UserAuthForm />
            <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
              Não tem uma conta Bunny?{' '}
              <Link to="/register" className="underline underline-offset-4 hover:text-primary">
                Cadastra-se gratuitamente
              </Link>
              .
            </p>
          </Card>
        </div>
      </div>
    </>
  )
}
