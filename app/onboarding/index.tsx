import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const ONBOARDING_DATA = [
  {
    id: 1,
    title: 'Try Makeup in Real Time',
    image: require('../../assets/images/makeup.png'),
  },
  {
    id: 2,
    title: 'Discover Your Style',
    image: require('../../assets/images/Discover.png'),
  },
  {
    id: 3,
    title: 'Step-by-Step Guidance',
    image: require('../../assets/images/step-by-step.png'),
    buttonText: 'GET STARTED',
  },
];

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Navigate to Authentication screen
      router.push('/authentication' as any);
    }
  };



  const currentStep = ONBOARDING_DATA[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
  

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image 
            source={currentStep.image} 
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        
        <Text style={styles.title}>{currentStep.title}</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>
            {currentStep.buttonText || 'NEXT'}
          </Text>
        </TouchableOpacity>

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {ONBOARDING_DATA.map((_, index) => (
            <View 
              key={index}
              style={[
                styles.dot,
                index === currentIndex ? styles.activeDot : styles.inactiveDot
              ]}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  brandName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#000000',
    letterSpacing: 1,
  },
  skipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5A31F4',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  imageContainer: {
    width: width * 0.8,
    height: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#3B2F57', // Darker purple from the screenshot for "NEXT"
    width: '100%',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
  pagination: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    height: 4,
    borderRadius: 2,
  },
  activeDot: {
    width: 20,
    backgroundColor: '#5A31F4',
  },
  inactiveDot: {
    width: 8,
    backgroundColor: '#E5E7EB',
  },
});
