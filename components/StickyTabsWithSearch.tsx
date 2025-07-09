import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { CreditCard as Search, SlidersHorizontal } from 'lucide-react-native';

const tabs = [
    { label: 'Insights', active: true },
    { label: 'Events', active: false },
    { label: 'Opportunities', active: false },
];

const StickyTabsWithSearch = () => (
    <View style={styles.stickyCombinedSection}>
    {/* Custom Tabs */}
    <View style={styles.tabsContainer}>
    {tabs.map((tab, index) => (
        <TouchableOpacity
        key={index}
        style={[styles.tab, tab.active && styles.activeTab]}>
        <Text style={[styles.tabText, tab.active && styles.activeTabText]}>
            {tab.label}
        </Text>
        </TouchableOpacity>
    ))}
    </View>

    {/* Search Section */}
    <View style={styles.searchSection}>
    <View style={styles.searchContainer}>
        <Search size={20} color="#94a3b8" style={styles.searchIcon} />
        <TextInput
        style={styles.searchInput}
        placeholder="Explore Insights"
        placeholderTextColor="#94a3b8"
        />
    </View>
    <TouchableOpacity style={styles.filterButton}>
        <SlidersHorizontal size={20} color="#1e3a8a" />
    </TouchableOpacity>
    </View>
    </View>
);

const styles = StyleSheet.create({
  stickyCombinedSection: {
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 24,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#1e3a8a',
  },
  tabText: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#1e3a8a',
    fontWeight: '600',
  },
  searchSection: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e3a8a',
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
});

export default StickyTabsWithSearch;
