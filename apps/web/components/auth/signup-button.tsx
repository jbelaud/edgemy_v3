"use client"

import { useTranslations } from "next-intl"
import { Button } from "@workspace/ui/components/ui/button"

export function SignUpButton() {
  const t = useTranslations("auth")

  return (
    <Button size="sm">
      {t("signUp")}
    </Button>
  )
} 