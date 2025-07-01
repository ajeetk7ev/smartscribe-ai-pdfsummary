
import {HeroSection} from "@/components/home/hero-section";
import {FeaturesSection} from "@/components/home/features-section";
import {WorkFlowSection} from "@/components/home/workflow-section";
import {Footer} from "@/components/footer/footer";
import { saveUser } from "@/actions/save-user";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  await saveUser();
  return (
    <div className="bg-gradient-to-br from-white to-slate-100 dark:from-slate-900 dark:to-slate-950 text-slate-900 dark:text-white transition-colors duration-300 ">
    
      {/* Hero Section */}
     <HeroSection/>

      {/* Features */}
     <FeaturesSection/>

      {/* Workflow / Steps */}
      <WorkFlowSection/>

      {/* Footer */}
      <Footer />
    </div>
  );
}
