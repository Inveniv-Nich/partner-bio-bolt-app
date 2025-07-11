import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Edit } from 'lucide-react-native';

export default function ProfileExpertise() {
  const handleEdit = () => {
    // TODO: Implement edit functionality
    console.log('Edit expertise pressed');
  };

  const expertiseAreas = [
    'Biology',
    'Cell Therapy',
    'Gene Therapy',
    'Next Gen Sequencing',
    'Microbiology',
  ];

  const additionalCount = 18; // Number of additional expertise areas

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Areas of Expertise</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Edit size={20} color="#64748b" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.tagsContainer}>
        {expertiseAreas.map((area, index) => (
          <TouchableOpacity key={index} style={styles.tag}>
            <Text style={styles.tagText}>{area}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={[styles.tag, styles.moreTag]}>
          <Text style={[styles.tagText, styles.moreTagText]}>+{additionalCount}</Text>
        </TouchableOpacity>
      </View>
    </View>
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
});