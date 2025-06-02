"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { LanguageSwitcher } from "./language-switcher"
import { LoginModalWrapper } from "./auth/login-modal-wrapper"
import { SignUpButton } from "./auth/signup-button"
import { cn } from "@/lib/utils"

export function Header() {
  const t = useTranslations("common")
  const pathname = usePathname()

  return (
    <header className="w-full border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/early-access" className="text-xl font-bold">
            Edgemy
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link 
              href="/coachs" 
              className={cn(
                "transition-colors",
                pathname === "/coachs" ? "text-primary font-medium" : "hover:text-primary"
              )}
            >
              {t("navigation.coachs")}
            </Link>
            <Link 
              href="/formations" 
              className={cn(
                "transition-colors",
                pathname === "/formations" ? "text-primary font-medium" : "hover:text-primary"
              )}
            >
              {t("navigation.formations")}
            </Link>
            <Link 
              href="/ressources" 
              className={cn(
                "transition-colors",
                pathname === "/ressources" ? "text-primary font-medium" : "hover:text-primary"
              )}
            >
              {t("navigation.ressources")}
            </Link>
            <Link 
              href="/tournois" 
              className={cn(
                "transition-colors",
                pathname === "/tournois" ? "text-primary font-medium" : "hover:text-primary"
              )}
            >
              {t("navigation.tournois")}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <LoginModalWrapper />
          <SignUpButton />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
} 