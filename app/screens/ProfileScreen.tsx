import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';

const ProfileScreen = ({ navigation }: any) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [audioAutoplay, setAudioAutoplay] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const userStats = {
    toursCompleted: 12,
    totalDistance: '8.4 miles',
    badges: 5,
    favoriteLocations: 7,
  };

  const recentTours = [
    { id: 1, name: 'Spartan Campus Highlights', date: '2 days ago', rating: 5 },
    { id: 2, name: 'Silicon Valley Innovation', date: '1 week ago', rating: 4 },
    { id: 3, name: 'Engineering & Tech Tour', date: '2 weeks ago', rating: 5 },
  ];

  const achievements = [
    { id: 1, name: 'Spartan Explorer', description: 'Completed 10 SJSU tours', earned: true },
    { id: 2, name: 'Campus Navigator', description: 'Used GPS navigation 50 times', earned: true },
    { id: 3, name: 'History Buff', description: 'Visited Tower Hall and historic sites', earned: false },
    { id: 4, name: 'Tech Pioneer', description: 'Completed Silicon Valley heritage tours', earned: false },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImagePlaceholder} />
        <Text style={styles.userName}>Spartan Explorer</Text>
        <Text style={styles.userEmail}>student@sjsu.edu</Text>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Your Stats</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{userStats.toursCompleted}</Text>
            <Text style={styles.statLabel}>Tours Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{userStats.totalDistance}</Text>
            <Text style={styles.statLabel}>Distance Walked</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{userStats.badges}</Text>
            <Text style={styles.statLabel}>Badges Earned</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{userStats.favoriteLocations}</Text>
            <Text style={styles.statLabel}>Favorite Spots</Text>
          </View>
        </View>
      </View>

      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Recent Tours</Text>
        {recentTours.map((tour) => (
          <TouchableOpacity key={tour.id} style={styles.tourCard}>
            <View style={styles.tourInfo}>
              <Text style={styles.tourName}>{tour.name}</Text>
              <Text style={styles.tourDate}>{tour.date}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>{'★'.repeat(tour.rating)}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All Tours</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.achievementsSection}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.badgesGrid}>
          {achievements.map((achievement) => (
            <View 
              key={achievement.id} 
              style={[
                styles.badgeCard,
                !achievement.earned && styles.badgeCardLocked
              ]}
            >
              <View style={[
                styles.badgeIcon,
                !achievement.earned && styles.badgeIconLocked
              ]}>
                <Text style={styles.badgeEmoji}>
                  {achievement.earned ? '🏆' : '🔒'}
                </Text>
              </View>
              <Text style={[
                styles.badgeName,
                !achievement.earned && styles.badgeNameLocked
              ]}>
                {achievement.name}
              </Text>
              <Text style={[
                styles.badgeDescription,
                !achievement.earned && styles.badgeDescriptionLocked
              ]}>
                {achievement.description}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Settings</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingName}>Push Notifications</Text>
            <Text style={styles.settingDescription}>Get notified about new tours and updates</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingName}>Audio Autoplay</Text>
            <Text style={styles.settingDescription}>Automatically play audio at each stop</Text>
          </View>
          <Switch
            value={audioAutoplay}
            onValueChange={setAudioAutoplay}
            trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingName}>Dark Mode</Text>
            <Text style={styles.settingDescription}>Use dark theme throughout the app</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
          />
        </View>

        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingButtonText}>Download Settings</Text>
          <Text style={styles.settingButtonSubtext}>Manage offline content</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingButtonText}>Privacy Settings</Text>
          <Text style={styles.settingButtonSubtext}>Control your data and privacy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingButtonText}>Help & Support</Text>
          <Text style={styles.settingButtonSubtext}>Get help or contact support</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footerSection}>
        <TouchableOpacity style={styles.signOutButton}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
        <Text style={styles.versionText}>Version 1.0.0</Text>
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
    alignItems: 'center',
    padding: 30,
    paddingTop: 60,
    backgroundColor: 'white',
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e2e8f0',
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 15,
  },
  editProfileButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editProfileText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  statsSection: {
    padding: 20,
    backgroundColor: 'white',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1f2937',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  recentSection: {
    padding: 20,
    backgroundColor: 'white',
    marginTop: 10,
  },
  tourCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    marginBottom: 8,
  },
  tourInfo: {
    flex: 1,
  },
  tourName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  tourDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  ratingContainer: {
    marginLeft: 10,
  },
  ratingText: {
    fontSize: 16,
    color: '#fbbf24',
  },
  viewAllButton: {
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    marginTop: 5,
  },
  viewAllText: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '600',
  },
  achievementsSection: {
    padding: 20,
    backgroundColor: 'white',
    marginTop: 10,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  badgeCardLocked: {
    opacity: 0.5,
  },
  badgeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeIconLocked: {
    backgroundColor: '#e5e7eb',
  },
  badgeEmoji: {
    fontSize: 20,
  },
  badgeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
    textAlign: 'center',
  },
  badgeNameLocked: {
    color: '#9ca3af',
  },
  badgeDescription: {
    fontSize: 11,
    color: '#6b7280',
    textAlign: 'center',
  },
  badgeDescriptionLocked: {
    color: '#9ca3af',
  },
  settingsSection: {
    padding: 20,
    backgroundColor: 'white',
    marginTop: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  settingButton: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  settingButtonSubtext: {
    fontSize: 14,
    color: '#6b7280',
  },
  footerSection: {
    padding: 20,
    backgroundColor: 'white',
    marginTop: 10,
    alignItems: 'center',
  },
  signOutButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  signOutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  versionText: {
    fontSize: 12,
    color: '#9ca3af',
  },
});

export default ProfileScreen;