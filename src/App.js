import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import react,{useEffect, useState} from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';

function App() {

  const [messages, setMessages]= useState([]);

  useEffect(()=>{
    axios.get('http://localhost:8000/messages/sync')
      .then((res)=>{
      console.log(res.data)
      setMessages(res.data)
    })
  },[])

  useEffect(()=>{
    const pusher = new Pusher('58f2140cde8e0415f221', {
      cluster: 'us2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage])
    });

    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    };

    },[messages])
    console.log(messages)


  return (
    <div className="app">
      <div className="appBody">
        {/* sidebar */}
        <Sidebar/>
        {/* chat part */}
        <Chat messages = {messages}/>
      </div>
    </div>
  );
}

export default App;
