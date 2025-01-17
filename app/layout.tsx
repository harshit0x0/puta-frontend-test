import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import NavMenu from "@/components/layout/nav-menu";
import { getUser } from "./actions";

export const metadata: Metadata = {
  title: "PUTA - Pantnagar Union of Teachers Association",
  description: "Official website of Pantnagar Union of Teachers Association",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // async function getUser(){
  //   "use server";

  // }
  const user = await getUser();
  if (user.status === 401) {
    console.log("Unauthorized");
  } else {
    console.log("Authorized");
  }

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />
          <NavMenu user={user.data} />
          <main className="flex-1 bg-white">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
