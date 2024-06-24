import React, { useState } from 'react';
import Header from './components/Header';
import DesignGallery from './components/DesignGallery';
import Customizer from './components/Customizer';
import Cart from './components/Cart';
import MusicPlayer from './components/MusicPlayer';
import './styles/HeavyMetal.css';

// Import design images
import design1 from './assets/images/designs/design1.png';
import design2 from './assets/images/designs/design2.png';
import design3 from './assets/images/designs/design3.png';

// Import audio tracks
import metalRiff1 from './assets/audio/metal-riff-1.mp3';
import metalRiff2 from './assets/audio/metal-riff-2.mp3';
import metalRiff3 from './assets/audio/metal-riff-3.mp3';

const tshirtColors = [
  { name: 'Black', value: '#0a0a0a' },
  { name: 'Dark Purple', value: '#4B0082' },
  { name: 'Metallic Silver', value: '#C0C0C0' },
];

const designImages = [
  { name: 'Skull Design', url: design1 },
  { name: 'Flame Design', url: design2 },
  { name: 'Music Design', url: design3 },
];

const audioTracks = [
  { name: 'Metal Riff 1', url: metalRiff1 },
  { name: 'Metal Riff 2', url: metalRiff2 },
  { name: 'Metal Riff 3', url: metalRiff3 },
];

function App() {
  const [selectedColor, setSelectedColor] = useState(tshirtColors[0].value);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = () => {
    if (!selectedDesign) {
      alert("Please select a design before adding to cart!");
      return;
    }
    const newItem = {
      name: 'Custom Metal T-Shirt',
      price: 29.99,
      color: tshirtColors.find(c => c.value === selectedColor).name,
      design: designImages.find(d => d.url === selectedDesign)?.name
    };
    setCart([...cart, newItem]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  return (
    <div className="min-h-screen bg-metal-black text-metal-silver">
      <div className="bg-flame"></div>
      <div className="bg-tribal"></div>
      
      <Header cartItemCount={cart.length} setShowCart={setShowCart} />

      <main className="relative z-20 container mx-auto px-4 py-8 text-center">
        <DesignGallery 
          designs={designImages}
          selectedDesign={selectedDesign}
          setSelectedDesign={setSelectedDesign}
        />
        <Customizer 
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedDesign={selectedDesign}
          tshirtColors={tshirtColors}
          addToCart={addToCart}
        />
      </main>

      {showCart && (
        <Cart 
          cart={cart} 
          removeFromCart={removeFromCart} 
          setShowCart={setShowCart} 
        />
      )}

      <MusicPlayer tracks={audioTracks} />
    </div>
  );
}

export default App;