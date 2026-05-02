import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Import Branded Icons
import { 
  SaveIcon, 
  LipsIcon, 
  EyeIcon, 
  FaceIcon, 
  LooksIcon, 
  EyebrowIcon, 
  LayersIcon 
} from '../components/icons/BrandedIcons';

const TABS = [
  { id: 'lips', label: 'LIPS', icon: LipsIcon },
  { id: 'eyes', label: 'EYES', icon: EyeIcon },
  { id: 'face', label: 'FACE', icon: FaceIcon },
  { id: 'looks', label: 'LOOKS', icon: LooksIcon },
];

export default function MakeupEditor() {
  const { photoUri } = useLocalSearchParams<{ photoUri: string }>();
  const [activeTab, setActiveTab] = React.useState('lips');
  const [activeAction, setActiveAction] = React.useState('swap');
  const [permission, requestPermission] = useCameraPermissions();
  
  const handleBack = () => {
    router.back();
  };

  const handleSave = () => {
    // Determine the selected part to show detection for
    const selectedPart = activeAction === 'eyebrow' ? 'eyebrow' : activeTab;
    
    router.push({
      pathname: '/DetectionProcessing',
      params: { photoUri, selectedPart }
    });
  };

  if (!permission) return <View style={styles.container} />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={requestPermission} style={styles.permissionBtn}>
          <Text style={{ color: 'white' }}>Grant Camera Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <CameraView 
        style={styles.background}
        facing="front"
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

          {/* Spacer to push controls to bottom */}
          <View style={{ flex: 1 }} />

          {/* Control Section */}
          <View style={styles.controlSection}>
            {/* Main Tabs */}
            <View style={styles.tabsContainer}>
              {/* Quick Actions */}
              <View style={styles.quickActionsRow}>
                <TouchableOpacity 
                  style={[styles.actionCircle, activeAction === 'swap' && { backgroundColor: '#362645', borderColor: '#362645' }]} 
                  onPress={() => setActiveAction('swap')}
                >
                  <Ionicons name="swap-horizontal" size={22} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.actionCircle, activeAction === 'eyebrow' && { backgroundColor: '#362645', borderColor: '#362645' }]} 
                  onPress={() => setActiveAction('eyebrow')}
                >
                  <EyebrowIcon color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              
              <View style={{height: 30}}></View>
              
              <View style={styles.tabsInner}>
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  const iconColor = isActive ? '#D8B4FE' : '#FFFFFF';
                  
                  return (
                    <TouchableOpacity 
                      key={tab.id}
                      style={styles.tabButton}
                      onPress={() => {
                        setActiveTab(tab.id);
                        setActiveAction('none'); // Clear quick action when switching tabs
                      }}
                    >
                      {typeof Icon === 'function' ? (
                        <Icon color={iconColor} />
                      ) : (
                        <MaterialCommunityIcons 
                          name={Icon as any} 
                          size={26} 
                          color={iconColor} 
                        />
                      )}
                      <Text style={[
                        styles.tabButtonText, 
                        { color: isActive ? '#D8B4FE' : '#9CA3AF' }
                      ]}>
                        {tab.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Save Section */}
            <View style={styles.saveSection}>
              <TouchableOpacity style={styles.layersButton}>
                <LayersIcon color="#FFFFFF" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.confirmButton} onPress={handleSave}>
                <SaveIcon />
                <Text style={styles.confirmButtonText}>Save Look</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </CameraView>
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
    backgroundColor: 'rgba(0,0,0,0.15)', 
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
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  controlSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 18,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 120, 
    marginBottom: 5,
  },
  actionCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.14)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  tabsContainer: {
    backgroundColor: 'rgba(12, 12, 12, 0.88)', 
    borderRadius: 16,
    paddingVertical: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  tabsInner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    alignItems: 'center',
    gap: 10,
  },
  tabButtonText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  saveSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  layersButton: {
    width: 58,
    height: 58,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  confirmButton: {
    flex: 1,
    marginLeft: 18,
    backgroundColor: '#E5E5E5',
    height: 62,
    borderRadius: 22,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  confirmButtonText: {
    color: '#3E2B63',
    fontSize: 17,
    fontWeight: '800',
  },
  permissionBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});





