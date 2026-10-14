import React, { useState } from 'react';
import { X, QrCode, Sun, Shield, Check, Copy } from 'lucide-react';
import { MemberProfile } from '../types';
import { PRESTIGE_TIERS } from '../data/mockData';

interface DigitalPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: MemberProfile;
}

export const DigitalPassModal: React.FC<DigitalPassModalProps> = ({
  isOpen,
  onClose,
  member,
}) => {
  const [copied, setCopied] = useState(false);
  const [highBrightness, setHighBrightness] = useState(true);

  if (!isOpen) return null;

  const tierInfo = PRESTIGE_TIERS[member.tier];

  const handleCopyId = () => {
    navigator.clipboard?.writeText(member.memberId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-3xl border border-[#EEDCD4] overflow-hidden shadow-2xl flex flex-col">
        {/* Top Header */}
        <div className="p-4 px-6 bg-[#7A1520] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-white/20 flex items-center justify-center font-serif font-bold text-xs text-white">
              髙
            </div>
            <div>
              <div className="font-serif text-sm font-bold tracking-wider uppercase">
                TAKASHIMAYA PRESTIGE
              </div>
              <div className="text-[10px] text-white/80">Digital Membership Pass</div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Member Details Strip */}
        <div className="p-6 bg-[#FFF8F7] border-b border-[#EEDCD4] text-center space-y-1">
          <div className="inline-block px-3 py-1 rounded-full bg-[#F8EBEA] border border-[#C59B57] text-[#7A1520] text-xs font-bold uppercase tracking-widest">
            {tierInfo.name} · {tierInfo.japaneseName}
          </div>
          <div className="font-serif text-xl sm:text-2xl font-bold text-[#201A1A] pt-1">
            {member.name}
          </div>
          <button
            onClick={handleCopyId}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[#8A7170] hover:text-[#7A1520] transition-colors cursor-pointer"
          >
            <span>{member.memberId}</span>
            {copied ? <Check className="w-3.5 h-3.5 text-[#16A34A]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* QR & Barcode Section */}
        <div
          className={`p-6 sm:p-8 flex flex-col items-center justify-center space-y-5 transition-colors ${
            highBrightness ? 'bg-white' : 'bg-[#FAFAFA]'
          }`}
        >
          {/* QR Code Container */}
          <div className="p-3 bg-white border-2 border-[#201A1A] rounded-2xl shadow-md">
            <QrCode className="w-44 h-44 text-[#201A1A]" />
          </div>

          {/* 1D Barcode Container */}
          <div className="w-full space-y-1.5">
            <div className="w-full h-12 bg-white px-4 py-2 border border-[#E0CEC5] rounded-md flex items-center justify-between">
              <div className="h-full w-full flex items-stretch justify-between gap-[2px]">
                {Array.from({ length: 44 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-black"
                    style={{
                      width: i % 3 === 0 ? '3px' : i % 2 === 0 ? '2px' : '1px',
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="text-center font-mono text-xs font-semibold tracking-widest text-[#574141]">
              {member.memberId}
            </div>
          </div>
        </div>

        {/* Footer controls */}
        <div className="p-4 bg-[#F8EBEA] border-t border-[#EEDCD4] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#574141]">
            <Sun className="w-4 h-4 text-[#C59B57]" />
            <span>High-contrast scanner mode</span>
          </div>

          <button
            onClick={() => setHighBrightness(!highBrightness)}
            className="px-3 py-1 rounded-md bg-white border border-[#EEDCD4] text-[11px] font-semibold text-[#201A1A] hover:bg-[#F2E5E5] cursor-pointer"
          >
            {highBrightness ? 'Standard' : 'Boost'}
          </button>
        </div>
      </div>
    </div>
  );
};
