import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Region, Callout } from 'react-native-maps';

import { MapProps } from '../util/types';

function CampusMap(props: MapProps) {
    const { region, locations, selectedCategory } = props;
    return (
        <View style={styles.mapPlaceholder}>
            <MapView style={styles.map} region={region}>
                {locations
                    .filter(
                        (loc) =>
                            selectedCategory === 'all' ||
                            loc.category === selectedCategory
                    )
                    .map((location) => (
                        <Marker
                            key={location.id}
                            coordinate={location.mapLocation}
                            title={location.name}
                            description={location.name}
                        ></Marker>
                    ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
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
    map: {
        width: '100%',
        height: '100%',
    },
    callout: {
        minHeight: 120,
        width: 250,
    },
    calloutContainer: {
        padding: 10,
    },
});

export default CampusMap;
