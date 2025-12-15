import React from 'react';

export const PlatformBadge = ({ platform }) => {
  const colors = {
    venmo: "bg-blue-50 text-blue-700 border-blue-100",
    chase: "bg-indigo-50 text-indigo-700 border-indigo-100",
    zelle: "bg-purple-50 text-purple-700 border-purple-100",
    cash: "bg-green-50 text-green-700 border-green-100",
    other: "bg-gray-50 text-gray-700 border-gray-100"
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border ${colors[platform] || colors.other}`}>
      {platform}
    </span>
  );
};
