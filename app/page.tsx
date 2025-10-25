import {FeaturesSection} from "@/components/home/features-section";
import {WorkFlowSection} from "@/components/home/workflow-section";
import {Footer} from "@/components/footer/footer";
import { saveUser } from "@/actions/save-user";
import SummarizePdf from "@/components/home/summarize-section";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function HomePage() {

  const {userId:clerkId} = await auth();

  if(!clerkId){
    redirect("/sign-in");
  }

  await saveUser();
  return (
    <div className="bg-gradient-to-br from-white to-slate-100 dark:from-slate-900 dark:to-slate-950 text-slate-900 dark:text-white transition-colors duration-300 ">
    
      {/* Hero Section */}
      <SummarizePdf/>

      {/* Features */}
     <FeaturesSection/>

      {/* Workflow / Steps */}
      <WorkFlowSection/>

      {/* Footer */}
      <Footer />
    </div>
  );
}
