
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 whitespace-nowrap",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Struggle badge variations with border and drop shadow instead of strong background
        depression: "border border-indigo-300 text-indigo-700 shadow-sm bg-white hover:bg-indigo-50 rounded-full",
        anxiety: "border border-purple-300 text-purple-700 shadow-sm bg-white hover:bg-purple-50 rounded-full",
        isolation: "border border-blue-300 text-blue-700 shadow-sm bg-white hover:bg-blue-50 rounded-full",
        bipolar: "border border-indigo-300 text-indigo-700 shadow-sm bg-white hover:bg-indigo-50 rounded-full",
        medication: "border border-cyan-300 text-cyan-700 shadow-sm bg-white hover:bg-cyan-50 rounded-full",
        focus: "border border-sky-300 text-sky-700 shadow-sm bg-white hover:bg-sky-50 rounded-full",
        panic: "border border-red-300 text-red-700 shadow-sm bg-white hover:bg-red-50 rounded-full",
        stress: "border border-teal-300 text-teal-700 shadow-sm bg-white hover:bg-teal-50 rounded-full",
        ptsd: "border border-violet-300 text-violet-700 shadow-sm bg-white hover:bg-violet-50 rounded-full",
        trauma: "border border-rose-300 text-rose-700 shadow-sm bg-white hover:bg-rose-50 rounded-full",
        recovery: "border border-lime-300 text-lime-700 shadow-sm bg-white hover:bg-lime-50 rounded-full",
        insomnia: "border border-amber-300 text-amber-700 shadow-sm bg-white hover:bg-amber-50 rounded-full",
        social: "border border-emerald-300 text-emerald-700 shadow-sm bg-white hover:bg-emerald-50 rounded-full",
        mood: "border border-indigo-300 text-indigo-700 shadow-sm bg-white hover:bg-indigo-50 rounded-full",
        // New variant for the about tags
        about: "border border-indigo-200 text-indigo-700 shadow-sm bg-indigo-100 hover:bg-indigo-200 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
