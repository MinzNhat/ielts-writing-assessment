export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "IELTS Assessment",
	description: "An application to help you assess your IELTS writing skills.",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "Assessment",
			href: "/assessment",
		},
		{
			label: "About",
			href: "/#about",
		},
		{
			label: "Rating",
			href: "/#rating",
		},
	],
	navMenuItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "Assessment",
			href: "/assessment",
		},
		{
			label: "About",
			href: "/#about",
		},
		{
			label: "Rating",
			href: "/#rating",
		},
	],
	links: {
		github: "https://github.com/MinzNhat",
		twitter: "https://twitter.com/",
		docs: "/assessment",
		discord: "https://discord.gg/",
		sponsor: "https://github.com/MinzNhat",
	},
};
