import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string | React.ReactNode
  title: string | React.ReactNode
  description?: string | React.ReactNode
  actions?: React.ReactNode
  align?: "left" | "center"
  isHero?: boolean
}

export function SectionHeader({
  className,
  eyebrow,
  title,
  description,
  actions,
  align = "left",
  isHero = false,
  ...props
}: SectionHeaderProps) {
  const isCentered = align === "center"

  return (
    <div
      className={cn(
        "flex flex-col gap-16",
        isCentered ? "items-center text-center mx-auto max-w-2xl" : "items-start",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <div data-slot="section-header-eyebrow">
          {typeof eyebrow === "string" ? (
            <Badge variant="eyebrow">{eyebrow}</Badge>
          ) : (
            eyebrow
          )}
        </div>
      )}

      <div className="flex flex-col gap-8">
        <h2
          className={cn(
            "font-bold text-graphite dark:text-pure-white tracking-[-0.02em]",
            isHero ? "text-heading-lg md:text-display leading-none" : "text-heading-sm md:text-heading leading-tight"
          )}
        >
          {title}
        </h2>

        {description && (
          <p className="text-body text-slate dark:text-soft-violet max-w-xl leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div
          className={cn(
            "flex flex-wrap gap-8 items-center",
            isCentered ? "justify-center" : "justify-start"
          )}
        >
          {actions}
        </div>
      )}
    </div>
  )
}
