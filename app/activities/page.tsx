"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/items";
import Image from "next/image";
import { Activity } from "../types";

// const activities: Activity[] = [
//   {
//     name: "Annual Teachers' Conference",
//     description:
//       "A gathering of educators to discuss current trends and challenges in higher education.",
//     fileType: "image",
//     cloudinaryId: "image1",
//     url: "",
//   },
//   {
//     name: "PUTA Welfare Initiative Launch",
//     description:
//       "Introduction of new welfare programs for PUTA members and their families.",
//     fileType: "image",
//     cloudinaryId: "image1",
//     url: "",
//   },
//   {
//     name: "Educational Policy Roundtable",
//     description:
//       "Discussion on recent educational policies and their impact on university teachers.",
//     fileType: "image",
//     cloudinaryId: "image1",
//     url: "",
//   },
//   {
//     name: "Professional Development Workshop",
//     description:
//       "Skill enhancement workshop focusing on modern teaching methodologies and technologies.",
//     fileType: "image",
//     cloudinaryId: "image1",
//     url: "",
//   },
//   // Add more activities as needed
// ];

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  useEffect(() => {
    // Fetch activities from the server
    async function fetchActivities() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/activities`
        );
        const data = await response.json();
        console.log("Fetched activities:", data.files);
        const fetchedActivities = data.files.map((activity: Activity) => {
          //change date to ISO format
          const date = new Date(activity?.createdAt ?? "");
          activity.createdAt = date.toDateString();
          return activity;
        });
        setActivities(fetchedActivities);
      } catch (error) {
        console.error("Error fetching activities:", error);
        return [];
      }
    }
    fetchActivities();
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-900">
        PUTA Activities
      </h1>
      <div className="space-y-8">
        {activities.map((activity, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <Image
                  src={activity?.url ?? "/placeholder.png"}
                  alt={activity.name}
                  width={400}
                  height={300}
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
              <div className="md:w-2/3">
                <CardHeader>
                  <CardTitle className="text-2xl">{activity.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-700 font-semibold mb-2">
                    {activity.createdAt || "Date unknown"}
                  </p>
                  <p className="text-gray-600">{activity.description}</p>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
