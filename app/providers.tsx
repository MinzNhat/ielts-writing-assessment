"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Props for the Providers component.
 * @interface ProvidersProps
 */
export interface ProvidersProps {
	/**
	 * The children components to be wrapped by the Providers.
	 */
	children: React.ReactNode;
	/**
	 * Optional theme properties for the ThemeProvider.
	 */
	themeProps?: ThemeProviderProps;
};

/**
 * Augment the RouterConfig interface to include routerOptions.
 */
declare module "@react-types/shared" {
	interface RouterConfig {
		routerOptions: NonNullable<
			Parameters<ReturnType<typeof useRouter>["push"]>[1]
		>;
	}
};

/**
 * Providers component that wraps children
 */
export function Providers({ children, themeProps }: ProvidersProps) {
	const router = useRouter();

	return (
		<HeroUIProvider navigate={router.push}>
			<NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
		</HeroUIProvider>
	);
};
