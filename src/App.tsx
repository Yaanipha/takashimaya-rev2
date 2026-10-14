import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TierStudio } from './components/TierStudio';
import { TierTable } from './components/TierTable';
import { ConciergeSuite } from './components/ConciergeSuite';
import { DepachikaShowcase } from './components/DepachikaShowcase';
import { RewardsVault } from './components/RewardsVault';
import { RoseChanWidget } from './components/RoseChanWidget';
import { CartDrawer } from './components/CartDrawer';
import { DigitalPassModal } from './components/DigitalPassModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { Footer } from './components/Footer';
import { INITIAL_MEMBER } from './data/mockData';
import { MemberProfile, ProductItem, CartItem } from './types';

export default function App() {
  const [member, setMember] = useState<MemberProfile>(INITIAL_MEMBER);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [inspectedProduct, setInspectedProduct] = useState<ProductItem | null>(null);

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

  // Navigation scroll helper
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FFF8F7] text-[#201A1A] flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        member={member}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenPass={() => setIsPassModalOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          member={member}
          onExploreTiers={() => handleNavigate('tiers')}
          onBookLounge={() => handleNavigate('concierge')}
          onExploreDepachika={() => handleNavigate('depachika')}
        />

        {/* Prestige Tier Studio (Card Metaphor & Spend Simulator) */}
        <TierStudio
          member={member}
          onOpenPassModal={() => setIsPassModalOpen(true)}
        />

        {/* Complete Tier Benefits Comparison Matrix */}
        <TierTable />

        {/* Omotenashi Concierge Suite (Lounge, Valet, Stylist, Tsutsumi) */}
        <ConciergeSuite member={member} />

        {/* B2 Depachika & Curated Luxuries Showcase */}
        <DepachikaShowcase
          member={member}
          onAddToCart={(prod) => handleAddToCart(prod, 1)}
          onSelectProduct={(prod) => setInspectedProduct(prod)}
        />

        {/* Rose Points & Voucher Vault */}
        <RewardsVault
          member={member}
          onUpdatePoints={handleUpdatePoints}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Rose-chan Mascot Concierge */}
      <RoseChanWidget />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        member={member}
      />

      {/* Digital Member Pass Modal */}
      <DigitalPassModal
        isOpen={isPassModalOpen}
        onClose={() => setIsPassModalOpen(false)}
        member={member}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={inspectedProduct}
        onClose={() => setInspectedProduct(null)}
        onAddToCart={handleAddToCart}
        member={member}
      />
    </div>
  );
}
