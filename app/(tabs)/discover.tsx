import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function Discover() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Discover Trends</Text>
        <Text style={styles.sub}>Coming soon...</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  sub: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  }
});
