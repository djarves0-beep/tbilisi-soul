import React, { useState, useEffect } from 'react';
import ConfirmModal from '../components/ConfirmModal';
import { Plus, Edit3, Trash2, Save, X } from 'lucide-react';

// ⚠️ ЗАМЕНИ ЭТУ ССЫЛКУ НА СВОЮ ИЗ MOCKAPI.IO
const API_URL = "https://6ad23bb566cd28aed82dd07e.mockapi.io/dishes";

export default function AdminPage() {
  const [dishes, setDishes] = useState([]);
  const [form, setForm] = useState({ name: '', category: 'Хинкали', price: '', description: '', image: '' });
  const [editingId, setEditingId] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetDish, setTargetDish] = useState(null);

  // Получить данные с API
  const fetchDishes = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setDishes(data));
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  // Добавление (POST) или Обновление (PUT)
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price) };

    if (editingId) {
      // PUT запрос на API
      fetch(`${API_URL}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(() => {
        fetchDishes();
        setEditingId(null);
        setForm({ name: '', category: 'Хинкали', price: '', description: '', image: '' });
      });
    } else {
      // POST запрос на API
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(() => {
        fetchDishes();
        setForm({ name: '', category: 'Хинкали', price: '', description: '', image: '' });
      });
    }
  };

  // Подготовка к удалению
  const triggerDeleteModal = (dish) => {
    setTargetDish(dish);
    setIsModalOpen(true);
  };

  // Удаление (DELETE)
  const executeDelete = () => {
    if (targetDish) {
      fetch(`${API_URL}/${targetDish.id}`, {
        method: 'DELETE'
      }).then(() => {
        fetchDishes();
        setIsModalOpen(false);
        setTargetDish(null);
      });
    }
  };

  const handleEdit = (dish) => {
    setForm(dish);
    setEditingId(dish.id);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">
        Панель администратора (API Управление)
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl shadow-sm border border-amber-100 mb-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <h2 className="text-lg font-bold text-gray-800 md:col-span-2 flex items-center gap-2">
          {editingId ? <Edit3 size={20} className="text-amber-800" /> : <Plus size={20} className="text-amber-800" />}
          {editingId ? 'Изменить блюдо в API' : 'Добавить блюдо в API'}
        </h2>

        <input 
          type="text" placeholder="Название блюда" 
          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} 
          className="border p-3 rounded-xl w-full text-sm" required 
        />
        <input 
          type="number" placeholder="Цена (в ₸)" 
          value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} 
          className="border p-3 rounded-xl w-full text-sm" required 
        />
        <select 
          value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border p-3 rounded-xl w-full text-sm bg-white"
        >
          <option value="Хинкали">Хинкали</option>
          <option value="Выпечка">Выпечка</option>
          <option value="Горячее">Горячее</option>
          <option value="Закуски">Закуски</option>
          <option value="Напитки">Напитки</option>
        </select>
        <input 
          type="url" placeholder="URL картинки" 
          value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} 
          className="border p-3 rounded-xl w-full text-sm" required 
        />
        <textarea 
          placeholder="Описание блюда" 
          value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} 
          className="border p-3 rounded-xl w-full md:col-span-2 h-24 text-sm" required 
        />

        <div className="md:col-span-2 flex gap-3 pt-2">
          <button type="submit" className="bg-[#78350F] text-amber-50 px-6 py-2.5 rounded-xl font-semibold hover:bg-[#5c280b] transition flex items-center gap-2 text-sm shadow-md">
            <Save size={18} /> {editingId ? 'Сохранить изменения' : 'Отправить в API'}
          </button>
          {editingId && (
            <button 
              type="button" 
              onClick={() => { setEditingId(null); setForm({ name: '', category: 'Хинкали', price: '', description: '', image: '' }); }}
              className="bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-300 transition flex items-center gap-1 text-sm font-medium"
            >
              <X size={18} /> Отмена
            </button>
          )}
        </div>
      </form>

      {/* Таблица блюд */}
      <div className="bg-white rounded-3xl border border-amber-100 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-amber-50/60 border-b border-amber-100 text-gray-700 text-sm font-semibold">
              <th className="p-4">Блюдо</th>
              <th className="p-4">Категория</th>
              <th className="p-4">Цена</th>
              <th className="p-4 text-right">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-100/60">
            {dishes.map((dish) => (
              <tr key={dish.id} className="hover:bg-amber-50/30 transition">
                <td className="p-4 flex items-center gap-3">
                  <img src={dish.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <span className="font-bold text-gray-900 block">{dish.name}</span>
                    <span className="text-xs text-gray-500 line-clamp-1">{dish.description}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-600 text-sm">{dish.category}</td>
                <td className="p-4 font-extrabold text-[#78350F] text-sm">{dish.price} ₸</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => handleEdit(dish)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                    <Edit3 size={18} />
                  </button>
                  <button onClick={() => triggerDeleteModal(dish)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal 
        isOpen={isModalOpen} 
        title={targetDish?.name} 
        onConfirm={executeDelete} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}