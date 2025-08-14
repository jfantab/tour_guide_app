import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const HomeScreen = ({ navigation }: any) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to SJSU</Text>
        <Text style={styles.subtitle}>Discover San José State University</Text>
      </View>

      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>Featured Tours</Text>
        
        <TouchableOpacity style={styles.tourCard}>
          <View style={styles.tourImagePlaceholder} />
          <View style={styles.tourInfo}>
            <Text style={styles.tourTitle}>Spartan Campus Highlights</Text>
            <Text style={styles.tourDuration}>50 min • 10 stops</Text>
            <Text style={styles.tourDescription}>Explore SJSU's most iconic locations including Tower Hall and the MLK Library</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tourCard}>
          <View style={styles.tourImagePlaceholder} />
          <View style={styles.tourInfo}>
            <Text style={styles.tourTitle}>Silicon Valley Innovation</Text>
            <Text style={styles.tourDuration}>35 min • 6 stops</Text>
            <Text style={styles.tourDescription}>Discover SJSU's role in tech innovation and startup culture</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>📍 Find Nearby</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>🗺️ SJSU Map</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>🎯 Custom Tour</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>📚 Spartan Spots</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#2563eb',
    paddingTop: 50,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#e2e8f0',
  },
  featuredSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1e293b',
  },
  tourCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tourImagePlaceholder: {
    height: 120,
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
    marginBottom: 12,
  },
  tourInfo: {
    gap: 4,
  },
  tourTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  tourDuration: {
    fontSize: 14,
    color: '#64748b',
  },
  tourDescription: {
    fontSize: 14,
    color: '#475569',
    marginTop: 4,
  },
  quickActions: {
    padding: 20,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
});

export default HomeScreen;