import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemove, onClear }) {
  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col justify-between">
          {/* Заголовок */}
          <div className="p-6 bg-[#2C1810] text-amber-50 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <ShoppingBag size={22} className="text-amber-400" />
              <h2 className="text-xl font-serif font-bold">Ваш заказ</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-amber-900/60 rounded-full transition text-amber-300">
              <X size={20} />
            </button>
          </div>

          {/* Список товаров */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <ShoppingBag size={48} className="mx-auto mb-3 opacity-30 text-amber-900" />
                <p className="font-medium text-lg">Корзина пуста</p>
                <p className="text-xs text-gray-400 mt-1">Выберите аппетитные блюда из нашего меню</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-2xl border border-amber-100/80 shadow-xs flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm truncate">{item.name}</h4>
                    <p className="text-xs font-semibold text-[#78350F] mt-0.5">{item.price} ₸</p>
                    
                    <div className="flex items-center gap-3 mt-2">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-700 hover:bg-amber-200 text-xs"
                      >
                        -
                      </button>
                      <span className="text-xs font-extrabold text-gray-800">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-700 hover:bg-amber-200 text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button 
                    onClick={() => onRemove(item.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Подвал с итогом */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-white border-t border-amber-100 space-y-4">
              <div className="flex justify-between items-center text-lg font-serif font-bold text-gray-900">
                <span>Итого к оплате:</span>
                <span className="text-2xl text-[#78350F]">{totalAmount} ₸</span>
              </div>

              <button 
                onClick={() => {
                  alert('Спасибо за заказ! Наш администратор свяжется с вами для подтверждения.');
                  onClear();
                  onClose();
                }}
                className="w-full bg-[#78350F] text-amber-50 py-3.5 rounded-2xl font-semibold hover:bg-[#5c280b] shadow-lg transition text-center"
              >
                Оформить заказ
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}