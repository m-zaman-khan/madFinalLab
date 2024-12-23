import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

type ProductDetails = {
  id: string;
  title: string;
  price: number;
  description: string;
  media: string[]; // Array of image URLs
  specifications: { key: string; value: string }[]; // Array of specification objects
  seller: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    totalSales: number;
    responseRate: number;
  };
  stock: number;
  ratings: {
    average: number;
    total: number;
  };
};

type ProductDetailsScreenProps = {
  product: ProductDetails | null;
};

const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({ product }) => {
  if (!product) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>Product details are not available.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Product Images */}
      {product.media.length > 0 ? (
        <Image source={{ uri: product.media[0] }} style={styles.productImage} />
      ) : (
        <View style={styles.placeholderImage} />
      )}

      {/* Product Title and Price */}
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>

      {/* Product Description */}
      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>{product.description}</Text>

      {/* Specifications */}
      {product.specifications.length > 0 && (
        <View style={styles.specificationsContainer}>
          <Text style={styles.sectionTitle}>Specifications</Text>
          {product.specifications.map((spec, index) => (
            <Text key={index} style={styles.specificationItem}>
              {spec.key}: {spec.value}
            </Text>
          ))}
        </View>
      )}

      {/* Seller Information */}
      <View style={styles.sellerContainer}>
        <Text style={styles.sectionTitle}>Seller</Text>
        <Text style={styles.sellerName}>{product.seller.name}</Text>
        <Text>Rating: {product.seller.rating}/5</Text>
        <Text>Total Sales: {product.seller.totalSales}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  placeholderImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#f1f1f1',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: '#4CAF50',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  specificationsContainer: {
    marginBottom: 16,
  },
  specificationItem: {
    fontSize: 16,
    marginBottom: 4,
  },
  sellerContainer: {
    marginTop: 16,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default ProductDetailsScreen;
