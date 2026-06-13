# NestJS API + CLI Architecture

This project separates the HTTP API and CLI applications while sharing the same domain and business logic.

## Project Structure

```text
src/
├── api/
|   |── controller
|   |   |──users.controller.ts
|   |   |──tasks.controller.ts
│   ├── api.module.ts
│   └── main.ts
│
├── cli/
│   ├── commands/
│   │   ├── import-users.command.ts
│   │   └── sync-task.command.ts
│   ├── cli.module.ts
│   └── main.ts
│
├── domains/
│   ├── users/
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   │
│   └── task/
│       ├── dto/
│       ├── entities/
│       ├── task.service.ts
│       └── task.module.ts
│
├── shared/
│   ├── common/
│   ├── services/
│   ├── interfaces/
│   └── utils/
│
├── config/
│
└── database/
    ├── migrations/
    ├── seeders/
    └── database.module.ts
```

---

## Architecture Overview

The application is divided into three layers:

### API Layer

Handles:

- HTTP requests
- Authentication
- Authorization
- Validation
- API documentation

Location:

```text
src/api
```

### CLI Layer

Handles:

- Data imports
- Batch jobs
- Reports
- Maintenance scripts
- Scheduled tasks

Location:

```text
src/cli
```

### Domain Layer

Contains:

- Business logic
- Services
- Repositories
- Entities
- DTOs

Location:

```text
src/domains
```

Both API and CLI consume the same domain services.

---

## Installation

Install dependencies:

```bash
npm install
```

---

## Running the API

### Development Mode

```bash
npm run start:api
```

The API will restart automatically when files change.

Example script:

```json
{
  "scripts": {
    "start:api": "nest start --watch --entryFile api/main"
  }
}
```

### Production Mode

```bash
npm run build
node dist/api/main.js
```

---

## Running CLI Commands

Example script:

```json
{
  "scripts": {
    "cli": "ts-node -r tsconfig-paths/register src/cli/main.ts"
  }
}
```

Run:

```bash
npm run cli
```

Example use cases:

```bash
npm run cli import-users
npm run cli sync-products
npm run cli generate-report
```

---

## Creating a New Domain Module

Generate a module:

```bash
nest g module domains/users
```

Generate a service:

```bash
nest g service domains/users
```

Generate a controller:

```bash
nest g controller api/contoller/users
```

Result:

```text
domains/
└── users/
    ├── users.module.ts
    └── users.service.ts
```

---

## API Bootstrap Example

### src/api/main.ts

```typescript
import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);

  console.log(
    `🚀 API running on http://localhost:${process.env.PORT ?? 3000}/api`,
  );
}

bootstrap();
```

---

## CLI Bootstrap Example

### src/cli/main.ts

```typescript
import { NestFactory } from '@nestjs/core';
import { CliModule } from './cli.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(CliModule);

  // Execute command here

  await app.close();
}

bootstrap();
```

---

## Recommended Path Aliases

### tsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "@/": ["src/*"],
      "@api/*": ["src/api/*"],
      "@cli/*": ["src/cli/*"],
      "@domains/*": ["src/domains/*"],
      "@shared/*": ["src/shared/*"]
    }
  }
}
```

Usage:

```typescript
import { UsersModule } from '@domains/users/users.module';
```

---

## Benefits

- Clear separation between API and CLI applications.
- Reusable business logic.
- Easier testing and maintenance.
- Scales well for CRM, ERP, SaaS, and enterprise applications.
- Follows Domain-Driven Design (DDD) principles.
- Prevents business logic from leaking into controllers or commands.

---

## Scripts

```json
{
  "scripts": {
    "start:api": "nest start --watch --entryFile api/main",
    "build": "nest build",
    "start:prod": "node dist/api/main.js",
    "cli": "ts-node -r tsconfig-paths/register src/cli/main.ts"
  }
}
```

---

## Future Enhancements

- Swagger/OpenAPI integration
- CQRS pattern
- Event-driven architecture
- Queue processing with BullMQ
- Scheduled jobs with @nestjs/schedule
- Multi-tenant support
- Microservice communication