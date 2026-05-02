import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, PanResponder, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { CameraView } from 'expo-camera';

const { width, height } = Dimensions.get('window');

export default function Comparison() {
  const { photoUri } = useLocalSearchParams<{ photoUri: string }>();
  const [sliderPos, setSliderPos] = useState(width / 2);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      let newX = gestureState.moveX;
      if (newX < 0) newX = 0;
      if (newX > width) newX = width;
      setSliderPos(newX);
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Background: Live Camera Feed */}
      <CameraView style={StyleSheet.absoluteFill} facing="front" />

      {/* After Layer (Right side of slider) - Simulated with a beauty tint */}
      <View style={[styles.imageLayer, { left: sliderPos, right: 0, overflow: 'hidden', position: 'absolute', top: 0, zIndex: 1 }]}>
        <View style={styles.beautyOverlay} />
      </View>

      {/* Slider Handle */}
      <View 
        style={[styles.sliderHandleContainer, { left: sliderPos - 20 }]} 
        {...panResponder.panHandlers}
      >
        <View style={styles.sliderLine} />
        <View style={styles.sliderCircle}>
           <View style={styles.purpleDot} />
        </View>
      </View>

      <SafeAreaView style={styles.overlay}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.compareText}>COMPARE</Text>
          <TouchableOpacity style={styles.headerBtn}>
            <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Footer Actions */}
        <View style={styles.footer}>
           <View style={styles.glassFooter}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>BEFORE</Text>
                <Ionicons name="swap-horizontal" size={14} color="#9CA3AF" />
                <Text style={[styles.label, { color: '#FFFFFF' }]}>AFTER</Text>
              </View>
              
              <View style={styles.btnRow}>
                 <TouchableOpacity 
                   style={styles.secondaryBtn} 
                   onPress={() => router.push('/makeup-editor' as any)}
                 >
                    <Text style={styles.secondaryBtnText}>Try Another</Text>
                 </TouchableOpacity>
                 <TouchableOpacity 
                   style={styles.primaryBtn} 
                   onPress={() => router.push('/authentication' as any)}
                 >
                    <Text style={styles.primaryBtnText}>Save Look</Text>
                 </TouchableOpacity>
              </View>
           </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  imageLayer: {
    height: height,
    backgroundColor: 'rgba(216, 180, 254, 0.15)', // Simulated makeup tint
  },
  beautyOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 105, 180, 0.1)', // Subtle pinkish beauty glow
  },
  sliderHandleContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  sliderLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  sliderCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 0.3,
  },
  purpleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#5E33E1',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    zIndex: 50,
    pointerEvents: 'box-none',
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
  compareText: {
    color: '#D8B4FE', // Light purple for COMPARE
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 3,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  glassFooter: {
    backgroundColor: 'rgba(12, 12, 12, 0.85)',
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#000',
    shadowRadius: 20,
    shadowOpacity: 0.4,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    marginBottom: 20,
  },
  label: {
    color: '#9CA3AF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryBtn: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  secondaryBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#3E2B63',
    fontSize: 15,
    fontWeight: '800',
  },
});
