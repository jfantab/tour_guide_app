import { Region } from 'react-native-maps';

export interface Location {
    id: number;
    name: string;
    category: string;
    distance: string;
    mapLocation: MapLocation;
}

export interface MapLocation {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

export interface MapProps {
    region: Region;
    locations: Location[];
    selectedCategory: string;
}
