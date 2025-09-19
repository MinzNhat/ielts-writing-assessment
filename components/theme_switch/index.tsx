"use client";

import { FC, useEffect, useState } from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { useTheme } from "next-themes";
import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";
import clsx from "clsx";
import { Key } from "react";
import { ThemeSwitchProps } from "./type";

const ThemeSwitch = ({ className }: ThemeSwitchProps): JSX.Element => {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Prevent hydration mismatch by using default theme until mounted
	const selectedKey = mounted ? (theme === "dark" ? "dark" : "light") : "light";

	const handleChange = (key: Key) => {
		setTheme(key === "dark" ? "dark" : "light");
	};

	return (
		<Tabs
			selectedKey={selectedKey}
			onSelectionChange={handleChange}
			className={clsx("w-auto", className)}
			aria-label="Theme switch"
		>
			<Tab
				key="light"
				title={<SunFilledIcon size={22} />}
				aria-label="Switch to light mode"
			/>
			<Tab
				key="dark"
				title={<MoonFilledIcon size={22} />}
				aria-label="Switch to dark mode"
			/>
		</Tabs>
	);
};

export default ThemeSwitch;
