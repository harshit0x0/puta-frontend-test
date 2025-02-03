"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import jsPDF from "jspdf";

export default function SuccessRegistration() {
  // Get user info and payment info from URL
  const [status, setStatus] = useState(true);
  const searchParams = useSearchParams();
  const userData = searchParams.get("userData");
  const paymentData = searchParams.get("paymentData");

  // Parse user info and payment info
  const userInfo = JSON.parse(userData!);
  const paymentInfo = paymentData;

  useEffect(() => {
    if (!userInfo) {
      console.log("member not found");
      setStatus(false);
    } else {
      console.log("member found");
      console.log(userInfo);
      setStatus(true);
    }
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Registration Receipt", 90, 20);

    // Sub-header
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Thank you for registering with us!", 90, 30);
    doc.text("Payment Details:", 20, 40);

    // Table for Payment Info
    doc.setFont("helvetica", "bold");
    doc.text("Payment ID:", 20, 50);
    doc.setFont("helvetica", "normal");
    doc.text(paymentInfo ?? "", 60, 50);

    // User Details Section
    doc.setFont("helvetica", "bold");
    doc.text("User Information:", 20, 70);

    const userDetails = [
      ["Name", userInfo.name],
      ["Position", userInfo.position],
      ["College", userInfo.college],
      ["Designation", userInfo.designation],
      ["Department", userInfo.department],
      ["Role", userInfo.role],
      ["End of Membership", userInfo.endOfMembership],
      ["Mobile No", userInfo.mobileNo],
    ];

    // Table formatting for User Details
    let startY = 80;
    userDetails.forEach(([key, value]) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${key}:`, 20, startY);
      doc.setFont("helvetica", "normal");
      doc.text(value ?? "", 70, startY);
      startY += 10;
    });

    // Footer
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("This is a system-generated receipt.", 20, startY + 10);

    // Save PDF
    doc.save("Registration_Receipt.pdf");
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-6 xl:p-6 mt-20">
      {status && (
        <div className="bg-green-200 text-center rounded shadow-md p-4 md:p-6 lg:p-6 xl:p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Registration Successful!
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Thank you for registering with us! Your payment of ₹1000 has been
            successfully processed.
          </p>
          <h3 className="text-xl mt-4 bg-gray-50 w-fit py-4 px-6 m-5 mx-auto font-bold text-gray-700 mb-1">
            PaymentID: {paymentInfo}
          </h3>
          <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-center mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-700 mb-1">
                {userInfo.name}
              </h3>
              <p className="text-sm text-gray-600">{userInfo.position}</p>
            </div>
          </div>
          <p className="text-lg text-gray-600 mb-4">
            Your membership details are as follows:
          </p>
          <ul className="list-none mb-4">
            <li className="text-sm text-gray-600 mb-2">
              College: {userInfo.college}
            </li>
            <li className="text-sm text-gray-600 mb-2">
              Designation: {userInfo.designation}
            </li>
            <li className="text-sm text-gray-600 mb-2">
              Department: {userInfo.department}
            </li>
            <li className="text-sm text-gray-600 mb-2">
              Role: {userInfo.role}
            </li>
            <li className="text-sm text-gray-600 mb-2">
              End of Membership: {userInfo.endOfMembership}
            </li>
            <li className="text-sm text-gray-600 mb-2">
              Mobile No: {userInfo.mobileNo}
            </li>
          </ul>
          <button
            onClick={downloadPDF}
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            Download as PDF
          </button>
        </div>
      )}
      {!status && (
        <div className="bg-gray-300 text-center rounded shadow-md p-4 md:p-6 lg:p-6 xl:p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Registration on hold.
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Thank you for registering with us! Your payment is under process. Do
            not worry, if you have made the payment. Please contact the
            president for further clarification along with payment proof.
          </p>
          <button
            onClick={downloadPDF}
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            Download as PDF
          </button>
        </div>
      )}
    </div>
  );
}
