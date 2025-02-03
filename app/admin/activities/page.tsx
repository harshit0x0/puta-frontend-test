"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Button, Input, Modal } from "@/components/admin/ui";
import { ActivityForm } from "@/components/admin/AcitivityForm";
import { Activity } from "@/app/types";

// // Types
// interface Activity {
//   id: string;
//   name: string;
//   date: string;
//   description: string;
//   image: string;
//   status: "published" | "draft";
// }

// Activity List Component
const ActivitiesList: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Create Activity
  async function createActivity(data: any, file: File) {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      formData.append("file", file);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/activities`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res) {
        throw new Error("Failed to create activity");
      }
      const activity = await res.json();
      console.log("Created activity:", activity);
      alert("Activity created successfully");
      setActivities([...activities, activity]);
      window.location.reload();
    } catch (error) {
      alert("Failed to create activity");
      console.error("Error creating activity:", error);
    }
  }

  // Delete Activity
  async function deleteActivity(id: number) {
    try {
      console.log("Deleting activity with id:", id);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/activities/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to delete activity");
      }
      alert("Activity deleted successfully");
      setActivities(activities.filter((activity) => activity._id !== id));
    } catch (error) {
      alert("Failed to delete activity");
      console.error("Error deleting activity:", error);
    }
  }

  // update Activity
  async function updateActivity(id: number, data: any, file: File) {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      formData.append("file", file);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/activities/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (!res.ok) {
        throw new Error("Failed to update activity");
      }
      const activity = await res.json();
      console.log("Updated activity:", activity);
      alert("Activity updated successfully");
      setActivities(
        activities.map((activity) =>
          activity._id === id ? { ...activity, ...activity } : activity
        )
      );
    } catch (error) {
      alert("Failed to update activity");
      console.error("Error updating activity:", error);
    }
  }

  useEffect(() => {
    // Fetch activities from the server
    async function fetchActivities() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/activities`
        );
        const data = await response.json();
        console.log("Fetched activities:", data.files);
        setActivities(data.files);
      } catch (error) {
        console.error("Error fetching activities:", error);
        return [];
      }
    }
    fetchActivities();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900 mb-4 md:mb-0">
          Manage Activities
        </h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search activities..."
              className="pl-10"
            />
          </div>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" /> Add Activity
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 hidden md:table-cell">
                  Date
                </th>
                {/* <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 hidden md:table-cell">
                  Status
                </th> */}
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {activities.length > 0 &&
                activities
                  .filter(
                    (activity) =>
                      activity?.name
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      activity?.description
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase())
                  )
                  .map((activity, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 mr-4 hidden sm:block">
                            <Image
                              src={activity?.url ?? "/placeholder.png"}
                              alt={activity?.name}
                              width={40}
                              height={40}
                              className="rounded-md object-cover w-10 h-10"
                            />
                          </div>
                          <div className="font-medium text-gray-900">
                            {activity?.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <div className="text-sm text-gray-900">
                          {new Date(activity?.createdAt ?? "").toDateString()}
                        </div>
                      </td>
                      {/*<td className="px-6 py-4 hidden md:table-cell">
                      <span 
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          activity.status === "published"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {activity.status}
                      </span>
                    </td> */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          {/* <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                              setSelectedActivity(activity);
                              setIsEditModalOpen(true);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button> */}
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => {
                              setSelectedActivity(activity);
                              setIsDeleteModalOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Activity Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Activity"
      >
        <ActivityForm
          onSubmit={(data, file) => {
            // Handle create logic here
            createActivity(data, file);
            setIsAddModalOpen(false);
          }}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Activity Modal */}
      {/* <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Activity"
      >
        {selectedActivity && (
          <ActivityForm
            initialData={selectedActivity}
            onSubmit={(data, file) => {
              updateActivity(selectedActivity._id ?? 0, data, file);
              setIsEditModalOpen(false);
            }}
            onCancel={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal> */}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Activity"
      >
        <div className="py-4">
          <p className="text-gray-600">
            Are you sure you want to delete this activity? This action cannot be
            undone.
          </p>
        </div>
        <div className="flex justify-end space-x-3">
          <Button
            variant="secondary"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              // Handle delete logic here
              deleteActivity(selectedActivity?._id ?? 0);
              setIsDeleteModalOpen(false);
            }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ActivitiesList;
