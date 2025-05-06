import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LoginModal } from "./login-modal"
import { useTranslations } from "next-intl"
import { LanguageSwitcher } from "./language-switcher"

export function Header() {
  const t = useTranslations("common")

  return (
    <header className="w-full border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold">
            Edgemy
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/coachs" className="hover:text-primary transition-colors">
              {t("navigation.coachs")}
            </Link>
            <Link href="/formations" className="hover:text-primary transition-colors">
              {t("navigation.formations")}
            </Link>
            <Link href="/ressources" className="hover:text-primary transition-colors">
              {t("navigation.ressources")}
            </Link>
            <Link href="/tournois" className="hover:text-primary transition-colors">
              {t("navigation.tournois")}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <LoginModal />
          <Button size="sm">
            {t("auth.signUp")}
          </Button>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
} 