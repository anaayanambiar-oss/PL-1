import type { Metadata } from "next";
import { Baloo_2, Plus_Jakarta_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import BottomNav from "@/components/navigation/BottomNav";
import "@/styles/globals.css";


const baloo = Baloo_2({
 subsets: ["latin"],
 weight: ["400", "600", "700", "800"],
 variable: "--font-display",
 display: "swap",
});


const jakarta = Plus_Jakarta_Sans({
 subsets: ["latin"],
 weight: ["400", "500", "600", "700"],
 variable: "--font-body",
 display: "swap",
});


export const metadata: Metadata = {
 title: {
   default: "PoliticaLearn — Learn. Lead. Change.",
   template: "%s | PoliticaLearn",
 },
 description:
   "The first civic education platform built for Indian children aged 7–13.",
};


export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
   <ClerkProvider>
     <html lang="en" className={`${baloo.variable} ${jakarta.variable}`}>
       <body className="font-body antialiased bg-cream text-ink">
         {children}


         {/*
           BottomNav renders on all pages but hides itself on desktop (md:hidden).
           It only appears when the user is inside the app (dashboard/lessons/society).
           Pages like landing, sign-in, sign-up, onboarding won't show it because
           BottomNav checks the pathname and returns null for those routes.
         */}
         <BottomNav />
       </body>
     </html>
   </ClerkProvider>
 );
}





