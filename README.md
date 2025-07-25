# HTML Document Manager

A modern React web application for creating, storing, and searching HTML documents.

## Features

- ✨ **Create HTML Documents**: Easy-to-use form for creating HTML documents with titles and content
- 🔍 **Smart Search**: Search through documents by title or content
- 📱 **Responsive Design**: Beautiful, modern UI that works on all devices
- 💾 **Local Storage**: Documents are automatically saved to your browser's local storage
- 👀 **Live Preview**: View HTML documents with both rendered preview and raw HTML
- 🗑️ **Document Management**: Delete documents you no longer need

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Usage

### Creating Documents
1. Fill in the "Document Title" field
2. Enter your HTML content in the "HTML Content" textarea
3. Click "Create Document" to save

### Searching Documents
- Use the search box to find documents by title or content
- Search is case-insensitive and searches both title and content

### Viewing Documents
- Click on any document in the list to open it in a modal
- The modal shows both the rendered HTML preview and the raw HTML code
- You can delete documents from the modal view

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Technologies Used

- **React 18** - Frontend framework
- **CSS3** - Modern styling with gradients and animations
- **Local Storage** - Client-side data persistence
- **Create React App** - Development environment and build tools

## Browser Support

This application works in all modern browsers that support ES6+ features and localStorage.

## License

This project is open source and available under the MIT License.