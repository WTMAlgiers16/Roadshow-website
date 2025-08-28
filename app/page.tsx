import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CardGrid from "@/components/card-grid";
import Image from "next/image";
import Footer from "@/components/footer";
import StarBackground from "@/components/startbackground";
        
export default function Home() {
  return (
    <div className="min-h-screen relative">
      <Header/>
      <Hero/>
      <div className="flex gap-2 mb-6">
        <Image src="/icons/location.svg" alt="location" width={0} height={0} className="w-5"/>
        <h2 className="text-white font-bold text-2xl">Current Destination</h2>
      </div>
      <CardGrid/>
      <Footer/>
    </div>
  );
}
