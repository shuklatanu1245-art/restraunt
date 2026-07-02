"use client";

import React, { useState, useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, Download, Printer, ShieldCheck } from 'lucide-react';
import { restaurantConfig } from '@/data/menu';

export default function TableTentQR() {
  const [tableNumber, setTableNumber] = useState('05');
  const [originUrl, setOriginUrl] = useState('https://qrbites.vercel.app');
  const [isClient, setIsClient] = useState(false);
  const printRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      setOriginUrl(window.location.origin);
    }
  }, []);

  const menuUrl = `${originUrl}/menu?table=${tableNumber}`;

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Table ${tableNumber} Tent Card - ${restaurantConfig.name}</title>
          <style>
            body {
              font-family: 'Outfit', sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
              background-color: #FDFBF7;
              color: #1E1214;
            }
            .tent-card {
              border: 4px solid #7A0C16;
              padding: 40px;
              border-radius: 20px;
              text-align: center;
              max-width: 400px;
              background-color: #ffffff;
              box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            }
            .header-bar {
              background-color: #7A0C16;
              color: #D4AF37;
              padding: 10px 20px;
              border-radius: 10px;
              font-size: 20px;
              font-weight: bold;
              margin-bottom: 20px;
              text-transform: uppercase;
              letter-spacing: 2px;
            }
            .logo {
              font-family: 'Playfair Display', serif;
              font-size: 32px;
              font-weight: bold;
              color: #7A0C16;
              margin-bottom: 5px;
            }
            .tagline {
              font-size: 12px;
              color: #3D2D30;
              margin-bottom: 30px;
              letter-spacing: 1px;
            }
            .qr-container {
              border: 8px solid #F5EFEB;
              padding: 15px;
              border-radius: 15px;
              display: inline-block;
              background: #ffffff;
              margin-bottom: 25px;
            }
            .table-label {
              font-size: 18px;
              font-weight: bold;
              color: #7A0C16;
              margin-bottom: 10px;
              text-transform: uppercase;
            }
            .table-number {
              font-size: 48px;
              font-weight: 900;
              color: #1E1214;
              margin-bottom: 20px;
              line-height: 1;
            }
            .instructions {
              font-size: 14px;
              color: #3D2D30;
              line-height: 1.5;
            }
            .highlight {
              color: #7A0C16;
              font-weight: bold;
            }
            .qr-container svg {
              width: 220px;
              height: 220px;
              display: block;
            }
            @media print {
              body {
                background: white;
              }
              .tent-card {
                border: 4px solid #7A0C16 !important;
                box-shadow: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="tent-card">
            <div class="logo">${restaurantConfig.name}</div>
            <div class="tagline">DIGITAL ORDERING & PAY</div>
            <div class="header-bar">Scan to Order</div>
            
            <div class="qr-container">
              ${document.getElementById('svg-qr-path')?.outerHTML || ''}
            </div>
            
            <div class="table-label">Table</div>
            <div class="table-number">${tableNumber}</div>
            <div class="instructions">
              Point your camera at the QR code<br/>
              to view our digital menu and <span class="highlight">Place Order</span>
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <section className="py-16 bg-cream-dark/50 border-y border-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Explain QR Ordering Flow */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-primary/5 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <QrCode className="w-4 h-4 text-accent" />
              <span>Contactless Dining</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-primary">
              How Scan to Order Works
            </h2>
            <p className="text-dark-muted font-sans leading-relaxed text-base sm:text-lg">
              Enjoy a modern, seamless dining experience. Follow three simple steps to browse, order, and pay directly from your table. No app downloads required!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="bg-white p-5 rounded-xl border border-accent/10 shadow-sm relative group hover:shadow-md transition-all duration-300">
                <span className="absolute top-4 right-4 text-3xl font-extrabold text-accent/20 font-serif">01</span>
                <h3 className="font-sans font-bold text-primary mb-2">Scan QR</h3>
                <p className="text-xs text-dark-muted leading-relaxed">
                  Open your phone camera and scan the QR code located on your table-tent card.
                </p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-accent/10 shadow-sm relative group hover:shadow-md transition-all duration-300">
                <span className="absolute top-4 right-4 text-3xl font-extrabold text-accent/20 font-serif">02</span>
                <h3 className="font-sans font-bold text-primary mb-2">Order Food</h3>
                <p className="text-xs text-dark-muted leading-relaxed">
                  Select your items, customize your order, and view your dynamic cart summary.
                </p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-accent/10 shadow-sm relative group hover:shadow-md transition-all duration-300">
                <span className="absolute top-4 right-4 text-3xl font-extrabold text-accent/20 font-serif">03</span>
                <h3 className="font-sans font-bold text-primary mb-2">Pay & Eat</h3>
                <p className="text-xs text-dark-muted leading-relaxed">
                  Submit order, pay securely with any UPI app (GPay, Paytm, PhonePe) and wait for service!
                </p>
              </div>
            </div>
          </div>

          {/* Interactive QR Generator and Table-Tent Card Preview */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Control Panel */}
            <div className="w-full max-w-sm mb-6 bg-white p-4 rounded-xl border border-accent/15 shadow-sm">
              <label htmlFor="table-select" className="block text-xs font-bold text-primary uppercase tracking-wide mb-2">
                Configure Table Number (for testing QR logic):
              </label>
              <div className="flex space-x-2">
                <select
                  id="table-select"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="bg-cream border border-accent/20 rounded-lg px-3 py-2 text-sm text-primary font-bold focus:outline-none focus:border-primary flex-grow"
                >
                  {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'].map(num => (
                    <option key={num} value={num}>Table {num}</option>
                  ))}
                </select>
                <button
                  onClick={handlePrint}
                  className="flex items-center justify-center space-x-2 bg-primary text-cream hover:bg-primary-dark hover:text-accent font-sans text-xs font-bold px-4 py-2.5 rounded-lg shadow transition-all duration-200"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Card</span>
                </button>
              </div>
            </div>

            {/* Tent Card Preview Container */}
            <div 
              ref={printRef}
              className="w-full max-w-sm border-2 border-primary p-6 rounded-2xl text-center bg-white shadow-xl relative group hover:scale-[1.01] transition-transform duration-300"
            >
              {/* Gold Top Banner */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-accent text-primary text-[10px] font-bold tracking-widest uppercase px-4 py-1 rounded-b-lg">
                Interactive Preview
              </div>

              <div className="font-serif text-2xl font-black text-primary mt-4 mb-1">
                {restaurantConfig.name}
              </div>
              <div className="text-[10px] text-accent font-semibold tracking-widest uppercase mb-6">
                Premium Gastronomy
              </div>

              {/* QR Container */}
              <div className="inline-block p-4 border border-accent/20 rounded-xl bg-cream-dark/30 mb-6">
                {isClient ? (
                  <QRCodeSVG
                    id="svg-qr-path"
                    value={menuUrl}
                    size={160}
                    bgColor={"#ffffff"}
                    fgColor={"#1E1214"}
                    level={"H"}
                    includeMargin={true}
                  />
                ) : (
                  <div className="w-40 h-40 bg-cream-dark animate-pulse flex items-center justify-center text-xs text-primary font-bold uppercase tracking-wide">
                    Loading QR...
                  </div>
                )}
              </div>

              <div className="text-xs font-bold text-accent uppercase tracking-wider mb-1">
                Your Table Number
              </div>
              <div className="text-4xl font-black text-primary mb-4 font-serif">
                {tableNumber}
              </div>

              <div className="text-xs text-dark-muted font-medium bg-cream py-2.5 px-4 rounded-lg leading-relaxed flex items-center justify-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>Scan with your phone camera to order</span>
              </div>
            </div>

            {/* Test Link Alert */}
            <div className="mt-4 text-center">
              <span className="text-[11px] text-dark-muted block">
                Testing URL target:
              </span>
              <a 
                href={menuUrl} 
                className="text-xs font-semibold text-primary underline hover:text-accent break-all max-w-[340px] block"
              >
                {menuUrl}
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
