import { useState, useEffect, useMemo } from 'react';

export const useFinanceData = () => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finance_tracker_data');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('finance_tracker_data', JSON.stringify(transactions));
  }, [transactions]);

  const stats = useMemo(() => {
    // stats calculation logic
    // return { ... };
  }, [transactions]);

  // Return everything the UI needs
  return { transactions, setTransactions, stats };
};