# Project Overview

This project is a Honkai: Star Rail frontend data site.

Current stage:
- Do not implement a local database
- Do not implement data import
- Do not build a custom backend
- Use only online HSR JSON/API resources as the data source for now
- Focus on completing frontend architecture, data flow, page logic, and UI first

Future plan:
- The data source will later be replaced with a custom backend API
- Therefore, component and page layers must remain fully unaware of the external source shape and URL

# Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui

# Non-Negotiable Architecture Rules

1. All external data access must go through `/src/services/hsr-api.ts`
2. Components must never fetch external URLs directly
3. Components must never contain hard-coded API URLs
4. All raw external data must be transformed by adapters before reaching pages/components
5. Pages/components may only consume unified domain types from `/src/types`
6. Keep services, adapters, types, and features clearly separated
7. Prefer Server Components by default
8. Use Client Components only where interaction is required, such as search and filters
9. Do not introduce local persistence, import pipeline, or backend code in this stage
10. Do not replace the real data layer with mock data unless explicitly asked

# Directory Responsibilities

- `/src/app`: routing and page entry only
- `/src/features/characters`: character-related feature modules, containers, and feature UI
- `/src/components`: shared presentational components
- `/src/components/ui`: shadcn/ui components
- `/src/services`: external data access only
- `/src/adapters`: raw API -> unified domain model transformation
- `/src/types`: unified domain types only
- `/src/lib`: utilities, constants, helpers

# Required Domain Types

At minimum, define and use:
- CharacterListItem
- CharacterDetail
- CharacterElement
- CharacterPath
- CharacterRarity
- Skill
- Eidolon
- TraceNode
- AscensionMaterial

Do not let page components depend on raw API response fields.

# Required Features

Implement in this order:
1. Character list page
   - search
   - filters
2. Character detail page
   - basic info
   - skills
   - eidolons
   - traces
   - ascension materials

# Required UI Direction

Use a flat UI style:
- no heavy shadows
- no glow effects
- limited colors: one primary color + grayscale
- lightweight cards: 1px border + small radius
- information-first, weak decoration
- clear typography hierarchy: H1 / H2 / Body / Caption
- overall style should feel like a game wiki + data tool site

# Required States

Every page must explicitly handle:
- loading state
- error state
- empty state
- not found state

# Delivery Protocol

When implementing:
1. First output the full project directory tree
2. Then output only the files needed for the current phase
3. Always provide complete runnable code, not pseudocode
4. Mark every code block with its file path
5. Do not implement future phases ahead of time
6. Stop after finishing the current phase

# Phase Order

Phase 1: initialize project structure, app router layout, basic shared components
Phase 2: implement unified data layer (`hsr-api.ts`, adapters, types)
Phase 3: implement character list page with search and filters
Phase 4: implement character detail page
Phase 5: flat UI refinement with consistent tokens and component styles
Phase 6: cleanup and README

# Code Quality Rules

- Use clear naming
- Avoid unnecessary abstraction
- Prefer small reusable components
- Keep feature-specific logic inside feature modules
- Keep adapters explicit and readable
- Do not silently change architecture assumptions
- If an API field is uncertain, isolate the uncertainty inside the adapter layer rather than leaking it upward

# README Requirement

At the final phase, the README must include:
- project overview
- tech stack
- directory structure
- data layer design
- adapter design
- how to replace the external source with a custom backend API
- how to run the project
- future extension notes