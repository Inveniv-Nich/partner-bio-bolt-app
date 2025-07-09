import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LogOut } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';

export default function ProfileHeader() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={{ 
            uri: user?.user_metadata?.avatar_url || 
                 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
          }}
          style={styles.avatar}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>
            {user?.user_metadata?.full_name || 'User'}
          </Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <LogOut size={20} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1b3a',
    marginBottom: 2,
  },
  email: {
    fontSize: 14,
    color: '#64748b',
  },
  signOutButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fef2f2',
  },
});