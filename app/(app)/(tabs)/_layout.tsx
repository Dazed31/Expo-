import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useClerk, useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Image, TouchableOpacity } from 'react-native';

export default function TabLayout() {

  const colorWhite = "#FFFFFF";
  const colorGrey = "#808080";
  const colorScheme = useColorScheme();
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Sign Out", style: "destructive", onPress: () => signOut() }
      ]
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            isSignedIn && user?.imageUrl ? (
              <TouchableOpacity onPress={handleSignOut}>
                <Image
                  source={{ uri: user.imageUrl }}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    borderWidth: focused ? 2 : 1,
                    borderColor: focused ? colorWhite : colorGrey,
                  }}
                />
              </TouchableOpacity>
            ) : (
              <Ionicons
                name="search"
                size={30}
                color={focused ? colorWhite : colorGrey}
              />
            )
          )
        }}
      />
    </Tabs>
  );
}
