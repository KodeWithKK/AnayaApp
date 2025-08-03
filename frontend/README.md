# Anaya - Ecommerce App (Frontend)

Anaya is a modern, feature-rich ecommerce mobile application built with React Native and Expo. It provides a seamless shopping experience for users, from browsing products to checkout.

## ✨ Features

- **Authentication:** Secure user sign-up and sign-in using Clerk.
- **Product Discovery:**
  - Browse products by categories (Men, Women, Topwear, etc.).
  - View curated sections like "New Arrivals" and "Topwear".
  - Powerful search functionality.
- **Product Details:** View detailed information about each product, including images, description, specifications, and pricing.
- **Wishlist:** Save favorite items to a personal wishlist.
- **Shopping Cart:** Add products to a cart, manage quantities, and proceed to checkout.
- **User Profile:** View order history, manage wishlist, and edit profile information.

## 🚀 Tech Stack

- **Framework:** [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- **Routing:** [Expo Router](https://expo.github.io/router/)
- **Styling:** [NativeWind](https://www.nativewind.dev/) & [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** [React Query](https://tanstack.com/query/latest) for server state and [Zustand](https://github.com/pmndrs/zustand) for global state.
- **Authentication:** [Clerk](https://clerk.com/)
- **API Client:** [Axios](https://axios-http.com/)
- **Linting & Formatting:** ESLint & Prettier
- **UI Components:** Built using `@rn-primitives` and `lucide-react-native` for icons.

## 🏁 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- A mobile simulator (iOS or Android) or a physical device with the Expo Go app.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/AnayaApp.git
    cd AnayaApp/frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the `frontend` directory by copying the example file:
    ```bash
    cp .env.example .env
    ```
    Update the `.env` file with your own credentials:
    - `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key.
    - `EXPO_PUBLIC_BACKEND_BASE_URL`: The base URL of your backend server.
    - `SENTRY_ORG`: Your Sentry organization ID.
    - `SENTRY_PROJECT`: Your Sentry project ID.
    - `SENTRY_AUTH_TOKEN`: Your Sentry auth token for error tracking.

### Running the App

To start the development server, run:

```bash
npm start
```

This will open the Expo Dev Tools in your browser. You can then:

- **Scan the QR code** with the Expo Go app on your physical device.
- **Press `i`** to run on an iOS simulator.
- **Press `a`** to run on an Android emulator.

## 📜 Available Scripts

In the `frontend` directory, you can run the following scripts:

- `npm start`: Starts the Expo development server.
- `npm run android`: Builds and runs the app on an Android emulator/device.
- `npm run ios`: Builds and runs the app on an iOS simulator/device.
- `npm run web`: Runs the app in a web browser.
- `npm run lint`: Lints the codebase using Expo's ESLint config.
- `npm run format`: Formats the code using Prettier.
- `npm test`: Runs tests using Jest.

## 🏗️ Building for Production with EAS

[Expo Application Services (EAS)](https://docs.expo.dev/build/introduction/) is the easiest way to build and distribute your app.

### 1. Install the EAS CLI

If you haven't already, install the EAS CLI globally:

```bash
npm install -g eas-cli
```

### 2. Log in to your Expo account

```bash
eas login
```

### 3. Configure the Build

The `eas.json` file is already configured for development, preview, and production builds. You can customize it further based on your needs.

### 4. Start the Build

To build for Android:

```bash
eas build -p android --profile preview
```

To build for iOS:

```bash
eas build -p ios --profile preview
```

- Replace `preview` with `production` for a production build.
- The `--profile` flag corresponds to the build profiles defined in `eas.json`.

### 5. Submit to App Stores

Once the build is complete, you can download the app artifact (`.apk` or `.ipa`) from the build details page on the Expo website and submit it to the respective app stores.

For more details, refer to the [official EAS Build documentation](https://docs.expo.dev/build/introduction/).

## 📂 Project Structure

```
.
├── app/                # Expo Router file-based routing
│   ├── (authenticated)/  # Routes protected by authentication
│   ├── (tabs)/         # Tab navigation layout
│   └── ...
├── assets/             # Fonts, icons, and images
├── components/         # Reusable UI components
│   ├── core/           # Core components (Button, Text, etc.)
│   ├── features/       # Feature-specific components (ProductCard, etc.)
│   └── ui/             # Styled primitive components
├── context/            # React Context providers
├── hooks/              # Custom React hooks
├── lib/                # Libraries, helpers, and utility functions
└── types/              # TypeScript type definitions
```

## 🔒 Environment Variables

The following environment variables are used in this project. See `.env.example` for a template.

- `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your publishable key from the Clerk dashboard.
- `EXPO_PUBLIC_BACKEND_BASE_URL`: The full base URL for your backend API.
- `SENTRY_ORG`: Your Sentry organization ID.
- `SENTRY_PROJECT`: Your Sentry project ID.
- `SENTRY_AUTH_TOKEN`: Your auth token for Sentry to upload source maps.
