## SuperChef

<table border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; border: none;">
  <tr>
    <td><img alt="GitHub" src="https://img.shields.io/github/license/eiberham/superchef?style=for-the-badge"></td>
    <td><img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/eiberham/superchef?style=for-the-badge"></td>
    <td><img alt="GitHub top language" src="https://img.shields.io/github/languages/top/eiberham/superchef?style=for-the-badge"></td>
    <td><img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/eiberham/superchef?style=for-the-badge"></td>
    <td><img alt="GitHub stars" src="https://img.shields.io/github/stars/eiberham/superchef?style=for-the-badge"></td>
    <td><img alt="GitHub workflow status" src="https://img.shields.io/github/actions/workflow/status/eiberham/superchef/ci.yml?style=for-the-badge"></td>
  </tr>
</table>

SuperChef is an AI-powered chef assistant designed to analyze existing recipes, suggest meaninful improvements, and help you create better dishes using your current ingredients.

It works on top of your current database, providing practical, cooking-focused recommendations rather than generic advice.

TLDR features:

- Real world backend concerns
- Async workflows
- Security best practices
- Clean NestJS architecture
- Pragmatic use of message queue

## Routes

All API endpoints are documented using **Swagger (OpenAPI)**.

Once the application is running, the interactive API documentation is available at:

- `GET /apis`

The Swagger UI provides request/resoponse schemas, parameters, and example payloads for each endpoint.

Below is a high level overview of the available routes:

<table>
  <thead>
    <tr>
      <th>Verb</th><th>Resource</th><th>Description</th><th>Scope</th><th>Role Access</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>POST</td><td>/auth</td><td>Superchef sign in</td><td>Public</td><td>Admin, Viewer</td>
    </tr>
    <tr>
      <td>GET</td><td>/ingredients</td><td>Get ingredients list</td><td>Protected</td><td>Admin, Viewer</td>
    </tr>
    <tr>
      <td>GET</td><td>/ingredients/:id</td><td>Get a single ingredient</td><td>Protected</td><td>Admin, Viewer</td>
    </tr>
    <tr>
      <td>POST</td><td>/ingredients</td><td>Create an ingredient</td><td>Protected</td><td>Admin, Viewer</td>
    </tr>
    <tr>
      <td>PUT</td><td>/ingredients/:id</td><td>Update an ingredient</td><td>Protected</td><td>Admin, Viewer</td>
    </tr>
    <tr>
      <td>DELETE</td><td>/ingredients/:id</td><td>Delete ingredient</td><td>Protected</td><td>Admin, Viewer</td>
    </tr>
    <tr>
      <td>GET</td><td>/recipes</td><td>Get the recipes list</td><td>Protected</td><td>Admin, Viewer</td>
    </tr>
    <tr>
      <td>GET</td><td>/recipes/:id</td><td>Get a single recipe</td><td>Protected</td><td>Admin, Viewer</td>
    </tr>
    <tr>
      <td>POST</td><td>/recipes</td><td>Create a recipe</td><td>Protected</td><td>Admin, Viewer</td>
    </tr>
    <tr>
      <td>PUT</td><td>/recipes/:id</td><td>Update a recipe</td><td>Protected</td><td>Admin, Viewer</td>
    </tr>
    <tr>
      <td>DELETE</td><td>/recipes/:id</td><td>Delete a recipe</td><td>Protected</td><td>Admin, Viewer</td>
    </tr>
    <tr>
      <td>GET</td><td>/users</td><td>Get users list</td><td>Protected</td><td>Admin</td>
    </tr>
    <tr>
      <td>GET</td><td>/users/:id</td><td>Get a single user</td><td>Protected</td><td>Admin</td>
    </tr>
    <tr>
      <td>POST</td><td>/users</td><td>Create a user</td><td>Protected</td><td>Admin</td>
    </tr>
    <tr>
      <td>PUT</td><td>/users/:id</td><td>Update a user</td><td>Protected</td><td>Admin</td>
    </tr>
    <tr>
      <td>DELETE</td><td>/users/:id</td><td>Delete a user</td><td>Protected</td><td>Admin</td>
    </tr>
    <tr>
      <td>POST</td><td>/chat</td><td>Sends a message to the superchef agent</td><td>Protected</td><td>Admin</td>
    </tr>
  </tbody>
</table>

## Authentication & Security

#### JWT-based Authentication

- Stateless authentication using JWT access tokens
- Tokens are issued on login and required for protected routes
- Designed to be compatible with API clients and frontends.

#### Role-Based Access Control (RBAC)

- Users can have one or more roles
- Example roles:
  - admin
  - viewer

RBAC is applied at the route level, ensuring fine grained authorization.

#### Route Protection

- Global authentication guard ensures all protected routes require a valid JWT.
- Public routes are explicitly marked.
- Authorization logic is separated from controllers.

#### Rate Limiting

- Built-in rate limiter to protect the API from abuse.
- Prevents excessive requests to sensitive endpoints
- Configurable limits per route or globally.

## Async Processing with RabbitMQ

#### Event-driven Architecture

- RabbitMQ is used to handle async workflows
- Examples:
  - User registration triggers a welcome email
  - Extensible to notifications

#### Producers & Consumers Separation

- API publishes domain events
- Workers consume and process them independently
- Designed to be monolith-friendly, without premature microservices.

## Caching (Redis)

Superchef uses Redis as an in-memory cache to reduce latency and decrease load on the primary PostgreSQL database.

The cache is applied to read-heavy endpoints following the **cache-aside** pattern:

- On read:
  - The application first checks redis.
  - If the data is present, it is returned immediately.
  - If not, the data is fetched from PostgreSQL and stored in Redis with a TTL.

- On write:
  - Data is persisted synchronously to PostgreSQL.
  - Related cache keys are invalidated to guarantee consistency.

This approach keeps PostgreSQL as the sigle source of thruth while improving response times for frequent reads.

## User Preferences

Each user can configure dietary preferences that are stored as JSON object inside the user table.
Suported fields:
- `diet`: "none" | "vegetarian" | "vegan" | "omnivore"
- `alergies`: string[]

## AI Recipe Assistant

Superchef includes an AI-powered assistant via the `/chat` endpoint, that helps users improve existing recipes by suggesting variations, optimizations, or substitutions based on natural language prompts.

The assistant is implemented as a backend agent powered by OpenAI and orchestrated server side.

All suggestions are generated in the context of a real recipe stored in the database.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
