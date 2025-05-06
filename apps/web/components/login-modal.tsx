"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LoginForm } from "./ui/login-form"
import { useTranslations } from "next-intl"

export function LoginModal() {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations("auth")
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          {t("login")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <LoginForm />
      </DialogContent>
    </Dialog>
  )
} 