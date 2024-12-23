import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const DynamicPricing = () => {
  const [price, setPrice] = useState(100);
  const handleAdjustPrice = () => {
    // Adjust price dynamically based on demand
    setPrice(price * 1.1); // Example: Increase by 10%
  };

  return (
    <View>
      <Text>Dynamic Pricing</Text>
      <Text>Current Price: ${price.toFixed(2)}</Text>
      <Button title="Adjust Price" onPress={handleAdjustPrice} />
    </View>
  );
};

export default DynamicPricing;
