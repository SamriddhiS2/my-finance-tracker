import React from 'react';
import { Clock, CheckCircle, Edit2, Trash2 } from 'lucide-react';
import { PlatformBadge } from '../ui/PlatformBadge';
import { formatCurrency } from '../../utils/helpers';

export const FutureReminders = ({ transactions, onEdit, onDelete, onMarkPaid }) => {
  const futureTransactions = transactions.filter(t => t.isFuture);

  if (futureTransactions.length === 0) return null;

  return (
    <div className="space-y-4 animate-in slide-in-from-top-4 fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-1 bg-purple-500 rounded-full"></div>
          <h2 className="text-lg font-bold text-slate-800">Reminders / Future</h2>
        </div>
        <span className="text-xs font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">{futureTransactions.length} pending</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {futureTransactions.sort((a,b) => new Date(a.date) - new Date(b.date)).map(t => (
          <div key={t.id} className="bg-white p-5 rounded-xl border border-purple-100 shadow-sm flex flex-col relative overflow-hidden group">
            {/* Decorative background accent */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-purple-50 rounded-bl-full -mr-8 -mt-8"></div>

            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <div className="font-bold text-slate-800 text-lg flex items-center gap-2">
                  {t.description}
                </div>
                <div className="text-xs text-gray-500 font-medium mt-1 flex items-center gap-1">
                  <Clock className="h-3 w-3 text-purple-400" /> Due: {new Date(t.date).toLocaleDateString()}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-xl text-purple-700">{formatCurrency(t.amount)}</div>
                <div className="mt-1"><PlatformBadge platform={t.platform} /></div>
              </div>
            </div>

            <div className="flex gap-2 relative z-10 mt-auto">
              <button 
                onClick={() => onMarkPaid(t.id)}
                className="flex-1 bg-purple-600 text-white text-xs font-bold py-2.5 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 shadow-sm shadow-purple-100"
              >
                <CheckCircle className="h-3.5 w-3.5" /> Mark Paid
              </button>
              <button 
                onClick={() => onEdit(t)}
                className="px-3 py-2 bg-gray-50 text-gray-600 border border-gray-100 rounded-lg hover:bg-white hover:border-gray-200 transition-colors"
              >
                <Edit2 className="h-3.5 w-3.5" />
              </button>
              <button 
                onClick={() => onDelete(t.id)}
                className="px-3 py-2 bg-gray-50 text-gray-600 border border-gray-100 rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
