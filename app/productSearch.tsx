import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, query, where, getDocs, orderBy, startAt, endAt } from 'firebase/firestore';
import { db } from '@/backend/firebaseconfig'; // Firebase setup file

// Define a type for your product data
type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);

    const q = query(
      collection(db, 'products'),
      orderBy('name'),
      startAt(searchQuery),
      endAt(searchQuery + '\uf8ff')
    );

    try {
      const querySnapshot = await getDocs(q);
      const results: Product[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Product));

      console.log('Query Results:', results);

      if (results.length === 0) {
        console.log('No products found!');
      }

      setProducts(results);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for products..."
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" style={styles.loadingText} />
      ) : (
        <>
          {products.length === 0 && !loading && (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>
              No products found for "{searchQuery}"
            </Text>
          )}
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.productCard}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productTitle}>{item.name}</Text>
                  <Text style={styles.productDescription} numberOfLines={2}>
                    {item.description}
                  </Text>
                  <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                </View>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    height: 50,
    borderColor: '#007BFF',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  searchButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  loadingText: {
    marginTop: 20,
    alignSelf: 'center',
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  productPrice: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: '600',
  },
});

export default ProductSearch;
