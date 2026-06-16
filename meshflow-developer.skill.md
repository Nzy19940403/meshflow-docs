---
name: meshflow-developer
description: >-
  Expert knowledge of the MeshFlow engine — a dependency-graph-based state management
  engine with blueprint nodes, entanglements, schedulers, and logic gates. Use when
  working on MeshFlow code: writing features, finding bugs, reviewing PRs, writing docs,
  or explaining architecture.
---

# MeshFlow Developer Skill

## Project Overview

MeshFlow (`D:\project\microapp\meshflow-doc`) is a demonstration and
documentation project for **@meshflow/core** — a reactive, dependency-graph-based
state management engine for TypeScript applications.

The core idea: you define **nodes** (state containers) connected by **dependency
edges** (rules/entanglements). When one node changes, the engine propagates changes
through the graph automatically. Think of it as a spreadsheet-on-steroids for game
state, UI logic, or any complex reactive system.

## Project Layout

```
D:\project\microapp\meshflow-doc
├── core/                  # Demo source code using @meshflow/core
│   ├── hero.ts            # Blueprint pattern — static RPG hero/monster templates
│   ├── cardgame.ts        # Card game demo
│   ├── matrix.ts          # Matrix operations demo
│   ├── useFlowLayout.ts   # Zone-based layout with dynamic allocation
│   ├── useLogicGate.ts    # Massive dependency graph (up to 400x1200 nodes)
│   ├── useSortAnimation.ts # Sorting animation with reactive state
│   ├── useSudokuLayout.ts  # Sudoku solver / layout
│   └── index.ts           # Re-exports
├── demos/                 # VitePress demo pages (Chinese + English)
├── docs/api/              # Auto-generated API documentation for @meshflow/core
├── en/                    # English docs
├── guide/                 # Chinese guides (setrule-concepts, etc.)
├── images/                # Dependency diagrams
├── public/                # Static assets (logo)
├── .vitepress/            # VitePress config + theme
├── package.json           # Dependencies: vitepress, vue, mermaid, pixi.js, vue-flow
└── serve.js / worker.js   # Hermes ↔ Discord pipeline (separate from MeshFlow)
```

## Core API Concepts

The engine entry point is `useScheduler<T, P>` from `@meshflow/core`.

Key exported functions: `useMeshFlow`, `useMeshFlowDefiner`, `deleteEngine`, `useEngine`.

### Nodes

Nodes are the atomic units of state. Each node has:
- `path` — unique string identifier (a `MeshPath`)
- `state` — reactive state object
- `meta` — static metadata (blueprint data, config)
- `type` — `'task'`, `'blueprint'`, `'group'`
- `notifyKeys` — which state keys trigger downstream rules

### SetRules (Dependencies)

`setRule()` connects nodes: "when node A's keys X and Y change, recompute node B
via this function." Rules can reference any number of upstream nodes.

### Entanglements (Ghost Proposals)

`entangle()` creates bidirectional bindings between state keys across nodes.
Changes ripple both ways. Used for form ↔ model sync, etc.

### Scheduler

`MeshScheduler` manages the directed acyclic graph of dependencies and determines
execution order. Supports different strategies (DefaultStrategy).

### Key Types

- `MeshFlowTaskNode`, `MeshFlowGroupNode` — node type interfaces
- `MeshPath` — typed path string
- `MeshEvents`, `MeshFlowEventsName` — event system
- `TriggerCause` — what triggered a recalculation
- `NodeStatus` — `'idle'`, `'computing'`, `'dirty'`
- `SetRuleOptions`, `logicApi` — rule configuration
- `MeshErrorContext`, `MeshError` — error handling

## Common Patterns in This Codebase

### Blueprint Pattern (`hero.ts`)

Static config nodes (`type: 'blueprint'`) hold read-only template data.
Dynamic runtime nodes reference blueprints via `setRule()`. Changing a
blueprint cascades to all runtime instances.

### Zone Allocation (`useFlowLayout.ts`)

Multiple parallel "zones" with capacity management. Nodes track
`currentLoad` vs `capacity`. Rules enforce allocation constraints.

### Mass Dependency Graph (`useLogicGate.ts`)

Creates a grid of up to 400x1200 virtual nodes with waterfall dependencies.
Each node depends on its upper-left and upper neighbor. Demonstrates
the engine's ability to handle massive dependency matrices.

## Coding Conventions

- Use **TypeScript** throughout
- Source files are in `core/`
- Docs are in **Chinese** (guide/) and **English** (en/)
- Web demos use VitePress + Vue 3 + Vue Flow for visualization
- Mermaid diagrams for dependency visualization
- PixiJS for game-like rendering demos

## When Working on This Project

- Before making changes: understand the dependency graph between the node you're
  touching and what depends on it
- Use `git status` and `git log` to understand recent changes
- Check `docs/api/` for the authoritative API reference
- Run demos via `npm run docs:dev` to verify visual changes
- Search for node paths across files with grep — paths are the connective tissue
  of the entire project
- When adding new nodes: always register them with `scheduler.registerNode()` and
  set up appropriate `setRule()` / `entangle()` connections
- When debugging: check `TriggerCause` and `NodeStatus` to trace why a node
  recalculated (or didn't)
