import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';

const MapScreen = ({ navigation }: any) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All', icon: '🏫' },
    { id: 'academic', name: 'Academic', icon: '📚' },
    { id: 'dining', name: 'Dining', icon: '🍽️' },
    { id: 'recreation', name: 'Recreation', icon: '🏃' },
    { id: 'services', name: 'Services', icon: '🏢' },
  ];

  const locations = [
    { id: 1, name: 'Dr. MLK Jr. Library', category: 'academic', distance: '0.2 mi' },
    { id: 2, name: 'Student Union', category: 'dining', distance: '0.3 mi' },
    { id: 3, name: 'SRAC (Recreation Center)', category: 'recreation', distance: '0.5 mi' },
    { id: 4, name: 'Tower Hall', category: 'services', distance: '0.4 mi' },
    { id: 5, name: 'Engineering Building', category: 'academic', distance: '0.6 mi' },
    { id: 6, name: 'Spartan Stadium', category: 'recreation', distance: '0.8 mi' },
    { id: 7, name: 'Business Building', category: 'academic', distance: '0.5 mi' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SJSU Campus Map</Text>
        <TouchableOpacity style={styles.locationButton}>
          <Text style={styles.locationButtonText}>📍 My Location</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search locations..."
          placeholderTextColor="#9ca3af"
        />
      </View>

      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>Interactive SJSU Campus Map</Text>
        <View style={styles.mapPins}>
          <View style={styles.pin} />
          <View style={[styles.pin, { top: 60, left: 80 }]} />
          <View style={[styles.pin, { top: 100, left: 40 }]} />
          <View style={[styles.pin, { top: 80, left: 120 }]} />
          <View style={[styles.pin, { top: 40, left: 100 }]} />
        </View>
      </View>

      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.locationsList}>
        <Text style={styles.locationsTitle}>Nearby Locations</Text>
        <ScrollView>
          {locations
            .filter(loc => selectedCategory === 'all' || loc.category === selectedCategory)
            .map((location) => (
            <TouchableOpacity key={location.id} style={styles.locationCard}>
              <View style={styles.locationInfo}>
                <Text style={styles.locationName}>{location.name}</Text>
                <Text style={styles.locationDistance}>{location.distance} away</Text>
              </View>
              <TouchableOpacity style={styles.directionsButton}>
                <Text style={styles.directionsText}>Directions</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  locationButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  locationButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  searchContainer: {
    padding: 20,
    backgroundColor: 'white',
  },
  searchInput: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#e2e8f0',
    margin: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  mapText: {
    fontSize: 18,
    color: '#64748b',
    fontWeight: '600',
  },
  mapPins: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  pin: {
    position: 'absolute',
    width: 12,
    height: 12,
    backgroundColor: '#ef4444',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'white',
    top: 30,
    left: 60,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  categoryButton: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  categoryButtonActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  categoryIcon: {
    fontSize: 16,
    marginBottom: 2,
  },
  categoryText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  categoryTextActive: {
    color: 'white',
  },
  locationsList: {
    flex: 1,
    padding: 20,
  },
  locationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1e293b',
  },
  locationCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  locationDistance: {
    fontSize: 14,
    color: '#64748b',
  },
  directionsButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  directionsText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default MapScreen;