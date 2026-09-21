import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { loadCurrentUserDesigns, deleteCurrentUserDesign, saveCompleteDesign } from '../../services/designService';
import type { Design } from '../../types';

function DesignStudio() {
 
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const userId = user?.uid ?? null;
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<Design | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const navigate = useNavigate();

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    loadCurrentUserDesigns(user.uid)
      .then(setDesigns)
      .catch((error: unknown) => {
        const message = error instanceof Error && error.message.includes("Database '(default)' not found")
          ? "Firestore is not enabled for this Firebase project. Create the default database in Firebase Console."
          : "Could not load designs";
        showToast(message);
      })
      .finally(() => setLoading(false));
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!userId) return;
    await deleteCurrentUserDesign(id);
    setDesigns((d) => d.filter((x) => x.id !== id));
    setDeleteConfirm(null);
    showToast("Design deleted");
  };

  const handleDuplicate = async (design: Design) => {
    if (!userId) return;
    const dupe: Design = { ...design, id: String(Date.now()), name: `${design.name} (Copy)`, edited: "Just now" };
    await saveCompleteDesign(dupe);
    setDesigns((d) => [dupe, ...d]);
    showToast("Design duplicated");
  };

   if (selectedDetail) {
    return (
      <div className="pt-16 min-h-screen bg-[#F7F5F0] dark:bg-[#1A1814]">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-12">
          <button onClick={() => setSelectedDetail(null)} className="flex items-center gap-2 text-sm text-[#777777] hover:text-[#B08D57] mb-8 transition-colors">
            ← Back to Saved Designs
          </button>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="rounded-2xl overflow-hidden shadow-lg bg-[#E8E1D5]">
                  <img src={selectedDetail.previewImageUrl ?? selectedDetail.img} alt={selectedDetail.name} className="w-full h-full object-cover" style={{ minHeight: "400px" }} />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[#B08D57] mb-2">Design Details</p>
              <h1 className="font-display text-3xl font-medium text-[#252525] dark:text-[#F7F5F0] mb-6">{selectedDetail.name}</h1>
              <div className="space-y-4 mb-8">
                {[
                  ["Room Type", selectedDetail.room],
                  ["Style", selectedDetail.style],
                  ["Wall Color", selectedDetail.wallColor ?? "Warm Ivory #F7F5F0"],
                  ["Flooring", selectedDetail.floor ?? "Light Wood"],
                  ["Furniture Count", `${selectedDetail.furniture?.length ?? 6} pieces`],
                  ["Last Edited", selectedDetail.edited],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between py-3 border-b border-[#E0D9CE] dark:border-[#3A3530]">
                    <span className="text-sm text-[#777777]">{label}</span>
                    <span className="text-sm font-medium text-[#252525] dark:text-[#F7F5F0]">{val}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <button onClick={() => navigate("/studio", { state: { design: selectedDetail } })} className="w-full py-3 bg-[#252525] dark:bg-[#F7F5F0] text-white dark:text-[#252525] font-medium rounded-xl hover:bg-[#B08D57] transition-colors">
                  Edit Design
                </button>
                <div className="flex gap-3">
                  <button onClick={() => { void handleDuplicate(selectedDetail); setSelectedDetail(null); }} className="flex-1 py-2.5 border border-[#E0D9CE] dark:border-[#3A3530] text-sm font-medium text-[#252525] dark:text-[#F7F5F0] rounded-xl hover:border-[#B08D57] transition-colors">
                    Duplicate
                  </button>
                  <button className="flex-1 py-2.5 border border-[#E0D9CE] dark:border-[#3A3530] text-sm font-medium text-[#252525] dark:text-[#F7F5F0] rounded-xl hover:border-[#B08D57] transition-colors">
                    Share
                  </button>
                  <button onClick={() => setDeleteConfirm(selectedDetail.id)} className="flex-1 py-2.5 border border-red-200 text-sm font-medium text-red-500 rounded-xl hover:bg-red-50 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white dark:bg-[#252220] rounded-2xl p-7 max-w-sm mx-4 shadow-2xl">
              <h3 className="font-display text-xl font-medium text-[#252525] dark:text-[#F7F5F0] mb-2">Delete Design?</h3>
              <p className="text-sm text-[#777777] mb-6">This action cannot be undone. Your design will be permanently deleted.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 border border-[#E0D9CE] dark:border-[#3A3530] text-sm font-medium rounded-xl">Cancel</button>
                <button onClick={() => { handleDelete(deleteConfirm); setSelectedDetail(null); }} className="flex-1 py-2.5 bg-red-500 text-white text-sm font-medium rounded-xl hover:bg-red-600 transition-colors">Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-[#F7F5F0] dark:bg-[#1A1814]">
      <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 py-16">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[#B08D57] mb-3">My Collection</p>
            <h1 className="font-display text-4xl font-medium text-[#252525] dark:text-[#F7F5F0]">Your designs</h1>
            <p className="text-[#777777] mt-2">Keep your favorite spaces and continue designing anytime.</p>
          </div>
          <button
            onClick={() => navigate("/studio")}
            className="flex items-center gap-2 px-5 py-3 bg-[#252525] dark:bg-[#F7F5F0] text-white dark:text-[#252525] font-medium rounded-xl hover:bg-[#B08D57] transition-colors text-sm"
          >
            <span className="text-lg">+</span>
            Create New Design
          </button>
        </div>

        {loading ? (
          <div className="py-32 text-center text-sm text-[#777777]">Loading your designs...</div>
        ) : designs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 rounded-3xl bg-[#E8E1D5] dark:bg-[#2E2B27] flex items-center justify-center mb-6">
              <span className="text-4xl">🛋️</span>
            </div>
            <h3 className="font-display text-2xl font-medium text-[#252525] dark:text-[#F7F5F0] mb-2">No designs yet</h3>
            <p className="text-[#777777] mb-8">Start creating your first space.</p>
            <button
              onClick={() => navigate("/studio")}
              className="px-6 py-3 bg-[#252525] dark:bg-[#F7F5F0] text-white dark:text-[#252525] font-medium rounded-xl hover:bg-[#B08D57] transition-colors"
            >
              Start Designing
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {/* Create new card */}
            <button
              onClick={() => navigate("/studio")}
              className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#E0D9CE] dark:border-[#3A3530] hover:border-[#B08D57] transition-colors min-h-[280px] text-center p-6 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#E8E1D5] dark:bg-[#2E2B27] flex items-center justify-center group-hover:bg-[#B08D57]/20 transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 3v14M3 10h14" stroke="#B08D57" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-[#B08D57]">Create New Design</p>
              <p className="text-xs text-[#777777]">Start a fresh space</p>
            </button>

            {designs.map((design) => (
              <div key={design.id} className="group relative bg-white dark:bg-[#252220] rounded-2xl overflow-hidden border border-[#E0D9CE] dark:border-[#3A3530] shadow-sm hover:shadow-md transition-shadow">
                <div className="relative overflow-hidden h-48 bg-[#E8E1D5]">
                  <img
                    src={design.previewImageUrl ?? design.img}
                    alt={design.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-white/90 dark:bg-black/60 text-xs font-medium rounded-full text-[#252525] dark:text-white">
                      {design.style}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <button onClick={() => setSelectedDetail(design)} className="text-left w-full">
                    <h3 className="font-semibold text-[#252525] dark:text-[#F7F5F0] hover:text-[#B08D57] transition-colors">{design.name}</h3>
                    <p className="text-xs text-[#777777] mt-0.5">{design.room} · {design.style}</p>
                    <p className="text-xs text-[#999390] mt-2">Edited {design.edited}</p>
                  </button>
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#E0D9CE] dark:border-[#3A3530]">
                    <button
                      onClick={() => navigate("/studio", { state: { design } })}
                      className="flex-1 py-2 text-xs font-semibold bg-[#F7F5F0] dark:bg-[#2E2B27] text-[#252525] dark:text-[#F7F5F0] rounded-lg hover:bg-[#E8E1D5] dark:hover:bg-[#3A3530] transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => void handleDuplicate(design)}
                      className="px-3 py-2 text-xs font-medium text-[#777777] hover:text-[#252525] dark:hover:text-[#F7F5F0] border border-[#E0D9CE] dark:border-[#3A3530] rounded-lg transition-colors"
                    >
                      Copy
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(design.id)}
                      className="px-3 py-2 text-xs font-medium text-red-400 hover:text-red-500 border border-[#E0D9CE] dark:border-[#3A3530] rounded-lg transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#252220] rounded-2xl p-7 max-w-sm mx-4 shadow-2xl">
            <h3 className="font-display text-xl font-medium text-[#252525] dark:text-[#F7F5F0] mb-2">Delete Design?</h3>
            <p className="text-sm text-[#777777] mb-6">This action cannot be undone. Your design will be permanently deleted.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 border border-[#E0D9CE] dark:border-[#3A3530] text-sm font-medium rounded-xl text-[#252525] dark:text-[#F7F5F0]">Cancel</button>
                <button onClick={() => { void handleDelete(deleteConfirm); setSelectedDetail(null); }} className="flex-1 py-2.5 bg-red-500 text-white text-sm font-medium rounded-xl hover:bg-red-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[#252525] text-white px-5 py-3 rounded-xl shadow-xl">
          <span className="text-[#B08D57]">✓</span>
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}
    </div>
  );
}
export default DesignStudio
