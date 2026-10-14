import React, { useState } from 'react';
import { X, ShoppingBag, Check, ShieldCheck, Sparkles, MapPin, Plus, Minus } from 'lucide-react';
import { ProductItem, MemberProfile } from '../types';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToCart: (product: ProductItem, quantity: number) => void;
  member: MemberProfile;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  member,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#EEDCD4] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#201A1A] transition-colors shadow-sm cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Media Left */}
        <div className="w-full md:w-1/2 bg-[#F7EDE8] relative aspect-square md:aspect-auto">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {product.badge && (
            <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-[#201A1A]/80 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider">
              {product.badge}
            </div>
          )}
        </div>

        {/* Product Information Right */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <div className="text-xs font-semibold text-[#8A7170] uppercase tracking-wider">
                {product.origin}
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#201A1A] mt-1 leading-tight">
                {product.name}
              </h3>
              <div className="text-xs text-[#7A1520] font-medium font-serif mt-1">
                {product.japaneseName}
              </div>
            </div>

            {/* Price */}
            <div className="p-3 bg-[#F8EBEA] rounded-xl border border-[#EEDCD4] flex items-center justify-between">
              <div>
                <div className="text-[10px] text-[#8A7170] uppercase">Retail Price</div>
                <div className="font-mono text-xl font-bold text-[#201A1A] tabular-nums">
                  S${product.price.toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-[#8A7170] uppercase">Gold Member (10% Off)</div>
                <div className="font-mono text-sm font-bold text-[#7A1520] tabular-nums">
                  S${(product.price * 0.9).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#574141] leading-relaxed">
              {product.description}
            </p>

            {/* Craftsmanship Details */}
            <div className="space-y-2 pt-2 border-t border-[#EEDCD4]">
              <div className="text-xs font-bold text-[#201A1A] uppercase tracking-wider">
                Curator's Notes & Provenance
              </div>
              <ul className="space-y-1.5 text-xs text-[#574141]">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#C59B57] font-bold">·</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-[#EEDCD4] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#201A1A]">Select Quantity</span>
              <div className="flex items-center border border-[#E0CEC5] rounded-lg overflow-hidden h-9">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-full flex items-center justify-center hover:bg-[#F8EBEA] text-[#201A1A] cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-xs font-mono font-bold text-[#201A1A]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-full flex items-center justify-center hover:bg-[#F8EBEA] text-[#201A1A] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAdd}
              disabled={added}
              className={`w-full py-3.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                added
                  ? 'bg-[#16A34A] text-white'
                  : 'bg-[#7A1520] hover:bg-[#8E1C27] text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Shopping Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#C59B57]" />
                  <span>Add {quantity} to Bag (S${(product.price * quantity).toLocaleString()})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
