import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, MessageCircle, UserPlus, Share, Settings } from 'lucide-react-native';

export default function NotificationsTab() {
  const notifications = [
    {
      id: 1,
      type: 'like',
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      },
      action: 'liked your photo',
      time: '2m ago',
      postImage: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      isNew: true,
    },
    {
      id: 2,
      type: 'comment',
      user: {
        name: 'Alex Chen',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      },
      action: 'commented on your post',
      comment: 'Amazing shot! The lighting is perfect.',
      time: '15m ago',
      postImage: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      isNew: true,
    },
    {
      id: 3,
      type: 'follow',
      user: {
        name: 'Emma Rodriguez',
        avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      },
      action: 'started following you',
      time: '1h ago',
      isNew: true,
    },
    {
      id: 4,
      type: 'share',
      user: {
        name: 'Mike Wilson',
        avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      },
      action: 'shared your post',
      time: '3h ago',
      postImage: 'https://images.pexels.com/photos/2404843/pexels-photo-2404843.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      isNew: false,
    },
    {
      id: 5,
      type: 'like',
      user: {
        name: 'Lisa Park',
        avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      },
      action: 'liked your photo',
      time: '5h ago',
      postImage: 'https://images.pexels.com/photos/1574216/pexels-photo-1574216.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      isNew: false,
    },
    {
      id: 6,
      type: 'comment',
      user: {
        name: 'David Kim',
        avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      },
      action: 'commented on your post',
      comment: 'This place looks incredible! Where is it?',
      time: '1d ago',
      postImage: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      isNew: false,
    },
    {
      id: 7,
      type: 'follow',
      user: {
        name: 'Anna Taylor',
        avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      },
      action: 'started following you',
      time: '2d ago',
      isNew: false,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart size={20} color="#ef4444" fill="#ef4444" />;
      case 'comment':
        return <MessageCircle size={20} color="#3b82f6" />;
      case 'follow':
        return <UserPlus size={20} color="#10b981" />;
      case 'share':
        return <Share size={20} color="#8b5cf6" />;
      default:
        return <Heart size={20} color="#64748b" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'like':
        return '#fef2f2';
      case 'comment':
        return '#eff6ff';
      case 'follow':
        return '#f0fdf4';
      case 'share':
        return '#faf5ff';
      default:
        return '#f8fafc';
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1b3a', '#2d2e5f']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Notifications</Text>
            <Text style={styles.headerSubtitle}>Stay updated with your activity</Text>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* New Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>New</Text>
          {notifications
            .filter(notification => notification.isNew)
            .map((notification) => (
              <TouchableOpacity key={notification.id} style={[styles.notificationItem, styles.newNotification]}>
                <View style={styles.notificationLeft}>
                  <View style={styles.avatarContainer}>
                    <Image source={{ uri: notification.user.avatar }} style={styles.avatar} />
                    <View style={[styles.iconBadge, { backgroundColor: getNotificationColor(notification.type) }]}>
                      {getNotificationIcon(notification.type)}
                    </View>
                  </View>
                  <View style={styles.notificationContent}>
                    <Text style={styles.notificationText}>
                      <Text style={styles.userName}>{notification.user.name}</Text> {notification.action}
                    </Text>
                    {notification.comment && (
                      <Text style={styles.commentText}>"{notification.comment}"</Text>
                    )}
                    <Text style={styles.timeText}>{notification.time}</Text>
                  </View>
                </View>
                {notification.postImage && (
                  <Image source={{ uri: notification.postImage }} style={styles.postThumbnail} />
                )}
                {notification.type === 'follow' && (
                  <TouchableOpacity style={styles.followButton}>
                    <Text style={styles.followButtonText}>Follow</Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            ))}
        </View>

        {/* Earlier Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Earlier</Text>
          {notifications
            .filter(notification => !notification.isNew)
            .map((notification) => (
              <TouchableOpacity key={notification.id} style={styles.notificationItem}>
                <View style={styles.notificationLeft}>
                  <View style={styles.avatarContainer}>
                    <Image source={{ uri: notification.user.avatar }} style={styles.avatar} />
                    <View style={[styles.iconBadge, { backgroundColor: getNotificationColor(notification.type) }]}>
                      {getNotificationIcon(notification.type)}
                    </View>
                  </View>
                  <View style={styles.notificationContent}>
                    <Text style={styles.notificationText}>
                      <Text style={styles.userName}>{notification.user.name}</Text> {notification.action}
                    </Text>
                    {notification.comment && (
                      <Text style={styles.commentText}>"{notification.comment}"</Text>
                    )}
                    <Text style={styles.timeText}>{notification.time}</Text>
                  </View>
                </View>
                {notification.postImage && (
                  <Image source={{ uri: notification.postImage }} style={styles.postThumbnail} />
                )}
                {notification.type === 'follow' && (
                  <TouchableOpacity style={styles.followButton}>
                    <Text style={styles.followButtonText}>Follow</Text>
                  </TouchableOpacity>
                )}
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
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
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
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1b3a',
    marginBottom: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  newNotification: {
    borderLeftWidth: 4,
    borderLeftColor: '#4f46e5',
  },
  notificationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  iconBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 15,
    color: '#1a1b3a',
    marginBottom: 4,
  },
  userName: {
    fontWeight: '600',
  },
  commentText: {
    fontSize: 14,
    color: '#64748b',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#94a3b8',
  },
  postThumbnail: {
    width: 44,
    height: 44,
    borderRadius: 8,
    marginLeft: 12,
  },
  followButton: {
    backgroundColor: '#4f46e5',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginLeft: 12,
  },
  followButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});