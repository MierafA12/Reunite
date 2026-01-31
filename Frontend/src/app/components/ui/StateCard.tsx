import React from "react";

interface StatCardProps {
  title: string;
  subtitle: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, subtitle }) => {
  return (
    <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
      <h2 className="text-3xl font-bold text-secondary">{title}</h2>
      <p className="mt-2 text-sm text-gray-200">{subtitle}</p>
    </div>
  );
};

export default StatCard;
