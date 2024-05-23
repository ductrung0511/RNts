import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Redirect, Tabs } from 'expo-router';

import { useColorScheme } from '@/src/components/useColorScheme';
import { useClientOnlyValue } from '@/src/components/useClientOnlyValue';
import Colors from '@/src/constants/Colors';
import { useAuth } from '@/src/provider/AuthProvider';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const {session, isBrand} = useAuth();
    if(!isBrand) {
      console.warn('YOU ARE NO BRAND ACCOUNT', isBrand);
      return <Redirect href={'/'}/>
    }
    if(!session) {
        return <Redirect href={'/'}/>
    }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.background,
        tabBarInactiveBackgroundColor: 'gainsboro',
        tabBarStyle: {
          backgroundColor: Colors.light.tint,
        },    
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen name='index' options={{href:null}}/>
      <Tabs.Screen
        name="menu"
        
        options={{
          title: 'Brand Menu',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="cutlery" color={color} />,
          
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: 'Brand Order',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name='list' color={color} />,
        }}
      />
    </Tabs>
  );
}
