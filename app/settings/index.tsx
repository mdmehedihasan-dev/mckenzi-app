import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Switch,
  Platform
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { EditProfileIcon, LogoutIcon, PlanIcon, ManageSubscriptionIcon, AutoApplyIcon, HapticIcon, SupportIcon, PrivacyIcon, TermsIcon, VersionIcon } from '../../components/icons/BrandedIcons';

const SettingItem = ({ 
  icon, 
  label, 
  onPress, 
  rightElement, 
  color = '#3E2B63',
  isLast = false 
}: { 
  icon: any, 
  label: string, 
  onPress?: () => void, 
  rightElement?: React.ReactNode,
  color?: string,
  isLast?: boolean
}) => (
  <TouchableOpacity 
    style={[styles.settingItem, isLast && styles.noBorder]} 
    onPress={onPress}
    disabled={!onPress}
  >
    <View style={styles.settingItemLeft}>
      <View style={styles.iconContainer}>
        {typeof icon === 'string' ? (
          <MaterialCommunityIcons name={icon as any} size={22} color="#666" />
        ) : (
          icon
        )}
      </View>
      <Text style={[styles.settingLabel, { color: color === '#3E2B63' ? '#333' : color }]}>{label}</Text>
    </View>
    <View style={styles.settingItemRight}>
      {rightElement ? rightElement : (
        <Ionicons name="chevron-forward" size={18} color="#CCC" />
      )}
    </View>
  </TouchableOpacity>
);

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionCard}>
      {children}
    </View>
  </View>
);

export default function Settings() {
  const [autoApply, setAutoApply] = useState(true);
  const [haptic, setHaptic] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Account Section */}
        <Section title="ACCOUNT">
          <View style={styles.profileContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&auto=format&fit=crop' }} 
              style={styles.avatar} 
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Isabella Chen</Text>
              <Text style={styles.profileEmail}>isabella.chen@glamguide.ai</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <SettingItem 
            icon={<EditProfileIcon />} 
            label="Edit Profile" 
            onPress={() => router.push('/edit-profile' as any)} 
          />
           <SettingItem 
            icon={<LogoutIcon />} 
            label="Logout" 
            color="#BA1A1A"
            onPress={() => router.replace('/authentication' as any)}
            isLast={true}
          />
        </Section>

        {/* Subscription Section */}
        <Section title="SUBSCRIPTION">
          <SettingItem 
            icon={<PlanIcon />} 
            label="Current Plan" 
            rightElement={
              <View style={styles.proBadge}>
                <Text style={styles.proBadgeText}>PRO</Text>
              </View>
            }
          />
          <SettingItem 
            icon={<ManageSubscriptionIcon />} 
            label="Manage Subscription" 
            onPress={() => router.push('/manage-subscription' as any)}
            isLast={true}
          />
        </Section>

        {/* App Preferences Section */}
        <Section title="APP PREFERENCES">
          <SettingItem 
            icon={<AutoApplyIcon />} 
            label="Auto-Apply Last Look" 
            rightElement={
              <Switch 
                value={autoApply} 
                onValueChange={setAutoApply}
                trackColor={{ false: '#EEE', true: '#7C4DFF' }}
                thumbColor="#FFF"
              />
            }
          />
          <SettingItem 
            icon={<HapticIcon />} 
            label="Haptic Feedback" 
            isLast={true}
            rightElement={
              <Switch 
                value={haptic} 
                onValueChange={setHaptic}
                trackColor={{ false: '#EEE', true: '#7C4DFF' }}
                thumbColor="#FFF"
              />
            }
          />
        </Section>

        {/* About Section */}
        <Section title="ABOUT">
          <SettingItem 
            icon={<SupportIcon />} 
            label="Help & support" 
            onPress={() => router.push('/help-support' as any)} 
          />
          <SettingItem 
            icon={<PrivacyIcon />} 
            label="Privacy Policy" 
            onPress={() => {}} 
          />
          <SettingItem 
            icon={<TermsIcon />} 
            label="Terms of Service" 
            onPress={() => {}} 
          />
          <SettingItem 
            icon={<VersionIcon />} 
            label="App Version" 
            rightElement={<Text style={styles.versionText}>2.4.1</Text>}
            isLast={true}
          />
        </Section>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#999',
    marginBottom: 8,
    marginLeft: 4,
    letterSpacing: 1,
  },
  sectionCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EEE',
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  profileEmail: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F5F5F5',
    marginHorizontal: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 12,
  },
  settingItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  proBadge: {
    backgroundColor: '#F3E5F5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#7C4DFF',
  },
  proBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7C4DFF',
  },
  versionText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  }
});
