import { Code } from "@nextui-org/code";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { button as buttonStyles } from "@nextui-org/theme";

import { subtitle, title } from "@/components/primitives";
import { siteConfig } from "@/config/site";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>NAMELESS&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>or smth&nbsp;</h1>
				<br />
			</div>
		</section>
	);
}
