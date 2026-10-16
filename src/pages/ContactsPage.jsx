import React from 'react';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';

export default function ContactsPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-amber-100">
        <h1 className="text-4xl font-serif font-bold text-[#2C1810] mb-3 text-center">
          Контакты и Резерв
        </h1>
        <p className="text-center text-gray-600 mb-10 max-w-lg mx-auto text-sm">
          Ждем вас в гости за самым душевным грузинским застольем!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-100 text-[#78350F] rounded-2xl">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Адрес</h3>
                <p className="text-gray-600 text-sm mt-1">г. Алматы, пр. Достык, 105</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-100 text-[#78350F] rounded-2xl">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Бронь столов</h3>
                <p className="text-gray-600 text-sm mt-1">+7 (777) 123-45-67</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-100 text-[#78350F] rounded-2xl">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Часы работы</h3>
                <p className="text-gray-600 text-sm mt-1">Ежедневно: 11:00 – 00:00</p>
              </div>
            </div>
          </div>

          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-amber-200/60 flex flex-col justify-between">
            <div>
              <h3 className="font-serif font-bold text-xl text-gray-900 mb-2">Забронировать столик</h3>
              <p className="text-xs text-gray-500 mb-4">Оставьте контакты и мы перезвоним в течение 10 минут</p>
              
              <input type="text" placeholder="Ваше имя" className="w-full bg-white border border-gray-200 p-3 rounded-xl mb-3 text-sm" />
              <input type="tel" placeholder="+7 (700) 000-00-00" className="w-full bg-white border border-gray-200 p-3 rounded-xl mb-4 text-sm" />
            </div>

            <button 
              onClick={() => alert('Спасибо! Заявка на бронь принята, ожидайте звонка.')}
              className="w-full bg-[#78350F] text-amber-50 py-3 rounded-xl font-semibold hover:bg-[#5c280b] transition text-sm shadow-md"
            >
              Отправить заявку
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}