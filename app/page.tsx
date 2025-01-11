import Link from "next/link";

export default function MainPage() {
  return (
    <div className="flex flex-col items-center bg-home-image bg-black bg-cover bg-center">
      <main className="flex max-w-5xl h-dvh flex-col items-center justify-center mx-auto">
        <div className="flex flex-col items-center gap-6 p-12 rounded-lg bg-black bg-opacity-90 text-white w-full sm:max-w-96 sm:text-2xl mx-auto">
           <h1 className="text-4xl font-bold">Repair Shop</h1>
           <address>
            123 Main St<br />
            Anytown, USA
           </address>
           <p>Open 24/7 </p>
           <Link href="tel:+1234567890" className="hover:underline">+1 (234) 567-890</Link>
        </div>
      </main>
    </div>
  );
}
