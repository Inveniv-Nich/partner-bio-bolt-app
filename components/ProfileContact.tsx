import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Edit } from 'lucide-react-native';

export default function ProfileContact() {
  const handleEdit = () => {
    // TODO: Implement edit functionality
    console.log('Edit contact pressed');
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:marcus.johnson@biotech.com');
  };

  const handlePhonePress = () => {
    Linking.openURL('tel:+16505552121');
  };

  const handleWebsitePress = () => {
    Linking.openURL('https://biotech.com');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Contact Information</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Edit size={20} color="#64748b" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.contactInfo}>
        <TouchableOpacity onPress={handleEmailPress}>
          <Text style={styles.contactText}>marcus.johnson@biotech.com</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handlePhonePress}>
          <Text style={styles.contactText}>+1.650.555.2121 mobile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleWebsitePress}>
          <Text style={[styles.contactText, styles.websiteText]}>biotech.com</Text>
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
  contactInfo: {
    gap: 8,
  },
  contactText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  websiteText: {
    color: '#e91e63',
  },
});