import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const LipsIcon = ({ color }: { color: string }) => (
  <Svg width="24" height="15" viewBox="0 0 23 14" fill="none">
    <Path 
      d="M15.377 0.149658C15.7372 0.149658 16.0822 0.217657 16.4102 0.352783C16.735 0.486653 17.0315 0.671276 17.2988 0.906494L17.3018 0.908447L22.4551 5.62427L22.5264 5.6897L22.4961 5.78247C21.7373 8.07819 20.3705 9.93182 18.3984 11.3391C16.4262 12.7466 14.2013 13.4504 11.7295 13.4504H10.998C8.42981 13.4504 6.20718 12.7542 4.33789 11.3577C2.47327 9.96461 1.09894 8.11359 0.213867 5.80981L0.176758 5.71411L0.25293 5.64478L5.44824 0.908447L5.44922 0.906494H5.4502C5.7169 0.67185 6.00886 0.48662 6.32617 0.352783C6.64753 0.217153 6.99002 0.149677 7.35156 0.149658C7.61072 0.149658 7.86559 0.186532 8.11523 0.26001L8.2998 0.31958C8.42159 0.363109 8.54059 0.414616 8.65723 0.4729L8.83008 0.565674L8.83301 0.567627L11.374 2.1106L13.916 0.567627L13.9189 0.565674C14.1468 0.434997 14.3809 0.33328 14.6211 0.260986L14.8057 0.212158C14.9916 0.170653 15.1821 0.149684 15.377 0.149658ZM20.4229 6.98071C19.5168 7.26751 18.312 7.5986 16.8086 7.96802C15.0851 8.3906 13.2525 8.60181 11.3115 8.60181C9.4403 8.60179 7.65807 8.40088 5.96582 7.99731C4.49101 7.6456 3.2921 7.32559 2.36816 7.04419C3.27457 8.52075 4.40641 9.7097 5.76465 10.6125C7.21534 11.5768 8.95768 12.063 10.998 12.0637H11.0029L11.7324 12.0842C13.6994 12.0838 15.4503 11.5896 16.9893 10.6018C18.4292 9.67757 19.5728 8.47054 20.4229 6.98071ZM7.32227 1.52954C7.20404 1.52954 7.0881 1.54459 6.97461 1.57544L6.8623 1.61157C6.71503 1.66638 6.57944 1.74824 6.45508 1.85864L2.30371 5.62622C3.26444 5.91459 4.51733 6.24501 6.06445 6.61353C7.74046 7.01418 9.49138 7.21411 11.3174 7.21411C13.1437 7.2141 14.8972 7.01107 16.5781 6.60474C18.1326 6.22895 19.4038 5.89326 20.3936 5.60376L16.3438 1.92114L16.2354 1.83325C16.1242 1.75067 16.0019 1.68374 15.8691 1.63208C15.6913 1.56292 15.5183 1.52954 15.3496 1.52954C15.2358 1.52956 15.1279 1.54166 15.0254 1.56567C14.931 1.58781 14.8375 1.62907 14.7451 1.69263L14.7383 1.69751L14.6602 1.56958L14.7373 1.69751L11.4521 3.68481L11.375 3.73169L11.2969 3.68481L8.10352 1.76099L8.09961 1.75806C7.97811 1.67935 7.84981 1.62232 7.71484 1.58521C7.57618 1.54711 7.44564 1.52894 7.32324 1.52954H7.32227Z" 
      fill={color} 
      stroke={color} 
      strokeWidth="0.3"
    />
  </Svg>
);

const EyeIcon = ({ color }: { color: string }) => (
  <Svg width="22" height="15" viewBox="0 0 22 15" fill="none">
    <Path 
      d="M11 12C12.25 12 13.3125 11.5625 14.1875 10.6875C15.0625 9.8125 15.5 8.75 15.5 7.5C15.5 6.25 15.0625 5.1875 14.1875 4.3125C13.3125 3.4375 12.25 3 11 3C9.75 3 8.6875 3.4375 7.8125 4.3125C6.9375 5.1875 6.5 6.25 6.5 7.5C6.5 8.75 6.9375 9.8125 7.8125 10.6875C8.6875 11.5625 9.75 12 11 12ZM11 10.2C10.25 10.2 9.6125 9.9375 9.0875 9.4125C8.5625 8.8875 8.3 8.25 8.3 7.5C8.3 6.75 8.5625 6.1125 9.0875 5.5875C9.6125 5.0625 10.25 4.8 11 4.8C11.75 4.8 12.3875 5.0625 12.9125 5.5875C13.4375 6.1125 13.7 6.75 13.7 7.5C13.7 8.25 13.4375 8.8875 12.9125 9.4125C12.3875 9.9375 11.75 10.2 11 10.2ZM11 15C8.56667 15 6.35 14.3208 4.35 12.9625C2.35 11.6042 0.9 9.78333 0 7.5C0.9 5.21667 2.35 3.39583 4.35 2.0375C6.35 0.679167 8.56667 0 11 0C13.4333 0 15.65 0.679167 17.65 2.0375C19.65 3.39583 21.1 5.21667 22 7.5C21.1 9.78333 19.65 11.6042 17.65 12.9625C15.65 14.3208 13.4333 15 11 15ZM11 13C12.8833 13 14.6125 12.5042 16.1875 11.5125C17.7625 10.5208 18.9667 9.18333 19.8 7.5C18.9667 5.81667 17.7625 4.47917 16.1875 3.4875C14.6125 2.49583 12.8833 2 11 2C9.11667 2 7.3875 2.49583 5.8125 3.4875C4.2375 4.47917 3.03333 5.81667 2.2 7.5C3.03333 9.18333 4.2375 10.5208 5.8125 11.5125C7.3875 12.5042 9.11667 13 11 13Z" 
      fill={color} 
    />
  </Svg>
);

const TABS = [
  { id: 'lips', label: 'LIPS', icon: LipsIcon },
  { id: 'eyes', label: 'EYES', icon: EyeIcon },
  { id: 'face', label: 'FACE', icon: 'face-recognition' },
  { id: 'looks', label: 'LOOKS', icon: 'auto-fix' },
];

export default function MakeupEditor() {
  const { photoUri } = useLocalSearchParams<{ photoUri: string }>();
  const [activeTab, setActiveTab] = React.useState('lips');
  
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

          {/* Spacer to push controls to bottom */}
          <View style={{ flex: 1 }} />

          {/* Control Section */}
          <View style={styles.controlSection}>
            
            {/* Quick Actions */}
            <View style={styles.quickActionsRow}>
              <TouchableOpacity style={styles.actionCircle}>
                <Ionicons name="swap-horizontal" size={22} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionCircle}>
                <Ionicons name="reload" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Main Tabs */}
            <View style={styles.tabsContainer}>
              <View style={styles.tabsInner}>
                {TABS.map((tab) => (
                  <TouchableOpacity 
                    key={tab.id}
                    style={styles.tabButton}
                    onPress={() => setActiveTab(tab.id)}
                  >
                    {typeof tab.icon === 'function' ? (
                      <tab.icon color={activeTab === tab.id ? '#D8B4FE' : '#FFFFFF'} />
                    ) : (
                      <MaterialCommunityIcons 
                        name={tab.icon as any} 
                        size={26} 
                        color={activeTab === tab.id ? '#D8B4FE' : '#FFFFFF'} 
                      />
                    )}
                    <Text style={[
                      styles.tabButtonText, 
                      { color: activeTab === tab.id ? '#D8B4FE' : '#9CA3AF' }
                    ]}>
                      {tab.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Save Section */}
            <View style={styles.saveSection}>
              <TouchableOpacity style={styles.layersButton}>
                <MaterialCommunityIcons name="layers-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.confirmButton} onPress={handleSave}>
                <MaterialCommunityIcons name="bookmark-outline" size={20} color="#5E33E1" />
                <Text style={styles.confirmButtonText}>Save Look</Text>
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
    borderRadius: 36,
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
    borderRadius: 18,
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
    color: '#5E33E1',
    fontSize: 17,
    fontWeight: '800',
  },
});





