'use client'
import React, { useState, useMemo } from 'react';

export default function MembersPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const membersPerPage = 20;

    const [members, setMembers] = useState([
        // Assume a large list of 200+ members
        ...Array.from({ length: 215 }, (_, i) => ({
            id: i + 1,
            name: `Member ${i + 1}`,
            position: i < 1 ? 'President' :
                i < 2 ? 'Vice President' :
                    i < 3 ? 'Treasurer' :
                        i < 4 ? 'General Secretary' : 'Member',
            designation: 'Professor',
            college: `College ${Math.floor(i / 10) + 1}`,
            contact: `987654${(3210 + i).toString().slice(-4)}`,
            membershipValidity: '31 Dec 2024'
        }))
    ]);

    const getPositionColor = (position: string) => {
        switch (position) {
            case 'President': return 'bg-blue-100 font-bold text-blue-800';
            case 'Vice President': return 'bg-green-100 font-semibold text-green-800';
            case 'Treasurer': return 'bg-yellow-100 font-semibold text-yellow-800';
            case 'General Secretary': return 'bg-purple-100 font-semibold text-purple-800';
            default: return 'bg-gray-100';
        }
    };

    const paginatedMembers = useMemo(() => {
        const startIndex = (currentPage - 1) * membersPerPage;
        return members.slice(startIndex, startIndex + membersPerPage);
    }, [currentPage, members]);

    const totalPages = Math.ceil(members.length / membersPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-blue-900">PUTA Members</h1>

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
                        {paginatedMembers.map((member) => (
                            <tr key={member.id} className="hover:bg-gray-50">
                                <td className="border p-3">{member.id}</td>
                                <td className="border p-3">{member.name}</td>
                                <td className={`border p-3 ${getPositionColor(member.position)}`}>
                                    {member.position}
                                </td>
                                <td className="border p-3">{member.designation}</td>
                                <td className="border p-3">{member.college}</td>
                                <td className="border p-3">{member.contact}</td>
                                <td className="border p-3">{member.membershipValidity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

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
                            className={`px-4 py-2 border rounded ${currentPage === index + 1
                                ? 'bg-blue-500 text-white'
                                : 'bg-white'
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
    )
}