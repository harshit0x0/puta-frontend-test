import { Member } from "@/app/types";
import Razorpay from "razorpay";

const loadScript = (src: string) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

async function addMember(formData: Member) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
    if (data.status != "success") {
      throw new Error("Failed to add member");
    }
    return data.result;
  } catch (error) {
    console.log(error);
    alert("Something went wrong. Please try again.");
    return null;
  }
}

export async function displayRazorpay(
  formData: Member,
  navigate: (paymentInfo: string, userData: Member | null) => void
) {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  // creating a new order
  const orderDetails = {
    amount: 1000,
    currency: "INR",
  };

  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/gateway/createOrder`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      }
    );

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }
    // Getting the order details back
    const order = await result.json();
    const { amount, orderId: order_id, currency } = order;
    console.log({ amount, order_id, currency });
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amount.toString(),
      currency: currency,
      name: "PUTA",
      description: "Registration for PUTA membership",
      // image: { logo },
      order_id: order_id,
      handler: async function (response: any) {
        if (
          !response ||
          !response.razorpay_payment_id ||
          !response.razorpay_signature
        ) {
          alert("Something went wrong. Please try again.");
          if (response) console.log(response);
          return;
        }
        const data = {
          razorpay_order_id: order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/gateway/verifyPayment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const result = await res.json();
        if (result.status === "success") {
          const paymentInfo = JSON.stringify(data.razorpay_payment_id);
          const member = await addMember(formData);
          navigate(paymentInfo, member);
        } else {
          alert(
            "Something went wrong, Payment not Completed. Please try again."
          );
        }
      },
      prefill: {
        name: formData.name,
        college: formData.college,
        designation: formData.designation,
        department: formData.department,
        contact: formData.mobileNo,
      },
      notes: {
        address: "Pantnagar, Uttarakhand",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  } catch (error) {
    console.log(error);
    alert("Something went wrong. Please try again.");
  }
}
