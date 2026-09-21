import type { FurnitureItem } from '../../../types';
import { floorBg } from '../../../constants';

interface DesignCanvasProps {
  wallColor: string;
  floor: string;
  ambient: boolean;
  brightness: number;
  warmth: number;
  furniture: FurnitureItem[];
  selectedFurniture: string | null;
  setSelectedFurniture: (id: string | null) => void;
  isDragging: boolean;
  handlePointerDown: (e: React.PointerEvent<HTMLButtonElement>, id: string) => void;
  handlePointerMove: (e: React.PointerEvent<HTMLButtonElement>, id: string) => void;
  handlePointerUp: (e: React.PointerEvent<HTMLButtonElement>) => void;
  scaleFurniture: (id: string, factor: number) => void;
  rotateFurniture: (id: string) => void;
  deleteFurniture: (id: string) => void;
}

export default function DesignCanvas({
  wallColor,
  floor,
  ambient,
  brightness,
  warmth,
  furniture,
  selectedFurniture,
  setSelectedFurniture,
  isDragging,
  handlePointerDown,
  handlePointerMove,
  handlePointerUp,
  scaleFurniture,
  rotateFurniture,
  deleteFurniture,
}: DesignCanvasProps) {
  return (
    <div
      className="flex-1 relative overflow-hidden bg-[#E8E4DE] dark:bg-[#1F1C18]"
      onPointerDown={() => setSelectedFurniture(null)}
    >
      <div
        className="absolute inset-4 md:inset-8 rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: wallColor }}
      >
        <div className="absolute inset-0" style={{ background: wallColor }} />
        <div
          className="absolute bottom-0 left-0 right-0 h-[40%] rounded-b-2xl"
          style={{ background: floorBg[floor] || "#D4B896" }}
        />
        <div className="absolute bottom-[40%] left-0 right-0 h-px bg-black/10" />
        <div className="absolute top-8 right-8 md:right-16 w-20 md:w-24 h-28 md:h-32 bg-[#C8E0F0]/60 border-4 border-white/80 rounded-lg shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-white/60" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/60" />
        </div>
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2 w-16 md:w-20 h-3 md:h-4 bg-white/40 rounded-b-full"
          style={{
            boxShadow: ambient
              ? `0 0 ${brightness}px ${brightness / 2}px rgba(255,220,150,${warmth / 200 + 0.1})`
              : "none",
          }}
        />
        <div className="absolute bottom-[40%] left-0 right-0 h-2 bg-white/50" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: `rgba(20, 16, 12, ${Math.max(0.04, (100 - brightness) / 400)})`,
          }}
        />

        {furniture.map((item) => {
          const sScale = item.scale || 1;
          const isSel = selectedFurniture === item.id;
          return (
            <button
              key={item.id}
              onPointerDown={(e) => handlePointerDown(e, item.id)}
              onPointerMove={(e) => handlePointerMove(e, item.id)}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className={`absolute flex flex-col items-center gap-0.5 cursor-move touch-none transition-transform duration-75 ${
                isSel ? "z-20" : "hover:scale-[1.02] z-10"
              }`}
              style={{
                left: item.x,
                top: item.y,
                transform: `translate(-50%, -50%) rotate(${item.rotation}deg) scale(${
                  sScale * (isSel && !isDragging ? 1.05 : 1)
                })`,
              }}
            >
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-14 md:w-28 md:h-20 object-cover rounded-lg shadow-md pointer-events-none"
                />
              ) : (
                <span className="text-3xl md:text-5xl drop-shadow-md pointer-events-none">
                  {item.emoji}
                </span>
              )}
              {isSel && (
                <span className="absolute -bottom-6 text-[10px] font-semibold bg-[#252525] text-white px-2 py-0.5 rounded-full whitespace-nowrap pointer-events-none opacity-80">
                  {item.name}
                </span>
              )}
              {isSel && (
                <div
                  className="absolute -inset-2 border-2 border-[#B08D57] rounded-lg pointer-events-none"
                  style={{ borderStyle: "dashed" }}
                />
              )}
            </button>
          );
        })}

        {selectedFurniture && !isDragging && (
          <div
            className="absolute flex items-center gap-1 sm:gap-2 bg-white dark:bg-[#252220] rounded-xl px-2 py-1.5 shadow-xl border border-[#E0D9CE] dark:border-[#3A3530] z-30 transform -translate-x-1/2"
            style={{
              left: furniture.find((f) => f.id === selectedFurniture)?.x ?? 0,
              top: (furniture.find((f) => f.id === selectedFurniture)?.y ?? 0) + 60,
            }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            {[
              { label: "−", action: () => scaleFurniture(selectedFurniture, -0.1) },
              { label: "+", action: () => scaleFurniture(selectedFurniture, 0.1) },
              { label: "↺", action: () => rotateFurniture(selectedFurniture) },
              { label: "✕", action: () => deleteFurniture(selectedFurniture), red: true },
            ].map((ctrl) => (
              <button
                key={ctrl.label}
                onClick={ctrl.action}
                className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg transition-colors ${
                  ctrl.red
                    ? "text-red-500 hover:bg-red-50"
                    : "text-[#252525] dark:text-[#F7F5F0] hover:bg-[#F7F5F0] dark:hover:bg-[#2E2B27]"
                }`}
              >
                {ctrl.label}
              </button>
            ))}
          </div>
        )}

        {furniture.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <p className="text-4xl mb-3">🛋️</p>
            <p className="text-sm font-medium text-[#777777]">Add furniture to start designing</p>
          </div>
        )}
      </div>
    </div>
  );
}
