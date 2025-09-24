# Mini Message Board

A small, full‑stack Node.js and Express application that implements a simple message board with PostgreSQL persistence. Built as a learning project inspired by The Odin Project’s Node.js course, it focuses on clean architecture, server‑side validation, and deploy‑ready configuration.

Note: tested on Railway with Postgres.

## Features

- Messages list: Displays all messages with author, content, and formatted timestamp.
- Message details: Per‑message view via an “Open” link with a dedicated route.
- New message form: Server‑validated form for author and message content.
- PostgreSQL persistence: Messages stored and retrieved via parameterized queries.
- EJS views: Semantic, maintainable templates with header/footer partials.
- Security and observability: Helmet for security headers and Morgan for HTTP logging.
- Responsive navigation: Mobile/desktop nav with accessible menu toggling.

## Tech stack

- Runtime: Node.js (Express)
- View engine: EJS
- Database: PostgreSQL (pg with connection pooling)
- Validation: express-validator
- Security: helmet
- Logging: morgan
- Styling: Modular CSS + CSS variables (no preprocessor)

## Project Structure

```bash
├── app.js
├── controllers
│   └── messagesController.js
├── db
│   ├── pools.js
│   └── queries.js
├── public
│   ├── js
│   │   ├── form.js
│   │   └── menu.js
│   └── styles
│       ├── footer.css
│       ├── form.css
│       ├── header.css
│       ├── index.css
│       ├── message.css
│       └── styles.css
├── routes
│   └── messagesRouter.js
└── views
    ├── pages
    │   ├── form.ejs
    │   ├── index.ejs
    │   └── message.ejs
    └── partials
        ├── footer.ejs
        └── header.ejs
```

- Entry point: Express app initialization, middleware, and route mounting in app.js.
- Routing: Messages routes in routes/messagesRouter.js.
- Controllers: Request handling, validation, and rendering in controllers/messagesController.js.
- Database: Pool configuration and query functions in db/.
- Views: EJS templates and partials in views/.
- Assets: Client‑side JS and modular CSS in public/.

## Setup and configuration

### Prerequisites

- Node.js: v18+ recommended
- PostgreSQL: v13+ recommended

### Installation

```bash
# Clone and install dependencies
git clone https://github.com/Lemuller04/odin-mini-message-board.git
cd odin-mini-message-board
npm install
```

### Environment Variables

You can use a single DATABASE_URL or granular variables. Example granular configuration:

```bash
# Server
PORT=8888
NODE_ENV=development

# Database (granular)
DB_USER=youruser
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_PORT=5432
DB_NAME=minimessageboard

# Alternatively
# DATABASE_URL=postgresql://youruser:yourpassword@localhost:5432/minimessageboard
```

- Pool configuration: If deploying to a managed Postgres, enable SSL in production (e.g., ssl: { rejectUnauthorized: false } when NODE_ENV=production).
- dotenv: The app loads variables via dotenv in app.js.

## Database Schema and Seed

Create a messages table (or message if you prefer singular). Recommended schema with default timestamp:

```sql
CREATE TABLE IF NOT EXISTS message (
  id SERIAL PRIMARY KEY,
  username VARCHAR(16) NOT NULL,
  message  VARCHAR(255) NOT NULL,
  added    TIMESTAMP NOT NULL DEFAULT NOW()
);
```

Optional seed script:

```sql
INSERT INTO message (username, message)
VALUES
  ('Amando', 'Hi there!'),
  ('Charles', 'Hello World!');
```

Run the SQL via your preferred tool (psql, GUI client) or add an npm script that executes a .sql file.

## Running the App

```bash
npm run start
```

- Server: Starts on http://localhost:8888 by default (configurable via PORT).
- Routes:
    - GET / — list all messages
    - GET /new — render new message form
    - POST /new — submit new message
    - GET /message/:id — view message details

## Validation and Security

Server‑side validation: express-validator enforces:
- Author: trimmed, length 1–16
- Message: trimmed, length 1–255
- Error handling UX: On validation errors, the form re‑renders with error messages and preserved input.
- Parameterized queries: All database operations use $1, $2, … placeholders to prevent SQL injection.
- Security headers: helmet() applies sensible defaults.
- Logging: morgan('dev') for request visibility during development.
- 404 and error handling: Add a dedicated 404 view and render a generic error message in production.

## Accessibility and UX

- Focus states: Use visible outlines for keyboard navigation.
- ARIA: aria-label and aria-expanded used for the mobile menu toggle;
- Character counters: Live counters for input fields improve form feedback;

## Development Notes and Future Improvements

- Learning focus: This project is intentionally simple to practice Express routing, EJS templating, and PostgreSQL basics.
- Potential enhancements:
    - Pagination: Add LIMIT/OFFSET to getAllMessages for large datasets.
    - CRUD completeness: Add edit/delete routes and views.
    - Authentication: Associate messages with user accounts.

## License

License: MIT (see LICENSE in the repository).
