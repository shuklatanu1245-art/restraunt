"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { CreditCard, CheckCircle2, ShieldCheck, ArrowLeft, RefreshCw } from 'lucide-react';
import { restaurantConfig } from '@/data/menu';
import Link from 'next/link';

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [amount, setAmount] = useState(0);
  const [orderId, setOrderId] = useState('');
  const [paymentDone, setPaymentDone] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const amt = parseFloat(searchParams.get('amount') || '0');
    const oid = searchParams.get('orderId') || `QR-${Math.floor(1000 + Math.random() * 9000)}`;
    setAmount(amt);
    setOrderId(oid);
  }, [searchParams]);

  // UPI standard URI: upi://pay?pa=address&pn=name&am=amount&tn=transactionNote&cu=currency
  const upiUrl = `upi://pay?pa=${restaurantConfig.upiId}&pn=${encodeURIComponent(restaurantConfig.name)}&am=${amount}&tn=${encodeURIComponent(orderId)}&cu=INR`;

  const simulatePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPaymentDone(true);
    }, 2000);
  };

  if (paymentDone) {
    return (
      <div className="min-h-[80vh] bg-cream flex items-center justify-center p-4">
        <div className="bg-white border border-accent/15 rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl animate-fadeInUp">
          <div className="w-20 h-20 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] text-accent font-extrabold uppercase tracking-widest block">Payment Complete</span>
            <h2 className="font-serif text-3xl font-black text-primary">Thank You!</h2>
            <p className="text-sm text-dark-muted font-sans max-w-xs mx-auto">
              Your payment of <strong className="text-primary font-bold">₹{amount}</strong> for Order <strong className="text-primary font-bold">{orderId}</strong> has been successfully captured.
            </p>
          </div>

          <div className="bg-cream rounded-xl p-4 text-xs text-left font-sans space-y-1.5 border border-accent/10">
            <div className="flex justify-between text-dark-muted">
              <span>Transaction ID</span>
              <span className="font-semibold text-primary">TXN{Math.floor(1000000000 + Math.random() * 9000000000)}</span>
            </div>
            <div className="flex justify-between text-dark-muted">
              <span>Paid to</span>
              <span className="font-semibold text-primary">{restaurantConfig.name}</span>
            </div>
            <div className="flex justify-between text-dark-muted">
              <span>Payment Mode</span>
              <span className="font-semibold text-primary">UPI (GPay / PhonePe)</span>
            </div>
          </div>

          <div className="pt-2 space-y-3 font-sans">
            <Link
              href="/feedback"
              className="w-full py-3.5 bg-[#7A0C16] hover:bg-primary-light text-cream hover:text-accent text-xs font-bold uppercase rounded-xl shadow-lg transition-all block text-center"
            >
              Share Your Experience
            </Link>
            
            <Link
              href="/"
              className="text-xs text-dark-muted font-semibold underline hover:text-primary block"
            >
              Go to Home Page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-cream py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white border border-accent/15 rounded-3xl overflow-hidden shadow-2xl animate-fadeInUp">
        
        {/* Banner */}
        <div className="bg-primary text-cream p-6 text-center space-y-2 relative border-b border-accent/20">
          <Link href="/menu" className="absolute left-6 top-1/2 -translate-y-1/2 text-cream/70 hover:text-accent transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="text-[10px] text-accent font-extrabold uppercase tracking-widest block">Checkout</span>
          <h2 className="font-serif text-xl font-bold">UPI Secure Checkout</h2>
        </div>

        {/* Info */}
        <div className="p-6 sm:p-8 space-y-6 text-center">
          
          <div className="space-y-1 font-sans">
            <span className="text-xs text-dark-muted uppercase tracking-wider block">Total Amount to Pay</span>
            <span className="text-4xl font-black text-primary font-serif">₹{amount}</span>
            <span className="text-xs text-accent font-semibold block">Order ID: {orderId}</span>
          </div>

          {/* QR Display */}
          <div className="inline-block p-5 border border-accent/15 rounded-2xl bg-cream-dark/20 relative group">
            <QRCodeSVG
              value={upiUrl}
              size={180}
              bgColor={"#ffffff"}
              fgColor={"#1E1214"}
              level={"H"}
              includeMargin={true}
            />
            {/* Overlay instruction */}
            <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
              <CreditCard className="w-8 h-8 text-primary mb-2" />
              <p className="text-[10px] text-dark font-semibold leading-relaxed">
                Scanning on a phone launches your UPI application instantly.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-cream py-3 px-4 rounded-xl text-xs text-dark-muted font-sans leading-relaxed border border-accent/10">
              Scan this QR code with any UPI app (<strong className="text-primary font-semibold">GPay, PhonePe, Paytm</strong>) to complete your payment.
            </div>

            <div className="flex items-center justify-center space-x-1.5 text-xs text-dark-muted font-sans font-medium">
              <ShieldCheck className="w-4.5 h-4.5 text-[#25D366]" />
              <span>100% Encrypted UPI Transaction</span>
            </div>
          </div>

          {/* Simulator button */}
          <div className="pt-4 border-t border-accent/10 space-y-3 font-sans">
            <p className="text-[10px] text-dark-muted">
              Testing locally? Click below to simulate instant UPI payment success.
            </p>
            <button
              onClick={simulatePayment}
              disabled={loading}
              className="w-full py-3.5 bg-primary hover:bg-primary-light text-cream hover:text-accent text-xs font-bold uppercase rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-accent" />
                  <span>Verifying Transaction...</span>
                </>
              ) : (
                <span>Simulate Payment Success</span>
              )}
            </button>
            
            <Link
              href="/menu"
              className="text-xs text-dark-muted font-semibold underline hover:text-primary block mt-2"
            >
              Cancel & Back to Menu
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-accent rounded-full animate-spin"></div>
        <p className="font-sans text-xs text-primary font-bold uppercase tracking-wider">Loading Checkout...</p>
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
}
