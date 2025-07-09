import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import TabIcon from '@/components/TabIcon';
import AuthGuard from '@/components/AuthGuard';

export default function TabLayout() {
  return (
    <AuthGuard>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#040324',
            borderTopWidth: 0,
            paddingTop: 12,
            paddingBottom: 12,
            height: 80,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginHorizontal: -1,
            marginBottom: -1,
            position: 'absolute',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 16,
            elevation: 8,
          },
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.6)',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginTop: 4,
          },
          tabBarItemStyle: {
            paddingVertical: 4,
          },
          tabBarShowLabel: false
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Main',
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <TabIcon name="main" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <TabIcon name="search" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="add"
          options={{
            title: 'Add',
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <TabIcon name="add" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            title: 'Notifications',
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <TabIcon name="notifications" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <TabIcon name="profile" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </AuthGuard>
  );
}

const styles = StyleSheet.create({
  addButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -8,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
});