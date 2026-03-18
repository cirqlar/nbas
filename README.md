This is a simple [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure to have complete the React Native [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of the React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run the app

With Metro running, open a new terminal window/pane from the root of the React Native project, and use one of the following commands to build and run for Android or iOS:

### Android

```sh
npm run android
```

### iOS

For iOS, remember to install CocoaPods dependencies.

First, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, run:

```sh
bundle exec pod install
```

> **Note**: For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

Now you can run the app using:

```sh
npm run ios
```

If everything is set up correctly, you should see the app running in the Android Emulator, iOS Simulator, or your connected device.
