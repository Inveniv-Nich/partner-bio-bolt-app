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
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Eye, EyeOff, Lock, CheckCircle } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { supabase } from '@/utils/supabase';

export default function ResetPasswordScreen() {
  const { access_token, refresh_token } = useLocalSearchParams<{
    access_token?: string;
    refresh_token?: string;
  }>();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [sessionError, setSessionError] = useState(false);

  useEffect(() => {
    // Set the session using the tokens from the URL
    if (access_token && refresh_token) {
      supabase.auth.setSession({
        access_token,
        refresh_token,
      }).catch((error) => {
        console.error('Error setting session:', error);
        setSessionError(true);
      });
    } else {
      setSessionError(true);
    }
  }, [access_token, refresh_token]);

  const validatePassword = (pwd: string) => {
    const minLength = pwd.length >= 8;
    const hasNumber = /\d/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    
    return minLength && hasNumber && hasUpper && hasSpecial;
  };

  const handleResetPassword = async () => {
    setError(null);

    if (!password) {
      setError('Please enter a new password');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters with uppercase, number, and special character');
      return;
    }

    if (!confirmPassword) {
      setError('Please confirm your password');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
        // Sign out the user after successful password reset
        setTimeout(async () => {
          await supabase.auth.signOut();
          router.replace('/login');
        }, 3000);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.replace('/login');
  };

  const getPasswordStrength = () => {
    if (!password) return { strength: 0, color: '#e2e8f0' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/\d/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    const colors = ['#ef4444', '#f59e0b', '#eab308', '#22c55e'];
    return { strength, color: colors[strength - 1] || '#e2e8f0' };
  };

  const passwordStrength = getPasswordStrength();

  if (sessionError) {
    return (
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <LinearGradient
          colors={['#1a1b3a', '#2d2e5f', '#4a4b7c']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.errorScreenContainer}>
            <View style={styles.errorCard}>
              <Text style={styles.errorTitle}>Invalid Reset Link</Text>
              <Text style={styles.errorMessage}>
                This password reset link is invalid or has expired. Please request a new password reset link.
              </Text>
              <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Text style={styles.backButtonText}>Back to Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    );
  }

  if (success) {
    return (
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <LinearGradient
          colors={['#1a1b3a', '#2d2e5f', '#4a4b7c']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.successScreenContainer}>
            <View style={styles.successCard}>
              <View style={styles.iconContainer}>
                <CheckCircle size={64} color="#22c55e" />
              </View>
              <Text style={styles.successTitle}>Password Updated!</Text>
              <Text style={styles.successMessage}>
                Your password has been successfully updated. You will be redirected to the sign in page shortly.
              </Text>
            </View>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#1a1b3a', '#2d2e5f', '#4a4b7c']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <TouchableOpacity style={styles.headerBackButton} onPress={handleBack}>
              <ArrowLeft size={24} color="#64748b" />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>
              Enter your new password below. Make sure it's strong and secure.
            </Text>

            <View style={styles.formContainer}>
              {error && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              <View style={styles.inputGroup}>
                <View style={styles.passwordInputContainer}>
                  <Lock size={20} color="#94a3b8" style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, styles.passwordInput]}
                    placeholder="New Password"
                    placeholderTextColor="#94a3b8"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={20} color="#94a3b8" />
                    ) : (
                      <Eye size={20} color="#94a3b8" />
                    )}
                  </TouchableOpacity>
                </View>
                
                {/* Password Strength Indicator */}
                {password.length > 0 && (
                  <View style={styles.strengthContainer}>
                    <View style={styles.strengthBar}>
                      {[1, 2, 3, 4].map((level) => (
                        <View
                          key={level}
                          style={[
                            styles.strengthSegment,
                            {
                              backgroundColor: level <= passwordStrength.strength 
                                ? passwordStrength.color 
                                : '#e2e8f0'
                            }
                          ]}
                        />
                      ))}
                    </View>
                    <Text style={styles.strengthText}>
                      Password strength: {passwordStrength.strength === 4 ? 'Strong' : 
                                        passwordStrength.strength === 3 ? 'Good' : 
                                        passwordStrength.strength === 2 ? 'Fair' : 'Weak'}
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.inputGroup}>
                <View style={styles.passwordInputContainer}>
                  <Lock size={20} color="#94a3b8" style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, styles.passwordInput]}
                    placeholder="Confirm New Password"
                    placeholderTextColor="#94a3b8"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} color="#94a3b8" />
                    ) : (
                      <Eye size={20} color="#94a3b8" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.resetButton, loading && styles.resetButtonDisabled]}
                onPress={handleResetPassword}
                disabled={loading}
              >
                <LinearGradient
                  colors={loading ? ['#94a3b8', '#94a3b8'] : ['#4f46e5', '#7c3aed']}
                  style={styles.resetButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  {loading ? (
                    <ActivityIndicator color="#ffffff" size="small" />
                  ) : (
                    <Text style={styles.resetButtonText}>Update Password</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
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
    marginBottom: 40,
  },
  headerBackButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 48,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  errorContainer: {
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: 24,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 16,
    paddingVertical: 4,
    position: 'relative',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1a1b3a',
    paddingVertical: 16,
  },
  passwordInput: {
    paddingRight: 40,
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    padding: 4,
  },
  strengthContainer: {
    marginTop: 8,
  },
  strengthBar: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 4,
  },
  strengthSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  strengthText: {
    fontSize: 12,
    color: '#64748b',
  },
  resetButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  resetButtonDisabled: {
    opacity: 0.7,
  },
  resetButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  errorCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1b3a',
    marginBottom: 16,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  backButton: {
    backgroundColor: '#4f46e5',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  successScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  successCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  iconContainer: {
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1b3a',
    marginBottom: 16,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
});