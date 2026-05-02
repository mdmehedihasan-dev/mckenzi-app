import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ImageBackground, Animated, Easing, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function FaceAnalysis() {
  const { photoUri } = useLocalSearchParams<{ photoUri: string }>();
  const scanAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Loop the scanning line animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 1,
          duration: 2500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scanAnim, {
          toValue: 0,
          duration: 2500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // After 4.5 seconds of "scanning", navigate to the Editor
    const timer = setTimeout(() => {
      router.push({
        pathname: '/MakeupEditor',
        params: { photoUri }
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const translateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [150, 500], 
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ImageBackground 
        source={photoUri ? { uri: photoUri } : require('../assets/images/face_clean.png')} 
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.6, tintColor: '#4A4A4A' }} // Desaturated look
      >
        <SafeAreaView style={styles.overlay}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerBtn}>
              <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Scanning Line */}
          <Animated.View style={[styles.scanLine, { transform: [{ translateY }] }]}>
            <View style={styles.scanBadge}>
              <View style={styles.pulseDot} />
              <Text style={styles.scanText}>ANALYZING FEATURES</Text>
            </View>
          </Animated.View>

          {/* Face Points (Dots) - Density matching screenshot */}
          <View style={styles.pointsContainer}>
            {/* Forehead */}
            <View style={[styles.point, { top: '28%', left: '47%', opacity: 0.8 }]} />
            
            {/* Eyes */}
            <View style={[styles.point, { top: '38%', left: '30%' }]} />
            <View style={[styles.point, { top: '38%', left: '35%' }]} />
            <View style={[styles.point, { top: '38%', left: '60%' }]} />
            <View style={[styles.point, { top: '38%', left: '65%' }]} />
            
            {/* Nose */}
            <View style={[styles.point, { top: '45%', left: '47%' }]} />
            <View style={[styles.point, { top: '48%', left: '44%' }]} />
            <View style={[styles.point, { top: '48%', left: '50%' }]} />
            <View style={[styles.point, { top: '53%', left: '47%' }]} />

            {/* Lips */}
            <View style={[styles.point, { top: '60%', left: '40%' }]} />
            <View style={[styles.point, { top: '60%', left: '54%' }]} />
            <View style={[styles.point, { top: '63%', left: '47%' }]} />
            <View style={[styles.point, { top: '66%', left: '47%', width: 4, height: 4 }]} />

            {/* Jawline */}
            <View style={[styles.point, { top: '68%', left: '25%', opacity: 0.4 }]} />
            <View style={[styles.point, { top: '72%', left: '35%', opacity: 0.4 }]} />
            <View style={[styles.point, { top: '75%', left: '47%', opacity: 0.4 }]} />
            <View style={[styles.point, { top: '72%', left: '59%', opacity: 0.4 }]} />
            <View style={[styles.point, { top: '68%', left: '69%', opacity: 0.4 }]} />
          </View>

          <View style={styles.footer}>
            <View style={styles.glassBadge}>
               <Text style={styles.badgeText}>FACE MAPPING ACTIVE</Text>
            </View>
            <Text style={styles.footerTitle}>Precision Analysis</Text>
            <Text style={styles.footerSub}>Our AI is mapping your unique facial structure for the perfect makeup fit.</Text>
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
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#A855F7',
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
    zIndex: 10,
  },
  scanBadge: {
    position: 'absolute',
    top: -35,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.5)',
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#A855F7',
    marginRight: 8,
  },
  scanText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
  },
  pointsContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 5,
  },
  point: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#A855F7',
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  footer: {
    padding: 30,
    paddingBottom: 50,
    alignItems: 'center',
  },
  glassBadge: {
    backgroundColor: 'rgba(168, 85, 247, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 15,
  },
  badgeText: {
    color: '#D8B4FE',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  footerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
  footerSub: {
    color: '#9CA3AF',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
});

