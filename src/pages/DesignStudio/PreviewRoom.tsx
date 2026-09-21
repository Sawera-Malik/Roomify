import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Design } from '../../types';
import { generateRoomPreview } from '../../services/imageGenerationService';
import { getAuthenticatedUser, saveCompleteDesign } from '../../services/designService';

const defaultFurniture: NonNullable<Design['furniture']> = [];

const defaultDesign: Design = {
  id: 'preview',
  name: 'My Room',
  room: 'Living Room',
  roomType: 'Living Room',
  style: 'Standard',
  edited: 'Just now',
  img: '',
  wallColor: '#F7F5F0',
  floor: 'Light Wood',
  brightness: 70,
  warmth: 50,
  ambient: true,
  furniture: defaultFurniture,
};

function PreviewRoom() {
  const navigate = useNavigate();
  const location = useLocation();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const generationIdRef = useRef(0);
  const previewUrlRef = useRef<string | null>(null);
  
  const routeState = location.state as { design?: Design; sourceImage?: string } | null;
  const currentDesign = routeState?.design ?? defaultDesign;

  const generateCurrentPreview = async () => {
    const generationId = ++generationIdRef.current;
    
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    previewUrlRef.current = null;
    setPreviewUrl(null);
    setIsGenerating(true);
    setMessage(null);

    let objectUrl: string | null = null;
    try {
      const blob = await generateRoomPreview(currentDesign);
      if (generationId !== generationIdRef.current) return;
      objectUrl = URL.createObjectURL(blob);
      previewUrlRef.current = objectUrl;
      setPreviewUrl(objectUrl);
    } catch (error: unknown) {
      if (generationId === generationIdRef.current) {
        setMessage(error instanceof Error ? error.message : 'Could not generate the room preview.');
      }
    } finally {
      if (generationId === generationIdRef.current) {
        setIsGenerating(false);
      }
    }

    return objectUrl;
  };

  useEffect(() => {
    if (routeState?.sourceImage) {
      generationIdRef.current += 1;
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = routeState.sourceImage;
      setPreviewUrl(routeState.sourceImage);
      setIsGenerating(false);
      setMessage(null);
      return () => {
        generationIdRef.current += 1;
        previewUrlRef.current = null;
      };
    }

    void generateCurrentPreview();
    return () => {
      generationIdRef.current += 1;
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }
    };
  }, [currentDesign]);

  const handleSave = async () => {
    if (isSaving) return;
    if (!getAuthenticatedUser()) {
      setMessage('Please sign in before saving your design.');
      return;
    }

    setIsSaving(true);
    setMessage(null);
    try {
      const saved = await saveCompleteDesign(currentDesign);
      setMessage(`Design saved successfully. Stored for ${saved.userEmail ?? 'your account'}.`);
    } catch (error: unknown) {
      setMessage(error instanceof Error ? error.message : 'Could not save the design.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 bg-[#1A1814] flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 bg-[#1F1C18]/90 backdrop-blur-sm border-b border-white/10 flex-shrink-0">
        <button onClick={() => navigate('/studio', { state: { design: currentDesign } })} className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors">
          <span aria-hidden="true">←</span> Back to Editor
        </button>
        <button onClick={handleSave} disabled={isSaving || isGenerating} className="px-4 py-2 rounded-lg bg-[#B08D57] text-white text-sm font-semibold hover:bg-[#9b7b4c] disabled:opacity-50 disabled:cursor-not-allowed">
          {isSaving ? 'Saving your design...' : 'Save Design'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] items-start">
          <section className="rounded-2xl overflow-hidden bg-[#252220] shadow-2xl min-h-[420px] flex items-center justify-center">
            {isGenerating && <p className="text-white/70 text-sm">Generating preview...</p>}
            {!isGenerating && previewUrl && <img src={previewUrl} alt={`${currentDesign.room} preview`} className="w-full h-auto object-cover" />}
            {!isGenerating && !previewUrl && <p className="text-red-300 text-sm px-6 text-center">{message ?? 'Preview unavailable.'}</p>}
          </section>

          <aside className="bg-[#252220] rounded-2xl p-6 text-white">
            <p className="text-xs uppercase tracking-widest text-[#B08D57] mb-2">Design Summary</p>
            <h1 className="font-display text-2xl mb-1">{currentDesign.name}</h1>
            <p className="text-white/60 text-sm mb-6">{currentDesign.room}</p>
            <div className="space-y-3 text-sm border-t border-white/10 pt-4">
              <div className="flex items-center justify-between text-white/60">
                <span>Wall Color:</span>
                <span className="text-white flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border border-white/30" style={{ background: currentDesign.wallColor ?? currentDesign.wall ?? '#F7F5F0' }} />
                  {currentDesign.wallColor ?? currentDesign.wall ?? '#F7F5F0'}
                </span>
              </div>
              <div className="flex items-center justify-between text-white/60">
                <span>Floor:</span>
                <span className="text-white">{currentDesign.floor ?? 'Default'}</span>
              </div>
              <div className="flex items-center justify-between text-white/60">
                <span>Lighting:</span>
                <span className="text-white">{currentDesign.brightness ?? 70}% Bright</span>
              </div>
              <div className="pt-2">
                <p className="text-white/60 mb-2">Furniture ({currentDesign.furniture?.length ?? 0} items)</p>
                <ul className="space-y-2 text-white/90">
                  {(currentDesign.furniture ?? []).map((item) => (
                    <li key={item.id} className="flex items-center gap-2 bg-white/5 px-2 py-1.5 rounded-lg">
                      <span className="text-lg">{item.emoji}</span>
                      <span className="flex-1 text-sm">{item.name}</span>
                      <span className="text-xs text-white/40">x{item.scale?.toFixed(1) ?? '1.0'}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {message && <p className="mt-6 text-xs text-[#E8C4B8] break-words">{message}</p>}
          </aside>
        </div>
      </div>
    </div>
  );
}

export default PreviewRoom;
