# Waldo API

A lightweight Express + Prisma backend for the Waldo image-guessing game. It handles image metadata, character lookup, game sessions, guess validation, score submission, and leaderboard retrieval.

## Features

- Retrieve image information and character locations for a given image
- Start a game session and track guesses with a cookie-based `gameId`
- Validate player clicks against the true character position
- Complete a game and save a score with the player name
- Fetch leaderboard entries and a player’s rank for a specific image
- Serve static image assets from the public image folder

## Tech stack

- Node.js + Express
- Prisma ORM
- PostgreSQL
- Cookie-based game session tracking

## Project structure

- `app.js` – application entry point and route mounting
- `routes/` – endpoint definitions for images, characters, game flow, and leaderboard
- `controllers/` – request handlers for each route group
- `db/query.js` – Prisma database queries
- `prisma/schema.prisma` – database schema
- `public/images/` – static image files

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file and set your PostgreSQL connection string:

   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME"
   ```

3. Generate Prisma client and apply migrations:

   ```bash
   npx prisma generate
   npx prisma migrate deploy
   ```

4. Start the API:

   ```bash
   npm start
   ```

The server will run at `http://localhost:3000` by default.

## API overview

Base URL: `https://YOUR-API-URL` for deployment, or `http://localhost:3000` locally.

### Image routes

| Method | Route               | Description                                                 |
| ------ | ------------------- | ----------------------------------------------------------- |
| GET    | `/img/:imgId`       | Returns the image record for the supplied image ID.         |
| GET    | `/images/:filename` | Serves a static image file from the public image directory. |

Example:

```bash
curl https://YOUR-API-URL/img/1
```

### Character routes

| Method | Route                | Description                                      |
| ------ | -------------------- | ------------------------------------------------ |
| GET    | `/characters/:imgId` | Returns all characters associated with an image. |

Example:

```bash
curl https://YOUR-API-URL/characters/1
```

### Game routes

These routes rely on a cookie named `gameId`, which is set when a game is started.

| Method | Route                | Description                                                                                       |
| ------ | -------------------- | ------------------------------------------------------------------------------------------------- |
| POST   | `/game/start/:imgId` | Starts a new game session for the given image ID and sets the `gameId` cookie.                    |
| POST   | `/game/guess`        | Validates a guessed character click. Requires `chId`, `cordsx`, and `cordsy` in the request body. |
| POST   | `/game/complete`     | Completes the session and saves the score. Requires `playerName` in the request body.             |

Example: start a game

```bash
curl -X POST https://YOUR-API-URL/game/start/1
```

Example: submit a guess

```bash
curl -X POST https://YOUR-API-URL/game/guess \
  -H "Content-Type: application/json" \
  -b "gameId=<cookie-value>" \
  -d '{
    "chId": 2,
    "cordsx": 0.12,
    "cordsy": 0.18
  }'
```

Example: complete a game and save the score

```bash
curl -X POST https://YOUR-API-URL/game/complete \
  -H "Content-Type: application/json" \
  -b "gameId=<cookie-value>" \
  -d '{
    "playerName": "Ada"
  }'
```

### Leaderboard routes

| Method | Route                                | Description                                                                                                       |
| ------ | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| GET    | `/leaderboard/image/:imgId?limit=10` | Returns the top scores for a specific image. The optional `limit` query parameter controls the number of results. |
| GET    | `/leaderboard/rank/:gmId?imgId=1`    | Returns the rank for a submitted score, given the game ID and image ID.                                           |

Example:

```bash
curl "https://YOUR-API-URL/leaderboard/image/1?limit=10"
```

## Expected response shapes

### Successful image lookup

```json
{
  "success": true,
  "data": {
    "id": 1,
    "path": "some-image.png"
  }
}
```

### Successful character lookup

```json
{
  "success": "true",
  "data": [
    {
      "id": 1,
      "name": "Waldo",
      "cordsx": 0.12,
      "cordsy": 0.18,
      "imgId": 1
    }
  ]
}
```

### Guess response

```json
{
  "success": true,
  "found": true,
  "message": "found the character"
}
```

### Score submission response

```json
{
  "success": true,
  "message": "Score saved successfully",
  "data": {
    "gameId": "some-game-id",
    "playerName": "Ada",
    "timeScore": 42000
  }
}
```

## Notes

- The game session is tracked using an HTTP-only cookie named `gameId`.
- The API does not currently implement authentication or user accounts.
- The game logic expects three characters to be found before the session can be completed.
