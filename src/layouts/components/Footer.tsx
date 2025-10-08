export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="w-full border-t bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 text-sm text-slate-600">
        <div>© {year} Project Admin</div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-primary-600">Privacy</a>
          <a href="#" className="hover:text-primary-600">Terms</a>
          <a href="#" className="hover:text-primary-600">Support</a>
        </div>
      </div>
    </footer>
  )
}
