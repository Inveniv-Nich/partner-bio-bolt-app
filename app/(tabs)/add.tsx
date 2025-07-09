import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, Image as ImageIcon, Video, Music, MapPin, Users, Hash } from 'lucide-react-native';

export default function AddTab() {
  const mediaOptions = [
    { icon: Camera, label: 'Camera', color: '#4f46e5', description: 'Take a photo or video' },
    { icon: ImageIcon, label: 'Gallery', color: '#06b6d4', description: 'Choose from gallery' },
    { icon: Video, label: 'Video', color: '#ef4444', description: 'Record a video' },
    { icon: Music, label: 'Audio', color: '#f59e0b', description: 'Add audio content' },
  ];

  const quickActions = [
    { icon: MapPin, label: 'Check In', color: '#10b981' },
    { icon: Users, label: 'Tag People', color: '#8b5cf6' },
    { icon: Hash, label: 'Add Tags', color: '#f97316' },
  ];

  const templates = [
    {
      id: 1,
      name: 'Story Template',
      image: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop',
      category: 'Stories',
    },
    {
      id: 2,
      name: 'Post Layout',
      image: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop',
      category: 'Posts',
    },
    {
      id: 3,
      name: 'Collage',
      image: 'https://images.pexels.com/photos/2404843/pexels-photo-2404843.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop',
      category: 'Creative',
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1b3a', '#2d2e5f']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <Text style={styles.headerTitle}>Create</Text>
        <Text style={styles.headerSubtitle}>Share your moment with the world</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Media Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Media Type</Text>
          <View style={styles.mediaGrid}>
            {mediaOptions.map((option, index) => (
              <TouchableOpacity key={index} style={styles.mediaOption}>
                <View style={[styles.mediaIconContainer, { backgroundColor: option.color + '20' }]}>
                  <option.icon size={32} color={option.color} />
                </View>
                <Text style={styles.mediaLabel}>{option.label}</Text>
                <Text style={styles.mediaDescription}>{option.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsContainer}>
            {quickActions.map((action, index) => (
              <TouchableOpacity key={index} style={styles.quickAction}>
                <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                  <action.icon size={20} color="#ffffff" />
                </View>
                <Text style={styles.quickActionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Caption Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Write a Caption</Text>
          <View style={styles.captionContainer}>
            <TextInput
              style={styles.captionInput}
              placeholder="What's on your mind? Share your thoughts..."
              placeholderTextColor="#94a3b8"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Templates */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Templates</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.templatesContainer}>
            {templates.map((template) => (
              <TouchableOpacity key={template.id} style={styles.templateItem}>
                <Image source={{ uri: template.image }} style={styles.templateImage} />
                <View style={styles.templateOverlay}>
                  <Text style={styles.templateCategory}>{template.category}</Text>
                  <Text style={styles.templateName}>{template.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Privacy Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <View style={styles.privacyContainer}>
            <TouchableOpacity style={[styles.privacyOption, styles.activePrivacyOption]}>
              <Text style={[styles.privacyText, styles.activePrivacyText]}>Public</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.privacyOption}>
              <Text style={styles.privacyText}>Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.privacyOption}>
              <Text style={styles.privacyText}>Private</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.draftButton}>
            <Text style={styles.draftButtonText}>Save Draft</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.publishButton}>
            <LinearGradient
              colors={['#4f46e5', '#7c3aed']}
              style={styles.publishGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}>
              <Text style={styles.publishButtonText}>Publish</Text>
            </LinearGradient>
          </TouchableOpacity>
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
    paddingBottom: 120,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1b3a',
    marginBottom: 16,
  },
  mediaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  mediaOption: {
    width: '47%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  mediaIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  mediaLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1b3a',
    marginBottom: 4,
  },
  mediaDescription: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  quickAction: {
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1b3a',
  },
  captionContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  captionInput: {
    fontSize: 16,
    color: '#1a1b3a',
    minHeight: 100,
  },
  templatesContainer: {
    paddingLeft: 0,
  },
  templateItem: {
    width: 120,
    height: 180,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  templateImage: {
    width: '100%',
    height: '100%',
  },
  templateOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 12,
  },
  templateCategory: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 2,
  },
  templateName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  privacyContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  privacyOption: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  activePrivacyOption: {
    backgroundColor: '#1a1b3a',
  },
  privacyText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  activePrivacyText: {
    color: '#ffffff',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 32,
  },
  draftButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  draftButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
  },
  publishButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  publishGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  publishButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});