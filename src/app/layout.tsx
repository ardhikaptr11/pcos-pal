import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";

const fraunces = Fraunces({
	variable: "--font-serif",
	subsets: ["latin"],
	display: "swap"
});

const plusJakartaSans = Plus_Jakarta_Sans({
	variable: "--font-sans",
	subsets: ["latin"],
	display: "swap"
});

export const metadata: Metadata = {
	title: "PCOS Pal — PCOS Screening Companion",
	description:
		"Evaluate Polycystic Ovary Syndrome (PCOS) risk with our AI-powered clinical screening tool. Input health indicators for a fast, data-driven assessment.",
	icons: {
		icon: "/pcos-pal-logo.png"
	}
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={cn("h-full", "antialiased", fraunces.variable, plusJakartaSans.variable)}
			suppressHydrationWarning>
			<body className="min-h-full flex flex-col">
				<ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
					<TooltipProvider>{children}</TooltipProvider>
				</ThemeProvider>
				<Toaster position="top-center" theme="light" richColors />
			</body>
		</html>
	);
}
