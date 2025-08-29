import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Modal,
} from 'react-native';

const TourDetailScreen = () => {
    const [showModal, setShowModal] = useState(false);

    const tourStops = [
        {
            id: 1,
            name: 'Tower Hall',
            description:
                "SJSU's iconic clock tower built in 1910, serving as the university's administrative heart.",
            duration: '8 min',
            audioAvailable: true,
        },
        {
            id: 2,
            name: 'Student Union Building',
            description:
                'Hub of Spartan life with dining, study spaces, and the famous Bowling & Billiards center.',
            duration: '10 min',
            audioAvailable: true,
        },
        {
            id: 3,
            name: 'Dr. Martin Luther King Jr. Library',
            description:
                'Joint city-university library, one of the largest in the country with 1.5+ million books.',
            duration: '12 min',
            audioAvailable: true,
        },
        {
            id: 4,
            name: 'Campus Village',
            description:
                "Modern residential complex and the newest addition to SJSU's housing options.",
            duration: '6 min',
            audioAvailable: true,
        },
        {
            id: 5,
            name: 'Spartan Stadium',
            description:
                'Home of SJSU Spartans football and site of the 1960 Olympics trials.',
            duration: '8 min',
            audioAvailable: true,
        },
    ];

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.heroSection}>
                    <View style={styles.tourImagePlaceholder} />
                    <View style={styles.tourOverlay}>
                        <Text style={styles.tourTitle}>
                            Spartan Campus Highlights
                        </Text>
                        <Text style={styles.tourSubtitle}>
                            50 min • 5 stops • Beginner friendly
                        </Text>
                    </View>
                </View>

                <View style={styles.tourInfo}>
                    <Text style={styles.description}>
                        Discover the most iconic locations on SJSU's beautiful
                        campus. This self-guided tour takes you through historic
                        buildings like Tower Hall, modern facilities like the
                        MLK Library, and popular Spartan gathering spots.
                        Perfect for new Spartans, visitors, and anyone wanting
                        to learn about SJSU's Silicon Valley heritage.
                    </Text>

                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>4.8</Text>
                            <Text style={styles.statLabel}>Rating</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>2.1k</Text>
                            <Text style={styles.statLabel}>Completed</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>50</Text>
                            <Text style={styles.statLabel}>Minutes</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.stopsSection}>
                    <Text style={styles.sectionTitle}>Tour Stops</Text>
                    {tourStops.map((stop, index) => (
                        <TouchableOpacity key={stop.id} style={styles.stopCard}>
                            <View style={styles.stopNumber}>
                                <Text style={styles.stopNumberText}>
                                    {index + 1}
                                </Text>
                            </View>
                            <View style={styles.stopInfo}>
                                <Text style={styles.stopName}>{stop.name}</Text>
                                <Text style={styles.stopDescription}>
                                    {stop.description}
                                </Text>
                                <View style={styles.stopMeta}>
                                    <Text style={styles.stopDuration}>
                                        {stop.duration}
                                    </Text>
                                    {stop.audioAvailable && (
                                        <View style={styles.audioIndicator}>
                                            <Text style={styles.audioText}>
                                                🎵 Audio available
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.actionSection}>
                    <TouchableOpacity
                        style={styles.startButton}
                        onPress={() => setShowModal(true)}
                    >
                        <Text style={styles.startButtonText}>Start Tour</Text>
                    </TouchableOpacity>

                    <View style={styles.secondaryActions}>
                        <TouchableOpacity style={styles.secondaryButton}>
                            <Text style={styles.secondaryButtonText}>
                                📥 Download Offline
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.secondaryButton}>
                            <Text style={styles.secondaryButtonText}>
                                📤 Share Tour
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <Modal
                visible={showModal}
                animationType="slide"
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Ready to Start?</Text>
                        <TouchableOpacity onPress={() => setShowModal(false)}>
                            <Text style={styles.closeButton}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            Your tour will begin at Tower Hall. Make sure you
                            have:
                        </Text>

                        <View style={styles.checklistItem}>
                            <Text style={styles.checkmark}>✓</Text>
                            <Text style={styles.checklistText}>
                                Comfortable walking shoes
                            </Text>
                        </View>
                        <View style={styles.checklistItem}>
                            <Text style={styles.checkmark}>✓</Text>
                            <Text style={styles.checklistText}>
                                Charged phone with headphones
                            </Text>
                        </View>
                        <View style={styles.checklistItem}>
                            <Text style={styles.checkmark}>✓</Text>
                            <Text style={styles.checklistText}>
                                About 50 minutes available
                            </Text>
                        </View>

                        <TouchableOpacity style={styles.confirmButton}>
                            <Text style={styles.confirmButtonText}>
                                Begin Tour Navigation
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    heroSection: {
        position: 'relative',
    },
    tourImagePlaceholder: {
        height: 250,
        backgroundColor: '#e2e8f0',
    },
    tourOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 20,
    },
    tourTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 4,
    },
    tourSubtitle: {
        fontSize: 16,
        color: '#e2e8f0',
    },
    tourInfo: {
        padding: 20,
        backgroundColor: 'white',
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#374151',
        marginBottom: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2563eb',
    },
    statLabel: {
        fontSize: 14,
        color: '#6b7280',
        marginTop: 4,
    },
    stopsSection: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#1f2937',
    },
    stopCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    stopNumber: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#2563eb',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    stopNumberText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    stopInfo: {
        flex: 1,
    },
    stopName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 4,
    },
    stopDescription: {
        fontSize: 14,
        color: '#6b7280',
        lineHeight: 20,
        marginBottom: 8,
    },
    stopMeta: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stopDuration: {
        fontSize: 12,
        color: '#9ca3af',
        marginRight: 12,
    },
    audioIndicator: {
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    audioText: {
        fontSize: 11,
        color: '#6b7280',
    },
    actionSection: {
        padding: 20,
    },
    startButton: {
        backgroundColor: '#2563eb',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
    },
    startButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    secondaryActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    secondaryButton: {
        flex: 1,
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: '#d1d5db',
    },
    secondaryButtonText: {
        fontSize: 14,
        color: '#374151',
        fontWeight: '600',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    closeButton: {
        fontSize: 20,
        color: '#6b7280',
    },
    modalContent: {
        padding: 20,
    },
    modalText: {
        fontSize: 16,
        color: '#374151',
        marginBottom: 20,
        lineHeight: 24,
    },
    checklistItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    checkmark: {
        color: '#10b981',
        fontSize: 16,
        marginRight: 12,
        fontWeight: 'bold',
    },
    checklistText: {
        fontSize: 16,
        color: '#374151',
    },
    confirmButton: {
        backgroundColor: '#2563eb',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 30,
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TourDetailScreen;
