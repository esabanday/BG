import { create } from 'zustand';
import { fabric } from 'fabric';

interface DesignState {
  canvas: fabric.Canvas | null;
  setCanvas: (canvas: fabric.Canvas) => void;
  selectedObject: fabric.Object | null;
  setSelectedObject: (object: fabric.Object | null) => void;
}

export const useDesignStore = create<DesignState>((set) => ({
  canvas: null,
  setCanvas: (canvas) => set({ canvas }),
  selectedObject: null,
  setSelectedObject: (object) => set({ selectedObject: object }),
})); 