import type { Metadata } from "next"
import { AdminDashboard } from "@/components/admin-dashboard"

export const metadata: Metadata = {
  title: "Admin Dashboard - Waste Management System",
  description: "Admin dashboard for the Waste Management System",
}

export default function AdminDashboardPage() {
  return <AdminDashboard />
}

