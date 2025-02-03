import { useState } from "react";
import { Button, Input, Textarea } from "@/components/admin/ui";

// Activity Form Component

interface ActivityFormData {
  name: string;
  description: string;
  fileType: "image";
  // file: File | null;
}

export const ActivityForm: React.FC<{
  initialData?: ActivityFormData;
  onSubmit: (data: ActivityFormData, file: File) => void;
  onCancel: () => void;
}> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<ActivityFormData>(
    initialData || {
      name: "",
      description: "",
      fileType: "image",
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
          Title
        </label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      {/* 
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
      </div> */}

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

      {/* upload image  */}
      <div className="flex justify-end space-x-3 mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Image
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
          {initialData ? "Update Activity" : "Create Activity"}
        </Button>
      </div>
    </form>
  );
};
