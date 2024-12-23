import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

const Chat = () => {
  const [messages, setMessages] = useState([{ id: '1', text: 'Hello!', sender: 'Buyer' }]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    setMessages([...messages, { id: `${messages.length + 1}`, text: newMessage, sender: 'You' }]);
    setNewMessage('');
  };

  return (
    <View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{item.sender}: {item.text}</Text>
        )}
      />
      <TextInput placeholder="Type a message" value={newMessage} onChangeText={setNewMessage} />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

export default Chat;
