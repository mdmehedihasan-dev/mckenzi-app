import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type Phase = 'SCANNING' | 'EYEBROWS' | 'LIPS' | 'FACE';

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

export default function FaceAnalysis() {
  const { photoUri } = useLocalSearchParams<{ photoUri: string }>();
  const [phase, setPhase] = useState<Phase>('SCANNING');
  const scanAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Initial scanning animation
    const scanLoop = Animated.loop(
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
    );
    scanLoop.start();

    // Sequence of detection phases
    const sequence = async () => {
      // Phase 1: Scanning (2 seconds)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Phase 2: Eyebrows
      setPhase('EYEBROWS');
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Phase 3: Lips
      setPhase('LIPS');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Phase 4: Face Analysis Complete
      setPhase('FACE');
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Navigate to Editor
      router.push({
        pathname: '/makeup-editor' as any,
        params: { photoUri }
      });
    };

    sequence();
  }, []);

  const translateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [150, 500], 
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.backgroundImage}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={StyleSheet.absoluteFill} resizeMode="cover" />
        ) : (
          <View style={[StyleSheet.absoluteFill, { backgroundColor: '#1A1A1A' }]} />
        )}
        
        <SafeAreaView style={styles.overlay}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.brandText}>GLAMGUIDE AI</Text>
            <TouchableOpacity 
              style={styles.headerBtn}
              onPress={() => router.push('/settings' as any)}
            >
              <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Scanning Line (Only in SCANNING phase) */}
          {phase === 'SCANNING' && (
            <Animated.View style={[styles.scanLine, { transform: [{ translateY }] }]}>
              <View style={styles.scanBadge}>
                <View style={styles.pulseDot} />
                <Text style={scanTextStyles.text}>ANALYZING FEATURES</Text>
              </View>
            </Animated.View>
          )}

          {/* Detection Visuals */}
          <Animated.View style={[styles.detectionLayer, { opacity: fadeAnim }]}>
            {phase === 'EYEBROWS' && (
              <>
                <EyebrowCurve style={styles.eyebrowLeft} />
                <EyebrowCurve style={styles.eyebrowRight} />
                <View style={styles.statusBadge}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>Eyebrow's Detected</Text>
                </View>
              </>
            )}

            {phase === 'LIPS' && (
              <>
                <LipsCurve />
                <View style={styles.statusBadge}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>Lips Detected</Text>
                </View>
              </>
            )}

            {phase === 'FACE' && (
              <View style={styles.statusBadge}>
                <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
                <Text style={styles.statusText}>Face Analysis Complete</Text>
              </View>
            )}
          </Animated.View>

          {/* Background Point Grid (Subtle) */}
          <View style={styles.gridContainer}>
            {[...Array(12)].map((_, i) => (
              <View key={i} style={[styles.point, { 
                top: `${20 + Math.random() * 60}%`, 
                left: `${20 + Math.random() * 60}%`,
                opacity: phase === 'SCANNING' ? 0.3 : 0.6
              }]} />
            ))}
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}

const scanTextStyles = StyleSheet.create({
  text: {
    color: '#D8B4FE',
    fontSize: 10,
    fontWeight: '800',
  }
});


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
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#D8B4FE',
    shadowColor: '#D8B4FE',
    shadowRadius: 15,
    shadowOpacity: 1,
    zIndex: 10,
  },
  scanBadge: {
    position: 'absolute',
    right: 20,
    top: -30,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scanText: {
    color: '#D8B4FE',
    fontSize: 10,
    fontWeight: '800',
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D8B4FE',
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
  gridContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  point: {
    position: 'absolute',
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#D8B4FE',
  },
});

