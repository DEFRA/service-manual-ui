# Standards Browser

This document explains how the Standards Browser feature works in the Defra Digital Service Manual.

## Overview

The Standards Browser provides a searchable, filterable view of all Defra standards in one place. Service teams can browse standards by area (Technology & Architecture, Accessibility, Sustainability), search by keyword, and link directly to the source guidance pages.

## Architecture

See: `docs/architecture/standards-browser.c4`

- Component view: `view standardsComponents`

```
+---------------------------------------------------------------------------+
|                              Browser                                       |
|  +---------------------------------------------------------------------+  |
|  |                    Standards Browser Page                           |  |
|  |  +---------------------------+  +-------------------------------+   |  |
|  |  |  Search Input             |  |  Filter Checkboxes            |   |  |
|  |  |  (server-rendered form)   |  |  (server-rendered checkboxes) |   |  |
|  |  +---------------------------+  +-------------------------------+   |  |
|  |                                                                     |  |
|  |  +---------------------------------------------------------------+  |  |
|  |  |  Standards List (paginated)                                   |  |  |
|  |  |  - Title (linked to source)                                   |  |  |
|  |  |  - Description                                                |  |  |
|  |  |  - Area tag                                                   |  |  |
|  |  +---------------------------------------------------------------+  |  |
|  |                                                                     |  |
|  |  +---------------------------------------------------------------+  |  |
|  |  |  Pagination Controls                                          |  |  |
|  |  +---------------------------------------------------------------+  |  |
|  +---------------------------------------------------------------------+  |
|                                    |                                       |
|                                    | GET /standards?q=...&area=...&page=...|
|                                    v                                       |
+---------------------------------------------------------------------------+
                                     |
                                     v
+---------------------------------------------------------------------------+
|                              Server                                        |
|  +---------------------------------------------------------------------+  |
|  |  standards/controller.js                                            |  |
|  |  - GET /standards -> Standards index page with search/filter        |  |
|  +---------------------------------------------------------------------+  |
|                                    |                                       |
|                                    v                                       |
|  +---------------------------------------------------------------------+  |
|  |  standards/data.js                                                  |  |
|  |  - Exports array of standard objects                                |  |
|  |  - Each standard: { title, description, area, sourceUrl }           |  |
|  +---------------------------------------------------------------------+  |
+---------------------------------------------------------------------------+
```

## User Flow

```
+----------------+     +------------------+     +-------------------+
|  User visits   |---->|  Standards list  |---->|  User filters by  |
|  /standards    |     |  displayed with  |     |  area or searches |
|                |     |  all standards   |     |  by keyword       |
+----------------+     +------------------+     +-------------------+
                                                         |
                           +-----------------------------+
                           v
            +------------------------------+
            |  Filtered results displayed  |
            |  URL updated with params     |
            +------------------------------+
                           |
                           v
            +------------------------------+
            |  User clicks standard title  |---> Source guidance page
            +------------------------------+
```

## Components

### Server-side

#### `src/server/standards/data.js`

Contains the standards data as an array of objects:

```javascript
export const standards = [
  {
    id: 'use-core-delivery-platform',
    title: 'Use the Core Delivery Platform',
    description:
      "Build and deploy services using Defra's internal development platform.",
    area: 'Technology & Architecture',
    sourceUrl: '/architecture-and-software-development/core-delivery-platform'
  }
  // ... more standards
]
```

**Standard structure:**

| Field       | Type   | Description                                                                 |
| ----------- | ------ | --------------------------------------------------------------------------- |
| id          | string | Unique identifier (kebab-case)                                              |
| title       | string | Clear, action-oriented title                                                |
| description | string | 1-2 sentence summary of the requirement                                     |
| area        | string | Category: "Technology & Architecture", "Accessibility", or "Sustainability" |
| sourceUrl   | string | URL path to the full guidance page                                          |

#### `src/server/standards/controller.js`

Handles the main `/standards` route:

| Route            | Handler               | Purpose                                                    |
| ---------------- | --------------------- | ---------------------------------------------------------- |
| `GET /standards` | `standardsController` | Renders standards page with search, filter, and pagination |

**Query parameters:**

| Parameter | Type     | Default | Description                                  |
| --------- | -------- | ------- | -------------------------------------------- |
| q         | string   | ''      | Search query (matches title and description) |
| area      | string[] | []      | Area filters (can be multiple)               |
| page      | number   | 1       | Current page number                          |

#### `src/server/standards/index.js`

Registers the standards routes as a Hapi plugin.

### Templates

#### `src/server/standards/standards.njk`

The main standards page template with:

- Search input field
- Area filter checkboxes
- Standards list with pagination
- "No results" message when appropriate
- Clear search/filter options

### Home Page Update

#### `src/server/home/service-manual.njk`

Updated to include a "Standards" tile in the "How to do things in Defra" section.

## Search Logic

The search is case-insensitive and matches against:

- Standard title
- Standard description

Results maintain their original order when not searching (sorted by area, then alphabetically by title).

## Filtering Logic

- Multiple areas can be selected at once
- Filters are combined with OR logic (matches any selected area)
- When no filters selected, all standards are shown
- Filter state is preserved in URL query parameters

## Pagination

- Default: 10 items per page
- GOV.UK pagination component used
- Page numbers, previous/next links
- Shows "Showing X to Y of Z standards" text

## URL State Management

All state is reflected in URL query parameters:

- `?q=search+term` - search query
- `?area=Accessibility&area=Sustainability` - selected filters
- `?page=2` - current page

This enables:

- Bookmarking specific searches/filters
- Sharing filtered views
- Browser back/forward navigation

## Progressive Enhancement

The page works without JavaScript:

- Form submission reloads page with query parameters
- All filtering and pagination is server-rendered
- No JavaScript required for core functionality

## Accessibility

- Search input has associated label
- Filter fieldset with legend
- Clear focus states (GOV.UK standard)
- Skip link to results
- ARIA labels where appropriate
- Works with screen readers
- Keyboard navigable

## Configuration

### Pagination

| Constant            | Value | Description    |
| ------------------- | ----- | -------------- |
| `DEFAULT_PAGE_SIZE` | 10    | Items per page |

### Areas

| Area                      | Description                             |
| ------------------------- | --------------------------------------- |
| Technology & Architecture | Development standards, platforms, tools |
| Accessibility             | WCAG, assistive technology support      |
| Sustainability            | Environmental and social responsibility |

## File Structure

```
src/
├── server/
│   ├── home/
│   │   └── service-manual.njk    # Updated with Standards tile
│   ├── standards/
│   │   ├── index.js              # Route definitions
│   │   ├── controller.js         # Route handler
│   │   ├── data.js               # Standards data array
│   │   └── standards.njk         # Page template
│   └── router.js                 # Updated to include standards routes
└── client/
    └── stylesheets/
        └── components/
            └── _defra-standards.scss  # Standards-specific styles
```

## Content Management

Standards are defined in `src/server/standards/data.js`. To add a new standard:

1. Add a new object to the `standards` array
2. Ensure `sourceUrl` points to a valid guidance page
3. Use one of the three defined areas
4. Keep descriptions concise (1-2 sentences)

## Performance Considerations

- Server-side rendering (no client-side framework)
- Pagination limits results per page
- No database queries (static data array)
- Efficient filtering with Array methods
