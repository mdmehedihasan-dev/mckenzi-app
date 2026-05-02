import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brandText}>GLAMGUIDE AI</Text>
        <TouchableOpacity onPress={() => router.push('/settings' as any)}>
          <Ionicons name="settings-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Your AI Beauty Assistant</Text>
          <Text style={styles.heroSub}>Precision mapping & guided application</Text>
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={() => router.push('/camera' as any)}
          >
            <Text style={styles.ctaText}>START ANALYSIS</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  brandText: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 2,
    color: '#3E2B63',
  },
  content: {
    padding: 20,
  },
  heroCard: {
    backgroundColor: '#3E2B63',
    borderRadius: 24,
    padding: 24,
    height: 200,
    justifyContent: 'center',
  },
  heroTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  heroSub: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: '#7C4DFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  ctaText: {
    color: '#FFF',
    fontWeight: '700',
    marginRight: 8,
    fontSize: 12,
  }
});
