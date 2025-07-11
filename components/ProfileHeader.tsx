import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert, ActivityIndicator } from 'react-native';
import { ArrowLeft, Pencil, Camera } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/utils/supabase';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import EditPanel from './EditPanel';

export default function ProfileHeader() {
  const { user, refreshUser } = useAuth();
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [editFullName, setEditFullName] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editOrganization, setEditOrganization] = useState('');
  const [editProfileImageUri, setEditProfileImageUri] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (user) {
      setEditFullName(user.user_metadata?.full_name || '');
      setEditRole(user.user_metadata?.role || '');
      setEditOrganization(user.user_metadata?.organization || '');
      setEditProfileImageUri(user.user_metadata?.avatar_url || '');
    }
  }, [user]);

  const handleBack = () => {
    router.back();
  };

  const handleEdit = () => {
    if (user) {
      setEditFullName(user.user_metadata?.full_name || '');
      setEditRole(user.user_metadata?.role || '');
      setEditOrganization(user.user_metadata?.organization || '');
      setEditProfileImageUri(user.user_metadata?.avatar_url || '');
      setShowEditPanel(true);
    }
  };

  const pickImage = async () => {
    try {
      // Request permission to access media library
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'Permission to access camera roll is required!');
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setEditProfileImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const uploadAvatar = async (imageUri: string): Promise<string | null> => {
    if (!user) return null;

    setUploadingImage(true);
    try {
      // Create a unique filename
      const fileExt = imageUri.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Convert image URI to blob for upload
      const response = await fetch(imageUri);
      const blob = await response.blob();

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(filePath, blob, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.error('Error uploading avatar:', error);
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    setSaving(true);
    try {
      let avatarUrl = user.user_metadata?.avatar_url;

      // Upload new image if one was selected and it's different from current
      if (editProfileImageUri && editProfileImageUri !== user.user_metadata?.avatar_url) {
        const uploadedUrl = await uploadAvatar(editProfileImageUri);
        if (uploadedUrl) {
          avatarUrl = uploadedUrl;
        }
      }

      // Update auth user metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          full_name: editFullName,
          role: editRole,
          organization: editOrganization,
          avatar_url: avatarUrl,
        },
      });

      if (authError) {
        throw authError;
      }

      // Update public.users table
      const { error: dbError } = await supabase
        .from('users')
        .update({
          name: editFullName,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (dbError) {
        throw dbError;
      }

      // Refresh user data
      await refreshUser();
      
      setShowEditPanel(false);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Get user info from auth or use defaults
  const userName = user?.user_metadata?.full_name || 'Marcus Johnson, PhD';
  const userRole = user?.user_metadata?.role || 'Director of Clinical R&D';
  const userOrganization = user?.user_metadata?.organization || 'UCLA';
  const userLocation = 'Los Angeles, CA USA'; // This could be added to user metadata later
  const userAvatarUrl = user?.user_metadata?.avatar_url || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop';

  return (
    <>
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
              source={{ uri: userAvatarUrl }}
              style={styles.profileImage}
            />
            {/* Edit button overlay */}
            <TouchableOpacity style={styles.editImageButton} onPress={handleEdit}>
              <Pencil size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userName}</Text>
            <Text style={styles.profileTitle}>
              {userRole}{'\n'}at {userOrganization}
            </Text>
            <Text style={styles.profileLocation}>{userLocation}</Text>
          </View>
        </View>
      </View>

      <EditPanel
        visible={showEditPanel}
        title="Edit Profile"
        onClose={() => setShowEditPanel(false)}
        onSave={handleSaveProfile}
        loading={saving}
      >
        <View style={styles.editContainer}>
          {/* Profile Image Section */}
          <View style={styles.imageSection}>
            <Text style={styles.label}>Profile Picture</Text>
            <View style={styles.imagePickerContainer}>
              <Image
                source={{ 
                  uri: editProfileImageUri || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
                }}
                style={styles.editProfileImage}
              />
              <TouchableOpacity 
                style={styles.changeImageButton} 
                onPress={pickImage}
                disabled={uploadingImage}
              >
                {uploadingImage ? (
                  <ActivityIndicator color="#ffffff" size="small" />
                ) : (
                  <Camera size={20} color="#ffffff" />
                )}
                <Text style={styles.changeImageText}>
                  {uploadingImage ? 'Uploading...' : 'Change Photo'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Name Section */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.textInput}
              value={editFullName}
              onChangeText={setEditFullName}
              placeholder="Enter your full name"
              placeholderTextColor="#94a3b8"
            />
          </View>

          {/* Role Section */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Role</Text>
            <TextInput
              style={styles.textInput}
              value={editRole}
              onChangeText={setEditRole}
              placeholder="Enter your role/title"
              placeholderTextColor="#94a3b8"
            />
          </View>

          {/* Organization Section */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Organization</Text>
            <TextInput
              style={styles.textInput}
              value={editOrganization}
              onChangeText={setEditOrganization}
              placeholder="Enter your organization"
              placeholderTextColor="#94a3b8"
            />
            <Text style={styles.helperText}>
              Your workplace, university, or research institution.
            </Text>
          </View>
        </View>
      </EditPanel>
    </>
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
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 20,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
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
  editContainer: {
    marginBottom: 24,
  },
  imageSection: {
    marginBottom: 24,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1b3a',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  imagePickerContainer: {
    alignItems: 'center',
  },
  editProfileImage: {
    width: 120,
    height: 120,
    borderRadius: 20,
    marginBottom: 16,
  },
  changeImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4f46e5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  changeImageText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1a1b3a',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  helperText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginTop: 8,
  },
});