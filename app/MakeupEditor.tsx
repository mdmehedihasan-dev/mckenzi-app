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

const FaceIcon = ({ color }: { color: string }) => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Path 
      d="M7 12.25C6.65 12.25 6.35417 12.1292 6.1125 11.8875C5.87083 11.6458 5.75 11.35 5.75 11C5.75 10.65 5.87083 10.3542 6.1125 10.1125C6.35417 9.87083 6.65 9.75 7 9.75C7.35 9.75 7.64583 9.87083 7.8875 10.1125C8.12917 10.3542 8.25 10.65 8.25 11C8.25 11.35 8.12917 11.6458 7.8875 11.8875C7.64583 12.1292 7.35 12.25 7 12.25ZM13 12.25C12.65 12.25 12.3542 12.1292 12.1125 11.8875C11.8708 11.6458 11.75 11.35 11.75 11C11.75 10.65 11.8708 10.3542 12.1125 10.1125C12.3542 9.87083 12.65 9.75 13 9.75C13.35 9.75 13.6458 9.87083 13.8875 10.1125C14.1292 10.3542 14.25 10.65 14.25 11C14.25 11.35 14.1292 11.6458 13.8875 11.8875C13.6458 12.1292 13.35 12.25 13 12.25ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 9.6 17.975 9.2125 17.925 8.8375C17.875 8.4625 17.7833 8.1 17.65 7.75C17.3 7.83333 16.95 7.89583 16.6 7.9375C16.25 7.97917 15.8833 8 15.5 8C13.9833 8 12.55 7.675 11.2 7.025C9.85 6.375 8.7 5.46667 7.75 4.3C7.21667 5.6 6.45417 6.72917 5.4625 7.6875C4.47083 8.64583 3.31667 9.36667 2 9.85C2 9.88333 2 9.90833 2 9.925C2 9.94167 2 9.96667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM8.65 2.125C9.35 3.29167 10.3 4.22917 11.5 4.9375C12.7 5.64583 14.0333 6 15.5 6C15.7333 6 15.9583 5.9875 16.175 5.9625C16.3917 5.9375 16.6167 5.90833 16.85 5.875C16.15 4.70833 15.2 3.77083 14 3.0625C12.8 2.35417 11.4667 2 10 2C9.76667 2 9.54167 2.0125 9.325 2.0375C9.10833 2.0625 8.88333 2.09167 8.65 2.125ZM2.425 7.475C3.275 6.99167 4.01667 6.36667 4.65 5.6C5.28333 4.83333 5.75833 3.975 6.075 3.025C5.225 3.50833 4.48333 4.13333 3.85 4.9C3.21667 5.66667 2.74167 6.525 2.425 7.475Z" 
      fill={color} 
    />
  </Svg>
);

const LooksIcon = ({ color }: { color: string }) => (
  <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <Path 
      d="M18 8L16.75 5.25L14 4L16.75 2.75L18 0L19.25 2.75L22 4L19.25 5.25L18 8ZM18 22L16.75 19.25L14 18L16.75 16.75L18 14L19.25 16.75L22 18L19.25 19.25L18 22ZM8 19L5.5 13.5L0 11L5.5 8.5L8 3L10.5 8.5L16 11L10.5 13.5L8 19ZM8 14.15L9 12L11.15 11L9 10L8 7.85L7 10L4.85 11L7 12L8 14.15Z" 
      fill={color} 
    />
  </Svg>
);

const EyebrowIcon = ({ color }: { color: string }) => (
  <Svg width="20" height="7" viewBox="0 0 20 7" fill="none">
    <Path 
      d="M16.3059 0.932107C17.8542 1.44479 19.1888 2.21449 19.9089 3.30461C19.9838 3.41812 20.0135 3.5449 19.9943 3.67026C19.9752 3.79563 19.9081 3.91445 19.8008 4.01295C19.6934 4.11146 19.5503 4.18562 19.3879 4.22685C19.2256 4.26807 19.0506 4.27466 18.8833 4.24587C13.4675 3.31396 8.20094 3.56619 5.10047 5.7906C2 8.01501 1.52747 5.89141 0.617404 4.98887C0.144121 4.52888 -0.0697822 3.95276 0.0200862 3.38005C0.3292 1.50754 3.5349 0.706472 5.6496 0.354C9.08714 -0.218098 13.0574 -0.144666 16.3059 0.932107Z" 
      fill={color} 
    />
  </Svg>
);

const LayersIcon = ({ color }: { color: string }) => (
  <Svg width="18" height="22" viewBox="0 0 18 22" fill="none">
    <Path 
      d="M7 22V20H2C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V4C0 3.45 0.195833 2.97917 0.5875 2.5875C0.979167 2.19583 1.45 2 2 2H7V0H9V22H7ZM2 17H7V11L2 17ZM11 20V11L16 17V4H11V2H16C16.55 2 17.0208 2.19583 17.4125 2.5875C17.8042 2.97917 18 3.45 18 4V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H11Z" 
      fill={color} 
    />
  </Svg>
);

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
            
            

            {/* Main Tabs */}
            <View style={styles.tabsContainer}>
              {/* Quick Actions */}
            <View style={styles.quickActionsRow}>
              <TouchableOpacity 
                style={[styles.actionCircle, activeAction === 'swap' && { backgroundColor: '#362645', borderColor: '#362645' }]} 
                onPress={() => setActiveAction('swap')}
              >
                <Ionicons 
                  name="swap-horizontal" 
                  size={22} 
                  color="#FFFFFF" 
                />
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
                <LayersIcon color="#FFFFFF" />
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
    color: '#5E33E1',
    fontSize: 17,
    fontWeight: '800',
  },
});





