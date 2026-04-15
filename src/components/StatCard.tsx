import type { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  value: number | string;
  label: string;
  iconBg?: string;
  iconColor?: string;
}

function StatCard({ icon, value, label, iconBg, iconColor }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 bg-white rounded px-6 py-5 shadow-sm border border-border-subtle flex-1 min-w-0">
      <div
        className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0 text-xl"
        style={{ backgroundColor: iconBg, color: iconColor }}
      >
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-text-primary leading-none">{value}</p>
        <p className="text-sm text-text-secondary mt-1">{label}</p>
      </div>
    </div>
  );
}

export default StatCard;
