import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';

const OrderTracking = () => {
  const [orders, setOrders] = useState([
    { id: '1', status: 'Shipped', location: 'Warehouse' },
    { id: '2', status: 'In Transit', location: 'Near City Center' },
  ]);

  return (
    <View>
      <Text>Order Tracking</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>Order ID: {item.id}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Location: {item.location}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default OrderTracking;
