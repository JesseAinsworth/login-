"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

const forgotPasswordSchema = z.object({
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
})

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(data: z.infer<typeof forgotPasswordSchema>) {
    setIsLoading(true)

    try {
      // This would be replaced with your actual API call
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to send reset email")
      }

      setIsSubmitted(true)
      toast({
        title: "Reset email sent",
        description: "Check your email for a password reset link",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to send reset email",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="rounded-full bg-green-100 p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-green-600"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h3 className="text-lg font-medium">Check your email</h3>
        <p className="text-center text-sm text-muted-foreground">
          We&apos;ve sent you a password reset link. Please check your email.
        </p>
      </div>
    )
  }

  return (
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
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Send Reset Link
        </Button>
      </form>
    </Form>
  )
}

