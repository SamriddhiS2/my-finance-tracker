import React, { useState } from 'react';
import { CreditCard, TrendingUp, TrendingDown, AlertCircle, Calendar, Tag, Edit2, Trash2, Filter } from 'lucide-react';
import { Card } from '../ui/Card.jsx';
import { PlatformBadge } from '../ui/PlatformBadge.jsx';
import { formatCurrency, getCategoryStyle } from '../../utils/helpers.js';

export const TransactionList = ({ transactions, onEdit, onDelete, onOpenAdd }) => {
  const [filter, setFilter] = useState('all');
  const filteredTransactions = transactions.filter(t => {
    if (t.isFuture) return false;
    if (filter === 'all') return true;
    return t.type === filter;
  });

  return (
    <div className="lg:col-span-2 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <div className="h-8 w-1 bg-emerald-500 rounded-full"></div>
          Recent Activity
        </h2>

        {/* Filter Buttons */}
        <div className="flex bg-white p-1 rounded-lg border border-gray-100 shadow-sm overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors whitespace-nowrap ${
              filter === 'all' ? 'bg-slate-100 text-slate-800' : 'text-gray-500 hover:text-slate-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('expense')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors whitespace-nowrap ${
              filter === 'expense' ? 'bg-red-50 text-red-600' : 'text-gray-500 hover:text-red-500'
            }`}
          >
            Expenses
          </button>
          <button
            onClick={() => setFilter('income')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors whitespace-nowrap ${
              filter === 'income' ? 'bg-emerald-50 text-emerald-600' : 'text-gray-500 hover:text-emerald-500'
            }`}
          >
            Income
          </button>
          <button
            onClick={() => setFilter('emergency')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors whitespace-nowrap ${
              filter === 'emergency' ? 'bg-amber-50 text-amber-600' : 'text-gray-500 hover:text-amber-500'
            }`}
          >
            Family Fund
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-gray-100 border-dashed">
            <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No {filter !== 'all' ? filter : ''} transactions found.</p>
            <button onClick={onOpenAdd} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 mt-4">
              Create Entry
            </button>
          </div>
        ) : (
          filteredTransactions.sort((a,b) => new Date(b.date) - new Date(a.date)).map((t) => (
            <Card key={t.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between group hover:shadow-md transition-shadow border-l-4 border-l-transparent hover:border-l-indigo-500">
              
              {/* Icon & Details */}
              <div className="flex items-start gap-4 mb-3 sm:mb-0">
                <div className={`
                  p-3 rounded-2xl flex-shrink-0 shadow-sm
                  ${t.type === 'income' ? 'bg-emerald-100 text-emerald-600' : ''}
                  ${t.type === 'expense' ? 'bg-red-50 text-red-500' : ''}
                  ${t.type === 'emergency' ? 'bg-amber-100 text-amber-600' : ''}
                `}>
                  {t.type === 'income' && <TrendingUp className="h-5 w-5" />}
                  {t.type === 'expense' && <TrendingDown className="h-5 w-5" />}
                  {t.type === 'emergency' && <AlertCircle className="h-5 w-5" />}
                </div>
                
                <div>
                  <div className="font-bold text-slate-800 text-base">{t.description}</div>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                       <Calendar className="h-3 w-3" /> {new Date(t.date).toLocaleDateString()}
                    </span>
                    
                    {/* Categorical Color Coded Tag */}
                    {t.category && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider flex items-center gap-1 border ${getCategoryStyle(t.category)}`}>
                        <Tag className="h-3 w-3" /> {t.category}
                      </span>
                    )}
                  </div>
                  <div className="mt-2">
                     <PlatformBadge platform={t.platform} />
                  </div>
                </div>
              </div>

              {/* Amount & Actions */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                <div className={`text-right font-bold text-lg
                  ${t.type === 'income' ? 'text-emerald-600' : ''}
                  ${t.type === 'expense' ? 'text-slate-800' : ''}
                  ${t.type === 'emergency' ? 'text-amber-600' : ''}
                `}>
                  {t.type === 'expense' ? '-' : '+'}{formatCurrency(t.amount)}
                </div>
                
                <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => onEdit(t)}
                    className="text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => onDelete(t.id)}
                    className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
