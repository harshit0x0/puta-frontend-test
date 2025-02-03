"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Button, Input, Modal } from "@/components/admin/ui";
import { NewsForm } from "@/components/admin/NewsForm";
import { News } from "@/app/types";
import Loading from "@/components/ui/loading";

// Types
// interface News {
//   id: string;
//   title: string;
//   date: string;
//   description: string;
//   image: string;
//   status: "published" | "draft";
// }

// News List Component
const NewsList: React.FC = () => {
  const [News, setNews] = useState<News[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(News.length === 0);

  // Create News
  async function createNews(data: any, file: File) {
    try {
      setIsLoading(true);
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      formData.append("file", file);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news`, {
        method: "POST",
        body: formData,
      });

      if (!res) {
        throw new Error("Failed to create news");
      }
      const NewNews = await res.json();
      console.log("Created news:", NewNews);
      alert("News created successfully");
      setNews((News) => [...News, NewNews]);
      window.location.reload();
    } catch (error) {
      alert("Failed to create news");
      console.error("Error creating news:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Delete News
  async function deleteNews(id: number) {
    try {
      setIsLoading(true);
      console.log("Deleting news with id:", id);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/news/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to delete news");
      }
      alert("News deleted successfully");
      setNews(News.filter((news) => news._id !== id));
    } catch (error) {
      alert("Failed to delete news");
      console.error("Error deleting news:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Update News
  async function updateNews(id: number, data: any, file: File) {
    try {
      setIsLoading(true);
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      formData.append("file", file);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/news/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (!res.ok) {
        throw new Error("Failed to update news");
      }
      const news = await res.json();
      console.log("Updated news:", news);
      alert("News updated successfully");
      setNews(
        News.map((news) => (news._id === id ? { ...news, ...news } : news))
      );
    } catch (error) {
      alert("Failed to update news");
      console.error("Error updating news:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // Fetch news from the server
    async function fetchNews() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/news`
        );
        const data = await response.json();
        console.log("Fetched news:", data.files);
        if (!data.files || data.files.length === 0) return [];
        const news = data.files.map((news: any) => ({
          _id: news._id,
          name: news.name,
          description: news.description,
          url: news.url.replace("/raw/upload/", "/upload/fl_attachment/"),
          cloudinaryId: news.cloudinaryId,
          fileType: news.fileType,
          createdAt: news.createdAt,
          updatedAt: news.updatedAt,
        }));
        setNews(news);
      } catch (error) {
        console.error("Error fetching news:", error);
        return [];
      }
    }
    fetchNews();
    setIsLoading(false);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading && <Loading />}
      {/* Manage News Header */}
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
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {News.filter(
                (News) =>
                  News?.name
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  News?.description
                    ?.toLowerCase()
                    ?.includes(searchQuery.toLowerCase())
              ).map((News) => (
                <tr key={News._id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 mr-4 hidden sm:block">
                        {News.fileType === "image" ? (
                          <Image
                            src={News.url}
                            alt={News.name}
                            width={40}
                            height={40}
                            className="rounded-md object-cover"
                          />
                        ) : (
                          //pdf link
                          <a
                            href={News.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue underline pt-4 rounded-md"
                          >
                            Link
                          </a>
                        )}
                      </div>
                      <div className="font-medium text-gray-900">
                        {News.description}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="text-sm text-gray-900">
                      {News.createdAt}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      {/* <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setSelectedNews(News);
                          setIsEditModalOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button> */}
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
          onSubmit={(data, file) => {
            // Handle create logic here
            createNews(data, file);
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
            onSubmit={(data, file) => {
              // Handle update logic here
              updateNews(selectedNews?._id ?? 0, data, file);
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
              deleteNews(selectedNews?._id ?? 0);
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
