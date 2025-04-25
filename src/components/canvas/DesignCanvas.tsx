'use client'

import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

export default function DesignCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current && !fabricRef.current) {
      fabricRef.current = new fabric.Canvas(canvasRef.current, {
        width: 500,
        height: 600,
        backgroundColor: '#ffffff'
      });
    }

    return () => {
      fabricRef.current?.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[600px]">
      <canvas ref={canvasRef} className="border border-gray-300" />
    </div>
  );
} 