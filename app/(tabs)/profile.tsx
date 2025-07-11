import { View, StyleSheet, ScrollView } from 'react-native';
import ProfileHeader from '@/components/ProfileHeader';
import ProfileIntroductions from '@/components/ProfileIntroductions';
import ProfileExpertise from '@/components/ProfileExpertise';
import ProfileContact from '@/components/ProfileContact';

export default function ProfileTab() {
  return (
    <View style={styles.container}>
      <ProfileHeader />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ProfileIntroductions />
        <ProfileExpertise />
        <ProfileContact />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    paddingTop: 24,
    paddingBottom: 100,
  },
});