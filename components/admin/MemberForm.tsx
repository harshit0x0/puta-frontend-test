import { useState } from "react";

interface Member {
  id: number;
  name: string;
  designation: string;
  position: string;
  college: string;
  contact: string;
  membershipValidity: string;
  status: "active" | "expired";
}

interface MemberFormProps {
  initialData: Member | null;
  onSubmit: (data: Member) => void;
  onCancel: () => void;
}

export const MemberForm: React.FC<MemberFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Member>(
    initialData || {
      id: -1,
      name: "",
      designation: "",
      position: "Member",
      college: "",
      contact: "",
      status: "active",
      membershipValidity: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Designation
          </label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Position
          </label>
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="Member">Member</option>
            <option value="President">President</option>
            <option value="Vice President">Vice President</option>
            <option value="Treasurer">Treasurer</option>
            <option value="General Secretary">General Secretary</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            College
          </label>
          <input
            type="text"
            name="college"
            value={formData.college}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contact
          </label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-3 py-2

 border rounded-md"
        >
          <option value="active">Active</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Membership Validity
        </label>
        <input
          type="date"
          name="membershipValidity"
          value={formData.membershipValidity}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};
