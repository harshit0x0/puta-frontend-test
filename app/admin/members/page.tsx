"use client";
import React, { useState, useEffect } from "react";
import { MemberForm } from "@/components/admin/MemberForm";
import { Member } from "@/app/types";

const MemberManagement = () => {
  const [members, setMembers] = useState<Member[]>([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const handleDelete = async (memberId: number) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/members/${memberId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete member");
        }
        alert("Member deleted successfully");
      } catch (error) {
        console.log(error);
        alert("Failed to delete member");
      }
      setMembers(members.filter((member) => member._id !== memberId));
    }
  };

  const handleSubmit = async (data: Member) => {
    if (showAddModal) {
      console.log(data);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/members`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to add member");
        }
        const newMember = await response.json();
        setMembers([members, newMember]);
        alert("Member added successfully");
      } catch (error) {
        alert("Failed to add member");
        console.log(error);
      }
    } else {
      setMembers(
        members.map((m) =>
          m._id === selectedMember?._id ? { ...m, ...data } : m
        )
      );
    }

    setShowAddModal(false);
    setShowEditModal(false);
    setSelectedMember(null);
  };

  const assignPosition = (members: Member[]) => {
    return members.map((member) => {
      switch (member.name) {
        case process.env.NEXT_PUBLIC_PRESIDENT:
          member.position = "President";
          break;
        case process.env.NEXT_PUBLIC_VICE_PRESIDENT:
          member.position = "Vice President";
          break;
        case process.env.NEXT_PUBLIC_TREASURER:
          member.position = "Treasurer";
          break;
        case process.env.NEXT_PUBLIC_GENERAL_SECRETARY:
          member.position = "General Secretary";
          break;
        default:
          member.position = "Member";
          break;
      }
      return member;
    });
  };

  // Fetch members from the server
  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/members`
        );
        const data = await response.json();
        if (!data.files) return;
        const members = assignPosition(data.files);
        setMembers(members);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    }

    fetchMembers();
  }, []);

  const filteredMembers = members
    ? members.filter((member) => {
        return member.name.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : [];

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
                // "Status",
                "Actions",
              ].map((header) => (
                <th key={header} className="px-4 py-3 text-left text-gray-600">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredMembers.map((member, index) => (
              <tr key={index}>
                <td className="px-4 py-3">{member.name}</td>
                <td className="px-4 py-3">{member.designation}</td>
                <td className="px-4 py-3">{member.position}</td>
                <td className="px-4 py-3">{member.college}</td>
                <td className="px-4 py-3">{member.mobileNo}</td>
                {/* <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      member.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {member.status}
                  </span>
                </td> */}
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
                      onClick={() => handleDelete(member._id)}
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
              onSubmit={handleSubmit}
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
