import type { APIRoute } from "astro";

const content = `# Effect

> The missing standard library for TypeScript applications

Effect is an open-source ecosystem for building software that is scalable, reliable, and maintainable from the start.

## Installation

\`\`\`bash
npm install effect
\`\`\`

## Core Concept

The Effect type represents a computation: \`Effect<Success, Error, Requirements>\`

- **Success**: What it returns when it succeeds
- **Error**: What errors can occur (fully typed, no \`catch (e: unknown)\`)
- **Requirements**: Dependencies needed to run (type-safe dependency injection)

## Key Features

1. **Typed Errors** - Errors are part of the type system. No more try-catch ambiguity or unknown error types.

2. **Dependency Injection** - Type-safe service definitions without decorators or magic. Dependencies are explicit in the type signature.

3. **Structured Concurrency** - Fibers with automatic cleanup, cancellation, and resource management. No more dangling promises.

4. **Scheduling** - Declarative retry, repeat, and timeout policies. Build resilient systems with composable scheduling primitives.

5. **Built-in Tracing** - OpenTelemetry integration out of the box. Every operation is automatically traced.

6. **Unified Schema** - One schema for validation, encoding, serialization, and documentation generation.

## Quick Example

\`\`\`typescript
import { Effect } from "effect"

const program = Effect.gen(function* () {
  const user = yield* fetchUser(id)
  const posts = yield* fetchPosts(user.id)
  return { user, posts }
})

// Run with error handling
Effect.runPromise(program)
  .then(console.log)
  .catch(console.error)
\`\`\`

## Common Patterns

### Error Handling
\`\`\`typescript
// Typed errors
const divide = (a: number, b: number): Effect.Effect<number, DivisionByZero> =>
  b === 0 ? Effect.fail(new DivisionByZero()) : Effect.succeed(a / b)

// Recovery
const safe = divide(10, 0).pipe(
  Effect.catchTag("DivisionByZero", () => Effect.succeed(0))
)
\`\`\`

### Concurrency
\`\`\`typescript
// Run in parallel
const results = yield* Effect.all([task1, task2, task3], { concurrency: "unbounded" })

// Race - first to complete wins
const fastest = yield* Effect.race(task1, task2)

// Timeout
const withTimeout = task.pipe(Effect.timeout("5 seconds"))
\`\`\`

### Retry & Scheduling
\`\`\`typescript
// Retry with exponential backoff
const resilient = task.pipe(
  Effect.retry(Schedule.exponential("100 millis").pipe(Schedule.jittered))
)

// Repeat on schedule
const polling = task.pipe(Effect.repeat(Schedule.spaced("10 seconds")))
\`\`\`

## Ecosystem Packages

- **@effect/schema** - Runtime validation, encoding, and serialization with TypeScript inference
- **@effect/platform** - Cross-platform APIs for HTTP clients/servers, filesystem, CLI, and more
- **@effect/ai** - AI agent infrastructure with streaming, tool use, and provider abstractions
- **@effect/cluster** - Distributed systems primitives (alpha)
- **@effect/workflow** - Durable workflow execution
- **@effect/sql** - Type-safe SQL with connection pooling
- **@effect/opentelemetry** - OpenTelemetry integration

## Use Cases

Effect is used in production for:

- **Payment & Payroll Systems** - Warp uses Effect for composable, reliable financial operations
- **AI Routing Infrastructure** - OpenRouter processes trillions of tokens weekly with Effect
- **Enterprise Support Platforms** - Zendesk adopted Effect incrementally in their large codebase
- **FinTech Infrastructure** - Spiko builds blockchain products with Effect's event-driven architecture
- **Voice AI Orchestration** - MasterClass powers real-time voice conversations with Effect
- **AI Customer Support** - 14.ai (formerly Markprompt) scales AI support with Effect

## Why Effect Works Well with LLMs

- **Predictable Structure** - Declarative patterns make code generation more reliable
- **Typed Feedback Loop** - Detailed error traces help LLMs self-repair incorrect code
- **Built-in Reliability** - Error handling, supervision, and recovery are first-class
- **Rich Toolbox** - Schemas, workflows, and composable patterns reduce boilerplate

## Resources

### Documentation
- Main Docs: https://effect.website/docs/
- API Reference: https://effect.website/docs/additional-resources/api-reference/
- Getting Started: https://effect.website/docs/getting-started/introduction/

### Interactive
- Playground: https://effect.website/play/
- LLM Quick Start Guide: https://effect.solutions/

### Community
- GitHub: https://github.com/Effect-TS/effect
- Discord: https://discord.gg/effect-ts
- Twitter/X: https://x.com/EffectTS_

### Learning
- Effect Institute: https://effect.institute/
- Blog: https://effect.website/blog/
- Podcast (Cause & Effect): https://effect.website/podcast/

## License

MIT Licensed - Open source and free to use.
`;

export const GET: APIRoute = () => {
	return new Response(content, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
};
