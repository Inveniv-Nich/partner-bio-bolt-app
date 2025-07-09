import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { CreditCard as Search, SlidersHorizontal, ArrowRight } from 'lucide-react-native';

import ActionsHeader from '../../components/ActionsHeader';
import PartnerMatchSummary from '../../components/PartnerMatchSummary';
import StickyTabsWithSearch from '../../components/StickyTabsWithSearch';
import InsightsCards from '../../components/InsightsCards';


export default function MainTab() {

  const chartImages = [
    'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    'https://images.pexels.com/photos/7947664/pexels-photo-7947664.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
  ];

  // Placeholder functions for button presses
  const handleMessagePress = () => console.log('Message icon pressed');
  const handleTrendingPress = () => console.log('Trending icon pressed');
  const handleEditPress = () => console.log('Edit icon pressed');
  const handleSettingsPress = () => console.log('Settings icon pressed');

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <ActionsHeader
        profileImageUri="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop"
        profileName="Marcus Johnson, PhD"
        onMessagePress={handleMessagePress}
        onTrendingPress={handleTrendingPress}
        onEditPress={handleEditPress}
        onSettingsPress={handleSettingsPress}
      />

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
      >
        {/* Partner Match Center Section */}
        <PartnerMatchSummary />

        {/* Combined Sticky Section - Tabs and Search */}
        <StickyTabsWithSearch />

        {/* Insights Cards */}
        <InsightsCards />
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 0
  },
  content: {
    flex: 1,
    paddingBottom: 100,
  },
});