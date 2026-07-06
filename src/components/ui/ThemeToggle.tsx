import { Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

function applyTheme(theme: Theme) {
	if (theme === "dark") {
		document.documentElement.classList.add("dark");
	} else if (theme === "light") {
		document.documentElement.classList.remove("dark");
	} else {
		// system
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		if (prefersDark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}
}

/**
 * Compact icon-only theme toggle for the navbar. Cycles light <-> dark
 * (sets an explicit preference); the footer's ThemeToggle remains the
 * full 3-state control including "system".
 */
export function ThemeToggleButton({ className = "" }: { className?: string }) {
	const [mounted, setMounted] = useState(false);
	const [isDark, setIsDark] = useState(false);

	// Track the effective mode, including changes made from the footer control
	useEffect(() => {
		setMounted(true);
		const root = document.documentElement;
		setIsDark(root.classList.contains("dark"));
		const observer = new MutationObserver(() => {
			setIsDark(root.classList.contains("dark"));
		});
		observer.observe(root, { attributes: true, attributeFilter: ["class"] });
		return () => observer.disconnect();
	}, []);

	const toggle = useCallback(() => {
		const next = !document.documentElement.classList.contains("dark");
		applyTheme(next ? "dark" : "light");
		localStorage.setItem("theme", next ? "dark" : "light");
	}, []);

	return (
		<button
			type="button"
			onClick={toggle}
			aria-label={
				mounted && isDark ? "Switch to light mode" : "Switch to dark mode"
			}
			className={`flex items-center justify-center transition-colors ${className}`}
		>
			{mounted && !isDark ? (
				<Sun size={20} aria-hidden="true" />
			) : (
				<Moon size={20} aria-hidden="true" />
			)}
		</button>
	);
}

export function ThemeToggle() {
	const [theme, setTheme] = useState<Theme>("system");

	// Read stored preference on mount
	useEffect(() => {
		const stored = localStorage.getItem("theme") as Theme | null;
		if (stored === "light" || stored === "dark") {
			setTheme(stored);
		} else {
			setTheme("system");
		}
	}, []);

	// Listen for system preference changes when in system mode
	useEffect(() => {
		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		const handler = () => {
			if (theme === "system") {
				applyTheme("system");
			}
		};
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, [theme]);

	const setAndApply = useCallback((next: Theme) => {
		setTheme(next);
		applyTheme(next);
		if (next === "system") {
			localStorage.removeItem("theme");
		} else {
			localStorage.setItem("theme", next);
		}
	}, []);

	const options: { value: Theme; icon: string; label: string }[] = [
		{ value: "light", icon: "ri-sun-line", label: "Light" },
		{ value: "system", icon: "ri-computer-line", label: "System" },
		{ value: "dark", icon: "ri-moon-line", label: "Dark" },
	];

	return (
		<div className="inline-flex items-center rounded-md border border-zinc-200 p-0.5 dark:border-zinc-800">
			{options.map((opt) => (
				<button
					key={opt.value}
					type="button"
					onClick={() => setAndApply(opt.value)}
					aria-label={opt.label}
					className={`flex items-center justify-center rounded-md px-2 py-1.5 text-sm transition-colors ${
						theme === opt.value
							? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white"
							: "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
					}`}
				>
					<i className={`${opt.icon} text-sm`} />
				</button>
			))}
		</div>
	);
}
