import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';

export default function ProfileHeader() {
  const { user } = useAuth();

  const handleBack = () => {
    router.back();
  };

  const handleSaveChanges = () => {
    // TODO: Implement save changes functionality
    console.log('Save changes pressed');
  };

  // Get user info from auth or use defaults
  const userName = user?.user_metadata?.full_name || 'Marcus Johnson, PhD';
  const userRole = user?.user_metadata?.role || 'Director of Clinical R&D';
  const userOrganization = user?.user_metadata?.organization || 'UCLA';
  const userLocation = 'Los Angeles, CA USA'; // This could be added to user metadata later

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <ArrowLeft size={24} color="#ffffff" />
        <Text style={styles.backText}>Main</Text>
      </TouchableOpacity>

      {/* Profile content */}
      <View style={styles.profileContent}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ 
              uri: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
            }}
            style={styles.profileImage}
          />
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{userName}</Text>
          <Text style={styles.profileTitle}>
            {userRole}{'\n'}at {userOrganization}
          </Text>
          <Text style={styles.profileLocation}>{userLocation}</Text>
        </View>
      </View>

      {/* Save Changes button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1b3a',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 8,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  profileImageContainer: {
    marginRight: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 20,
  },
  profileInfo: {
    flex: 1,
    paddingTop: 8,
  },
  profileName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    lineHeight: 38,
  },
  profileTitle: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 16,
    lineHeight: 24,
    opacity: 0.9,
  },
  profileLocation: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.8,
  },
  saveButton: {
    backgroundColor: '#e91e63',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});