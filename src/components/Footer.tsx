import React from 'react';
import { MapPin, Phone, Clock, Mail, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#201A1A] text-[#ECE0DF] pt-16 pb-12 border-t border-[#362F2F]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Omotenashi Statement */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#7A1520] text-white flex items-center justify-center font-serif text-lg font-bold">
                髙
              </div>
              <div>
                <div className="font-serif text-xl font-bold tracking-tight text-white">
                  Takashimaya Prestige
                </div>
                <div className="text-xs uppercase tracking-widest text-[#C59B57]">
                  Ginza Elegance · Ngee Ann City Singapore
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#ECE0DF]/80 leading-relaxed max-w-sm">
              Dedicated to the spirit of <em>omotenashi</em> since our founding in Kyoto in 1831, welcoming patrons with heartfelt grace at Singapore’s iconic Orchard Road address.
            </p>

            <div className="pt-2 text-xs text-[#C59B57] font-serif">
              「温故知新」· Cherishing heritage while creating new refinement.
            </div>
          </div>

          {/* Department Floor Directory */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-white">
              Floor Directory & Salons
            </div>
            <ul className="space-y-1.5 text-xs text-[#ECE0DF]/75">
              <li>
                <strong className="text-white">Level 3:</strong> The Rose Suite VIP Lounge · Haute Horlogerie
              </li>
              <li>
                <strong className="text-white">Level 2:</strong> International Fashion · Tsutsumi Gifting Counter
              </li>
              <li>
                <strong className="text-white">Level 1:</strong> Fine Jewelry · Luxury Cosmetics · Valet Drop-off
              </li>
              <li>
                <strong className="text-white">Basement 2:</strong> Depachika Gourmet Food Hall & Japanese Sweets
              </li>
            </ul>
          </div>

          {/* Store Location & Concierge Contact */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-white">
              Patron Concierge
            </div>
            <div className="space-y-2 text-xs text-[#ECE0DF]/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C59B57] shrink-0 mt-0.5" />
                <span>391 Orchard Road, Ngee Ann City, Singapore 238873</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C59B57] shrink-0" />
                <span>Daily: 10:00 AM – 9:30 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C59B57] shrink-0" />
                <span>+65 6738 1111 (Concierge Desk)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#ECE0DF]/60 gap-4">
          <div>
            © 2026 Takashimaya Singapore Ltd. All rights reserved. Ngee Ann City Orchard Road.
          </div>
          <div className="flex items-center gap-6">
            <span>Prestige Membership Privacy Charter</span>
            <span>Terms of Omotenashi</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
