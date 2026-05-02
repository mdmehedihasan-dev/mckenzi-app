import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, PanResponder, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';

const { width, height } = Dimensions.get('window');

export default function Comparison() {
  const { photoUri } = useLocalSearchParams<{ photoUri: string }>();
  const [sliderPos, setSliderPos] = useState(width / 2);

  const beforeImage = photoUri ? { uri: photoUri } : require('../assets/images/face_clean.png');
  // For 'After', we use a high-quality makeup result from Unsplash to simulate the AI effect
  const afterImage = { uri: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=2000&auto=format&fit=crop' };

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
      
      {/* Before Image (Bottom Layer) */}
      <View style={styles.imageLayer}>
        <Image 
          source={beforeImage} 
          style={styles.fullImage}
          contentFit="cover"
        />
        <View style={styles.labelContainerLeft}>
          <Text style={styles.label}>BEFORE</Text>
        </View>
      </View>

      {/* After Image (Top Layer, Clipped) */}
      <View style={[styles.imageLayer, { width: sliderPos, overflow: 'hidden', position: 'absolute', top: 0, left: 0, zIndex: 1 }]}>
        <Image 
          source={afterImage} 
          style={[styles.fullImage, { width: width }]} 
          contentFit="cover"
        />
        <View style={styles.labelContainerRight}>
          <Text style={styles.label}>AFTER</Text>
        </View>
      </View>

      {/* Slider Handle */}
      <View 
        style={[styles.sliderHandleContainer, { left: sliderPos - 20 }]} 
        {...panResponder.panHandlers}
      >
        <View style={styles.sliderLine} />
        <View style={styles.sliderCircle}>
           <Ionicons name="swap-horizontal" size={20} color="#000" />
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
              <View style={styles.statsRow}>
                 <Text style={styles.statLabel}>BEFORE</Text>
                 <View style={styles.statDivider} />
                 <Text style={styles.statLabel}>AFTER</Text>
              </View>
              <View style={styles.btnRow}>
                 <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.push('/MakeupEditor')}>
                    <Text style={styles.secondaryBtnText}>Try Another</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/Authentication')}>
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
  },
  fullImage: {
    width: width,
    height: height,
  },
  sliderHandleContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  sliderLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#FFFFFF',
  },
  sliderCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    zIndex: 20,
    pointerEvents: 'box-none',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  compareText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
  },
  labelContainerLeft: {
    position: 'absolute',
    top: '15%',
    left: 20,
  },
  labelContainerRight: {
    position: 'absolute',
    top: '15%',
    right: 20,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    opacity: 0.8,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  glassFooter: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  statLabel: {
    color: '#9CA3AF',
    fontSize: 10,
    fontWeight: '700',
  },
  statDivider: {
    width: 1,
    height: 10,
    backgroundColor: '#374151',
  },
  btnRow: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryBtn: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  secondaryBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '700',
  },
});
