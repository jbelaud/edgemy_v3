"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LockIcon, MailIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "./button.js";
import { Input } from "./input.js";
import { Label } from "./label.js";
import { Checkbox } from "./checkbox.js";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "./card.js";
import { useRouter } from "next/router.js";
const loginSchema = z.object({
    email: z.string().email({ message: "Adresse e-mail invalide" }),
    password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }),
    remember: z.boolean(),
});
export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const t = useTranslations("auth");
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    });
    async function onSubmit(data) {
        setIsLoading(true);
        // Simuler une connexion
        console.log("Connexion avec:", data);
        // Attendre 1 seconde pour simuler un appel API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        // Rediriger après la connexion
        router.push("/dashboard");
    }
    return (_jsxs(Card, { className: "w-full max-w-md mx-auto", children: [_jsxs(CardHeader, { className: "space-y-1", children: [_jsx(CardTitle, { className: "text-2xl font-bold text-center", children: t("login") }), _jsx(CardDescription, { className: "text-center", children: t("loginDescription") })] }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", children: t("email") }), _jsxs("div", { className: "relative", children: [_jsx(MailIcon, { className: "absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" }), _jsx(Input, { id: "email", placeholder: t("emailPlaceholder"), type: "email", className: "pl-10", ...form.register("email") })] }), form.formState.errors.email && (_jsx("p", { className: "text-sm text-destructive", children: form.formState.errors.email.message }))] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "password", children: t("password") }), _jsx(Button, { variant: "link", className: "px-0 text-sm font-medium h-auto", children: t("forgotPassword") })] }), _jsxs("div", { className: "relative", children: [_jsx(LockIcon, { className: "absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" }), _jsx(Input, { id: "password", placeholder: "********", type: "password", className: "pl-10", ...form.register("password") })] }), form.formState.errors.password && (_jsx("p", { className: "text-sm text-destructive", children: form.formState.errors.password.message }))] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "remember", ...form.register("remember") }), _jsx("label", { htmlFor: "remember", className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: t("rememberMe") })] }), _jsx(Button, { type: "submit", className: "w-full", disabled: isLoading, children: isLoading ? t("loggingIn") : t("login") })] }) }), _jsx(CardFooter, { className: "flex flex-col items-center gap-4", children: _jsxs("div", { className: "text-sm text-center text-muted-foreground", children: [t("noAccount"), " ", _jsx(Button, { variant: "link", className: "px-0 text-sm font-medium h-auto", children: t("signUp") })] }) })] }));
}
