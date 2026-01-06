import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>INCEPTION</Text>
      <Text style={styles.subtitle}>
        Your expertise × Tech leverage = Your{'\n'}differentiated product
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 8,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#AAAAAA',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 24,
  },
});
