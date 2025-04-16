# BogeyBuddies

Short description of the project: vision, purpose, company, etc.

Table of contents:

- [Project title](#project-title)
  - [Links](#links)
  - [Usage](#usage)
    - [Internationalization](#internationalization)
      - [TLDR:](#tldr)
      - [Instructions](#instructions)
  - [Manually configured settings](#manually-configured-settings)
  - [Conventions](#conventions)
  - [Architecture Overview](#architecture-overview)
    - [Integrations](#integrations)
    - [Processes](#processes)
      - [Basic Scenario](#basic-scenario)
  - [Security](#security)
  - [Time Tracking](#security)

## Links

- [Web Application GUI (dev)](https://bogeybuddies-362350447599.europe-north1.run.app/)

## Usage

> Some notes about testing and usage either here or in a separate document.

### Internationalization

[Lingui](https://lingui.dev/) is used as the i18n library of choise.

#### TLDR:

1. Use t or Trans macros from @lingui/macro for all text.
2. Run `npm run lang:extract`.
3. Fill in translations to _messages.po_ files.
4. Run `npm run generate:lang`
5. Translations should now work.

#### Instructions

Translations are made by using the _t_ or _Trans_ macro from _@lingui/macro_.

For example:

```javascript
<TextInput label={t`I'm internationalizable`} />

<h1><Trans>This title can be translated</Trans></h1>
```

These messages are then extracted to _client/src/locales/:locale/messages.po_ by with `lingui extract`.

Translations can be filled in to the messages.po files for each locale (English not necessary as we use those as message identifiers).

Messages are then compiled for use with `lingui compile`.

These extract and compile scripts can be run in the client folder separately

```bash
cd client
npm run lang:extract
npm run generate:lang
```

## Manually configured settings

> Try to keep all configurations in version control. However, if you have configured something manually, describe manually configured settings here.

## Conventions

> TODO: Project-specific conventions. E.g.: Git commit message conventions, naming conventions, pull request conventions, etc.

I am using [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages.

## Architecture Overview

DIAGRAM: You can use [Gravizo](https://www.gravizo.com) for making a architecture diagram if the diagram does not contain any confidential information. Note that architecture diagram is not mandatory if the architecture is very simple.

### Integrations

- Client uses X

### Processes

Only non-trivial processes need to be described here (e.g. scheduled batch processing), though it might be a good idea to describe one or two basic scenarios also. Architecture is the main focus here. User stories should be documented elsewhere (e.g. wiki).

#### Basic Scenario

1. User performs action on UI
2. Server authorizes action by system X
3. Server reads/updates database
4. Server returns value

## Security

> Add security details either here or in a separate document. See the [security](https://taitounited.github.io/taito-cli/tutorial/d-security/) appendix of the [Taito CLI tutorial](https://taitounited.github.io/taito-cli/tutorial).

## Time Tracking

> Add time tracking, what was done and how long it took

- 16.4.25 setup Vite, and node app skeletons, Dockerize both. Setup Cloud Run dev environment. = 6 hours
