import React, { useState } from 'react';
import { Wallet, Plus } from 'lucide-react';
import { useFinanceData } from './hooks/useFinanceData';
import { SummaryCards } from './components/finance/SummaryCards';
import { FutureReminders } from './components/finance/FutureReminders';
import { TransactionList } from './components/finance/TransactionList';
import { TransactionForm } from './components/finance/TransactionForm';

export default function App() {
  const { transactions, setTransactions, stats } = useFinanceData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this entry?")) {
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleMarkPaid = (id) => {
    setTransactions(prev => prev.map(t => 
      t.id === id ? { ...t, isFuture: false, date: new Date().toISOString().split('T')[0] } : t
    ));
  };

  const handleSubmit = (data) => {
    if (editingItem) {
      setTransactions(prev => prev.map(t => t.id === editingItem.id ? { ...data, id: editingItem.id } : t));
    } else {
      setTransactions(prev => [{ ...data, id: crypto.randomUUID() }, ...prev]);
    }
    setIsFormOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans pb-20">
      {/* Header */}
      <header className="bg-slate-900 text-white pt-8 pb-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Wallet className="h-6 w-6 text-emerald-400" />
              FinanceTracker
            </h1>
            <p className="text-slate-400 text-sm mt-1">Manage personal & family funds</p>
          </div>
          <button 
            onClick={handleOpenAdd}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-lg shadow-emerald-500/20"
          >
            <Plus className="h-4 w-4" />
            Add Entry
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-8 -mt-16 space-y-8">
        <SummaryCards stats={stats} />
        
        <FutureReminders 
          transactions={transactions} 
          onEdit={handleEdit} 
          onDelete={handleDelete}
          onMarkPaid={handleMarkPaid}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* You can separate SpendingAnalytics into its own component if you wish, currently part of TransactionList logic in the single file, but here I'll just render the list to keep it simple or you can move the Analytics card logic to TransactionList or a new file. For now, let's assume TransactionList handles the right column and we place analytics in left col manually or inside a component. */}
           
           {/* Left Col: Simple Analytics Placeholders (or move code from previous single file here) */}
           <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-800">Spending Analysis</h2>
              {/* Reuse Card component for these stats if you want to break them out further */}
              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                 <div className="text-xs font-bold text-gray-400 uppercase">This Month</div>
                 <div className="text-2xl font-bold text-slate-800 mt-1">
                   {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(stats.monthlySpend)}
                 </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                 <div className="text-xs font-bold text-gray-400 uppercase">This Year</div>
                 <div className="text-2xl font-bold text-slate-800 mt-1">
                   {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(stats.yearlySpend)}
                 </div>
              </div>
           </div>

           <TransactionList 
             transactions={transactions} 
             onEdit={handleEdit} 
             onDelete={handleDelete}
             onOpenAdd={handleOpenAdd}
           />
        </div>
      </main>

      <TransactionForm 
         isOpen={isFormOpen} 
         onClose={() => setIsFormOpen(false)} 
         onSubmit={handleSubmit}
         initialData={editingItem}
      />
    </div>
  );
}
