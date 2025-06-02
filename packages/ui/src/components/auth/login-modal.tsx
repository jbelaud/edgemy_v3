"use client"

import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import { LoginForm } from "./login-form"

interface LoginModalProps {
  translations: {
    welcome: string
    socialLogin: string
    loginWithApple: string
    loginWithGoogle: string
    orContinueWith: string
    email: string
    emailPlaceholder: string
    password: string
    forgotPassword: string
    loginButton: string
    noAccount: string
    signUp: string
    terms: string
    termsOfService: string
    and: string
    privacyPolicy: string
  }
}

export function LoginModal({ translations }: LoginModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{translations.loginButton}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="sr-only">{translations.loginButton}</DialogTitle>
        <LoginForm translations={translations} />
      </DialogContent>
    </Dialog>
  )
} 