import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { getAssetPath } from "../../utils/assetPath";

const COMBINATION_MARK = {
  name: "Combination mark",
  description: "The primary way we show the Effect brand.",
  files: {
    svg: {
      black: "effect-logo/Combination mark/SVG/effect-logo-black.svg",
      white: "effect-logo/Combination mark/SVG/effect-logo-white.svg",
    },
    png: {
      black: "effect-logo/Combination mark/PNG/effect-logo-black.png",
      white: "effect-logo/Combination mark/PNG/effect-logo-white.png",
    }
  }
};

const LOGO_SYMBOL = {
  name: "Logo symbol",
  description: "Used for favicons or social media assets when there is not enough space for the combination mark.",
  files: {
    svg: {
      black: "effect-logo/Logo symbol/SVG/effect-logomark-black.svg",
      white: "effect-logo/Logo symbol/SVG/effect-logomark-white.svg",
    },
    png: {
      black: "effect-logo/Logo symbol/PNG/effect-logomark-black.png",
      white: "effect-logo/Logo symbol/PNG/effect-logomark-white.png",
    }
  }
};

function DownloadLink({ href, label }: { href: string; label: string }) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = href;
    link.download = href.split("/").pop() || label;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="text-sm text-white underline hover:no-underline transition-colors cursor-pointer"
    >
      {label}
    </button>
  );
}

export function PressKitPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-white">
      {/* Dithered background overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect x='0' y='0' width='1' height='1' fill='white'/%3E%3Crect x='2' y='2' width='1' height='1' fill='white'/%3E%3C/svg%3E")`,
          backgroundSize: '4px 4px',
        }}
      />

      <Navigation />

      <main className="relative z-10 pt-16">
        {/* Hero Section */}
        <section className="relative w-full pt-16 pb-12 md:pt-20 md:pb-16">
          {/* Grid background */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(24, 24, 27, 0.8) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(24, 24, 27, 0.8) 1px, transparent 1px)
              `,
              backgroundSize: "196.6px 179px",
              backgroundPosition: "calc(50% + 97px) 0",
            }}
          />

          {/* Fade out grid at top and bottom */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, #09090b 0%, transparent 20%, transparent 60%, #09090b 100%)",
            }}
          />

          {/* Subtle glow */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[400px]"
            style={{
              background: `
                radial-gradient(ellipse 50% 80% at 70% -20%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
                radial-gradient(ellipse 30% 50% at 80% 0%, rgba(255, 255, 255, 0.05) 0%, transparent 40%)
              `,
            }}
          />

          <div className="relative mx-auto w-full max-w-[73.75rem] px-4">
            <p className="mb-3 font-mono text-sm font-medium tracking-wider text-zinc-400 uppercase">
              Guidelines
            </p>
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              Brand Assets
            </h1>
            <p className="mt-4 text-lg text-zinc-400 max-w-xl">
              Download the official Effect logo for use in presentations, articles, and other media. Please follow our guidelines when using these assets.
            </p>
          </div>
        </section>

        {/* Logos Section - Two columns */}
        <section className="py-8">
          <div className="mx-auto w-full max-w-[73.75rem] px-4">
            <div className="border-t border-zinc-800 pt-10">
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                {/* Combination Mark */}
                <div>
                  <h2 className="text-sm font-mono uppercase font-semibold text-zinc-400 mb-4">
                    {COMBINATION_MARK.name}
                  </h2>

                  {/* Logo Preview */}
                  <div className="mb-2 flex items-center justify-start py-6">
                    <img
                      src={getAssetPath(`/assets/${COMBINATION_MARK.files.svg.black}`)}
                      alt="Effect combination mark"
                      className="h-14 w-auto invert"
                    />
                  </div>

                  <p className="text-base text-zinc-400 mb-4">
                    {COMBINATION_MARK.description}
                  </p>

                  {/* Download Links */}
                  <div className="flex items-center gap-2">
                    <i className="ri-download-2-line text-base text-zinc-400" />
                    <span className="text-sm text-zinc-400">Download:</span>
                    <DownloadLink
                      href={getAssetPath(`/assets/${COMBINATION_MARK.files.png.black}`)}
                      label="PNG"
                    />
                    <DownloadLink
                      href={getAssetPath(`/assets/${COMBINATION_MARK.files.svg.black}`)}
                      label="SVG"
                    />
                  </div>
                </div>

                {/* Logo Symbol */}
                <div>
                  <h2 className="text-sm font-mono uppercase font-semibold text-zinc-400 mb-4">
                    {LOGO_SYMBOL.name}
                  </h2>

                  {/* Logo Preview */}
                  <div className="mb-2 flex items-center justify-start py-6">
                    <img
                      src={getAssetPath(`/assets/${LOGO_SYMBOL.files.svg.black}`)}
                      alt="Effect logo symbol"
                      className="h-14 w-auto invert"
                    />
                  </div>

                  <p className="text-base text-zinc-400 mb-4">
                    {LOGO_SYMBOL.description}
                  </p>

                  {/* Download Links */}
                  <div className="flex items-center gap-2">
                    <i className="ri-download-2-line text-base text-zinc-400" />
                    <span className="text-sm text-zinc-400">Download:</span>
                    <DownloadLink
                      href={getAssetPath(`/assets/${LOGO_SYMBOL.files.png.black}`)}
                      label="PNG"
                    />
                    <DownloadLink
                      href={getAssetPath(`/assets/${LOGO_SYMBOL.files.svg.black}`)}
                      label="SVG"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ground Rules Section */}
        <section className="py-12">
          <div className="mx-auto w-full max-w-[73.75rem] px-4">
            <div className="border-t border-zinc-800 pt-10">
              <h2 className="text-sm font-mono uppercase font-semibold text-zinc-400 mb-8">
                Ground rules
              </h2>

              {/* Do's - 3 column grid */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-12">
                {/* Use white on dark */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 h-40">
                    <img
                      src={getAssetPath(`/assets/${LOGO_SYMBOL.files.svg.white}`)}
                      alt="White logo on dark"
                      className="h-20 w-auto"
                    />
                  </div>
                  <span className="text-base text-zinc-400">Use the white logo on a dark background.</span>
                </div>

                {/* Use black on light */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-center rounded-lg bg-white border border-zinc-300 h-40">
                    <img
                      src={getAssetPath(`/assets/${LOGO_SYMBOL.files.svg.black}`)}
                      alt="Black logo on light"
                      className="h-20 w-auto"
                    />
                  </div>
                  <span className="text-base text-zinc-400">Use the black logo on a light background.</span>
                </div>

                {/* Can use on image */}
                <div className="flex flex-col gap-3">
                  <div
                    className="flex items-center justify-center rounded-lg border border-zinc-800 h-40 overflow-hidden relative"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(99, 102, 241, 0.35) 100%)',
                    }}
                  >
                    {/* Abstract shapes */}
                    <div
                      className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-30"
                      style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%)' }}
                    />
                    <div
                      className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full opacity-25"
                      style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.7) 0%, transparent 70%)' }}
                    />
                    <div
                      className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full opacity-20"
                      style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.6) 0%, transparent 70%)' }}
                    />
                    <img
                      src={getAssetPath(`/assets/${LOGO_SYMBOL.files.svg.white}`)}
                      alt="Logo on image"
                      className="h-20 w-auto relative z-10"
                    />
                  </div>
                  <span className="text-base text-zinc-400">The logo can be placed on a gradient or image, as long as it's clearly visible and legible.</span>
                </div>
              </div>

              {/* Don'ts - 2x2 grid */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Don't change colors */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-center gap-10 rounded-lg bg-zinc-900 border border-zinc-700 h-40">
                    <div className="relative">
                      <img
                        src={getAssetPath(`/assets/${LOGO_SYMBOL.files.svg.white}`)}
                        alt="Black logo correct"
                        className="h-12 w-auto"
                      />
                      <i className="ri-checkbox-circle-fill text-green-500 absolute -bottom-2 -right-2 text-sm" />
                    </div>
                    <div className="relative">
                      <img
                        src={getAssetPath(`/assets/${LOGO_SYMBOL.files.svg.white}`)}
                        alt="Colored logo wrong"
                        className="h-12 w-auto"
                        style={{ filter: "brightness(0) saturate(100%) invert(45%) sepia(95%) saturate(1000%) hue-rotate(220deg)" }}
                      />
                      <i className="ri-close-circle-fill text-red-500 absolute -bottom-2 -right-2 text-sm" />
                    </div>
                  </div>
                  <span className="text-base text-zinc-400">Do not make the logo any color other than black or white.</span>
                </div>

                {/* Don't stretch */}
                <div className="flex flex-col gap-3 mb-4">
                  <div className="flex items-center justify-center gap-12 rounded-lg bg-zinc-900 border border-zinc-700 h-40">
                    <div className="relative">
                      <img
                        src={getAssetPath(`/assets/${LOGO_SYMBOL.files.svg.white}`)}
                        alt="Normal logo"
                        className="h-12 w-auto"
                      />
                      <i className="ri-checkbox-circle-fill text-green-500 absolute -bottom-2 -right-2 text-sm" />
                    </div>
                    <div className="relative">
                      <img
                        src={getAssetPath(`/assets/${LOGO_SYMBOL.files.svg.white}`)}
                        alt="Stretched logo wrong"
                        className="h-12 w-auto"
                        style={{ transform: "scaleX(1.4)" }}
                      />
                      <i className="ri-close-circle-fill text-red-500 absolute -bottom-2 -right-4 text-sm" />
                    </div>
                    <div className="relative">
                      <img
                        src={getAssetPath(`/assets/${LOGO_SYMBOL.files.svg.white}`)}
                        alt="Squished logo wrong"
                        className="h-12 w-auto"
                        style={{ transform: "scaleY(1.4)" }}
                      />
                      <i className="ri-close-circle-fill text-red-500 absolute -bottom-2 -right-4 text-sm" />
                    </div>
                  </div>
                  <span className="text-base text-zinc-400">Do not shrink or stretch the logo. Be sure to maintain the proportions.</span>
                </div>

                {/* Don't add shadows */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-center gap-10 rounded-lg bg-zinc-900 border border-zinc-700 h-40">
                    <div className="relative">
                      <img
                        src={getAssetPath(`/assets/${LOGO_SYMBOL.files.svg.white}`)}
                        alt="Normal logo"
                        className="h-12 w-auto"
                      />
                      <i className="ri-checkbox-circle-fill text-green-500 absolute -bottom-2 -right-2 text-sm" />
                    </div>
                    <div className="relative">
                      <img
                        src={getAssetPath(`/assets/${LOGO_SYMBOL.files.svg.white}`)}
                        alt="Shadow logo wrong"
                        className="h-12 w-auto"
                        style={{ filter: "drop-shadow(4px 4px 8px rgba(0,0,0,0.4))" }}
                      />
                      <i className="ri-close-circle-fill text-red-500 absolute -bottom-2 -right-2 text-sm" />
                    </div>
                  </div>
                  <span className="text-base text-zinc-400">Do not place drop shadows.</span>
                </div>

                {/* Don't rotate */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-center gap-10 rounded-lg bg-zinc-900 border border-zinc-700 h-40">
                    <div className="relative">
                      <img
                        src={getAssetPath(`/assets/${LOGO_SYMBOL.files.svg.white}`)}
                        alt="Normal logo"
                        className="h-12 w-auto"
                      />
                      <i className="ri-checkbox-circle-fill text-green-500 absolute -bottom-2 -right-2 text-sm" />
                    </div>
                    <div className="relative">
                      <img
                        src={getAssetPath(`/assets/${LOGO_SYMBOL.files.svg.white}`)}
                        alt="Rotated logo wrong"
                        className="h-12 w-auto"
                        style={{ transform: "rotate(15deg)" }}
                      />
                      <i className="ri-close-circle-fill text-red-500 absolute -bottom-2 -right-2 text-sm" />
                    </div>
                  </div>
                  <span className="text-base text-zinc-400">Do not rotate the logo.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clear Space & Minimum Size Section */}
        <section className="py-0">
          <div className="mx-auto w-full max-w-[73.75rem] px-4">
            <div className="border-t border-zinc-800 py-12">
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                {/* Clear Space */}
                <div>
                  <h2 className="text-sm font-mono uppercase font-semibold text-zinc-400 mb-8">
                    Clear space
                  </h2>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-700 h-40">
                      {/* Outer container with padding visualization - 50% of logo height */}
                      <div
                        className="relative p-5"
                        style={{
                          backgroundImage: `repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 3px,
                            rgba(113, 113, 122, 0.25) 3px,
                            rgba(113, 113, 122, 0.25) 3.5px
                          )`,
                          backgroundColor: 'rgba(113, 113, 122, 0.15)',
                        }}
                      >
                        {/* Logo container */}
                        <div className="bg-zinc-900">
                          <img
                            src={getAssetPath(`/assets/${COMBINATION_MARK.files.svg.white}`)}
                            alt="Logo with clear space"
                            className="h-10 w-auto"
                          />
                        </div>
                      </div>
                    </div>
                    <span className="text-base text-zinc-400">Maintain clear space of at least 50% of the logo height on all sides.</span>
                  </div>
                </div>

                {/* Minimum Size */}
                <div>
                  <h2 className="text-sm font-mono uppercase font-semibold text-zinc-400 mb-8">
                    Minimum size
                  </h2>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-center gap-12 rounded-lg bg-zinc-900 border border-zinc-700 h-40">
                      {/* Combination mark minimum */}
                      <div className="flex flex-col items-center gap-2">
                        <img
                          src={getAssetPath(`/assets/${COMBINATION_MARK.files.svg.white}`)}
                          alt="Combination mark minimum size"
                          className="h-6 w-auto"
                        />
                        <span className="text-xs text-zinc-400 font-mono mb-[-1]">80px width</span>
                      </div>
                      {/* Logo symbol minimum */}
                      <div className="flex flex-col items-center gap-2 py-4">
                        <img
                          src={getAssetPath(`/assets/${LOGO_SYMBOL.files.svg.white}`)}
                          alt="Logo symbol minimum size"
                          className="h-6 w-auto"
                        />
                        <span className="text-xs text-zinc-400 font-mono mb-[-1]">24px height</span>
                      </div>
                    </div>
                    <span className="text-base text-zinc-400">Do not use the logo smaller than the minimum sizes shown above to ensure legibility.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Logo Pairing Section */}
        <section className="pb-24">
          <div className="mx-auto w-full max-w-[73.75rem] px-4">
            <div className="border-t border-zinc-800 py-12">
              <h2 className="text-sm font-mono uppercase font-semibold text-zinc-400 mb-8">
                Logo pairing
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Effect logo with partner logo */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-center gap-4 rounded-lg bg-zinc-900 border border-zinc-700 h-40">
                    <img
                      src={getAssetPath(`/assets/${LOGO_SYMBOL.files.svg.white}`)}
                      alt="Effect logomark"
                      className="h-8 w-auto"
                    />
                    <div className="h-8 w-px bg-zinc-600" />
                    <span className="text-zinc-400 text-xl font-medium">Partner</span>
                  </div>
                  <span className="text-base text-zinc-400">Effect logo with partner logo.</span>
                </div>

                {/* Effect combination mark with partner */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-center gap-4 rounded-lg bg-zinc-900 border border-zinc-700 h-40">
                    <img
                      src={getAssetPath(`/assets/${COMBINATION_MARK.files.svg.white}`)}
                      alt="Effect combination mark"
                      className="h-8 w-auto"
                    />
                    <div className="h-8 w-px bg-zinc-600" />
                    <span className="text-zinc-400 text-xl font-medium">Partner</span>
                  </div>
                  <span className="text-base text-zinc-400">Effect combination mark-logo with partner.</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
