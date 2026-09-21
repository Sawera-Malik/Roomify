# Roomify

Roomify is a modern, responsive interior design web application built with React, TypeScript, and Vite. It allows users to visualize and customize rooms, place furniture, and manage their saved designs with real-time persistence powered by Firebase.

## Features
- **Authentication**: Secure email/password and Google Sign-In via Firebase Auth.
- **Room Design Studio**: An interactive canvas to customize room types, styles, wall colors, floors, and lighting.
- **Furniture Placement**: Add, move, rotate, and delete furniture on the canvas.
- **Design Preview**: Generate and view realistic compositions of your customized space.
- **Saved Designs**: Persist designs and their layout configurations securely in Firestore.
- **User Management**: Integrated user syncing to a central Firestore collection.
- **Admin Dashboard**: A secure panel for administrators to view registered users and block/unblock accounts.
- **Responsive UI**: Fully optimized layout for desktop, tablet, and mobile devices.

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite, React Router, Tailwind CSS (Vanilla CSS mostly)
- **Backend/BaaS**: Firebase Authentication, Firestore Database, Firebase Storage

## Architecture
The application architecture is entirely client-driven, communicating securely with Firebase:
**Frontend (React/Vite)** → **Firebase Authentication** → **Firestore/Storage**

## Authentication
Authentication is handled via Firebase Auth. Supported methods include:
- Email/Password Sign-Up & Sign-In
- Google OAuth Sign-In
All authenticated users are synced to a secure `users` collection in Firestore, enabling administrative controls (like blocking).

## Firebase Data Model
The database consists of two primary collections:
1. **`users`**: Stores user profiles (UID, email, display name, last login, and `isBlocked` status).
2. **`designs`**: Stores all user-created designs (room type, style, customized colors, lighting, and an array of furniture items with spatial coordinates).

## Security
Data access is strictly governed by **Firestore Security Rules**:
- Users can only create, read, update, or delete their own `designs`.
- Users can read their own `users` document.
- Only accounts explicitly designated as admins (via trusted app logic and custom rules) can view the global user list or modify `isBlocked` flags.
- Blocked users are intercepted at the routing layer and securely logged out or blocked from protected pages.

## Local Development

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Create your environment variables file:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Firebase config values inside `.env.local`.

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## Environment Variables
The application requires Firebase configuration to connect to your project. Use `.env.example` as a template to create your `.env.local` file:
```env
VITE_ADMIN_EMAIL=admin@roomify.com
VITE_API_KEY=your-firebase-api-key
...
```

## Production Deployment (Vercel)
Roomify is fully prepared to be deployed on Vercel.
1. Push your repository to GitHub.
2. Import the project in the Vercel dashboard.
3. Vercel will automatically detect Vite. 
4. Add the environment variables from your `.env.local` into the Vercel Project Settings > Environment Variables.
5. Deploy!

*Note: Since it's a Single Page Application using React Router, Vercel will automatically rewrite routes to `index.html` via Vite's defaults, but you can also add a `vercel.json` if necessary.*

## Screenshots

*(Add screenshots of the Home page, Design Studio, Explore, and Admin Panel here)*

## Future Improvements
- **AI Image Generation**: Integrate an optional server-side API (e.g., Replicate or OpenAI) to generate photorealistic AI room renders based on the canvas layout.
- **Public Design Sharing**: Allow users to toggle designs as "Public" to populate a global community Explore feed.
- **Drag & Drop Uploads**: Allow users to upload their own room background images into the studio.
