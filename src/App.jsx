import { useState } from 'react';
import { Plus, Wallet } from 'lucide-react';
import { useFinanceData } from './hooks/useFinanceData';
import TransactionForm from './components/finance/TransactionForm';
import SummaryCards from './components/finance/SummaryCards';
import TransactionList from './components/finance/TransactionList';
import FutureReminders from './components/finance/FutureReminders';

export default function App() {
  const { transactions, setTransactions, stats } = useFinanceData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleSave = (data) => {
    // Logic to add or update transaction
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans pb-20">
      <header>...</header> 
      
      <main className="max-w-6xl mx-auto px-4 md:px-8 -mt-16 space-y-8">
        <SummaryCards stats={stats} />
        
        {/* Pass down props */}
        <FutureReminders transactions={transactions} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <SpendingAnalytics stats={stats} />
           <TransactionList transactions={transactions} />
        </div>
      </main>

      {isFormOpen && (
        <TransactionForm 
           isOpen={isFormOpen} 
           onClose={() => setIsFormOpen(false)} 
           onSave={handleSave}
           initialData={editingItem}
        />
      )}
    </div>
  );
}