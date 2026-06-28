"use client";

import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import toast from 'react-hot-toast';

export default function CheckoutForm({ bookingId, amount, onSuccess, onClose }) {
  const stripe = useStripe();
  const elements = useElements();
  const axiosPublic = useAxiosPublic();
  
  const [paymentError, setPaymentError] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card == null) return;

    setProcessing(true);
    setPaymentError("");

    
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setPaymentError(error.message);
      toast.error(error.message);
      setProcessing(false);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      
      try {
        
        const response = await axiosPublic.patch(`/bookings/${bookingId}/confirm-payment`);
        
        if (response.data.modifiedCount > 0) {
          toast.success("Payment Successful! Booking Confirmed.");
          onSuccess(); 
          onClose();   
        } else {
          setPaymentError("Failed to update payment status in database.");
          toast.error("Database update failed.");
        }
      } catch (err) {
        console.error("Backend update error:", err);
        setPaymentError("Server error during payment confirmation.");
        toast.error("Server error during payment.");
      } finally {
        setProcessing(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-sm text-blueprint-charcoal">
      {/* স্ট্রাইপ কার্ড ইনপুট ফিল্ড */}
      <div className="border border-blueprint-charcoal/15 p-4 rounded-sm bg-blueprint-paper/20">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '15px',
                color: '#1a242f', // blueprint-charcoal style
                fontFamily: 'monospace',
                '::placeholder': { color: '#aab7c4' },
              },
              invalid: { color: '#9e2146' },
            },
          }}
        />
      </div>

      {paymentError && (
        <p className="text-red-600 text-xs font-mono">{paymentError}</p>
      )}

      
      <div className="flex justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-blueprint-charcoal/10 rounded-sm text-blueprint-charcoal hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || processing}
          className="px-4 py-2 bg-blueprint-amber text-blueprint-ink font-medium rounded-sm hover:bg-blueprint-amber/90 transition-colors disabled:opacity-50"
        >
          {processing ? "Processing..." : `Pay ৳${Number(amount).toLocaleString()}`}
        </button>
      </div>
    </form>
  );
}