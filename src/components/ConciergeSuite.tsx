import React, { useState } from 'react';
import { Coffee, Car, Sparkles, Gift, CheckCircle2, Clock, Calendar, Users, MapPin, Check } from 'lucide-react';
import { MemberProfile, LoungeBooking, ValetTicket, StylistBooking } from '../types';
import { PRESTIGE_TIERS } from '../data/mockData';

interface ConciergeSuiteProps {
  member: MemberProfile;
  initialTab?: 'lounge' | 'valet' | 'shopper' | 'tsutsumi';
}

export const ConciergeSuite: React.FC<ConciergeSuiteProps> = ({ member, initialTab = 'lounge' }) => {
  const [activeTab, setActiveTab] = useState<'lounge' | 'valet' | 'shopper' | 'tsutsumi'>(initialTab);

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Lounge State
  const [loungeDate, setLoungeDate] = useState('Tomorrow, 3:30 PM');
  const [loungeGuests, setLoungeGuests] = useState(2);
  const [loungeTea, setLoungeTea] = useState('Kyoto Ceremonial Uji Matcha & Seasonal Wagashi');
  const [loungeRoom, setLoungeRoom] = useState<'garden_view' | 'private_tatami' | 'library_salon'>('garden_view');
  const [activeLoungeBooking, setActiveLoungeBooking] = useState<LoungeBooking | null>({
    id: 'lb-init',
    date: 'Tomorrow, 3:30 PM',
    timeSlot: '3:30 PM - 5:00 PM',
    guests: 2,
    refreshment: 'Kyoto Ceremonial Uji Matcha & Seasonal Wagashi',
    roomType: 'garden_view',
    status: 'confirmed',
    code: 'RS-7721-NAC',
  });
  const [loungeSuccessMsg, setLoungeSuccessMsg] = useState(false);

  // Valet State
  const [carPlate, setCarPlate] = useState(member.vehiclePlate || 'SME 8888Z');
  const [bay, setBay] = useState('Tower A Drop-off (Orchard Rd)');
  const [valetTicket, setValetTicket] = useState<ValetTicket | null>({
    id: 'val-1',
    carPlate: 'SME 8888Z',
    bay: 'Tower A Drop-off (Orchard Rd)',
    dropoffTime: '2:15 PM Today',
    estimatedReturnTime: '5:15 PM (3 hrs complimentary)',
    status: 'active',
    ticketCode: 'VAL-8820-A',
  });
  const [valetSuccessMsg, setValetSuccessMsg] = useState(false);

  // Stylist State
  const [stylistSpecialist, setStylistSpecialist] = useState('Akihiro Sato (Haute Horlogerie & Precious Stones)');
  const [stylistDate, setStylistDate] = useState('This Thursday, 2:00 PM');
  const [stylistLanguage, setStylistLanguage] = useState('English & Japanese');
  const [stylistSuccess, setStylistSuccess] = useState(false);

  // Tsutsumi Wrapping Selection
  const [selectedWrap, setSelectedWrap] = useState('furoshiki');
  const [customCardText, setCustomCardText] = useState('With deepest compliments and warm regards.');
  const [tsutsumiSaved, setTsutsumiSaved] = useState(false);

  const handleBookLounge = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: LoungeBooking = {
      id: `lb-${Date.now()}`,
      date: loungeDate,
      timeSlot: 'Selected Slot',
      guests: loungeGuests,
      refreshment: loungeTea,
      roomType: loungeRoom,
      status: 'confirmed',
      code: `RS-${Math.floor(1000 + Math.random() * 9000)}-NAC`,
    };
    setActiveLoungeBooking(newBooking);
    setLoungeSuccessMsg(true);
    setTimeout(() => setLoungeSuccessMsg(false), 5000);
  };

  const handleRegisterValet = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket: ValetTicket = {
      id: `val-${Date.now()}`,
      carPlate: carPlate.toUpperCase(),
      bay,
      dropoffTime: 'Just Registered',
      estimatedReturnTime: 'Priority Return Upon Summon',
      status: 'active',
      ticketCode: `VAL-${Math.floor(1000 + Math.random() * 9000)}-T`,
    };
    setValetTicket(newTicket);
    setValetSuccessMsg(true);
    setTimeout(() => setValetSuccessMsg(false), 5000);
  };

  const handleBookStylist = (e: React.FormEvent) => {
    e.preventDefault();
    setStylistSuccess(true);
    setTimeout(() => setStylistSuccess(false), 5000);
  };

  return (
    <section id="concierge" className="py-12 sm:py-16 bg-[#FDF9F6] border-b border-[#EEDCD4]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8 sm:mb-12">
          <div className="text-xs font-semibold tracking-widest text-[#7A1520] uppercase mb-1">
            おもてなしサービス · Omotenashi Concierge
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#201A1A] tracking-tight">
            VIP Lounges & Concierge Services
          </h2>
          <p className="text-sm sm:text-base text-[#574141] mt-2">
            Seamlessly reserve your private sanctuary in The Rose Suite, activate complimentary valet parking, or request tailored Japanese gift wrapping.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-[#EEDCD4] pb-2 mb-8 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('lounge')}
            className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'lounge'
                ? 'bg-[#7A1520] text-white shadow-sm'
                : 'bg-white hover:bg-[#F8EBEA] text-[#201A1A] border border-[#EEDCD4]'
            }`}
          >
            <Coffee className="w-4 h-4 text-[#C59B57]" />
            <span>The Rose Suite (Level 3)</span>
          </button>

          <button
            onClick={() => setActiveTab('valet')}
            className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'valet'
                ? 'bg-[#7A1520] text-white shadow-sm'
                : 'bg-white hover:bg-[#F8EBEA] text-[#201A1A] border border-[#EEDCD4]'
            }`}
          >
            <Car className="w-4 h-4 text-[#C59B57]" />
            <span>VIP Valet Parking Pass</span>
          </button>

          <button
            onClick={() => setActiveTab('shopper')}
            className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'shopper'
                ? 'bg-[#7A1520] text-white shadow-sm'
                : 'bg-white hover:bg-[#F8EBEA] text-[#201A1A] border border-[#EEDCD4]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#C59B57]" />
            <span>Personal Stylist & Salon</span>
          </button>

          <button
            onClick={() => setActiveTab('tsutsumi')}
            className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'tsutsumi'
                ? 'bg-[#7A1520] text-white shadow-sm'
                : 'bg-white hover:bg-[#F8EBEA] text-[#201A1A] border border-[#EEDCD4]'
            }`}
          >
            <Gift className="w-4 h-4 text-[#C59B57]" />
            <span>Tsutsumi Gift Wrapping Studio</span>
          </button>
        </div>

        {/* Tab 1: The Rose Suite VIP Lounge */}
        {activeTab === 'lounge' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Booking Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#EEDCD4] shadow-sm space-y-6">
              <div className="border-b border-[#EEDCD4] pb-4">
                <div className="text-xs uppercase font-semibold tracking-wider text-[#7A1520]">
                  Private Lounge Reservation · Level 3
                </div>
                <h3 className="font-serif text-xl font-bold text-[#201A1A] mt-1">
                  Reserve Your Hospitality Session
                </h3>
                <p className="text-xs text-[#574141] mt-1">
                  Unlimited access for {member.name} ({member.tier.toUpperCase()} Tier) with up to 2 complimentary guests.
                </p>
              </div>

              {loungeSuccessMsg && (
                <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>Your Rose Suite reservation has been confirmed and added to your pass!</span>
                </div>
              )}

              <form onSubmit={handleBookLounge} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#201A1A] mb-1">
                      Preferred Date & Time
                    </label>
                    <select
                      value={loungeDate}
                      onChange={(e) => setLoungeDate(e.target.value)}
                      className="w-full h-11 px-3 bg-white border border-[#E0CEC5] rounded-md text-xs sm:text-sm text-[#201A1A] focus:outline-none focus:border-[#7A1520]"
                    >
                      <option>Today, 2:00 PM - 3:30 PM</option>
                      <option>Today, 4:00 PM - 5:30 PM</option>
                      <option>Today, 6:00 PM - 7:30 PM</option>
                      <option>Tomorrow, 1:30 PM - 3:00 PM</option>
                      <option>Tomorrow, 3:30 PM - 5:00 PM</option>
                      <option>This Saturday, 3:00 PM - 4:30 PM</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#201A1A] mb-1">
                      Party Size (Patron + Companions)
                    </label>
                    <div className="flex items-center gap-2 h-11">
                      {[1, 2, 3].map((num) => (
                        <button
                          type="button"
                          key={num}
                          onClick={() => setLoungeGuests(num)}
                          className={`flex-1 h-full rounded-md border text-xs font-semibold transition-colors cursor-pointer ${
                            loungeGuests === num
                              ? 'bg-[#7A1520] text-white border-[#7A1520]'
                              : 'bg-white hover:bg-[#F8EBEA] border-[#E0CEC5] text-[#201A1A]'
                          }`}
                        >
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#201A1A] mb-1">
                    Complimentary Hospitality Refreshment
                  </label>
                  <select
                    value={loungeTea}
                    onChange={(e) => setLoungeTea(e.target.value)}
                    className="w-full h-11 px-3 bg-white border border-[#E0CEC5] rounded-md text-xs sm:text-sm text-[#201A1A] focus:outline-none focus:border-[#7A1520]"
                  >
                    <option>Kyoto Ceremonial Uji Matcha & Seasonal Nerikiri Wagashi</option>
                    <option>Shizuoka Premium Gyokuro Green Tea & Sweet Bean Yokan</option>
                    <option>Roasted Organic Hojicha & Candied Chestnuts</option>
                    <option>Laurent-Perrier Brut Champagne & French Macarons</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#201A1A] mb-1">
                    Seating Preference
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setLoungeRoom('garden_view')}
                      className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                        loungeRoom === 'garden_view'
                          ? 'border-[#7A1520] bg-[#F8EBEA]'
                          : 'border-[#E0CEC5] bg-white hover:bg-[#FDF9F6]'
                      }`}
                    >
                      <div className="text-xs font-bold text-[#201A1A]">Zen Garden View</div>
                      <div className="text-[11px] text-[#8A7170]">Sunlit bonsai alcove</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setLoungeRoom('private_tatami')}
                      className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                        loungeRoom === 'private_tatami'
                          ? 'border-[#7A1520] bg-[#F8EBEA]'
                          : 'border-[#E0CEC5] bg-white hover:bg-[#FDF9F6]'
                      }`}
                    >
                      <div className="text-xs font-bold text-[#201A1A]">Tatami Suite</div>
                      <div className="text-[11px] text-[#8A7170]">Shoji screen privacy</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setLoungeRoom('library_salon')}
                      className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                        loungeRoom === 'library_salon'
                          ? 'border-[#7A1520] bg-[#F8EBEA]'
                          : 'border-[#E0CEC5] bg-white hover:bg-[#FDF9F6]'
                      }`}
                    >
                      <div className="text-xs font-bold text-[#201A1A]">Library Salon</div>
                      <div className="text-[11px] text-[#8A7170]">Quiet work and reading</div>
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#7A1520] hover:bg-[#8E1C27] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Coffee className="w-4 h-4 text-[#C59B57]" />
                    <span>Confirm Lounge Reservation</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Active Reservation Pass Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-[#F7EDE8] border border-[#EEDCD4] shadow-sm relative overflow-hidden">
                <div className="text-xs font-semibold text-[#7A1520] uppercase tracking-wider mb-2">
                  Current Active Reservation
                </div>

                {activeLoungeBooking ? (
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-serif text-lg font-bold text-[#201A1A]">
                          The Rose Suite Lounge
                        </div>
                        <div className="text-xs text-[#8A7170]">
                          Takashimaya Ngee Ann City · Level 3
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#16A34A]/10 text-[#166534] border border-[#16A34A]/30 text-[10px] font-bold uppercase tracking-wider">
                        Confirmed
                      </span>
                    </div>

                    <div className="p-3.5 bg-white rounded-xl border border-[#EEDCD4] space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[#8A7170]">Session Time</span>
                        <span className="font-semibold text-[#201A1A]">{activeLoungeBooking.date}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#8A7170]">Party</span>
                        <span className="font-semibold text-[#201A1A]">{activeLoungeBooking.guests} Guests</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#8A7170]">Seating</span>
                        <span className="font-semibold text-[#201A1A] capitalize">
                          {activeLoungeBooking.roomType.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="border-t border-[#EEDCD4] pt-2">
                        <span className="text-[#8A7170] block mb-0.5">Welcome Refreshment</span>
                        <span className="font-semibold text-[#7A1520]">{activeLoungeBooking.refreshment}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-white border border-[#EEDCD4] flex items-center justify-between">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-[#8A7170]">
                          Reservation Reference
                        </div>
                        <div className="font-mono text-sm font-bold text-[#201A1A] tracking-wider">
                          {activeLoungeBooking.code}
                        </div>
                      </div>
                      <div className="text-[11px] text-[#7A1520] font-semibold">
                        Show upon arrival
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center text-xs text-[#8A7170]">
                    No active reservation. Choose a slot on the left to book.
                  </div>
                )}
              </div>

              {/* Service hours notice */}
              <div className="p-4 rounded-xl bg-white border border-[#EEDCD4] text-xs text-[#574141] space-y-1">
                <div className="font-bold text-[#201A1A]">The Rose Suite Hours</div>
                <div>Daily: 10:30 AM – 9:00 PM (Last order 8:15 PM)</div>
                <div className="text-[#8A7170]">Complimentary high-speed Wi-Fi, Japanese magazines, and private baggage check.</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: VIP Valet Parking */}
        {activeTab === 'valet' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#EEDCD4] shadow-sm space-y-6">
              <div className="border-b border-[#EEDCD4] pb-4">
                <div className="text-xs uppercase font-semibold tracking-wider text-[#7A1520]">
                  Complimentary Valet Service · Towers A & B
                </div>
                <h3 className="font-serif text-xl font-bold text-[#201A1A] mt-1">
                  Register or Summon Vehicle
                </h3>
                <p className="text-xs text-[#574141] mt-1">
                  Enjoy {PRESTIGE_TIERS[member.tier].valetHours} as a {member.tier.toUpperCase()} Prestige member.
                </p>
              </div>

              {valetSuccessMsg && (
                <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>Valet pass generated! Your vehicle has been logged into the concierge system.</span>
                </div>
              )}

              <form onSubmit={handleRegisterValet} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#201A1A] mb-1">
                    Vehicle Registration Number
                  </label>
                  <input
                    type="text"
                    value={carPlate}
                    onChange={(e) => setCarPlate(e.target.value)}
                    placeholder="e.g. SME 8888Z"
                    className="w-full h-11 px-3 bg-white border border-[#E0CEC5] rounded-md text-sm font-mono uppercase tracking-wider text-[#201A1A] focus:outline-none focus:border-[#7A1520]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#201A1A] mb-1">
                    Drop-off & Retrieval Bay
                  </label>
                  <select
                    value={bay}
                    onChange={(e) => setBay(e.target.value)}
                    className="w-full h-11 px-3 bg-white border border-[#E0CEC5] rounded-md text-xs sm:text-sm text-[#201A1A] focus:outline-none focus:border-[#7A1520]"
                  >
                    <option>Tower A Drop-off (Orchard Road Entrance)</option>
                    <option>Tower B Drop-off (Ngee Ann City Driveway)</option>
                    <option>VIP Basement 1 Private Bay</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#7A1520] hover:bg-[#8E1C27] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Car className="w-4 h-4 text-[#C59B57]" />
                    <span>Generate Digital Valet Pass</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Live Valet Ticket Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-[#F7EDE8] border border-[#EEDCD4] shadow-sm">
                <div className="text-xs font-semibold text-[#7A1520] uppercase tracking-wider mb-2">
                  Active Digital Valet Ticket
                </div>

                {valetTicket ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-[#EEDCD4] pb-3">
                      <div>
                        <div className="font-mono text-xl font-bold tracking-widest text-[#201A1A]">
                          {valetTicket.carPlate}
                        </div>
                        <div className="text-xs text-[#8A7170]">{valetTicket.bay}</div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#7A1520]/10 text-[#7A1520] border border-[#7A1520]/30 text-[10px] font-bold uppercase tracking-wider">
                        Parked & Secured
                      </span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-[#EEDCD4] space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#8A7170]">Drop-off Logged</span>
                        <span className="font-semibold text-[#201A1A]">{valetTicket.dropoffTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8A7170]">Privilege Duration</span>
                        <span className="font-semibold text-[#7A1520]">{valetTicket.estimatedReturnTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8A7170]">Digital Ticket ID</span>
                        <span className="font-mono font-bold text-[#201A1A]">{valetTicket.ticketCode}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => alert(`Vehicle summon signal sent to ${bay} valet master! Your vehicle will be waiting in approximately 8 minutes.`)}
                      className="w-full py-2.5 bg-white hover:bg-[#F8EBEA] border border-[#C59B57] text-[#7A1520] text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Summon Vehicle to Drop-off Bay (8 min)
                    </button>
                  </div>
                ) : (
                  <div className="text-xs text-[#8A7170]">No active valet ticket.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Personal Stylist & Private Salon */}
        {activeTab === 'shopper' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#EEDCD4] shadow-sm space-y-6">
              <div className="border-b border-[#EEDCD4] pb-4">
                <div className="text-xs uppercase font-semibold tracking-wider text-[#7A1520]">
                  Private Styling & Fine Jewelry Consultations
                </div>
                <h3 className="font-serif text-xl font-bold text-[#201A1A] mt-1">
                  Book a Dedicated Japanese Luxury Specialist
                </h3>
                <p className="text-xs text-[#574141] mt-1">
                  Experience confidential VIP salon viewings with champagne and dedicated wardrobe curations.
                </p>
              </div>

              {stylistSuccess && (
                <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>Styling consultation request submitted! Concierge manager will contact you within 2 hours.</span>
                </div>
              )}

              <form onSubmit={handleBookStylist} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#201A1A] mb-1">
                    Specialist Department
                  </label>
                  <select
                    value={stylistSpecialist}
                    onChange={(e) => setStylistSpecialist(e.target.value)}
                    className="w-full h-11 px-3 bg-white border border-[#E0CEC5] rounded-md text-xs sm:text-sm text-[#201A1A] focus:outline-none focus:border-[#7A1520]"
                  >
                    <option>Akihiro Sato (Haute Horlogerie & Precious Stones)</option>
                    <option>Mayumi Takahashi (Ginza Contemporary & Haute Couture)</option>
                    <option>Kenzo Ishikawa (Traditional Japanese Kimono & Arita Porcelain)</option>
                    <option>Chantal Lim (International Luxury Fashion & Leather Goods)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#201A1A] mb-1">
                      Preferred Date & Time
                    </label>
                    <select
                      value={stylistDate}
                      onChange={(e) => setStylistDate(e.target.value)}
                      className="w-full h-11 px-3 bg-white border border-[#E0CEC5] rounded-md text-xs sm:text-sm text-[#201A1A] focus:outline-none focus:border-[#7A1520]"
                    >
                      <option>This Thursday, 2:00 PM</option>
                      <option>This Friday, 11:00 AM</option>
                      <option>This Saturday, 4:00 PM</option>
                      <option>Next Tuesday, 2:30 PM</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#201A1A] mb-1">
                      Language Preference
                    </label>
                    <select
                      value={stylistLanguage}
                      onChange={(e) => setStylistLanguage(e.target.value)}
                      className="w-full h-11 px-3 bg-white border border-[#E0CEC5] rounded-md text-xs sm:text-sm text-[#201A1A] focus:outline-none focus:border-[#7A1520]"
                    >
                      <option>English & Japanese</option>
                      <option>English & Mandarin</option>
                      <option>Japanese Only</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#7A1520] hover:bg-[#8E1C27] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-[#C59B57]" />
                    <span>Reserve Private Salon Consultation</span>
                  </button>
                </div>
              </form>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-[#F7EDE8] border border-[#EEDCD4] space-y-3">
                <div className="text-xs font-semibold text-[#7A1520] uppercase tracking-wider">
                  The Private Salon Suite (Level 2)
                </div>
                <div className="font-serif text-lg font-bold text-[#201A1A]">
                  Discreet Luxury Fitting & Viewing
                </div>
                <p className="text-xs text-[#574141] leading-relaxed">
                  Our private salon features museum-grade adjustable lighting (daylight, candlelight, evening gala presets) to ensure your selected jewels and garments are appreciated under optimal conditions.
                </p>
                <div className="p-3 bg-white rounded-xl border border-[#EEDCD4] text-xs space-y-1">
                  <div className="font-bold text-[#201A1A]">Included with Gold & Platinum:</div>
                  <div className="text-[#574141]">· Complimentary garment steaming & tailor adjustments</div>
                  <div className="text-[#574141]">· Chilled mineral water and seasonal confection trolley</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Tsutsumi Gift Wrapping Studio */}
        {activeTab === 'tsutsumi' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#EEDCD4] shadow-sm space-y-6">
              <div className="border-b border-[#EEDCD4] pb-4">
                <div className="text-xs uppercase font-semibold tracking-wider text-[#7A1520]">
                  包み · The Art of Japanese Gifting
                </div>
                <h3 className="font-serif text-xl font-bold text-[#201A1A] mt-1">
                  Tsutsumi Japanese Gift Wrapping Art
                </h3>
                <p className="text-xs text-[#574141] mt-1">
                  Every gift carries respect and mindfulness. Select your wrapping medium and personalized calligraphy message.
                </p>
              </div>

              {tsutsumiSaved && (
                <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>Wrapping preferences saved! This style will be applied automatically to your department purchases.</span>
                </div>
              )}

              <div className="space-y-4">
                <label className="block text-xs font-semibold text-[#201A1A]">
                  Choose Gift Presentation Medium
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedWrap('furoshiki')}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedWrap === 'furoshiki'
                        ? 'border-[#7A1520] bg-[#F8EBEA] shadow-sm'
                        : 'border-[#E0CEC5] bg-white hover:bg-[#FDF9F6]'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#201A1A]">Furoshiki Silk Wrap</div>
                    <div className="text-[11px] text-[#8A7170] mt-1">
                      Traditional reusable silk square with cherry blossom knot
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedWrap('rose_paper')}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedWrap === 'rose_paper'
                        ? 'border-[#7A1520] bg-[#F8EBEA] shadow-sm'
                        : 'border-[#E0CEC5] bg-white hover:bg-[#FDF9F6]'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#201A1A]">Heritage Rose Paper</div>
                    <div className="text-[11px] text-[#8A7170] mt-1">
                      Signature Takashimaya vermilion rose paper with gold ribbon
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedWrap('mizuhiki')}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedWrap === 'mizuhiki'
                        ? 'border-[#7A1520] bg-[#F8EBEA] shadow-sm'
                        : 'border-[#E0CEC5] bg-white hover:bg-[#FDF9F6]'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#201A1A]">Red Mizuhiki Cord</div>
                    <div className="text-[11px] text-[#8A7170] mt-1">
                      Handcrafted ceremonial knot symbolizing unbreakable fortune
                    </div>
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#201A1A] mb-1">
                    Calligraphy Gift Message (Complimentary for Prestige Members)
                  </label>
                  <textarea
                    rows={3}
                    value={customCardText}
                    onChange={(e) => setCustomCardText(e.target.value)}
                    className="w-full p-3 bg-white border border-[#E0CEC5] rounded-md text-xs sm:text-sm text-[#201A1A] focus:outline-none focus:border-[#7A1520]"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setTsutsumiSaved(true);
                    setTimeout(() => setTsutsumiSaved(false), 5000);
                  }}
                  className="w-full py-3.5 bg-[#7A1520] hover:bg-[#8E1C27] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Gift className="w-4 h-4 text-[#C59B57]" />
                  <span>Save Gifting Style & Add to Profile</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-[#F7EDE8] border border-[#EEDCD4] space-y-3">
                <div className="text-xs font-semibold text-[#7A1520] uppercase tracking-wider">
                  Tsutsumi Philosophy
                </div>
                <div className="font-serif text-lg font-bold text-[#201A1A]">
                  The Reverence of the Envelope
                </div>
                <p className="text-xs text-[#574141] leading-relaxed">
                  In Japanese tradition, wrapping (*tsutsumu*) is an expression of care that honors both the giver and receiver before the gift is even unveiled. Our wrapping masters undergo rigorous apprenticeship in Ginza.
                </p>
                <div className="p-3 bg-white rounded-xl border border-[#EEDCD4] text-xs">
                  <span className="font-bold text-[#7A1520]">Prestige Privilege:</span> Complimentary Furoshiki and Mizuhiki on all store purchases above S$100.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
