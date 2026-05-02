import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { CameraView } from 'expo-camera';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import { Animated, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Import Visuals and Icons
import { EyebrowsPair, LipsCurve, EyeCurve } from '../../components/visuals/FacialDetection';
import { SymmetryIcon, FillIcon, StyleIcon } from '../../components/icons/BrandedIcons';

const ACTION_DATA: Record<string, any[]> = {
  'EYEBROW': [
    { id: 'symmetry', title: 'Symmetry', sub: 'Match & balance', icon: SymmetryIcon },
    { id: 'fill', title: 'Fill', sub: 'Sparse areas', icon: FillIcon },
    { id: 'style', title: 'Style', sub: 'Brush or laminate', icon: StyleIcon },
  ],
  'LIPS': [
    { id: 'shape', title: 'Shape', sub: 'Refine & define', icon: 'auto-fix' },
    { id: 'color', title: 'Color', sub: 'Vibrant shades', icon: 'palette' },
    { id: 'texture', title: 'Texture', sub: 'Gloss or matte', icon: 'shimmer' },
  ],
  'EYES': [
    { id: 'shadow', title: 'Shadow', sub: 'Blend & shade', icon: 'eye-plus' },
    { id: 'liner', title: 'Liner', sub: 'Sharp & bold', icon: 'pencil' },
    { id: 'lashes', title: 'Lashes', sub: 'Volume & length', icon: 'brush' },
  ],
  'DEFAULT': [
    { id: 'refine', title: 'Refine', sub: 'AI Optimization', icon: 'auto-fix' },
    { id: 'perfect', title: 'Perfect', sub: 'Final touches', icon: 'check-all' },
  ]
};

export default function DetectionProcessing() {
  const { photoUri, selectedPart } = useLocalSearchParams<{ photoUri: string, selectedPart: string }>();
  const [showActions, setShowActions] = React.useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const modalAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // After showing the detection for 2 seconds, show the action modal
    const timer = setTimeout(() => {
      setShowActions(true);
      Animated.spring(modalAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleActionSelect = () => {
    router.push({
      pathname: '/guided-makeup' as any,
      params: { photoUri, selectedPart }
    });
  };

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

  const actions = ACTION_DATA[selectedPart?.toUpperCase() || 'DEFAULT'] || ACTION_DATA.DEFAULT;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <CameraView 
        style={styles.backgroundImage}
        facing="front"
      >
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

          {/* Detection Visuals */}
          <Animated.View style={[styles.detectionLayer, { opacity: fadeAnim }]}>
            {!showActions && (
              <>
                {(selectedPart?.toUpperCase() === 'EYEBROW' || selectedPart?.toUpperCase() === 'LOOKS') && (
                  <EyebrowsPair />
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
              </>
            )}

            {/* Action Modal */}
            {showActions && (
              <Animated.View style={[
                styles.modalContainer, 
                { 
                  opacity: modalAnim,
                  transform: [{ scale: modalAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1]
                  }) }] 
                }
              ]}>
                <View style={[styles.modalContent, { width: '100%' }]}>
                  <Text style={styles.modalTitle}>What would you like to do?</Text>
                  <Text style={styles.modalSub}>CHOOSE ACTION</Text>
                  
                  <View style={styles.actionList}>
                    {actions.map((action) => {
                      const Icon = action.icon;
                      return (
                        <TouchableOpacity 
                          key={action.id} 
                          style={styles.actionItem}
                          onPress={handleActionSelect}
                        >
                          <View style={styles.actionIconContainer}>
                            {typeof Icon === 'function' ? (
                              <Icon />
                            ) : (
                              <MaterialCommunityIcons name={Icon} size={20} color="#FFFFFF" />
                            )}
                          </View>
                          <View style={styles.actionTextContainer}>
                            <Text style={styles.actionTitle}>{action.title}</Text>
                            <Text style={styles.actionSubtitle}>{action.sub}</Text>
                          </View>
                          <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.3)" />
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </Animated.View>
            )}
          </Animated.View>
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
  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 100,
    backgroundColor: 'rgba(0,0,0,0.2)', // Subtle dim when modal appears
  },
  modalContent: {
    backgroundColor: 'rgba(12, 12, 12, 0.92)',
    borderRadius: 28,
    padding: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    shadowColor: '#000',
    shadowRadius: 30,
    shadowOpacity: 0.5,
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSub: {
    color: '#9CA3AF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 25,
  },
  actionList: {
    gap: 12,
  },
  actionItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  actionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(94, 51, 225, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  actionSubtitle: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 2,
  },
});
