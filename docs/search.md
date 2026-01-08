# Search Functionality

This document explains how the search feature works in the Defra Digital Service Manual.

## Overview

The search functionality allows users to find content across the service manual using a client-side autocomplete powered by the [GOV.UK accessible-autocomplete](https://github.com/alphagov/accessible-autocomplete) component.

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Browser                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    Header Search Component                           │    │
│  │  ┌─────────────────────────────────────────────────────────────┐    │    │
│  │  │  accessible-autocomplete                                     │    │    │
│  │  │  - Manages input field                                       │    │    │
│  │  │  - Shows suggestions dropdown                                │    │    │
│  │  │  - Handles keyboard navigation                               │    │    │
│  │  │  - ARIA announcements for screen readers                     │    │    │
│  │  └─────────────────────────────────────────────────────────────┘    │    │
│  │                              │                                       │    │
│  │                              ▼                                       │    │
│  │  ┌─────────────────────────────────────────────────────────────┐    │    │
│  │  │  search.js (Client-side)                                     │    │    │
│  │  │  - Fetches search index on page load                         │    │    │
│  │  │  - Filters and scores results                                │    │    │
│  │  │  - Returns top 5 suggestions                                 │    │    │
│  │  └─────────────────────────────────────────────────────────────┘    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                                    │ GET /api/search/index                   │
│                                    ▼                                         │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Server                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  search/controller.js                                                │    │
│  │  - GET /search           → Search results page                       │    │
│  │  - GET /api/search/index → Returns search index JSON                 │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  search-index.js                                                     │    │
│  │  - Reads all markdown files from src/content/                        │    │
│  │  - Extracts frontmatter (title, description, sectionTitle)           │    │
│  │  - Extracts headings and content text                                │    │
│  │  - Builds and caches search index                                    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  src/content/                                                        │    │
│  │  ├── accessibility.md                                                │    │
│  │  ├── accessibility/                                                  │    │
│  │  │   ├── manage-accessibility.md                                     │    │
│  │  │   └── test-for-accessibility.md                                   │    │
│  │  ├── architecture-and-software-development.md                        │    │
│  │  └── ...                                                             │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

## User Flow

```
┌──────────────┐    ┌─────────────────┐    ┌──────────────────┐
│  User types  │───▶│  Autocomplete   │───▶│  User selects    │
│  in search   │    │  shows up to 5  │    │  suggestion      │
│  box         │    │  suggestions    │    │                  │
└──────────────┘    └─────────────────┘    └──────────────────┘
                                                    │
                           ┌────────────────────────┘
                           ▼
            ┌──────────────────────────────┐
            │  Navigates directly to page  │
            │  (e.g., /accessibility)      │
            └──────────────────────────────┘

                          OR

┌──────────────┐    ┌─────────────────┐    ┌──────────────────┐
│  User types  │───▶│  User presses   │───▶│  Search results  │
│  query and   │    │  Enter or       │    │  page displays   │
│  submits     │    │  clicks button  │    │  all matches     │
└──────────────┘    └─────────────────┘    └──────────────────┘
```

## Components

### Server-side

#### `src/server/common/helpers/search-index.js`

Builds the search index from markdown content files:

- **`buildSearchIndex()`** - Recursively reads all `.md` files from `src/content/`, parses frontmatter with `gray-matter`, and creates index entries
- **`getSearchIndex()`** - Returns cached index (builds on first call)
- **`searchContent(query, limit)`** - Searches index and returns scored results
- **`getSuggestions(query, limit)`** - Returns suggestions for autocomplete

**Index entry structure:**

```javascript
{
  title: "Page title",           // From frontmatter
  description: "Description",    // From frontmatter
  sectionTitle: "Section name",  // From frontmatter
  url: "/accessibility",         // Generated from file path
  headings: ["Heading 1", ...],  // Extracted from content
  content: "Plain text content"  // Markdown stripped
}
```

#### `src/server/search/controller.js`

Defines three route handlers:

| Route                         | Handler                       | Purpose                                                          |
| ----------------------------- | ----------------------------- | ---------------------------------------------------------------- |
| `GET /search`                 | `searchController`            | Renders search results page                                      |
| `GET /api/search/suggestions` | `searchSuggestionsController` | Returns JSON suggestions (unused - client-side search preferred) |
| `GET /api/search/index`       | `searchIndexController`       | Returns full search index for client                             |

### Client-side

#### `src/client/javascripts/search.js`

Initialises the accessible-autocomplete component:

1. **On page load**: Fetches search index from `/api/search/index`
2. **Caches index**: Stored in memory for subsequent searches
3. **Replaces input**: Swaps basic input for accessible-autocomplete
4. **Handles selection**: Navigates directly to selected page

### Templates

#### `src/server/common/templates/partials/header-search.njk`

The search form in the header. Works as a basic form (progressive enhancement) before JavaScript loads.

#### `src/server/search/results.njk`

Search results page template displaying matched content.

## Scoring Algorithm

Results are ranked by a weighted scoring system:

| Match Type               | Server Score | Client Score |
| ------------------------ | ------------ | ------------ |
| Title match              | 100          | 100          |
| Section match            | 50           | 50           |
| Description match        | 30           | 30           |
| Heading match            | 20           | -            |
| Content match            | 10           | -            |
| Title phrase boost       | +50          | +50          |
| Description phrase boost | +20          | -            |

The client-side scoring is simplified for autocomplete (title, section, description only), while server-side search includes full content matching.

## Progressive Enhancement

The search is designed to work without JavaScript:

1. **Without JS**: Form submits to `/search?q=query`, server renders results page
2. **With JS**: Autocomplete provides instant suggestions, selecting navigates directly

## Accessibility

The search uses GOV.UK's accessible-autocomplete which provides:

- ARIA live regions for screen reader announcements
- Keyboard navigation (arrow keys, Enter, Escape)
- Clear status messages ("5 suggestions available")
- Focus management

## Configuration

### Scoring Weights

Defined in both files:

**Server (`search-index.js`):**

```javascript
const SCORE_WEIGHTS = {
  TITLE_MATCH: 100,
  SECTION_MATCH: 50,
  DESCRIPTION_MATCH: 30,
  HEADING_MATCH: 20,
  CONTENT_MATCH: 10,
  TITLE_PHRASE_BOOST: 50,
  DESCRIPTION_PHRASE_BOOST: 20
}
```

**Client (`search.js`):**

```javascript
const SCORE_WEIGHTS = {
  TITLE_MATCH: 100,
  SECTION_MATCH: 50,
  DESCRIPTION_MATCH: 30,
  EXACT_PHRASE_BOOST: 50
}
```

### Limits

| Constant                   | Value | Location |
| -------------------------- | ----- | -------- |
| `MIN_QUERY_LENGTH`         | 2     | Client   |
| `MAX_SUGGESTIONS`          | 5     | Client   |
| `DEFAULT_RESULT_LIMIT`     | 20    | Server   |
| `DEFAULT_SUGGESTION_LIMIT` | 5     | Server   |

## File Structure

```
src/
├── client/
│   ├── javascripts/
│   │   └── search.js              # Client-side autocomplete logic
│   └── stylesheets/
│       └── components/
│           └── _defra-search.scss # Autocomplete styling
├── server/
│   ├── common/
│   │   ├── helpers/
│   │   │   └── search-index.js    # Index builder and search logic
│   │   └── templates/
│   │       └── partials/
│   │           └── header-search.njk  # Search form template
│   └── search/
│       ├── index.js               # Route definitions
│       ├── controller.js          # Route handlers
│       └── results.njk            # Results page template
└── content/                       # Markdown files (indexed)
```

## Adding New Content

When you add a new markdown file to `src/content/`:

1. The search index automatically includes it (built at server start)
2. Ensure frontmatter includes `title` and optionally `description`, `sectionTitle`
3. The file path determines the URL (e.g., `foo/bar.md` → `/foo/bar`)

## Performance Considerations

- **Index caching**: Built once at server start, cached in memory
- **Client-side caching**: Index fetched once per page session
- **Simplified client scoring**: Excludes full content search for faster autocomplete
- **Result limits**: Autocomplete limited to 5, results page to 20
