# Prime Cart - E-commerce Website using MERN Stack

## Overview

Prime Cart is a fully functional e-commerce platform built using the MERN (MongoDB, Express, React, Node.js) stack. This project demonstrates how to build a scalable and modern e-commerce web application with features like authentication, payment integration, product management, and more.

## Features

- **Full Stack Web Development with MERN**: 
  - Built with MongoDB, Express, React, and Node.js.
- **User Authentication**:
  - Secure user registration and login with JWT-based authentication.
- **Product Management**:
  - Create, update, and manage products with rich details and images.
- **Shopping Cart**:
  - Users can add products to the cart, manage quantities, and proceed to checkout.
- **Payment Integration**:
  - Seamless payment processing using Stripe.
- **Admin Dashboard**:
  - Manage users, products, orders, and reviews from a centralized admin panel.
- **Responsive Design**:
  - Fully responsive layout for both desktop and mobile devices.
- **State Management with Redux**:
  - Efficient state management across the application using Redux Toolkit.
- **Cloudinary Integration**:
  - Image storage and management using Cloudinary.

## Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- MongoDB (v4.x or higher)
- Stripe Account (for payment processing)
- Cloudinary Account (for image management)

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/ravindramohith/prime_cart.git
    cd prime_cart
    ```

2. **Install server dependencies**:
    ```bash
    cd server
    npm install
    ```

3. **Install client dependencies**:
    ```bash
    cd ../client
    npm install
    ```

4. **Set up environment variables**:
    - Create a `.env` file in the `server/` directory with the following variables:
      ```env
      NODE_ENV=development
      PORT=5000
      MONGO_URI=your_mongo_uri
      JWT_SECRET=your_jwt_secret
      CLOUDINARY_CLOUD_NAME=your_cloudinary_name
      CLOUDINARY_API_KEY=your_cloudinary_api_key
      CLOUDINARY_API_SECRET=your_cloudinary_api_secret
      STRIPE_SECRET_KEY=your_stripe_secret_key
      ```

5. **Run the server**:
    ```bash
    npm run dev
    ```

6. **Run the client**:
    ```bash
    cd ../client
    npm start
    ```

## Project Structure

### Client

- **`public/`**: Contains static assets like images and the main `index.html`.
- **`src/`**: Source code for the React application.
  - **`components/`**: Reusable UI components.
  - **`pages/`**: Different page components for the application.
  - **`redux/`**: Redux store setup and state management.
  - **`styles/`**: CSS files for styling.

### Server

- **`config/`**: Configuration files for database and environment variables.
- **`controllers/`**: Contains the business logic for resources like users, products, and orders.
- **`models/`**: Mongoose models defining the database schema.
- **`routers/`**: API routes for different resources.
- **`middlewares/`**: Middleware functions for authentication, error handling, etc.
- **`seeder/`**: Scripts for populating the database with initial data.
- **`utils/`**: Utility functions for tasks like sending emails and handling errors.

## Key Features

- **Authentication & Authorization**: Secure JWT-based authentication with role-based access control.
- **Product Management**: Admin can add, edit, and delete products, including uploading images to Cloudinary.
- **Order Management**: Users can place orders, and admins can manage them.
- **Payment Integration**: Integrated with Stripe for processing payments.
- **Responsive Design**: Fully responsive design for optimal user experience on any device.

## Deployment

The application is deployed on Cyclic. Due to its limited availability, can't be exposed here :(

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.
