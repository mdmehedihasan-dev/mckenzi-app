import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, ScrollView, Button } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { CameraView, useCameraPermissions } from 'expo-camera';

const STEPS = [
  'MENU',
  'EYEBROW_DETECT',
  'ACTION_POPUP',
  'GUIDED_EYES',
];

export default function MakeupEditor() {
  const [stepIndex, setStepIndex] = useState(0);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission}>
          <Text style={styles.permissionBtnText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const nextStep = () => {
    if (stepIndex < STEPS.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      router.push('/Comparison');
    }
  };

  const prevStep = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    } else {
      router.back();
    }
  };

  const currentStep = STEPS[stepIndex];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <CameraView 
        style={styles.camera} 
        facing="front"
      >
        <SafeAreaView style={styles.overlay}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={prevStep} style={styles.headerBtn}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.brandText}>GLAMGUIDE AI</Text>
            <TouchableOpacity style={styles.headerBtn}>
              <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Main Visual Overlays based on Step */}
          <View style={styles.visualLayer}>
            {currentStep === 'EYEBROW_DETECT' && (
              <View style={styles.svgMock}>
                {/* Mock Eyebrow Curves */}
                <View style={[styles.eyebrowCurve, { top: '35%', left: '25%', transform: [{ rotate: '-10deg' }] }]} />
                <View style={[styles.eyebrowCurve, { top: '35%', right: '25%', transform: [{ rotate: '10deg' }] }]} />
                <View style={styles.detectionLabel}>
                  <Text style={styles.detectionText}>Eyebrows Detected</Text>
                </View>
              </View>
            )}

            {currentStep === 'GUIDED_EYES' && (
              <View style={styles.svgMock}>
                {/* Mock Eye Shadow Guides */}
                <View style={[styles.eyeGuide, { top: '45%', left: '30%' }]} />
                <View style={[styles.eyeGuide, { top: '45%', right: '30%' }]} />
              </View>
            )}
          </View>

          {/* Bottom Interaction Area */}
          <View style={styles.bottomArea}>
            {currentStep === 'MENU' && (
              <View style={styles.menuContainer}>
                <View style={styles.categoryScroll}>
                   <TouchableOpacity style={styles.categoryItem}>
                     <MaterialCommunityIcons name="lipstick" size={24} color="#A855F7" />
                     <Text style={[styles.categoryText, { color: '#A855F7' }]}>LIPS</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.categoryItem}>
                     <Ionicons name="eye-outline" size={24} color="#FFFFFF" />
                     <Text style={styles.categoryText}>EYES</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.categoryItem}>
                     <MaterialCommunityIcons name="face-woman-outline" size={24} color="#FFFFFF" />
                     <Text style={styles.categoryText}>FACE</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.categoryItem}>
                     <Ionicons name="sparkles-outline" size={24} color="#FFFFFF" />
                     <Text style={styles.categoryText}>LOOKS</Text>
                   </TouchableOpacity>
                </View>
                
                <TouchableOpacity style={styles.mainActionBtn} onPress={nextStep}>
                  <Text style={styles.mainActionText}>Save Look</Text>
                </TouchableOpacity>
              </View>
            )}

            {currentStep === 'EYEBROW_DETECT' && (
                <TouchableOpacity style={styles.nextFloatingBtn} onPress={nextStep}>
                  <Ionicons name="chevron-forward" size={32} color="#FFFFFF" />
                </TouchableOpacity>
            )}

            {currentStep === 'ACTION_POPUP' && (
              <View style={styles.glassPopup}>
                <Text style={styles.popupTitle}>What would you like to do?</Text>
                <View style={styles.optionList}>
                  <TouchableOpacity style={styles.optionItem} onPress={nextStep}>
                    <View style={[styles.optionIcon, { backgroundColor: '#581C87' }]}>
                      <MaterialCommunityIcons name="vector-selection" size={20} color="#FFFFFF" />
                    </View>
                    <View>
                      <Text style={styles.optionText}>Symmetry</Text>
                      <Text style={styles.optionSub}>Analyze & Balance</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.optionItem} onPress={nextStep}>
                    <View style={[styles.optionIcon, { backgroundColor: '#7E22CE' }]}>
                      <MaterialCommunityIcons name="format-color-fill" size={20} color="#FFFFFF" />
                    </View>
                    <View>
                      <Text style={styles.optionText}>Fill</Text>
                      <Text style={styles.optionSub}>Eyebrow Fill</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.optionItem} onPress={nextStep}>
                    <View style={[styles.optionIcon, { backgroundColor: '#A855F7' }]}>
                      <FontAwesome5 name="magic" size={16} color="#FFFFFF" />
                    </View>
                    <View>
                      <Text style={styles.optionText}>Style</Text>
                      <Text style={styles.optionSub}>Eyebrow Grooming</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {currentStep === 'GUIDED_EYES' && (
              <View style={styles.guideCard}>
                <View style={styles.guideHeader}>
                  <Text style={styles.stepCounter}>STEP 2 OF 05</Text>
                </View>
                <Text style={styles.guideInstruction}>
                   Apply the base shadow evenly across the eyelid using a flat brush.
                </Text>
                <View style={styles.guideFooter}>
                   <TouchableOpacity onPress={prevStep}>
                     <Text style={styles.backLink}>Back</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.nextStepBtn} onPress={nextStep}>
                     <Text style={styles.nextStepText}>NEXT</Text>
                     <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
                   </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
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
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'space-between',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  permissionText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionBtn: {
    backgroundColor: '#A855F7',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  permissionBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
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
  brandText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
  },
  visualLayer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgMock: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyebrowCurve: {
    position: 'absolute',
    width: 80,
    height: 30,
    borderTopWidth: 3,
    borderColor: 'rgba(216, 180, 254, 0.8)',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  detectionLabel: {
    position: 'absolute',
    bottom: '25%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  detectionText: {
    color: '#D8B4FE',
    fontSize: 10,
    fontWeight: '600',
  },
  eyeGuide: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'rgba(168, 85, 247, 0.5)',
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
  },
  bottomArea: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  menuContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
  },
  categoryScroll: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: 'center',
    gap: 4,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  mainActionBtn: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainActionText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '700',
  },
  nextFloatingBtn: {
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(168, 85, 247, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  glassPopup: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  popupTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
  },
  optionList: {
    gap: 12,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 12,
    borderRadius: 16,
    gap: 16,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  optionSub: {
    color: '#9CA3AF',
    fontSize: 10,
  },
  guideCard: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 24,
    padding: 24,
  },
  guideHeader: {
    marginBottom: 12,
  },
  stepCounter: {
    color: '#9CA3AF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  guideInstruction: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  guideFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backLink: {
    color: '#A855F7',
    fontSize: 14,
    fontWeight: '600',
  },
  nextStepBtn: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  nextStepText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '800',
  },
});
