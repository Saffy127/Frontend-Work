import React from 'react';
import { Zap } from 'lucide-react';

const DesignGallery = ({ designs, selectedDesign, setSelectedDesign }) => {
  return (
    <div className="w-full metal-border p-6 rounded-lg bg-metal-black bg-opacity-80 mb-8">
      <h2 className="text-2xl text-metal-gold mb-4 font-bold metal-text-shadow flex items-center justify-center">
        <Zap size={24} className="mr-2" />
        Choose Your Design
      </h2>
      <div className="flex justify-center items-center gap-4">
        {designs.map((design) => (
          <div key={design.name} className="relative group">
            <div 
              className={`w-64 h-64 metal-border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${selectedDesign === design.url ? 'ring-4 ring-metal-gold' : ''}`}
              onClick={() => setSelectedDesign(design.url)}
            >
              <img src={design.url} alt={design.name} className="w-full h-full object-contain p-4" />
            </div>
            <p className="text-center mt-2 text-metal-silver group-hover:text-metal-gold transition-colors">{design.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignGallery;