# Anaya Backend

This is the backend for the Anaya e-commerce application, an online storefront for clothing and apparel. It is built with Node.js, Express, and Drizzle ORM, and it provides a RESTful API for managing products, brands, user wishlists, and shopping carts.

## Features

- **Authentication:** User authentication is handled using [Clerk](https://clerk.com/).
- **Database:** The application uses a PostgreSQL database with [Drizzle ORM](https://orm.drizzle.team/) for type-safe database access.
- **API:** A comprehensive RESTful API for managing products, brands, carts, and wishlists.
- **Deployment:** The application is configured for deployment to AWS Lambda using Terraform and GitHub Actions.
- **Data Management:** Includes scripts for loading and clearing product datasets.

## Tech Stack

- **Framework:** [Express.js](https://expressjs.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication:** [Clerk](https://clerk.com/)
- **Deployment:** [AWS Lambda](https://aws.amazon.com/lambda/), [Terraform](https://www.terraform.io/), [GitHub Actions](https://github.com/features/actions)
- **Bundler:** [esbuild](https://esbuild.github.io/)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [npm](https://www.npmjs.com/) (or your preferred package manager)
- [Terraform](https://www.terraform.io/downloads.html) (for deployment)
- [Ngrok](https://ngrok.com/download) (for local webhook testing)

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/AnayaApp.git
    cd AnayaApp/backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the `backend` directory by copying the `.env.example` file:
    ```bash
    cp .env.example .env
    ```
    Update the `.env` file with your credentials.

## Environment Variables

The following environment variables are required to run the application:

| Variable                | Description                                                                                  |
| ----------------------- | -------------------------------------------------------------------------------------------- |
| `PORT`                  | The port on which the Express server will run. Defaults to `8000`.                           |
| `NODE_ENV`              | The application environment (`dev` or `prod`).                                               |
| `DATABASE_URL`          | The connection string for your PostgreSQL database.                                          |
| `CLERK_PUBLISHABLE_KEY` | Your Clerk publishable key.                                                                  |
| `CLERK_SECRET_KEY`      | Your Clerk secret key.                                                                       |
| `SIGNING_SECRET`        | The webhook signing secret from your Clerk dashboard, used for verifying webhook signatures. |

## Available Scripts

The following scripts are available in the `package.json`:

| Script                | Description                                                                |
| --------------------- | -------------------------------------------------------------------------- |
| `npm start`           | Starts the production server from the `build` directory.                   |
| `npm run build`       | Bundles the TypeScript source code into JavaScript using `esbuild`.        |
| `npm run dev`         | Starts the development server with `tsc-watch` for live reloading.         |
| `npm run db:generate` | Generates Drizzle ORM migration files based on schema changes.             |
| `npm run db:migrate`  | Applies pending migrations to the database.                                |
| `npm run db:pull`     | Introspects the database and pulls the schema into your Drizzle files.     |
| `npm run db:push`     | Pushes schema changes directly to the database without migrations.         |
| `npm run db:studio`   | Starts the Drizzle Studio for browsing and managing your database.         |
| `npm run ngrok`       | Exposes the local server running on port 8000 to the internet using Ngrok. |
| `npm run format`      | Formats source code using Prettier for consistent code style.              |

## API Endpoints

The following are the main API routes available:

| Method   | Endpoint                             | Description                                        |
| -------- | ------------------------------------ | -------------------------------------------------- |
| `GET`    | `/`                                  | Health check route.                                |
| `GET`    | `/api/v1/product/all`                | Get a list of all products with pagination.        |
| `GET`    | `/api/v1/product/search`             | Search for products by name.                       |
| `GET`    | `/api/v1/product/:productId`         | Get details of a specific product.                 |
| `POST`   | `/api/v1/brand/add`                  | Add a new brand.                                   |
| `GET`    | `/api/v1/wishlist/all`               | Get all items in the user's wishlist.              |
| `POST`   | `/api/v1/wishlist/toggle/:productId` | Add or remove a product from the wishlist.         |
| `POST`   | `/api/v1/webhooks/clerk`             | Webhook endpoint for syncing user data from Clerk. |
| `GET`    | `/api/v1/cart/all`                   | Get all items in the user's cart.                  |
| `POST`   | `/api/v1/cart/add`                   | Add a product to the cart.                         |
| `PUT`    | `/api/v1/cart/update`                | Update the quantity of a product in the cart.      |
| `DELETE` | `/api/v1/cart/remove`                | Remove a product from the cart.                    |
| `POST`   | `/api/v1/dataset/load`               | Load the product dataset into the database.        |
| `POST`   | `/api/v1/dataset/clear`              | Clear the product dataset from the database.       |

## Database Schema

The database schema is managed using Drizzle ORM. The schema definitions can be found in `src/schemas`. The main tables include:

- `users`: Stores user information synced from Clerk.
- `products`: Contains all product details.
- `brands`: Stores brand information.
- `sizes`: Contains available sizes and pricing for each product.
- `media`: Stores URLs for product images and videos.
- `carts`: Manages items in users' shopping carts.
- `wishlists`: Manages users' wishlisted items.
- `analytics`: Stores product analytics data like gender and category.

## Deployment

This application is set up for deployment to AWS Lambda. The deployment process is automated using Terraform and GitHub Actions.

- **Terraform:** The configuration in the `terraform` directory defines the necessary AWS resources, including the IAM role, Lambda function, and function URL.
- **GitHub Actions:** The workflows in `.github/workflows` automate the deployment process. The `deploy-backend.yml` workflow builds the application, zips the build artifacts, and applies the Terraform configuration to deploy the new version.
