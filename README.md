# Digital Service Manual

[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=DEFRA_service-manual-ui&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=DEFRA_service-manual-ui)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=DEFRA_service-manual-ui&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=DEFRA_service-manual-ui)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=DEFRA_service-manual-ui&metric=coverage)](https://sonarcloud.io/summary/new_code?id=DEFRA_service-manual-ui)

The Defra Digital Service Manual provides guidance and standards for digital teams building services.

- [Requirements](#requirements)
  - [Node.js](#nodejs)
- [Documentation](#documentation)
- [Ask the toolkit](#ask-the-toolkit)
  - [Settings](#settings)
  - [Turning it off](#turning-it-off)
  - [If something goes wrong](#if-something-goes-wrong)
  - [Report emails are untrusted](#report-emails-are-untrusted)
- [Local Development](#local-development)
  - [Setup](#setup)
  - [Development](#development)
  - [Production](#production)
  - [Npm scripts](#npm-scripts)
  - [Update dependencies](#update-dependencies)
  - [Formatting](#formatting)
    - [Windows prettier issue](#windows-prettier-issue)
- [Docker](#docker)
  - [Development image](#development-image)
  - [Production image](#production-image)
  - [Docker Compose](#docker-compose)
  - [Dependabot](#dependabot)
  - [SonarCloud](#sonarcloud)
- [Licence](#licence)
  - [About the licence](#about-the-licence)

## Requirements

### Node.js

Please install [Node.js](http://nodejs.org/) `>= v22` and [npm](https://nodejs.org/) `>= v9`. You will find it
easier to use the Node Version Manager [nvm](https://github.com/creationix/nvm)

To use the correct version of Node.js for this application, via nvm:

```bash
cd service-manual-ui
nvm use
```

## Documentation

Technical documentation is in the [docs](./docs) folder:

- [Search functionality](./docs/search.md) - How the search and autocomplete works
- [Architecture diagrams](./docs/architecture/README.md) - C4 architecture model

## Proxy

Proxying is handled at the infrastructure level via the `NODE_USE_ENV_PROXY` environment variable, rather than the
application setting up a global `undici` `ProxyAgent` dispatcher itself. When enabled, Node's built-in `fetch`
(and anything built on `undici`) will automatically pick up the standard `HTTP_PROXY`/`HTTPS_PROXY`/`NO_PROXY`
environment variables.

## Ask the toolkit

Ask the toolkit, at `/ai-toolkit/ask`, answers questions from the AI digital toolkit's guidance. The answers come from
service-manual-chat-backend.

### Settings

| Variable | What it does |
| :-- | :-- |
| `AI_TOOLKIT_ASK_ENABLED` | Turns Ask on. Off by default, and needs `ENABLE_AI_CONTENT` on as well. |
| `AI_TOOLKIT_ASK_API_URL` | The address of service-manual-chat-backend. |
| `AI_TOOLKIT_ASK_API_TIMEOUT_MS` | How long the site waits for an answer. Default 30000 (30 seconds). |
| `AI_TOOLKIT_ASK_REPORT_TEMPLATE_ID` | The GOV.UK Notify template for problem reports. Empty turns reports off. |

All are set per environment in cdp-app-config and take effect after service-manual-ui is redeployed.

### Turning it off

Use these in order:

1. Stop the answers. Set `ASK_DAILY_CEILING=0` on service-manual-chat-backend and redeploy it. No AI model is
   called. Readers are told the toolkit cannot answer any more questions today and are given the team's email
   address. The pages stay up.
2. Remove the pages. Set `AI_TOOLKIT_ASK_ENABLED=false` here and redeploy. The Ask pages then return 404.

To turn off problem reports and leave the rest on, set `AI_TOOLKIT_ASK_REPORT_TEMPLATE_ID` to an empty value.

### If something goes wrong

Most problems reach the team as problem reports in the team mailbox.

| What happened | What to do first |
| :-- | :-- |
| An answer is wrong or could cause harm | Check it against the guidance. If it could lead someone to put data at risk, stop the answers. Then fix the guidance or the backend's prompt. |
| Someone typed personal data, or an answer shows it | Follow [report an AI incident](https://digital.defra.gov.uk/ai-toolkit/guidance/report-an-ai-incident). Amazon Bedrock keeps every question and answer for 30 days in a store the platform runs, so give the time it happened. |
| Readers are told it cannot answer any more questions today | The daily ceiling of model calls has been reached. It resets at midnight UTC. Check the backend logs for a spike, and raise the ceiling only if the use is genuine. |
| Every question gets "The toolkit could not answer just now" | The backend or Bedrock is failing. Check service-manual-chat-backend's logs in OpenSearch. If it lasts, stop the answers. |
| Answers miss a recent change to the guidance | Ask answers from a fixed copy of the toolkit pages, set by `CONTENT_REF` in the backend's Dockerfile. Update it to the latest commit on main and redeploy the backend. |

### Report emails are untrusted

A problem report emails the reader's question, the answer and anything they wrote in the report to the team mailbox.
The reader and the AI model wrote all of it. Nothing reads the mailbox automatically today. Anything that does in future,
such as a triage tool or an AI summary, must treat report text as untrusted input, never as instructions.

## Local Development

### Setup

Install application dependencies:

```bash
npm install
```

Set up Git hooks with Husky:

```bash
npm run setup:husky
```

> This enables pre-commit checks for formatting, linting, and tests.

### Development

To run the application in `development` mode run:

```bash
npm run dev
```

### Production

To mimic the application running in `production` mode locally run:

```bash
npm start
```

### Tests

To run the whole suite with coverage, as CI does:

```bash
npm test
```

To run a single file or folder while working:

```bash
npx vitest run tests/unit/server/ai-ask
```

Tests live under `tests/`, never beside the source, following the
[AICE JavaScript testing guide](https://github.com/DEFRA/aice-team/blob/main/style-guides/javascript-testing.md):

- `tests/unit/` mirrors `src/` and addresses one module by importing it
- `tests/integration/` addresses an entry point such as a page or plugin, and boots a server
- `tests/helpers/` and `tests/fixtures/` hold test-only code and data

> Some integration tests bind port 3000, so stop `npm run dev` before running the full suite.

### Npm scripts

All available Npm scripts can be seen in [package.json](./package.json)
To view them in your command line run:

```bash
npm run
```

### Update dependencies

To update dependencies use [npm-check-updates](https://github.com/raineorshine/npm-check-updates):

> The following script is a good start. Check out all the options on
> the [npm-check-updates](https://github.com/raineorshine/npm-check-updates)

```bash
ncu --interactive --format group
```

### Formatting

#### Windows prettier issue

If you are having issues with formatting of line breaks on Windows update your global git config by running:

```bash
git config --global core.autocrlf false
```

## Docker

### Development image

> [!TIP]
> For Apple Silicon users, you may need to add `--platform linux/amd64` to the `docker run` command to ensure
> compatibility fEx: `docker build --platform=linux/arm64 --no-cache --tag service-manual-ui`

Build:

```bash
docker build --target development --no-cache --tag service-manual-ui:development .
```

Run:

```bash
docker run -p 3000:3000 service-manual-ui:development
```

### Production image

Build:

```bash
docker build --no-cache --tag service-manual-ui .
```

Run:

```bash
docker run -p 3000:3000 service-manual-ui
```

### Docker Compose

A local environment with:

- Localstack for AWS services (S3, SQS)
- MongoDB
- This service.
- A commented out backend example.

```bash
docker compose up --build -d
```

### Dependabot

Dependabot is configured in [.github/dependabot.yml](.github/dependabot.yml). Each week it opens at most 4 pull
requests: for npm packages and for GitHub Actions, one with minor and patch updates and one with major updates,
which need checking one by one. It waits 7 days after a release, to match `min-release-age` in `.npmrc`.

Every pull request also runs the dependency review action, which fails if the change adds a dependency with a
high or critical vulnerability, and `npm audit`, which fails on critical vulnerabilities in production dependencies.

### SonarCloud

Instructions for setting up SonarCloud can be found in [sonar-project.properties](./sonar-project.properties).

## Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government license v3

### About the licence

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable
information providers in the public sector to license the use and re-use of their information under a common open
licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
