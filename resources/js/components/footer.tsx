import * as React from "react"
import { Link } from "@inertiajs/react"
import AppLogo from "@/components/app-logo"
import { dashboard } from "@/routes"

export function Footer() {
  return (
    <footer className="bg-midnight-ink text-pure-white py-32 md:py-48 border-t border-slate/10">
      <div className="mx-auto max-w-[1200px] px-16 md:px-32 flex flex-col md:flex-row justify-between items-start md:items-center gap-32">
        <div className="flex flex-col gap-12">
          <Link href="/" className="inline-block">
            <AppLogo className="text-pure-white" />
          </Link>
          <p className="text-caption text-soft-violet max-w-sm leading-relaxed">
            Quiet, high-key canvas URL shortening interrupted by a single confident violet stroke.
          </p>
        </div>

        <div className="flex flex-wrap gap-32 text-caption text-soft-violet">
          <div className="flex flex-col gap-8">
            <span className="font-bold text-pure-white tracking-tight uppercase text-[11px]">Product</span>
            <Link href="/" className="hover:text-pure-white transition-colors">Features</Link>
            <Link href={dashboard()} className="hover:text-pure-white transition-colors">Dashboard</Link>
          </div>
          <div className="flex flex-col gap-8">
            <span className="font-bold text-pure-white tracking-tight uppercase text-[11px]">Resources</span>
            <a href="https://laravel.com" target="_blank" rel="noopener noreferrer" className="hover:text-pure-white transition-colors">Laravel</a>
            <a href="https://inertiajs.com" target="_blank" rel="noopener noreferrer" className="hover:text-pure-white transition-colors">Inertia.js</a>
          </div>
          <div className="flex flex-col gap-8">
            <span className="font-bold text-pure-white tracking-tight uppercase text-[11px]">Legal</span>
            <Link href="#" className="hover:text-pure-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-pure-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
      
      <div className="mx-auto max-w-[1200px] px-16 md:px-32 mt-32 pt-20 border-t border-slate/10 text-center md:text-left text-caption text-soft-violet">
        &copy; {new Date().getFullYear()} SingkatSaja. Built with precision and restraint.
      </div>
    </footer>
  )
}
