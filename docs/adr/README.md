# Architecture Decision Records

This directory contains Architecture Decision Records (ADRs) for the Service Manual UI project.

## What is an ADR?

An Architecture Decision Record captures a significant architectural decision along with its context and consequences. ADRs help teams understand why decisions were made and provide historical context for future changes.

## ADR Index

| Number | Title                                                                    | Status   | Date       |
| ------ | ------------------------------------------------------------------------ | -------- | ---------- |
| 0001   | [Standards Browser Architecture](0001-standards-browser-architecture.md) | Accepted | 2026-01-16 |

## When to Create an ADR

Create an ADR when making decisions about:

- **Technology Choices**: Selecting frameworks, libraries, or platforms
- **Architectural Patterns**: Establishing design patterns or conventions
- **Trade-offs**: Making decisions with significant consequences
- **Integration Points**: Connecting to external systems
- **Security**: Authentication, authorization, data protection
- **Performance**: Caching strategies, optimization approaches
- **Scalability**: How the system handles growth

## ADR Template

Use this template for new ADRs:

```markdown
# ADR-NNNN: Title

## Status

Proposed | Accepted | Deprecated | Superseded by [ADR-XXXX](XXXX-title.md)

## Date

YYYY-MM-DD

## Context

What is the issue that we're seeing that is motivating this decision or change?

## Decision

What is the change that we're proposing and/or doing?

## Consequences

### Positive

- Benefit 1
- Benefit 2

### Negative

- Drawback 1
- Drawback 2

### Neutral

- Side effect 1

## Alternatives Considered

### Alternative 1: Name

- Description
- Why not chosen

### Alternative 2: Name

- Description
- Why not chosen

## References

- Related documentation
- External resources
- Related ADRs
```

## ADR Numbering

- Use sequential four-digit numbers: `0001`, `0002`, `0003`, etc.
- File format: `NNNN-kebab-case-title.md`
- Example: `0001-use-hapi-framework.md`

## Creating an ADR

1. Check this index for the next available number
2. Create a new file: `NNNN-your-title.md`
3. Fill in the template
4. Update the index table above
5. Create a pull request

## ADR Status

- **Proposed**: Decision is under discussion
- **Accepted**: Decision has been approved and implemented
- **Deprecated**: Decision is no longer recommended but still in use
- **Superseded**: Decision has been replaced by a newer ADR

## Resources

- [ADR GitHub Organization](https://adr.github.io/)
- [Architecture Decision Records by Michael Nygard](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [ADR Tools](https://github.com/npryce/adr-tools)
