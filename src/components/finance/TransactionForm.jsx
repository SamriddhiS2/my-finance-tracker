import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle, StickyNote, CalendarDays } from 'lucide-react';
import { CustomCalendar } from '../ui/CustomCalendar';

export const TransactionForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [activeTab, setActiveTab] = useState('expense');
  const [showCalendar, setShowCalendar] = useState(false);
  
  const [form, setForm] = useState({
    amountStr: '', 
    platform: 'chase',
    category: 'Food',
    description: '',
    date: new Date().toISOString().split('T')[0],
    isFuture: false
  });

  const amountInputRef = useRef(null);
  const calendarRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        amountStr: (initialData.amount * 100).toFixed(0),
        platform: initialData.platform,
        category: initialData.category,
        description: initialData.description,
        date: initialData.date,
        isFuture: initialData.isFuture || false
      });
      setActiveTab(initialData.type);
    } else {
      setForm({
        amountStr: '', 
        platform: 'chase',
        category: 'Food',
        description: '',
        date: new Date().toISOString().split('T')[0],
        isFuture: false
      });
      setActiveTab('expense');
    }
  }, [initialData, isOpen]);

  // Handle clicking outside calendar to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  const handleAmountChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    setForm({ ...form, amountStr: val });
  };

  const getFormattedAmount = () => {
    if (!form.amountStr) return "$0.00";
    const num = parseInt(form.amountStr, 10) / 100;
    return num.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amountStr || !form.description) return;

    const actualAmount = parseInt(form.amountStr, 10) / 100;
    if (actualAmount === 0) return;

    const data = {
      ...form,
      type: activeTab,
      amount: actualAmount,
      amountStr: undefined 
    };

    onSubmit(data);
  };

  const setDate = (offset) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    setForm(prev => ({ ...prev, date: d.toISOString().split('T')[0] }));
  };

  const handleCalendarSelect = (dateStr) => {
    setForm(prev => ({ ...prev, date: dateStr }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center sm:items-center items-end justify-center p-0 sm:p-4 overflow-hidden">
      <div className={`bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh] sm:max-h-[85vh] animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-200 transition-colors ${form.isFuture ? 'ring-4 ring-purple-100' : ''}`}>
        
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="flex flex-col">
            <h3 className="font-bold text-xl text-slate-800">
              {initialData ? 'Edit Transaction' : form.isFuture ? 'New Reminder' : 'New Transaction'}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              {form.isFuture ? 'Track a planned payment or note' : 'Log a completed payment'}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        {!form.isFuture && (
          <div className="px-6 mt-6">
            <div className="grid grid-cols-3 p-1 bg-gray-100 rounded-xl">
              {['expense', 'income', 'emergency'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 text-sm font-bold rounded-lg capitalize transition-all duration-200 ${
                    activeTab === tab 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'emergency' ? 'Family Fund' : tab}
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Future Toggle */}
          <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${form.isFuture ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-transparent hover:border-gray-200'}`} onClick={() => setForm({...form, isFuture: !form.isFuture})}>
             <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${form.isFuture ? 'bg-purple-600 border-purple-600' : 'bg-white border-gray-300'}`}>
                {form.isFuture && <CheckCircle className="w-3.5 h-3.5 text-white" />}
             </div>
             <div className="flex-1">
               <span className={`block text-sm font-bold ${form.isFuture ? 'text-purple-900' : 'text-gray-600'}`}>Track as Future / Reminder?</span>
             </div>
             {form.isFuture && <StickyNote className="h-5 w-5 text-purple-300" />}
          </div>

          {/* Amount Input */}
          <div>
             <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2 text-center">
               {form.isFuture ? 'Estimated Amount' : 'Amount'}
             </label>
             <div className="relative flex justify-center items-center">
               <input
                  ref={amountInputRef}
                  type="text"
                  inputMode="numeric"
                  value={getFormattedAmount()} 
                  onChange={handleAmountChange} 
                  className="w-full text-center bg-transparent text-5xl font-bold text-slate-800 outline-none placeholder-gray-200 caret-indigo-500"
                  placeholder="$0.00"
                  autoFocus
               />
             </div>
          </div>

          {/* Main Fields Container */}
          <div className="space-y-4">
            
            {/* Note/Description Field */}
            <div className="relative">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5 ml-1">
                {form.isFuture ? 'Note (Who / What)' : activeTab === 'expense' ? 'Description' : activeTab === 'income' ? 'Source' : 'Lender / Note'}
              </label>
              <input 
                type="text" 
                required
                value={form.description}
                onChange={(e) => setForm({...form, description: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-800 focus:border-transparent outline-none transition-all font-medium text-slate-700"
                placeholder={form.isFuture ? "e.g. Owe Sarah for dinner" : activeTab === 'expense' ? "e.g. Groceries" : "e.g. Paycheck"}
              />
            </div>

            {/* Split Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Platform */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5 ml-1">Platform</label>
                <select 
                  value={form.platform}
                  onChange={(e) => setForm({...form, platform: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-800 outline-none cursor-pointer appearance-none font-medium text-sm text-slate-700"
                >
                  <option value="chase">Chase</option>
                  <option value="venmo">Venmo</option>
                  <option value="zelle">Zelle</option>
                  <option value="cash">Cash App</option>
                  <option value="other">Cash / Other</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5 ml-1">Category</label>
                <select 
                  value={form.category}
                  onChange={(e) => setForm({...form, category: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-800 outline-none cursor-pointer appearance-none font-medium text-sm text-slate-700"
                >
                   {activeTab === 'expense' || form.isFuture ? (
                     <>
                      <option>Food</option>
                      <option>Transport</option>
                      <option>Shopping</option>
                      <option>Bills</option>
                      <option>Entertainment</option>
                      <option>Health</option>
                      <option>Other</option>
                     </>
                   ) : (
                     <>
                      <option>Salary</option>
                      <option>Freelance</option>
                      <option>Gift</option>
                      <option>Other</option>
                     </>
                   )}
                </select>
              </div>
            </div>

            {/* Date Picker (Custom) */}
            <div className="relative" ref={calendarRef}>
               <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5 ml-1">Date</label>
               <div className="flex gap-2">
                  <div 
                    className="relative flex-1 group cursor-pointer"
                    onClick={() => setShowCalendar(!showCalendar)}
                  >
                    <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-indigo-500 transition-colors pointer-events-none" />
                    <div className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium text-slate-700 group-hover:bg-white group-hover:border-gray-200 transition-all select-none flex items-center h-full">
                      {new Date(form.date + 'T12:00:00').toLocaleDateString()}
                    </div>
                  </div>

                  <button 
                    type="button" 
                    onClick={() => setDate(0)} 
                    className="px-4 py-2 bg-gray-50 border border-gray-100 text-slate-600 text-xs font-bold rounded-xl hover:bg-white hover:border-gray-300 hover:text-slate-800 transition-all"
                  >
                    Today
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setDate(-1)} 
                    className="px-4 py-2 bg-gray-50 border border-gray-100 text-slate-600 text-xs font-bold rounded-xl hover:bg-white hover:border-gray-300 hover:text-slate-800 transition-all"
                  >
                    Yesterday
                  </button>
               </div>
               
               {/* Calendar Popup */}
               {showCalendar && (
                 <CustomCalendar 
                   selectedDate={form.date} 
                   onChange={handleCalendarSelect} 
                   onClose={() => setShowCalendar(false)} 
                 />
               )}
            </div>

          </div>

          {/* Actions: Cancel & Submit */}
          <div className="flex gap-3 pt-2 pb-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={`flex-[2] font-bold py-3.5 rounded-xl text-white shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] flex justify-center items-center gap-2
                ${form.isFuture ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-200' : ''}
                ${!form.isFuture && activeTab === 'expense' ? 'bg-slate-900 hover:bg-slate-800 shadow-slate-200' : ''}
                ${!form.isFuture && activeTab === 'income' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200' : ''}
                ${!form.isFuture && activeTab === 'emergency' ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-200' : ''}
              `}
            >
              {initialData ? 'Update' : 'Save'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
