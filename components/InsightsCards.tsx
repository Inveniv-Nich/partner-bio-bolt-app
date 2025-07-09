import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const InsightsCards = () => (
  <View style={styles.insightCard}>
    <View style={styles.insightHeader}>
      <Image
        source={{ uri: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' }}
        style={styles.insightAvatar}
      />
      <View style={styles.insightInfo}>
        <Text style={styles.insightName}>Anya Sharma, PhD</Text>
        <Text style={styles.insightDate}>June 11, 2025</Text>
      </View>
    </View>
    
    <Text style={styles.insightText}>
      Genetic Markers for Cardiovascular Disease Phasellus at tristique mauris. 
      Vivamus eget vehicula millepo{' '}
      <Text style={styles.moreText}>...more</Text>
    </Text>
  </View>
);

const styles = StyleSheet.create({
  insightCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  insightAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  insightInfo: {
    flex: 1,
  },
  insightName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e3a8a',
    marginBottom: 2,
  },
  insightDate: {
    fontSize: 14,
    color: '#64748b',
  },
  insightText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#374151',
  },
  moreText: {
    color: '#e91e63',
    fontWeight: '600',
  },
});

export default InsightsCards;
