"use client";
import React, { useState } from "react";
import { Member } from "../types";
import { displayRazorpay } from "@/utils/displayRazorpay";
import { useRouter } from "next/navigation";
import Loading from "@/components/ui/loading";

export default function RegisterPage() {
  const [formData, setFormData] = useState<Member>({
    _id: -1,
    name: "",
    position: "Member",
    college: "",
    designation: "",
    department: "",
    role: "member",
    endOfMembership: new Date().getFullYear().toString() + "-12-31",
    mobileNo: "",
  });

  const designations = [
    "Assistant Professor",
    "Associate Professor",
    "Professor",
    "Lecturer",
    "Research Scholar",
    "Head of Department",
    "Dean",
    "Director",
    "Registrar",
  ];

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const router = useRouter();
  function navigate(paymentInfo: string, userData: Member | null) {
    router.push(
      `/register/success?userData=${JSON.stringify(
        userData ?? ""
      )}&paymentData=${paymentInfo}`
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await displayRazorpay(formData, navigate);
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
      <div className="w-full mx-3 md:w-[80%] my-20 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          PUTA Membership Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter full name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              College
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="college"
              value={formData.college}
              onChange={handleInputChange}
              placeholder="Name of your College"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Department
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              placeholder="Enter your department"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Designation
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              required
            >
              <option value="">Select your designation</option>
              {designations.map((designation) => (
                <option key={designation} value={designation}>
                  {designation}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Contact Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleInputChange}
              placeholder="Enter contact number"
              type="tel"
              required
            />
          </div>

          <div className="bg-yellow-50 p-3 rounded text-sm text-gray-600">
            <strong>Membership Details:</strong>
            <ul className="list-disc list-inside">
              <li>Annual Membership Fee: ₹1000</li>
              <li>
                <b>Membership Valid Until: December of Current Year</b>
              </li>
              <li>Payment via Secure Razorpay Portal</li>
            </ul>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Proceed to Payment (₹1000)
          </button>
        </form>
        {isLoading && <Loading />}
      </div>
    </div>
  );
}
