import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ImageBackground, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function FaceAnalysis() {
  const scanAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Loop the scanning line animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scanAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // After 4 seconds of "scanning", navigate to the Editor
    const timer = setTimeout(() => {
      router.push('/MakeupEditor');
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  const translateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [150, 450], // Adjust based on face position
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ImageBackground 
        source={require('../assets/images/face_clean.png')} 
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.7, tintColor: '#555' }} // Desaturate effect
      >
        <SafeAreaView style={styles.overlay}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.closeBtn} />
            <View style={styles.settingsBtn} />
          </View>

          {/* Scanning Line */}
          <Animated.View style={[styles.scanLine, { transform: [{ translateY }] }]}>
            <View style={styles.scanBadge}>
              <View style={styles.pulseDot} />
              <Text style={styles.scanText}>SCANNING</Text>
            </View>
          </Animated.View>

          {/* Face Points (Dots) */}
          <View style={styles.pointsContainer}>
            {/* Mock points on eyes, nose, mouth */}
            <View style={[styles.point, { top: '38%', left: '32%' }]} />
            <View style={[styles.point, { top: '38%', left: '62%' }]} />
            <View style={[styles.point, { top: '48%', left: '47%' }]} />
            <View style={[styles.point, { top: '58%', left: '40%' }]} />
            <View style={[styles.point, { top: '58%', left: '54%' }]} />
            <View style={[styles.point, { top: '65%', left: '47%' }]} />
            {/* Jawline points */}
            <View style={[styles.point, { top: '68%', left: '30%', opacity: 0.5 }]} />
            <View style={[styles.point, { top: '68%', left: '64%', opacity: 0.5 }]} />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerTitle}>Face Analysis</Text>
            <Text style={styles.footerSub}>Identifying facial features for precision makeup application...</Text>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  settingsBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#A855F7', // Purple scan line
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 10,
  },
  scanBadge: {
    position: 'absolute',
    top: -30,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.4)',
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#A855F7',
    marginRight: 6,
  },
  scanText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  pointsContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 5,
  },
  point: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#A855F7',
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  footer: {
    padding: 40,
    alignItems: 'center',
  },
  footerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  footerSub: {
    color: '#D1D5DB',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
});
