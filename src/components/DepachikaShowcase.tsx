import React, { useState } from 'react';
import { ShoppingBag, Eye, Sparkles, Check, ArrowRight, Search, X } from 'lucide-react';
import { ProductItem, MemberProfile } from '../types';
import { CURATED_PRODUCTS } from '../data/mockData';

interface DepachikaShowcaseProps {
  member: MemberProfile;
  onAddToCart: (product: ProductItem) => void;
  onSelectProduct: (product: ProductItem) => void;
}

export const DepachikaShowcase: React.FC<DepachikaShowcaseProps> = ({
  member,
  onAddToCart,
  onSelectProduct,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Curations' },
    { id: 'depachika', label: 'Depachika B2 Gourmet' },
    { id: 'jewelry_watches', label: 'Haute Horlogerie & Jewelry' },
    { id: 'crafts', label: 'Japanese Craft & Porcelain' },
    { id: 'collector', label: 'Rose-chan Collector' },
  ];

  const filteredProducts = CURATED_PRODUCTS.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.japaneseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.origin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAdd = (product: ProductItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section id="depachika" className="py-12 sm:py-16 bg-[#FFF8F7] border-b border-[#EEDCD4]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-widest text-[#7A1520] uppercase mb-1">
              デパ地下と銘品 · Depachika & Curated Luxuries
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#201A1A] tracking-tight">
              B2 Gourmet Hall & Flagship Boutiques
            </h2>
            <p className="text-sm sm:text-base text-[#574141] mt-2">
              From ceremonial Kyoto matcha sweets air-flown this morning to rare Grand Seiko Spring Drive timepieces and hand-sculpted Rose-chan figurines.
            </p>
          </div>

          {/* Member Discount Notice */}
          <div className="px-4 py-2.5 rounded-xl bg-[#F8EBEA] border border-[#EEDCD4] text-xs font-medium text-[#201A1A] self-start md:self-end shrink-0">
            <span className="font-bold text-[#7A1520]">Prestige Privilege:</span>{' '}
            <span>10% Gold discount applies at bag checkout.</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A7170]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sweets, matcha, melons, watches..."
              className="w-full h-11 pl-10 pr-9 bg-white border border-[#E0CEC5] rounded-xl text-xs sm:text-sm text-[#201A1A] placeholder:text-[#8A7170] focus:outline-none focus:border-[#7A1520] shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A7170] hover:text-[#201A1A] p-0.5 rounded-full"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filters (Segmented Buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#7A1520] text-white shadow-sm'
                  : 'bg-white hover:bg-[#F8EBEA] text-[#201A1A] border border-[#EEDCD4]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid: 3-column desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const isJustAdded = addedId === product.id;

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group rounded-2xl bg-white border border-[#EEDCD4] overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer"
              >
                {/* Product Image Area */}
                <div className="relative aspect-[4/3] bg-[#F7EDE8] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Subtle single text badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#201A1A]/85 backdrop-blur-sm text-white text-[10px] font-semibold tracking-wider uppercase">
                      {product.badge}
                    </div>
                  )}

                  {/* Hover Quick View Trigger */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-lg bg-white/95 text-[#201A1A] text-xs font-semibold shadow-md flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-[#7A1520]" />
                      <span>View Craftsmanship Notes</span>
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    {/* Origin / Category */}
                    <div className="text-[11px] font-semibold text-[#8A7170] uppercase tracking-wider">
                      {product.origin}
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#201A1A] group-hover:text-[#7A1520] transition-colors line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Japanese Kanji Subtitle */}
                    <div className="text-xs text-[#574141] font-medium font-serif line-clamp-1">
                      {product.japaneseName}
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-[#574141] line-clamp-2 pt-1">
                      {product.description}
                    </p>
                  </div>

                  {/* Price & Add to Bag Row */}
                  <div className="pt-3 border-t border-[#EEDCD4] flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-[#8A7170] uppercase">Patron Price</div>
                      <div className="font-mono text-lg font-bold text-[#201A1A] tabular-nums">
                        S${product.price.toLocaleString()}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleAdd(product, e)}
                      className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                        isJustAdded
                          ? 'bg-[#16A34A] text-white shadow-sm'
                          : 'bg-[#7A1520] hover:bg-[#8E1C27] text-white shadow-sm hover:shadow'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added to Bag</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5 text-[#C59B57]" />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
