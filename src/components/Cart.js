import React from 'react';
import { X } from 'lucide-react';

const Cart = ({ cart, removeFromCart, setShowCart }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="w-full max-w-md metal-gradient h-full p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-metal-gold metal-text-shadow">Your Cart</h2>
          <button onClick={() => setShowCart(false)} className="text-metal-silver hover:text-metal-gold">
            <X size={24} />
          </button>
        </div>
        {cart.length === 0 ? (
          <p className="text-metal-silver">Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-metal-gray">
                <div>
                  <h3 className="text-metal-silver">{item.name}</h3>
                  <p className="text-metal-gray">{item.color} - {item.design}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-metal-silver mr-4">${item.price.toFixed(2)}</p>
                  <button onClick={() => removeFromCart(index)} className="text-metal-red hover:text-metal-gold">
                    <X size={20} />
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-6">
              <p className="text-xl font-bold text-metal-gold metal-text-shadow">
                Total: ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
              </p>
              <button className="w-full metal-button py-3 px-6 rounded-md text-xl font-bold mt-4">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;