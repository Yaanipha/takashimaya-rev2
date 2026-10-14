import React, { useState } from 'react';
import { Sparkles, MessageCircle, ChevronRight, X, Heart } from 'lucide-react';
import { ROSE_CHAN_TIPS } from '../data/mockData';

export const RoseChanWidget: React.FC = () => {
  const [tipIndex, setTipIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const tips = [
    {
      topic: 'Lounge Welcome',
      question: 'How do I access The Rose Suite?',
      answer:
        'Konnichiwa! Simply head to Level 3 beside the Salon de Thé. Flash your digital VIP pass at the entrance. Today’s seasonal pairing is hand-whisked Kyoto Uji matcha with maple Nerikiri wagashi.',
    },
    {
      topic: 'Depachika Fair',
      question: 'What is special at B2 food hall today?',
      answer:
        'Our fresh air cargo from Narita has just delivered fresh Crown Muskmelons from Shizuoka and limited A5 Miyazaki Wagyu cuts. Gold Prestige members receive 10% privilege discount!',
    },
    {
      topic: 'Tier Elevation',
      question: 'How do I elevate to Platinum Tier?',
      answer:
        'Patrons who achieve S$300,000 in annual spend unlock Platinum distinction! Privileges include unlimited complimentary valet parking and a reserved private tatami suite in The Rose Suite.',
    },
    {
      topic: 'Tsutsumi Wrapping',
      question: 'Tell me about the Tsutsumi gift wrapping',
      answer:
        'Every gift is wrapped with Japanese mindfulness. Choose between our traditional silk Furoshiki wrap or the heritage Takashimaya rose motif paper with handcrafted red Mizuhiki cords.',
    },
  ];

  return (
    <aside aria-label="Rose-chan Concierge" className="fixed bottom-20 right-4 z-30 max-w-xs sm:max-w-sm">
      {isOpen ? (
        <div className="relative">
          {/* Dialogue Card Speech Bubble (rounded-xl curves, soft peach porcelain fill #F7EDE8, hairline border #EEDCD4) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#F7EDE8] border border-[#EEDCD4] shadow-[0_12px_32px_-4px_rgba(122,21,32,0.12),0_4px_12px_rgba(32,26,26,0.06)] space-y-3 relative mb-3">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-[#8A7170] hover:text-[#201A1A] p-1 rounded-full hover:bg-white/50 transition-colors"
              aria-label="Dismiss Rose-chan concierge"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header info */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#7A1520] bg-white px-2 py-0.5 rounded-full border border-[#EEDCD4]">
                Rose-chan Concierge
              </span>
              <span className="text-xs text-[#8A7170]">ローズちゃん</span>
            </div>

            {/* Rose-chan's speech */}
            <div className="text-xs sm:text-sm text-[#201A1A] leading-relaxed">
              <p className="font-medium text-[#7A1520] mb-1 font-serif">
                "{tips[tipIndex].question}"
              </p>
              <p className="text-[#574141]">
                {tips[tipIndex].answer}
              </p>
            </div>

            {/* Quick Question Switcher Pills */}
            <div className="pt-2 border-t border-[#EEDCD4]/70 space-y-1">
              <div className="text-[10px] text-[#8A7170] uppercase font-semibold">
                Ask Rose-chan:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tips.map((t, idx) => (
                  <button
                    key={t.topic}
                    onClick={() => setTipIndex(idx)}
                    className={`text-[11px] px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                      tipIndex === idx
                        ? 'bg-[#7A1520] text-white font-semibold'
                        : 'bg-white hover:bg-[#F8EBEA] text-[#201A1A] border border-[#EEDCD4]'
                    }`}
                  >
                    {t.topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Speech bubble bottom directional notch */}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-[#F7EDE8] border-r border-b border-[#EEDCD4] transform rotate-45" />
          </div>

          {/* Circular Porcelain Vignette Avatar for Rose-chan */}
          <div className="flex items-center justify-end gap-3 pr-4">
            <div className="text-right">
              <div className="text-xs font-bold text-[#201A1A]">Rose-chan</div>
              <div className="text-[10px] text-[#8A7170]">Takashimaya Heritage Mascot</div>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-14 h-14 rounded-full p-1 bg-white border-2 border-[#EEDCD4] shadow-md hover:border-[#7A1520] transition-transform hover:scale-105 overflow-hidden cursor-pointer"
            >
              <img
                src="/src/assets/images/rose_chan_mascot_concierge_1791938611096.jpg"
                alt="Rose-chan Mascot"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </button>
          </div>
        </div>
      ) : (
        /* Minimized State */
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-3 py-2 rounded-full bg-white border border-[#EEDCD4] shadow-lg hover:shadow-xl transition-all cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-full overflow-hidden border border-[#EEDCD4]">
            <img
              src="/src/assets/images/rose_chan_mascot_concierge_1791938611096.jpg"
              alt="Rose-chan Mascot"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="text-left pr-2">
            <div className="text-xs font-bold text-[#201A1A] group-hover:text-[#7A1520] transition-colors">
              Rose-chan
            </div>
            <div className="text-[10px] text-[#8A7170]">Concierge Tips</div>
          </div>
        </button>
      )}
    </aside>
  );
};
