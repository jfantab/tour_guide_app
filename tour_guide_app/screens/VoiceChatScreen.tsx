import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Animated,
    SafeAreaView,
    Dimensions,
    Alert,
    TextInput,
} from 'react-native';
import {
    useAudioRecorder,
    AudioModule,
    RecordingPresets,
    setAudioModeAsync,
} from 'expo-audio';

type VoiceState = 'idle' | 'recording' | 'processing';

type Message = {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
};

function VoiceChatScreen() {
    const [voiceState, setVoiceState] = useState<VoiceState>('idle');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isAITyping, setIsAITyping] = useState(false);
    const [textInput, setTextInput] = useState('');
    
    const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

    const micAnimation = useRef(new Animated.Value(1)).current;
    const waveAnimation = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef<ScrollView>(null);

    const startRecording = async () => {
        try {
            const permission = await AudioModule.requestRecordingPermissionsAsync();
            if (!permission.granted) {
                Alert.alert(
                    'Permission required',
                    'Permission to access microphone is required!'
                );
                return;
            }

            await setAudioModeAsync({
                allowsRecording: true,
                playsInSilentMode: true,
            });

            await audioRecorder.prepareToRecordAsync();
            audioRecorder.record();
            setVoiceState('recording');

            Animated.loop(
                Animated.sequence([
                    Animated.timing(micAnimation, {
                        toValue: 1.2,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(micAnimation, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ])
            ).start();

            Animated.loop(
                Animated.timing(waveAnimation, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                })
            ).start();
        } catch (error) {
            Alert.alert('Recording error', 'Failed to start recording');
        }
    };

    const stopRecording = async () => {
        if (!audioRecorder.isRecording) return;

        try {
            setVoiceState('processing');
            micAnimation.stopAnimation();
            waveAnimation.stopAnimation();

            Animated.timing(micAnimation, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();

            Animated.timing(waveAnimation, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start();

            await audioRecorder.stop();
            const uri = audioRecorder.uri;

            setTimeout(() => {
                setVoiceState('idle');
                simulateVoiceMessage(uri);
            }, 1000);
        } catch (error) {
            setVoiceState('idle');
        }
    };

    const simulateVoiceMessage = (recordingUri?: string | null) => {
        const userMessage: Message = {
            id: Date.now().toString(),
            text: recordingUri
                ? `Voice recording saved: ${recordingUri.split('/').pop()}`
                : 'Voice message transcribed...',
            isUser: true,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsAITyping(true);

        setTimeout(() => {
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: recordingUri
                    ? `I received your voice recording! The audio file is ready for processing.`
                    : 'I heard you! This is an AI response to your voice message. ',
                isUser: false,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, aiMessage]);
            setIsAITyping(false);
        }, 2000);
    };

    const sendTextMessage = () => {
        if (textInput.trim() === '') return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: textInput.trim(),
            isUser: true,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setTextInput('');
        setIsAITyping(true);

        setTimeout(() => {
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: `I received your text message: "${userMessage.text}". This is an AI response.`,
                isUser: false,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, aiMessage]);
            setIsAITyping(false);
        }, 2000);
    };

    const getMicrophoneColor = () => {
        switch (voiceState) {
            case 'recording':
                return '#ff4444';
            case 'processing':
                return '#ffaa00';
            default:
                return '#007AFF';
        }
    };

    const renderWaveform = () => {
        if (voiceState !== 'recording') return null;

        const waves = Array.from({ length: 5 }, (_, index) => {
            const animatedOpacity = waveAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 1],
            });

            const animatedHeight = waveAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 60 + Math.random() * 40],
            });

            return (
                <Animated.View
                    key={index}
                    style={[
                        styles.waveBar,
                        {
                            opacity: animatedOpacity,
                            height: animatedHeight,
                        },
                    ]}
                />
            );
        });

        return <View style={styles.waveformContainer}>{waves}</View>;
    };

    const renderMessage = (message: Message) => (
        <View
            key={message.id}
            style={[
                styles.messageContainer,
                message.isUser ? styles.userMessage : styles.aiMessage,
            ]}
        >
            <Text
                style={[
                    styles.messageText,
                    message.isUser
                        ? styles.userMessageText
                        : styles.aiMessageText,
                ]}
            >
                {message.text}
            </Text>
            <Text style={styles.timestamp}>
                {message.timestamp.toLocaleTimeString()}
            </Text>
        </View>
    );

    const renderTypingIndicator = () => {
        if (!isAITyping) return null;

        return (
            <View style={[styles.messageContainer, styles.aiMessage]}>
                <View style={styles.typingContainer}>
                    <View style={styles.typingDot} />
                    <View style={styles.typingDot} />
                    <View style={styles.typingDot} />
                </View>
                <Text style={styles.typingText}>AI is thinking...</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>AI Voice Chat</Text>
                <Text style={styles.headerSubtitle}>
                    {voiceState === 'idle' && 'Tap to speak'}
                    {voiceState === 'recording' && 'Listening...'}
                    {voiceState === 'processing' && 'Processing...'}
                </Text>
            </View>

            <ScrollView
                ref={scrollViewRef}
                style={styles.messagesContainer}
                showsVerticalScrollIndicator={false}
                onContentSizeChange={() =>
                    scrollViewRef.current?.scrollToEnd({ animated: true })
                }
            >
                {messages.map(renderMessage)}
                {renderTypingIndicator()}
            </ScrollView>

            <View style={styles.inputContainer}>
                {renderWaveform()}

                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={textInput}
                        onChangeText={setTextInput}
                        placeholder="Type a message..."
                        placeholderTextColor="#95a5a6"
                        multiline
                        maxLength={500}
                    />
                    <TouchableOpacity
                        style={styles.speakerButton}
                        onPress={sendTextMessage}
                        disabled={textInput.trim() === ''}
                    >
                        <Text style={styles.speakerIcon}>🔊</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={[
                        styles.microphoneButton,
                        { backgroundColor: getMicrophoneColor() },
                        voiceState === 'processing' && styles.processingButton,
                    ]}
                    onPressIn={startRecording}
                    onPressOut={stopRecording}
                    disabled={voiceState === 'processing'}
                >
                    <Animated.View
                        style={[
                            styles.microphoneInner,
                            { transform: [{ scale: micAnimation }] },
                        ]}
                    >
                        <Text style={styles.microphoneIcon}>🎤</Text>
                    </Animated.View>
                </TouchableOpacity>

                <Text style={styles.instruction}>
                    {voiceState === 'idle' && 'Hold to speak or type above'}
                    {voiceState === 'recording' && 'Release to send'}
                    {voiceState === 'processing' && 'Processing...'}
                </Text>
            </View>
        </SafeAreaView>
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e1e5e9',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#7f8c8d',
    },
    messagesContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    messageContainer: {
        maxWidth: width * 0.8,
        marginVertical: 4,
        padding: 12,
        borderRadius: 18,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#007AFF',
    },
    aiMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#e9ecef',
    },
    messageText: {
        fontSize: 16,
        lineHeight: 20,
    },
    userMessageText: {
        color: '#fff',
    },
    aiMessageText: {
        color: '#2c3e50',
    },
    timestamp: {
        fontSize: 12,
        color: '#95a5a6',
        marginTop: 4,
        alignSelf: 'flex-end',
    },
    typingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    typingDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#bdc3c7',
        marginRight: 4,
    },
    typingText: {
        fontSize: 14,
        color: '#7f8c8d',
        fontStyle: 'italic',
    },
    inputContainer: {
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e1e5e9',
    },
    waveformContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: 80,
        marginBottom: 16,
    },
    waveBar: {
        width: 4,
        backgroundColor: '#ff4444',
        marginHorizontal: 2,
        borderRadius: 2,
    },
    microphoneButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    processingButton: {
        opacity: 0.7,
    },
    microphoneInner: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    microphoneIcon: {
        fontSize: 32,
    },
    instruction: {
        marginTop: 12,
        fontSize: 14,
        color: '#7f8c8d',
        textAlign: 'center',
    },
    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: '#f8f9fa',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#e1e5e9',
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginBottom: 16,
        width: width * 0.9,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: '#2c3e50',
        maxHeight: 100,
        minHeight: 40,
        paddingVertical: 8,
    },
    speakerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
        opacity: 1,
    },
    speakerIcon: {
        fontSize: 20,
    },
});

export default VoiceChatScreen;
