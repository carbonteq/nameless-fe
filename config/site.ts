export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Nameless",
	description: "Intern stuff",
	navItems: [
		{
			label: "Docs",
			href: "/docs",
		},
		{
			label: "About",
			href: "/about",
		},
		{
			label: "Sign In",
			href:"/signin"
		}
	],
};
