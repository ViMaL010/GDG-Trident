import Chatbot from "../Components/Chatbot"
import FileUpload from "../Components/FileUploadComponent"
import { Campaign } from "../Components/HomeComponent/Campaign"
import { Cta } from "../Components/HomeComponent/Cta"
import { Faq } from "../Components/HomeComponent/Faq"
import { Footer } from "../Components/HomeComponent/Footer"
import { HowItWorks } from "../Components/HomeComponent/HowItWorks"
import { Navbar } from "../Components/HomeComponent/Navbar"
import { WhyChooseUs } from "../Components/HomeComponent/WhyChooseUs"


export function Home() {
    return (
      <div className="overflow-x-hidden"> {/* Add this wrapper to prevent overflow */}
        <Navbar />
        <Chatbot/>
        <Campaign />
        <HowItWorks type="black" />
        {/* <HowItWorks type ="white"/> */}
        <WhyChooseUs />
        <Cta />
        <Faq />
        <Footer />
      </div>
    )
  }