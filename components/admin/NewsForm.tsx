import { useState } from "react";
import { Button, Input, Textarea } from "@/components/admin/ui";

interface NewsFormData {
  name: string;
  createdAt?: string;
  description: string;
}

// News Form Component
export const NewsForm: React.FC<{
  initialData?: NewsFormData;
  onSubmit: (data: NewsFormData, file: File) => void;
  onCancel: () => void;
}> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<NewsFormData>(
    initialData || {
      name: "",
      createdAt: "",
      description: "",
    }
  );

  const [file, setFile] = useState<File | null>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!formData.name || !formData.description || !file) return;
        onSubmit(formData, file);
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          name
        </label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date
        </label>
        <Input
          type="Date"
          value={formData.createdAt || ""}
          onChange={(e) =>
            setFormData({ ...formData, createdAt: e.target.value })
          }
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

      <div className="flex justify-end space-x-3 mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload File
        </label>
        {/* <Input
          value={""}
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setFormData({ ...formData, file });
            }
          }}
        /> */}
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setFile(file);
            }
          }}
        />
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {initialData ? "UpcreatedAt News" : "Create News"}
        </Button>
      </div>
    </form>
  );
};
