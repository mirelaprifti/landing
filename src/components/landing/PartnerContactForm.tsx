import { type FormEvent, useState } from "react";
import { Button } from "../ui/Button";

interface PartnerContactFormProps {
	/** Used in the email subject line so submissions are routed to the right partner. */
	partnerName: string;
	/**
	 * Formspree (or compatible) endpoint. Recipient email is configured server-side
	 * and never exposed to the client.
	 */
	endpoint?: string;
}

export function PartnerContactForm({
	partnerName,
	endpoint = "https://formspree.io/f/xpwzgkby",
}: PartnerContactFormProps) {
	const [submitted, setSubmitted] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		setSubmitting(true);

		const data = new FormData(e.currentTarget);

		try {
			const res = await fetch(endpoint, {
				method: "POST",
				body: data,
				headers: { Accept: "application/json" },
			});
			if (res.ok) {
				setSubmitted(true);
			} else {
				setError("Something went wrong. Please try again, or reach out via the partner's website.");
			}
		} catch {
			setError("Network error. Please try again, or reach out via the partner's website.");
		} finally {
			setSubmitting(false);
		}
	};

	if (submitted) {
		return (
			<div className="border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
				<p className="font-mono text-xs tracking-wider text-zinc-500 uppercase">
					// Sent
				</p>
				<h3 className="mt-3 text-xl font-semibold text-zinc-900 dark:text-white">
					Thanks — we'll be in touch
				</h3>
				<p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-400">
					We'll review your details and connect you with the {partnerName} team
					shortly.
				</p>
			</div>
		);
	}

	const fieldClass =
		"w-full border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-600 dark:focus:border-zinc-500";

	const labelClass =
		"mb-2 block font-mono text-xs font-medium tracking-wider text-zinc-500 uppercase";

	return (
		<form
			onSubmit={handleSubmit}
			className="border border-zinc-200 bg-white p-6 md:p-8 dark:border-zinc-800 dark:bg-zinc-900"
		>
			{/* Hidden routing fields — Formspree uses these */}
			<input type="hidden" name="_subject" value={`${partnerName} — partner inquiry`} />
			<input type="hidden" name="partner" value={partnerName} />

			<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
				<div>
					<label htmlFor="name" className={labelClass}>
						Your name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						required
						autoComplete="name"
						className={fieldClass}
						placeholder="Jane Doe"
					/>
				</div>
				<div>
					<label htmlFor="email" className={labelClass}>
						Work email
					</label>
					<input
						type="email"
						id="email"
						name="_replyto"
						required
						autoComplete="email"
						className={fieldClass}
						placeholder="jane@company.com"
					/>
				</div>
				<div className="md:col-span-2">
					<label htmlFor="company" className={labelClass}>
						Company
					</label>
					<input
						type="text"
						id="company"
						name="company"
						required
						autoComplete="organization"
						className={fieldClass}
						placeholder="Acme Inc."
					/>
				</div>
				<div className="md:col-span-2">
					<label htmlFor="message" className={labelClass}>
						Tell us about your project
					</label>
					<textarea
						id="message"
						name="message"
						rows={5}
						required
						className={`${fieldClass} resize-y`}
						placeholder="Team size, stack, what you're trying to ship, timeline…"
					/>
				</div>
			</div>

			{error && (
				<p className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p>
			)}

			<div className="mt-6 flex items-center gap-4">
				<Button type="submit" variant="primary" size="md" disabled={submitting}>
					{submitting ? "Sending…" : `Contact ${partnerName}`}
					<i
						className="ri-arrow-right-up-line text-base"
						aria-hidden="true"
					/>
				</Button>
				<p className="font-mono text-xs text-zinc-500">
					We'll route your message directly to the team.
				</p>
			</div>
		</form>
	);
}
