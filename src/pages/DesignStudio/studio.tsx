import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { Design } from '../../types';
import { getAuthenticatedUser, saveCompleteDesign } from '../../services/designService';
import { useDesign } from '../../hooks/useDesign';
import DesignTopBar from './components/DesignTopBar';
import FurniturePanel from './components/FurniturePanel';
import DesignCanvas from './components/DesignCanvas';
import DesignControls from './components/DesignControls';
import { furnitureCategories, furnitureItems, productImages } from '../../constants';

function Studio() {
  const location = useLocation();
  const initialDesign = (location.state as { design?: Design } | null)?.design;
  const designObj = initialDesign ? {
    ...initialDesign,
    id: initialDesign.id,
  } : undefined;

  const {
    setDesignId,
    designName,
    setDesignName,
    selectedRoom,
    setSelectedRoom,
    wallColor,
    setWallColor,
    floor,
    setFloor,
    brightness,
    setBrightness,
    warmth,
    setWarmth,
    ambient,
    setAmbient,
    furniture,
    selectedFurniture,
    setSelectedFurniture,
    addFurniture,
    deleteFurniture,
    rotateFurniture,
    scaleFurniture,
    moveFurniture,
    getCurrentDesignObject,
  } = useDesign(designObj);

  const [activeLeftCat, setActiveLeftCat] = useState("Furniture");
  const [showFurnitureModal, setShowFurnitureModal] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [rightSection, setRightSection] = useState<string>("ROOM");
  const [savedToast, setSavedToast] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleSave = async () => {
    if (isSaving) return;
    const user = getAuthenticatedUser();
    if (!user) {
      setSaveError('Please sign in before saving your design.');
      setTimeout(() => setSaveError(null), 4000);
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      const design = getCurrentDesignObject();
      const savedDesign = await saveCompleteDesign(design);
      setDesignId(savedDesign.id);
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 3000);
    } catch (error) {
      console.error("Failed to save design", error);
      setSaveError(error instanceof Error ? error.message : 'Could not save design.');
      setTimeout(() => setSaveError(null), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    setSelectedFurniture(id);
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);

    const fItem = furniture.find((i) => i.id === id);
    if (fItem) {
      setDragOffset({
        x: e.clientX - fItem.x,
        y: e.clientY - fItem.y,
      });
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>, id: string) => {
    if (!isDragging) return;
    moveFurniture(id, e.clientX - dragOffset.x, e.clientY - dragOffset.y);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const searchableFurniture = furnitureItems.filter((item) => {
    const search = productSearch.trim().toLowerCase();
    const matchesCategory = activeLeftCat === "Furniture" || item.category === activeLeftCat;
    return search
      ? `${item.name} ${item.category}`.toLowerCase().includes(search)
      : matchesCategory;
  });

  return (
    <div className="h-[100dvh] flex flex-col bg-[#F7F5F0] dark:bg-[#1A1814] pt-16 overflow-hidden">
      <DesignTopBar
        designName={designName}
        setDesignName={setDesignName}
        isSaving={isSaving}
        onSave={handleSave}
        getCurrentDesignObject={getCurrentDesignObject}
      />

      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        <FurniturePanel
          activeLeftCat={activeLeftCat}
          setActiveLeftCat={setActiveLeftCat}
          onAddFurniture={(item) => { addFurniture(item); setShowFurnitureModal(false); }}
          onOpenMobileModal={() => { setProductSearch(""); setShowFurnitureModal(true); }}
        />

        <DesignCanvas
          wallColor={wallColor}
          floor={floor}
          ambient={ambient}
          brightness={brightness}
          warmth={warmth}
          furniture={furniture}
          selectedFurniture={selectedFurniture}
          setSelectedFurniture={setSelectedFurniture}
          isDragging={isDragging}
          handlePointerDown={handlePointerDown}
          handlePointerMove={handlePointerMove}
          handlePointerUp={handlePointerUp}
          scaleFurniture={scaleFurniture}
          rotateFurniture={rotateFurniture}
          deleteFurniture={deleteFurniture}
        />

        <DesignControls
          rightSection={rightSection}
          setRightSection={setRightSection}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
          wallColor={wallColor}
          setWallColor={setWallColor}
          floor={floor}
          setFloor={setFloor}
          brightness={brightness}
          setBrightness={setBrightness}
          warmth={warmth}
          setWarmth={setWarmth}
          ambient={ambient}
          setAmbient={setAmbient}
        />
      </div>

      {showFurnitureModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowFurnitureModal(false)}>
          <div className="bg-white dark:bg-[#252220] rounded-2xl w-full max-w-[600px] max-h-[80vh] flex flex-col shadow-2xl mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-[#E0D9CE] dark:border-[#3A3530]">
              <h2 className="font-display text-xl font-medium text-[#252525] dark:text-[#F7F5F0]">Add Furniture</h2>
              <button onClick={() => setShowFurnitureModal(false)} className="w-8 h-8 flex items-center justify-center rounded-lg text-[#777777] hover:bg-[#F7F5F0] dark:hover:bg-[#2E2B27]">✕</button>
            </div>
            <div className="flex gap-2 p-4 border-b border-[#E0D9CE] dark:border-[#3A3530] overflow-x-auto">
              {["All", ...furnitureCategories.slice(1, 7)].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveLeftCat(cat === "All" ? "Furniture" : cat)}
                  className={`flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    (cat === "All" && activeLeftCat === "Furniture") || activeLeftCat === cat
                      ? "bg-[#252525] text-white"
                      : "bg-[#F7F5F0] dark:bg-[#2E2B27] text-[#777777]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="px-4 pt-4">
              <label htmlFor="product-search" className="sr-only">Search furniture products</label>
              <input
                id="product-search"
                type="search"
                value={productSearch}
                onChange={(event) => setProductSearch(event.target.value)}
                placeholder="Search chair, bed, sofa..."
                className="w-full px-3 py-2.5 text-sm rounded-lg border border-[#E0D9CE] dark:border-[#3A3530] bg-[#F7F5F0] dark:bg-[#2E2B27] text-[#252525] dark:text-[#F7F5F0] outline-none focus:border-[#B08D57]"
              />
            </div>
            <div className="overflow-y-auto p-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
              {searchableFurniture.map((item) => (
                <button
                  key={item.name}
                  onClick={() => { addFurniture(item); setShowFurnitureModal(false); }}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#F7F5F0] dark:bg-[#2E2B27] hover:bg-[#E8E1D5] dark:hover:bg-[#3A3530] transition-colors border border-transparent hover:border-[#B08D57]/30 text-center"
                >
                  {productImages[item.name] ? (
                    <img src={productImages[item.name]} alt={item.name} className="w-20 h-14 object-cover rounded-lg pointer-events-none" />
                  ) : (
                    <span className="text-3xl pointer-events-none">{item.emoji}</span>
                  )}
                  <span className="text-xs font-medium text-[#252525] dark:text-[#F7F5F0]">{item.name}</span>
                  <span className="text-[10px] text-[#777777]">{item.category}</span>
                  <span className="text-xs text-[#B08D57] font-medium">+ Add</span>
                </button>
              ))}
              {searchableFurniture.length === 0 && (
                <p className="col-span-full py-8 text-center text-sm text-[#777777]">No matching products found.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {savedToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 bg-[#252525] text-white px-5 py-3 rounded-xl shadow-xl">
          <span className="text-[#B08D57]">✓</span>
          <span className="text-sm font-medium">Design saved successfully</span>
        </div>
      )}
      {saveError && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 bg-red-600 text-white px-5 py-3 rounded-xl shadow-xl">
          <span className="text-sm font-medium">{saveError}</span>
        </div>
      )}
    </div>
  );
}

export default Studio;
