import { useState, useCallback } from 'react';
import type { Design, FurnitureItem } from '../types';

export function useDesign(initialDesign?: Design) {
  const [designId, setDesignId] = useState<string | null>(initialDesign?.id ?? null);
  const [designName, setDesignName] = useState(initialDesign?.name ?? 'My Room');
  const [selectedRoom, setSelectedRoom] = useState(initialDesign?.room ?? 'Living Room');
  const [wallColor, setWallColor] = useState(initialDesign?.wallColor ?? '#F7F5F0');
  const [floor, setFloor] = useState(initialDesign?.floor ?? 'Light Wood');
  const [brightness, setBrightness] = useState(initialDesign?.brightness ?? 70);
  const [warmth, setWarmth] = useState(initialDesign?.warmth ?? 50);
  const [ambient, setAmbient] = useState(initialDesign?.ambient ?? true);
  
  const [furniture, setFurniture] = useState<FurnitureItem[]>(() => {
    const f = (initialDesign?.furniture as FurnitureItem[] | undefined) ?? [];
    return f.map(item => ({
      ...item,
      scale: item.scale ?? 1,
    }));
  });

  const [selectedFurniture, setSelectedFurniture] = useState<string | null>(null);

  const addFurniture = useCallback((item: { name: string; emoji: string }) => {
    const newItem: FurnitureItem = {
      id: `${item.name}-${Date.now()}`,
      name: item.name,
      emoji: item.emoji,
      x: 100 + Math.random() * 200,
      y: 100 + Math.random() * 150,
      rotation: 0,
      scale: 1,
    };
    setFurniture(f => [...f, newItem]);
    setSelectedFurniture(newItem.id);
  }, []);

  const deleteFurniture = useCallback((id: string) => {
    setFurniture(f => f.filter(item => item.id !== id));
    setSelectedFurniture(null);
  }, []);

  const rotateFurniture = useCallback((id: string) => {
    setFurniture(f => f.map(item => item.id === id ? { ...item, rotation: item.rotation + 45 } : item));
  }, []);

  const scaleFurniture = useCallback((id: string, factor: number) => {
    setFurniture(f => f.map(item => item.id === id ? { ...item, scale: Math.max(0.5, Math.min(3, (item.scale || 1) + factor)) } : item));
  }, []);

  const moveFurniture = useCallback((id: string, x: number, y: number) => {
    setFurniture(f => f.map(item => item.id === id ? { ...item, x, y } : item));
  }, []);

  const getCurrentDesignObject = useCallback((): Design => ({
    id: designId ?? 'preview',
    name: designName,
    room: selectedRoom,
    roomType: selectedRoom,
    style: 'Standard',
    edited: 'Just now',
    img: '',
    wallColor,
    wall: wallColor,
    floor,
    brightness,
    warmth,
    ambient,
    furniture: furniture.map(item => ({ ...item })),
  }), [ambient, brightness, designId, designName, floor, furniture, selectedRoom, wallColor, warmth]);

  return {
    designId,
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
    setFurniture,
    selectedFurniture,
    setSelectedFurniture,
    addFurniture,
    deleteFurniture,
    rotateFurniture,
    scaleFurniture,
    moveFurniture,
    getCurrentDesignObject,
  };
}
