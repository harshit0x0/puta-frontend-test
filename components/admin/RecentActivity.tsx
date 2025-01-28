// Recent Activity Component
interface Activity {
  title: string;
  date: string;
  status: "upcoming" | "completed";
}

interface RecentActivityProps {
  activities: Activity[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
  activities,
}) => (
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
