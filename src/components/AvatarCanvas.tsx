import { useEffect, useRef } from 'react';
import type { User } from '../types';

// Sweetie-16 palette colors
const SWEETIE_16_PALETTE = [
  '#1a1c2c', '#5d275d', '#b13e53', '#ef7d57', '#ffcd75', '#a7f070', '#38b764', '#257179',
  '#29366f', '#3b5dc9', '#41a6f6', '#73eff7', '#f4f4f4', '#94b0c2', '#566c86', '#333c57'
];

// Function to draw avatar on canvas
const drawAvatar = (canvas: HTMLCanvasElement, avatar: string) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const size = 16;
  const pixelSize = canvas.width / size;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const index = y * size + x;
      const hexChar = avatar[index];
      const colorIndex = parseInt(hexChar, 16);
      const color = SWEETIE_16_PALETTE[colorIndex];

      ctx.fillStyle = color;
      ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    }
  }
};

interface AvatarCanvasProps {
  user: User;
}

const AvatarCanvas = ({ user }: AvatarCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && user.avatar) {
      drawAvatar(canvasRef.current, user.avatar);
    }
  }, [user.avatar]);

  return (
    <canvas
      ref={canvasRef}
      width="128"
      height="128"
      title={`${user.name} avatar`}
      style={{ imageRendering: 'pixelated' }}
    />
  );
};

export default AvatarCanvas;
