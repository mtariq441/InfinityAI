# Infinity AI - AI Business Co-Pilot Platform

## Overview

Infinity AI is a full-stack web application that provides an AI-powered business assistant platform. The application combines a marketing website with an authenticated chat interface, allowing users to interact with AI models for business planning, marketing assistance, and daily insights. The platform features a modern, conversion-focused design inspired by contemporary SaaS platforms like Linear, Anthropic, and Vercel.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework:** React with TypeScript
- **Bundler:** Vite for fast development and optimized production builds
- **Routing:** Wouter (lightweight client-side routing)
- **State Management:** TanStack Query (React Query) for server state
- **UI Framework:** Radix UI primitives with shadcn/ui components
- **Styling:** Tailwind CSS with custom design system

**Design System:**
The application implements a comprehensive design system based on the "new-york" shadcn/ui style with custom brand colors centered around a vibrant turquoise/cyan primary color (186 90% 55%). The design follows modern tech aesthetics with support for both light and dark themes. Typography uses Inter for headlines/body and JetBrains Mono for code elements.

**Component Architecture:**
- Reusable card components (FeatureCard, PricingCard, TeamCard, TestimonialCard, BlogCard)
- Shared layout components (Navbar, Footer)
- Comprehensive UI component library from shadcn/ui
- Theme toggle functionality with localStorage persistence
- Responsive design with mobile-first approach

**Page Structure:**
- Marketing pages: Home, Features, Pricing, About, Blog, Contact
- Application pages: Login (with registration), Chat (protected)
- Route protection using custom AuthProvider context

### Backend Architecture

**Technology Stack:**
- **Runtime:** Node.js with Express
- **Language:** TypeScript with ESM modules
- **Database ORM:** Drizzle ORM
- **Database:** PostgreSQL (via Neon serverless driver)
- **Authentication:** JWT-based with bcrypt password hashing
- **AI Integration:** OpenAI API for chat functionality

**API Design:**
RESTful API with the following endpoints:
- `/api/auth/register` - User registration
- `/api/auth/login` - User authentication
- `/api/conversations` - Conversation CRUD operations
- `/api/conversations/:id/messages` - Message retrieval
- `/api/chat/stream` - Streaming AI responses
- `/api/settings` - User settings management

**Authentication Flow:**
- JWT tokens stored in localStorage on client
- Bearer token authentication on protected endpoints
- Middleware-based authentication checking (`authenticateToken`)
- Session persistence across page refreshes

**Data Storage:**
The application supports both PostgreSQL (production) and in-memory storage (development/fallback) through an abstraction layer (`IStorage` interface). This allows flexible deployment and testing scenarios.

### Database Schema

**Core Tables:**
1. **users** - User accounts (id, email, password hash, name, timestamps)
2. **conversations** - Chat sessions (id, userId, title, timestamps)
3. **messages** - Individual chat messages (id, conversationId, role, content, timestamp)
4. **user_settings** - User preferences (id, userId, model selection, max tokens)

**Relationships:**
- Users → Conversations (one-to-many, cascade delete)
- Conversations → Messages (one-to-many, cascade delete)
- Users → UserSettings (one-to-one, cascade delete)

**Schema Management:**
Drizzle Kit handles migrations with PostgreSQL dialect. Schema defined in `/shared/schema.ts` with Zod validation schemas generated from Drizzle tables.

### External Dependencies

**AI Services:**
- **OpenAI API** - Powers the chat functionality with configurable models (default: gpt-5, though likely gpt-4 in practice)
- Streaming responses for real-time chat experience
- User-configurable model and token settings

**Database:**
- **Neon Serverless PostgreSQL** - Primary database provider
- Connection via `@neondatabase/serverless` driver
- Environment-based configuration via `DATABASE_URL`

**Authentication:**
- **bcrypt** - Password hashing with configurable salt rounds (default: 10)
- **jsonwebtoken** - JWT token generation and verification
- JWT_SECRET environment variable (required in production)

**UI & Styling:**
- **Google Fonts** - Inter (400-800 weights) and JetBrains Mono (400)
- **Radix UI** - Comprehensive set of accessible component primitives
- **Tailwind CSS** - Utility-first CSS framework with custom configuration
- **class-variance-authority** - Type-safe variant styling
- **React Icons** - Icon library (Simple Icons for social media)

**Development Tools:**
- **Replit-specific plugins** - Runtime error modal, cartographer, dev banner
- **Vite plugins** - React support, development tooling
- **TypeScript** - Strict type checking with path aliases

**Font Loading:**
Fonts are loaded via Google Fonts CDN with preconnect optimization for performance.

**Asset Management:**
The application includes stock images and generated images stored in `/attached_assets` directory, referenced via Vite aliases (`@assets`).