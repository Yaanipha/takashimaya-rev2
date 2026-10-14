import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, CheckCircle2, Gift } from 'lucide-react';
import { CartItem, MemberProfile } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  member: MemberProfile;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  member,
}) => {
  const [wrappingOption, setWrappingOption] = useState<'standard' | 'furoshiki' | 'rose_paper'>('furoshiki');
  const [pickupMethod, setPickupMethod] = useState<'concierge_pickup' | 'orchard_delivery'>('concierge_pickup');
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [orderCode, setOrderCode] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Gold Prestige 10% privilege discount
  const tierDiscountPercent =
    member.tier === 'diamond'
      ? 0.15
      : member.tier === 'platinum'
      ? 0.12
      : member.tier === 'gold'
      ? 0.10
      : member.tier === 'silver'
      ? 0.08
      : 0.05;

  const tierDiscountAmount = rawSubtotal * tierDiscountPercent;
  const finalTotal = Math.max(0, rawSubtotal - tierDiscountAmount);
  const pointsEarned = Math.round(finalTotal * 2.0); // 2x points for Gold

  const handleCheckout = () => {
    const code = `NAC-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderCode(code);
    setCheckoutComplete(true);
  };

  const handleFinish = () => {
    setCheckoutComplete(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFF8F7] border-l border-[#EEDCD4] shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-6 bg-white border-b border-[#EEDCD4] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#7A1520] text-white flex items-center justify-center font-serif text-sm font-bold">
                髙
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#201A1A]">
                  Shopping Bag
                </h3>
                <div className="text-[11px] text-[#8A7170]">
                  {items.length} {items.length === 1 ? 'item' : 'items'} · Takashimaya Prestige
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#8A7170] hover:text-[#201A1A] hover:bg-[#F8EBEA] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          {!checkoutComplete ? (
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#F8EBEA] flex items-center justify-center text-[#7A1520]">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div className="font-serif text-base font-bold text-[#201A1A]">
                    Your bag is empty
                  </div>
                  <p className="text-xs text-[#574141] max-w-xs mx-auto">
                    Explore our B2 Depachika confections, fine jewelry, and Rose-chan collectibles.
                  </p>
                </div>
              ) : (
                <>
                  {/* Items List */}
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="p-4 rounded-xl bg-white border border-[#EEDCD4] shadow-xs flex gap-3.5"
                      >
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#F7EDE8] shrink-0 border border-[#EEDCD4]">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="text-[10px] uppercase font-semibold text-[#8A7170]">
                              {item.product.categoryLabel}
                            </div>
                            <div className="text-xs font-bold text-[#201A1A] line-clamp-1">
                              {item.product.name}
                            </div>
                            <div className="font-mono text-xs font-bold text-[#7A1520] mt-0.5 tabular-nums">
                              S${item.product.price.toLocaleString()}
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            {/* Quantity Stepper */}
                            <div className="flex items-center border border-[#E0CEC5] rounded-md overflow-hidden h-7">
                              <button
                                onClick={() =>
                                  onUpdateQuantity(item.product.id, item.quantity - 1)
                                }
                                className="w-7 h-full flex items-center justify-center hover:bg-[#F8EBEA] text-[#201A1A] cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-xs font-mono font-bold text-[#201A1A]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  onUpdateQuantity(item.product.id, item.quantity + 1)
                                }
                                className="w-7 h-full flex items-center justify-center hover:bg-[#F8EBEA] text-[#201A1A] cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Remove button */}
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-xs text-[#8A7170] hover:text-[#BA1A1A] transition-colors p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tsutsumi Wrapping Selection */}
                  <div className="p-4 rounded-xl bg-[#F8EBEA] border border-[#EEDCD4] space-y-2.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#201A1A]">
                      <Gift className="w-4 h-4 text-[#7A1520]" />
                      <span>Complimentary Tsutsumi Gift Wrapping</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setWrappingOption('furoshiki')}
                        className={`p-2 rounded-lg border text-left cursor-pointer transition-colors ${
                          wrappingOption === 'furoshiki'
                            ? 'bg-white border-[#7A1520] font-semibold text-[#7A1520]'
                            : 'bg-white/60 border-[#E0CEC5] text-[#574141]'
                        }`}
                      >
                        Silk Furoshiki Wrap
                      </button>

                      <button
                        type="button"
                        onClick={() => setWrappingOption('rose_paper')}
                        className={`p-2 rounded-lg border text-left cursor-pointer transition-colors ${
                          wrappingOption === 'rose_paper'
                            ? 'bg-white border-[#7A1520] font-semibold text-[#7A1520]'
                            : 'bg-white/60 border-[#E0CEC5] text-[#574141]'
                        }`}
                      >
                        Heritage Rose Paper
                      </button>
                    </div>
                  </div>

                  {/* Pickup / Delivery Selection */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-[#201A1A]">
                      Collection Method
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setPickupMethod('concierge_pickup')}
                        className={`p-2.5 rounded-lg border text-left cursor-pointer ${
                          pickupMethod === 'concierge_pickup'
                            ? 'bg-white border-[#7A1520] font-bold text-[#7A1520]'
                            : 'bg-white border-[#E0CEC5] text-[#574141]'
                        }`}
                      >
                        <div>Concierge Pickup</div>
                        <div className="text-[10px] text-[#8A7170] font-normal">Level 1 Counter</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPickupMethod('orchard_delivery')}
                        className={`p-2.5 rounded-lg border text-left cursor-pointer ${
                          pickupMethod === 'orchard_delivery'
                            ? 'bg-white border-[#7A1520] font-bold text-[#7A1520]'
                            : 'bg-white border-[#E0CEC5] text-[#574141]'
                        }`}
                      >
                        <div>Chilled Delivery</div>
                        <div className="text-[10px] text-[#8A7170] font-normal">Complimentary for VIP</div>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            /* Order Confirmation View */
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="font-serif text-2xl font-bold text-[#201A1A]">
                Arigato Gozaimasu
              </div>
              <p className="text-xs text-[#574141] max-w-xs">
                Your luxury order has been received and is being prepared with Japanese craftsmanship.
              </p>

              <div className="w-full p-4 rounded-xl bg-white border border-[#EEDCD4] space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#8A7170]">Order Reference</span>
                  <span className="font-mono font-bold text-[#201A1A]">{orderCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A7170]">Collection</span>
                  <span className="font-semibold text-[#201A1A]">
                    {pickupMethod === 'concierge_pickup' ? 'Level 1 VIP Concierge' : 'Same-Day Chilled Delivery'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A7170]">Total Settled</span>
                  <span className="font-mono font-bold text-[#7A1520]">S${finalTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-[#EEDCD4] pt-2">
                  <span className="text-[#8A7170]">Points Credited</span>
                  <span className="font-mono font-bold text-[#C59B57]">+{pointsEarned.toLocaleString()} pts</span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-3.5 bg-[#7A1520] hover:bg-[#8E1C27] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Return to Storefront
              </button>
            </div>
          )}

          {/* Drawer Footer Summary */}
          {items.length > 0 && !checkoutComplete && (
            <div className="p-6 bg-white border-t border-[#EEDCD4] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#574141]">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">S${rawSubtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-[#7A1520] font-semibold">
                  <span>Prestige ({member.tier.toUpperCase()} 10% Privilege)</span>
                  <span className="font-mono tabular-nums">-S${tierDiscountAmount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#201A1A] pt-2 border-t border-[#EEDCD4]">
                  <span>Total Amount</span>
                  <span className="font-serif font-mono tabular-nums text-[#7A1520]">
                    S${finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="text-[11px] text-[#C59B57] font-semibold text-right">
                  Earns +{pointsEarned.toLocaleString()} Rose Points (2.0x Gold Rate)
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3.5 bg-[#7A1520] hover:bg-[#8E1C27] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#C59B57]" />
                <span>Complete Prestige Order</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
