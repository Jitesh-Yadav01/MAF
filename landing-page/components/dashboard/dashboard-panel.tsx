"use client"
import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/primitives/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/primitives/card"

export default function DashboardPanel({ user }: { user: any }) {
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const storedKey = localStorage.getItem("api key")
    if (storedKey) {
      setApiKey(storedKey)
    }
  }, [])

  const generateApiKey = () => {
    // Generate 16 random characters
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < 16; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setApiKey(result)
    localStorage.setItem("api key", result)
  }

  const copyKey = () => {
    if (!apiKey) return
    navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="w-full mt-24 max-w-2xl mx-auto border-white/10 bg-black/60 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Welcome, {user.name ?? user.email}</CardTitle>
        <CardDescription>
          Manage your API secret keys. These keys are saved locally on your device.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between rounded-lg border border-border p-4 bg-muted/50">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">Current API Key</span>
              {apiKey ? (
                <code className="font-mono text-lg font-semibold tracking-wide text-foreground">
                  {apiKey}
                </code>
              ) : (
                <span className="text-sm text-muted-foreground italic">No API key generated yet</span>
              )}
            </div>
            {apiKey && (
              <Button
                variant="ghost"
                size="sm"
                onClick={copyKey}
                className="h-8"
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            )}
          </div>

          <div className="flex justify-end">
            <Button onClick={generateApiKey} className="w-full sm:w-auto">
              {apiKey ? "Regenerate Key" : "Generate New Key"}
            </Button>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <a
            href="/auth/logout"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            Log out
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
