export default {
    expo: {
        name: 'tour_guide_app',
        slug: 'tour_guide_app',
        version: '1.0.0',
        orientation: 'portrait',
        icon: './assets/icon.png',
        userInterfaceStyle: 'light',
        newArchEnabled: true,
        splash: {
            image: './assets/splash-icon.png',
            resizeMode: 'contain',
            backgroundColor: '#ffffff',
        },
        assetBundlePatterns: ['**/*'],
        ios: {
            supportsTablet: true,
            bundleIdentifier: 'com.jfantabulus.tourguideapp',
        },
        android: {
            adaptiveIcon: {
                foregroundImage: './assets/adaptive-icon.png',
                backgroundColor: '#ffffff',
            },
        },
        web: {
            favicon: './assets/favicon.png',
            bundler: 'metro',
        },
        extra: {
            SUPABASE_URL: process.env.SUPABASE_URL,
            SUPABASE_PUB_KEY: process.env.SUPABASE_PUB_KEY,
            eas: {
                projectId: "7cb768f8-f5c6-4ea2-b7d8-9213ad8e1267"
            },
        },
        plugins: ['expo-font'],
    },
};
