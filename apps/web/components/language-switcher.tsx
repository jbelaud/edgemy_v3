"use client"

import { usePathname, useRouter } from "next/navigation"
import { useLocale } from "next-intl"
import { Button } from "@workspace/ui/components/ui/button"
import { useTranslations } from "next-intl"
import * as React from "react"

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const t = useTranslations("common")

  const switchLanguage = (newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`
    router.refresh()
  }

  return (
    <div className="flex gap-2">
      <Button
        variant={locale === "fr" ? "default" : "outline"}
        size="sm"
        onClick={() => switchLanguage("fr")}
        aria-label={t("language.fr")}
      >
        FR
      </Button>
      <Button
        variant={locale === "en" ? "default" : "outline"}
        size="sm"
        onClick={() => switchLanguage("en")}
        aria-label={t("language.en")}
      >
        EN
      </Button>
    </div>
  )
} 