import  { useState } from 'react';
import ChatBody from '../src/components/ChatBody';
import ChatInput from '../src/components/ChatInput';
import { useMutation } from 'react-query';
import { fetchResponse } from './api';

function App() {
  const [chat, setChat] = useState([]);

  const mutation = useMutation(async () => {
    try {
      const response = await fetchResponse(chat);
      const data = await response.json();
      setChat((prev) => [
        ...prev,
        { sender: 'ai', message: data.message.replace(/^\n\n/, '') },
      ]);
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  });

  const sendMessage = (message) => {
    setChat((prev) => [...prev, message]);
    mutation.mutate();
  };

  return (
    <div className='bg-[#1A232E] h-screen py-6 relative sm:px-16 px-12 text-white overflow-hidden flex flex-col justify-between align-middle'>
      <div className='gradient-01 z-0 absolute'></div>
      <div className='gradient-02 z-0 absolute'></div>

      <div className='uppercase font-bold text-2xl text-center mb-3'>
        ChatGpt2.0
      </div>

      <div className='h-[90%] overflow-auto w-full max-w-4xl min-w-[20rem] py-8 px-4 self-center scrollbar-thumb-slate-400 scrollbar-thin scrollbar-track-gray-transparent scrollbar-thumb-border-md'>
        <ChatBody chat={chat} />
      </div>

      <div className='w-full max-w-[20rem] self-center'>
        <ChatInput sendMessage={sendMessage} loading={mutation.isLoading} />
      </div>
    </div>
  );
}

export default App;
