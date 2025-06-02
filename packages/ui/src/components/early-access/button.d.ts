import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const landingButtonVariants: (props?: ({
    variant?: "secondary" | "ghost" | "primary" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare function LandingButton({ className, variant, size, asChild, ...props }: React.ComponentProps<"button"> & VariantProps<typeof landingButtonVariants> & {
    asChild?: boolean;
}): import("react/jsx-runtime").JSX.Element;
export { LandingButton, landingButtonVariants };
//# sourceMappingURL=button.d.ts.map