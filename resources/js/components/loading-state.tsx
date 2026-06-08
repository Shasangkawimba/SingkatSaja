import * as React from "react"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "spinner" | "cards" | "table"
  count?: number
  message?: string
}

export function LoadingState({
  className,
  variant = "spinner",
  count = 3,
  message = "Loading...",
  ...props
}: LoadingStateProps) {
  if (variant === "cards") {
    return (
      <div
        className={cn("grid gap-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full", className)}
        {...props}
      >
        {Array.from({ length: count }).map((_, i) => (
          <Card key={i} className="border border-slate/20 bg-pure-white p-20">
            <CardContent className="flex flex-col gap-16 p-0">
              <Skeleton className="h-16 w-1/3 bg-slate/10" />
              <Skeleton className="h-32 w-2/3 bg-slate/10" />
              <div className="flex flex-col gap-8 mt-4">
                <Skeleton className="h-12 w-full bg-slate/5" />
                <Skeleton className="h-12 w-5/6 bg-slate/5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (variant === "table") {
    return (
      <div className={cn("flex flex-col gap-16 w-full", className)} {...props}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-16 border-b border-slate/10"
          >
            <div className="flex flex-col gap-8 w-1/2">
              <Skeleton className="h-16 w-1/3 bg-slate/10" />
              <Skeleton className="h-12 w-2/3 bg-slate/5" />
            </div>
            <div className="flex gap-16 items-center">
              <Skeleton className="h-16 w-48 bg-slate/10" />
              <Skeleton className="h-20 w-20 rounded-full bg-slate/10" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-[200px] gap-12 w-full text-center",
        className
      )}
      {...props}
    >
      <Spinner className="size-24 text-vivid-indigo" />
      {message && (
        <span className="text-body text-slate font-medium animate-pulse">
          {message}
        </span>
      )}
    </div>
  )
}
