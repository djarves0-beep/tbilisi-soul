import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import MenuPage from './pages/MenuPage';
import AdminPage from './pages/AdminPage';
import ContactsPage from './pages/ContactsPage';
import ProtectedRoute from './components/ProtectedRoute';
import CartDrawer from './components/CartDrawer';

const INITIAL_DISHES = [
  {
    id: "1",
    name: "Хинкали с мясом (Traditional)",
    category: "Хинкали",
    price: 850,
    description: "Сочные мегрельские хинкали с говядиной, свининой и свежей зеленью.",
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "2",
    name: "Хачапури по-аджарски",
    category: "Выпечка",
    price: 3200,
    description: "Традиционная лодочка из пышного теста с сыром сулугуни, желтком и сливочным маслом.",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "3",
    name: "Ожахури со свининой",
    category: "Горячее",
    price: 4100,
    description: "Ароматный обжаренный картофель с мясом свинины, луком и грузинскими специями на кеци.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  }
];

export default function App() {
  const [dishes, setDishes] = useState(INITIAL_DISHES);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Логика корзины
  const handleAddToCart = (dish) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === dish.id);
      if (existing) {
        return prev.map(item => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(id);
    } else {
      setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
    }
  };

  const handleRemoveCartItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // CRUD операций с меню
  const handleAddDish = (newDish) => setDishes(prev => [...prev, newDish]);
  const handleUpdateDish = (updated) => setDishes(prev => prev.map(d => d.id === updated.id ? updated : d));
  const handleDeleteDish = (id) => setDishes(prev => prev.filter(d => d.id !== id));

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#FAF7F2] text-gray-800 font-sans">
          <Navbar cartCount={totalCartCount} onOpenCart={() => setIsCartOpen(true)} />
          
          <Routes>
            <Route path="/" element={<MenuPage dishes={dishes} onAddToCart={handleAddToCart} />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminPage 
                    dishes={dishes} 
                    onAddDish={handleAddDish} 
                    onUpdateDish={handleUpdateDish} 
                    onDeleteDish={handleDeleteDish} 
                  />
                </ProtectedRoute>
              } 
            />
          </Routes>

          <CartDrawer 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)} 
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemoveCartItem}
            onClear={() => setCartItems([])}
          />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}