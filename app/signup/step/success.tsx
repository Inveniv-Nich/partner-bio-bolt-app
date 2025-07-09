import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Mail, RefreshCw } from 'lucide-react-native';
import { router } from 'expo-router';
import { supabase } from '@/utils/supabase';

export default function SignupSuccess() {
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

  const handleResendEmail = async () => {
    setResending(true);
    setResendMessage('');

    try {
      // Get current user email from auth
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user?.email) {
        const { error } = await supabase.auth.resend({
          type: 'signup',
          email: user.email,
        });

        if (error) {
          setResendMessage('Failed to resend email. Please try again.');
        } else {
          setResendMessage('Verification email sent successfully!');
        }
      } else {
        setResendMessage('Unable to find email address. Please sign up again.');
      }
    } catch (error) {
      setResendMessage('An unexpected error occurred.');
    } finally {
      setResending(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleGoToLogin = () => {
    router.replace('/login');
  };

  return (
    <LinearGradient
      colors={['#f8fafc', '#ffffff']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft size={24} color="#64748b" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sign up</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <View style={styles.iconBackground}>
              <Mail size={48} color="#3b82f6" />
            </View>
          </View>

          <Text style={styles.title}>Check your email</Text>
          <Text style={styles.subtitle}>
            We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
          </Text>

          <TouchableOpacity 
            style={[styles.resendButton, resending && styles.resendButtonDisabled]}
            onPress={handleResendEmail}
            disabled={resending}
          >
            <LinearGradient
              colors={resending ? ['#94a3b8', '#94a3b8'] : ['#e2e8f0', '#f1f5f9']}
              style={styles.resendButtonGradient}
            >
              {resending ? (
                <ActivityIndicator size="small" color="#64748b" />
              ) : (
                <RefreshCw size={20} color="#64748b" />
              )}
              <Text style={[styles.resendButtonText, resending && styles.resendButtonTextDisabled]}>
                {resending ? 'Sending...' : 'Resend verification email'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {resendMessage && (
            <View style={[
              styles.messageContainer,
              resendMessage.includes('Failed') || resendMessage.includes('Unable') 
                ? styles.errorMessage 
                : styles.successMessage
            ]}>
              <Text style={[
                styles.messageText,
                resendMessage.includes('Failed') || resendMessage.includes('Unable')
                  ? styles.errorMessageText
                  : styles.successMessageText
              ]}>
                {resendMessage}
              </Text>
            </View>
          )}

          <TouchableOpacity style={styles.loginButton} onPress={handleGoToLogin}>
            <Text style={styles.loginButtonText}>
              Already verified? Sign in
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Tab Bar Placeholder */}
        <View style={styles.tabBarPlaceholder}>
          <View style={styles.tabItem}>
            <View style={styles.tabIcon} />
          </View>
          <View style={styles.tabItem}>
            <View style={styles.tabIcon} />
          </View>
          <View style={styles.tabItem}>
            <View style={styles.tabIcon} />
          </View>
          <View style={styles.tabItem}>
            <View style={styles.tabIcon} />
          </View>
          <View style={styles.tabItem}>
            <View style={styles.tabIcon} />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 60,
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
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1b3a',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 120,
  },
  iconContainer: {
    marginBottom: 32,
  },
  iconBackground: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1b3a',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  resendButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    width: '100%',
  },
  resendButtonDisabled: {
    opacity: 0.7,
  },
  resendButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
  },
  resendButtonText: {
    color: '#64748b',
    fontSize: 16,
    fontWeight: '600',
  },
  resendButtonTextDisabled: {
    color: '#94a3b8',
  },
  messageContainer: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    width: '100%',
  },
  successMessage: {
    backgroundColor: '#f0fdf4',
    borderLeftWidth: 4,
    borderLeftColor: '#22c55e',
  },
  errorMessage: {
    backgroundColor: '#fef2f2',
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  messageText: {
    fontSize: 14,
    textAlign: 'center',
  },
  successMessageText: {
    color: '#166534',
  },
  errorMessageText: {
    color: '#dc2626',
  },
  loginButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  loginButtonText: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  tabBarPlaceholder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#040324',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});