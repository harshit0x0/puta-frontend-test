"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Button, Input, Modal, Textarea } from "@/components/admin/ui";

// Types
interface Activity {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  status: "published" | "draft";
}

interface ActivityFormData {
  title: string;
  date: string;
  description: string;
  image: string;
  status: "published" | "draft";
}

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

  // Activity Form Component
  const ActivityForm: React.FC<{
    initialData?: ActivityFormData;
    onSubmit: (data: ActivityFormData) => void;
    onCancel: () => void;
  }> = ({ initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<ActivityFormData>(
      initialData || {
        title: "",
        date: "",
        description: "",
        image: "",
        status: "draft",
      }
    );

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData);
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <Input
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <Textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <Input
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            required
          />
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {initialData ? "Update Activity" : "Create Activity"}
          </Button>
        </div>
      </form>
    );
  };

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
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 hidden md:table-cell">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 hidden md:table-cell">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {activities
                .filter(
                  (activity) =>
                    activity.title
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    activity.description
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                )
                .map((activity) => (
                  <tr key={activity.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 mr-4 hidden sm:block">
                          <Image
                            src={activity.image}
                            alt={activity.title}
                            width={40}
                            height={40}
                            className="rounded-md object-cover"
                          />
                        </div>
                        <div className="font-medium text-gray-900">
                          {activity.title}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="text-sm text-gray-900">
                        {activity.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          activity.status === "published"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {activity.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            setSelectedActivity(activity);
                            setIsEditModalOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
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
          onSubmit={(data) => {
            // Handle create logic here
            setIsAddModalOpen(false);
          }}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Activity Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Activity"
      >
        {selectedActivity && (
          <ActivityForm
            initialData={selectedActivity}
            onSubmit={(data) => {
              // Handle update logic here
              setIsEditModalOpen(false);
            }}
            onCancel={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>

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
