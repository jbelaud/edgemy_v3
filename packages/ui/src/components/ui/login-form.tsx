"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { LockIcon, MailIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "./button.js"
import { Input } from "./input.js"
import { Label } from "./label.js"
import { Checkbox } from "./checkbox.js"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card.js"
import { useRouter } from "next/router.js"

const loginSchema = z.object({
  email: z.string().email({ message: "Adresse e-mail invalide" }),
  password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }),
  remember: z.boolean(),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const t = useTranslations("auth")
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  })

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true)
    
    // Simuler une connexion
    console.log("Connexion avec:", data)
    
    // Attendre 1 seconde pour simuler un appel API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    
    // Rediriger après la connexion
    router.push("/dashboard")
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">{t("login")}</CardTitle>
        <CardDescription className="text-center">
          {t("loginDescription")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <div className="relative">
              <MailIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                placeholder={t("emailPlaceholder")}
                type="email"
                className="pl-10"
                {...form.register("email")}
              />
            </div>
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{t("password")}</Label>
              <Button variant="link" className="px-0 text-sm font-medium h-auto">
                {t("forgotPassword")}
              </Button>
            </div>
            <div className="relative">
              <LockIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                placeholder="********"
                type="password"
                className="pl-10"
                {...form.register("password")}
              />
            </div>
            {form.formState.errors.password && (
              <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              {...form.register("remember")}
            />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t("rememberMe")}
            </label>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? t("loggingIn") : t("login")}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-4">
        <div className="text-sm text-center text-muted-foreground">
          {t("noAccount")}{" "}
          <Button variant="link" className="px-0 text-sm font-medium h-auto">
            {t("signUp")}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
} 