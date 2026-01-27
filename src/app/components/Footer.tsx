import { MapPin, Clock, Instagram, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#2C2C2C] text-[#FAF8F5]">
      {/* Main Footer Content - Full Width, No Empty Space */}
      <div className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16">
            {/* Brand */}
            <div className="md:col-span-5 space-y-6">
              <h3 
                className="text-6xl md:text-7xl font-black italic text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Fuoco
              </h3>
              <p className="text-xl text-white/70 leading-relaxed max-w-md">
                Neapolitan tradition since 1889.<br />
                Every pizza tells a story.
              </p>
            </div>

            {/* Location & Hours */}
            <div className="md:col-span-4 md:col-start-7 space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[#D32F2F]">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm tracking-widest">LOCATION</span>
                </div>
                <p className="text-lg text-white/80 leading-relaxed">
                  Via Roma 42<br />
                  80132 Naples, Italy
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[#D32F2F]">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm tracking-widest">HOURS</span>
                </div>
                <p className="text-lg text-white/80 leading-relaxed">
                  Tuesday — Sunday<br />
                  12:00 — 15:00 · 18:00 — 23:00<br />
                  <span className="text-white/50">Monday closed</span>
                </p>
              </div>
            </div>

            {/* Social */}
            <div className="md:col-span-3 space-y-6">
              <div className="text-sm tracking-widest text-[#D32F2F]">FOLLOW US</div>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="w-12 h-12 flex items-center justify-center border border-white/20 hover:bg-[#D32F2F] hover:border-[#D32F2F] transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 flex items-center justify-center border border-white/20 hover:bg-[#D32F2F] hover:border-[#D32F2F] transition-all duration-300"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 px-6 md:px-12 lg:px-16 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>© 2026 Fuoco · Naples</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
