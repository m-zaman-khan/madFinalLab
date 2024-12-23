import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const navigation = useNavigation();

  const screens = [
    { label: 'Profile Setup', screen: 'profile' },
    { label: 'Search Products', screen: 'productSearch' },
    { label: 'Product Details', screen: 'productDetails' },
    { label: 'Cart and Checkout', screen: 'cart' },
    { label: 'Order Tracking', screen: 'orderTracking' },
    { label: 'Ratings and Reviews', screen: 'RatingsScreen' },
    { label: 'Seller Dashboard', screen: 'sellerDashboard' },
    { label: 'Manage Listings', screen: 'ListingScreen' },
    { label: 'Order Management', screen: 'OrderManagementScreen' },
    { label: 'Earnings and Payouts', screen: 'EarningsScreen' },
    { label: 'AI Recommendations', screen: 'AIRecommendationsScreen' },
    { label: 'In-App Chat', screen: 'chat' },
    { label: 'AR Features', screen: 'ARview' },
    { label: 'Geo-Location Services', screen: 'geoLocation' },
    { label: 'Escrow System', screen: 'escrow' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to Dashboard</Text>
      <Text style={styles.subtitle}>Access All Features Below</Text>
      {screens.map((screen, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => navigation.navigate(screen.screen as never)}
        >
          <Text style={styles.buttonText}>{screen.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    width: '90%',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: '#3498db',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ecf0f1',
  },
});

export default Dashboard;
