## General-purpose rules
- IMPORTANT: Always use components from shadcn when possible
- IMPORTANT: Use Tailwind CSS for styling
- IMPORTANT: All spacing values must be multiples of 8px (8px, 16px, 24px, 32px, 40px, 48px, 56px, 64px, etc.)
- Prioritize Figma fidelity to match designs exactly
- Follow WCAG requirements for accessibility
- Add component documentation

## Rules to ensure consistently good output
## Figma MCP Integration Rules
These rules define how to translate Figma inputs into code for this project and must be followed for every Figma-driven change.

### Required flow (do not skip)
1. Run get_design_context first to fetch the structured representation for the exact node(s).
2. If the response is too large or truncated, run get_metadata to get the high‑level node map and then re‑fetch only the required node(s) with get_design_context.
3. Run get_screenshot for a visual reference of the node variant being implemented.
4. Only after you have both get_design_context and get_screenshot, download any assets needed and start implementation.
5. Translate the output (usually Shadcn + Tailwind) into this project's conventions, styles and framework.  Reuse the project's color tokens, components, and typography wherever possible.
6. Validate against Figma for 1:1 look and behavior before marking complete.

### Implementation rules
- Treat the Figma MCP output (Shadcn + Tailwind) as a representation of design and behavior, not as final code style.
- Reuse existing components (e.g., buttons, inputs, typography, icon wrappers) instead of duplicating functionality.
- Use the project's color system, typography scale, and spacing tokens consistently.
- Strive for 1:1 visual parity with the Figma design. When conflicts arise, prefer design‑system tokens and adjust spacing or sizes minimally to match visuals.
- Validate the final UI against the Figma screenshot for both look and behavior.

## Assets related guidance
# MCP Servers
## Figma MCP server rules
  - The Figma MCP server provides an assets endpoint which can serve image and SVG assets
  - IMPORTANT: If the Figma MCP server returns a localhost source for an image or an SVG, use that image or SVG source directly
  - IMPORTANT: DO NOT import/add new icon packages, all the assets should be in the Figma payload
  - IMPORTANT: do NOT use or create placeholders if a localhost source is provided
  - Icons are from Remix icon library