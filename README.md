# User Authentication App

This is a React Native application for user registration and authentication. It allows users to register with a unique username and stores user data asynchronously using AsyncStorage. Upon successful registration or login, users are redirected to the Home page.

## Features

- User Registration: Users can register with a unique username. If a user attempts to register with an existing username, an error message will be displayed indicating that the username already exists.
- User Login: Users can log in with their registered username. If a user attempts to log in with a non-existing username, an error message will be displayed indicating that the user does not exist.
- AsyncStorage: User data is stored asynchronously using AsyncStorage, providing persistent storage across app sessions.
- Navigation: The app utilizes React Navigation for navigation between screens.

## Dependencies

- `@react-native-async-storage/async-storage`: ^1.22.0
- `@react-navigation/native`: ^6.1.10
- `@react-navigation/native-stack`: ^6.9.18
- `react`: 18.2.0
- `react-hook-form`: ^7.50.1
- `react-native`: 0.73.4
- `react-native-safe-area-context`: ^4.9.0
- `react-native-screens`: ^3.29.0
- `react-native-toast-message`: ^2.2.0

## Scripts

- `android`: Run the app on an Android device or emulator.
- `ios`: Run the app on an iOS device or simulator.
- `lint`: Run ESLint for linting the codebase.
- `start`: Start the Metro bundler.
- `test`: Run Jest for testing.

## Usage

1. Clone the repository.
2. Install dependencies using `yarn install`.
3. Start the Metro bundler using `yarn start`.
4. Run the app on a device or emulator using `yarn android` or `yarn ios`.
5. Register or log in with a unique username.
6. Explore the app's features.

With these instructions, users will be able to start the Metro bundler before running the app, ensuring a smooth development experience. If you have any further questions or need additional assistance, feel free to ask!

## Contributing

Contributions are welcome! Feel free to submit bug reports, feature requests, or pull requests.
