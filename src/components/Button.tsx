import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'text';
  showArrow?: boolean;
  arrowDirection?: 'left' | 'right';
  disabled?: boolean;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  showArrow = false,
  arrowDirection = 'right',
  disabled = false,
}: ButtonProps) {
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return [styles.button, styles.primaryButton, disabled && styles.disabledButton];
      case 'secondary':
        return [styles.button, styles.secondaryButton];
      case 'text':
        return [styles.button, styles.textButton];
      default:
        return [styles.button, styles.primaryButton];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'primary':
        return [styles.buttonText, styles.primaryText];
      case 'secondary':
        return [styles.buttonText, styles.secondaryText];
      case 'text':
        return [styles.buttonText, styles.textButtonText];
      default:
        return [styles.buttonText, styles.primaryText];
    }
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {showArrow && arrowDirection === 'left' && (
          <Text style={getTextStyle()}>← </Text>
        )}
        <Text style={getTextStyle()}>{title}</Text>
        {showArrow && arrowDirection === 'right' && (
          <Text style={getTextStyle()}> →</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    minWidth: 120,
  },
  primaryButton: {
    backgroundColor: '#333333',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#444444',
  },
  textButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
  },
  disabledButton: {
    backgroundColor: '#222222',
    opacity: 0.6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#AAAAAA',
  },
  textButtonText: {
    color: '#888888',
  },
});
