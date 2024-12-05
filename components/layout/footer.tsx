import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-gray-200 text-gray-700 py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/members">Our Members</Link></li>
                            <li><Link href="/activities">Activities</Link></li>
                            <li><Link href="/news">News & Updates</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><Link href="/documents">Important Documents</Link></li>
                            <li><Link href="/benefits">Member Benefits</Link></li>
                            <li><Link href="/join">Join PUTA</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <p>Pantnagar Union of Teachers Association</p>
                        <p>G.B. Pant University of Agriculture and Technology</p>
                        <p>Pantnagar, Uttarakhand, India</p>
                        <p>Email: contact@puta.org</p>
                        <p>Phone: +91-9194920545</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <ul className="space-y-2">
                            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p>&copy; {new Date().getFullYear()} Pantnagar Union of Teachers Association (PUTA). All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

