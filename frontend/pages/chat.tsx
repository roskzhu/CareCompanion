// pages/chat.tsx
import React from 'react';
import Layout from '../components/Layout';
import ChatComponent from '../components/ChatComponent';

const ChatPage = () => (
  <Layout title="Demo Page | Next.js + TypeScript Example">
    <div>
      <h1>Chat Page</h1>
      <ChatComponent />
    </div>
  </Layout>
);

export default ChatPage;
