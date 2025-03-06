"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "First name is required" })
      .refine((name) => /^[A-Za-z\s.]+$/.test(name), {
        message: "First name can only contain letters, spaces, and dots",
      }),
    lastName: z
      .string()
      .min(1, { message: "Last name is required" })
      .refine((name) => /^[A-Za-z\s.]+$/.test(name), {
        message: "Last name can only contain letters, spaces, and dots",
      }),
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
    confirmPassword: z.string(),
    role: z.enum(["user", "operator", "admin"], {
      required_error: "Please select a role",
    }),
    profileImage: z.any().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Check if file size is at least 5MB (5 * 1024 * 1024 bytes)
      if (file.size < 5 * 1024 * 1024) {
        toast({
          title: "File too small",
          description: "Profile image must be at least 5MB",
          variant: "destructive",
        })
        return
      }

      setSelectedFile(file)
    }
  }

  async function onSubmit(data: z.infer<typeof registerSchema>) {
    setIsLoading(true)

    if (!selectedFile) {
      toast({
        title: "Profile image required",
        description: "Please upload a profile image",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      // Create form data to send file
      const formData = new FormData()
      formData.append("firstName", data.firstName)
      formData.append("lastName", data.lastName)
      formData.append("email", data.email)
      formData.append("password", data.password)
      formData.append("role", data.role)
      formData.append("profileImage", selectedFile)

      // This would be replaced with your actual API call
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to register")
      }

      toast({
        title: "Registration successful",
        description: "You can now login with your credentials",
      })

      router.push("/login")
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error.message || "Please try again",
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
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select disabled={isLoading} onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="operator">Operator</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Profile Image (min 5MB)</FormLabel>
            <FormControl>
              <Input type="file" accept="image/*" onChange={handleFileChange} disabled={isLoading} />
            </FormControl>
            <FormMessage />
          </FormItem>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Register
          </Button>
        </form>
      </Form>
    </div>
  )
}

