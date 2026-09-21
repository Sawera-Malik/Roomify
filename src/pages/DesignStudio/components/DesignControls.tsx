import { roomTypes, wallColors, floorTypes, floorBg } from '../../../constants';

interface DesignControlsProps {
  rightSection: string;
  setRightSection: (section: string) => void;
  selectedRoom: string;
  setSelectedRoom: (room: string) => void;
  wallColor: string;
  setWallColor: (color: string) => void;
  floor: string;
  setFloor: (f: string) => void;
  brightness: number;
  setBrightness: (b: number) => void;
  warmth: number;
  setWarmth: (w: number) => void;
  ambient: boolean;
  setAmbient: (a: boolean) => void;
}

export default function DesignControls({
  rightSection,
  setRightSection,
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
}: DesignControlsProps) {
  return (
    <div className="md:w-64 flex-shrink-0 bg-white dark:bg-[#252220] border-t md:border-t-0 md:border-l border-[#E0D9CE] dark:border-[#3A3530] flex flex-col overflow-hidden z-20">
      {/* Section tabs */}
      <div className="flex border-b border-[#E0D9CE] dark:border-[#3A3530] overflow-x-auto">
        {["ROOM", "WALL", "FLOOR", "LIGHT"].map((s) => (
          <button
            key={s}
            onClick={() => setRightSection(s)}
            className={`flex-1 flex-shrink-0 px-2 py-3 text-[10px] sm:text-xs font-semibold transition-colors text-center ${
              rightSection === s
                ? "text-[#B08D57] border-b-2 border-[#B08D57]"
                : "text-[#777777] hover:text-[#252525] dark:hover:text-[#F7F5F0]"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 max-h-[30vh] md:max-h-none">
        {rightSection === "ROOM" && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-[#777777] uppercase tracking-wider mb-3">Room Type</p>
            {roomTypes.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRoom(r)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  selectedRoom === r
                    ? "bg-[#E8E1D5] dark:bg-[#2E2B27] text-[#B08D57] border border-[#B08D57]/30"
                    : "text-[#252525] dark:text-[#F7F5F0] border border-transparent hover:border-[#E0D9CE] dark:hover:border-[#3A3530]"
                }`}
              >
                <span className="text-base">
                  {r === "Living Room" ? "🛋️" : r === "Bedroom" ? "🛏️" : "💻"}
                </span>
                {r}
                {selectedRoom === r && <span className="ml-auto text-[#B08D57]">✓</span>}
              </button>
            ))}
          </div>
        )}

        {rightSection === "WALL" && (
          <div>
            <p className="text-xs font-semibold text-[#777777] uppercase tracking-wider mb-3">Wall Color</p>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {wallColors.map((c) => (
                <button
                  key={c}
                  onClick={() => setWallColor(c)}
                  className={`w-10 h-10 rounded-lg border-2 transition-all ${
                    wallColor === c ? "border-[#B08D57] scale-110" : "border-transparent hover:border-[#E0D9CE]"
                  }`}
                  style={{ background: c }}
                />
              ))}
            </div>
            <div className="mt-4">
              <p className="text-xs font-semibold text-[#777777] uppercase tracking-wider mb-2">Custom Color</p>
              <input
                type="color"
                value={wallColor}
                onChange={(e) => setWallColor(e.target.value)}
                className="w-full h-10 rounded-lg cursor-pointer border border-[#E0D9CE] dark:border-[#3A3530]"
              />
            </div>
          </div>
        )}

        {rightSection === "FLOOR" && (
          <div>
            <p className="text-xs font-semibold text-[#777777] uppercase tracking-wider mb-3">Floor Type</p>
            <div className="space-y-2">
              {floorTypes.map((f) => (
                <button
                  key={f}
                  onClick={() => setFloor(f)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    floor === f
                      ? "bg-[#E8E1D5] dark:bg-[#2E2B27] text-[#B08D57] border border-[#B08D57]/30"
                      : "text-[#252525] dark:text-[#F7F5F0] border border-transparent hover:border-[#E0D9CE] dark:hover:border-[#3A3530]"
                  }`}
                >
                  <div
                    className="w-7 h-7 rounded-md flex-shrink-0 border border-white/50"
                    style={{ background: floorBg[f] || "#D4B896" }}
                  />
                  {f}
                  {floor === f && <span className="ml-auto text-[#B08D57]">✓</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {rightSection === "LIGHT" && (
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-xs font-semibold text-[#777777] uppercase tracking-wider">Brightness</p>
                <span className="text-xs text-[#B08D57] font-medium">{brightness}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-xs font-semibold text-[#777777] uppercase tracking-wider">Warm ↔ Cool</p>
                <span className="text-xs text-[#B08D57] font-medium">{warmth}%</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={warmth}
                  onChange={(e) => setWarmth(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-[10px] text-[#999390] mt-1">
                  <span>🌅 Warm</span>
                  <span>❄️ Cool</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[#252525] dark:text-[#F7F5F0]">Ambient Light</p>
              <button
                onClick={() => setAmbient(!ambient)}
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  ambient ? "bg-[#B08D57]" : "bg-[#E0D9CE] dark:bg-[#3A3530]"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                    ambient ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
