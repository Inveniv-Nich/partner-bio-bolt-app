import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Pencil } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/utils/supabase';
import EditPanel from './EditPanel';

export default function ProfileIntroductions() {
  const { user } = useAuth();
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [bio, setBio] = useState('');
  const [editBio, setEditBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserBio();
    }
  }, [user]);

  const fetchUserBio = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('bio')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching bio:', error);
      } else {
        const userBio = data?.bio || 'More then 20 years academia and biologics research. Background in microbiology, genetic editing, and drug discovery. Published in 50+ articles, 60+ papers, cited over 16K times for research in genetic disorders. Created the WHO Collaborating Center for Degenerative Disorders as a multi-national institute';
        setBio(userBio);
        setEditBio(userBio);
      }
    } catch (error) {
      console.error('Unexpected error fetching bio:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditBio(bio);
    setShowEditPanel(true);
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('users')
        .update({ bio: editBio })
        .eq('id', user.id);

      if (error) {
        Alert.alert('Error', 'Failed to update introduction. Please try again.');
        console.error('Error updating bio:', error);
      } else {
        setBio(editBio);
        setShowEditPanel(false);
        Alert.alert('Success', 'Introduction updated successfully!');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      console.error('Unexpected error updating bio:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleMorePress = () => {
    // TODO: Implement expand functionality
    console.log('More pressed');
  };

  const displayBio = bio || 'More then 20 years academia and biologics research. Background in microbiology, genetic editing, and drug discovery. Published in 50+ articles, 60+ papers, cited over 16K times for research in genetic disorders. Created the WHO Collaborating Center for Degenerative Disorders as a multi-national institute';

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Introductions</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Pencil size={20} color="#64748b" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.content}>
          {displayBio}{' '}
          <TouchableOpacity onPress={handleMorePress}>
            <Text style={styles.moreText}>...more</Text>
          </TouchableOpacity>
        </Text>
      </View>

      <EditPanel
        visible={showEditPanel}
        title="Edit Introduction"
        onClose={() => setShowEditPanel(false)}
        onSave={handleSave}
        loading={saving}
      >
        <View style={styles.editContainer}>
          <Text style={styles.label}>Introduction</Text>
          <TextInput
            style={styles.textInput}
            value={editBio}
            onChangeText={setEditBio}
            placeholder="Tell others about your background and experience..."
            placeholderTextColor="#94a3b8"
            multiline
            numberOfLines={8}
            textAlignVertical="top"
          />
          <Text style={styles.helperText}>
            Share your professional background, research interests, and achievements.
          </Text>
        </View>
      </EditPanel>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    marginHorizontal: 24,
    marginBottom: 24,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1b3a',
  },
  editButton: {
    padding: 4,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
  },
  moreText: {
    color: '#e91e63',
    fontWeight: '600',
  },
  editContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1b3a',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1a1b3a',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minHeight: 120,
    marginBottom: 8,
  },
  helperText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
});