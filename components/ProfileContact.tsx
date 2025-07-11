import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, TextInput, Alert } from 'react-native';
import { Pencil } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/utils/supabase';
import EditPanel from './EditPanel';

export default function ProfileContact() {
  const { user } = useAuth();
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editWebsite, setEditWebsite] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      fetchContactInfo();
    }
  }, [user]);

  const fetchContactInfo = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('phone, website')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching contact info:', error);
      } else {
        const userPhone = data?.phone || '+1.650.555.2121 mobile';
        const userWebsite = data?.website || 'biotech.com';
        setPhone(userPhone);
        setWebsite(userWebsite);
        setEditPhone(userPhone);
        setEditWebsite(userWebsite);
      }
    } catch (error) {
      console.error('Unexpected error fetching contact info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditPhone(phone);
    setEditWebsite(website);
    setShowEditPanel(true);
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('users')
        .update({ 
          phone: editPhone,
          website: editWebsite 
        })
        .eq('id', user.id);

      if (error) {
        Alert.alert('Error', 'Failed to update contact information. Please try again.');
        console.error('Error updating contact info:', error);
      } else {
        setPhone(editPhone);
        setWebsite(editWebsite);
        setShowEditPanel(false);
        Alert.alert('Success', 'Contact information updated successfully!');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      console.error('Unexpected error updating contact info:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleEmailPress = () => {
    if (user?.email) {
      Linking.openURL(`mailto:${user.email}`);
    }
  };

  const handlePhonePress = () => {
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    if (cleanPhone) {
      Linking.openURL(`tel:${cleanPhone}`);
    }
  };

  const handleWebsitePress = () => {
    let url = website;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }
    Linking.openURL(url);
  };

  const displayPhone = phone || '+1.650.555.2121 mobile';
  const displayWebsite = website || 'biotech.com';

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Contact Information</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Pencil size={20} color="#64748b" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.contactInfo}>
          <TouchableOpacity onPress={handleEmailPress}>
            <Text style={styles.contactText}>{user?.email || 'marcus.johnson@biotech.com'}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handlePhonePress}>
            <Text style={styles.contactText}>{displayPhone}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleWebsitePress}>
            <Text style={[styles.contactText, styles.websiteText]}>{displayWebsite}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <EditPanel
        visible={showEditPanel}
        title="Edit Contact Information"
        onClose={() => setShowEditPanel(false)}
        onSave={handleSave}
        loading={saving}
      >
        <View style={styles.editContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.disabledInput}>
              <Text style={styles.disabledInputText}>{user?.email || 'marcus.johnson@biotech.com'}</Text>
            </View>
            <Text style={styles.helperText}>
              Email address cannot be changed here. Please contact support if you need to update your email.
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.textInput}
              value={editPhone}
              onChangeText={setEditPhone}
              placeholder="Enter your phone number"
              placeholderTextColor="#94a3b8"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Website</Text>
            <TextInput
              style={styles.textInput}
              value={editWebsite}
              onChangeText={setEditWebsite}
              placeholder="Enter your website URL"
              placeholderTextColor="#94a3b8"
              keyboardType="url"
              autoCapitalize="none"
            />
            <Text style={styles.helperText}>
              Enter your professional website or portfolio URL.
            </Text>
          </View>
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
  editContainer: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
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
  },
  disabledInput: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  disabledInputText: {
    fontSize: 16,
    color: '#64748b',
  },
  helperText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginTop: 8,
  },
});