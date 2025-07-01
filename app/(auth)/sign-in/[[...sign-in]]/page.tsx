import { SignIn } from "@clerk/nextjs";



export default function SignInPage() {
    return (
        <div className="w-screen h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
            <SignIn/>
        </div>
    )
}