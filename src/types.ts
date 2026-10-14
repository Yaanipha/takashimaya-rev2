export type MembershipTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export interface TierInfo {
  id: MembershipTier;
  name: string;
  japaneseName: string;
  minSpend: number;
  spendDisplay: string;
  colorHex: string;
  accentHex: string;
  textColor: string;
  gradientClass: string;
  badgeBorder: string;
  description: string;
  multiplier: string;
  valetHours: string;
  loungeAccess: string;
  personalShopper: string;
  depachikaPrivilege: string;
  roseChanGift: boolean;
  privateSalon: boolean;
  specialPerk: string;
}

export interface MemberProfile {
  name: string;
  memberId: string;
  tier: MembershipTier;
  currentPoints: number;
  annualSpend: number;
  nextTierSpend: number;
  memberSince: string;
  vehiclePlate?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  japaneseName: string;
  category: 'depachika' | 'jewelry_watches' | 'crafts' | 'collector';
  categoryLabel: string;
  price: number;
  origin: string;
  description: string;
  details: string[];
  image: string;
  badge?: string;
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
  wrappingStyle?: string;
}

export interface LoungeBooking {
  id: string;
  date: string;
  timeSlot: string;
  guests: number;
  refreshment: string;
  roomType: 'private_tatami' | 'garden_view' | 'library_salon';
  status: 'confirmed' | 'completed';
  code: string;
}

export interface ValetTicket {
  id: string;
  carPlate: string;
  bay: string;
  dropoffTime: string;
  estimatedReturnTime: string;
  status: 'active' | 'ready' | 'retrieved';
  ticketCode: string;
}

export interface StylistBooking {
  id: string;
  specialist: string;
  date: string;
  timeSlot: string;
  language: string;
  category: string;
  notes?: string;
  status: 'confirmed';
}

export interface VoucherItem {
  id: string;
  title: string;
  japaneseTitle: string;
  category: 'gourmet' | 'shopping' | 'lounge' | 'service';
  pointsCost: number;
  valueDisplay: string;
  description: string;
  validUntil: string;
  claimed: boolean;
  code?: string;
}
