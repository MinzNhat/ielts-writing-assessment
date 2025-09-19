import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import NavigationBar from "@/components/navigation_bar";
import TopBar from "@/components/top_bar";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: "/favicon.ico",
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
};

const RootLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
	return (
		<html suppressHydrationWarning lang="en">
			<head />

			<body
				className={clsx(
					"min-h-screen text-foreground bg-background font-sans antialiased",
					fontSans.variable,
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					<div className="relative">
						<TopBar />

						<NavigationBar />

						<main className="container mx-auto max-w-7xl pt-[100px] sm:pt-[109px] md:pt-[118px] px-6 min-h-screen">
							{children}
						</main>
					</div>
				</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
