import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';

export const getProfile = async ({ session }: { session: Session }) => {
    try {
        if (!session?.user) throw new Error('No user on the session!');

        const { data, error, status } = await supabase
            .from('profiles')
            .select(`full_name`)
            .eq('id', session?.user.id)
            .single();
        if (error && status != 406) {
            throw error;
        }

        if (data) {
            console.log(data);
            return data;
        }
    } catch (e) {
        if (e instanceof Error) {
            Alert.alert(e.message);
        }
    }
};

export const updateProfile = async ({
    session,
    fullName,
}: {
    session: Session;
    fullName: string;
}) => {
    try {
        if (!session?.user) throw new Error('No user on the session!');

        const updates = {
            id: session?.user.id,
            fullName: fullName,
            updated_at: new Date(),
        };

        const { error } = await supabase.from('profiles').upsert(updates);

        if (error) {
            throw error;
        }
    } catch (e) {
        if (e instanceof Error) {
            Alert.alert(e.message);
        }
    }
};
