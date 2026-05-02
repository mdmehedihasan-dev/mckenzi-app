import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { InfiniteStorageIcon, PrecisionToolsIcon, PriorityCurationIcon } from '../../components/icons/BrandedIcons';

const FeatureItem = ({ icon, title, description }: { icon: any, title: string, description: string }) => (
  <View style={styles.featureItem}>
    <View style={styles.featureIconContainer}>
      {icon}
    </View>
    <View style={styles.featureTextContainer}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  </View>
);

const PremiumAccess = () => {
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
        <Text style={styles.headerTitle}>Premium Access</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Icon */}
        <View style={styles.topIconContainer}>
          <Ionicons name="sparkles-outline" size={80} color="#7C4DFF" />
        </View>

        {/* Hero Text */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>The Quiet Standard</Text>
          <Text style={styles.heroSubtitle}>
            Unlock the full editorial suite with our most focused experience yet.
          </Text>
        </View>

        {/* Features List */}
        <View style={styles.featuresSection}>
          <FeatureItem 
            icon={<PrecisionToolsIcon />}
            title="PRECISION TOOLS"
            description="Advanced editorial controls for pixel-perfect clarity."
          />
          <FeatureItem 
            icon={<InfiniteStorageIcon />}
            title="INFINITE STORAGE"
            description="Securely host your entire library in the radiant cloud."
          />
          <FeatureItem 
            icon={<PriorityCurationIcon />}
            title="PRIORITY CURATION"
            description="Direct access to the latest editorial frameworks and templates."
          />
        </View>

        {/* Pricing Card */}
        <View style={styles.pricingCard}>
          <View style={styles.limitBadge}>
            <Text style={styles.limitBadgeText}>LIMITED TIME ACCESS</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceSymbol}>$</Text>
            <Text style={styles.priceAmount}>12</Text>
            <Text style={styles.pricePeriod}>/month</Text>
          </View>
          
          <Text style={styles.billingInfo}>
            Billed annually at $144. Cancel anytime.
          </Text>

          <TouchableOpacity style={styles.trialButton}>
            <Text style={styles.trialButtonText}>Start Free Trial</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            NO COMMITMENT REQUIRED • 7-DAY TRIAL
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
  },
  headerRight: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  topIconContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2D1F50',
    textAlign: 'center',
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  featuresSection: {
    marginBottom: 48,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#A3A3A3',
    letterSpacing: 1,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    fontWeight: '500',
  },
  pricingCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0EFFF',
    shadowColor: '#7C4DFF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,
  },
  limitBadge: {
    backgroundColor: '#F3E5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginBottom: 20,
  },
  limitBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7C4DFF',
    letterSpacing: 0.5,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  priceSymbol: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
    marginRight: 2,
  },
  priceAmount: {
    fontSize: 48,
    fontWeight: '800',
    color: '#000',
  },
  pricePeriod: {
    fontSize: 16,
    color: '#A3A3A3',
    marginBottom: 10,
    marginLeft: 4,
  },
  billingInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 32,
  },
  trialButton: {
    backgroundColor: '#3F2D70',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  trialButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  footerText: {
    fontSize: 10,
    color: '#A3A3A3',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default PremiumAccess;
