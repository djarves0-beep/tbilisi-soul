import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, User, UtensilsCrossed, ShoppingBag, LogOut, Lock } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart }) {
  const { role, loginAsAdmin, logoutAdmin } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginAsAdmin(passwordInput)) {
      setIsAuthModalOpen(false);
      setPasswordInput('');
      setErrorMsg('');
    } else {
      setErrorMsg('Неверный пароль (попробуйте: admin123)');
    }
  };

  return (
    <>
      <nav className="bg-[#1F1109] text-amber-50 px-6 py-4 shadow-xl sticky top-0 z-40 border-b border-amber-900/30">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-serif font-bold flex items-center gap-3 text-amber-400 tracking-wide">
            <UtensilsCrossed size={26} />
            <span>Tbilisi Soul</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link 
              to="/" 
              className={`hover:text-amber-300 font-medium transition text-sm uppercase tracking-wider ${location.pathname === '/' ? 'text-amber-400 border-b-2 border-amber-400 pb-1' : ''}`}
            >
              Меню
            </Link>

            <Link 
              to="/contacts" 
              className={`hover:text-amber-300 font-medium transition text-sm uppercase tracking-wider ${location.pathname === '/contacts' ? 'text-amber-400 border-b-2 border-amber-400 pb-1' : ''}`}
            >
              Контакты
            </Link>
            
            {role === 'admin' ? (
              <Link 
                to="/admin" 
                className={`text-amber-400 hover:text-amber-200 font-semibold transition text-sm uppercase tracking-wider ${location.pathname === '/admin' ? 'border-b-2 border-amber-400 pb-1' : ''}`}
              >
                Админка
              </Link>
            ) : null}

            {/* Кнопка корзины */}
            <button 
              onClick={onOpenCart}
              className="relative bg-amber-900/50 p-2.5 rounded-full hover:bg-amber-800 transition text-amber-300"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-amber-950 font-extrabold text-xs w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Кнопка авторизации админа */}
            {role === 'admin' ? (
              <button 
                onClick={logoutAdmin}
                className="flex items-center gap-2 bg-red-950/80 border border-red-800/60 px-3.5 py-1.5 rounded-full text-red-300 hover:bg-red-900 transition text-xs font-semibold"
              >
                <LogOut size={14} /> Выйти (Admin)
              </button>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 bg-[#2C1810] border border-amber-800/80 px-3.5 py-1.5 rounded-full hover:bg-[#3D2319] transition text-xs font-semibold text-amber-200"
              >
                <Lock size={14} className="text-amber-400" /> Вход для персонала
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Модальное окно Входа в Админку */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-3xl p-7 max-w-sm w-full text-gray-800 shadow-2xl border border-amber-100">
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Shield size={22} className="text-amber-800" /> Вход в Админ-панель
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Введите пароль администратора (по умолчанию: <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-900 font-bold">admin123</code>)
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input 
                type="password" 
                placeholder="Пароль" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-800"
                required
              />
              {errorMsg && <p className="text-red-500 text-xs font-medium">{errorMsg}</p>}

              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => { setIsAuthModalOpen(false); setErrorMsg(''); }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200"
                >
                  Отмена
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-[#78350F] text-amber-50 rounded-xl text-sm font-semibold hover:bg-[#5c280b]"
                >
                  Войти
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}