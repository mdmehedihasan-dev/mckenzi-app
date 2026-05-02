import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const FeatureItem = ({ text }: { text: string }) => (
  <View style={styles.featureItem}>
    <View style={styles.checkCircle}>
      <Ionicons name="checkmark" size={16} color="#7C4DFF" />
    </View>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const DetailRow = ({ label, value }: { label: string, value: string }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const ManageSubscription = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Subscription</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Current Plan Card */}
        <View style={styles.planCard}>
          <View style={styles.planHeader}>
            <Text style={styles.planSubTitle}>CURRENT PLAN</Text>
            <View style={styles.activeBadge}>
              <Text style={styles.activeBadgeText}>Active</Text>
            </View>
          </View>
          
          <Text style={styles.planTitle}>Pro Access</Text>
          <Text style={styles.planPrice}>$2.99 / month</Text>
          
          <View style={styles.renewalRow}>
            <Feather name="calendar" size={14} color="#A3A3A3" />
            <Text style={styles.renewalText}>Renews on May 28, 2026</Text>
          </View>
        </View>

        {/* Action Items */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionText}>Manage in App Store</Text>
            <Ionicons name="chevron-forward" size={20} color="#A3A3A3" />
          </TouchableOpacity>
          
          <View style={styles.separator} />
          
          <TouchableOpacity 
            style={styles.actionItem}
            onPress={() => router.push('/premium-access' as any)}
          >
            <View>
              <Text style={styles.actionText}>Change Plan</Text>
              <Text style={styles.actionSubText}>Upgrade or downgrade your plan</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#A3A3A3" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel Subscription</Text>
        </TouchableOpacity>

        {/* Billing Details */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>BILLING DETAILS</Text>
        </View>
        
        <View style={styles.detailsCard}>
          <DetailRow label="Billing Cycle" value="Monthly" />
          <View style={styles.separator} />
          <DetailRow label="Next Billing Date" value="May 28, 2026" />
        </View>

        {/* Included Features */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>INCLUDED FEATURES</Text>
        </View>

        <FeatureItem text="Unlimited makeup presets" />
        <FeatureItem text="Advanced guided tutorials" />
        <FeatureItem text="High-quality AR rendering" />

        {/* Bottom Banner */}
        <View style={styles.bannerContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2834&auto=format&fit=crop' }} 
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerText}>
              Experience the future of beauty technology.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  headerRight: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  planCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  planSubTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#A3A3A3',
    letterSpacing: 0.5,
  },
  activeBadge: {
    backgroundColor: '#F3E5F5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7C4DFF',
  },
  planTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  planPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7C4DFF',
    marginBottom: 20,
  },
  renewalRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  renewalText: {
    fontSize: 14,
    color: '#A3A3A3',
    marginLeft: 6,
  },
  actionSection: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  actionSubText: {
    fontSize: 12,
    color: '#A3A3A3',
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 16,
  },
  cancelButton: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#BA1A1A',
  },
  sectionHeader: {
    marginBottom: 12,
    paddingLeft: 4,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#A3A3A3',
    letterSpacing: 0.5,
  },
  detailsCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F3E5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  bannerContainer: {
    height: 160,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    marginTop: 12,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-end',
    padding: 20,
  },
  bannerText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
});

export default ManageSubscription;
