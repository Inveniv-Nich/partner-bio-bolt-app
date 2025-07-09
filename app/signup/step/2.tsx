import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'signup_progress';

export default function SignupStep2() {
  const [role, setRole] = useState('');
  const [organization, setOrganization] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Load saved progress on mount
  useEffect(() => {
    loadSavedProgress();
  }, []);

  // Save progress whenever form data changes
  useEffect(() => {
    saveProgress();
  }, [role, organization]);

  const loadSavedProgress = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setRole(data.role || '');
        setOrganization(data.organization || '');
      }
    } catch (error) {
      console.error('Error loading saved progress:', error);
    }
  };

  const saveProgress = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      const existingData = saved ? JSON.parse(saved) : {};
      
      const data = {
        ...existingData,
        role,
        organization,
        step: 2,
        timestamp: new Date().toISOString(),
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!role.trim()) {
      newErrors.role = 'Role is required';
    }

    if (!organization.trim()) {
      newErrors.organization = 'Organization is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (validateForm()) {
      await saveProgress();
      router.push('/signup/step/3');
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#f8fafc', '#ffffff']}
        style={styles.gradient}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <ArrowLeft size={24} color="#64748b" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextTextButton} onPress={handleNext}>
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>What do you do?</Text>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <TextInput
                  style={[styles.input, errors.role && styles.inputError]}
                  placeholder="Role"
                  placeholderTextColor="#94a3b8"
                  value={role}
                  onChangeText={setRole}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
                {errors.role && (
                  <Text style={styles.errorText}>{errors.role}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <TextInput
                  style={[styles.input, errors.organization && styles.inputError]}
                  placeholder="Organization"
                  placeholderTextColor="#94a3b8"
                  value={organization}
                  onChangeText={setOrganization}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
                {errors.organization && (
                  <Text style={styles.errorText}>{errors.organization}</Text>
                )}
              </View>
            </View>

            {/* Progress Indicators */}
            <View style={styles.progressContainer}>
              <View style={[styles.progressDot, styles.progressDotActive]} />
              <View style={[styles.progressDot, styles.progressDotActive]} />
              <View style={styles.progressDot} />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  nextTextButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  nextText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3b82f6',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1b3a',
    marginBottom: 40,
    textAlign: 'left',
  },
  form: {
    marginBottom: 60,
  },
  inputGroup: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#f1f5f9',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1a1b3a',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 'auto',
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e2e8f0',
  },
  progressDotActive: {
    backgroundColor: '#3b82f6',
  },
});