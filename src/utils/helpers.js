export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const getCategoryStyle = (category) => {
  const styles = {
    Food: "bg-orange-50 text-orange-700 border-orange-100",
    Transport: "bg-sky-50 text-sky-700 border-sky-100",
    Shopping: "bg-pink-50 text-pink-700 border-pink-100",
    Bills: "bg-red-50 text-red-700 border-red-100",
    Entertainment: "bg-purple-50 text-purple-700 border-purple-100",
    Salary: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Family: "bg-amber-50 text-amber-700 border-amber-100",
    Health: "bg-teal-50 text-teal-700 border-teal-100",
    Other: "bg-gray-50 text-gray-700 border-gray-100"
  };
  return styles[category] || styles.Other;
};
