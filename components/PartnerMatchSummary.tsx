import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CreditCard as ArrowRight } from 'lucide-react-native';


const stats = [
    { number: '35', label: 'People', color: '#e91e63' },
    { number: '11', label: 'Companies', color: '#e91e63' },
    { number: '8', label: 'Events', color: '#e91e63' },
    { number: '6', label: 'Opportunities', color: '#e91e63' },
];

const PartnerMatchSummary = () => (
    <View style={styles.matchCenterSection}>
        <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Partner Match Center</Text>
        <TouchableOpacity style={styles.exploreButton}>
            <Text style={styles.exploreText}>Explore</Text>
            <ArrowRight size={16} color="#e91e63" />
        </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
            <Text style={[styles.statNumber, { color: stat.color }]}>{stat.number}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
        ))}
        </View>
    </View>
);

const styles = StyleSheet.create({
  matchCenterSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#f8fafc',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  exploreText: {
    fontSize: 16,
    color: '#e91e63',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
});

export default PartnerMatchSummary;
