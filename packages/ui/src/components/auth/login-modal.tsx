"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "../ui/dialog.js"
import { Button } from "../ui/button.js"
import { LoginForm } from "./login-form.js"

interface LoginModalProps {
  translations: {
    welcome: string
    socialLogin: string
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
    loginWithApple: string
    loginWithGoogle: string
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