import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const landingButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-base font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl animate-gradient-x",
        secondary:
          "bg-white text-indigo-600 border-2 border-indigo-600 shadow-lg hover:bg-indigo-50 hover:shadow-xl",
        ghost:
          "text-indigo-600 hover:bg-indigo-50",
      },
      size: {
        default: "h-12 px-8 py-3",
        sm: "h-10 px-6 py-2",
        lg: "h-14 px-10 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function LandingButton({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof landingButtonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="landing-button"
      className={cn(landingButtonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { LandingButton, landingButtonVariants }
