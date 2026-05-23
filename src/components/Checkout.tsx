import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Lock, CheckCircle2, ShoppingBag, ExternalLink, ShieldCheck } from 'lucide-react';
import { CartItem, CheckoutDetails } from '../types';

interface CheckoutProps {
  cartItems: CartItem[];
  onBackToCart: () => void;
  onOrderSuccess: (details: CheckoutDetails) => void;
}

export default function Checkout({ cartItems, onBackToCart, onOrderSuccess }: CheckoutProps) {
  const [formData, setFormData] = useState<CheckoutDetails>({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Form Validations
    if (!formData.fullName || !formData.email || !formData.phone || !formData.addressLine1 || !formData.city || !formData.state || !formData.postalCode) {
      setErrorMessage('Please complete all standard shipping address fields.');
      return;
    }

    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCvv) {
        setErrorMessage('Please provide complete credit card details.');
        return;
      }
    }

    setIsSubmitting(true);

    // Simulate safe server API call latency
    setTimeout(() => {
      setIsSubmitting(false);
      onOrderSuccess(formData);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button
        onClick={onBackToCart}
        className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-amber-500 transition-colors gap-2 cursor-pointer mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to shopping basket
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Left Column: Form Fields */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          {/* Shipping Address Container */}
          <div className="bg-white border border-slate-100 p-6 sm:p-8 rounded-2xl shadow-xs space-y-5">
            <h3 className="text-lg font-bold font-sans text-slate-900 border-b border-slate-50 pb-3 flex items-center gap-2">
              <span className="w-5 h-5 bg-amber-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center">1</span>
              Prime Delivery Shipping Address
            </h3>

            {errorMessage && (
              <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-xl text-rose-800 text-xs font-medium">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="johndoe@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+1 (555) 019-2834"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">Street Address Line 1</label>
                <input
                  type="text"
                  name="addressLine1"
                  required
                  placeholder="123 Main Street"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">Street Address Line 2 (Optional)</label>
                <input
                  type="text"
                  name="addressLine2"
                  placeholder="Apt 4B / Suite"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="New York"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">State / Region</label>
                <input
                  type="text"
                  name="state"
                  required
                  placeholder="NY"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">ZIP / Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  required
                  placeholder="10001"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white border border-slate-100 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
            <h3 className="text-lg font-bold font-sans text-slate-900 border-b border-slate-50 pb-3 flex items-center gap-2">
              <span className="w-5 h-5 bg-amber-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center">2</span>
              Secure Payment Section
            </h3>

            {/* Selector */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
                className={`p-4 rounded-xl border-2 text-left flex items-center gap-3 transition-all ${
                  formData.paymentMethod === 'card'
                    ? 'border-amber-500 bg-amber-50/20 text-slate-900'
                    : 'border-slate-100 bg-white hover:bg-slate-50 text-slate-600'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <div>
                  <span className="text-xs font-bold block">Credit/Debit Card</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Stripe / Visa / Master</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'external_pay' }))}
                className={`p-4 rounded-xl border-2 text-left flex items-center gap-3 transition-all ${
                  formData.paymentMethod === 'external_pay'
                    ? 'border-amber-500 bg-amber-50/20 text-slate-900'
                    : 'border-slate-100 bg-white hover:bg-slate-50 text-slate-600'
                }`}
              >
                <ExternalLink className="w-5 h-5 text-amber-500 animate-pulse" />
                <div>
                  <span className="text-xs font-bold block">External Pay Link</span>
                  <span className="text-[10px] text-amber-600 font-medium block mt-0.5">Click sandbox pay</span>
                </div>
              </button>
            </div>

            {/* Dynamic UI Content based on Payment Method */}
            {formData.paymentMethod === 'card' ? (
              <div className="space-y-4 pt-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="4000 1234 5678 9010"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                    <CreditCard className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">Expiration Date</label>
                    <input
                      type="text"
                      name="cardExpiry"
                      placeholder="MM/YY"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">CVV / Security Code</label>
                    <input
                      type="password"
                      name="cardCvv"
                      placeholder="•••"
                      maxLength={3}
                      value={formData.cardCvv}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 pt-2 text-[10px] text-slate-400">
                  <Lock className="w-3.5 h-3.5" />
                  <span>256-bit Secure Socket Layer SSL military grade encryption standards.</span>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl space-y-3">
                <h4 className="text-amber-800 font-bold text-xs font-sans">External Redirect Payment Link Trigger</h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  By selecting this option, you are directed to pay via the secure external checkout endpoint. Ideal for processing international currencies.
                </p>
                <a
                  href="https://paypal.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-xs transition-colors"
                >
                  Pay on PayPal Sandbox
                  <ExternalLink className="w-3 h-3 text-white" />
                </a>
              </div>
            )}
          </div>
        </form>

        {/* Right Column: Checkout Sticky Card */}
        <div className="bg-slate-50 border border-slate-200/60 p-6 rounded-2xl space-y-5 lg:sticky lg:top-28">
          <h3 className="text-slate-900 font-bold text-base font-sans uppercase tracking-wide">
            Your Purchase Summary
          </h3>

          {/* Collapsed small cart item list */}
          <div className="max-h-48 overflow-y-auto divide-y divide-slate-100 pr-1">
            {cartItems.map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 bg-white border rounded-md p-1 flex items-center justify-center shrink-0">
                    <img src={item.product.image} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 line-clamp-1">{item.product.name}</p>
                    <p className="text-[10px] text-slate-400">Qty: {item.quantity} {item.selectedColor ? `| ${item.selectedColor}` : ''}</p>
                  </div>
                </div>
                <span className="font-mono font-bold text-slate-900 shrink-0">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="w-full h-px border-t border-slate-200"></div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Checkout Subtotal</span>
              <span className="font-mono text-slate-700">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Estimated Sales Tax (8%)</span>
              <span className="font-mono text-slate-700">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Prime Delivery Fee</span>
              <span className="text-emerald-600 font-bold text-[10px] uppercase">FREE SHIPPING</span>
            </div>
            <div className="w-full h-px border-t border-slate-200 my-2"></div>
            <div className="flex justify-between font-bold text-sm text-slate-800">
              <span>Grand Total</span>
              <span className="font-mono text-slate-950">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full inline-flex items-center justify-center p-3 BG-amber-500 ${
                isSubmitting ? 'bg-amber-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-amber-500 cursor-pointer'
              } text-white font-bold text-xs rounded-xl transition-all duration-200 shadow-md gap-2`}
            >
              <CheckCircle2 className="w-4 h-4 text-white" />
              {isSubmitting ? 'Verifying Checkout Info...' : `PAY & COMLETE SECURE ORDER • $${total.toFixed(2)}`}
            </button>
            
            <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100/60 flex gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-[10px] text-emerald-700 leading-tight">
                <span className="font-bold block">MzAmazon Trusted Escrow</span>
                Refunds and transaction stability fully governed under standard buyer terms of service.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
