import React from 'react';

const Customizer = ({ selectedColor, setSelectedColor, selectedDesign, tshirtColors, addToCart }) => {
  return (
    <div className="w-full metal-border p-6 rounded-lg bg-metal-black bg-opacity-80">
      <h2 className="text-2xl text-metal-gold mb-4 font-bold metal-text-shadow">Customize Your Metal</h2>
      <div className="mb-6">
        <label className="block text-lg font-medium text-metal-silver mb-2">T-Shirt Color</label>
        <div className="flex justify-center gap-4">
          {tshirtColors.map((color) => (
            <button
              key={color.value}
              className={`w-16 h-16 rounded-full transition-all duration-300 ${selectedColor === color.value ? 'metal-border scale-110' : 'border-2 border-metal-gray hover:border-metal-silver'}`}
              style={{ backgroundColor: color.value }}
              onClick={() => setSelectedColor(color.value)}
            />
          ))}
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-xl text-metal-gold mb-2 font-bold metal-text-shadow">Selected Design</h3>
        {selectedDesign ? (
          <div className="w-64 h-64 metal-border rounded-lg overflow-hidden mx-auto">
            <div className="w-full h-full relative">
              <div className="absolute inset-0" style={{backgroundColor: selectedColor}}></div>
              <img src={selectedDesign} alt="Selected design" className="absolute inset-0 w-full h-full object-contain p-4" style={{mixBlendMode: 'multiply'}} />
            </div>
          </div>
        ) : (
          <p className="text-metal-silver">No design selected</p>
        )}
      </div>
      <button 
        onClick={addToCart}
        className="w-full metal-button py-3 px-6 rounded-md text-xl font-bold"
      >
        Add to Your Collection
      </button>
    </div>
  );
};

export default Customizer;