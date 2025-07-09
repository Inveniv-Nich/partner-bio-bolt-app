import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { User, MapPin, Briefcase } from 'lucide-react-native';

interface PublicProfileCardProps {
  id: string;
  name: string;
  role?: string;
  organization?: string;
  profileImage?: string;
  isOnline?: boolean;
}

export default function PublicProfileCard({ 
  id, 
  name, 
  role, 
  organization, 
  profileImage,
  isOnline = false 
}: PublicProfileCardProps) {
  const handlePress = () => {
    router.push(`/profile/${id}`);
  };

  const getProfileImage = () => {
    if (profileImage) return profileImage;
    // Generate a consistent image based on the user ID
    const imageId = 1674752 + parseInt(id.slice(-2) || '0', 16) % 1000;
    return `https://images.pexels.com/photos/${imageId}/pexels-photo-${imageId}.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop`;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: getProfileImage() }} 
          style={styles.profileImage}
        />
        {isOnline && <View style={styles.onlineIndicator} />}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        
        {role && (
          <View style={styles.infoRow}>
            <Briefcase size={14} color="#64748b" />
            <Text style={styles.infoText} numberOfLines={1}>{role}</Text>
          </View>
        )}
        
        {organization && (
          <View style={styles.infoRow}>
            <MapPin size={14} color="#64748b" />
            <Text style={styles.infoText} numberOfLines={1}>{organization}</Text>
          </View>
        )}
        
        <View style={styles.viewProfileContainer}>
          <Text style={styles.viewProfileText}>View Profile</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1b3a',
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    gap: 6,
  },
  infoText: {
    fontSize: 14,
    color: '#64748b',
    flex: 1,
  },
  viewProfileContainer: {
    marginTop: 8,
  },
  viewProfileText: {
    fontSize: 14,
    color: '#4f46e5',
    fontWeight: '600',
  },
});