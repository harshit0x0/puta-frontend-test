import React from 'react';

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-blue-900 mb-4">About PUTA</h1>
                <p className="mb-8 text-gray-700 text-center max-w-3xl mx-auto">
                    The Pantnagar Union of Teachers Association (PUTA) is a dedicated organization
                    committed to representing and supporting the teaching community at Pantnagar.
                    Established to protect and promote the interests of our members, PUTA strives
                    to enhance the quality of education and ensure fair treatment for all teachers.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-semibold text-blue-800 mb-4">Our Mission</h2>
                    <ul className="space-y-3 text-gray-700">
                        <li>• Advocate for teachers' rights and professional development</li>
                        <li>• Promote academic excellence and educational standards</li>
                        <li>• Foster a collaborative and supportive academic environment</li>
                        <li>• Provide a platform for collective representation</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-blue-800 mb-4">Key Objectives</h2>
                    <ul className="space-y-3 text-gray-700">
                        <li>• Negotiate fair compensation and working conditions</li>
                        <li>• Organize professional development workshops</li>
                        <li>• Support research and academic initiatives</li>
                        <li>• Provide legal and professional guidance to members</li>
                    </ul>
                </div>
            </div>

            <div className="mt-12 bg-blue-50 p-8 rounded-lg">
                <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center">
                    Leadership and Governance
                </h2>
                <p className="text-gray-700 text-center max-w-2xl mx-auto">
                    PUTA is governed by an elected executive committee dedicated to transparency,
                    democratic principles, and the continuous improvement of our academic community.
                    Our leadership is committed to serving the collective interests of teachers
                    across various disciplines and institutions in Pantnagar.
                </p>
            </div>

            <div className="text-center mt-12">
                <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                    Join Us in Our Mission
                </h2>
                <p className="text-gray-700 max-w-2xl mx-auto">
                    Whether you're a seasoned professor or a new lecturer, PUTA welcomes
                    educators who are passionate about making a difference in the academic
                    landscape of Pantnagar.
                </p>
            </div>
        </div>
    )
}