import {  SignUp } from "@clerk/nextjs";



export default function SignUpPage() {
    return (
        <div className="w-screen h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
            <SignUp/>
        </div>
    )
}