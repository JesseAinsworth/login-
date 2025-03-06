"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .refine(
      (email) => {
        // Validate domain part (after @)
        const domainPart = email.split("@")[1]
        if (!domainPart) return false

        // Domain name should be 3-6 characters
        const domainName = domainPart.split(".")[0]
        if (!domainName || domainName.length < 3 || domainName.length > 6) return false

        // Domain name should only contain lowercase letters and numbers
        if (!/^[a-z0-9]+$/.test(domainName)) return false

        // Extension part (after .)
        const extensionPart = domainPart.split(".")[1]
        if (!extensionPart || extensionPart.length < 2 || extensionPart.length > 4) return false

        // Extension should only contain letters
        if (!/^[a-z]+$/.test(extensionPart)) return false

        return true
      },
      { message: "Email domain must be 3-6 characters followed by a 2-4 letter extension" },
    ),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(16, { message: "Password must not exceed 16 characters" })
    .refine((password) => /[A-Z]/.test(password), { message: "Password must contain at least one uppercase letter" })
    .refine((password) => /[0-9]/.test(password), { message: "Password must contain at least one number" })
    .refine((password) => /[^A-Za-z0-9]/.test(password), {
      message: "Password must contain at least one special character",
    }),
})

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    setIsLoading(true)

    try {
      // This would be replaced with your actual API call
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to login")
      }

      const result = await response.json()

      // Redirect based on user role
      switch (result.role) {
        case "admin":
          router.push("/admin/dashboard")
          break
        case "operator":
          router.push("/operator/dashboard")
          break
        case "user":
          router.push("/user/dashboard")
          break
        default:
          router.push("/dashboard")
      }

      toast({
        title: "Login successful",
        description: "Welcome back!",
      })
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between">
            <Link href="/forgot-password" className="text-sm text-muted-foreground hover:text-primary">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </form>
      </Form>
    </div>
  )
}

