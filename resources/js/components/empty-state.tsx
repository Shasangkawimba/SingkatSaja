import * as React from "react"
import { LucideIcon, LinkIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  icon?: LucideIcon
  action?: React.ReactNode
}

export function EmptyState({
  className,
  title,
  description,
  icon: Icon = LinkIcon,
  action,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-32 md:p-48 border border-dashed border-slate/30 rounded-largecards bg-frost-gray/30 text-center w-full max-w-xl mx-auto gap-20",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-center size-48 rounded-full bg-pale-lilac dark:bg-pale-lilac/10 text-vivid-indigo dark:text-pure-white">
        <Icon className="size-24 stroke-[1.5]" />
      </div>

      <div className="flex flex-col gap-8">
        <h3 className="text-heading-sm font-bold text-graphite dark:text-pure-white">
          {title}
        </h3>
        <p className="text-body text-slate dark:text-soft-violet max-w-sm leading-relaxed">
          {description}
        </p>
      </div>

      {action && (
        <div className="mt-8 flex items-center justify-center">
          {action}
        </div>
      )}
    </div>
  )
}
