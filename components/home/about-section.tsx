// import Image from 'next/image'
// export default function Home() {
//     return (
//         <div className="flex flex-col">
//             <div className="container px-0 mx-auto">
//                 <h1 className="text-xl lg:text-3xl font-bold mb-4 bg-blue-500 px-6 py-3 w-fit text-white">About PUTA</h1>
//                 <div className="flex flex-col-reverse md:flex-row">
//                     <div className="lg:w-1/2">
//                         <p className="md:px-3 px-4 text-lg md:py-4">
//                             The Pantnagar Union of Teachers Association (PUTA) is a dedicated organization
//                             committed to representing and supporting the teaching community at Pantnagar.
//                             Established to protect and promote the interests of our members, PUTA strives
//                             to enhance the quality of education and ensure fair treatment for all teachers.
//                         </p>
//                     </div>
//                     <div className="grid w-fit gap-8 grid-cols-2 my-4 lg:my-0 mx-auto">
//                         <Image
//                             src="/pic.jpeg"
//                             alt="PUTA Logo"
//                             width={80}
//                             height={80}
//                             className="mx-auto border-2"
//                         />
//                         <Image
//                             src="/pantnagar-logo.png"
//                             alt="PUTA Logo"
//                             width={80}
//                             height={80}
//                             className="mx-auto border-2"
//                         />
//                         <Image
//                             src="/info.png"
//                             alt="PUTA Logo"
//                             width={80}
//                             height={80}
//                             className="mx-auto border-2"
//                         />
//                         <Image
//                             src="/members.png"
//                             alt="PUTA Logo"
//                             width={80}
//                             height={80}
//                             className="mx-auto border-2"
//                         />

//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

import { Users, Megaphone, ShieldCheck } from 'lucide-react'

const features = [
    {
        name: 'Unity',
        description: 'Fostering solidarity among teachers for collective action.',
        icon: Users,
    },
    {
        name: 'Advocacy',
        description: 'Representing teachers interests and rights.',
        icon: Megaphone,
    },
    {
        name: 'Welfare',
        description: 'Promoting the well-being of our members.',
        icon: ShieldCheck,
    },
]

export default function AboutSection() {
    return (
        <section className="my-12 px-6">
            <h2 className="text-3xl font-bold mb-6 text-blue-900 text-center">About PUTA</h2>
            <p className="mb-8 text-gray-700 text-center max-w-3xl mx-auto">
                The Pantnagar Union of Teachers Association (PUTA) is a dedicated organization
                committed to representing and supporting the teaching community at Pantnagar.
                Established to protect and promote the interests of our members, PUTA strives
                to enhance the quality of education and ensure fair treatment for all teachers.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature) => (
                    <div key={feature.name} className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
                        <feature.icon className="h-12 w-12 text-blue-700 mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold mb-2 text-center">{feature.name}</h3>
                        <p className="text-gray-600 text-center">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

