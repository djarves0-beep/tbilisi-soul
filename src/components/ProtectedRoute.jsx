import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { role } = useAuth();

  if (role !== 'admin') {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 bg-white border border-red-200 rounded-2xl shadow-sm text-center">
        <div className="text-red-500 text-5xl mb-4">⛔</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Доступ ограничен</h2>
        <p className="text-gray-600">
          Страница администратора доступна только для пользователей с ролью <span className="font-semibold text-gray-800">«admin»</span>.
        </p>
        <p className="text-sm text-gray-500 mt-4">
          Переключите роль в верхней панели (Navbar), чтобы войти.
        </p>
      </div>
    );
  }

  return children;
}