import type { Design } from '../types';

function loadImage(source: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load preview asset: ${source}`));
    image.src = source;
  });
}

const floorBgColors: Record<string, string> = {
  "Light Wood": "#D4B896",
  "Dark Wood": "#5C3D2E",
  "Marble": "#E8E4DC",
  "Concrete": "#B8B4AE",
  "Tiles": "#D8D4CC",
};

export async function generateRoomPreview(design: Design): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 800;
  const context = canvas.getContext('2d');

  if (!context) throw new Error('Preview canvas is not available in this browser.');

  const wallColor = design.wall ?? design.wallColor ?? '#F7F5F0';
  context.fillStyle = wallColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const floorColor = floorBgColors[design.floor ?? "Light Wood"] || "#D4B896";
  context.fillStyle = floorColor;
  context.fillRect(0, canvas.height * 0.6, canvas.width, canvas.height * 0.4);

  context.strokeStyle = 'rgba(0, 0, 0, 0.1)';
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(0, canvas.height * 0.6);
  context.lineTo(canvas.width, canvas.height * 0.6);
  context.stroke();

  context.fillStyle = 'rgba(200, 224, 240, 0.6)';
  context.fillRect(canvas.width - 200, 80, 150, 220);
  context.strokeStyle = 'rgba(255, 255, 255, 0.8)';
  context.lineWidth = 10;
  context.strokeRect(canvas.width - 200, 80, 150, 220);
  
  context.fillStyle = `rgba(20, 16, 12, ${Math.max(0.04, (100 - (design.brightness ?? 70)) / 400)})`;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const furnitureScale = 1200 / 520; 
  for (const item of design.furniture ?? []) {
    const scale = item.scale ?? 1;
    const width = 110 * furnitureScale * scale;
    const height = 78 * furnitureScale * scale;
    
    context.save();
    context.translate(item.x * furnitureScale, item.y * furnitureScale);
    context.rotate((item.rotation * Math.PI) / 180);

    if (item.imageUrl) {
      try {
        const furnitureImage = await loadImage(item.imageUrl);
        context.shadowColor = 'rgba(0, 0, 0, 0.35)';
        context.shadowBlur = 14;
        context.drawImage(furnitureImage, -width / 2, -height / 2, width, height);
      } catch {
        context.font = `${42 * furnitureScale * scale}px sans-serif`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(item.emoji || '□', 0, 0);
      }
    } else {
      context.font = `${42 * furnitureScale * scale}px sans-serif`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(item.emoji || '□', 0, 0);
    }
    context.restore();
  }

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('The realistic room preview could not be generated.'));
    }, 'image/jpeg', 0.9);
  });
}
