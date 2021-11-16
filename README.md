# Covid Tracker Mobile App

The following help 

## System Requirements

1. MacOS Catalina 10.15 with XCode 12.4 or above.

## Prerequisites

1. NODE: This project was built with Node v15.14. You are free to install v15 separately, though recommended way is using NVM.
For a simple tutorial visit https://tecadmin.net/install-nvm-macos-with-homebrew/ for details.

2. RUBY and Cocoapods: The project uses version ruby 2.7.2p137 which you may install separately, though recommended way is again using RVM.
For a simple tutorial visit https://nrogap.medium.com/install-rvm-in-macos-step-by-step-d3b3c236953b

You need to install latest cocapods. This project uses version 1.11.2
```shell script
sudo gem install cocoapods
```


## Getting started
Make sure you have yarn installed, recommended way is to install it as global package withing the version of Node used
```shell script
npm -g install yarn
```

Install Javascript dependencies for the project
```shell script
yarn install
```

### Start the Metro bundler
To ease debugging, launch the Metro packager (equivalent to Webpack Dev Server) in another window so you
have a better view of bundling error messages: before launching `yarn android/ios`, type in another tab:
```
yarn start
```

### iOS
You will need an up-to-date Mac with XCode. Get it
[from the App Store](https://apps.apple.com/fr/app/xcode/id497799835?mt=12) if you don't have it yet (it's free).

Then install the native dependencies with it:
```
cd ios && pod install && cd ..
```

You're now ready to launch the app in the iOS simulator!
```
yarn ios
```

### Android
Install [Android Studio](https://developer.android.com/studio)

STEP1: Install the build tools and the device emulator
1. Launch Android Studio and skip the setup if needed
2. At the bottom right of the project selection window, click on "Configure" and select "SDK Manager"
3. Tick "Show Package details" at the bottom right of the window
4. In "Android 10.0 (Q)", tick "Android SDK Platform 29" and "Google Play Intel x86 Atom_64 System Image"
5. In SDK tools, tick "Android SDK Build-Tools", "Android Emulator", "Android SDK Platform-Tools",
   "Android SDK Tools" and (recommended albeit not obligatory) "Intel x86 Emulator Accelerator (HAXM installer)".
6. Click OK, accept all licences and perform the install. 

STEP2: If you don't have one yet, create a virtual Android device using the AVD manager in Android Studio:
1. Launch Android Studio and skip the setup if needed
2. At the bottom right of the project selection window, click on "Configure" and select "AVD Manager"
3. Create a new device and follow the assistant. You should use a PlayStore-compatible image, for example
   * Device: Pixel 4
   * Image: Android 10.0 x86_64 (Google Play)
   * Disable device external frame unless you want to lose some height of your screen


STEP 3: Configure the `ANDROID_HOME` environment variable
The React Native tools require some environment variables to be set up in order to build apps with native code.

Add the following lines to your `~/.bash_profile` or `~/.bashrc` (if you are using zsh then `~/.zprofile` or `~/.zshrc`) config file:

```
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Restart your shell to get the variables set.

You are now ready to start the app in the Android Simulator!
```
yarn android
```
If it fails to install the app, try launching your device in the emulator.
