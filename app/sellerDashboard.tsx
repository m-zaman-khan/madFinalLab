import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';

const SellerDashboard = () => {
  const listings = [
    { id: '1', name: 'Item 1', stock: 10 },
    { id: '2', name: 'Item 2', stock: 5 },
  ];

  return (
    <View>
      <Text>Seller Dashboard</Text>
      <FlatList
        data={listings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>Stock: {item.stock}</Text>
          </View>
        )}
      />
      <Button title="Add New Product" onPress={() => alert('Navigate to Add Product')} />
    </View>
  );
};

export default SellerDashboard;
