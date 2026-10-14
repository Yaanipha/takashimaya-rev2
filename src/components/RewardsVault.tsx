import React, { useState } from 'react';
import { Gift, Sparkles, QrCode, CheckCircle2, Calendar, Award, Check } from 'lucide-react';
import { MemberProfile, VoucherItem } from '../types';
import { VOUCHERS_LIST } from '../data/mockData';

interface RewardsVaultProps {
  member: MemberProfile;
  onUpdatePoints: (newPoints: number) => void;
}

export const RewardsVault: React.FC<RewardsVaultProps> = ({
  member,
  onUpdatePoints,
}) => {
  const [vouchers, setVouchers] = useState<VoucherItem[]>(VOUCHERS_LIST);
  const [activeVoucherModal, setActiveVoucherModal] = useState<VoucherItem | null>(null);
  const [successFeedback, setSuccessFeedback] = useState<string | null>(null);

  const handleRedeem = (voucher: VoucherItem) => {
    if (member.currentPoints < voucher.pointsCost) {
      alert(`Insufficient Rose Points. You have ${member.currentPoints.toLocaleString()} pts, but this voucher requires ${voucher.pointsCost.toLocaleString()} pts.`);
      return;
    }

    const updatedPoints = member.currentPoints - voucher.pointsCost;
    onUpdatePoints(updatedPoints);

    const updatedVouchers = vouchers.map((v) =>
      v.id === voucher.id
        ? {
            ...v,
            claimed: true,
            code: `NAC-${Math.floor(1000 + Math.random() * 9000)}-${v.category.toUpperCase().slice(0, 3)}`,
          }
        : v
    );
    setVouchers(updatedVouchers);

    setSuccessFeedback(`Successfully redeemed "${voucher.title}"! Added to your active vouchers.`);
    setTimeout(() => setSuccessFeedback(null), 5000);
  };

  const claimedVouchers = vouchers.filter((v) => v.claimed);
  const availableVouchers = vouchers.filter((v) => !v.claimed);

  return (
    <section id="rewards" className="py-12 sm:py-16 bg-[#FDF9F6] border-b border-[#EEDCD4]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-widest text-[#7A1520] uppercase mb-1">
              ポイント＆リワード · Loyalty Privileges
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#201A1A] tracking-tight">
              Rose Points & Exclusive Privileges
            </h2>
            <p className="text-sm sm:text-base text-[#574141] mt-2">
              Every point earned reflects your patronage. Redeem instantly for department cash credits, private lounge gastronomic experiences, or valet services.
            </p>
          </div>

          {/* Points Balance Card */}
          <div className="p-4 rounded-xl bg-white border border-[#EEDCD4] shadow-sm flex items-center gap-4 self-start md:self-end shrink-0">
            <div className="w-12 h-12 rounded-lg bg-[#F8EBEA] text-[#7A1520] flex items-center justify-center font-serif text-lg font-bold border border-[#EEDCD4]">
              髙
            </div>
            <div>
              <div className="text-xs text-[#8A7170] uppercase tracking-wider font-semibold">
                Available Rose Points
              </div>
              <div className="font-serif text-2xl font-bold font-mono text-[#7A1520] tabular-nums">
                {member.currentPoints.toLocaleString()} <span className="text-xs font-normal text-[#574141]">pts</span>
              </div>
              <div className="text-[11px] text-[#C59B57] font-semibold">
                ≈ S${(member.currentPoints / 100).toFixed(2)} in shopping credits
              </div>
            </div>
          </div>
        </div>

        {successFeedback && (
          <div className="mb-6 p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] text-xs sm:text-sm font-semibold flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0" />
            <span>{successFeedback}</span>
          </div>
        )}

        {/* 2-Column Split: Active Vouchers Wallet Left & Redeemable Catalog Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Active Claimed Vouchers */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-[#F7EDE8] border border-[#EEDCD4] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase font-semibold text-[#7A1520] tracking-wider">
                    My Active Vouchers ({claimedVouchers.length})
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#201A1A]">
                    Ready to Present at Cashier
                  </h3>
                </div>
              </div>

              {claimedVouchers.length > 0 ? (
                <div className="space-y-3">
                  {claimedVouchers.map((v) => (
                    <div
                      key={v.id}
                      className="p-4 rounded-xl bg-white border border-[#EEDCD4] hover:border-[#7A1520] transition-colors shadow-xs space-y-2.5"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-xs font-bold text-[#201A1A] line-clamp-1">
                            {v.title}
                          </div>
                          <div className="text-[10px] text-[#8A7170]">
                            Valid until {v.validUntil}
                          </div>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#7A1520] shrink-0">
                          {v.valueDisplay}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-[#EEDCD4]/70">
                        <span className="font-mono text-[11px] text-[#574141]">
                          Code: {v.code}
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveVoucherModal(v)}
                          className="px-3 py-1 bg-[#7A1520] hover:bg-[#8E1C27] text-white text-[11px] font-semibold rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <QrCode className="w-3 h-3 text-[#C59B57]" />
                          <span>Show QR</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center text-xs text-[#8A7170]">
                  No active vouchers in your wallet. Redeem from the catalog on the right!
                </div>
              )}
            </div>

            {/* Loyalty Milestone Note */}
            <div className="p-4 rounded-xl bg-white border border-[#EEDCD4] text-xs text-[#574141] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#201A1A]">
                <Calendar className="w-4 h-4 text-[#C59B57]" />
                <span>Upcoming Privilege Events</span>
              </div>
              <div>· <strong>Double Points Weekend:</strong> Last Saturday of every month across B2 & L1</div>
              <div>· <strong>Birthday Month Confectionery:</strong> Receive a complimentary box of Kyoto Wagashi on your birthday month.</div>
            </div>
          </div>

          {/* Right Column: Catalog of Redeemable Rewards */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#7A1520]">
              Available Rewards Catalog
            </div>

            <div className="space-y-3">
              {vouchers.map((v) => {
                const canAfford = member.currentPoints >= v.pointsCost;

                return (
                  <div
                    key={v.id}
                    className="p-5 rounded-2xl bg-white border border-[#EEDCD4] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F8EBEA] text-[#7A1520] border border-[#EEDCD4]">
                          {v.category}
                        </span>
                        <span className="text-xs text-[#8A7170]">{v.japaneseTitle}</span>
                      </div>
                      <div className="font-serif text-base font-bold text-[#201A1A]">
                        {v.title}
                      </div>
                      <p className="text-xs text-[#574141] max-w-lg">
                        {v.description}
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-[#EEDCD4]">
                      <div className="text-right">
                        <div className="font-mono text-base font-bold text-[#7A1520] tabular-nums">
                          {v.pointsCost.toLocaleString()} pts
                        </div>
                        <div className="text-[10px] text-[#8A7170]">
                          {v.valueDisplay}
                        </div>
                      </div>

                      {v.claimed ? (
                        <div className="px-3 py-1.5 rounded-lg bg-[#F8EBEA] text-[#7A1520] text-xs font-semibold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>In Wallet</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleRedeem(v)}
                          disabled={!canAfford}
                          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            canAfford
                              ? 'bg-[#7A1520] hover:bg-[#8E1C27] text-white shadow-xs'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {canAfford ? 'Redeem Voucher' : 'Need More Points'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* QR Voucher Modal */}
      {activeVoucherModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl border border-[#EEDCD4] p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs uppercase font-semibold text-[#7A1520] tracking-wider">
                  Digital Privilege Voucher
                </div>
                <h4 className="font-serif text-lg font-bold text-[#201A1A] mt-0.5">
                  {activeVoucherModal.title}
                </h4>
              </div>
              <button
                onClick={() => setActiveVoucherModal(null)}
                className="text-[#8A7170] hover:text-[#201A1A] text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* QR Area */}
            <div className="p-6 bg-[#F8EBEA] rounded-xl border border-[#EEDCD4] flex flex-col items-center justify-center space-y-3 text-center">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <QrCode className="w-40 h-40 text-[#201A1A]" />
              </div>
              <div className="font-mono text-base font-bold text-[#201A1A] tracking-widest">
                {activeVoucherModal.code}
              </div>
              <p className="text-xs text-[#574141] max-w-xs">
                Present this QR code to the cashier at Takashimaya Square B2 or department checkout counters.
              </p>
            </div>

            <button
              onClick={() => setActiveVoucherModal(null)}
              className="w-full py-3 bg-[#7A1520] hover:bg-[#8E1C27] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Done & Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
