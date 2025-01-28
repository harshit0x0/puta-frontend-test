"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Button, Input, Modal } from "@/components/admin/ui";
import { NewsForm } from "@/components/admin/NewsForm";

// Types
interface News {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  status: "published" | "draft";
}

// News List Component
const NewsList: React.FC = () => {
  const [News, setNews] = useState<News[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900 mb-4 md:mb-0">
          Manage News
        </h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search News..."
              className="pl-10"
            />
          </div>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" /> Add News
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
              {News.filter(
                (News) =>
                  News.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  News.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
              ).map((News) => (
                <tr key={News.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 mr-4 hidden sm:block">
                        <Image
                          src={News.image}
                          alt={News.title}
                          width={40}
                          height={40}
                          className="rounded-md object-cover"
                        />
                      </div>
                      <div className="font-medium text-gray-900">
                        {News.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="text-sm text-gray-900">{News.date}</div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        News.status === "published"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {News.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setSelectedNews(News);
                          setIsEditModalOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          setSelectedNews(News);
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

      {/* Add News Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New News"
      >
        <NewsForm
          onSubmit={(data) => {
            // Handle create logic here
            setIsAddModalOpen(false);
          }}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit News Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit News"
      >
        {selectedNews && (
          <NewsForm
            initialData={selectedNews}
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
        title="Delete News"
      >
        <div className="py-4">
          <p className="text-gray-600">
            Are you sure you want to delete this News? This action cannot be
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

export default NewsList;
