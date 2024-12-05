import Image from 'next/image'

export default function Header() {
    return (
        <header className="bg-blue-200 shadow-md py-4">
            <div className="container mx-auto px-4 py-4 flex items-center ">
                <Image
                    src="/pantnagar-logo.png"
                    alt="PUTA Logo"
                    width={100}
                    height={100}
                    className="mr-4"
                />
                <div className="center ">
                    <h1 className="lg:text-3xl text-xl font-bold text-red-500 lg:mb-3">
                        Pantnagar Union of Teachers Association (PUTA)
                    </h1>
                    <h2 className="text-xl text-blue-700">
                        पंतनगर शिक्षक संघ
                    </h2>
                </div>
            </div>
        </header>
    )
}

