"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart3, Users, Settings, Bell, Trash2, LogOut, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function AdminDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-emerald-900 bg-emerald-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <BarChart3 className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Users className="h-5 w-5" />
                Users
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Trash2 className="h-5 w-5" />
                Containers
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Bell className="h-5 w-5" />
                Alerts
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Settings className="h-5 w-5" />
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Trash2 className="h-6 w-6 text-emerald-700" />
          <span className="text-lg font-semibold">Waste Management</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Link>
          </Button>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 md:block">
          <nav className="grid gap-2 p-4 text-sm font-medium">
            <Link href="#" className="flex items-center gap-2 rounded-lg px-3 py-2 text-emerald-900 bg-emerald-50">
              <BarChart3 className="h-5 w-5" />
              Dashboard
            </Link>
            <Link href="#" className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted">
              <Users className="h-5 w-5" />
              Users
            </Link>
            <Link href="#" className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted">
              <Trash2 className="h-5 w-5" />
              Containers
            </Link>
            <Link href="#" className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted">
              <Bell className="h-5 w-5" />
              Alerts
            </Link>
            <Link href="#" className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted">
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-4 md:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Containers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">324</div>
                <p className="text-xs text-muted-foreground">+4% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Waste Collected</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.5 tons</div>
                <p className="text-xs text-muted-foreground">+18% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">-3 from last week</p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>System Overview</CardTitle>
                <CardDescription>Administrator access to all system functions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-lg border bg-card p-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <h3 className="font-semibold">User Management</h3>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Add, edit, or remove users. Manage roles and permissions.
                    </p>
                    <Button className="mt-4 w-full" variant="outline">
                      Manage Users
                    </Button>
                  </div>
                  <div className="rounded-lg border bg-card p-4">
                    <div className="flex items-center gap-2">
                      <Trash2 className="h-5 w-5 text-muted-foreground" />
                      <h3 className="font-semibold">Container Management</h3>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Monitor container status, schedule pickups, and manage locations.
                    </p>
                    <Button className="mt-4 w-full" variant="outline">
                      Manage Containers
                    </Button>
                  </div>
                  <div className="rounded-lg border bg-card p-4">
                    <div className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-muted-foreground" />
                      <h3 className="font-semibold">Alert Configuration</h3>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Configure alert thresholds, notifications, and response protocols.
                    </p>
                    <Button className="mt-4 w-full" variant="outline">
                      Configure Alerts
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

