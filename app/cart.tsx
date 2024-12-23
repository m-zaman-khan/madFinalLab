import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';

const Cart = () => {
  const cartItems = [
    { id: '1', name: 'Product 1', price: 100 },
    { id: '2', name: 'Product 2', price: 200 },
  ];

  const handleCheckout = () => {
    // Implement payment gateway integration
    alert('Proceeding to checkout...');
  };

  return (
    <View>
      <Text>Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name} - ${item.price}</Text>
          </View>
        )}
      />
      <Button title="Checkout" onPress={handleCheckout} />
    </View>
  );
};

export default Cart;
