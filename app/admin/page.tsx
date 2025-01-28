import React from "react";
import { RecentActivity } from "@/components/admin/RecentActivity";
import { StatsCard } from "@/components/admin/StatsCard";

interface Activity {
  title: string;
  date: string;
  status: "upcoming" | "completed";
}
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
      <h2 className="text-2xl font-bold text-gray-800">Site Overview</h2>

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
