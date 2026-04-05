# BuddyScript Frontend

Frontend application for BuddyScript, a social feed platform built from the provided login, registration, and feed designs. This repository focuses on the user-facing experience: authentication, protected feed access, post creation, reactions, threaded discussion, and responsive UI behavior.

## Submission Links

- Frontend repository for code review: [BuddyScript Frontend](https://github.com/MDRUHULAMIN7/BuddyScript-Frontend-)
- Backend repository for code review: [BuddyScript Backend](https://github.com/MDRUHULAMIN7/BuddyScript)
- Live application: [https://buddy-script-frontend-beryl.vercel.app](https://buddy-script-frontend-beryl.vercel.app)
- Live API used by this frontend: [https://buddy-script-umber.vercel.app/api/v1](https://buddy-script-umber.vercel.app/api/v1)
- Video walkthrough: add your unlisted/private YouTube link here before submission

## What I Built

- A Next.js App Router frontend that recreates the provided authentication and feed experience.
- Login and registration flows connected to a cookie-based authentication backend.
- A protected feed screen with public/private posts, image uploads, likes, comments, replies, and likers modals.
- Infinite scrolling for the main feed and paginated discussion threads to keep the experience responsive as content grows.
- Theme persistence and reusable UI structure so the interface remains consistent across sessions and routes.

## Key Engineering Decisions

- I used `Next.js` with the App Router to separate public auth pages from protected application routes in a clean, scalable way.
- I used `@tanstack/react-query` for fetching, caching, pagination, and mutation revalidation so the feed stays synchronized after create/like/comment actions.
- I used `react-hook-form` with `zod` to keep client-side validation explicit and maintainable.
- I centralized API access with a shared Axios client configured with `withCredentials: true` so cookie-based auth works consistently in both browser and server contexts.
- I kept the code organized by domain (`auth`, `posts`, `comments`, `reactions`) to make feature ownership and future extension easier.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- TanStack Query
- React Hook Form
- Zod
- Axios

## Main User Flows

- `/login`: sign in with an existing account
- `/register`: create a new account
- `/feed`: authenticated social feed with post creation and engagement features

## Local Development

```bash
npm install
npm run dev
```

The app starts locally at `http://localhost:3000`.

## Environment Variables

Create `frontend/.env` and provide the following values:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | Public API base URL used by client-side requests |
| `API_BASE_URL` | API base URL used in server-side/frontend runtime contexts |

Example local configuration:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
API_BASE_URL=http://localhost:5000/api/v1
```

Example production configuration:

```env
NEXT_PUBLIC_API_BASE_URL=https://buddy-script-umber.vercel.app/api/v1
API_BASE_URL=https://buddy-script-umber.vercel.app/api/v1
```

## Available Scripts

- `npm run dev`: start the local development server
- `npm run build`: create a production build
- `npm run start`: run the production build locally
- `npm run lint`: run ESLint
- `npm run typecheck`: run the TypeScript type checker

## Reviewer Notes

- This frontend is designed to work with the backend in the companion repository linked above.
- The deployed frontend expects the deployed backend API to be available and to allow credentialed requests.
- Real secrets should never be committed to the repository. Only public or environment-specific endpoint values should be documented here.
