'use client'

import { useState } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'


function PaymentForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: 'lisagishe236@gmail.com',
    cardNumber: '1234 1234 1234 1234',
    expiry: 'MM / YY',
    cvc: '',
    cardholderName: '',
    country: 'Cambodia',
    addressLine1: '',
    addressLine2: '',
    city: '',
    postalCode: '',
    saveInfo: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : false
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors mb-6"
        aria-label="Go back"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Pay with Link Button */}
        <button
  type="button"
  className="w-full bg-gray-300 hover:bg-gray-400 text-black font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
>
  {/* Icon before text */}
  <img
    src="/khqr.png" // your image path
    alt="ABA Logo"
    className="w-8 h-8 object-cover rounded-sm"
  />

  {/* Button text */}
  ABA KHQR

  {/* Right arrow */}
  <ChevronRight className="w-5 h-5" />

  {/* Optional description */}
  <span className="text-sm font-normal">scan to pay for any banking app</span>
</button>


        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted-foreground text-sm">OR</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full px-4 py-3 bg-muted text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-4">Payment method</h3>

          <div className="space-y-4">
            {/* Card Number */}
            <div>
              <label className="block text-xs text-muted-foreground mb-2">Card information</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 1234 1234 1234"
                className="w-full px-4 py-3 bg-muted text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Expiry and CVC */}
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="expiry"
                value={formData.expiry}
                onChange={handleInputChange}
                placeholder="MM / YY"
                className="px-4 py-3 bg-muted text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="text"
                name="cvc"
                value={formData.cvc}
                onChange={handleInputChange}
                placeholder="CVC"
                className="px-4 py-3 bg-muted text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>

        {/* Cardholder Name */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Cardholder name</label>
          <input
            type="text"
            name="cardholderName"
            value={formData.cardholderName}
            onChange={handleInputChange}
            placeholder="Full name on card"
            className="w-full px-4 py-3 bg-muted text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Billing Address */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">Billing address</label>
          <div className="space-y-3">
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-muted text-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option>Cambodia</option>
              <option>Vietnam</option>
              <option>Thailand</option>
              <option>Laos</option>
            </select>

            <input
              type="text"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleInputChange}
              placeholder="Address line 1"
              className="w-full px-4 py-3 bg-muted text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
            />

            <input
              type="text"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleInputChange}
              placeholder="Address line 2"
              className="w-full px-4 py-3 bg-muted text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                className="px-4 py-3 bg-muted text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                placeholder="Postal code"
                className="px-4 py-3 bg-muted text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>

        {/* Save Info Checkbox */}
        <label className="flex items-start gap-3 p-4 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors">
          <input
            type="checkbox"
            name="saveInfo"
            checked={formData.saveInfo}
            onChange={handleInputChange}
            className="mt-1 w-4 h-4 accent-blue-500 cursor-pointer"
          />
          <div className="flex-1">
            <div className="font-semibold text-foreground">Save my information for faster checkout</div>
            <div className="text-sm text-muted-foreground">
              Pay securely at Fake Filler and everywhere Link is accepted.
            </div>
          </div>
        </label>

        {/* Subscribe Button */}
        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default PaymentForm
