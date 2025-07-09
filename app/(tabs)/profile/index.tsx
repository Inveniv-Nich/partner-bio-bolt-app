import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings, Grid2x2 as Grid, Bookmark, Heart, MessageCircle, Share, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';
import ProfileHeader from '@/components/ProfileHeader';

export default function ProfileTab() {
  const userPosts = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      likes: 1247,
      comments: 89,
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      likes: 892,
      comments: 56,
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/2404843/pexels-photo-2404843.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      likes: 2156,
      comments: 134,
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/1574216/pexels-photo-1574216.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      likes: 756,
      comments: 42,
    },
    {
      id: 5,
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      likes: 1543,
      comments: 78,
    },
    {
      id: 6,
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      likes: 934,
      comments: 65,
    },
  ];

  const highlights = [
    {
      id: 1,
      title: 'Travel',
      image: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    },
    {
      id: 2,
      title: 'Food',
      image: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    },
    {
      id: 3,
      title: 'Nature',
      image: 'https://images.pexels.com/photos/2404843/pexels-photo-2404843.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    },
    {
      id: 4,
      title: 'City',
      image: 'https://images.pexels.com/photos/1574216/pexels-photo-1574216.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    },
  ];

  const tabs = [
    { icon: Grid, label: 'Posts', active: true },
    { icon: Bookmark, label: 'Saved', active: false },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1b3a', '#2d2e5f']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Authentication Info */}
        <ProfileHeader />

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' }}
              style={styles.profileImage}
            />
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>127</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>2.4K</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>892</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
            </View>
          </View>

          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileUsername}>@johndoe</Text>
            <Text style={styles.profileBio}>
              Travel enthusiast & photographer 📸{'\n'}
              Exploring the world one adventure at a time 🌍{'\n'}
              Currently in: San Francisco 📍
            </Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Share size={20} color="#1a1b3a" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButton}>
              <MoreHorizontal size={20} color="#1a1b3a" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Highlights */}
        <View style={styles.highlightsSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.highlightsContainer}>
            {highlights.map((highlight) => (
              <TouchableOpacity key={highlight.id} style={styles.highlightItem}>
                <View style={styles.highlightImageContainer}>
                  <Image source={{ uri: highlight.image }} style={styles.highlightImage} />
                </View>
                <Text style={styles.highlightTitle}>{highlight.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tab, tab.active && styles.activeTab]}>
              <tab.icon size={20} color={tab.active ? '#1a1b3a' : '#94a3b8'} />
              <Text style={[styles.tabLabel, tab.active && styles.activeTabLabel]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Posts Grid */}
        <View style={styles.postsGrid}>
          {userPosts.map((post) => (
            <TouchableOpacity key={post.id} style={styles.postItem}>
              <Image source={{ uri: post.image }} style={styles.postImage} />
              <View style={styles.postOverlay}>
                <View style={styles.postStats}>
                  <View style={styles.postStat}>
                    <Heart size={16} color="#ffffff" fill="#ffffff" />
                    <Text style={styles.postStatText}>{post.likes}</Text>
                  </View>
                  <View style={styles.postStat}>
                    <MessageCircle size={16} color="#ffffff" />
                    <Text style={styles.postStatText}>{post.comments}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingBottom: 100,
  },
  profileSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 24,
    marginBottom: 8,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 24,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1b3a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  profileDetails: {
    marginBottom: 20,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1b3a',
    marginBottom: 4,
  },
  profileUsername: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 12,
  },
  profileBio: {
    fontSize: 14,
    lineHeight: 20,
    color: '#1a1b3a',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1b3a',
  },
  shareButton: {
    width: 44,
    height: 44,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButton: {
    width: 44,
    height: 44,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightsSection: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    marginBottom: 8,
  },
  highlightsContainer: {
    paddingLeft: 24,
  },
  highlightItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 70,
  },
  highlightImageContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    padding: 2,
    marginBottom: 8,
  },
  highlightImage: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
  },
  highlightTitle: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#1a1b3a',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94a3b8',
  },
  activeTabLabel: {
    color: '#1a1b3a',
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#ffffff',
  },
  postItem: {
    width: '33.333%',
    aspectRatio: 1,
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  postOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
  },
  postStats: {
    flexDirection: 'row',
    gap: 16,
  },
  postStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  postStatText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});