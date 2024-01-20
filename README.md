## Getting Started

This branch contains the live version-ready app.

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

To format code with Prettier:

```bash
npm run format
```

## Workflow

To update the live dev version of the REST API:

```bash
amplify push --y
```

If ran in `main` or `prod` branches, will also push client changes live!
