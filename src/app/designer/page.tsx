import React from 'react';
import dynamic from 'next/dynamic';

const DesignCanvas = dynamic(() => import('@/components/canvas/DesignCanvas'), {
  ssr: false
});

export default function DesignerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#00F7FF] to-[#BC00FF] text-transparent bg-clip-text">
        Design Your Apparel
      </h1>
      <div className="bg-white/5 backdrop-blur-lg rounded-lg p-8">
        <DesignCanvas />
      </div>
    </div>
  );
} 