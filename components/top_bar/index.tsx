"use client";

import { usePathname } from "next/navigation";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const TopBar = (): JSX.Element => {
	const { theme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const pathname = usePathname();
	const isAssessmentRoute = pathname === "/assessment";

	useEffect(() => {
		setMounted(true);
	}, []);

	// Prevent hydration mismatch by using default theme until mounted
	const isDark = mounted ? theme === "dark" : false;

	return (
		isAssessmentRoute ? <></> :
			(
				<div
					className="fixed top-0 left-0 w-full h-[50px] py-[10px] transition-all duration-300 border-b-[0.5px] border-gray-300 dark:border-gray-700 z-50"
					style={{
						background: isDark
							? `
						radial-gradient(circle at center, rgba(30,30,40,0.9) 70%, transparent 100%),
						radial-gradient(circle at 0% 30%, rgba(173,216,255,0.25), transparent 65%),
						radial-gradient(circle at 20% 30%, rgba(180,220,250,0.25), transparent 65%),
						radial-gradient(circle at 70% 90%, rgba(180,220,250,0.25), transparent 65%),
						radial-gradient(circle at 70% 100%, rgba(173,216,255,0.25), transparent 65%)`
							: `
						radial-gradient(circle at center, rgba(255,255,255,1) 70%, transparent 100%),
						radial-gradient(circle at 0% 30%, rgba(173,216,255,0.25), transparent 65%),
						radial-gradient(circle at 20% 30%, rgba(180,220,250,0.25), transparent 65%),
						radial-gradient(circle at 70% 90%, rgba(180,220,250,0.25), transparent 65%),
						radial-gradient(circle at 70% 100%, rgba(173,216,255,0.25), transparent 65%)`,
						backdropFilter: "blur(40px) saturate(180%) brightness(1.2)",
						WebkitBackdropFilter: "blur(40px) saturate(180%) brightness(1.2)",
					}}
				>
					<div className="w-full h-full flex items-center justify-center text-xs sm:text-sm md:text-md gap-2 sm:gap-3 md:gap-4 px-2 sm:px-4">
						<span
							className="font-semibold bg-clip-text text-transparent bg-gradient-to-r dark:from-purple-300 dark:via-pink-300 dark:to-blue-300 from-indigo-400 via-pink-400 to-indigo-400 text-center hidden sm:block"
						>
							Practice, assess, and improve your IELTS writing skills
						</span>

						<span
							className="font-semibold bg-clip-text text-transparent bg-gradient-to-r dark:from-purple-300 dark:via-pink-300 dark:to-blue-300 from-indigo-400 via-pink-400 to-indigo-400 text-center block sm:hidden"
						>
							IELTS Writing AI Assessment
						</span>

						<div
							className="ml-1 sm:ml-2 md:ml-3 rounded-full p-[1px] sm:p-[1.5px] bg-gradient-to-r dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 from-indigo-400 via-pink-400 to-indigo-400"
						>
							<Button
								as={Link}
								href="/chat"
								size="sm"
								radius="full"
								className="h-6 sm:h-7 px-2 sm:px-3 md:px-4 text-xs font-medium rounded-full dark:bg-gray-900 dark:text-white bg-white text-foreground"
							>
								<span className="hidden sm:inline">Start 🚀</span>
								<span className="inline sm:hidden">🚀</span>
							</Button>
						</div>
					</div>
				</div>
			)
	)
};

export default TopBar;
