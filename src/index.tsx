import React from 'react';
import { createRoot } from 'react-dom/client';
import ChatUI from './components/ChatUI';

// App component that displays the Chat UI
function App() {
  return (
    <div className="App">
      <ChatUI />
    </div>
  );
}

// Mount the app to the DOM
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.error('Root element not found');
}

export default App;
