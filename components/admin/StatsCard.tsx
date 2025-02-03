// Stats Card Component
interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: string;
  trend?: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  trend,
}) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
    <div>
      <h3 className="text-gray-600 text-sm">{title}</h3>
    </div>
    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      {trend && (
        <span
          className={`text-sm ${trend > 0 ? "text-green-500" : "text-red-500"}`}
        >
          {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
        </span>
      )}
    </div>
  </div>
);
