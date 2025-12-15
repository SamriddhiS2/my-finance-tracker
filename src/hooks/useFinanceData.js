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
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    
    // Helper to get week number
    const getWeek = (d) => {
      const date = new Date(d);
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
      const week1 = new Date(date.getFullYear(), 0, 4);
      return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    };
    const currentWeek = getWeek(now);

    let totalIncome = 0;
    let totalExpense = 0;
    let emergencyBalance = 0;
    
    let weeklySpend = 0;
    let monthlySpend = 0;
    let yearlySpend = 0;

    let futureCommitments = 0;

    transactions.forEach(t => {
      const amount = parseFloat(t.amount);
      
      // Separate Scheduled (Future) transactions
      if (t.isFuture) {
        if (t.type !== 'income') {
           futureCommitments += amount;
        }
        return; 
      }

      const tDate = new Date(t.date);

      if (t.type === 'emergency') {
        emergencyBalance += amount;
      } else if (t.type === 'income') {
        totalIncome += amount;
      } else if (t.type === 'expense') {
        totalExpense += amount;
        
        if (tDate.getFullYear() === currentYear) {
          yearlySpend += amount;
          if (tDate.getMonth() === currentMonth) {
            monthlySpend += amount;
            if (getWeek(tDate) === currentWeek) {
              weeklySpend += amount;
            }
          }
        }
      }
    });

    return {
      totalIncome,
      totalExpense,
      netMyMoney: totalIncome - totalExpense,
      emergencyBalance,
      cashOnHand: (totalIncome - totalExpense) + emergencyBalance,
      weeklySpend,
      monthlySpend,
      yearlySpend,
      futureCommitments
    };
  }, [transactions]);

  // Return everything the UI needs
  return { transactions, setTransactions, stats };
};