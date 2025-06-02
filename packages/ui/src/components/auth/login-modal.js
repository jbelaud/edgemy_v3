"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "../ui/dialog.js";
import { Button } from "../ui/button.js";
import { LoginForm } from "./login-form.js";
export function LoginModal({ translations }) {
    return (_jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: translations.loginButton }) }), _jsxs(DialogContent, { className: "sm:max-w-[425px]", children: [_jsx(DialogTitle, { className: "sr-only", children: translations.loginButton }), _jsx(LoginForm, { translations: translations })] })] }));
}
