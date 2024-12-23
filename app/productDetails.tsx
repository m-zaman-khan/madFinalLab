import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Share,
  Platform,
  FlatList,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { sampleProduct } from './productdata';

// TypeScript interfaces
interface ProductImage {
  uri: string;
  type: 'image' | 'video';
}

interface Specification {
  label: string;
  value: string;
}

interface SellerInfo {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  totalSales: number;
  responseRate: number;
}

interface ProductDetails {
  id: string;
  title: string;
  price: number;
  discount?: number;
  description: string;
  media: ProductImage[];
  specifications: Specification[];
  seller: SellerInfo;
  stock: number;
  ratings: {
    average: number;
    total: number;
  };
}

const { width: screenWidth } = Dimensions.get('window');

const ProductDetailsScreen: React.FC = () => {
  const [product, setProduct] = useState(sampleProduct);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const videoRef = useRef<Video>(null);

  const renderMediaItem = ({ item, index }: { item: ProductImage; index: number }) => {
    if (item.type === 'video') {
      return (
        <Video
          ref={videoRef}
          source={{ uri: item.uri }}
          style={styles.mediaItem}
          useNativeControls
          resizeMode={ResizeMode.COVER}
          isLooping
          shouldPlay={false}
        />
      );
    }
    return (
      <Image
        source={{ uri: item.uri }}
        style={styles.mediaItem}
        resizeMode="cover"
      />
    );
  };

  const shareProduct = async () => {
    try {
      await Share.share({
        message: `Check out ${product.title} on our marketplace!`,
        url: `https://yourapp.com/product/${product.id}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderRatingStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <AntDesign
        key={index}
        name={index < Math.floor(rating) ? 'star' : 'staro'}
        size={16}
        color={index < Math.floor(rating) ? '#FFD700' : '#666666'}
        style={{ marginRight: 2 }}
      />
    ));
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* Animated Header */}
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {product.title}
        </Text>
      </Animated.View>

      <ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Media Gallery */}
        <View style={styles.carouselContainer}>
          <FlatList
            data={product.media as ProductImage[]}
            renderItem={renderMediaItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const newIndex = Math.round(
                e.nativeEvent.contentOffset.x / screenWidth
              );
              setActiveSlide(newIndex);
            }}
          />
          <View style={styles.paginationContainer}>
            {product.media.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  {
                    backgroundColor:
                      index === activeSlide ? '#007AFF' : 'rgba(0, 122, 255, 0.3)',
                  },
                ]}
              />
            ))}
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              ${product.price.toFixed(2)}
              {product.discount && (
                <Text style={styles.discount}> -${product.discount}</Text>
              )}
            </Text>
            <TouchableOpacity onPress={shareProduct}>
              <MaterialCommunityIcons name="share-variant" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>{product.title}</Text>

          {/* Seller Information */}
          <TouchableOpacity style={styles.sellerContainer}>
            <Image
              source={{ uri: product.seller.avatar }}
              style={styles.sellerAvatar}
            />
            <View style={styles.sellerInfo}>
              <Text style={styles.sellerName}>{product.seller.name}</Text>
              <View style={styles.ratingContainer}>
                {renderRatingStars(product.seller.rating)}
                <Text style={styles.ratingText}>
                  ({product.seller.totalSales} sales)
                </Text>
              </View>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#666666"
            />
          </TouchableOpacity>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text
              style={styles.description}
              numberOfLines={showFullDescription ? undefined : 3}
            >
              {product.description}
            </Text>
            <TouchableOpacity
              onPress={() => setShowFullDescription(!showFullDescription)}
              style={styles.readMoreButton}
            >
              <Text style={styles.readMoreText}>
                {showFullDescription ? 'Show Less' : 'Read More'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Specifications */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Specifications</Text>
            {product.specifications.map((spec, index) => (
              <View key={index} style={styles.specificationRow}>
                <Text style={styles.specLabel}>{spec.label}</Text>
                <Text style={styles.specValue}>{spec.value}</Text>
              </View>
            ))}
          </View>

          {/* Ratings Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ratings & Reviews</Text>
            <View style={styles.ratingSummary}>
              <View style={styles.ratingStars}>
                {renderRatingStars(product.ratings.average)}
              </View>
              <Text style={styles.ratingAverage}>
                {product.ratings.average.toFixed(1)}
              </Text>
              <Text style={styles.ratingCount}>
                ({product.ratings.total} reviews)
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.cartButton}>
          <MaterialCommunityIcons name="cart-plus" size={24} color="white" />
          <Text style={styles.cartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 90 : 60,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    backgroundColor: '#ffffff',
    zIndex: 1000,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  carouselContainer: {
    backgroundColor: '#f5f5f5',
    position: 'relative',
  },
  mediaItem: {
    width: screenWidth,
    height: screenWidth,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  infoContainer: {
    padding: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  discount: {
    color: '#e41e31',
    fontSize: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 15,
  },
  sellerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 15,
  },
  sellerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  sellerInfo: {
    flex: 1,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    color: '#666666',
    fontSize: 14,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666666',
  },
  readMoreButton: {
    marginTop: 10,
  },
  readMoreText: {
    color: '#007AFF',
    fontSize: 16,
  },
  specificationRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  specLabel: {
    flex: 1,
    fontSize: 16,
    color: '#666666',
  },
  specValue: {
    flex: 2,
    fontSize: 16,
    color: '#333333',
  },
  ratingSummary: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStars: {
    flexDirection: 'row',
    marginRight: 10,
  },
  ratingAverage: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 5,
  },
  ratingCount: {
    fontSize: 16,
    color: '#666666',
  },
  bottomBar: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  cartButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  cartButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  buyButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
  },
  buyButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  
});

export default ProductDetailsScreen;