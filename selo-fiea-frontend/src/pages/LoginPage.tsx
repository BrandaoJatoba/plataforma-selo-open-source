// src/pages/LoginPage.tsx

import { useSearchParams } from "react-router-dom"; 
import { AuthForm } from "../components/AuthForm";
import { Footer } from "../components/Footer";
import { LoginHeader } from "../components/LoginHeader";

export function LoginPage() {
    const [searchParams] = useSearchParams(); 
    const initialTab = searchParams.get('tab'); 

    return (
        <>
            <LoginHeader />
            <main className="hero-bg flex items-center justify-center min-h-screen py-12 px-4">
                <AuthForm initialTab={initialTab} />
            </main>
            <Footer />
        </>
    )
}