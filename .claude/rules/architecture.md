# Architecture Rules

## Layering

- `/src/services` handles external requests only
- `/src/adapters` transforms raw source data into unified domain models
- `/src/types` defines domain models
- `/src/features/characters` contains character feature logic and UI
- `/src/app` contains route entry and page composition only

## Data Access

- external requests must be centralized in `/src/services/hsr-api.ts`
- raw source fields must not leak into pages/components
- page and component props must use unified types only

## Domain Types

At minimum define:

- CharacterListItem
- CharacterDetail
- CharacterElement
- CharacterPath
- CharacterRarity
- Skill
- Eidolon
- TraceNode
- AscensionMaterial

## State Handling

Every page must handle:

- loading
- error
- empty
- not found
