import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import TourDetailScreen from './screens/TourDetailScreen';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  const [currentScreen, setCurrentScreen] = React.useState('Home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return <HomeScreen navigation={{ navigate: setCurrentScreen }} />;
      case 'Map':
        return <MapScreen navigation={{ navigate: setCurrentScreen }} />;
      case 'TourDetail':
        return <TourDetailScreen navigation={{ navigate: setCurrentScreen }} route={{}} />;
      case 'Profile':
        return <ProfileScreen navigation={{ navigate: setCurrentScreen }} />;
      default:
        return <HomeScreen navigation={{ navigate: setCurrentScreen }} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tabItem, currentScreen === 'Home' && styles.tabItemActive]}
          onPress={() => setCurrentScreen('Home')}
        >
          <Text style={[styles.tabText, currentScreen === 'Home' && styles.tabTextActive]}>
            🏠 Home
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabItem, currentScreen === 'Map' && styles.tabItemActive]}
          onPress={() => setCurrentScreen('Map')}
        >
          <Text style={[styles.tabText, currentScreen === 'Map' && styles.tabTextActive]}>
            🗺️ Map
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabItem, currentScreen === 'TourDetail' && styles.tabItemActive]}
          onPress={() => setCurrentScreen('TourDetail')}
        >
          <Text style={[styles.tabText, currentScreen === 'TourDetail' && styles.tabTextActive]}>
            🎯 Tours
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabItem, currentScreen === 'Profile' && styles.tabItemActive]}
          onPress={() => setCurrentScreen('Profile')}
        >
          <Text style={[styles.tabText, currentScreen === 'Profile' && styles.tabTextActive]}>
            👤 Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingBottom: 30,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabItemActive: {
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  tabText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#2563eb',
  },
});

export default App;
