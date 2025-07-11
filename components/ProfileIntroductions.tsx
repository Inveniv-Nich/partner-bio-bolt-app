import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Edit } from 'lucide-react-native';

export default function ProfileIntroductions() {
  const handleEdit = () => {
    // TODO: Implement edit functionality
    console.log('Edit introductions pressed');
  };

  const handleMorePress = () => {
    // TODO: Implement expand functionality
    console.log('More pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Introductions</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Edit size={20} color="#64748b" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.content}>
        More then 20 years academia and biologics research. Background in microbiology, genetic editing, and drug discovery. Published in 50+ articles, 60+ papers, cited over 16K times for research in genetic disorders. Created the WHO Collaborating Center for Degenerative Disorders as a multi-national institute{' '}
        <TouchableOpacity onPress={handleMorePress}>
          <Text style={styles.moreText}>...more</Text>
        </TouchableOpacity>
      </Text>
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
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
  },
  moreText: {
    color: '#e91e63',
    fontWeight: '600',
  },
});