import fs from "node:fs";
import path from "node:path";

const logoSvgPath = path.join(
  process.cwd(),
  "public/assets/effect-logo/Combination mark/SVG/effect-logo-white.svg"
);
const logoSvg = fs.readFileSync(logoSvgPath, "utf-8");
const logoDataUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString("base64")}`;

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + " ...";
}

export interface OgTemplateProps {
  title: string;
  description?: string;
  subtitle?: string;
}

// Dashed center line as SVG data URI (Satori doesn't support repeating-linear-gradient)
const dashSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='1' height='4'><rect x='0' y='0' width='1' height='2' fill='rgba(63,63,70,0.5)'/></svg>`;
const dashDataUri = `data:image/svg+xml;base64,${Buffer.from(dashSvg).toString("base64")}`;

function createBackground() {
  return [
    // Subtle ambient glow
    {
      type: "div",
      props: {
        style: {
          position: "absolute" as const,
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          display: "flex",
          background:
            "radial-gradient(ellipse 900px 500px at 50% 45%, rgba(63, 63, 70, 0.4) 0%, transparent 100%)",
        },
      },
    },
    // Left vertical line
    {
      type: "div",
      props: {
        style: {
          position: "absolute" as const,
          left: "60px",
          top: "0",
          bottom: "0",
          width: "1px",
          display: "flex",
          backgroundColor: "#27272a",
        },
      },
    },
    // Right vertical line
    {
      type: "div",
      props: {
        style: {
          position: "absolute" as const,
          right: "60px",
          top: "0",
          bottom: "0",
          width: "1px",
          display: "flex",
          backgroundColor: "#27272a",
        },
      },
    },
    // Center dashed vertical line
    {
      type: "div",
      props: {
        style: {
          position: "absolute" as const,
          left: "600px",
          top: "0",
          bottom: "0",
          width: "1px",
          display: "flex",
          backgroundImage: `url(${dashDataUri})`,
          backgroundSize: "1px 4px",
        },
      },
    },
  ];
}

export function createHomepageOgTemplate() {
  // Logo is centered: 315 - 44 = 271 top, 315 + 44 = 359 bottom
  // Leave a clean gap in the dashed center line where the logo sits
  const gapTop = 255; // ~16px above logo top
  const gapBottom = 375; // ~16px below logo bottom

  return {
    type: "div",
    props: {
      style: {
        width: "1200px",
        height: "630px",
        display: "flex",
        alignItems: "center" as const,
        justifyContent: "center" as const,
        backgroundColor: "#09090b",
        fontFamily: "Inter",
        position: "relative" as const,
        overflow: "hidden" as const,
      },
      children: [
        // Subtle ambient glow
        {
          type: "div",
          props: {
            style: {
              position: "absolute" as const,
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              display: "flex",
              background:
                "radial-gradient(ellipse 900px 500px at 50% 45%, rgba(63, 63, 70, 0.4) 0%, transparent 100%)",
            },
          },
        },
        // Left vertical line
        {
          type: "div",
          props: {
            style: {
              position: "absolute" as const,
              left: "60px",
              top: "0",
              bottom: "0",
              width: "1px",
              display: "flex",
              backgroundColor: "#27272a",
            },
          },
        },
        // Right vertical line
        {
          type: "div",
          props: {
            style: {
              position: "absolute" as const,
              right: "60px",
              top: "0",
              bottom: "0",
              width: "1px",
              display: "flex",
              backgroundColor: "#27272a",
            },
          },
        },
        // Center dashed line — top segment (above logo)
        {
          type: "div",
          props: {
            style: {
              position: "absolute" as const,
              left: "600px",
              top: "0",
              height: `${gapTop}px`,
              width: "1px",
              display: "flex",
              backgroundImage: `url(${dashDataUri})`,
              backgroundSize: "1px 4px",
            },
          },
        },
        // Center dashed line — bottom segment (below logo)
        {
          type: "div",
          props: {
            style: {
              position: "absolute" as const,
              left: "600px",
              top: `${gapBottom}px`,
              bottom: "0",
              width: "1px",
              display: "flex",
              backgroundImage: `url(${dashDataUri})`,
              backgroundSize: "1px 4px",
            },
          },
        },
        // Centered logo
        {
          type: "img",
          props: {
            src: logoDataUri,
            width: 320,
            height: 88,
          },
        },
      ],
    },
  };
}

export function createOgTemplate({ title, description, subtitle }: OgTemplateProps) {
  const truncatedDescription = description ? truncateText(description, 160) : undefined;

  const textChildren: any[] = [];

  // Subtitle (e.g. "Cause & Effect Podcast — with Guest (Company)")
  if (subtitle) {
    textChildren.push({
      type: "div",
      props: {
        style: {
          fontSize: "20px",
          color: "#71717a",
          fontWeight: 400,
          marginBottom: "12px",
          display: "flex",
        },
        children: subtitle,
      },
    });
  }

  // Headline
  textChildren.push({
    type: "div",
    props: {
      style: {
        fontSize: "52px",
        fontWeight: 700,
        color: "#ffffff",
        lineHeight: 1.15,
        maxWidth: "900px",
        letterSpacing: "-0.02em",
        display: "flex",
      },
      children: title,
    },
  });

  // Description
  if (truncatedDescription) {
    textChildren.push({
      type: "div",
      props: {
        style: {
          fontSize: "22px",
          color: "#a1a1aa",
          lineHeight: 1.5,
          marginTop: "20px",
          maxWidth: "850px",
          fontWeight: 400,
          display: "flex",
        },
        children: truncatedDescription,
      },
    });
  }

  return {
    type: "div",
    props: {
      style: {
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column" as const,
        backgroundColor: "#09090b",
        fontFamily: "Inter",
        padding: "80px 72px 60px 72px",
        position: "relative" as const,
        overflow: "hidden" as const,
      },
      children: [
        ...createBackground(),
        // Main content column
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column" as const,
              flex: "1",
            },
            children: [
              // Logo at top
              {
                type: "img",
                props: {
                  src: logoDataUri,
                  width: 175,
                  height: 48,
                },
              },
              // Text block — below middle, clear of bottom overlay
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column" as const,
                    marginTop: "160px",
                  },
                  children: textChildren,
                },
              },
            ],
          },
        },
      ],
    },
  };
}
