import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { CameraView } from 'expo-camera';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import { Animated, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

const SymmetryIcon = () => (
  <Svg width="15" height="8" viewBox="0 0 15 8" fill="none">
    <Path d="M1.25 7.83333C0.888889 7.83333 0.590278 7.71528 0.354167 7.47917C0.118056 7.24306 0 6.94444 0 6.58333V1.25C0 0.888889 0.118056 0.590278 0.354167 0.354167C0.590278 0.118056 0.888889 0 1.25 0H13.25C13.6111 0 13.9097 0.118056 14.1458 0.354167C14.3819 0.590278 14.5 0.888889 14.5 1.25V6.58333C14.5 6.94444 14.3819 7.24306 14.1458 7.47917C13.9097 7.71528 13.6111 7.83333 13.25 7.83333H1.25ZM1.25 7.25H13.25C13.4167 7.25 13.5694 7.18056 13.7083 7.04167C13.8472 6.90278 13.9167 6.75 13.9167 6.58333V1.25C13.9167 1.08333 13.8472 0.930556 13.7083 0.791667C13.5694 0.652778 13.4167 0.583333 13.25 0.583333H10.875V3.08333H10.2917V0.583333H7.54167V3.08333H6.95833V0.583333H4.20833V3.08333H3.625V0.583333H1.25C1.08333 0.583333 0.930556 0.652778 0.791667 0.791667C0.652778 0.930556 0.583333 1.08333 0.583333 1.25V6.58333C0.583333 6.75 0.652778 6.90278 0.791667 7.04167C0.930556 7.18056 1.08333 7.25 1.25 7.25ZM3.625 3.08333H4.20833H3.625ZM6.95833 3.08333H7.54167H6.95833ZM10.2917 3.08333H10.875H10.2917Z" fill="white"/>
  </Svg>
);

const FillIcon = () => (
  <Svg width="12" height="15" viewBox="0 0 12 15" fill="none">
    <Path d="M5.75 12.4167C5.86111 12.4028 5.94444 12.3681 6 12.3125C6.05556 12.2569 6.08333 12.1875 6.08333 12.1042C6.08333 12.0069 6.04861 11.934 5.97917 11.8854C5.90972 11.8368 5.82639 11.8194 5.72917 11.8333C5.15972 11.875 4.51389 11.691 3.79167 11.2812C3.06944 10.8715 2.625 10.2014 2.45833 9.27083C2.43056 9.14583 2.39236 9.05556 2.34375 9C2.29514 8.94444 2.22917 8.91667 2.14583 8.91667C2.0625 8.91667 1.98958 8.94792 1.92708 9.01042C1.86458 9.07292 1.84722 9.18056 1.875 9.33333C2.08333 10.4583 2.61111 11.2639 3.45833 11.75C4.30556 12.2361 5.06944 12.4583 5.75 12.4167ZM5.58333 14.1667C3.98611 14.1667 2.65625 13.6181 1.59375 12.5208C0.53125 11.4236 0 10.0556 0 8.41667C0 7.27778 0.461806 6.01042 1.38542 4.61458C2.30903 3.21875 3.70833 1.68056 5.58333 0C7.45833 1.68056 8.85764 3.21875 9.78125 4.61458C10.7049 6.01042 11.1667 7.27778 11.1667 8.41667C11.1667 10.0556 10.6354 11.4236 9.57292 12.5208C8.51042 13.6181 7.18056 14.1667 5.58333 14.1667ZM5.58333 13.5833C7.02778 13.5833 8.22222 13.0938 9.16667 12.1146C10.1111 11.1354 10.5833 9.90278 10.5833 8.41667C10.5833 7.40278 10.1632 6.25694 9.32292 4.97917C8.48264 3.70139 7.23611 2.30556 5.58333 0.791667C3.93056 2.30556 2.68403 3.70139 1.84375 4.97917C1.00347 6.25694 0.583333 7.40278 0.583333 8.41667C0.583333 9.90278 1.05556 11.1354 2 12.1146C2.94444 13.0938 4.13889 13.5833 5.58333 13.5833Z" fill="white"/>
  </Svg>
);

const StyleIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path d="M0 8.125V7.54167H3.91667V8.125H0ZM4.83333 5.25L3.41667 3.83333L3.83333 3.41667L5.25 4.83333L4.83333 5.25ZM7.54167 3.91667V0H8.125V3.91667H7.54167ZM10.8333 5.25L10.4167 4.83333L11.8333 3.41667L12.25 3.83333L10.8333 5.25ZM11.75 8.125V7.54167H15.6667V8.125H11.75ZM7.83333 9.25C7.43056 9.25 7.09375 9.11458 6.82292 8.84375C6.55208 8.57292 6.41667 8.23611 6.41667 7.83333C6.41667 7.43056 6.55208 7.09375 6.82292 6.82292C7.09375 6.55208 7.43056 6.41667 7.83333 6.41667C8.23611 6.41667 8.57292 6.55208 8.84375 6.82292C9.11458 7.09375 9.25 7.43056 9.25 7.83333C9.25 8.23611 9.11458 8.57292 8.84375 8.84375C8.57292 9.11458 8.23611 9.25 7.83333 9.25ZM11.8333 12.25L10.4167 10.8333L10.8333 10.4167L12.25 11.8333L11.8333 12.25ZM3.83333 12.25L3.41667 11.8333L4.83333 10.4167L5.25 10.8333L3.83333 12.25ZM7.54167 15.6667V11.75H8.125V15.6667H7.54167Z" fill="white"/>
  </Svg>
);

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
      pathname: '/GuidedMakeup',
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
            <TouchableOpacity style={styles.headerBtn}>
              <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Detection Visuals */}
          <Animated.View style={[styles.detectionLayer, { opacity: fadeAnim }]}>
            {!showActions && (
              <>
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
