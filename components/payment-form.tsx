"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { CreditCard, Calendar, Lock } from "lucide-react"
import LoadingSpinner from "@/components/loading-spinner"
import { useAuth } from "@/contexts/auth-context"

interface PaymentFormProps {
  planType: "learn" | "premium"
  planPrice: string
  onSuccess: () => void
  onCancel: () => void
}

export default function PaymentForm({ planType, planPrice, onSuccess, onCancel }: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardName, setCardName] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      // Update user plan in localStorage
      if (user) {
        const updatedUser = { ...user, plan: planType }
        localStorage.setItem("user", JSON.stringify(updatedUser))
      }

      toast({
        title: "Payment successful!",
        description: `You've been upgraded to the ${planType === "learn" ? "Learn Space" : "Premium"} plan.`,
        variant: "default",
      })
      setIsProcessing(false)
      onSuccess()
    }, 2000)
  }

  return (
    <div className="p-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold">Complete Your Purchase</h3>
        <p className="text-sm text-muted-foreground">
          {planType === "learn" ? "Learn Space" : "Premium"} Plan - {planPrice}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cardName">Name on Card</Label>
          <Input
            id="cardName"
            placeholder="John Doe"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cardNumber">Card Number</Label>
          <div className="relative">
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              maxLength={19}
            />
            <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <div className="relative">
              <Input
                id="expiryDate"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
                maxLength={5}
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvv">CVV</Label>
            <div className="relative">
              <Input
                id="cvv"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
                maxLength={3}
                type="password"
              />
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        <div className="pt-4 flex gap-3">
          <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="flex-1" disabled={isProcessing}>
            {isProcessing ? <LoadingSpinner size="sm" /> : `Pay ${planPrice}`}
          </Button>
        </div>
      </form>

      <div className="mt-4 text-center text-xs text-muted-foreground">
        <p>Your payment information is secure. We use encryption to protect your data.</p>
      </div>
    </div>
  )
}
