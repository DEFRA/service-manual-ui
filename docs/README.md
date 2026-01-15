# Service Manual UI Documentation

This directory contains technical documentation, architecture diagrams, and Architecture Decision Records (ADRs) for the Service Manual UI project.

## Contents

### Architecture Diagrams

Architecture diagrams using the C4 model are located in `architecture/`:

- **[model.c4](architecture/model.c4)** - Complete architecture model with System Context, Container, and Component views

See [Architecture Documentation](architecture/README.md) for details on viewing and working with diagrams.

### Architecture Decision Records (ADRs)

ADRs document significant architectural decisions:

- **[ADR Index](adr/README.md)** - Complete list of all ADRs

### Feature Documentation

Feature-specific documentation (coming soon):

- Search functionality
- Content management
- Session handling

## Viewing Architecture Diagrams

The architecture diagrams are written in [LikeC4](https://likec4.dev/) DSL, a code-first approach to C4 diagrams.

### Quick Start

Preview diagrams locally:

```bash
cd docs/architecture
npx likec4 start
```

This opens an interactive viewer at `http://localhost:5173`

### Export Diagrams

Export to various formats:

```bash
cd docs/architecture

# Export all views as PNG
npx likec4 export png

# Export as SVG
npx likec4 export svg

# Export as React components
npx likec4 export react
```

## Documentation Standards

When adding documentation:

1. **Architecture Diagrams**: Use LikeC4 for C4 model diagrams
2. **Feature Docs**: Follow the template in `.claude/technical-architect.md`
3. **ADRs**: Use the ADR template for significant decisions
4. **Updates**: Keep docs synchronized with implementation

See `.claude/technical-architect.md` for complete documentation guidelines.
