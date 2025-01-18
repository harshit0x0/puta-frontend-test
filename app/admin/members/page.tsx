"use client";
import React, { useState } from "react";
import { MemberForm } from "@/components/admin/MemberForm";

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

const MemberManagement = () => {
  const [members, setMembers] = useState<Member[]>([
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      designation: "Professor",
      position: "President",
      college: "Engineering College",
      contact: "9876543210",
      membershipValidity: "2024-12-31",
      status: "active",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const handleDelete = async (memberId: number) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      setMembers(members.filter((member) => member.id !== memberId));
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Member Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add New Member
        </button>
      </div>

      <div className="flex flex-wrap gap-4 bg-white p-4 rounded-lg shadow-sm">
        <input
          type="text"
          placeholder="Search members..."
          className="flex-1 px-4 py-2 border rounded-md min-w-[200px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 border rounded-md min-w-[150px]"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Name",
                "Designation",
                "Position",
                "College",
                "Contact",
                "Status",
                "Actions",
              ].map((header) => (
                <th key={header} className="px-4 py-3 text-left text-gray-600">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {members.map((member) => (
              <tr key={member.id}>
                <td className="px-4 py-3">{member.name}</td>
                <td className="px-4 py-3">{member.designation}</td>
                <td className="px-4 py-3">{member.position}</td>
                <td className="px-4 py-3">{member.college}</td>
                <td className="px-4 py-3">{member.contact}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      member.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {member.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedMember(member);
                        setShowEditModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black z-50 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-xl font-bold mb-4">
              {showAddModal ? "Add New Member" : "Edit Member"}
            </h3>
            <MemberForm
              initialData={selectedMember}
              onSubmit={(data) => {
                if (showAddModal) {
                  setMembers([...members, { ...data, id: Date.now() }]);
                } else {
                  setMembers(
                    members.map((m) =>
                      m.id === selectedMember?.id ? { ...m, ...data } : m
                    )
                  );
                }
                setShowAddModal(false);
                setShowEditModal(false);
                setSelectedMember(null);
              }}
              onCancel={() => {
                setShowAddModal(false);
                setShowEditModal(false);
                setSelectedMember(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberManagement;
