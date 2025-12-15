import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const CustomCalendar = ({ selectedDate, onChange, onClose }) => {
  const initDate = selectedDate ? new Date(selectedDate + 'T12:00:00') : new Date();
  const [viewDate, setViewDate] = useState(initDate);

  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    const year = viewDate.getFullYear();
    const month = String(viewDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    onChange(`${year}-${month}-${dayStr}`);
    if (onClose) onClose();
  };

  const renderDays = () => {
    const totalDays = daysInMonth(viewDate);
    const startDay = firstDayOfMonth(viewDate);
    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const currentDateStr = `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isSelected = selectedDate === currentDateStr;
      const isToday = currentDateStr === new Date().toISOString().split('T')[0];

      days.push(
        <button
          key={day}
          onClick={(e) => { e.preventDefault(); handleDateClick(day); }}
          className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-medium transition-all
            ${isSelected ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'hover:bg-indigo-50 text-slate-700'}
            ${!isSelected && isToday ? 'text-indigo-600 font-bold bg-indigo-50/50 border border-indigo-100' : ''}
          `}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div className="absolute bottom-full mb-1 left-0 w-full sm:w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
      <div className="flex justify-between items-center mb-4 px-1">
        <button onClick={(e) => { e.preventDefault(); handlePrevMonth(); }} className="p-1 hover:bg-gray-100 rounded-full text-gray-500">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="font-bold text-slate-800">
          {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </span>
        <button onClick={(e) => { e.preventDefault(); handleNextMonth(); }} className="p-1 hover:bg-gray-100 rounded-full text-gray-500">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {weekDays.map(d => (
          <div key={d} className="text-center text-xs font-bold text-gray-400 uppercase">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1 justify-items-center">
        {renderDays()}
      </div>
    </div>
  );
};
