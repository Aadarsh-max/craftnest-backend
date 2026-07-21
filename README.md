CraftNest Backend

Backend server for CraftNest, a full-stack artisan marketplace dedicated to supporting local artists and handmade product creators. This server manages user authentication, product listings, order processing, payment handling, and AI-powered product recommendations.

Overview

CraftNest is built with the mission to empower local artisans by providing them a dedicated platform to showcase and sell their handmade creations. The backend handles all core business logic including seller verification, product management, secure transactions, and intelligent product recommendations.

Key Features

Multi-Role Authentication System

Users can register as Buyer, Seller, or Admin
Secure password handling and session management
Role-based access control for different platform features

Seller Verification & Product Approval

Sellers must be verified by admins before selling
Products require admin approval before becoming visible to buyers
Ensures only genuine local artisans can list products
Protects platform authenticity and quality

Product Management

Sellers can create, update, and manage products
Image uploads via Cloudinary for product photos
Set pricing, manage stock levels
Add product metadata: regions, mood tags, categories
Search and filtering capabilities for buyers

Shopping & Checkout

Wishlist functionality for users
Shopping cart with quantity management
Secure payment processing via Stripe
Order history and tracking for buyers

AI-Powered Recommendations

Personalized product suggestions using Groq LLM
Recommendations based on user mood, preferences, and product categories
Enhances user discovery and engagement with relevant products

Admin Dashboard

Verify seller accounts
Review and approve/reject product listings
Monitor platform activity and user management
Tech Stack

Core

Node.js - JavaScript runtime
Express.js - Web framework for REST API
MongoDB - NoSQL database for flexible data storage
Mongoose - ODM for MongoDB schema and validation

External Services

Stripe API - Payment processing (sandbox mode for demo)
Cloudinary - Image hosting and management
Groq LLM API - AI-powered product recommendations

Development

Node Package Manager (npm)
Environment variables for configuration
Architecture Overview

The backend follows a modular structure with clear separation of concerns:

Authentication Layer Handles user registration, login, and role-based access control. Manages session tokens and ensures only authenticated users can access protected routes.

Business Logic Layer Contains core services for sellers (product management), buyers (shopping), admins (verification), and recommendations. Each service handles its domain logic independently.

Data Layer MongoDB with Mongoose provides flexible schema management. Models for users, products, orders, wishlists, and recommendations maintain data consistency.

Integration Layer External APIs (Stripe, Cloudinary, Groq) are integrated through dedicated service modules. Payments are processed securely, images are stored in the cloud, and recommendations are powered by LLM.

Core Functionality

For Sellers

Create and manage product listings with descriptions, images, and pricing
Track inventory and stock levels
Monitor sales and orders from their dashboard
Receive verification and product approval status updates

For Buyers

Browse handmade and locally crafted products
Get AI-powered personalized recommendations
Add products to wishlist for later purchase
Manage shopping cart and complete purchases securely
View order history and status

For Admins

Verify seller authenticity before they can list products
Review and approve product submissions
Manage user accounts and platform activity
Ensure quality standards and authenticity
Payment Processing

Stripe integration handles all transactions in a secure, PCI-compliant manner. The system runs in Stripe sandbox mode for prototype and demo purposes, allowing safe testing without real money transfers. Users experience the complete payment workflow with Stripe test card details.

Image Management

Product images are uploaded to Cloudinary for reliable, scalable cloud storage. This eliminates server storage overhead and ensures images load quickly for buyers worldwide.

Recommendations Engine

The AI recommendation system uses Groq's LLM to analyze user preferences and behavior, suggesting products that align with their mood, interests, and browsing history. This helps buyers discover relevant handmade items and increases engagement.

Current Scope

This is a student project prototype with the following features implemented:

User authentication and role management
Seller verification and product approval workflow
Product listing and management
Shopping cart and wishlist
Stripe payment integration
AI-powered recommendations

Not included in current version:

Real delivery tracking
Logistics integration
Production-grade order fulfillment
Real-time inventory sync across multiple warehouses

Future Enhancements

Potential features for production version:

Order tracking and real-time updates
Logistics provider integration
Payment method diversity (UPI, wallets)
Rating and review system
Seller analytics dashboard
Customer service and dispute resolution
Project Purpose

Built as a Computer Science Engineering student project, CraftNest demonstrates full-stack development skills including backend architecture, database design, API development, payment integration, and AI implementation. The project showcases the ability to build a real-world platform that solves a genuine problem for local artisans.
