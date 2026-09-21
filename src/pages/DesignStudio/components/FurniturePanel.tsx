import { furnitureCategories, furnitureItems, productImages } from '../../../constants';

interface FurniturePanelProps {
  activeLeftCat: string;
  setActiveLeftCat: (cat: string) => void;
  onAddFurniture: (item: { name: string; emoji: string }) => void;
  onOpenMobileModal: () => void;
}

export default function FurniturePanel({
  activeLeftCat,
  setActiveLeftCat,
  onAddFurniture,
  onOpenMobileModal,
}: FurniturePanelProps) {
  return (
    <div className="md:w-56 flex-shrink-0 bg-white dark:bg-[#252220] border-b md:border-b-0 md:border-r border-[#E0D9CE] dark:border-[#3A3530] flex flex-row md:flex-col overflow-hidden z-20">
      <div className="p-3 border-r md:border-r-0 md:border-b border-[#E0D9CE] dark:border-[#3A3530] flex items-center justify-center">
        <button
          onClick={onOpenMobileModal}
          className="w-full h-full md:py-2 px-4 md:px-0 bg-[#252525] dark:bg-[#F7F5F0] text-white dark:text-[#252525] text-xs font-semibold rounded-lg hover:bg-[#B08D57] transition-colors"
        >
          + <span className="hidden md:inline">Add Furniture</span>
        </button>
      </div>
      <div className="flex-1 flex overflow-x-auto md:overflow-x-hidden md:overflow-y-auto md:py-2">
        {furnitureCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveLeftCat(cat)}
            className={`flex-shrink-0 md:w-full flex items-center gap-2 px-4 md:px-3 py-3 md:py-2 text-xs font-medium md:rounded-lg md:mx-1 transition-colors ${
              activeLeftCat === cat
                ? "bg-[#E8E1D5] dark:bg-[#2E2B27] text-[#B08D57]"
                : "text-[#777777] hover:text-[#252525] dark:hover:text-[#F7F5F0] hover:bg-[#F7F5F0] dark:hover:bg-[#2E2B27]"
            }`}
          >
            <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-current opacity-60" />
            {cat}
          </button>
        ))}
      </div>

      <div className="hidden md:grid border-t border-[#E0D9CE] dark:border-[#3A3530] p-2 grid-cols-2 gap-2 max-h-48 overflow-y-auto">
        {furnitureItems
          .filter((f) => activeLeftCat === "Furniture" || f.category === activeLeftCat)
          .map((item) => (
            <button
              key={item.name}
              onClick={() => onAddFurniture(item)}
              className="flex flex-col items-center gap-1 p-2 rounded-lg bg-[#F7F5F0] dark:bg-[#2E2B27] hover:bg-[#E8E1D5] dark:hover:bg-[#3A3530] transition-colors text-center"
            >
              {productImages[item.name] ? (
                <img
                  src={productImages[item.name]}
                  alt={item.name}
                  className="w-12 h-10 object-cover rounded-md"
                />
              ) : (
                <span className="text-xl">{item.emoji}</span>
              )}
              <span className="text-[10px] text-[#777777] leading-tight">{item.name}</span>
            </button>
          ))}
      </div>
    </div>
  );
}
