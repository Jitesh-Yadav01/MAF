"use client"
import React from "react"

export default function DashboardPanel({ user }: { user: any }) {
  const [apiKey, setApiKey] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  async function fetchApiKey() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/apikey', { credentials: 'include' })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || 'Failed to fetch API key')
      }
      const data = await res.json()
      setApiKey(data.key)
    } catch (err: any) {
      setError(err?.message ?? 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  function copyKey() {
    if (!apiKey) return
    navigator.clipboard.writeText(apiKey)
  }

  return (
    <div className="rounded-md border border-white/10 bg-black/60 p-6">
      <h2 className="text-xl font-semibold">Welcome, {user.name ?? user.email}</h2>
      <p className="mt-2 text-sm text-muted-foreground">Manage your API keys and account settings here.</p>

      <div className="mt-6 flex flex-col gap-3">
        <div>
          <button
            onClick={fetchApiKey}
            disabled={loading}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
          >
            {loading ? 'Generating...' : 'Get API Key'}
          </button>
        </div>

        {apiKey && (
          <div className="flex items-center gap-2">
            <code className="select-all rounded-md bg-muted px-3 py-2 text-sm">{apiKey}</code>
            <button onClick={copyKey} className="rounded-md border px-2 py-1 text-sm">Copy</button>
          </div>
        )}

        {error && <div className="text-sm text-destructive">{error}</div>}

        <div className="mt-4">
          <a href="/auth/logout" className="text-sm underline">Logout</a>
        </div>
      </div>
    </div>
  )
}
