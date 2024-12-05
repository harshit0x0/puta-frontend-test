import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/items"
import Image from "next/image"

const activities = [
    {
        id: 1,
        title: "Annual Teachers' Conference",
        date: "March 15, 2024",
        description: "A gathering of educators to discuss current trends and challenges in higher education.",
        image: "/placeholder.svg",
    },
    {
        id: 2,
        title: "PUTA Welfare Initiative Launch",
        date: "February 28, 2024",
        description: "Introduction of new welfare programs for PUTA members and their families.",
        image: "/placeholder.svg",
    },
    {
        id: 3,
        title: "Educational Policy Roundtable",
        date: "February 10, 2024",
        description: "Discussion on recent educational policies and their impact on university teachers.",
        image: "/placeholder.svg",
    },
    {
        id: 4,
        title: "Professional Development Workshop",
        date: "January 20, 2024",
        description: "Skill enhancement workshop focusing on modern teaching methodologies and technologies.",
        image: "/placeholder.svg",
    },
    // Add more activities as needed
]

export default function ActivitiesPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-blue-900">PUTA Activities</h1>
            <div className="space-y-8">
                {activities.map((activity) => (
                    <Card key={activity.id} className="overflow-hidden">
                        <div className="md:flex">
                            <div className="md:w-1/3">
                                <Image
                                    src={activity.image}
                                    alt={activity.title}
                                    width={400}
                                    height={300}
                                    className="w-full h-48 md:h-full object-cover"
                                />
                            </div>
                            <div className="md:w-2/3">
                                <CardHeader>
                                    <CardTitle className="text-2xl">{activity.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-blue-700 font-semibold mb-2">{activity.date}</p>
                                    <p className="text-gray-600">{activity.description}</p>
                                </CardContent>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

