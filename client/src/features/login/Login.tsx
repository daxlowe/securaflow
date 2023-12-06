import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Login } from "./components/login"
import * as logo from '../../assets/images/securaflow-logo.png';

export default function LoginUser() {
    const image = logo.default;
    return (
        (
            <>
              <div className="container relative hidden h-[745px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Link
                  to="/signup"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute right-4 top-4 md:right-8 md:top-8"
                  )}
                >
                  Create Account
                </Link>
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                  <div className="absolute inset-0 bg-zinc-900" />
                  <div className="relative z-20 flex items-center text-lg font-medium my-auto">
                  <img src={image} className="App-logo" alt="logo" />
                  </div>
                </div>
                <div className="lg:p-8">
                  <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                      <h1 className="text-2xl font-semibold tracking-tight">
                        Log In
                      </h1>
                      <p className="text-sm text-muted-foreground">
                        Enter your email and password below to login
                      </p>
                    </div>
                    <Login />
                  </div>
                </div>
              </div>
            </>
          )
    )
}