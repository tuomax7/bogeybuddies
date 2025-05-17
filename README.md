# BogeyBuddies

A web application for keeping score of friendly season-long golf competitions.

Table of contents:

- [BogeyBuddies](#BogeyBuddies)
  - [Links](#links)
  - [Local development](#local-development)
  - [Deployment and CI/CD](#deployment-and-cicd)
  - [Internationalization](#internationalization)
  - [Conventions](#conventions)

## Links

- [Web Application GUI (local dev)](http://localhost:3000/)
- [Web Application GUI (dev)](https://bogeybuddies-dev-362350447599.europe-north1.run.app)
- [Web Application GUI (prod)](https://bogeybuddies-prod-362350447599.europe-north1.run.app)

- [Server API (local dev)](http://localhost:8080/api)

- [Project Issue Board](https://github.com/users/tuomax7/projects/2)

## Local development

You can run the application stack with:

```bash
docker compose up
```

## Deployment and CI/CD

Upon pushing to `dev` or `main` branches, a Google Cloud Build Trigger activates which:

1. Builds a new Docker image based on the `Dockerfile.prod`
2. Pushes this new image to the Google Cloud Artifact Registry
3. Serves a new Cloud Run revision to the live application using this image

## Internationalization

[react-i18next](https://react.i18next.com/) will be used as the i18n library of choice to provide language support for both Finnish and English.

## Conventions

I am using [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages.
