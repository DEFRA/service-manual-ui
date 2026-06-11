# Navigation Management Guide

## Overview

Navigation components are centrally managed in `src/config/navigation.yaml` to eliminate duplication across 104 markdown files and ensure consistency.

## How It Works

1. **Single source of truth**: All navigation patterns are defined in `src/config/navigation.yaml`
2. **Reference by key**: Markdown files reference navigation using a string key (e.g., `nav-ai-toolkit`)
3. **Request-time resolution**: `content-loader.js` resolves references when pages are requested and injects the full structure
4. **Backward compatible**: Still accepts inline arrays if needed

---

## Adding a Page to an Existing Section

### Example: Add a new AI Toolkit guidance page

1. Create your markdown file with the relevant nav keys in the frontmatter:

```yaml
---
title: My New Guidance
layout: article
customNav: nav-ai-toolkit # References the AI Toolkit top nav
sectionNav: nav-ai-guidance # References the guidance sidebar
---
```

2. (Optional) Regenerate or update `docs/nav-usage-map.md` if you want the usage map to stay current.

---

## Creating a New Navigation Section

When adding a completely new section (e.g., a new top-level area like "Data Management"):

### Step 1 — Add your new pattern to `src/config/navigation.yaml`

Use a descriptive key and include a comment showing which files use it:

```yaml
# Data management section navigation
# Used by: X files in data-management/**
nav-data-management:
  - title: In this section
    items:
      - text: Data management
        href: /data-management
  - title: Best practices
    items:
      - text: Data governance
        href: /data-management/governance
      - text: Data quality
        href: /data-management/quality
```

### Step 2 — Reference the new key in your markdown files

```yaml
---
title: Data Governance
layout: article
sectionNav: nav-data-management
---
```

### Step 3 — Register the new pattern in `nav-usage-map.md`

Add a new entry listing the pattern key and all files that use it:

```markdown
### nav-data-management

- src/content/data-management/index.md
- src/content/data-management/governance.md
- src/content/data-management/quality.md
```

---

## Updating an Existing Navigation Pattern

To change a link, label, or structure in an existing nav:

1. Open `src/config/navigation.yaml`
2. Find the pattern by its key (e.g., `nav-content`)
3. Make your change

```yaml
# Before
nav-content:
  - title: In this section
    items:
      - text: Content design
        href: /content

# After — renamed link label
nav-content:
  - title: In this section
    items:
      - text: Content design principles
        href: /content
```

> ⚠️ **Important:** Because multiple pages share the same nav key, any change you make here will affect every page that references it. Check `nav-usage-map.md` first to see how many pages will be affected before editing.

---

## Available Navigation Patterns

There are 16 navigation patterns currently defined in `navigation.yaml`:

| Key                       | Type       | Used by  |
| ------------------------- | ---------- | -------- |
| `nav-ai-toolkit`          | customNav  | 51 files |
| `nav-accessibility`       | sectionNav | 3 files  |
| `nav-ai-guidance`         | sectionNav | 19 files |
| `nav-ai-patterns`         | sectionNav | 5 files  |
| `nav-ai-projects`         | sectionNav | 5 files  |
| `nav-ai-tools`            | sectionNav | 11 files |
| `nav-architecture`        | sectionNav | 5 files  |
| `nav-business-analysis`   | sectionNav | 2 files  |
| `nav-content`             | sectionNav | 15 files |
| `nav-design`              | sectionNav | 7 files  |
| `nav-product-delivery`    | sectionNav | 3 files  |
| `nav-security`            | sectionNav | 2 files  |
| `nav-service-assessments` | sectionNav | 5 files  |
| `nav-sustainability`      | sectionNav | 4 files  |
| `nav-testing`             | sectionNav | 2 files  |
| `nav-user-research`       | sectionNav | 5 files  |

**customNav** = the top-level navigation bar (used across a whole toolkit or area)  
**sectionNav** = the sidebar navigation for a specific section

---

## Naming Conventions

When creating a new nav key, follow these rules:

- **Always prefix with `nav-`** — e.g., `nav-data-management` not `data-management`
- **Use lowercase letters and hyphens only** — no underscores, spaces, or capital letters
- **Be descriptive** — the name should make it obvious which section it belongs to
- **Match the folder structure** — if your content lives in `src/content/data-management/`, name it `nav-data-management`

```yaml
# ✅ Good
nav-data-management
nav-user-research
nav-service-assessments

# ❌ Bad
dataManagement       # camelCase
nav_user_research    # underscores
nav-new              # not descriptive
```

---

## Structure Guidelines

Every pattern in `navigation.yaml` must follow this structure:

```yaml
nav-your-key: # Required: unique key, prefixed with nav-
  - title: string # Required: heading shown above the group of links
    items: # Required: list of links in this group
      - text: string # Required: the visible link label
        href: string # Required: the URL path the link points to
```

You can have multiple groups under one key by adding more list items at the top level:

```yaml
nav-example:
  - title: First group
    items:
      - text: Link one
        href: /link-one
  - title: Second group
    items:
      - text: Link two
        href: /link-two
```

---

## Troubleshooting

### A page is showing missing or broken navigation

1. Open the markdown file and check the frontmatter — confirm the nav key is spelled correctly:

```yaml
sectionNav: nav-content # must match exactly what's in navigation.yaml
```

2. Open `src/config/navigation.yaml` and confirm the key exists. Keys are case-sensitive.

3. If the key is missing from `navigation.yaml`, add it following the structure guidelines above.

### How to check all references are valid

Manually verify by searching across all markdown files for any nav key that doesn't match a key in `navigation.yaml`:

1. Open `src/config/navigation.yaml` and note the list of valid keys
2. In your editor, do a project-wide search for `customNav:` and `sectionNav:`
3. Check that every value found is a string key that exists in `navigation.yaml`

You can also check `verification-report.json` in the project root — this was generated at the end of the migration and confirms all 144 references resolved correctly with no mismatches at that point in time.

### I need to add a nav key but I'm not sure which pattern to use

Check `nav-usage-map.md` — it lists every nav pattern and the files that use it. Find a section similar to yours and use the same key, or create a new one following the steps in [Creating a New Navigation Section](#creating-a-new-navigation-section).

### I accidentally deleted a nav pattern that pages still reference

Restore it using Git. Run `git log src/config/navigation.yaml` to find the commit before your change, then `git checkout <commit-hash> -- src/config/navigation.yaml` to restore that version. Once restored, manually verify your markdown references are still valid using the steps above.
