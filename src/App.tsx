import React, { useState } from 'react';
import { MobileTopBar } from './components/MobileTopBar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { HomePageView } from './components/HomePageView';
import { TierStudio } from './components/TierStudio';
import { TierTable } from './components/TierTable';
import { ConciergeSuite } from './components/ConciergeSuite';
import { DepachikaShowcase } from './components/DepachikaShowcase';
import { RewardsVault } from './components/RewardsVault';
import { RoseChanWidget } from './components/RoseChanWidget';
import { CartDrawer } from './components/CartDrawer';
import { DigitalPassModal } from './components/DigitalPassModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { INITIAL_MEMBER } from './data/mockData';
import { MemberProfile, ProductItem, CartItem, AppPage } from './types';
import { Smartphone, Maximize2, Wifi, Battery, ChevronLeft, QrCode } from 'lucide-react';

export default function App() {
  const [member, setMember] = useState<MemberProfile>(INITIAL_MEMBER);
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [conciergeInitialTab, setConciergeInitialTab] = useState<'lounge' | 'valet' | 'shopper' | 'tsutsumi'>('lounge');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [inspectedProduct, setInspectedProduct] = useState<ProductItem | null>(null);
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);

  // Cart Handlers
  const handleAddToCart = (product: ProductItem, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleUpdatePoints = (newPoints: number) => {
    setMember((prev) => ({ ...prev, currentPoints: newPoints }));
  };

  // Mobile Page Navigator
  const handleNavigate = (page: AppPage, subTab?: string) => {
    setCurrentPage(page);
    if (subTab && (subTab === 'lounge' || subTab === 'valet' || subTab === 'shopper' || subTab === 'tsutsumi')) {
      setConciergeInitialTab(subTab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Content rendering based on current active mobile page
  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePageView
            member={member}
            onNavigate={handleNavigate}
            onOpenPass={() => setIsPassModalOpen(true)}
            onSelectProduct={(prod) => setInspectedProduct(prod)}
            onAddToCart={(prod) => handleAddToCart(prod, 1)}
          />
        );

      case 'tiers':
        return (
          <div className="space-y-6">
            <TierStudio
              member={member}
              onOpenPassModal={() => setIsPassModalOpen(true)}
            />
            <TierTable />
          </div>
        );

      case 'depachika':
        return (
          <DepachikaShowcase
            member={member}
            onAddToCart={(prod) => handleAddToCart(prod, 1)}
            onSelectProduct={(prod) => setInspectedProduct(prod)}
          />
        );

      case 'concierge':
        return (
          <ConciergeSuite
            member={member}
            initialTab={conciergeInitialTab}
          />
        );

      case 'vault':
        return (
          <RewardsVault
            member={member}
            onUpdatePoints={handleUpdatePoints}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen text-[#201A1A] font-sans antialiased selection:bg-[#7A1520] selection:text-white ${
      isPhoneFrame ? 'bg-[#181414] py-0 sm:py-6' : 'bg-[#FFF8F7]'
    }`}>
      {/* Desktop Simulation Banner (only shown on desktop view) */}
      <div className="hidden md:flex items-center justify-between px-6 py-2 max-w-5xl mx-auto text-xs text-[#EEDCD4] mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C59B57]" />
          <span className="font-serif font-semibold text-white">Takashimaya Singapore Prestige Mobile App</span>
          <span className="text-white/40">·</span>
          <span className="text-white/70">Ngee Ann City Orchard Road</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer"
          >
            {isPhoneFrame ? (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-[#C59B57]" />
                <span>Expanded Canvas View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-[#C59B57]" />
                <span>Mobile Device Scale (390px)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Container: Mobile Phone Frame or Expanded Canvas */}
      <div className={`mx-auto transition-all duration-300 ${
        isPhoneFrame
          ? 'w-full max-w-[428px] sm:rounded-[44px] bg-[#FFF8F7] sm:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_0_10px_#2B2424,0_0_0_12px_#423838] overflow-hidden flex flex-col min-h-screen sm:min-h-[844px] relative border-0 sm:border border-white/10'
          : 'w-full max-w-5xl bg-[#FFF8F7] flex flex-col min-h-screen'
      }`}>
        {/* iOS Dynamic Island & Status Bar Mockup (visible on smartphone frame) */}
        {isPhoneFrame && (
          <div className="hidden sm:flex items-center justify-between px-7 pt-3.5 pb-1 text-[#201A1A] select-none text-xs font-semibold shrink-0 bg-[#FFF8F7]">
            <span className="font-mono text-[11px] font-bold">9:41</span>
            {/* Dynamic Island Pill */}
            <div className="w-24 h-5 bg-[#201A1A] rounded-full flex items-center justify-end px-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#362F2F] inline-block" />
            </div>
            <div className="flex items-center gap-1.5">
              <Wifi className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono">5G</span>
              <Battery className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* Mobile Top Navigation Bar */}
        <MobileTopBar
          member={member}
          cartCount={totalCartCount}
          currentPage={currentPage}
          onSelectPage={handleNavigate}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenPass={() => setIsPassModalOpen(true)}
          isPhoneFrame={isPhoneFrame}
          onToggleFrame={() => setIsPhoneFrame(!isPhoneFrame)}
        />

        {/* Page View Body */}
        <main className="flex-1 overflow-y-auto">
          {renderPageContent()}
        </main>

        {/* Fixed Mobile Bottom Navigation Tab Bar */}
        <MobileBottomNav
          currentPage={currentPage}
          onSelectPage={handleNavigate}
          claimedVouchersCount={2}
        />

        {/* Home Indicator Bar for Phone Frame */}
        {isPhoneFrame && (
          <div className="hidden sm:flex items-center justify-center py-2 bg-[#FFF8F7] shrink-0">
            <div className="w-32 h-1 bg-[#201A1A]/30 rounded-full" />
          </div>
        )}
      </div>

      {/* Floating Rose-chan Mascot Assistant */}
      <RoseChanWidget />

      {/* Slide-in Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        member={member}
      />

      {/* VIP Digital Membership Pass Modal */}
      <DigitalPassModal
        isOpen={isPassModalOpen}
        onClose={() => setIsPassModalOpen(false)}
        member={member}
      />

      {/* Craftsmanship Product Detail Modal */}
      <ProductDetailModal
        product={inspectedProduct}
        onClose={() => setInspectedProduct(null)}
        onAddToCart={handleAddToCart}
        member={member}
      />
    </div>
  );
}
