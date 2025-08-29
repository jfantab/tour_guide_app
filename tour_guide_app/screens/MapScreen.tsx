import React, { useState } from 'react';
import { Region } from 'react-native-maps';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TextInput,
} from 'react-native';
import CampusMap from '../components/CampusMap';

import { categories, locations } from '../util/constants';

interface Location {
    id: number;
    name: string;
    category: string;
    distance: string;
    mapLocation: MapLocation;
}

interface MapLocation {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

const MapScreen = () => {
    const initialRegion: Region = {
        latitude: 37.335528591722806,
        longitude: -121.88109296046942,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [region, setRegion] = useState<Region>(initialRegion);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>SJSU Campus Map</Text>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search locations..."
                    placeholderTextColor="#9ca3af"
                />
            </View>

            <CampusMap
                region={region}
                locations={locations}
                selectedCategory={selectedCategory}
            />

            <View style={styles.categoryContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            style={[
                                styles.categoryButton,
                                selectedCategory === category.id &&
                                    styles.categoryButtonActive,
                            ]}
                            onPress={() => setSelectedCategory(category.id)}
                        >
                            <Text style={styles.categoryIcon}>
                                {category.icon}
                            </Text>
                            <Text
                                style={[
                                    styles.categoryText,
                                    selectedCategory === category.id &&
                                        styles.categoryTextActive,
                                ]}
                            >
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
                        .filter(
                            (loc) =>
                                selectedCategory === 'all' ||
                                loc.category === selectedCategory
                        )
                        .map((location) => (
                            <TouchableOpacity
                                key={location.id}
                                style={styles.locationCard}
                                onPress={() => {
                                    setRegion(location.mapLocation);
                                }}
                            >
                                <View style={styles.locationInfo}>
                                    <Text style={styles.locationName}>
                                        {location.name}
                                    </Text>
                                    <Text style={styles.locationDistance}>
                                        {location.distance} away
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.directionsButton}
                                >
                                    <Text style={styles.directionsText}>
                                        Directions
                                    </Text>
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
        paddingTop: 60,
        backgroundColor: 'white',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1e293b',
    },
    expandButton: {
        backgroundColor: '#2563eb',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
    },
    expandButtonText: {
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
