import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MessageSquare, TrendingUp, CreditCard as Edit, Settings } from 'lucide-react-native';

// 1. Define an interface for the component's props
interface ActionsHeaderProps {
  profileImageUri: string;
  profileName: string;
  onMessagePress: () => void; // A function that takes no arguments and returns nothing
  onTrendingPress: () => void;
  onEditPress: () => void;
  onSettingsPress: () => void;
}

// 2. Use the interface with your functional component
const ActionsHeader: React.FC<ActionsHeaderProps> = ({
  profileImageUri,
  profileName,
  onMessagePress,
  onTrendingPress,
  onEditPress,
  onSettingsPress,
}) => (
  <View style={styles.headerContent}>
    <View style={styles.profileImageContainer}>
      <Image source={{ uri: profileImageUri }} style={styles.profileImage} />
    </View>
    <View style={styles.profileSection}>
      <Text style={styles.profileName}>{profileName}</Text>
    </View>
    <View style={styles.actionIcons}>
      <TouchableOpacity style={styles.iconButton} onPress={onMessagePress}>
        <MessageSquare size={24} color="#1e3a8a" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={onTrendingPress}>
        <TrendingUp size={24} color="#1e3a8a" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={onEditPress}>
        <Edit size={24} color="#1e3a8a" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={onSettingsPress}>
        <Settings size={24} color="#1e3a8a" />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  headerContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#001080',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'relative',
    zIndex: 1,
  },
  profileImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#ffffff',
    marginRight: 16,
    overflow: 'hidden',
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -35 }],
    left: 15,
    zIndex: 2,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',
  },
  actionIcons: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#61EDB9',
    width: '100%',
    position: 'relative',
    transform: 'translateY(-20px)',
    justifyContent: 'center',
    paddingTop: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 5,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ActionsHeader;
