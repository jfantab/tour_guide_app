import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from './TabNavigator';

export type RootStackParamList = {
    Main: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={TabNavigator} />
        </Stack.Navigator>
    );
}
