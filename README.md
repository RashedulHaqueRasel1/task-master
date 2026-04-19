# Task Master

A powerful task management application built with Expo and React Native. Organize your tasks, set priorities, and boost your productivity with an intuitive interface.

## Features

- **Task Creation**: Easily create and manage tasks with titles, descriptions, and due dates.
- **Task Lists**: Organize tasks into customizable lists and categories.
- **Priority Levels**: Set high, medium, or low priority for your tasks.
- **Reminders**: Get notifications for upcoming deadlines.
- **Cross-Platform**: Works seamlessly on Android, iOS, and web.
- **Dark Mode**: Switch between light and dark themes based on your preference.


## Installation

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Expo CLI

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/RashedulHaqueRasel1/task-master.git
   cd task-master
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npx expo start
   ```

4. **Run on device/emulator:**
   - For Android: Press `a` in the terminal or scan QR code with Expo Go.
   - For iOS: Press `i` in the terminal or scan QR code with Expo Go.
   - For web: Press `w` in the terminal.

## Building for Production

### Android APK

To build an APK for Android:

1. Install EAS CLI:
   ```bash
   npm install -g @expo/eas-cli
   ```

2. Login to Expo:
   ```bash
   eas login
   ```

3. Build the APK:
   ```bash
   eas build --platform android --profile preview
   ```

### Download Pre-built APK

<a href="./assets/taskmaster.apk" download>
  <button style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">Download APK</button>
</a>

## Usage

1. Open the app on your device.
2. Create a new task by tapping the "+" button.
3. Fill in the task details and save.
4. View your tasks in the main screen.
5. Mark tasks as complete by checking them off.

## Project Structure

```
task-master/
├── app/                    # Main application code (file-based routing)
├── assets/                 # Static assets (images, APK, etc.)
├── components/             # Reusable UI components
├── constants/              # App constants and themes
├── hooks/                  # Custom React hooks
├── android/                # Android-specific configuration
├── ios/                    # iOS-specific configuration (if applicable)
├── package.json            # Dependencies and scripts
├── app.json                # Expo configuration
└── README.md               # This file
```

## Technologies Used

- **React Native**: Framework for building native apps
- **Expo**: Platform for universal React applications
- **TypeScript**: Typed JavaScript for better development experience
- **React Navigation**: Navigation library for React Native

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or issues, please open an issue on GitHub or contact the maintainers.

## Acknowledgments

- Built with [Expo](https://expo.dev)
- Icons from [Expo Vector Icons](https://docs.expo.dev/guides/icons/)
- UI components inspired by modern design principles
