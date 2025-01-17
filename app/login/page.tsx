"use client";
import React, { useState } from "react";
import { loginFormSchema } from "@/lib/definitions";
import { loginUser } from "../actions";

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    name: "",
    password: "",
  });

  const [errors, setErrors] = useState<string[] | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validatedFeilds = loginFormSchema.safeParse(credentials);
    if (!validatedFeilds.success) {
      const errors = validatedFeilds.error.issues.map((issue) => issue.message);
      setErrors(errors);
      return;
    } else {
      setErrors(null);
    }
    try {
      const res = await loginUser(credentials.name, credentials.password);
      if (res.status === 200) {
        alert(res.message);
        window.location.href = "/";
      } else {
        setErrors([res.message]);
        console.log(res.status, res.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors(["An error occurred during login"]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">
          PUTA Admin Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              name="name"
              value={credentials.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </form>
        {errors && (
          <div className="mt-4 text-red-500">
            {errors.map((error, index) => (
              <p key={index}>• {error}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
