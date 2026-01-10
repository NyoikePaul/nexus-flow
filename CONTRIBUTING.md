# Contributing to NexusFlow

Thanks for your interest! Here's how to get involved.

## Development Setup

```bash
git clone https://github.com/NyoikePaul/nexus-flow.git
cd nexus-flow
pnpm install
cp .env.example .env
docker compose up -d
pnpm dev
```

## Branch Naming

| Type     | Pattern                    |
|----------|----------------------------|
| Feature  | `feat/short-description`   |
| Bug fix  | `fix/what-was-broken`      |
| Refactor | `refactor/what-changed`    |
| Docs     | `docs/what-was-documented` |

## Commit Style

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(shipments): add status filter to list endpoint
fix(dashboard): correct risk score colour threshold
docs: update local setup instructions
```

## Pull Requests

- Keep PRs focused — one concern per PR
- Add tests for new features
- Update docs if behaviour changes

## Issues

Use the issue templates for bugs and features. Include steps to reproduce for bugs.
