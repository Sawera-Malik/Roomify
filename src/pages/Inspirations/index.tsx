import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import type { Design } from '../../types';
import { collections, designerSpotlights, moodboards, tabs, trendPosts } from '../../constants';

function inspirationDesign(name: string, room: string, style: string, image: string, wallColor?: string): Design {
  return {
    id: `inspiration-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    name,
    room,
    roomType: room,
    style,
    edited: 'Inspiration',
    img: image,
    previewImageUrl: image,
    wall: wallColor,
    wallColor,
    furniture: [],
  };
}

function Inspirations() {
    const [activeTab, setActiveTab] = useState("Collections");
  const [savedMoods, setSavedMoods] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const toggleSave = (title: string) => {
    setSavedMoods((prev) => {
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
      <section className="relative overflow-hidden bg-[#252525] dark:bg-[#1A1814]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1724582586529-62622e50c0b3?w=1600&h=600&fit=crop&auto=format"
            alt="Inspiration hero"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#252525] via-[#252525]/80 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 py-20">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#B08D57]/20 rounded-full text-xs font-medium text-[#B08D57] tracking-wider uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
            Curated for you
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-medium text-white leading-[1.1] mb-4">
            Where great spaces<br />
            <em className="not-italic text-[#B08D57]">begin.</em>
          </h1>
          <p className="text-white/60 text-lg max-w-md mb-8">
            Curated collections, color palettes, trend stories and designer spotlights — all in one place.
          </p>
          <button
            onClick={() => navigate("/design-studio")}
            className="px-6 py-3 bg-[#B08D57] text-white text-sm font-semibold rounded-xl hover:bg-[#9A7A48] transition-colors"
          >
            Take me to the Studio →
          </button>
        </div>
      </section>

      <div className="sticky top-16 z-30 bg-[#F7F5F0]/95 dark:bg-[#1A1814]/95 backdrop-blur-sm border-b border-[#E0D9CE] dark:border-[#3A3530]">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24">
          <div className="flex gap-0 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-4 text-sm font-semibold border-b-2 transition-colors flex-shrink-0 ${
                  activeTab === tab
                    ? "border-[#B08D57] text-[#B08D57]"
                    : "border-transparent text-[#777777] hover:text-[#252525] dark:hover:text-[#F7F5F0]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 py-12">

        {activeTab === "Collections" && (
          <div className="space-y-12">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[#B08D57] mb-2">Featured</p>
              <h2 className="font-display text-3xl font-medium text-[#252525] dark:text-[#F7F5F0]">Curated Collections</h2>
              <p className="text-[#777777] mt-2 max-w-lg">Handpicked room styles brought together around a single design vision.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {collections.map((col) => (
                <div key={col.title} className="group relative rounded-2xl overflow-hidden bg-[#E8E1D5] dark:bg-[#2E2B27] cursor-pointer">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={col.cover}
                      alt={col.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1814]/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ background: col.accent }}
                    >
                      {col.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-display text-xl font-medium text-white mb-1">{col.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-3">{col.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/50 text-xs">{col.count} rooms</span>
                      <button
                        onClick={() => navigate('/preview', {
                          state: {
                            design: inspirationDesign(
                              col.title,
                              col.title === 'The Quiet Office' ? 'Office' : col.title === 'The Nordic Edit' ? 'Bedroom' : 'Living Room',
                              col.tag,
                              col.cover,
                            ),
                            sourceImage: col.cover,
                            previewVersion: col.title,
                          },
                        })}
                        className="px-3 py-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        Browse →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between py-6 border-t border-[#E0D9CE] dark:border-[#3A3530]">
              <div>
                <p className="font-semibold text-[#252525] dark:text-[#F7F5F0]">Ready to make it yours?</p>
                <p className="text-sm text-[#777777]">Open any collection in the Design Studio.</p>
              </div>
              <button
                onClick={() => navigate("/design-studio")}
                className="px-5 py-2.5 bg-[#252525] dark:bg-[#F7F5F0] text-white dark:text-[#252525] text-sm font-semibold rounded-xl hover:bg-[#B08D57] transition-colors"
              >
                Open Studio
              </button>
            </div>
          </div>
        )}

        {activeTab === "Moodboards" && (
          <div className="space-y-10">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[#B08D57] mb-2">Palettes</p>
              <h2 className="font-display text-3xl font-medium text-[#252525] dark:text-[#F7F5F0]">Color Moodboards</h2>
              <p className="text-[#777777] mt-2 max-w-lg">Start from a feeling. Each moodboard pairs a photography mood with a ready-to-use color palette.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {moodboards.map((m) => (
                <div key={m.title} className="bg-white dark:bg-[#252220] rounded-2xl overflow-hidden border border-[#E0D9CE] dark:border-[#3A3530] hover:shadow-lg transition-shadow group">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={m.img}
                      alt={m.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={() => toggleSave(m.title)}
                      className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-sm transition-colors hover:bg-white"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill={savedMoods.has(m.title) ? "#B08D57" : "none"} stroke={savedMoods.has(m.title) ? "#B08D57" : "#252525"} strokeWidth="1.5">
                        <path d="M7 12.5l-5.5-5a3 3 0 014.2-4.2L7 4.9l1.3-1.6a3 3 0 014.2 4.2L7 12.5z" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-display text-lg font-medium text-[#252525] dark:text-[#F7F5F0]">{m.title}</h3>
                        <p className="text-xs text-[#777777] mt-0.5">{m.mood}</p>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        {m.rooms.map((r) => (
                          <span key={r} className="px-2 py-0.5 bg-[#E8E1D5] dark:bg-[#2E2B27] text-[#777777] text-[10px] font-medium rounded-full">{r}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-1.5 mb-4">
                      {m.palette.map((c) => (
                        <div
                          key={c}
                          title={c}
                          className="flex-1 h-7 rounded-md cursor-pointer hover:scale-110 transition-transform border border-black/5"
                          style={{ background: c }}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => navigate('/studio', {
                        state: {
                          design: inspirationDesign(
                            m.title,
                            m.rooms[0],
                            m.title === 'Midnight Marble' ? 'Luxury' : m.title === 'Golden Hour' ? 'Cozy' : 'Minimal',
                            m.img,
                            m.palette[0],
                          ),
                        },
                      })}
                      className="w-full py-2.5 text-xs font-semibold bg-[#F7F5F0] dark:bg-[#2E2B27] text-[#252525] dark:text-[#F7F5F0] rounded-xl hover:bg-[#E8E1D5] dark:hover:bg-[#3A3530] transition-colors"
                    >
                      Apply to Studio →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Trends" && (
          <div className="space-y-10">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[#B08D57] mb-2">Editorial</p>
              <h2 className="font-display text-3xl font-medium text-[#252525] dark:text-[#F7F5F0]">Trend Stories</h2>
              <p className="text-[#777777] mt-2 max-w-lg">What's shaping interiors right now — from materials and colours to the ideas behind the spaces.</p>
            </div>

            <div
              className="group relative rounded-2xl overflow-hidden cursor-pointer h-80 bg-[#E8E1D5]"
              onClick={() => navigate('/preview', {
                state: {
                  design: inspirationDesign('Living Room Ritual', 'Living Room', 'Modern', 'https://images.unsplash.com/photo-1663811397207-418a92396ad5?w=1200&h=600&fit=crop&auto=format'),
                  sourceImage: 'https://images.unsplash.com/photo-1663811397207-418a92396ad5?w=1200&h=600&fit=crop&auto=format',
                  previewVersion: 'Living Room Ritual',
                },
              })}
            >
              <img
                src="https://images.unsplash.com/photo-1663811397207-418a92396ad5?w=1200&h=600&fit=crop&auto=format"
                alt="Hero trend"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1814]/70 via-[#1A1814]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 max-w-xl">
                <span className="px-2.5 py-1 bg-[#B08D57] text-white text-xs font-semibold rounded-full mb-3 inline-block">Cover Story</span>
                <h3 className="font-display text-3xl font-medium text-white mb-2">
                  The return of the living room as ritual space
                </h3>
                <p className="text-white/60 text-sm mb-4">After years of multi-purpose living, designers are reclaiming the lounge as a dedicated sanctuary.</p>
                <span className="text-white/50 text-xs">Sep 18, 2026 · 6 min read</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trendPosts.map((post) => (
                <article
                  key={post.title}
                  className="group cursor-pointer"
                  onClick={() => navigate('/preview', {
                    state: {
                      design: inspirationDesign(post.title, 'Living Room', 'Modern', post.img),
                      sourceImage: post.img,
                      previewVersion: post.title,
                    },
                  })}
                >
                  <div className="rounded-xl overflow-hidden h-48 bg-[#E8E1D5] dark:bg-[#2E2B27] mb-4">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-[#E8E1D5] dark:bg-[#2E2B27] text-[#B08D57] text-[10px] font-semibold rounded-full uppercase tracking-wider">{post.category}</span>
                    <span className="text-[10px] text-[#999390]">{post.readTime}</span>
                  </div>
                  <h3 className="font-display text-lg font-medium text-[#252525] dark:text-[#F7F5F0] group-hover:text-[#B08D57] transition-colors leading-snug mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#777777] leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <p className="text-xs text-[#999390] mt-3">{post.date}</p>
                </article>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Designers" && (
          <div className="space-y-10">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[#B08D57] mb-2">Community</p>
              <h2 className="font-display text-3xl font-medium text-[#252525] dark:text-[#F7F5F0]">Designer Spotlights</h2>
              <p className="text-[#777777] mt-2 max-w-lg">Meet the creators pushing boundaries on Roomify.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {designerSpotlights.map((d) => (
                <div key={d.name} className="bg-white dark:bg-[#252220] rounded-2xl overflow-hidden border border-[#E0D9CE] dark:border-[#3A3530] hover:shadow-lg transition-shadow">
                  <div className="h-24 bg-gradient-to-br from-[#E8E1D5] to-[#C4B99A] dark:from-[#2E2B27] dark:to-[#3A3530] relative">
                    <div className="absolute -bottom-8 left-5">
                    </div>
                  </div>
                  <div className="pt-10 px-5 pb-5">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h3 className="font-display text-lg font-semibold text-[#252525] dark:text-[#F7F5F0]">{d.name}</h3>
                        <p className="text-xs text-[#777777]">{d.title}</p>
                      </div>
                      <span className="text-xs font-semibold text-[#B08D57] bg-[#B08D57]/10 px-2.5 py-1 rounded-full">{d.works} works</span>
                    </div>
                    <p className="text-xs text-[#B08D57] font-medium mt-2 mb-3">{d.specialty}</p>
                    <blockquote className="text-sm text-[#777777] italic border-l-2 border-[#E0D9CE] dark:border-[#3A3530] pl-3 mb-4 leading-relaxed">
                      "{d.quote}"
                    </blockquote>
                    <button  className="w-full py-2.5 text-xs font-semibold bg-[#F7F5F0] dark:bg-[#2E2B27] text-[#252525] dark:text-[#F7F5F0] rounded-xl hover:bg-[#E8E1D5] dark:hover:bg-[#3A3530] transition-colors">
                     <a href={d.portfolio} target="_blank" rel="noopener noreferrer" className="block text-center">
                       View Portfolio →
                     </a>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#252525] dark:bg-[#1F1C18] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-display text-xl font-medium text-white mb-1">Are you a designer?</h3>
                <p className="text-white/50 text-sm">Share your work and get discovered by thousands of homeowners.</p>
              </div>
              <button
                onClick={() => navigate("/signin")}
                className="flex-shrink-0 px-6 py-3 bg-[#B08D57] text-white text-sm font-semibold rounded-xl hover:bg-[#9A7A48] transition-colors"
              >
                Apply to Feature
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Inspirations
