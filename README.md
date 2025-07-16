# BiteSpeed Frontend Task: Chatbot Flow Builder

A modern, interactive chatbot flow builder built with React, TypeScript, React Flow, and Tailwind CSS. This application allows users to create and manage chatbot conversation flows through an intuitive drag-and-drop interface.

## Photos
<img width="1919" height="986" alt="image" src="https://github.com/user-attachments/assets/eaef8e3e-eb65-4e67-ad0b-b06975372429" />
<img width="1919" height="987" alt="image" src="https://github.com/user-attachments/assets/35717679-680c-4b88-a3c1-67d1de0ea1e9" />
<img width="1919" height="988" alt="image" src="https://github.com/user-attachments/assets/d8089405-768b-4e19-b6bf-cbd9b888f33a" />
<img width="1919" height="984" alt="image" src="https://github.com/user-attachments/assets/518382e0-3be6-4568-b4e3-25dc30a64475" />




## 🚀 Features

### Core Functionality
- **Drag & Drop Interface**: Drag message nodes from the sidebar to create your chatbot flow
- **Visual Flow Builder**: Connect nodes with edges to define conversation paths
- **Real-time Editing**: Edit message content in the settings panel
- **Flow Validation**: Prevents saving flows with multiple disconnected starting points
- **Responsive Design**: Optimized for desktop and tablet use

### Enhanced Features
- **Side-by-Side Connections**: Nodes connect horizontally (left to right) for better flow visualization
- **WhatsApp Integration**: WhatsApp logo on each message node for branding
- **Error Notifications**: Red toast notifications for validation errors and success messages
- **Visual Feedback**: Hover effects, animations, and visual indicators
- **Edge Management**: Click on connections to remove them
- **Arrow Indicators**: Clear directional arrows showing conversation flow
- **Modern UI**: Clean, modern interface using Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: React 19 with TypeScript
- **Flow Builder**: React Flow 11
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite
- **Package Manager**: npm

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "BiteSpeed Frontend Task Chatbot flow builder"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎯 Usage

### Creating a Flow
1. **Add Nodes**: Drag the "Message" node from the sidebar to the canvas
2. **Connect Nodes**: Click and drag from the blue handle on the right side of a node to connect it to another node's left handle
3. **Edit Messages**: Click on a node to select it, then edit the message text in the settings panel
4. **Save Flow**: Click "Save Changes" to validate and save your flow

### Navigation
- **Nodes Panel**: Available when no node is selected - contains draggable node types
- **Settings Panel**: Appears when a node is selected - allows editing of node properties
- **Back Button**: Return to the nodes panel from settings

### Validation Rules
- Each source handle (right side) can only have one outgoing connection
- Target handles (left side) can accept multiple incoming connections
- Flows with multiple disconnected starting points cannot be saved

## 🎨 Design Features

### Visual Elements
- **Modern Card Design**: Clean, shadow-based cards with rounded corners
- **Color Scheme**: Blue primary colors with gray accents
- **Typography**: Clean, readable font hierarchy
- **Animations**: Smooth transitions and hover effects

### Interactive Elements
- **Hover Effects**: Nodes and buttons respond to mouse interactions
- **Toast Notifications**: Slide-in notifications for errors and success
- **Visual Feedback**: Connection handles change color when dragging
- **Responsive Layout**: Adapts to different screen sizes

## 🔧 Technical Implementation

### Architecture
- **Component-based**: Modular React components for maintainability
- **TypeScript**: Full type safety throughout the application
- **Custom Hooks**: React Flow state management
- **Event Handling**: Comprehensive drag-and-drop and click handlers

### Key Components
- `ChatbotFlowBuilder`: Main container component
- `TextNode`: Individual message node component
- `NodesPanel`: Draggable node types sidebar
- `SettingsPanel`: Node property editor
- `Toast`: Notification component

### Flow Management
- **Node State**: React Flow's useNodesState hook
- **Edge State**: React Flow's useEdgesState hook
- **Connection Logic**: Custom validation for single-source connections
- **Persistence**: Console logging for save operations (ready for backend integration)

## 🚀 Future Enhancements

### Planned Features
- **Node Types**: Add support for image, button, and conditional nodes
- **Templates**: Pre-built flow templates for common use cases
- **Export/Import**: JSON export/import functionality
- **Backend Integration**: API integration for flow persistence
- **Collaboration**: Real-time collaborative editing
- **Analytics**: Flow performance metrics

### Technical Improvements
- **Testing**: Unit and integration tests
- **Performance**: Virtualization for large flows
- **Accessibility**: ARIA labels and keyboard navigation
- **Mobile**: Touch-optimized mobile interface

## 📁 Project Structure

```
src/
├── components/
│   ├── ChatbotFlowBuilder.tsx    # Main flow builder component
│   ├── TextNode.tsx              # Message node component
│   ├── NodesPanel.tsx            # Draggable nodes sidebar
│   ├── SettingsPanel.tsx         # Node settings editor
│   └── Toast.tsx                 # Notification component
├── types/
│   └── index.ts                  # TypeScript type definitions
├── App.tsx                       # Root application component
├── App.css                       # Custom styles and React Flow overrides
├── index.css                     # Global styles and Tailwind imports
└── main.tsx                      # Application entry point
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- **Live Demo**: [Deploy on Vercel/Netlify]
- **Repository**: [GitHub Repository]
- **Documentation**: [Additional docs if needed]

---

Built with ❤️ for the BiteSpeed Frontend Task
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
