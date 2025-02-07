import { clerkMiddleware } from "@clerk/nextjs/server"
 
// Define the middleware configuration
export default clerkMiddleware({
  // Public routes that don't require authentication
  publicRoutes: [
    "/",
    "/api/clerk-webhook",
    "/api/drive-activity/notification",
    "/api/payment/success",

    // Add static files that should be public
    "/favicon.ico",
    "/_next/static/(.*)",
    "/api/trpc/(.*)"
  ],
  
  // Routes to be ignored by the authentication middleware
  ignoredRoutes: [
    "/api/auth/callback/discord",
    "/api/auth/callback/notion",
    "/api/auth/callback/slack",
    "/api/flow",
    "/api/cron/wait"
  ],

  // Optional: Debug mode for development environment
  debug: process.env.NODE_ENV === "development",
});

// Configure Middleware Matcher
export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)", 
    "/",
    "/(api|trpc)(.*)"
  ]
};


// https://www.googleapis.com/auth/userinfo.email
// https://www.googleapis.com/auth/userinfo.profile
// https://www.googleapis.com/auth/drive.activity.readonly
// https://www.googleapis.com/auth/drive.metadata
// https://www.googleapis.com/auth/drive.readonly