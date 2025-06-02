"use client"

import { useTranslations } from "next-intl"
import { Button } from "@workspace/ui"

export function SignUpButton() {
  const t = useTranslations("auth")

  return (
    <Button size="sm">
      {t("signUp")}
    </Button>
  )
} 