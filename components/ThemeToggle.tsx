"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return <div className="h-8 w-8" />;
	}

	return (
		<button
			type="button"
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			className="flex h-8 w-8 items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-card hover:text-primary focus:outline-none"
			aria-label="Toggle theme"
		>
			{theme === "dark" ? (
				<IconSun className="size-5" />
			) : (
				<IconMoon className="size-5" />
			)}
		</button>
	);
}
