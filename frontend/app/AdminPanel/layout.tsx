import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "saudi dentists Admin Panel",
  description: "your way to know all the dentists in saudi arabia ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <nav className="flex justify-start z-10 gap-2 items-center py-4 px-8 bg-white sticky top-0">
            <Link href={"/AdminPanel/Requests"} className="flex p-2 font-bold text-custom-grayDark justify-center bg-custom-grayLight rounded-lg border border-custom-grayLight hover:border-custom-dark transition-all text-sm gap-1 items-center">
                Requests
            </Link>
            <Link href={"/AdminPanel/Dentists"}  className="flex p-2 font-bold text-custom-grayDark justify-center bg-custom-grayLight rounded-lg border border-custom-grayLight hover:border-custom-dark transition-all text-sm gap-1 items-center">
                Dentists
            </Link>
        </nav>
        {children}
    </div>
  );
}
