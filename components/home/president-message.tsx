import Image from "next/image";

export default function PresidentMessage() {
  return (
    <section className="my-12 bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-blue-900">
        From the desk of the President
      </h2>
      <div className="flex flex-col md:flex-row gap-6 lg:p-6">
        <Image
          src="/pramod_mall.jpg"
          alt="PUTA President"
          width={200}
          height={200}
          className="rounded-lg mx-auto lg:my-10 my-5 max-h-60"
        />
        <div>
          <h3 className="text-3xl font-bold mb-6 text-center">
            Dr. Pramod Mall
          </h3>
          <p className="text-gray-700 md:px-4">
            As President of the Pant University Teachers Association (PUTA), I
            am writing to you today to reaffirm our collective commitment to the
            well-being of our faculty and the continued excellence of Pant
            University. These are challenging times for our university, but
            together, we can navigate these hurdles and emerge more stronger.
            This preamble serves as a beacon for our association, outlining our
            commitment to the well-being of our members and the betterment of
            education as a whole. By working together, we can create a thriving
            educational environment where educators are valued, supported, and
            empowered to reach their full potential. We, the educators united
            under the banner of the Pant University Teacher’s Association do
            hereby establish this association to champion the welfare of our
            fellow teachers and, consequently, the future of education.
            Recognizing the profound impact teachers have on shaping young minds
            and fostering lifelong learning. The PUTA is dedicated to supporting
            and advocating for all our esteemed faculty members ! We understand
            the unique challenges you face in nurturing the next generation of
            agricultural leaders. Whether you&#39;re a seasoned educator or just
            starting out, our association is here to provide you with the
            resources and support you need to thrive. We believe that teachers
            deserve to be valued professionals, respected for their expertise
            and dedication. This association strives to create a working
            environment that fosters professional growth, fair compensation, and
            recognition for exceptional contributions. We acknowledge the
            strength in unity. This association aims to build a strong network
            of teachers who can share best practices, provide peer support, and
            collaborate on innovative educational approaches. Through this
            collective effort, we strive to create an education, research and
            extension ecosystem that empowers teachers, fosters innovation, and
            ultimately, enriches the learning experience for all students. Our
            strength lies in unity. I encourage you to actively participate in
            association meetings, share your concerns and ideas, and join us in
            our endeavours. Together, we can build a vibrant academic
            environment that attracts and retains top talent, fosters excellence
            in teaching and research, and extension, as Pant University has been
            a leader across the agriculture and Technology educational landscape
            in India and abroad.
            <br />
            <b> Dr Pramod Mall </b>
            <b> President, Pant University Teachers Association (PUTA) </b>
          </p>
        </div>
      </div>
    </section>
  );
}
