import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Filter, TrendingUp } from 'lucide-react-native';

export default function SearchTab() {
  const trendingTopics = [
    { tag: '#photography', posts: '2.4M' },
    { tag: '#travel', posts: '1.8M' },
    { tag: '#nature', posts: '3.2M' },
    { tag: '#sunset', posts: '892K' },
    { tag: '#adventure', posts: '1.5M' },
  ];

  const exploreGrid = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      likes: '1.2K',
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      likes: '892',
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/2404843/pexels-photo-2404843.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      likes: '2.1K',
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/1574216/pexels-photo-1574216.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      likes: '756',
    },
    {
      id: 5,
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      likes: '1.5K',
    },
    {
      id: 6,
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      likes: '934',
    },
    {
      id: 7,
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      likes: '1.8K',
    },
    {
      id: 8,
      image: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      likes: '672',
    },
    {
      id: 9,
      image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      likes: '1.1K',
    },
  ];

  const categories = [
    { name: 'All', active: true },
    { name: 'Photos', active: false },
    { name: 'Videos', active: false },
    { name: 'People', active: false },
    { name: 'Places', active: false },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1b3a', '#2d2e5f']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <Text style={styles.headerTitle}>Discover</Text>
        <Text style={styles.headerSubtitle}>Explore trending content</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for people, places, or tags..."
              placeholderTextColor="#94a3b8"
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#1a1b3a" />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categories}>
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.categoryChip,
                    category.active && styles.activeCategoryChip,
                  ]}>
                  <Text
                    style={[
                      styles.categoryText,
                      category.active && styles.activeCategoryText,
                    ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Trending Section */}
        <View style={styles.trendingSection}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={20} color="#1a1b3a" />
            <Text style={styles.sectionTitle}>Trending Now</Text>
          </View>
          <View style={styles.trendingContainer}>
            {trendingTopics.map((topic, index) => (
              <TouchableOpacity key={index} style={styles.trendingItem}>
                <Text style={styles.trendingTag}>{topic.tag}</Text>
                <Text style={styles.trendingPosts}>{topic.posts} posts</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Explore Grid */}
        <View style={styles.exploreSection}>
          <Text style={styles.sectionTitle}>Explore</Text>
          <View style={styles.exploreGrid}>
            {exploreGrid.map((item) => (
              <TouchableOpacity key={item.id} style={styles.gridItem}>
                <Image source={{ uri: item.image }} style={styles.gridImage} />
                <View style={styles.gridOverlay}>
                  <Text style={styles.gridLikes}>{item.likes}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    paddingBottom: 100,
  },
  searchSection: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 20,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: {
    fontSize: 16,
    color: '#1a1b3a',
  },
  filterButton: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categories: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  activeCategoryChip: {
    backgroundColor: '#1a1b3a',
    borderColor: '#1a1b3a',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  activeCategoryText: {
    color: '#ffffff',
  },
  trendingSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1b3a',
    marginLeft: 8,
  },
  trendingContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  trendingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  trendingTag: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1b3a',
  },
  trendingPosts: {
    fontSize: 14,
    color: '#64748b',
  },
  exploreSection: {
    paddingHorizontal: 24,
  },
  exploreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  gridItem: {
    width: '31.5%',
    aspectRatio: 1,
    position: 'relative',
  },
  gridImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  gridOverlay: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  gridLikes: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});