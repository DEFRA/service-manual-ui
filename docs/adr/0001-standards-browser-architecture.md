# ADR-0001: Standards Browser Architecture

## Status

Accepted

## Date

2026-01-16

## Context

The Defra Digital Service Manual contains guidance that implies mandatory standards for service teams. However, these standards are embedded within guidance pages and not explicitly presented as a browsable, searchable list.

Service teams need a clear view of what standards apply to their work without reading through all guidance pages. GitHub issue #29 captures the full requirements.

Key questions this ADR addresses:

1. Where should standards data be stored?
2. How should search and filtering be implemented?
3. Should this use client-side or server-side rendering?
4. How should URL state be managed?

## Decision

### 1. Standards Data: Static JavaScript Module

Standards will be defined in a static JavaScript data file (`src/server/standards/data.js`) rather than:

- A database
- Markdown files with frontmatter
- A CMS or external API

**Rationale:**

- Standards change infrequently (governance-controlled)
- Simple to version control and review changes
- No additional infrastructure required
- Consistent with existing content approach
- Easy to maintain by non-technical contributors

### 2. Search and Filtering: Server-side

All search and filtering will be performed server-side with results rendered via Nunjucks templates, rather than:

- Client-side JavaScript filtering
- API endpoints with JSON responses

**Rationale:**

- Aligns with Defra standards (no frontend frameworks)
- Progressive enhancement - works without JavaScript
- Better accessibility (server-rendered HTML)
- Simpler implementation and testing
- Consistent with existing search functionality

### 3. URL State: Query Parameters

Search, filter, and pagination state will be stored in URL query parameters:

- `?q=search+term` - search query
- `?area=Technology+%26+Architecture` - area filter (repeatable)
- `?page=2` - current page

**Rationale:**

- Bookmarkable and shareable
- Browser history works correctly
- No session state required
- Standard web pattern

### 4. Pagination: GOV.UK Component

Pagination will use the GOV.UK Design System pagination pattern:

- Server-side pagination (not infinite scroll)
- Default 10 items per page
- Standard previous/next and page number links

**Rationale:**

- Consistent with GOV.UK patterns
- Accessible by default
- Works without JavaScript
- Predictable for users

### 5. Component Architecture

The feature will follow the existing codebase patterns:

- `index.js` - Hapi plugin with route registration
- `controller.js` - Request handler with view rendering
- `data.js` - Standards data array
- `standards.njk` - Nunjucks template

**Rationale:**

- Consistency with existing features (home, search, markdown-pages)
- Familiar structure for maintainers
- Clear separation of concerns

## Consequences

### Positive

- **Simple to implement**: No new dependencies or infrastructure
- **Maintainable**: Follows existing patterns, easy for team to understand
- **Accessible**: Server-rendered HTML with GOV.UK components
- **Testable**: Pure functions, easy to unit test
- **Performant**: No database queries, static data, server-side filtering
- **Shareable**: URL state allows bookmarking and sharing

### Negative

- **Manual updates required**: Adding standards requires code changes and deployment
- **No content preview**: Cannot preview changes without running locally
- **Limited scalability**: If standards grow significantly (100+), in-memory filtering may need optimisation

### Neutral

- **No JavaScript required**: Feature works entirely server-side
- **Coupled to codebase**: Standards defined in code, not separate content repository

## Alternatives Considered

### Alternative 1: Database-backed Standards

Store standards in a database (PostgreSQL) with an admin interface.

**Why not chosen:**

- Over-engineering for ~25 standards
- Additional infrastructure and operational complexity
- Standards change infrequently (governance-controlled)
- Inconsistent with rest of service manual (static content)

### Alternative 2: Markdown Files with Frontmatter

Store each standard as a markdown file, similar to content pages.

**Why not chosen:**

- Standards are metadata, not content pages
- Would create many small files
- Harder to filter and query
- No benefit over a single data file

### Alternative 3: Client-side Filtering

Use JavaScript to filter standards in the browser after loading all data.

**Why not chosen:**

- Conflicts with Defra "no frontend frameworks" standard
- Reduces accessibility (requires JavaScript)
- More complex implementation
- Server-side is sufficient for this scale

### Alternative 4: External API

Fetch standards from an external service or CMS.

**Why not chosen:**

- No existing standards API
- Additional dependency and latency
- Service manual should be self-contained
- Over-engineering for static content

## References

- GitHub Issue #29: Standards Browser Feature Request
- [GOV.UK Pagination Component](https://design-system.service.gov.uk/components/pagination/)
- [Defra Software Development Standards](https://defra.github.io/software-development-standards/)
- Existing search implementation: `src/server/search/`
