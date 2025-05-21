"use client"

import { useTranslations } from "next-intl"
import { LoginModal } from "@workspace/ui/components/auth/login-modal"

export function LoginModalWrapper() {
  const t = useTranslations("auth")

  const translations = {
    welcome: t("loginDescription"),
    socialLogin: t("socialLogin"),
    orContinueWith: t("orContinueWith"),
    email: t("email"),
    emailPlaceholder: t("emailPlaceholder"),
    password: t("password"),
    forgotPassword: t("forgotPassword"),
    loginButton: t("login"),
    noAccount: t("noAccount"),
    signUp: t("signUp"),
    terms: t("terms"),
    termsOfService: t("termsOfService"),
    and: t("and"),
    privacyPolicy: t("privacyPolicy"),
    loginWithApple: t("loginWithApple"),
    loginWithGoogle: t("loginWithGoogle")
  }

  return <LoginModal translations={translations} />
} 