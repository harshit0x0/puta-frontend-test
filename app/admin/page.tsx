import React from "react";

// Stats Card Component
interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: string;
  trend?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, trend }) => (
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

// Recent Activity Component
interface Activity {
  title: string;
  date: string;
  status: "upcoming" | "completed";
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center">
    <h3 className="text-lg font-semibold mb-4 mr-4 md:mb-0">
      Recent Activities
    </h3>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {activities.map((activity, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm"
        >
          <div>
            <p className="font-medium text-gray-800">{activity.title}</p>
            <p className="text-sm text-gray-500">{activity.date}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              activity.status === "completed"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {activity.status}
          </span>
        </div>
      ))}
    </div>
  </div>
);

// Main Dashboard Component
interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const sampleActivities: Activity[] = [
    { title: "Annual Meeting", date: "2024-01-20", status: "upcoming" },
    { title: "Teacher Training", date: "2024-01-15", status: "completed" },
    { title: "Committee Election", date: "2024-01-25", status: "upcoming" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Members" value="215" trend={5} />
        <StatsCard title="Active Activities" value="8" />
        <StatsCard title="News Posts" value="24" />
        <StatsCard title="New Members" value="12" trend={8} />
      </div>

      {/* Recent Activities */}
      <div className="">
        <RecentActivity activities={sampleActivities} />
      </div>
    </div>
  );
};

export default Dashboard;
