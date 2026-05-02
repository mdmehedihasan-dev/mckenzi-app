import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const TABS = [
  { id: 'lips', label: 'LIPS', icon: 'mouth' },
  { id: 'eyes', label: 'EYES', icon: 'eye' },
  { id: 'face', label: 'FACE', icon: 'face-man-profile' },
  { id: 'looks', label: 'LOOKS', icon: 'sparkles' },
];

export default function MakeupEditor() {
  const { photoUri } = useLocalSearchParams<{ photoUri: string }>();
  const [activeTab, setActiveTab] = useState('lips');

  const handleBack = () => {
    router.back();
  };

  const handleSave = () => {
    router.push({
      pathname: '/Comparison',
      params: { photoUri }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ImageBackground 
        source={photoUri ? { uri: photoUri } : require('../assets/images/logo_main.png')} 
        style={styles.background}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.overlay}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.headerBtn}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.brandText}>GLAMGUIDE AI</Text>
            <TouchableOpacity style={styles.headerBtn}>
              <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Bottom Controls Area */}
          <View style={styles.bottomSection}>
            
            {/* Top Row: Floating Circular Buttons */}
            <View style={styles.floatingButtonsRow}>
              <TouchableOpacity style={styles.circularBtn}>
                <Ionicons name="swap-horizontal" size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.circularBtn}>
                <Ionicons name="reload" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Glass Container for Tabs */}
            <View style={styles.glassContainer}>
              <View style={styles.tabsWrapper}>
                {TABS.map((tab) => (
                  <TouchableOpacity 
                    key={tab.id}
                    style={styles.tabItem}
                    onPress={() => setActiveTab(tab.id)}
                  >
                    <MaterialCommunityIcons 
                      name={tab.icon as any} 
                      size={24} 
                      color={activeTab === tab.id ? '#D8B4FE' : '#FFFFFF'} 
                    />
                    <Text style={[
                      styles.tabLabel, 
                      { color: activeTab === tab.id ? '#D8B4FE' : '#9CA3AF' }
                    ]}>
                      {tab.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Bottom Row: Save Button & Actions */}
            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.actionBtn}>
                <Ionicons name="layers-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Ionicons name="bookmark-outline" size={18} color="#5E33E1" />
                <Text style={styles.saveBtnText}>Save Look</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)', // Lighter overlay to let photo show through
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 15,
  },
  floatingButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 110, 
    marginBottom: 5,
  },
  circularBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  glassContainer: {
    backgroundColor: 'rgba(15, 15, 15, 0.85)', // Darker glass
    borderRadius: 32,
    paddingVertical: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  tabsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
    gap: 8,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionBtn: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtn: {
    flex: 1,
    marginLeft: 15,
    backgroundColor: '#D1D1D1',
    height: 58,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  saveBtnText: {
    color: '#5E33E1',
    fontSize: 16,
    fontWeight: '700',
  },
});


