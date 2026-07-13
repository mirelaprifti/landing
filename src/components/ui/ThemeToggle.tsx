import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type Theme = "light" | "dark" | "system";

let transitionTimeout: number | undefined;

function applyTheme(theme: Theme) {
	// Briefly enable color transitions so the mode change cross-fades
	const root = document.documentElement;
	root.classList.add("theme-transition");
	window.clearTimeout(transitionTimeout);
	transitionTimeout = window.setTimeout(() => {
		root.classList.remove("theme-transition");
	}, 300);

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
 * Compact theme control for the navbar. The icon shows the effective mode;
 * clicking opens a Light / Dark / System menu so users can also return to
 * following their OS preference.
 */
export function ThemeToggleButton({ className = "" }: { className?: string }) {
	const [mounted, setMounted] = useState(false);
	const [isDark, setIsDark] = useState(false);
	const [theme, setTheme] = useState<Theme>("system");
	const [open, setOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	// Track the effective mode and the stored preference
	useEffect(() => {
		setMounted(true);
		const root = document.documentElement;
		setIsDark(root.classList.contains("dark"));
		const stored = localStorage.getItem("theme") as Theme | null;
		setTheme(stored === "light" || stored === "dark" ? stored : "system");
		const observer = new MutationObserver(() => {
			setIsDark(root.classList.contains("dark"));
		});
		observer.observe(root, { attributes: true, attributeFilter: ["class"] });
		return () => observer.disconnect();
	}, []);

	// Follow OS preference changes while in system mode
	useEffect(() => {
		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		const handler = () => {
			if (theme === "system") applyTheme("system");
		};
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, [theme]);

	// Close menu on outside click or Escape
	useEffect(() => {
		if (!open) return;
		const handlePointer = (e: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		document.addEventListener("mousedown", handlePointer);
		document.addEventListener("keydown", handleKey);
		return () => {
			document.removeEventListener("mousedown", handlePointer);
			document.removeEventListener("keydown", handleKey);
		};
	}, [open]);

	const selectTheme = useCallback((next: Theme) => {
		setTheme(next);
		applyTheme(next);
		if (next === "system") {
			localStorage.removeItem("theme");
		} else {
			localStorage.setItem("theme", next);
		}
		setOpen(false);
	}, []);

	const options: { value: Theme; icon: typeof Sun; label: string }[] = [
		{ value: "light", icon: Sun, label: "Light" },
		{ value: "dark", icon: Moon, label: "Dark" },
		{ value: "system", icon: Monitor, label: "System" },
	];

	return (
		<div ref={menuRef} className="relative">
			<button
				type="button"
				onClick={() => setOpen((o) => !o)}
				aria-haspopup="menu"
				aria-expanded={open}
				aria-label="Change theme"
				className={`flex items-center justify-center transition-colors ${className}`}
			>
				{mounted && !isDark ? (
					<Sun size={20} aria-hidden="true" />
				) : (
					<Moon size={20} aria-hidden="true" />
				)}
			</button>

			{open && (
				<div
					role="menu"
					aria-label="Theme"
					className="absolute top-full right-0 z-50 mt-2 w-36 overflow-hidden rounded-md border border-zinc-300 bg-white py-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
				>
					{options.map((opt) => {
						const Icon = opt.icon;
						const isActive = theme === opt.value;
						return (
							<button
								key={opt.value}
								type="button"
								role="menuitemradio"
								aria-checked={isActive}
								onClick={() => selectTheme(opt.value)}
								className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
									isActive
										? "text-zinc-900 dark:text-white"
										: "text-zinc-600 dark:text-zinc-400"
								}`}
							>
								<Icon size={15} aria-hidden="true" />
								<span className="flex-1">{opt.label}</span>
								{isActive && (
									<Check
										size={14}
										className="text-zinc-500 dark:text-zinc-400"
										aria-hidden="true"
									/>
								)}
							</button>
						);
					})}
				</div>
			)}
		</div>
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
