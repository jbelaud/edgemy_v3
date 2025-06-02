interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {
    translations: {
        welcome: string;
        socialLogin: string;
        orContinueWith: string;
        email: string;
        emailPlaceholder: string;
        password: string;
        forgotPassword: string;
        loginButton: string;
        noAccount: string;
        signUp: string;
        terms: string;
        termsOfService: string;
        and: string;
        privacyPolicy: string;
        loginWithApple: string;
        loginWithGoogle: string;
    };
}
export declare function LoginForm({ className, translations, ...props }: LoginFormProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=login-form.d.ts.map