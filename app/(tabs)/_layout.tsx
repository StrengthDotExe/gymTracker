import { Tabs, usePathname, useRouter } from 'expo-router';
import React, { useEffect } from 'react';

import { useAuth } from '@/components/AuthContext';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { BackHandler } from 'react-native';

export default function TabLayout() {
  const { theme } = useAuth();
  const isDark = theme === 'dark';

  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const backAction = () => {
      console.log(path);
      if(path == '/') {
        BackHandler.exitApp();
      }
      else {
        router.navigate('/');
      }
      return true;
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [path]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[theme ?? 'light'].tint, 
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: isDark ? '#151718' : '#ffffff',
          borderTopColor: isDark ? '#333' : '#e0e0e0',
        },
        tabBarInactiveTintColor: isDark ? '#888' : '#888',
      }}>
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Statistics',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chevron.left.forwardslash.chevron.right" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="temp"
        options={{
          title: 'Plans',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="list.bullet" color={color} />, 
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gear" color={color} />,
        }}
      />
    </Tabs>
  );
}