import React from 'react';
import { Landmark, AlertCircle, DollarSign, Clock } from 'lucide-react';
import { Card } from '../ui/Card';
import { formatCurrency } from '../../utils/helpers';

export const SummaryCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="p-5 border-l-4 border-l-indigo-500 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-500 font-bold text-xs uppercase tracking-wide">My Net Worth</span>
          <Landmark className="h-5 w-5 text-indigo-500" />
        </div>
        <div className={`text-2xl font-bold ${stats.netMyMoney >= 0 ? 'text-slate-800' : 'text-red-500'}`}>
          {formatCurrency(stats.netMyMoney)}
        </div>
        <div className="text-[10px] text-gray-400 mt-1">Income - Expenses</div>
      </Card>

      <Card className="p-5 border-l-4 border-l-amber-500 bg-amber-50/50 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-amber-800 font-bold text-xs uppercase tracking-wide">Family Fund (Loan)</span>
          <AlertCircle className="h-5 w-5 text-amber-600" />
        </div>
        <div className="text-2xl font-bold text-amber-700">
          {formatCurrency(stats.emergencyBalance)}
        </div>
        <div className="text-[10px] text-amber-600/70 mt-1">To be returned</div>
      </Card>

      <Card className="p-5 border-l-4 border-l-emerald-500 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-500 font-bold text-xs uppercase tracking-wide">Total Cash on Hand</span>
          <DollarSign className="h-5 w-5 text-emerald-500" />
        </div>
        <div className="text-2xl font-bold text-slate-800">
          {formatCurrency(stats.cashOnHand)}
        </div>
        <div className="text-[10px] text-gray-400 mt-1">Available Liquidity</div>
      </Card>

      <Card className="p-5 border-l-4 border-l-purple-400 bg-purple-50/30 border-dashed shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-purple-700 font-bold text-xs uppercase tracking-wide">Upcoming</span>
          <Clock className="h-5 w-5 text-purple-500" />
        </div>
        <div className="text-2xl font-bold text-purple-700">
          {formatCurrency(stats.futureCommitments)}
        </div>
        <div className="text-[10px] text-purple-600/70 mt-1">Scheduled / Pending</div>
      </Card>
    </div>
  );
};
