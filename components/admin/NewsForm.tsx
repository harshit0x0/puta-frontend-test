import { useState } from "react";
import { Button, Input, Textarea } from "@/components/admin/ui";

interface NewsFormData {
  title: string;
  date: string;
  description: string;
  image: string;
  status: "published" | "draft";
}

// News Form Component
export const NewsForm: React.FC<{
  initialData?: NewsFormData;
  onSubmit: (data: NewsFormData) => void;
  onCancel: () => void;
}> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<NewsFormData>(
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
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          required
        />
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {initialData ? "Update News" : "Create News"}
        </Button>
      </div>
    </form>
  );
};
