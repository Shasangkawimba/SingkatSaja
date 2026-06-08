import * as React from "react"
import { Link, usePage } from "@inertiajs/react"
import AppLogo from "@/components/app-logo"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { dashboard, login, register } from "@/routes"

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const { auth } = usePage().props as any

  return (
    <div className="flex flex-col min-h-screen bg-pure-white text-graphite font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full bg-pure-white/80 backdrop-blur-md border-b border-fog/40">
        <div className="mx-auto max-w-[1200px] h-56 px-16 md:px-32 flex items-center justify-between">
          <Link href="/">
            <AppLogo />
          </Link>

          <nav className="flex items-center gap-16">
            {auth?.user ? (
              <>
                <Link
                  href={dashboard()}
                  className="text-body font-medium text-ash hover:text-vivid-indigo transition-colors"
                >
                  Dashboard
                </Link>
                <Button asChild variant="default" className="bg-vivid-indigo hover:bg-vivid-indigo/90 text-pure-white font-medium text-caption px-16 py-8 rounded-buttons">
                  <Link href={dashboard()}>
                    Go to app
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Link
                  href={login()}
                  className="text-body font-medium text-ash hover:text-vivid-indigo transition-colors"
                >
                  Log In
                </Link>
                <Button asChild variant="default" className="bg-vivid-indigo hover:bg-vivid-indigo/90 text-pure-white font-medium text-caption px-16 py-8 rounded-buttons">
                  <Link href={register()}>
                    Get started — it's free
                  </Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Main content with subtle dot grid background */}
      <main className="flex-1 w-full bg-pure-white relative">
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.4]"
          style={{
            backgroundImage: "radial-gradient(var(--color-frost-gray) 1px, transparent 1px)",
            backgroundSize: "16px 16px"
          }}
        />
        <div className="relative z-10">{children}</div>
      </main>

      <Footer />
    </div>
  )
}
