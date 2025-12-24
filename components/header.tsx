export default function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="px-4 md:px-6 py-4 md:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">📱</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">PhoneStore POS</h1>
              <p className="text-sm text-muted-foreground">Modern Point of Sale System</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">System Ready</p>
            <p className="text-lg font-semibold text-primary">Online</p>
          </div>
        </div>
      </div>
    </header>
  )
}
