import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ImageBackground, Animated, Easing, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Svg, { Path } from 'react-native-svg';

const EyebrowCurve = ({ style }: { style: any }) => (
  <View style={style}>
    <Svg width="120" height="40" viewBox="0 0 120 40" fill="none">
      <Path 
        d="M10 30C30 10 90 10 110 30" 
        stroke="#D8B4FE" 
        strokeWidth="2.5" 
        strokeLinecap="round"
        opacity="0.9"
      />
      <Path 
        d="M10 35C30 15 90 15 110 35" 
        stroke="#D8B4FE" 
        strokeWidth="1" 
        strokeLinecap="round"
        opacity="0.5"
      />
    </Svg>
  </View>
);

const LipsCurve = () => (
  <View style={styles.lipsContainer}>
    <Svg width="100" height="40" viewBox="0 0 100 40" fill="none">
      <Path 
        d="M10 20C25 5 75 5 90 20C75 35 25 35 10 20Z" 
        stroke="#D8B4FE" 
        strokeWidth="2" 
        strokeLinecap="round"
        opacity="0.8"
      />
    </Svg>
  </View>
);

const EyeCurve = ({ style }: { style: any }) => (
  <View style={style}>
    <Svg width="80" height="40" viewBox="0 0 80 40" fill="none">
      <Path 
        d="M10 20C20 10 60 10 70 20C60 30 20 30 10 20Z" 
        stroke="#D8B4FE" 
        strokeWidth="2" 
        strokeLinecap="round"
        opacity="0.8"
      />
    </Svg>
  </View>
);

export default function DetectionProcessing() {
  const { photoUri, selectedPart } = useLocalSearchParams<{ photoUri: string, selectedPart: string }>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // After showing the detection for 2.5 seconds, go to Comparison
    const timer = setTimeout(() => {
      router.push({
        pathname: '/Comparison',
        params: { photoUri }
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const getLabel = () => {
    switch (selectedPart?.toUpperCase()) {
      case 'EYEBROW': return "Eyebrow's Detected";
      case 'LIPS': return "Lips Detected";
      case 'EYES': return "Eyes Detected";
      case 'FACE': return "Face Structure Detected";
      case 'LOOKS': return "Total Look Mapped";
      default: return `${selectedPart} Detected`;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ImageBackground 
        source={photoUri ? { uri: photoUri } : require('../assets/images/logo_main.png')} 
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.5, tintColor: '#222' }}
      >
        <SafeAreaView style={styles.overlay}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.brandText}>GLAMGUIDE AI</Text>
            <TouchableOpacity style={styles.headerBtn}>
              <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Detection Visuals */}
          <Animated.View style={[styles.detectionLayer, { opacity: fadeAnim }]}>
            {(selectedPart?.toUpperCase() === 'EYEBROW' || selectedPart?.toUpperCase() === 'LOOKS') && (
              <>
                <EyebrowCurve style={styles.eyebrowLeft} />
                <EyebrowCurve style={styles.eyebrowRight} />
              </>
            )}

            {(selectedPart?.toUpperCase() === 'LIPS' || selectedPart?.toUpperCase() === 'LOOKS') && (
              <LipsCurve />
            )}

            {(selectedPart?.toUpperCase() === 'EYES' || selectedPart?.toUpperCase() === 'LOOKS') && (
              <>
                <EyeCurve style={styles.eyeLeft} />
                <EyeCurve style={styles.eyeRight} />
              </>
            )}

            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>{getLabel()}</Text>
            </View>
          </Animated.View>
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
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  brandText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
  },
  detectionLayer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyebrowLeft: {
    position: 'absolute',
    top: '35%',
    left: '15%',
    transform: [{ scaleX: 1 }],
  },
  eyebrowRight: {
    position: 'absolute',
    top: '35%',
    right: '15%',
    transform: [{ scaleX: -1 }],
  },
  eyeLeft: {
    position: 'absolute',
    top: '42%',
    left: '20%',
  },
  eyeRight: {
    position: 'absolute',
    top: '42%',
    right: '20%',
  },
  lipsContainer: {
    position: 'absolute',
    top: '60%',
    alignSelf: 'center',
  },
  statusBadge: {
    position: 'absolute',
    bottom: '15%',
    backgroundColor: 'rgba(20, 20, 20, 0.85)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(216, 180, 254, 0.2)',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D8B4FE',
    shadowColor: '#D8B4FE',
    shadowRadius: 5,
    shadowOpacity: 0.8,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    opacity: 0.9,
  },
});
