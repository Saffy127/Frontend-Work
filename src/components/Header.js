import React from 'react';
import logo from '../assets/images/logo.png';
import { ShoppingCart } from 'lucide-react';

const Header = ({ cartItemCount, setShowCart }) => {
  return (
    <header className="relative z-20 py-4 bg-metal-black bg-opacity-80">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <img src={logo} alt="Heavy Metal Logo" className="h-20 slow-flicker" />
        <h1 className="text-3xl font-bold text-metal-gold metal-text-shadow tracking-wider">Metal Merch Mayhem</h1>
        <button 
          className="metal-button px-4 py-2 rounded-full relative"
          onClick={() => setShowCart(true)}
        >
          <ShoppingCart size={24} className="inline-block mr-2" />
          <span className="text-lg">{cartItemCount}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;