import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export const EyebrowsPair = () => (
  <View style={StyleSheet.absoluteFill}>
    <Svg width="100%" height="100%" viewBox="0 0 390 884" fill="none">
      <Path 
        d="M41 320C14.5 329.238 6 353.262 6 353.262C6 353.262 36 332.762 54.5 333.762C73 334.762 148.5 366.5 155.5 365.5C162.5 364.5 161 348 150.5 338.5C140 329 67.5 310.762 41 320Z" 
        stroke="#D8B4FE" 
        strokeWidth="2"
      />
      <Path 
        d="M355.789 321C382.289 330.238 390.789 354.262 390.789 354.262C390.789 354.262 360.789 333.762 342.289 334.762C323.789 335.762 248.289 367.5 241.289 366.5C234.289 365.5 235.789 349 246.289 339.5C256.789 330 329.289 311.762 355.789 321Z" 
        stroke="#D8B4FE" 
        strokeWidth="2"
      />
    </Svg>
  </View>
);

export const LipsCurve = () => (
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

export const EyeCurve = ({ style }: { style: any }) => (
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

const styles = StyleSheet.create({
  lipsContainer: {
    position: 'absolute',
    top: '62%',
    alignSelf: 'center',
  },
});
