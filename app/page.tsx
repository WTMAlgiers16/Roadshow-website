import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CardGrid from "@/components/card-grid";
import Image from "next/image";
import Footer from "@/components/footer";
        
export default function Home() {
  return (
    <div className="min-h-screen">
      <Header/>
      <Hero/>
      <div className="flex gap-2 mb-6 mt-52">
        <Image src="/icons/location.svg" alt="location" width={0} height={0} className="w-5"/>
        <h2 className="text-white font-semibold tracking-widest text-5xl font-lemon">Current Destination</h2>
      </div>
      <CardGrid/>
      <Footer/>
    </div>
  );
}
