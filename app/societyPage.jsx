import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useTheme, Text, IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import EventCard from '../components/EventCard';
import ShopCard from '../components/ShopCard';

const SocietyPage = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('Posts');

  const handleBackButton = () => {
    router.back();
  };

  const posts = [
    { id: '1', image: require('../assets/images/hoodie.jpg'), caption: 'Enjoying the society vibes!' },
    { id: '2', image: require('../assets/images/hoodie.jpg'), caption: 'A great event by the community.' },
    { id: '3', image: require('../assets/images/hoodie.jpg'), caption: 'Moments that matter. ❤️' },
    { id: '4', image: require('../assets/images/hoodie.jpg'), caption: 'Stay connected, stay inspired!' },
  ];

  const items = [
    { id: 1, image: require('../assets/images/hoodie.jpg'), title: 'Unisex Hoodie', price: 199 },
    { id: 2, image: require('../assets/images/hoodie.jpg'), title: 'Tote Bag', price: 50 },
    { id: 3, image: require('../assets/images/hoodie.jpg'), title: 'Water Bottle', price: 75 },
    { id: 4, image: require('../assets/images/hoodie.jpg'), title: 'T-Shirt', price: 100 },
    { id: 5, image: require('../assets/images/hoodie.jpg'), title: 'Cap', price: 120 },
    { id: 6, image: require('../assets/images/hoodie.jpg'), title: 'Sweater', price: 150 },
  ];

  const events = [
    {
      id: '1',
      date: 'Dec 15, 2023',
      title: 'Annual Data Science Conference',
      subtitle: 'Join us for insightful talks',
      location: 'HKU Main Hall',
      imageUrl: 'https://example.com/event1.jpg',
      circleImageUrl: require('../assets/images/hku.png'),
      onJoinPress: () => alert('Joined the event!'),
    },
    {
      id: '2',
      date: 'Jan 10, 2024',
      title: 'Workshop on Machine Learning',
      subtitle: 'Hands-on experience and networking',
      location: 'Room 202',
      imageUrl: 'https://example.com/event2.jpg',
      circleImageUrl: require('../assets/images/hku.png'),
      onJoinPress: () => alert('Joined the workshop!'),
    },
  ];

  const renderHeader = () => (
    <>
      <IconButton
        icon={() => <Ionicons name="chevron-back" size={24} color="#fff" />}
        size={24}
        onPress={handleBackButton}
        style={styles.backButton}
      />

      <ImageBackground
        source={require('../assets/images/banner.jpg')}
        style={styles.societyInfo}
        resizeMode="cover"
      >
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/hku.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </ImageBackground>

      <View style={styles.detailsContainer}>
        <Text style={[styles.name, { color: theme.colors.onBackground }]}>
          Data Science Society
        </Text>
        <View style={styles.tagsContainer}>
          <Text style={[styles.tag, { backgroundColor: theme.colors.primaryContainer, color: theme.colors.onPrimaryContainer, fontWeight: 'bold' }]}>150 Members</Text>
          <Text style={[styles.tag, { backgroundColor: theme.colors.primaryContainer, color: theme.colors.onPrimaryContainer, fontWeight: 'bold' }]}>LGBTQIA+</Text>
        </View>
        <Text style={[styles.details, { color: theme.colors.onBackground }]}>
          A vibrant community for members to connect and grow.
        </Text>
      </View>
    </>
  );

  const renderPosts = () => (
    <View style={styles.postsContainer}>
      <View style={styles.postsRow}>
        {posts.map(item => (
          <TouchableOpacity key={item.id} style={styles.postContainer} activeOpacity={0.8}>
            <Image source={item.image} style={styles.postImage} />
            <Text style={[styles.caption, { color: theme.colors.onSurface }]} numberOfLines={2}>
              {item.caption}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderShop = () => (
    <View style={styles.shopContainer}>
      <View style={styles.shopRow}>
        {items.map(item => (
          <ShopCard 
            key={item.id} 
            image={item.image} 
            title={item.title} 
            price={item.price} 
            onPress={() => {}}
          />
        ))}
      </View>
    </View>
  );

  const renderEvents = () => (
    <View style={styles.eventsContainer}>
      {events.map(event => (
        <View key={event.id}>
          <EventCard
            date={event.date}
            title={event.title}
            location={event.location}
            imageUrl={'https://example.com/event.jpg'}
            minimal
          />
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      {renderHeader()}

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Posts' && { ...styles.activeTab, borderColor: theme.colors.primary }]}
          onPress={() => setActiveTab('Posts')}
        >
          <Text style={[styles.tabText, { color: activeTab === 'Posts' ? theme.colors.primary : theme.colors.onSurface }]}>Posts</Text>
        </TouchableOpacity>
       
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Events' && { ...styles.activeTab, borderColor: theme.colors.primary }]}
          onPress={() => setActiveTab('Events')}
        >
          <Text style={[styles.tabText, { color: activeTab === 'Events' ? theme.colors.primary : theme.colors.onSurface }]}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Shop' && { ...styles.activeTab, borderColor: theme.colors.primary }]}
          onPress={() => setActiveTab('Shop')}
        >
          <Text style={[styles.tabText, { color: activeTab === 'Shop' ? theme.colors.primary : theme.colors.onSurface }]}>Shop</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'Posts' && renderPosts()}
      {activeTab === 'Shop' && renderShop()}
      {activeTab === 'Events' && renderEvents()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  societyInfo: {
    height: 160,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    zIndex: 1,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 12.5,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 90,
    height: 90,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderColor: 'lightgrey',
    borderWidth: 1,
    elevation: 5,
    bottom: -20,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    zIndex: 1,
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  detailsContainer: {
    alignItems: 'center',
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  details: {
    fontSize: 12,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 0,
  },
  tag: {
    borderRadius: 7,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 2,
    fontSize: 10,
  },
  section: {
    padding: 16,
    marginTop: 20,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 2,
    width: '75%',
    alignSelf: 'center',
  },
  tabButton: {
    padding: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  postsContainer: {
    padding: 8,
  },
  postsRow: {
    flexDirection: 'column',
  },
  postContainer: {
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: 16,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  caption: {
    marginTop: 0,
    marginBottom: 0,
    paddingBottom: 10,
    marginLeft: 8,
    fontSize: 14,
    textAlign: 'left',
    padding: 8,
  },
  shopContainer: {
    padding: 0,
  },
  shopRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  shopCard: {
    width: '48%',
    marginBottom: 16,
    padding: 5,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  eventsContainer: {
    padding: 10,
  },
});

export default SocietyPage;