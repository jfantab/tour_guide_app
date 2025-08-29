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

export const categories = [
    { id: 'all', name: 'All', icon: '🏫' },
    { id: 'academic', name: 'Academic', icon: '📚' },
    { id: 'dining', name: 'Dining', icon: '🍽️' },
    { id: 'recreation', name: 'Recreation', icon: '🏃' },
    { id: 'services', name: 'Services', icon: '🏢' },
];

export const locations: Location[] = [
    {
        id: 1,
        name: 'Dr. MLK Jr. Library',
        category: 'academic',
        distance: '0.2 mi',
        mapLocation: {
            latitude: 37.33557460066271,
            longitude: -121.8849517675315,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
        },
    },
    {
        id: 2,
        name: 'Student Union',
        category: 'dining',
        distance: '0.3 mi',
        mapLocation: {
            latitude: 37.33621009672913,
            longitude: -121.88152494896772,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
        },
    },
    {
        id: 3,
        name: 'SRAC (Recreation Center)',
        category: 'recreation',
        distance: '0.5 mi',
        mapLocation: {
            latitude: 37.33461917809973,
            longitude: -121.87933314994784,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
        },
    },
    {
        id: 4,
        name: 'Tower Hall',
        category: 'services',
        distance: '0.4 mi',
        mapLocation: {
            latitude: 37.3353363047151,
            longitude: -121.88349197647308,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
        },
    },
    {
        id: 5,
        name: 'Engineering Building',
        category: 'academic',
        distance: '0.6 mi',
        mapLocation: {
            latitude: 37.33683281573384,
            longitude: -121.88132279515989,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
        },
    },
    {
        id: 6,
        name: 'Spartan Stadium',
        category: 'recreation',
        distance: '0.8 mi',
        mapLocation: {
            latitude: 37.32076003769217,
            longitude: -121.8687239748661,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
        },
    },
    {
        id: 7,
        name: 'Business Building',
        category: 'academic',
        distance: '0.5 mi',
        mapLocation: {
            latitude: 37.33704086529366,
            longitude: -121.87875544320362,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
        },
    },
];
