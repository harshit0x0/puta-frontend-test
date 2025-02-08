"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Member } from "../types";
import Loading from "@/components/ui/loading";

export default function MembersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 20;

  const [members, setMembers] = useState<Member[] | null>([]);
  const [loading, setLoading] = useState(true);

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
      }
      return member;
    });
  };
  const getPositionColor = (position: string) => {
    switch (position) {
      case "President":
        return "bg-blue-100 font-bold text-blue-800";
      case "Vice President":
        return "bg-green-100 font-semibold text-green-800";
      case "Treasurer":
        return "bg-yellow-100 font-semibold text-yellow-800";
      case "General Secretary":
        return "bg-purple-100 font-semibold text-purple-800";
      default:
        return "bg-gray-100";
    }
  };

  const paginatedMembers = useMemo(() => {
    const startIndex = (currentPage - 1) * membersPerPage;
    return members
      ? members.slice(startIndex, startIndex + membersPerPage)
      : [];
  }, [currentPage, members]);

  const totalPages = members ? Math.ceil(members.length / membersPerPage) : 0;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Fetch members from the server
  useEffect(() => {
    async function fetchMembers() {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/members`
        );
        const data = await response.json();
        if (!data.files) return;
        const members = assignPosition(data.files);
        setMembers(members);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    }
    // console.log("members", members);
    fetchMembers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-900">
        PUTA Members
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="border p-3 text-left">ID</th>
              <th className="border p-3 text-left">Name</th>
              <th className="border p-3 text-left">Position</th>
              <th className="border p-3 text-left">Designation</th>
              <th className="border p-3 text-left">College</th>
              <th className="border p-3 text-left">Contact</th>
              <th className="border p-3 text-left">Membership Valid Until</th>
            </tr>
          </thead>
          <tbody>
            {paginatedMembers.map((member, index) => (
              <tr key={member._id} className="hover:bg-gray-50">
                <td className="border p-3">{index + 1}</td>
                <td className="border p-3">{member.name}</td>
                <td className={`border p-3 ${getPositionColor(member.role)}`}>
                  {member.role}
                </td>
                <td className="border p-3">{member.designation}</td>
                <td className="border p-3">{member.college}</td>
                <td className="border p-3">{member.mobileNo}</td>
                <td className="border p-3">{member.endOfMembership}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <Loading />}

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 border rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
