import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function ConfirmModal({ isOpen, title, onConfirm, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/65 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full border border-gray-100">
        <div className="flex items-center gap-3 text-red-600 mb-3">
          <AlertTriangle size={24} />
          <h3 className="text-xl font-bold text-gray-900">Подтвердите удаление</h3>
        </div>
        
        <p className="text-gray-600 leading-relaxed">
          Вы действительно хотите удалить блюдо <span className="font-semibold text-gray-900">«{title}»</span> из меню?
        </p>
        
        <div className="flex justify-end gap-3 mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition"
          >
            Отмена
          </button>
          <button 
            onClick={onConfirm}
            className="px-4 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 shadow-md transition"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}