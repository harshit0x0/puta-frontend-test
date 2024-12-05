import Image from 'next/image'

export default function PresidentMessage() {
    return (
        <section className="my-12 bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-blue-900">Message from the President</h2>
            <div className="flex flex-col md:flex-row gap-6 lg:p-6">
                <Image
                    src="/pramod_mall.jpg"
                    alt="PUTA President"
                    width={200}
                    height={200}
                    className="rounded-lg mx-auto lg:my-0 my-5"
                />
                <div>
                    <h3 className="text-3xl font-bold mb-6 text-center">Dr. Pramod Mall</h3>
                    <p className="text-gray-700 md:px-4">
                        Welcome to the Pantnagar Union of Teachers Association (PUTA) website. As educators,
                        we play a crucial role in shaping the future of our society. PUTA is committed to
                        supporting our members, advocating for their rights, and promoting excellence in
                        education. Together, we can create a better working environment for teachers and
                        enhance the quality of education at Pantnagar.
                    </p>
                </div>
            </div>
        </section>
    )
}

