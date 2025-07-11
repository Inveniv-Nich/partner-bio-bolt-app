import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Pencil, Check } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/utils/supabase';
import EditPanel from './EditPanel';

interface ExpertiseArea {
  id: string;
  name: string;
}

export default function ProfileExpertise() {
  const { user } = useAuth();
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [allExpertise, setAllExpertise] = useState<ExpertiseArea[]>([]);
  const [userExpertise, setUserExpertise] = useState<ExpertiseArea[]>([]);
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      fetchExpertiseData();
    }
  }, [user]);

  const fetchExpertiseData = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Fetch all available expertise areas
      const { data: allAreas, error: allError } = await supabase
        .from('areas_of_expertise')
        .select('id, name')
        .order('name');

      if (allError) {
        console.error('Error fetching expertise areas:', allError);
        return;
      }

      // Fetch user's current expertise
      const { data: userAreas, error: userError } = await supabase
        .from('user_expertise')
        .select(`
          expertise_id,
          areas_of_expertise (
            id,
            name
          )
        `)
        .eq('user_id', user.id);

      if (userError) {
        console.error('Error fetching user expertise:', userError);
        return;
      }

      setAllExpertise(allAreas || []);
      
      const userExpertiseAreas = userAreas?.map(item => ({
        id: item.areas_of_expertise.id,
        name: item.areas_of_expertise.name,
      })) || [];
      
      setUserExpertise(userExpertiseAreas);
      setSelectedExpertise(userExpertiseAreas.map(area => area.id));
    } catch (error) {
      console.error('Unexpected error fetching expertise:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setSelectedExpertise(userExpertise.map(area => area.id));
    setShowEditPanel(true);
  };

  const toggleExpertise = (expertiseId: string) => {
    setSelectedExpertise(prev => 
      prev.includes(expertiseId)
        ? prev.filter(id => id !== expertiseId)
        : [...prev, expertiseId]
    );
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      // Delete existing user expertise
      const { error: deleteError } = await supabase
        .from('user_expertise')
        .delete()
        .eq('user_id', user.id);

      if (deleteError) {
        throw deleteError;
      }

      // Insert new user expertise
      if (selectedExpertise.length > 0) {
        const insertData = selectedExpertise.map(expertiseId => ({
          user_id: user.id,
          expertise_id: expertiseId,
        }));

        const { error: insertError } = await supabase
          .from('user_expertise')
          .insert(insertData);

        if (insertError) {
          throw insertError;
        }
      }

      // Update local state
      const updatedUserExpertise = allExpertise.filter(area => 
        selectedExpertise.includes(area.id)
      );
      setUserExpertise(updatedUserExpertise);
      setShowEditPanel(false);
      Alert.alert('Success', 'Areas of expertise updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update expertise. Please try again.');
      console.error('Error updating expertise:', error);
    } finally {
      setSaving(false);
    }
  };

  const displayedExpertise = userExpertise.slice(0, 5);
  const additionalCount = Math.max(0, userExpertise.length - 5);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Areas of Expertise</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Pencil size={20} color="#64748b" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.tagsContainer}>
          {displayedExpertise.map((area) => (
            <TouchableOpacity key={area.id} style={styles.tag}>
              <Text style={styles.tagText}>{area.name}</Text>
            </TouchableOpacity>
          ))}
          {additionalCount > 0 && (
            <TouchableOpacity style={[styles.tag, styles.moreTag]}>
              <Text style={[styles.tagText, styles.moreTagText]}>+{additionalCount}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <EditPanel
        visible={showEditPanel}
        title="Edit Areas of Expertise"
        onClose={() => setShowEditPanel(false)}
        onSave={handleSave}
        loading={saving}
      >
        <View style={styles.editContainer}>
          <Text style={styles.label}>Select your areas of expertise</Text>
          <Text style={styles.helperText}>
            Choose the areas that best represent your professional expertise and research interests.
          </Text>
          
          <ScrollView style={styles.expertiseList} showsVerticalScrollIndicator={false}>
            {allExpertise.map((area) => {
              const isSelected = selectedExpertise.includes(area.id);
              return (
                <TouchableOpacity
                  key={area.id}
                  style={[styles.expertiseItem, isSelected && styles.expertiseItemSelected]}
                  onPress={() => toggleExpertise(area.id)}
                >
                  <Text style={[styles.expertiseItemText, isSelected && styles.expertiseItemTextSelected]}>
                    {area.name}
                  </Text>
                  {isSelected && (
                    <Check size={20} color="#ffffff" />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
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
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tag: {
    backgroundColor: '#1a1b3a',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 8,
  },
  tagText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  moreTag: {
    backgroundColor: '#1a1b3a',
  },
  moreTagText: {
    color: '#ffffff',
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
  helperText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 20,
  },
  expertiseList: {
    maxHeight: 400,
  },
  expertiseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  expertiseItemSelected: {
    backgroundColor: '#1a1b3a',
    borderColor: '#1a1b3a',
  },
  expertiseItemText: {
    fontSize: 16,
    color: '#1a1b3a',
    fontWeight: '500',
  },
  expertiseItemTextSelected: {
    color: '#ffffff',
  },
});