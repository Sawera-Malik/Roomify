import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import type { Design } from '../../types';
import { categories, designs } from '../../constants';

function Explore() {
   const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set(designs.filter(d => d.saved).map(d => d.title)));

  const filtered = designs.filter((d) => {
    const matchCat = activeCategory === "All" || d.room === activeCategory || d.style === activeCategory;
    const matchQ = !query || d.title.toLowerCase().includes(query.toLowerCase()) || d.style.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  const navigate = useNavigate()

  const toggleSave = (title: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  };
  return (
     <div className="pt-16 min-h-screen bg-[#F7F5F0] dark:bg-[#1A1814]">
      <div className="px-8 lg:px-16 xl:px-24 py-16 border-b border-[#E0D9CE] dark:border-[#3A3530]">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-medium uppercase tracking-widest text-[#B08D57] mb-3">Discover</p>
          <h1 className="font-display text-4xl md:text-5xl font-medium text-[#252525] dark:text-[#F7F5F0] mb-6">
            Find inspiration for<br />your space.
          </h1>

          <div className="relative max-w-xl">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777777]" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search rooms, styles, colors…"
              className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-[#252220] border border-[#E0D9CE] dark:border-[#3A3530] rounded-xl text-sm text-[#252525] dark:text-[#F7F5F0] placeholder:text-[#999390] focus:outline-none focus:border-[#B08D57] transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-[#252525] dark:bg-[#F7F5F0] text-white dark:text-[#252525]"
                    : "bg-white dark:bg-[#252220] border border-[#E0D9CE] dark:border-[#3A3530] text-[#777777] hover:border-[#B08D57] hover:text-[#B08D57]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-8 lg:px-16 xl:px-24 py-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-[#777777] mb-8">{filtered.length} designs found</p>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#E8E1D5] dark:bg-[#2E2B27] flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="#B08D57" strokeWidth="1.5" />
                  <path d="M21 21l-4.35-4.35" stroke="#B08D57" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-medium text-[#252525] dark:text-[#F7F5F0] mb-2">No designs found</h3>
              <p className="text-sm text-[#777777]">Try a different search or filter.</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5">
              {filtered.map((d) => (
                <div key={d.title} className="group relative overflow-hidden rounded-2xl bg-[#E8E1D5] dark:bg-[#2E2B27] break-inside-avoid cursor-pointer">
                  <div className={`${d.h} overflow-hidden`}>
                    <img
                      src={d.img}
                      alt={d.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-white/90 dark:bg-black/60 backdrop-blur-sm text-[#252525] dark:text-white text-xs font-medium rounded-full">
                      {d.style}
                    </span>
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); toggleSave(d.title); }}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 dark:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill={savedIds.has(d.title) ? "#B08D57" : "none"} stroke={savedIds.has(d.title) ? "#B08D57" : "#252525"} strokeWidth="1.5">
                      <path d="M7 12.5l-5.5-5a3 3 0 014.2-4.2L7 4.9l1.3-1.6a3 3 0 014.2 4.2L7 12.5z" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white font-semibold text-sm">{d.title}</p>
                    <p className="text-white/70 text-xs mt-0.5">{d.room}</p>
                    <button
                      onClick={() => {
                        const design: Design = {
                          id: `explore-${d.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
                          name: d.title,
                          room: d.room,
                          roomType: d.room,
                          style: d.style,
                          edited: 'Inspiration',
                          img: d.img,
                          previewImageUrl: d.img,
                          furniture: [],
                        };
                        navigate('/preview', { state: { design, sourceImage: d.img, previewVersion: d.title } });
                      }}
                      className="mt-3 px-4 py-1.5 bg-white text-[#252525] text-xs font-semibold rounded-lg hover:bg-[#B08D57] hover:text-white transition-colors"
                    >
                      View Design →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Explore
