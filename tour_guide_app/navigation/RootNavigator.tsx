import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';

import { createStackNavigator } from '@react-navigation/stack';

export type RootStackParamList = {
    HomeStack: undefined;
    AuthStack: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    return (
        <NavigationContainer>
            <RootStack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName={session ? 'HomeStack' : 'AuthStack'}
            >
                {session ? (
                    <RootStack.Screen name="HomeStack" component={HomeStack} />
                ) : (
                    <RootStack.Screen name="AuthStack" component={AuthStack} />
                )}
            </RootStack.Navigator>
        </NavigationContainer>
    );
}
