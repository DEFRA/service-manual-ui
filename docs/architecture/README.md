# Service Manual UI - Architecture

This directory contains architecture diagrams for the Service Manual UI using the [C4 model](https://c4model.com/) and [LikeC4](https://likec4.dev/) DSL.

## Architecture Model

The complete architecture is defined in **[model.c4](model.c4)**, which includes:

### Level 1: System Context

Shows the Service Manual system and its relationship with:

- **Users**: Defra Staff, Delivery Teams, Service Assessors
- **External Systems**: GOV.UK Frontend, Redis Service

**View**: `systemContext`

```bash
npx likec4 view systemContext
```

### Level 2: Container Diagram

Shows the high-level technical building blocks:

- **Web Application**: Node.js/Hapi.js server
- **Content Files**: Markdown guidance content
- **Client Assets**: Frontend JavaScript/CSS
- **Session Cache**: Redis (production) or Memory (dev)

**View**: `containers`

```bash
npx likec4 view containers
```

### Level 3: Component Diagrams

Multiple component-level views showing internal structure:

#### Web Application Components

Complete view of all components within the web application.

**View**: `webAppComponents`

```bash
npx likec4 view webAppComponents
```

#### Routing Components

Shows how the Hapi.js router distributes requests to controllers.

**View**: `routingComponents`

```bash
npx likec4 view routingComponents
```

#### Content Processing Components

Shows how markdown content is loaded, parsed, and rendered.

**View**: `contentComponents`

```bash
npx likec4 view contentComponents
```

#### Search Components

Shows server-side search indexing and client-side autocomplete.

**View**: `searchComponents`

```bash
npx likec4 view searchComponents
```

#### Security & Middleware Components

Shows security headers, logging, tracing, and session management.

**View**: `securityComponents`

```bash
npx likec4 view securityComponents
```

## Working with Diagrams

### Preview Diagrams Locally

Start an interactive viewer:

```bash
npx likec4 start
```

Opens browser at `http://localhost:5173` with all views.

### Validate Model

Check syntax:

```bash
npx likec4 validate .
```

### Export Diagrams

Export to various formats:

```bash
# PNG images
npx likec4 export png

# SVG images
npx likec4 export svg

# React components
npx likec4 export react
```

## LikeC4 Syntax Overview

The `model.c4` file has three main sections:

### 1. Specification

Defines element types and their visual styling:

```c4
specification {
  element actor {
    style { shape person }
  }
  element system
  element container
  element component
}
```

### 2. Model

Defines the architecture elements and relationships:

```c4
model {
  user = actor 'User Name' {
    description 'What they do'
  }

  system = system 'System Name' {
    container1 = container 'Container' {
      component1 = component 'Component' {
        description 'What it does'
        technology 'Technology used'
      }
    }
  }

  user -> system 'interacts with'
  container1 -> component1 'uses'
}
```

### 3. Views

Defines what diagrams to render:

```c4
views {
  view myView {
    title 'View Title'
    include *  // Include all elements
  }

  view components of system.container1 {
    title 'Container Components'
    include *
  }
}
```

## Updating Diagrams

When architecture changes:

1. Edit `model.c4` to reflect changes
2. Validate: `npx likec4 validate .`
3. Preview: `npx likec4 start`
4. Commit updated `.c4` file

## Resources

- **LikeC4 Documentation**: https://likec4.dev/docs/
- **LikeC4 Playground**: https://playground.likec4.dev/
- **C4 Model**: https://c4model.com/
- **LikeC4 GitHub**: https://github.com/likec4/likec4

## Architecture Principles

The Service Manual UI follows these architectural principles:

1. **Content-Driven**: Markdown files as the source of truth
2. **GOV.UK First**: Extends GOV.UK Design System patterns
3. **Server-Side Rendering**: SEO-friendly, accessible HTML generation
4. **Progressive Enhancement**: Works without JavaScript
5. **Security by Default**: CSP, HSTS, secure headers
6. **Observability**: Structured logging and distributed tracing
7. **Stateless**: Session state in Redis, not application memory
