import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { featuredDesigns, galleryImages, steps, styles, testimonials } from '../../constants';



function Home() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  return (
    <div className="bg-[#F7F5F0] dark:bg-[#1A1814] text-[#252525] dark:text-[#F7F5F0] min-h-screen">
      <div className="min-h-screen flex  flex-wrap bg-[#F7F5F0] dark:bg-[#1A1814]">
        {isAdmin && (
          <button
            type="button"
            onClick={() => navigate('/admin')}
            title="Admin Panel"
            className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-[#252525] dark:bg-[#F7F5F0] shadow-lg flex items-center justify-center text-white dark:text-[#252525] hover:bg-[#B08D57] dark:hover:bg-[#B08D57] dark:hover:text-white transition-colors text-sm font-bold"
          >
            ⚙
          </button>
        )}

        <div className="flex-1 flex items-center justify-center px-3 py-16">
          <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 xl:px-20 py-20 lg:py-0 max-w-2xl">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#E8E1D5] dark:bg-[#2E2B27] rounded-full text-xs font-medium text-[#B08D57] tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
                Interior Design Studio
              </span>
            </div>
            <h1 className="font-display text-5xl xl:text-6xl 2xl:text-7xl font-medium leading-[1.1] mb-6 text-[#252525] dark:text-[#F7F5F0]">
              Design a space<br />
              <em className="not-italic text-[#B08D57]">that feels</em><br />
              like you.
            </h1>
            <p className="text-lg text-[#777777] dark:text-[#999390] leading-relaxed mb-10 max-w-md">
              Visualize your ideas, experiment with styles, and create your perfect space before you make it real.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/design-studio")}
                className="px-6 py-3.5 bg-[#252525] dark:bg-[#F7F5F0] text-[#F7F5F0] dark:text-[#252525] font-medium rounded-xl hover:bg-[#B08D57] dark:hover:bg-[#B08D57] dark:hover:text-white transition-colors text-sm"
              >
                Start Designing
              </button>
              <button
                onClick={() => navigate("/explore")}
                className="px-6 py-3.5 border border-[#E0D9CE] dark:border-[#3A3530] text-[#252525] dark:text-[#F7F5F0] font-medium rounded-xl hover:border-[#B08D57] hover:text-[#B08D57] transition-colors text-sm"
              >
                Explore Inspiration
              </button>
            </div>

            <div className="flex gap-8 mt-14 pt-8 border-t border-[#E0D9CE] dark:border-[#3A3530]">
              {[["12k+", "Designs created"], ["340+", "Furniture pieces"], ["98%", "Satisfaction rate"]].map(([n, l]) => (
                <div key={l}>
                  <p className="font-display text-2xl font-semibold text-[#252525] dark:text-[#F7F5F0]">{n}</p>
                  <p className="text-xs text-[#777777] mt-0.5">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:flex-1 relative min-h-[400px] lg:min-h-0">
          <img
            src="https://images.unsplash.com/photo-1724582586529-62622e50c0b3?w=1200&h=900&fit=crop&auto=format"
            alt="Modern luxury living room"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          <div className="absolute bottom-8 left-8 bg-white/95 dark:bg-[#252220]/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl max-w-xs">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#E8E1D5] flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="7" width="14" height="8" rx="1.5" stroke="#B08D57" strokeWidth="1.5" />
                  <path d="M1 7L8 2L15 7" stroke="#B08D57" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-sm text-[#252525] dark:text-[#F7F5F0]">Scandinavian Living Room</p>
                <p className="text-xs text-[#777777] mt-0.5">Minimal · Warm · Natural</p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              {["#E8E1D5", "#C4B99A", "#8B7355", "#4A3728"].map((c) => (
                <div key={c} className="w-5 h-5 rounded-full border-2 border-white shadow-sm" style={{ background: c }} />
              ))}
            </div>
          </div>

          <div className="absolute top-8 right-8 bg-[#B08D57] text-white text-xs font-medium px-3 py-1.5 rounded-full">
            ✦ Now customizable
          </div>
        </div>
      </div>
      <section className="py-24 px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[#B08D57] mb-3">Featured</p>
              <h2 className="font-display text-4xl font-medium text-[#252525] dark:text-[#F7F5F0]">
                Beautifully designed<br />spaces to inspire
              </h2>
            </div>
            <button
              onClick={() => navigate("/explore")}
              className="hidden md:flex items-center gap-2 text-sm font-medium text-[#777777] hover:text-[#B08D57] transition-colors"
            >
              View all
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredDesigns.map((d) => (
              <button
                key={d.title}
                onClick={() => navigate("/explore")}
                className="group relative overflow-hidden rounded-2xl bg-[#E8E1D5] aspect-[3/4] text-left"
              >
                <img
                  src={d.img}
                  alt={d.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                    {d.tag}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-semibold">{d.title}</p>
                  <p className="text-white/70 text-sm mt-0.5">{d.style}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="py-18 px-8 lg:px-16 xl:px-16  bg-[#E8E1D5] dark:bg-[#2E2B27]">
        <div className="flex items-end justify-center mb-12">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[#B08D57] mb-3 text-center">Styles</p>
            <h2 className="font-display text-4xl font-medium text-[#252525] dark:text-[#F7F5F0]">
              Find your aesthetic
            </h2>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {styles.map((s) => (
            <button
              key={s.name}
              onClick={() => navigate("explore")}
              className="group flex items-center gap-4 px-5 py-3.5 bg-[#F7F5F0] dark:bg-[#2E2B27] border border-[#E0D9CE] dark:border-[#3A3530] rounded-xl hover:border-[#B08D57] transition-all"
            >
              <div className="w-8 h-8 rounded-lg flex-shrink-0" style={{ background: s.color }} />
              <div className="text-left">
                <p className="text-sm font-semibold text-[#252525] dark:text-[#F7F5F0]">{s.name}</p>
                <p className="text-xs text-[#777777]">{s.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </section>
      <section className="py-18 px-8 lg:px-16 xl:px-16  ">
        <div className="flex items-end justify-center mb-12">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[#B08D57] mb-3 text-center">Process</p>
            <h2 className="font-display text-4xl font-medium text-[#252525] dark:text-[#F7F5F0]">
              How Roomify works

            </h2>
          </div>
        </div>
        <div className="flex  flex-wrap justify-center gap-4">
          {steps.map((s) => (
            <button
              key={s.n}
              onClick={() => navigate("explore")}
              className="relative w-full max-w-xs flex items-center gap-4 px-5 py-3.5 bg-[#F7F5F0] dark:bg-[#2E2B27] border border-[#E0D9CE] dark:border-[#3A3530] rounded-xl hover:border-[#B08D57] transition-all"
            >
              <div className="w-4 h-8 rounded-lg flex-shrink-0" />
              <div className="text-left">
                <p className="font-display text-5xl font-medium text-[#B08D57] dark:text-[#B08D57] mb-4">{s.n}</p>

                <p className="text-sm font-semibold text-[#252525] dark:text-[#F7F5F0]">{s.title}</p>
                <p className="text-xs text-[#777777]">{s.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </section>
      <section className="py-14 px-8 lg:px-16 xl:px-24  bg-[#E8E1D5] dark:bg-[#2E2B27]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[#B08D57] mb-3">Gallery</p>
              <h2 className="font-display text-4xl font-medium text-[#252525] dark:text-[#F7F5F0]">
                A world of spaces
              </h2>
            </div>
            <button
              onClick={() => navigate("/explore")}
              className="hidden md:flex items-center gap-2 text-sm font-medium text-[#777777] hover:text-[#B08D57] transition-colors"
            >
              Explore all
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {galleryImages.map((g, i) => (
              <div key={i} className={`overflow-hidden rounded-xl ${g.h} w-full`}>
                <img
                  src={g.img}
                  alt="Interior inspiration"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-18 px-8 lg:px-16 xl:px-16  ">
        <div className="flex items-end justify-center mb-12">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-center text-[#B08D57] mb-3">Testimonials</p>
            <h2 className="font-display text-4xl font-medium text-[#252525] dark:text-[#F7F5F0]">
              Loved by designers <br />
              and homeowners alike

            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
              <div key={t.name} className="bg-white dark:bg-[#252220] rounded-2xl p-7 border border-[#E0D9CE] dark:border-[#3A3530]">
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#B08D57">
                      <path d="M6 1l1.3 2.6 2.9.4-2.1 2 .5 2.9L6 7.5 3.4 8.9l.5-2.9-2.1-2 2.9-.4z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-[#777777] dark:text-[#999390] leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#E8E1D5] dark:bg-[#2E2B27] flex items-center justify-center text-xs font-semibold text-[#B08D57]">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#252525] dark:text-[#F7F5F0]">{t.name}</p>
                    <p className="text-xs text-[#777777]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
       <section className="py-24 px-8 lg:px-16">
        <div className="max-w-4xl mx-auto text-center bg-[#252525] dark:bg-[#1F1C18] rounded-3xl px-10 py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#B08D57] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B08D57] rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-widest text-[#B08D57] mb-4">Ready to begin?</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-white mb-5">
              Start designing your<br />dream space today.
            </h2>
            <p className="text-[#999390] mb-10 max-w-md mx-auto">
              Join thousands of designers and homeowners who bring their ideas to life with Roomify.
            </p>
            <button
              onClick={() => navigate("/studio")}
              className="px-8 py-4 bg-[#B08D57] text-white font-medium rounded-xl hover:bg-[#9A7A48] transition-colors"
            >
              Start Designing — Free
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#E0D9CE] dark:border-[#3A3530] py-12 px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#252525] dark:bg-[#F7F5F0] rounded-md" />
            <span className="font-display text-lg font-semibold">Roomify</span>
          </div>
          <p className="text-sm text-[#777777]">© 2026 Roomify. Crafted with intention.</p>
          <div className="flex gap-6 text-sm text-[#777777]">
            {["Privacy", "Terms", "Contact"].map((l) => (
              <a key={l} href="#" className="hover:text-[#B08D57] transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home