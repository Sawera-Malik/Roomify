import { useNavigate } from 'react-router-dom';
import type { Design } from '../../../types';

interface DesignTopBarProps {
  designName: string;
  setDesignName: (name: string) => void;
  isSaving: boolean;
  onSave: () => void;
  getCurrentDesignObject: () => Design;
}

export default function DesignTopBar({
  designName,
  setDesignName,
  isSaving,
  onSave,
  getCurrentDesignObject,
}: DesignTopBarProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-white dark:bg-[#252220] border-b border-[#E0D9CE] dark:border-[#3A3530] flex-shrink-0 z-20">
      <div className="flex items-center gap-3">
        <input
          value={designName}
          onChange={(e) => setDesignName(e.target.value)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E0D9CE] dark:border-[#3A3530] bg-transparent text-sm font-medium text-[#252525] dark:text-[#F7F5F0] outline-none focus:border-[#B08D57] max-w-[150px] sm:max-w-[200px]"
          placeholder="Design Name"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onSave}
          disabled={isSaving}
          className="px-3 py-1.5 text-sm font-medium text-[#252525] dark:text-[#F7F5F0] border border-[#E0D9CE] dark:border-[#3A3530] rounded-lg hover:border-[#B08D57] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
        <button
          onClick={() => {
            const currentDesign = getCurrentDesignObject();
            navigate('/preview', {
              state: {
                design: currentDesign,
                previewVersion: JSON.stringify(currentDesign),
              },
            });
          }}
          className="px-3 py-1.5 text-sm font-medium bg-[#252525] dark:bg-[#F7F5F0] text-white dark:text-[#252525] rounded-lg hover:bg-[#B08D57] transition-colors"
        >
          Preview
        </button>
      </div>
    </div>
  );
}
