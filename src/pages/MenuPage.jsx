import React, { useState, useEffect } from 'react';

// ⚠️ ЗАМЕНИ ЭТУ ССЫЛКУ НА СВОЮ ИЗ MOCKAPI.IO
const API_URL = "https://6ad23bb566cd28aed82dd07e.mockapi.io/dishes";

const CATEGORIES = [
  "Все", 
  "Хинкали", 
  "Выпечка", 
  "Горячее", 
  "Закуски", 
  "Супы", 
  "Десерты", 
  "Бар", 
  "Напитки"
];
export default function MenuPage({ onAddToCart }) {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Все");

  // Загрузка блюд с API при открытии страницы
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setDishes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Ошибка загрузки API:", err);
        setLoading(false);
      });
  }, []);

  const filteredDishes = activeCategory === "Все" 
    ? dishes 
    : dishes.filter(d => d.category === activeCategory);

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-16">
      {/* Баннер */}
      <div className="relative bg-[#2C1810] text-amber-50 py-20 px-6 text-center overflow-hidden shadow-md">
        <div className="relative max-w-3xl mx-auto">
          <span className="text-amber-400 uppercase tracking-widest text-sm font-semibold mb-3 block">
            Ресторан авторской грузинской кухни
          </span>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-amber-100 leading-tight">
            Tbilisi Soul
          </h1>
          <p className="text-amber-200/80 text-lg max-w-xl mx-auto leading-relaxed">
            Погрузитесь в атмосферу тепла и уюта. Данные меню подгружаются напрямую с REST API.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-10">
        {/* Кнопки категорий */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition shadow-xs ${
                activeCategory === cat
                  ? "bg-[#78350F] text-amber-50 shadow-md"
                  : "bg-white text-gray-700 border border-amber-200/60 hover:bg-amber-100/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Индикатор загрузки с API */}
        {loading ? (
          <div className="text-center py-20 text-gray-500 font-medium">
            Загрузка меню с API...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDishes.map((dish) => (
              <div 
                key={dish.id} 
                className="bg-white rounded-3xl overflow-hidden shadow-xs border border-amber-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={dish.image} 
                      alt={dish.name} 
                      className="w-full h-full object-cover hover:scale-105 transition duration-500" 
                    />
                    <span className="absolute top-4 left-4 bg-[#78350F]/90 backdrop-blur-md text-amber-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {dish.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">{dish.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{dish.description}</p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex justify-between items-center">
                  <span className="text-2xl font-serif font-extrabold text-[#78350F]">{dish.price} ₸</span>
                  <button 
                    onClick={() => onAddToCart(dish)}
                    className="bg-[#78350F] text-amber-50 px-5 py-2.5 rounded-2xl text-sm font-semibold hover:bg-[#5c280b] shadow-md transition"
                  >
                    В корзину
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}