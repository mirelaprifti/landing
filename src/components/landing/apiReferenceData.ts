// Generated from https://effect-ts.github.io/effect (API reference navigation).
// Package descriptions and thematic groupings are authored by hand.

export type ApiModule = { name: string; href: string };

export type ApiPackage = {
	slug: string;
	name: string;
	description: string;
	modules: ApiModule[];
	/** Optional thematic grouping of modules, keyed by group title. */
	moduleGroups?: { title: string; modules: string[] }[];
};

export const API_PACKAGES: ApiPackage[] = [
	{
		slug: "cli",
		name: "@effect/cli",
		description:
			"Build polished, type-safe command-line applications with arguments, options, and prompts.",
		modules: [
			{
				name: "Args",
				href: "https://effect-ts.github.io/effect/cli/Args.ts.html",
			},
			{
				name: "AutoCorrect",
				href: "https://effect-ts.github.io/effect/cli/AutoCorrect.ts.html",
			},
			{
				name: "BuiltInOptions",
				href: "https://effect-ts.github.io/effect/cli/BuiltInOptions.ts.html",
			},
			{
				name: "CliApp",
				href: "https://effect-ts.github.io/effect/cli/CliApp.ts.html",
			},
			{
				name: "CliConfig",
				href: "https://effect-ts.github.io/effect/cli/CliConfig.ts.html",
			},
			{
				name: "Command",
				href: "https://effect-ts.github.io/effect/cli/Command.ts.html",
			},
			{
				name: "CommandDescriptor",
				href: "https://effect-ts.github.io/effect/cli/CommandDescriptor.ts.html",
			},
			{
				name: "CommandDirective",
				href: "https://effect-ts.github.io/effect/cli/CommandDirective.ts.html",
			},
			{
				name: "ConfigFile",
				href: "https://effect-ts.github.io/effect/cli/ConfigFile.ts.html",
			},
			{
				name: "HelpDoc",
				href: "https://effect-ts.github.io/effect/cli/HelpDoc.ts.html",
			},
			{
				name: "HelpDoc/Span",
				href: "https://effect-ts.github.io/effect/cli/HelpDoc/Span.ts.html",
			},
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/cli/index.ts.html",
			},
			{
				name: "Options",
				href: "https://effect-ts.github.io/effect/cli/Options.ts.html",
			},
			{
				name: "Primitive",
				href: "https://effect-ts.github.io/effect/cli/Primitive.ts.html",
			},
			{
				name: "Prompt",
				href: "https://effect-ts.github.io/effect/cli/Prompt.ts.html",
			},
			{
				name: "Usage",
				href: "https://effect-ts.github.io/effect/cli/Usage.ts.html",
			},
			{
				name: "ValidationError",
				href: "https://effect-ts.github.io/effect/cli/ValidationError.ts.html",
			},
		],
	},
	{
		slug: "cluster",
		name: "@effect/cluster",
		description:
			"Distributed computing with entities, sharding, singletons, and durable messaging.",
		modules: [
			{
				name: "ClusterCron",
				href: "https://effect-ts.github.io/effect/cluster/ClusterCron.ts.html",
			},
			{
				name: "ClusterError",
				href: "https://effect-ts.github.io/effect/cluster/ClusterError.ts.html",
			},
			{
				name: "ClusterMetrics",
				href: "https://effect-ts.github.io/effect/cluster/ClusterMetrics.ts.html",
			},
			{
				name: "ClusterSchema",
				href: "https://effect-ts.github.io/effect/cluster/ClusterSchema.ts.html",
			},
			{
				name: "ClusterWorkflowEngine",
				href: "https://effect-ts.github.io/effect/cluster/ClusterWorkflowEngine.ts.html",
			},
			{
				name: "DeliverAt",
				href: "https://effect-ts.github.io/effect/cluster/DeliverAt.ts.html",
			},
			{
				name: "Entity",
				href: "https://effect-ts.github.io/effect/cluster/Entity.ts.html",
			},
			{
				name: "EntityAddress",
				href: "https://effect-ts.github.io/effect/cluster/EntityAddress.ts.html",
			},
			{
				name: "EntityId",
				href: "https://effect-ts.github.io/effect/cluster/EntityId.ts.html",
			},
			{
				name: "EntityProxy",
				href: "https://effect-ts.github.io/effect/cluster/EntityProxy.ts.html",
			},
			{
				name: "EntityProxyServer",
				href: "https://effect-ts.github.io/effect/cluster/EntityProxyServer.ts.html",
			},
			{
				name: "EntityResource",
				href: "https://effect-ts.github.io/effect/cluster/EntityResource.ts.html",
			},
			{
				name: "EntityType",
				href: "https://effect-ts.github.io/effect/cluster/EntityType.ts.html",
			},
			{
				name: "Envelope",
				href: "https://effect-ts.github.io/effect/cluster/Envelope.ts.html",
			},
			{
				name: "HttpRunner",
				href: "https://effect-ts.github.io/effect/cluster/HttpRunner.ts.html",
			},
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/cluster/index.ts.html",
			},
			{
				name: "K8sHttpClient",
				href: "https://effect-ts.github.io/effect/cluster/K8sHttpClient.ts.html",
			},
			{
				name: "MachineId",
				href: "https://effect-ts.github.io/effect/cluster/MachineId.ts.html",
			},
			{
				name: "Message",
				href: "https://effect-ts.github.io/effect/cluster/Message.ts.html",
			},
			{
				name: "MessageStorage",
				href: "https://effect-ts.github.io/effect/cluster/MessageStorage.ts.html",
			},
			{
				name: "Reply",
				href: "https://effect-ts.github.io/effect/cluster/Reply.ts.html",
			},
			{
				name: "Runner",
				href: "https://effect-ts.github.io/effect/cluster/Runner.ts.html",
			},
			{
				name: "RunnerAddress",
				href: "https://effect-ts.github.io/effect/cluster/RunnerAddress.ts.html",
			},
			{
				name: "RunnerHealth",
				href: "https://effect-ts.github.io/effect/cluster/RunnerHealth.ts.html",
			},
			{
				name: "Runners",
				href: "https://effect-ts.github.io/effect/cluster/Runners.ts.html",
			},
			{
				name: "RunnerServer",
				href: "https://effect-ts.github.io/effect/cluster/RunnerServer.ts.html",
			},
			{
				name: "RunnerStorage",
				href: "https://effect-ts.github.io/effect/cluster/RunnerStorage.ts.html",
			},
			{
				name: "ShardId",
				href: "https://effect-ts.github.io/effect/cluster/ShardId.ts.html",
			},
			{
				name: "Sharding",
				href: "https://effect-ts.github.io/effect/cluster/Sharding.ts.html",
			},
			{
				name: "ShardingConfig",
				href: "https://effect-ts.github.io/effect/cluster/ShardingConfig.ts.html",
			},
			{
				name: "ShardingRegistrationEvent",
				href: "https://effect-ts.github.io/effect/cluster/ShardingRegistrationEvent.ts.html",
			},
			{
				name: "SingleRunner",
				href: "https://effect-ts.github.io/effect/cluster/SingleRunner.ts.html",
			},
			{
				name: "Singleton",
				href: "https://effect-ts.github.io/effect/cluster/Singleton.ts.html",
			},
			{
				name: "SingletonAddress",
				href: "https://effect-ts.github.io/effect/cluster/SingletonAddress.ts.html",
			},
			{
				name: "Snowflake",
				href: "https://effect-ts.github.io/effect/cluster/Snowflake.ts.html",
			},
			{
				name: "SocketRunner",
				href: "https://effect-ts.github.io/effect/cluster/SocketRunner.ts.html",
			},
			{
				name: "SqlMessageStorage",
				href: "https://effect-ts.github.io/effect/cluster/SqlMessageStorage.ts.html",
			},
			{
				name: "SqlRunnerStorage",
				href: "https://effect-ts.github.io/effect/cluster/SqlRunnerStorage.ts.html",
			},
			{
				name: "TestRunner",
				href: "https://effect-ts.github.io/effect/cluster/TestRunner.ts.html",
			},
		],
		moduleGroups: [
			{
				title: "Entities",
				modules: [
					"Entity",
					"EntityAddress",
					"EntityId",
					"EntityProxy",
					"EntityProxyServer",
					"EntityResource",
					"EntityType",
					"Singleton",
					"SingletonAddress",
				],
			},
			{
				title: "Sharding",
				modules: [
					"Sharding",
					"ShardingConfig",
					"ShardingRegistrationEvent",
					"ShardId",
					"MachineId",
				],
			},
			{
				title: "Runners",
				modules: [
					"Runner",
					"RunnerAddress",
					"RunnerHealth",
					"Runners",
					"RunnerServer",
					"RunnerStorage",
					"HttpRunner",
					"SocketRunner",
					"SingleRunner",
					"TestRunner",
				],
			},
			{
				title: "Messaging",
				modules: [
					"Message",
					"MessageStorage",
					"Envelope",
					"Reply",
					"DeliverAt",
					"Snowflake",
				],
			},
			{ title: "Storage", modules: ["SqlMessageStorage", "SqlRunnerStorage"] },
			{
				title: "Cluster",
				modules: [
					"ClusterCron",
					"ClusterError",
					"ClusterMetrics",
					"ClusterSchema",
					"ClusterWorkflowEngine",
					"K8sHttpClient",
					"index",
				],
			},
		],
	},
	{
		slug: "effect",
		name: "effect",
		description:
			"The core Effect library \u2014 data types, concurrency, streams, scheduling, configuration, and more.",
		modules: [
			{
				name: "Arbitrary",
				href: "https://effect-ts.github.io/effect/effect/Arbitrary.ts.html",
			},
			{
				name: "Array",
				href: "https://effect-ts.github.io/effect/effect/Array.ts.html",
			},
			{
				name: "BigDecimal",
				href: "https://effect-ts.github.io/effect/effect/BigDecimal.ts.html",
			},
			{
				name: "BigInt",
				href: "https://effect-ts.github.io/effect/effect/BigInt.ts.html",
			},
			{
				name: "Boolean",
				href: "https://effect-ts.github.io/effect/effect/Boolean.ts.html",
			},
			{
				name: "Brand",
				href: "https://effect-ts.github.io/effect/effect/Brand.ts.html",
			},
			{
				name: "Cache",
				href: "https://effect-ts.github.io/effect/effect/Cache.ts.html",
			},
			{
				name: "Cause",
				href: "https://effect-ts.github.io/effect/effect/Cause.ts.html",
			},
			{
				name: "Channel",
				href: "https://effect-ts.github.io/effect/effect/Channel.ts.html",
			},
			{
				name: "ChildExecutorDecision",
				href: "https://effect-ts.github.io/effect/effect/ChildExecutorDecision.ts.html",
			},
			{
				name: "Chunk",
				href: "https://effect-ts.github.io/effect/effect/Chunk.ts.html",
			},
			{
				name: "Clock",
				href: "https://effect-ts.github.io/effect/effect/Clock.ts.html",
			},
			{
				name: "Config",
				href: "https://effect-ts.github.io/effect/effect/Config.ts.html",
			},
			{
				name: "ConfigError",
				href: "https://effect-ts.github.io/effect/effect/ConfigError.ts.html",
			},
			{
				name: "ConfigProvider",
				href: "https://effect-ts.github.io/effect/effect/ConfigProvider.ts.html",
			},
			{
				name: "ConfigProviderPathPatch",
				href: "https://effect-ts.github.io/effect/effect/ConfigProviderPathPatch.ts.html",
			},
			{
				name: "Console",
				href: "https://effect-ts.github.io/effect/effect/Console.ts.html",
			},
			{
				name: "Context",
				href: "https://effect-ts.github.io/effect/effect/Context.ts.html",
			},
			{
				name: "Cron",
				href: "https://effect-ts.github.io/effect/effect/Cron.ts.html",
			},
			{
				name: "Data",
				href: "https://effect-ts.github.io/effect/effect/Data.ts.html",
			},
			{
				name: "DateTime",
				href: "https://effect-ts.github.io/effect/effect/DateTime.ts.html",
			},
			{
				name: "DefaultServices",
				href: "https://effect-ts.github.io/effect/effect/DefaultServices.ts.html",
			},
			{
				name: "Deferred",
				href: "https://effect-ts.github.io/effect/effect/Deferred.ts.html",
			},
			{
				name: "Differ",
				href: "https://effect-ts.github.io/effect/effect/Differ.ts.html",
			},
			{
				name: "Duration",
				href: "https://effect-ts.github.io/effect/effect/Duration.ts.html",
			},
			{
				name: "Effect",
				href: "https://effect-ts.github.io/effect/effect/Effect.ts.html",
			},
			{
				name: "Effectable",
				href: "https://effect-ts.github.io/effect/effect/Effectable.ts.html",
			},
			{
				name: "Either",
				href: "https://effect-ts.github.io/effect/effect/Either.ts.html",
			},
			{
				name: "Encoding",
				href: "https://effect-ts.github.io/effect/effect/Encoding.ts.html",
			},
			{
				name: "Equal",
				href: "https://effect-ts.github.io/effect/effect/Equal.ts.html",
			},
			{
				name: "Equivalence",
				href: "https://effect-ts.github.io/effect/effect/Equivalence.ts.html",
			},
			{
				name: "ExecutionPlan",
				href: "https://effect-ts.github.io/effect/effect/ExecutionPlan.ts.html",
			},
			{
				name: "ExecutionStrategy",
				href: "https://effect-ts.github.io/effect/effect/ExecutionStrategy.ts.html",
			},
			{
				name: "Exit",
				href: "https://effect-ts.github.io/effect/effect/Exit.ts.html",
			},
			{
				name: "FastCheck",
				href: "https://effect-ts.github.io/effect/effect/FastCheck.ts.html",
			},
			{
				name: "Fiber",
				href: "https://effect-ts.github.io/effect/effect/Fiber.ts.html",
			},
			{
				name: "FiberHandle",
				href: "https://effect-ts.github.io/effect/effect/FiberHandle.ts.html",
			},
			{
				name: "FiberId",
				href: "https://effect-ts.github.io/effect/effect/FiberId.ts.html",
			},
			{
				name: "FiberMap",
				href: "https://effect-ts.github.io/effect/effect/FiberMap.ts.html",
			},
			{
				name: "FiberRef",
				href: "https://effect-ts.github.io/effect/effect/FiberRef.ts.html",
			},
			{
				name: "FiberRefs",
				href: "https://effect-ts.github.io/effect/effect/FiberRefs.ts.html",
			},
			{
				name: "FiberRefsPatch",
				href: "https://effect-ts.github.io/effect/effect/FiberRefsPatch.ts.html",
			},
			{
				name: "FiberSet",
				href: "https://effect-ts.github.io/effect/effect/FiberSet.ts.html",
			},
			{
				name: "FiberStatus",
				href: "https://effect-ts.github.io/effect/effect/FiberStatus.ts.html",
			},
			{
				name: "Function",
				href: "https://effect-ts.github.io/effect/effect/Function.ts.html",
			},
			{
				name: "GlobalValue",
				href: "https://effect-ts.github.io/effect/effect/GlobalValue.ts.html",
			},
			{
				name: "Graph",
				href: "https://effect-ts.github.io/effect/effect/Graph.ts.html",
			},
			{
				name: "GroupBy",
				href: "https://effect-ts.github.io/effect/effect/GroupBy.ts.html",
			},
			{
				name: "Hash",
				href: "https://effect-ts.github.io/effect/effect/Hash.ts.html",
			},
			{
				name: "HashMap",
				href: "https://effect-ts.github.io/effect/effect/HashMap.ts.html",
			},
			{
				name: "HashRing",
				href: "https://effect-ts.github.io/effect/effect/HashRing.ts.html",
			},
			{
				name: "HashSet",
				href: "https://effect-ts.github.io/effect/effect/HashSet.ts.html",
			},
			{
				name: "HKT",
				href: "https://effect-ts.github.io/effect/effect/HKT.ts.html",
			},
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/effect/index.ts.html",
			},
			{
				name: "Inspectable",
				href: "https://effect-ts.github.io/effect/effect/Inspectable.ts.html",
			},
			{
				name: "Iterable",
				href: "https://effect-ts.github.io/effect/effect/Iterable.ts.html",
			},
			{
				name: "JSONSchema",
				href: "https://effect-ts.github.io/effect/effect/JSONSchema.ts.html",
			},
			{
				name: "KeyedPool",
				href: "https://effect-ts.github.io/effect/effect/KeyedPool.ts.html",
			},
			{
				name: "Layer",
				href: "https://effect-ts.github.io/effect/effect/Layer.ts.html",
			},
			{
				name: "LayerMap",
				href: "https://effect-ts.github.io/effect/effect/LayerMap.ts.html",
			},
			{
				name: "List",
				href: "https://effect-ts.github.io/effect/effect/List.ts.html",
			},
			{
				name: "Logger",
				href: "https://effect-ts.github.io/effect/effect/Logger.ts.html",
			},
			{
				name: "LogLevel",
				href: "https://effect-ts.github.io/effect/effect/LogLevel.ts.html",
			},
			{
				name: "LogSpan",
				href: "https://effect-ts.github.io/effect/effect/LogSpan.ts.html",
			},
			{
				name: "Mailbox",
				href: "https://effect-ts.github.io/effect/effect/Mailbox.ts.html",
			},
			{
				name: "ManagedRuntime",
				href: "https://effect-ts.github.io/effect/effect/ManagedRuntime.ts.html",
			},
			{
				name: "Match",
				href: "https://effect-ts.github.io/effect/effect/Match.ts.html",
			},
			{
				name: "MergeDecision",
				href: "https://effect-ts.github.io/effect/effect/MergeDecision.ts.html",
			},
			{
				name: "MergeState",
				href: "https://effect-ts.github.io/effect/effect/MergeState.ts.html",
			},
			{
				name: "MergeStrategy",
				href: "https://effect-ts.github.io/effect/effect/MergeStrategy.ts.html",
			},
			{
				name: "Metric",
				href: "https://effect-ts.github.io/effect/effect/Metric.ts.html",
			},
			{
				name: "MetricBoundaries",
				href: "https://effect-ts.github.io/effect/effect/MetricBoundaries.ts.html",
			},
			{
				name: "MetricHook",
				href: "https://effect-ts.github.io/effect/effect/MetricHook.ts.html",
			},
			{
				name: "MetricKey",
				href: "https://effect-ts.github.io/effect/effect/MetricKey.ts.html",
			},
			{
				name: "MetricKeyType",
				href: "https://effect-ts.github.io/effect/effect/MetricKeyType.ts.html",
			},
			{
				name: "MetricLabel",
				href: "https://effect-ts.github.io/effect/effect/MetricLabel.ts.html",
			},
			{
				name: "MetricPair",
				href: "https://effect-ts.github.io/effect/effect/MetricPair.ts.html",
			},
			{
				name: "MetricPolling",
				href: "https://effect-ts.github.io/effect/effect/MetricPolling.ts.html",
			},
			{
				name: "MetricRegistry",
				href: "https://effect-ts.github.io/effect/effect/MetricRegistry.ts.html",
			},
			{
				name: "MetricState",
				href: "https://effect-ts.github.io/effect/effect/MetricState.ts.html",
			},
			{
				name: "Micro",
				href: "https://effect-ts.github.io/effect/effect/Micro.ts.html",
			},
			{
				name: "ModuleVersion",
				href: "https://effect-ts.github.io/effect/effect/ModuleVersion.ts.html",
			},
			{
				name: "MutableHashMap",
				href: "https://effect-ts.github.io/effect/effect/MutableHashMap.ts.html",
			},
			{
				name: "MutableHashSet",
				href: "https://effect-ts.github.io/effect/effect/MutableHashSet.ts.html",
			},
			{
				name: "MutableList",
				href: "https://effect-ts.github.io/effect/effect/MutableList.ts.html",
			},
			{
				name: "MutableQueue",
				href: "https://effect-ts.github.io/effect/effect/MutableQueue.ts.html",
			},
			{
				name: "MutableRef",
				href: "https://effect-ts.github.io/effect/effect/MutableRef.ts.html",
			},
			{
				name: "NonEmptyIterable",
				href: "https://effect-ts.github.io/effect/effect/NonEmptyIterable.ts.html",
			},
			{
				name: "Number",
				href: "https://effect-ts.github.io/effect/effect/Number.ts.html",
			},
			{
				name: "Option",
				href: "https://effect-ts.github.io/effect/effect/Option.ts.html",
			},
			{
				name: "Order",
				href: "https://effect-ts.github.io/effect/effect/Order.ts.html",
			},
			{
				name: "Ordering",
				href: "https://effect-ts.github.io/effect/effect/Ordering.ts.html",
			},
			{
				name: "ParseResult",
				href: "https://effect-ts.github.io/effect/effect/ParseResult.ts.html",
			},
			{
				name: "PartitionedSemaphore",
				href: "https://effect-ts.github.io/effect/effect/PartitionedSemaphore.ts.html",
			},
			{
				name: "Pipeable",
				href: "https://effect-ts.github.io/effect/effect/Pipeable.ts.html",
			},
			{
				name: "Pool",
				href: "https://effect-ts.github.io/effect/effect/Pool.ts.html",
			},
			{
				name: "Predicate",
				href: "https://effect-ts.github.io/effect/effect/Predicate.ts.html",
			},
			{
				name: "Pretty",
				href: "https://effect-ts.github.io/effect/effect/Pretty.ts.html",
			},
			{
				name: "PrimaryKey",
				href: "https://effect-ts.github.io/effect/effect/PrimaryKey.ts.html",
			},
			{
				name: "PubSub",
				href: "https://effect-ts.github.io/effect/effect/PubSub.ts.html",
			},
			{
				name: "Queue",
				href: "https://effect-ts.github.io/effect/effect/Queue.ts.html",
			},
			{
				name: "Random",
				href: "https://effect-ts.github.io/effect/effect/Random.ts.html",
			},
			{
				name: "RateLimiter",
				href: "https://effect-ts.github.io/effect/effect/RateLimiter.ts.html",
			},
			{
				name: "RcMap",
				href: "https://effect-ts.github.io/effect/effect/RcMap.ts.html",
			},
			{
				name: "RcRef",
				href: "https://effect-ts.github.io/effect/effect/RcRef.ts.html",
			},
			{
				name: "Readable",
				href: "https://effect-ts.github.io/effect/effect/Readable.ts.html",
			},
			{
				name: "Record",
				href: "https://effect-ts.github.io/effect/effect/Record.ts.html",
			},
			{
				name: "Redacted",
				href: "https://effect-ts.github.io/effect/effect/Redacted.ts.html",
			},
			{
				name: "RedBlackTree",
				href: "https://effect-ts.github.io/effect/effect/RedBlackTree.ts.html",
			},
			{
				name: "Ref",
				href: "https://effect-ts.github.io/effect/effect/Ref.ts.html",
			},
			{
				name: "RegExp",
				href: "https://effect-ts.github.io/effect/effect/RegExp.ts.html",
			},
			{
				name: "Reloadable",
				href: "https://effect-ts.github.io/effect/effect/Reloadable.ts.html",
			},
			{
				name: "Request",
				href: "https://effect-ts.github.io/effect/effect/Request.ts.html",
			},
			{
				name: "RequestBlock",
				href: "https://effect-ts.github.io/effect/effect/RequestBlock.ts.html",
			},
			{
				name: "RequestResolver",
				href: "https://effect-ts.github.io/effect/effect/RequestResolver.ts.html",
			},
			{
				name: "Resource",
				href: "https://effect-ts.github.io/effect/effect/Resource.ts.html",
			},
			{
				name: "Runtime",
				href: "https://effect-ts.github.io/effect/effect/Runtime.ts.html",
			},
			{
				name: "RuntimeFlags",
				href: "https://effect-ts.github.io/effect/effect/RuntimeFlags.ts.html",
			},
			{
				name: "RuntimeFlagsPatch",
				href: "https://effect-ts.github.io/effect/effect/RuntimeFlagsPatch.ts.html",
			},
			{
				name: "Schedule",
				href: "https://effect-ts.github.io/effect/effect/Schedule.ts.html",
			},
			{
				name: "ScheduleDecision",
				href: "https://effect-ts.github.io/effect/effect/ScheduleDecision.ts.html",
			},
			{
				name: "ScheduleInterval",
				href: "https://effect-ts.github.io/effect/effect/ScheduleInterval.ts.html",
			},
			{
				name: "ScheduleIntervals",
				href: "https://effect-ts.github.io/effect/effect/ScheduleIntervals.ts.html",
			},
			{
				name: "Scheduler",
				href: "https://effect-ts.github.io/effect/effect/Scheduler.ts.html",
			},
			{
				name: "Schema",
				href: "https://effect-ts.github.io/effect/effect/Schema.ts.html",
			},
			{
				name: "SchemaAST",
				href: "https://effect-ts.github.io/effect/effect/SchemaAST.ts.html",
			},
			{
				name: "Scope",
				href: "https://effect-ts.github.io/effect/effect/Scope.ts.html",
			},
			{
				name: "ScopedCache",
				href: "https://effect-ts.github.io/effect/effect/ScopedCache.ts.html",
			},
			{
				name: "ScopedRef",
				href: "https://effect-ts.github.io/effect/effect/ScopedRef.ts.html",
			},
			{
				name: "Secret",
				href: "https://effect-ts.github.io/effect/effect/Secret.ts.html",
			},
			{
				name: "SingleProducerAsyncInput",
				href: "https://effect-ts.github.io/effect/effect/SingleProducerAsyncInput.ts.html",
			},
			{
				name: "Sink",
				href: "https://effect-ts.github.io/effect/effect/Sink.ts.html",
			},
			{
				name: "SortedMap",
				href: "https://effect-ts.github.io/effect/effect/SortedMap.ts.html",
			},
			{
				name: "SortedSet",
				href: "https://effect-ts.github.io/effect/effect/SortedSet.ts.html",
			},
			{
				name: "STM",
				href: "https://effect-ts.github.io/effect/effect/STM.ts.html",
			},
			{
				name: "Stream",
				href: "https://effect-ts.github.io/effect/effect/Stream.ts.html",
			},
			{
				name: "Streamable",
				href: "https://effect-ts.github.io/effect/effect/Streamable.ts.html",
			},
			{
				name: "StreamEmit",
				href: "https://effect-ts.github.io/effect/effect/StreamEmit.ts.html",
			},
			{
				name: "StreamHaltStrategy",
				href: "https://effect-ts.github.io/effect/effect/StreamHaltStrategy.ts.html",
			},
			{
				name: "String",
				href: "https://effect-ts.github.io/effect/effect/String.ts.html",
			},
			{
				name: "Struct",
				href: "https://effect-ts.github.io/effect/effect/Struct.ts.html",
			},
			{
				name: "Subscribable",
				href: "https://effect-ts.github.io/effect/effect/Subscribable.ts.html",
			},
			{
				name: "SubscriptionRef",
				href: "https://effect-ts.github.io/effect/effect/SubscriptionRef.ts.html",
			},
			{
				name: "Supervisor",
				href: "https://effect-ts.github.io/effect/effect/Supervisor.ts.html",
			},
			{
				name: "Symbol",
				href: "https://effect-ts.github.io/effect/effect/Symbol.ts.html",
			},
			{
				name: "SynchronizedRef",
				href: "https://effect-ts.github.io/effect/effect/SynchronizedRef.ts.html",
			},
			{
				name: "Take",
				href: "https://effect-ts.github.io/effect/effect/Take.ts.html",
			},
			{
				name: "TArray",
				href: "https://effect-ts.github.io/effect/effect/TArray.ts.html",
			},
			{
				name: "TDeferred",
				href: "https://effect-ts.github.io/effect/effect/TDeferred.ts.html",
			},
			{
				name: "TestAnnotation",
				href: "https://effect-ts.github.io/effect/effect/TestAnnotation.ts.html",
			},
			{
				name: "TestAnnotationMap",
				href: "https://effect-ts.github.io/effect/effect/TestAnnotationMap.ts.html",
			},
			{
				name: "TestAnnotations",
				href: "https://effect-ts.github.io/effect/effect/TestAnnotations.ts.html",
			},
			{
				name: "TestClock",
				href: "https://effect-ts.github.io/effect/effect/TestClock.ts.html",
			},
			{
				name: "TestConfig",
				href: "https://effect-ts.github.io/effect/effect/TestConfig.ts.html",
			},
			{
				name: "TestContext",
				href: "https://effect-ts.github.io/effect/effect/TestContext.ts.html",
			},
			{
				name: "TestLive",
				href: "https://effect-ts.github.io/effect/effect/TestLive.ts.html",
			},
			{
				name: "TestServices",
				href: "https://effect-ts.github.io/effect/effect/TestServices.ts.html",
			},
			{
				name: "TestSized",
				href: "https://effect-ts.github.io/effect/effect/TestSized.ts.html",
			},
			{
				name: "TMap",
				href: "https://effect-ts.github.io/effect/effect/TMap.ts.html",
			},
			{
				name: "TPriorityQueue",
				href: "https://effect-ts.github.io/effect/effect/TPriorityQueue.ts.html",
			},
			{
				name: "TPubSub",
				href: "https://effect-ts.github.io/effect/effect/TPubSub.ts.html",
			},
			{
				name: "TQueue",
				href: "https://effect-ts.github.io/effect/effect/TQueue.ts.html",
			},
			{
				name: "Tracer",
				href: "https://effect-ts.github.io/effect/effect/Tracer.ts.html",
			},
			{
				name: "TRandom",
				href: "https://effect-ts.github.io/effect/effect/TRandom.ts.html",
			},
			{
				name: "TReentrantLock",
				href: "https://effect-ts.github.io/effect/effect/TReentrantLock.ts.html",
			},
			{
				name: "TRef",
				href: "https://effect-ts.github.io/effect/effect/TRef.ts.html",
			},
			{
				name: "Trie",
				href: "https://effect-ts.github.io/effect/effect/Trie.ts.html",
			},
			{
				name: "TSemaphore",
				href: "https://effect-ts.github.io/effect/effect/TSemaphore.ts.html",
			},
			{
				name: "TSet",
				href: "https://effect-ts.github.io/effect/effect/TSet.ts.html",
			},
			{
				name: "TSubscriptionRef",
				href: "https://effect-ts.github.io/effect/effect/TSubscriptionRef.ts.html",
			},
			{
				name: "Tuple",
				href: "https://effect-ts.github.io/effect/effect/Tuple.ts.html",
			},
			{
				name: "Types",
				href: "https://effect-ts.github.io/effect/effect/Types.ts.html",
			},
			{
				name: "Unify",
				href: "https://effect-ts.github.io/effect/effect/Unify.ts.html",
			},
			{
				name: "UpstreamPullRequest",
				href: "https://effect-ts.github.io/effect/effect/UpstreamPullRequest.ts.html",
			},
			{
				name: "UpstreamPullStrategy",
				href: "https://effect-ts.github.io/effect/effect/UpstreamPullStrategy.ts.html",
			},
			{
				name: "Utils",
				href: "https://effect-ts.github.io/effect/effect/Utils.ts.html",
			},
		],
	},
	{
		slug: "experimental",
		name: "@effect/experimental",
		description:
			"Experimental modules under active development \u2014 APIs may change without notice.",
		modules: [
			{
				name: "DevTools",
				href: "https://effect-ts.github.io/effect/experimental/DevTools.ts.html",
			},
			{
				name: "DevTools/Client",
				href: "https://effect-ts.github.io/effect/experimental/DevTools/Client.ts.html",
			},
			{
				name: "DevTools/Domain",
				href: "https://effect-ts.github.io/effect/experimental/DevTools/Domain.ts.html",
			},
			{
				name: "DevTools/Server",
				href: "https://effect-ts.github.io/effect/experimental/DevTools/Server.ts.html",
			},
			{
				name: "Event",
				href: "https://effect-ts.github.io/effect/experimental/Event.ts.html",
			},
			{
				name: "EventGroup",
				href: "https://effect-ts.github.io/effect/experimental/EventGroup.ts.html",
			},
			{
				name: "EventJournal",
				href: "https://effect-ts.github.io/effect/experimental/EventJournal.ts.html",
			},
			{
				name: "EventLog",
				href: "https://effect-ts.github.io/effect/experimental/EventLog.ts.html",
			},
			{
				name: "EventLogEncryption",
				href: "https://effect-ts.github.io/effect/experimental/EventLogEncryption.ts.html",
			},
			{
				name: "EventLogRemote",
				href: "https://effect-ts.github.io/effect/experimental/EventLogRemote.ts.html",
			},
			{
				name: "EventLogServer",
				href: "https://effect-ts.github.io/effect/experimental/EventLogServer.ts.html",
			},
			{
				name: "EventLogServer/Cloudflare",
				href: "https://effect-ts.github.io/effect/experimental/EventLogServer/Cloudflare.ts.html",
			},
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/experimental/index.ts.html",
			},
			{
				name: "Machine",
				href: "https://effect-ts.github.io/effect/experimental/Machine.ts.html",
			},
			{
				name: "Machine/Procedure",
				href: "https://effect-ts.github.io/effect/experimental/Machine/Procedure.ts.html",
			},
			{
				name: "Machine/ProcedureList",
				href: "https://effect-ts.github.io/effect/experimental/Machine/ProcedureList.ts.html",
			},
			{
				name: "Machine/SerializableProcedureList",
				href: "https://effect-ts.github.io/effect/experimental/Machine/SerializableProcedureList.ts.html",
			},
			{
				name: "PersistedCache",
				href: "https://effect-ts.github.io/effect/experimental/PersistedCache.ts.html",
			},
			{
				name: "PersistedQueue",
				href: "https://effect-ts.github.io/effect/experimental/PersistedQueue.ts.html",
			},
			{
				name: "PersistedQueue/Redis",
				href: "https://effect-ts.github.io/effect/experimental/PersistedQueue/Redis.ts.html",
			},
			{
				name: "Persistence",
				href: "https://effect-ts.github.io/effect/experimental/Persistence.ts.html",
			},
			{
				name: "Persistence/Lmdb",
				href: "https://effect-ts.github.io/effect/experimental/Persistence/Lmdb.ts.html",
			},
			{
				name: "Persistence/Redis",
				href: "https://effect-ts.github.io/effect/experimental/Persistence/Redis.ts.html",
			},
			{
				name: "RateLimiter",
				href: "https://effect-ts.github.io/effect/experimental/RateLimiter.ts.html",
			},
			{
				name: "RateLimiter/Redis",
				href: "https://effect-ts.github.io/effect/experimental/RateLimiter/Redis.ts.html",
			},
			{
				name: "Reactivity",
				href: "https://effect-ts.github.io/effect/experimental/Reactivity.ts.html",
			},
			{
				name: "RequestResolver",
				href: "https://effect-ts.github.io/effect/experimental/RequestResolver.ts.html",
			},
			{
				name: "Sse",
				href: "https://effect-ts.github.io/effect/experimental/Sse.ts.html",
			},
			{
				name: "VariantSchema",
				href: "https://effect-ts.github.io/effect/experimental/VariantSchema.ts.html",
			},
		],
	},
	{
		slug: "opentelemetry",
		name: "@effect/opentelemetry",
		description: "OpenTelemetry integration for tracing, metrics, and logging.",
		modules: [
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/opentelemetry/index.ts.html",
			},
			{
				name: "Logger",
				href: "https://effect-ts.github.io/effect/opentelemetry/Logger.ts.html",
			},
			{
				name: "Metrics",
				href: "https://effect-ts.github.io/effect/opentelemetry/Metrics.ts.html",
			},
			{
				name: "NodeSdk",
				href: "https://effect-ts.github.io/effect/opentelemetry/NodeSdk.ts.html",
			},
			{
				name: "Otlp",
				href: "https://effect-ts.github.io/effect/opentelemetry/Otlp.ts.html",
			},
			{
				name: "OtlpLogger",
				href: "https://effect-ts.github.io/effect/opentelemetry/OtlpLogger.ts.html",
			},
			{
				name: "OtlpMetrics",
				href: "https://effect-ts.github.io/effect/opentelemetry/OtlpMetrics.ts.html",
			},
			{
				name: "OtlpResource",
				href: "https://effect-ts.github.io/effect/opentelemetry/OtlpResource.ts.html",
			},
			{
				name: "OtlpSerialization",
				href: "https://effect-ts.github.io/effect/opentelemetry/OtlpSerialization.ts.html",
			},
			{
				name: "OtlpTracer",
				href: "https://effect-ts.github.io/effect/opentelemetry/OtlpTracer.ts.html",
			},
			{
				name: "Resource",
				href: "https://effect-ts.github.io/effect/opentelemetry/Resource.ts.html",
			},
			{
				name: "Tracer",
				href: "https://effect-ts.github.io/effect/opentelemetry/Tracer.ts.html",
			},
			{
				name: "WebSdk",
				href: "https://effect-ts.github.io/effect/opentelemetry/WebSdk.ts.html",
			},
		],
	},
	{
		slug: "platform",
		name: "@effect/platform",
		description:
			"Platform-agnostic abstractions for HTTP, file systems, sockets, workers, and more.",
		modules: [
			{
				name: "ChannelSchema",
				href: "https://effect-ts.github.io/effect/platform/ChannelSchema.ts.html",
			},
			{
				name: "Command",
				href: "https://effect-ts.github.io/effect/platform/Command.ts.html",
			},
			{
				name: "CommandExecutor",
				href: "https://effect-ts.github.io/effect/platform/CommandExecutor.ts.html",
			},
			{
				name: "Cookies",
				href: "https://effect-ts.github.io/effect/platform/Cookies.ts.html",
			},
			{
				name: "Effectify",
				href: "https://effect-ts.github.io/effect/platform/Effectify.ts.html",
			},
			{
				name: "Error",
				href: "https://effect-ts.github.io/effect/platform/Error.ts.html",
			},
			{
				name: "Etag",
				href: "https://effect-ts.github.io/effect/platform/Etag.ts.html",
			},
			{
				name: "FetchHttpClient",
				href: "https://effect-ts.github.io/effect/platform/FetchHttpClient.ts.html",
			},
			{
				name: "FileSystem",
				href: "https://effect-ts.github.io/effect/platform/FileSystem.ts.html",
			},
			{
				name: "Headers",
				href: "https://effect-ts.github.io/effect/platform/Headers.ts.html",
			},
			{
				name: "HttpApi",
				href: "https://effect-ts.github.io/effect/platform/HttpApi.ts.html",
			},
			{
				name: "HttpApiBuilder",
				href: "https://effect-ts.github.io/effect/platform/HttpApiBuilder.ts.html",
			},
			{
				name: "HttpApiClient",
				href: "https://effect-ts.github.io/effect/platform/HttpApiClient.ts.html",
			},
			{
				name: "HttpApiEndpoint",
				href: "https://effect-ts.github.io/effect/platform/HttpApiEndpoint.ts.html",
			},
			{
				name: "HttpApiError",
				href: "https://effect-ts.github.io/effect/platform/HttpApiError.ts.html",
			},
			{
				name: "HttpApiGroup",
				href: "https://effect-ts.github.io/effect/platform/HttpApiGroup.ts.html",
			},
			{
				name: "HttpApiMiddleware",
				href: "https://effect-ts.github.io/effect/platform/HttpApiMiddleware.ts.html",
			},
			{
				name: "HttpApiScalar",
				href: "https://effect-ts.github.io/effect/platform/HttpApiScalar.ts.html",
			},
			{
				name: "HttpApiSchema",
				href: "https://effect-ts.github.io/effect/platform/HttpApiSchema.ts.html",
			},
			{
				name: "HttpApiSecurity",
				href: "https://effect-ts.github.io/effect/platform/HttpApiSecurity.ts.html",
			},
			{
				name: "HttpApiSwagger",
				href: "https://effect-ts.github.io/effect/platform/HttpApiSwagger.ts.html",
			},
			{
				name: "HttpApp",
				href: "https://effect-ts.github.io/effect/platform/HttpApp.ts.html",
			},
			{
				name: "HttpBody",
				href: "https://effect-ts.github.io/effect/platform/HttpBody.ts.html",
			},
			{
				name: "HttpClient",
				href: "https://effect-ts.github.io/effect/platform/HttpClient.ts.html",
			},
			{
				name: "HttpClientError",
				href: "https://effect-ts.github.io/effect/platform/HttpClientError.ts.html",
			},
			{
				name: "HttpClientRequest",
				href: "https://effect-ts.github.io/effect/platform/HttpClientRequest.ts.html",
			},
			{
				name: "HttpClientResponse",
				href: "https://effect-ts.github.io/effect/platform/HttpClientResponse.ts.html",
			},
			{
				name: "HttpIncomingMessage",
				href: "https://effect-ts.github.io/effect/platform/HttpIncomingMessage.ts.html",
			},
			{
				name: "HttpLayerRouter",
				href: "https://effect-ts.github.io/effect/platform/HttpLayerRouter.ts.html",
			},
			{
				name: "HttpMethod",
				href: "https://effect-ts.github.io/effect/platform/HttpMethod.ts.html",
			},
			{
				name: "HttpMiddleware",
				href: "https://effect-ts.github.io/effect/platform/HttpMiddleware.ts.html",
			},
			{
				name: "HttpMultiplex",
				href: "https://effect-ts.github.io/effect/platform/HttpMultiplex.ts.html",
			},
			{
				name: "HttpPlatform",
				href: "https://effect-ts.github.io/effect/platform/HttpPlatform.ts.html",
			},
			{
				name: "HttpRouter",
				href: "https://effect-ts.github.io/effect/platform/HttpRouter.ts.html",
			},
			{
				name: "HttpServer",
				href: "https://effect-ts.github.io/effect/platform/HttpServer.ts.html",
			},
			{
				name: "HttpServerError",
				href: "https://effect-ts.github.io/effect/platform/HttpServerError.ts.html",
			},
			{
				name: "HttpServerRequest",
				href: "https://effect-ts.github.io/effect/platform/HttpServerRequest.ts.html",
			},
			{
				name: "HttpServerRespondable",
				href: "https://effect-ts.github.io/effect/platform/HttpServerRespondable.ts.html",
			},
			{
				name: "HttpServerResponse",
				href: "https://effect-ts.github.io/effect/platform/HttpServerResponse.ts.html",
			},
			{
				name: "HttpTraceContext",
				href: "https://effect-ts.github.io/effect/platform/HttpTraceContext.ts.html",
			},
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/platform/index.ts.html",
			},
			{
				name: "KeyValueStore",
				href: "https://effect-ts.github.io/effect/platform/KeyValueStore.ts.html",
			},
			{
				name: "MsgPack",
				href: "https://effect-ts.github.io/effect/platform/MsgPack.ts.html",
			},
			{
				name: "Multipart",
				href: "https://effect-ts.github.io/effect/platform/Multipart.ts.html",
			},
			{
				name: "Ndjson",
				href: "https://effect-ts.github.io/effect/platform/Ndjson.ts.html",
			},
			{
				name: "OpenApi",
				href: "https://effect-ts.github.io/effect/platform/OpenApi.ts.html",
			},
			{
				name: "OpenApiJsonSchema",
				href: "https://effect-ts.github.io/effect/platform/OpenApiJsonSchema.ts.html",
			},
			{
				name: "Path",
				href: "https://effect-ts.github.io/effect/platform/Path.ts.html",
			},
			{
				name: "PlatformConfigProvider",
				href: "https://effect-ts.github.io/effect/platform/PlatformConfigProvider.ts.html",
			},
			{
				name: "PlatformLogger",
				href: "https://effect-ts.github.io/effect/platform/PlatformLogger.ts.html",
			},
			{
				name: "Runtime",
				href: "https://effect-ts.github.io/effect/platform/Runtime.ts.html",
			},
			{
				name: "Socket",
				href: "https://effect-ts.github.io/effect/platform/Socket.ts.html",
			},
			{
				name: "SocketServer",
				href: "https://effect-ts.github.io/effect/platform/SocketServer.ts.html",
			},
			{
				name: "Template",
				href: "https://effect-ts.github.io/effect/platform/Template.ts.html",
			},
			{
				name: "Terminal",
				href: "https://effect-ts.github.io/effect/platform/Terminal.ts.html",
			},
			{
				name: "Transferable",
				href: "https://effect-ts.github.io/effect/platform/Transferable.ts.html",
			},
			{
				name: "Url",
				href: "https://effect-ts.github.io/effect/platform/Url.ts.html",
			},
			{
				name: "UrlParams",
				href: "https://effect-ts.github.io/effect/platform/UrlParams.ts.html",
			},
			{
				name: "Worker",
				href: "https://effect-ts.github.io/effect/platform/Worker.ts.html",
			},
			{
				name: "WorkerError",
				href: "https://effect-ts.github.io/effect/platform/WorkerError.ts.html",
			},
			{
				name: "WorkerRunner",
				href: "https://effect-ts.github.io/effect/platform/WorkerRunner.ts.html",
			},
		],
	},
	{
		slug: "platform-browser",
		name: "@effect/platform-browser",
		description: "Browser implementations of the platform abstractions.",
		modules: [
			{
				name: "BrowserHttpClient",
				href: "https://effect-ts.github.io/effect/platform-browser/BrowserHttpClient.ts.html",
			},
			{
				name: "BrowserKeyValueStore",
				href: "https://effect-ts.github.io/effect/platform-browser/BrowserKeyValueStore.ts.html",
			},
			{
				name: "BrowserRuntime",
				href: "https://effect-ts.github.io/effect/platform-browser/BrowserRuntime.ts.html",
			},
			{
				name: "BrowserSocket",
				href: "https://effect-ts.github.io/effect/platform-browser/BrowserSocket.ts.html",
			},
			{
				name: "BrowserStream",
				href: "https://effect-ts.github.io/effect/platform-browser/BrowserStream.ts.html",
			},
			{
				name: "BrowserWorker",
				href: "https://effect-ts.github.io/effect/platform-browser/BrowserWorker.ts.html",
			},
			{
				name: "BrowserWorkerRunner",
				href: "https://effect-ts.github.io/effect/platform-browser/BrowserWorkerRunner.ts.html",
			},
			{
				name: "Clipboard",
				href: "https://effect-ts.github.io/effect/platform-browser/Clipboard.ts.html",
			},
			{
				name: "Geolocation",
				href: "https://effect-ts.github.io/effect/platform-browser/Geolocation.ts.html",
			},
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/platform-browser/index.ts.html",
			},
			{
				name: "Permissions",
				href: "https://effect-ts.github.io/effect/platform-browser/Permissions.ts.html",
			},
		],
	},
	{
		slug: "platform-bun",
		name: "@effect/platform-bun",
		description: "Bun implementations of the platform abstractions.",
		modules: [
			{
				name: "BunClusterHttp",
				href: "https://effect-ts.github.io/effect/platform-bun/BunClusterHttp.ts.html",
			},
			{
				name: "BunClusterSocket",
				href: "https://effect-ts.github.io/effect/platform-bun/BunClusterSocket.ts.html",
			},
			{
				name: "BunCommandExecutor",
				href: "https://effect-ts.github.io/effect/platform-bun/BunCommandExecutor.ts.html",
			},
			{
				name: "BunContext",
				href: "https://effect-ts.github.io/effect/platform-bun/BunContext.ts.html",
			},
			{
				name: "BunFileSystem",
				href: "https://effect-ts.github.io/effect/platform-bun/BunFileSystem.ts.html",
			},
			{
				name: "BunFileSystem/ParcelWatcher",
				href: "https://effect-ts.github.io/effect/platform-bun/BunFileSystem/ParcelWatcher.ts.html",
			},
			{
				name: "BunHttpPlatform",
				href: "https://effect-ts.github.io/effect/platform-bun/BunHttpPlatform.ts.html",
			},
			{
				name: "BunHttpServer",
				href: "https://effect-ts.github.io/effect/platform-bun/BunHttpServer.ts.html",
			},
			{
				name: "BunHttpServerRequest",
				href: "https://effect-ts.github.io/effect/platform-bun/BunHttpServerRequest.ts.html",
			},
			{
				name: "BunKeyValueStore",
				href: "https://effect-ts.github.io/effect/platform-bun/BunKeyValueStore.ts.html",
			},
			{
				name: "BunMultipart",
				href: "https://effect-ts.github.io/effect/platform-bun/BunMultipart.ts.html",
			},
			{
				name: "BunPath",
				href: "https://effect-ts.github.io/effect/platform-bun/BunPath.ts.html",
			},
			{
				name: "BunRuntime",
				href: "https://effect-ts.github.io/effect/platform-bun/BunRuntime.ts.html",
			},
			{
				name: "BunSink",
				href: "https://effect-ts.github.io/effect/platform-bun/BunSink.ts.html",
			},
			{
				name: "BunSocket",
				href: "https://effect-ts.github.io/effect/platform-bun/BunSocket.ts.html",
			},
			{
				name: "BunSocketServer",
				href: "https://effect-ts.github.io/effect/platform-bun/BunSocketServer.ts.html",
			},
			{
				name: "BunStream",
				href: "https://effect-ts.github.io/effect/platform-bun/BunStream.ts.html",
			},
			{
				name: "BunTerminal",
				href: "https://effect-ts.github.io/effect/platform-bun/BunTerminal.ts.html",
			},
			{
				name: "BunWorker",
				href: "https://effect-ts.github.io/effect/platform-bun/BunWorker.ts.html",
			},
			{
				name: "BunWorkerRunner",
				href: "https://effect-ts.github.io/effect/platform-bun/BunWorkerRunner.ts.html",
			},
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/platform-bun/index.ts.html",
			},
		],
	},
	{
		slug: "platform-node",
		name: "@effect/platform-node",
		description: "Node.js implementations of the platform abstractions.",
		modules: [
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/platform-node/index.ts.html",
			},
			{
				name: "NodeClusterHttp",
				href: "https://effect-ts.github.io/effect/platform-node/NodeClusterHttp.ts.html",
			},
			{
				name: "NodeClusterSocket",
				href: "https://effect-ts.github.io/effect/platform-node/NodeClusterSocket.ts.html",
			},
			{
				name: "NodeCommandExecutor",
				href: "https://effect-ts.github.io/effect/platform-node/NodeCommandExecutor.ts.html",
			},
			{
				name: "NodeContext",
				href: "https://effect-ts.github.io/effect/platform-node/NodeContext.ts.html",
			},
			{
				name: "NodeFileSystem",
				href: "https://effect-ts.github.io/effect/platform-node/NodeFileSystem.ts.html",
			},
			{
				name: "NodeFileSystem/ParcelWatcher",
				href: "https://effect-ts.github.io/effect/platform-node/NodeFileSystem/ParcelWatcher.ts.html",
			},
			{
				name: "NodeHttpClient",
				href: "https://effect-ts.github.io/effect/platform-node/NodeHttpClient.ts.html",
			},
			{
				name: "NodeHttpPlatform",
				href: "https://effect-ts.github.io/effect/platform-node/NodeHttpPlatform.ts.html",
			},
			{
				name: "NodeHttpServer",
				href: "https://effect-ts.github.io/effect/platform-node/NodeHttpServer.ts.html",
			},
			{
				name: "NodeHttpServerRequest",
				href: "https://effect-ts.github.io/effect/platform-node/NodeHttpServerRequest.ts.html",
			},
			{
				name: "NodeKeyValueStore",
				href: "https://effect-ts.github.io/effect/platform-node/NodeKeyValueStore.ts.html",
			},
			{
				name: "NodeMultipart",
				href: "https://effect-ts.github.io/effect/platform-node/NodeMultipart.ts.html",
			},
			{
				name: "NodePath",
				href: "https://effect-ts.github.io/effect/platform-node/NodePath.ts.html",
			},
			{
				name: "NodeRuntime",
				href: "https://effect-ts.github.io/effect/platform-node/NodeRuntime.ts.html",
			},
			{
				name: "NodeSink",
				href: "https://effect-ts.github.io/effect/platform-node/NodeSink.ts.html",
			},
			{
				name: "NodeSocket",
				href: "https://effect-ts.github.io/effect/platform-node/NodeSocket.ts.html",
			},
			{
				name: "NodeSocketServer",
				href: "https://effect-ts.github.io/effect/platform-node/NodeSocketServer.ts.html",
			},
			{
				name: "NodeStream",
				href: "https://effect-ts.github.io/effect/platform-node/NodeStream.ts.html",
			},
			{
				name: "NodeTerminal",
				href: "https://effect-ts.github.io/effect/platform-node/NodeTerminal.ts.html",
			},
			{
				name: "NodeWorker",
				href: "https://effect-ts.github.io/effect/platform-node/NodeWorker.ts.html",
			},
			{
				name: "NodeWorkerRunner",
				href: "https://effect-ts.github.io/effect/platform-node/NodeWorkerRunner.ts.html",
			},
			{
				name: "Undici",
				href: "https://effect-ts.github.io/effect/platform-node/Undici.ts.html",
			},
		],
	},
	{
		slug: "platform-node-shared",
		name: "@effect/platform-node-shared",
		description:
			"Shared internals for Node.js-compatible platform implementations.",
		modules: [
			{
				name: "NodeClusterSocket",
				href: "https://effect-ts.github.io/effect/platform-node-shared/NodeClusterSocket.ts.html",
			},
			{
				name: "NodeCommandExecutor",
				href: "https://effect-ts.github.io/effect/platform-node-shared/NodeCommandExecutor.ts.html",
			},
			{
				name: "NodeFileSystem",
				href: "https://effect-ts.github.io/effect/platform-node-shared/NodeFileSystem.ts.html",
			},
			{
				name: "NodeFileSystem/ParcelWatcher",
				href: "https://effect-ts.github.io/effect/platform-node-shared/NodeFileSystem/ParcelWatcher.ts.html",
			},
			{
				name: "NodeKeyValueStore",
				href: "https://effect-ts.github.io/effect/platform-node-shared/NodeKeyValueStore.ts.html",
			},
			{
				name: "NodeMultipart",
				href: "https://effect-ts.github.io/effect/platform-node-shared/NodeMultipart.ts.html",
			},
			{
				name: "NodePath",
				href: "https://effect-ts.github.io/effect/platform-node-shared/NodePath.ts.html",
			},
			{
				name: "NodeRuntime",
				href: "https://effect-ts.github.io/effect/platform-node-shared/NodeRuntime.ts.html",
			},
			{
				name: "NodeSink",
				href: "https://effect-ts.github.io/effect/platform-node-shared/NodeSink.ts.html",
			},
			{
				name: "NodeSocket",
				href: "https://effect-ts.github.io/effect/platform-node-shared/NodeSocket.ts.html",
			},
			{
				name: "NodeSocketServer",
				href: "https://effect-ts.github.io/effect/platform-node-shared/NodeSocketServer.ts.html",
			},
			{
				name: "NodeStream",
				href: "https://effect-ts.github.io/effect/platform-node-shared/NodeStream.ts.html",
			},
			{
				name: "NodeTerminal",
				href: "https://effect-ts.github.io/effect/platform-node-shared/NodeTerminal.ts.html",
			},
		],
	},
	{
		slug: "printer",
		name: "@effect/printer",
		description: "A pretty-printer for rendering structured documents to text.",
		modules: [
			{
				name: "Doc",
				href: "https://effect-ts.github.io/effect/printer/Doc.ts.html",
			},
			{
				name: "DocStream",
				href: "https://effect-ts.github.io/effect/printer/DocStream.ts.html",
			},
			{
				name: "DocTree",
				href: "https://effect-ts.github.io/effect/printer/DocTree.ts.html",
			},
			{
				name: "Flatten",
				href: "https://effect-ts.github.io/effect/printer/Flatten.ts.html",
			},
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/printer/index.ts.html",
			},
			{
				name: "Layout",
				href: "https://effect-ts.github.io/effect/printer/Layout.ts.html",
			},
			{
				name: "Optimize",
				href: "https://effect-ts.github.io/effect/printer/Optimize.ts.html",
			},
			{
				name: "PageWidth",
				href: "https://effect-ts.github.io/effect/printer/PageWidth.ts.html",
			},
		],
	},
	{
		slug: "printer-ansi",
		name: "@effect/printer-ansi",
		description:
			"ANSI terminal rendering with colors and styles for the printer.",
		modules: [
			{
				name: "Ansi",
				href: "https://effect-ts.github.io/effect/printer-ansi/Ansi.ts.html",
			},
			{
				name: "AnsiDoc",
				href: "https://effect-ts.github.io/effect/printer-ansi/AnsiDoc.ts.html",
			},
			{
				name: "Color",
				href: "https://effect-ts.github.io/effect/printer-ansi/Color.ts.html",
			},
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/printer-ansi/index.ts.html",
			},
		],
	},
	{
		slug: "rpc",
		name: "@effect/rpc",
		description: "Type-safe remote procedure calls between client and server.",
		modules: [
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/rpc/index.ts.html",
			},
			{
				name: "Rpc",
				href: "https://effect-ts.github.io/effect/rpc/Rpc.ts.html",
			},
			{
				name: "RpcClient",
				href: "https://effect-ts.github.io/effect/rpc/RpcClient.ts.html",
			},
			{
				name: "RpcClientError",
				href: "https://effect-ts.github.io/effect/rpc/RpcClientError.ts.html",
			},
			{
				name: "RpcGroup",
				href: "https://effect-ts.github.io/effect/rpc/RpcGroup.ts.html",
			},
			{
				name: "RpcMessage",
				href: "https://effect-ts.github.io/effect/rpc/RpcMessage.ts.html",
			},
			{
				name: "RpcMiddleware",
				href: "https://effect-ts.github.io/effect/rpc/RpcMiddleware.ts.html",
			},
			{
				name: "RpcSchema",
				href: "https://effect-ts.github.io/effect/rpc/RpcSchema.ts.html",
			},
			{
				name: "RpcSerialization",
				href: "https://effect-ts.github.io/effect/rpc/RpcSerialization.ts.html",
			},
			{
				name: "RpcServer",
				href: "https://effect-ts.github.io/effect/rpc/RpcServer.ts.html",
			},
			{
				name: "RpcTest",
				href: "https://effect-ts.github.io/effect/rpc/RpcTest.ts.html",
			},
			{
				name: "RpcWorker",
				href: "https://effect-ts.github.io/effect/rpc/RpcWorker.ts.html",
			},
		],
	},
	{
		slug: "sql",
		name: "@effect/sql",
		description:
			"SQL toolkit with clients, statements, migrations, models, and resolvers.",
		modules: [
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/sql/index.ts.html",
			},
			{
				name: "Migrator",
				href: "https://effect-ts.github.io/effect/sql/Migrator.ts.html",
			},
			{
				name: "Migrator/FileSystem",
				href: "https://effect-ts.github.io/effect/sql/Migrator/FileSystem.ts.html",
			},
			{
				name: "Model",
				href: "https://effect-ts.github.io/effect/sql/Model.ts.html",
			},
			{
				name: "SqlClient",
				href: "https://effect-ts.github.io/effect/sql/SqlClient.ts.html",
			},
			{
				name: "SqlConnection",
				href: "https://effect-ts.github.io/effect/sql/SqlConnection.ts.html",
			},
			{
				name: "SqlError",
				href: "https://effect-ts.github.io/effect/sql/SqlError.ts.html",
			},
			{
				name: "SqlEventJournal",
				href: "https://effect-ts.github.io/effect/sql/SqlEventJournal.ts.html",
			},
			{
				name: "SqlEventLogServer",
				href: "https://effect-ts.github.io/effect/sql/SqlEventLogServer.ts.html",
			},
			{
				name: "SqlPersistedQueue",
				href: "https://effect-ts.github.io/effect/sql/SqlPersistedQueue.ts.html",
			},
			{
				name: "SqlResolver",
				href: "https://effect-ts.github.io/effect/sql/SqlResolver.ts.html",
			},
			{
				name: "SqlSchema",
				href: "https://effect-ts.github.io/effect/sql/SqlSchema.ts.html",
			},
			{
				name: "SqlStream",
				href: "https://effect-ts.github.io/effect/sql/SqlStream.ts.html",
			},
			{
				name: "Statement",
				href: "https://effect-ts.github.io/effect/sql/Statement.ts.html",
			},
		],
	},
	{
		slug: "sql-clickhouse",
		name: "@effect/sql-clickhouse",
		description: "ClickHouse client and migrator.",
		modules: [
			{
				name: "ClickhouseClient",
				href: "https://effect-ts.github.io/effect/sql-clickhouse/ClickhouseClient.ts.html",
			},
			{
				name: "ClickhouseMigrator",
				href: "https://effect-ts.github.io/effect/sql-clickhouse/ClickhouseMigrator.ts.html",
			},
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/sql-clickhouse/index.ts.html",
			},
		],
	},
	{
		slug: "sql-d1",
		name: "@effect/sql-d1",
		description: "Cloudflare D1 client.",
		modules: [
			{
				name: "D1Client",
				href: "https://effect-ts.github.io/effect/sql-d1/D1Client.ts.html",
			},
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/sql-d1/index.ts.html",
			},
		],
	},
	{
		slug: "sql-drizzle",
		name: "@effect/sql-drizzle",
		description: "Drizzle ORM integration for Postgres, MySQL, and SQLite.",
		modules: [
			{
				name: "Mysql",
				href: "https://effect-ts.github.io/effect/sql-drizzle/Mysql.ts.html",
			},
			{
				name: "Pg",
				href: "https://effect-ts.github.io/effect/sql-drizzle/Pg.ts.html",
			},
			{
				name: "Sqlite",
				href: "https://effect-ts.github.io/effect/sql-drizzle/Sqlite.ts.html",
			},
		],
	},
	{
		slug: "sql-kysely",
		name: "@effect/sql-kysely",
		description:
			"Kysely query-builder integration for Postgres, MySQL, MSSQL, and SQLite.",
		modules: [
			{
				name: "Kysely",
				href: "https://effect-ts.github.io/effect/sql-kysely/Kysely.ts.html",
			},
			{
				name: "Mssql",
				href: "https://effect-ts.github.io/effect/sql-kysely/Mssql.ts.html",
			},
			{
				name: "Mysql",
				href: "https://effect-ts.github.io/effect/sql-kysely/Mysql.ts.html",
			},
			{
				name: "patch.types",
				href: "https://effect-ts.github.io/effect/sql-kysely/patch.types.ts.html",
			},
			{
				name: "Pg",
				href: "https://effect-ts.github.io/effect/sql-kysely/Pg.ts.html",
			},
			{
				name: "Sqlite",
				href: "https://effect-ts.github.io/effect/sql-kysely/Sqlite.ts.html",
			},
		],
	},
	{
		slug: "sql-libsql",
		name: "@effect/sql-libsql",
		description: "libSQL client and migrator.",
		modules: [
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/sql-libsql/index.ts.html",
			},
			{
				name: "LibsqlClient",
				href: "https://effect-ts.github.io/effect/sql-libsql/LibsqlClient.ts.html",
			},
			{
				name: "LibsqlMigrator",
				href: "https://effect-ts.github.io/effect/sql-libsql/LibsqlMigrator.ts.html",
			},
		],
	},
	{
		slug: "sql-mssql",
		name: "@effect/sql-mssql",
		description: "Microsoft SQL Server client and migrator.",
		modules: [
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/sql-mssql/index.ts.html",
			},
			{
				name: "MssqlClient",
				href: "https://effect-ts.github.io/effect/sql-mssql/MssqlClient.ts.html",
			},
			{
				name: "MssqlMigrator",
				href: "https://effect-ts.github.io/effect/sql-mssql/MssqlMigrator.ts.html",
			},
			{
				name: "Parameter",
				href: "https://effect-ts.github.io/effect/sql-mssql/Parameter.ts.html",
			},
			{
				name: "Procedure",
				href: "https://effect-ts.github.io/effect/sql-mssql/Procedure.ts.html",
			},
		],
	},
	{
		slug: "sql-mysql2",
		name: "@effect/sql-mysql2",
		description: "MySQL client and migrator built on mysql2.",
		modules: [
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/sql-mysql2/index.ts.html",
			},
			{
				name: "MysqlClient",
				href: "https://effect-ts.github.io/effect/sql-mysql2/MysqlClient.ts.html",
			},
			{
				name: "MysqlMigrator",
				href: "https://effect-ts.github.io/effect/sql-mysql2/MysqlMigrator.ts.html",
			},
		],
	},
	{
		slug: "sql-pg",
		name: "@effect/sql-pg",
		description: "PostgreSQL client and migrator.",
		modules: [
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/sql-pg/index.ts.html",
			},
			{
				name: "PgClient",
				href: "https://effect-ts.github.io/effect/sql-pg/PgClient.ts.html",
			},
			{
				name: "PgMigrator",
				href: "https://effect-ts.github.io/effect/sql-pg/PgMigrator.ts.html",
			},
		],
	},
	{
		slug: "sql-sqlite-bun",
		name: "@effect/sql-sqlite-bun",
		description: "SQLite client and migrator for Bun.",
		modules: [
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/sql-sqlite-bun/index.ts.html",
			},
			{
				name: "SqliteClient",
				href: "https://effect-ts.github.io/effect/sql-sqlite-bun/SqliteClient.ts.html",
			},
			{
				name: "SqliteMigrator",
				href: "https://effect-ts.github.io/effect/sql-sqlite-bun/SqliteMigrator.ts.html",
			},
		],
	},
	{
		slug: "sql-sqlite-do",
		name: "@effect/sql-sqlite-do",
		description: "SQLite client and migrator for Cloudflare Durable Objects.",
		modules: [
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/sql-sqlite-do/index.ts.html",
			},
			{
				name: "SqliteClient",
				href: "https://effect-ts.github.io/effect/sql-sqlite-do/SqliteClient.ts.html",
			},
			{
				name: "SqliteMigrator",
				href: "https://effect-ts.github.io/effect/sql-sqlite-do/SqliteMigrator.ts.html",
			},
		],
	},
	{
		slug: "sql-sqlite-node",
		name: "@effect/sql-sqlite-node",
		description: "SQLite client and migrator for Node.js.",
		modules: [
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/sql-sqlite-node/index.ts.html",
			},
			{
				name: "SqliteClient",
				href: "https://effect-ts.github.io/effect/sql-sqlite-node/SqliteClient.ts.html",
			},
			{
				name: "SqliteMigrator",
				href: "https://effect-ts.github.io/effect/sql-sqlite-node/SqliteMigrator.ts.html",
			},
		],
	},
	{
		slug: "sql-sqlite-react-native",
		name: "@effect/sql-sqlite-react-native",
		description: "SQLite client and migrator for React Native.",
		modules: [
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/sql-sqlite-react-native/index.ts.html",
			},
			{
				name: "SqliteClient",
				href: "https://effect-ts.github.io/effect/sql-sqlite-react-native/SqliteClient.ts.html",
			},
			{
				name: "SqliteMigrator",
				href: "https://effect-ts.github.io/effect/sql-sqlite-react-native/SqliteMigrator.ts.html",
			},
		],
	},
	{
		slug: "sql-sqlite-wasm",
		name: "@effect/sql-sqlite-wasm",
		description: "SQLite client and migrator running on WebAssembly (OPFS).",
		modules: [
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/sql-sqlite-wasm/index.ts.html",
			},
			{
				name: "OpfsWorker",
				href: "https://effect-ts.github.io/effect/sql-sqlite-wasm/OpfsWorker.ts.html",
			},
			{
				name: "sqlite-wasm",
				href: "https://effect-ts.github.io/effect/sql-sqlite-wasm/sqlite-wasm.d.ts.html",
			},
			{
				name: "SqliteClient",
				href: "https://effect-ts.github.io/effect/sql-sqlite-wasm/SqliteClient.ts.html",
			},
			{
				name: "SqliteMigrator",
				href: "https://effect-ts.github.io/effect/sql-sqlite-wasm/SqliteMigrator.ts.html",
			},
		],
	},
	{
		slug: "typeclass",
		name: "@effect/typeclass",
		description:
			"Typeclasses and instances for functional programming abstractions.",
		modules: [
			{
				name: "Alternative",
				href: "https://effect-ts.github.io/effect/typeclass/Alternative.ts.html",
			},
			{
				name: "Applicative",
				href: "https://effect-ts.github.io/effect/typeclass/Applicative.ts.html",
			},
			{
				name: "Bicovariant",
				href: "https://effect-ts.github.io/effect/typeclass/Bicovariant.ts.html",
			},
			{
				name: "Bounded",
				href: "https://effect-ts.github.io/effect/typeclass/Bounded.ts.html",
			},
			{
				name: "Chainable",
				href: "https://effect-ts.github.io/effect/typeclass/Chainable.ts.html",
			},
			{
				name: "Contravariant",
				href: "https://effect-ts.github.io/effect/typeclass/Contravariant.ts.html",
			},
			{
				name: "Coproduct",
				href: "https://effect-ts.github.io/effect/typeclass/Coproduct.ts.html",
			},
			{
				name: "Covariant",
				href: "https://effect-ts.github.io/effect/typeclass/Covariant.ts.html",
			},
			{
				name: "data/Array",
				href: "https://effect-ts.github.io/effect/typeclass/data/Array.ts.html",
			},
			{
				name: "data/BigInt",
				href: "https://effect-ts.github.io/effect/typeclass/data/BigInt.ts.html",
			},
			{
				name: "data/Boolean",
				href: "https://effect-ts.github.io/effect/typeclass/data/Boolean.ts.html",
			},
			{
				name: "data/Duration",
				href: "https://effect-ts.github.io/effect/typeclass/data/Duration.ts.html",
			},
			{
				name: "data/Effect",
				href: "https://effect-ts.github.io/effect/typeclass/data/Effect.ts.html",
			},
			{
				name: "data/Either",
				href: "https://effect-ts.github.io/effect/typeclass/data/Either.ts.html",
			},
			{
				name: "data/Identity",
				href: "https://effect-ts.github.io/effect/typeclass/data/Identity.ts.html",
			},
			{
				name: "data/Micro",
				href: "https://effect-ts.github.io/effect/typeclass/data/Micro.ts.html",
			},
			{
				name: "data/Number",
				href: "https://effect-ts.github.io/effect/typeclass/data/Number.ts.html",
			},
			{
				name: "data/Option",
				href: "https://effect-ts.github.io/effect/typeclass/data/Option.ts.html",
			},
			{
				name: "data/Ordering",
				href: "https://effect-ts.github.io/effect/typeclass/data/Ordering.ts.html",
			},
			{
				name: "data/Predicate",
				href: "https://effect-ts.github.io/effect/typeclass/data/Predicate.ts.html",
			},
			{
				name: "data/Record",
				href: "https://effect-ts.github.io/effect/typeclass/data/Record.ts.html",
			},
			{
				name: "data/String",
				href: "https://effect-ts.github.io/effect/typeclass/data/String.ts.html",
			},
			{
				name: "data/Tuple",
				href: "https://effect-ts.github.io/effect/typeclass/data/Tuple.ts.html",
			},
			{
				name: "Filterable",
				href: "https://effect-ts.github.io/effect/typeclass/Filterable.ts.html",
			},
			{
				name: "FlatMap",
				href: "https://effect-ts.github.io/effect/typeclass/FlatMap.ts.html",
			},
			{
				name: "Foldable",
				href: "https://effect-ts.github.io/effect/typeclass/Foldable.ts.html",
			},
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/typeclass/index.ts.html",
			},
			{
				name: "Invariant",
				href: "https://effect-ts.github.io/effect/typeclass/Invariant.ts.html",
			},
			{
				name: "Monad",
				href: "https://effect-ts.github.io/effect/typeclass/Monad.ts.html",
			},
			{
				name: "Monoid",
				href: "https://effect-ts.github.io/effect/typeclass/Monoid.ts.html",
			},
			{
				name: "Of",
				href: "https://effect-ts.github.io/effect/typeclass/Of.ts.html",
			},
			{
				name: "Pointed",
				href: "https://effect-ts.github.io/effect/typeclass/Pointed.ts.html",
			},
			{
				name: "Product",
				href: "https://effect-ts.github.io/effect/typeclass/Product.ts.html",
			},
			{
				name: "SemiAlternative",
				href: "https://effect-ts.github.io/effect/typeclass/SemiAlternative.ts.html",
			},
			{
				name: "SemiApplicative",
				href: "https://effect-ts.github.io/effect/typeclass/SemiApplicative.ts.html",
			},
			{
				name: "SemiCoproduct",
				href: "https://effect-ts.github.io/effect/typeclass/SemiCoproduct.ts.html",
			},
			{
				name: "Semigroup",
				href: "https://effect-ts.github.io/effect/typeclass/Semigroup.ts.html",
			},
			{
				name: "SemiProduct",
				href: "https://effect-ts.github.io/effect/typeclass/SemiProduct.ts.html",
			},
			{
				name: "Traversable",
				href: "https://effect-ts.github.io/effect/typeclass/Traversable.ts.html",
			},
			{
				name: "TraversableFilterable",
				href: "https://effect-ts.github.io/effect/typeclass/TraversableFilterable.ts.html",
			},
		],
	},
	{
		slug: "vitest",
		name: "@effect/vitest",
		description: "Vitest integration for testing Effect code.",
		modules: [
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/vitest/index.ts.html",
			},
			{
				name: "utils",
				href: "https://effect-ts.github.io/effect/vitest/utils.ts.html",
			},
		],
	},
	{
		slug: "workflow",
		name: "@effect/workflow",
		description:
			"Durable workflows with activities, durable clocks, and deferred execution.",
		modules: [
			{
				name: "Activity",
				href: "https://effect-ts.github.io/effect/workflow/Activity.ts.html",
			},
			{
				name: "DurableClock",
				href: "https://effect-ts.github.io/effect/workflow/DurableClock.ts.html",
			},
			{
				name: "DurableDeferred",
				href: "https://effect-ts.github.io/effect/workflow/DurableDeferred.ts.html",
			},
			{
				name: "DurableQueue",
				href: "https://effect-ts.github.io/effect/workflow/DurableQueue.ts.html",
			},
			{
				name: "DurableRateLimiter",
				href: "https://effect-ts.github.io/effect/workflow/DurableRateLimiter.ts.html",
			},
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/workflow/index.ts.html",
			},
			{
				name: "Workflow",
				href: "https://effect-ts.github.io/effect/workflow/Workflow.ts.html",
			},
			{
				name: "WorkflowEngine",
				href: "https://effect-ts.github.io/effect/workflow/WorkflowEngine.ts.html",
			},
			{
				name: "WorkflowProxy",
				href: "https://effect-ts.github.io/effect/workflow/WorkflowProxy.ts.html",
			},
			{
				name: "WorkflowProxyServer",
				href: "https://effect-ts.github.io/effect/workflow/WorkflowProxyServer.ts.html",
			},
		],
	},
	{
		slug: "ai",
		name: "@effect/ai",
		description:
			"Provider-agnostic AI toolkit \u2014 language models, embeddings, tools, and MCP servers.",
		modules: [
			{
				name: "AiError",
				href: "https://effect-ts.github.io/effect/ai/ai/AiError.ts.html",
			},
			{
				name: "Chat",
				href: "https://effect-ts.github.io/effect/ai/ai/Chat.ts.html",
			},
			{
				name: "EmbeddingModel",
				href: "https://effect-ts.github.io/effect/ai/ai/EmbeddingModel.ts.html",
			},
			{
				name: "IdGenerator",
				href: "https://effect-ts.github.io/effect/ai/ai/IdGenerator.ts.html",
			},
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/ai/ai/index.ts.html",
			},
			{
				name: "LanguageModel",
				href: "https://effect-ts.github.io/effect/ai/ai/LanguageModel.ts.html",
			},
			{
				name: "McpSchema",
				href: "https://effect-ts.github.io/effect/ai/ai/McpSchema.ts.html",
			},
			{
				name: "McpServer",
				href: "https://effect-ts.github.io/effect/ai/ai/McpServer.ts.html",
			},
			{
				name: "Model",
				href: "https://effect-ts.github.io/effect/ai/ai/Model.ts.html",
			},
			{
				name: "Prompt",
				href: "https://effect-ts.github.io/effect/ai/ai/Prompt.ts.html",
			},
			{
				name: "Response",
				href: "https://effect-ts.github.io/effect/ai/ai/Response.ts.html",
			},
			{
				name: "Telemetry",
				href: "https://effect-ts.github.io/effect/ai/ai/Telemetry.ts.html",
			},
			{
				name: "Tokenizer",
				href: "https://effect-ts.github.io/effect/ai/ai/Tokenizer.ts.html",
			},
			{
				name: "Tool",
				href: "https://effect-ts.github.io/effect/ai/ai/Tool.ts.html",
			},
			{
				name: "Toolkit",
				href: "https://effect-ts.github.io/effect/ai/ai/Toolkit.ts.html",
			},
		],
	},
	{
		slug: "ai-amazon-bedrock",
		name: "@effect/ai-amazon-bedrock",
		description: "Amazon Bedrock provider for the AI toolkit.",
		modules: [
			{
				name: "AmazonBedrockClient",
				href: "https://effect-ts.github.io/effect/ai/amazon-bedrock/AmazonBedrockClient.ts.html",
			},
			{
				name: "AmazonBedrockConfig",
				href: "https://effect-ts.github.io/effect/ai/amazon-bedrock/AmazonBedrockConfig.ts.html",
			},
			{
				name: "AmazonBedrockLanguageModel",
				href: "https://effect-ts.github.io/effect/ai/amazon-bedrock/AmazonBedrockLanguageModel.ts.html",
			},
			{
				name: "AmazonBedrockSchema",
				href: "https://effect-ts.github.io/effect/ai/amazon-bedrock/AmazonBedrockSchema.ts.html",
			},
			{
				name: "AmazonBedrockTool",
				href: "https://effect-ts.github.io/effect/ai/amazon-bedrock/AmazonBedrockTool.ts.html",
			},
			{
				name: "EventStreamEncoding",
				href: "https://effect-ts.github.io/effect/ai/amazon-bedrock/EventStreamEncoding.ts.html",
			},
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/ai/amazon-bedrock/index.ts.html",
			},
		],
	},
	{
		slug: "ai-anthropic",
		name: "@effect/ai-anthropic",
		description: "Anthropic provider for the AI toolkit.",
		modules: [
			{
				name: "AnthropicClient",
				href: "https://effect-ts.github.io/effect/ai/anthropic/AnthropicClient.ts.html",
			},
			{
				name: "AnthropicConfig",
				href: "https://effect-ts.github.io/effect/ai/anthropic/AnthropicConfig.ts.html",
			},
			{
				name: "AnthropicLanguageModel",
				href: "https://effect-ts.github.io/effect/ai/anthropic/AnthropicLanguageModel.ts.html",
			},
			{
				name: "AnthropicTokenizer",
				href: "https://effect-ts.github.io/effect/ai/anthropic/AnthropicTokenizer.ts.html",
			},
			{
				name: "AnthropicTool",
				href: "https://effect-ts.github.io/effect/ai/anthropic/AnthropicTool.ts.html",
			},
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/ai/anthropic/index.ts.html",
			},
		],
	},
	{
		slug: "ai-google",
		name: "@effect/ai-google",
		description: "Google provider for the AI toolkit.",
		modules: [
			{
				name: "GoogleClient",
				href: "https://effect-ts.github.io/effect/ai/google/GoogleClient.ts.html",
			},
			{
				name: "GoogleConfig",
				href: "https://effect-ts.github.io/effect/ai/google/GoogleConfig.ts.html",
			},
			{
				name: "GoogleLanguageModel",
				href: "https://effect-ts.github.io/effect/ai/google/GoogleLanguageModel.ts.html",
			},
			{
				name: "GoogleTool",
				href: "https://effect-ts.github.io/effect/ai/google/GoogleTool.ts.html",
			},
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/ai/google/index.ts.html",
			},
		],
	},
	{
		slug: "ai-openai",
		name: "@effect/ai-openai",
		description: "OpenAI provider for the AI toolkit.",
		modules: [
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/ai/openai/index.ts.html",
			},
			{
				name: "OpenAiClient",
				href: "https://effect-ts.github.io/effect/ai/openai/OpenAiClient.ts.html",
			},
			{
				name: "OpenAiConfig",
				href: "https://effect-ts.github.io/effect/ai/openai/OpenAiConfig.ts.html",
			},
			{
				name: "OpenAiEmbeddingModel",
				href: "https://effect-ts.github.io/effect/ai/openai/OpenAiEmbeddingModel.ts.html",
			},
			{
				name: "OpenAiLanguageModel",
				href: "https://effect-ts.github.io/effect/ai/openai/OpenAiLanguageModel.ts.html",
			},
			{
				name: "OpenAiTelemetry",
				href: "https://effect-ts.github.io/effect/ai/openai/OpenAiTelemetry.ts.html",
			},
			{
				name: "OpenAiTokenizer",
				href: "https://effect-ts.github.io/effect/ai/openai/OpenAiTokenizer.ts.html",
			},
			{
				name: "OpenAiTool",
				href: "https://effect-ts.github.io/effect/ai/openai/OpenAiTool.ts.html",
			},
		],
	},
	{
		slug: "ai-openrouter",
		name: "@effect/ai-openrouter",
		description: "OpenRouter provider for the AI toolkit.",
		modules: [
			{
				name: "index",
				href: "https://effect-ts.github.io/effect/ai/openrouter/index.ts.html",
			},
			{
				name: "OpenRouterClient",
				href: "https://effect-ts.github.io/effect/ai/openrouter/OpenRouterClient.ts.html",
			},
			{
				name: "OpenRouterConfig",
				href: "https://effect-ts.github.io/effect/ai/openrouter/OpenRouterConfig.ts.html",
			},
			{
				name: "OpenRouterLanguageModel",
				href: "https://effect-ts.github.io/effect/ai/openrouter/OpenRouterLanguageModel.ts.html",
			},
		],
	},
];

export const API_PACKAGE_GROUPS: { title: string; slugs: string[] }[] = [
	{ title: "Core", slugs: ["effect", "typeclass"] },
	{
		title: "Platform",
		slugs: [
			"platform",
			"platform-browser",
			"platform-bun",
			"platform-node",
			"platform-node-shared",
		],
	},
	{ title: "Distributed", slugs: ["cluster", "rpc", "workflow"] },
	{
		title: "Databases",
		slugs: [
			"sql",
			"sql-clickhouse",
			"sql-d1",
			"sql-drizzle",
			"sql-kysely",
			"sql-libsql",
			"sql-mssql",
			"sql-mysql2",
			"sql-pg",
			"sql-sqlite-bun",
			"sql-sqlite-do",
			"sql-sqlite-node",
			"sql-sqlite-react-native",
			"sql-sqlite-wasm",
		],
	},
	{
		title: "AI",
		slugs: [
			"ai",
			"ai-amazon-bedrock",
			"ai-anthropic",
			"ai-google",
			"ai-openai",
			"ai-openrouter",
		],
	},
	{
		title: "Tooling",
		slugs: [
			"cli",
			"opentelemetry",
			"printer",
			"printer-ansi",
			"vitest",
			"experimental",
		],
	},
];
