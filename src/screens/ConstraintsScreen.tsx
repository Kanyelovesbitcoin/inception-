import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Header, ProgressIndicator, Button } from '../components';
import { useWizard } from '../context/WizardContext';
import { RootStackParamList } from '../types';

type ConstraintsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Constraints'
>;

interface Props {
  navigation: ConstraintsScreenNavigationProp;
}

export function ConstraintsScreen({ navigation }: Props) {
  const { data, setConstraints } = useWizard();

  const handleFindProduct = () => {
    navigation.navigate('Results');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Header />
          <ProgressIndicator currentStep={3} totalSteps={3} />

          <View style={styles.content}>
            <Text style={styles.question}>Any specific angle or constraint?</Text>
            <Text style={styles.description}>
              Optional: target audience, problem to solve, or direction to explore
            </Text>

            <TextInput
              style={styles.input}
              placeholder="e.g. Small restaurants, reducing food waste, solo founders..."
              placeholderTextColor="#666666"
              value={data.constraints}
              onChangeText={setConstraints}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.footer}>
            <Button
              title="Back"
              onPress={handleBack}
              variant="text"
              showArrow
              arrowDirection="left"
            />
            <Button
              title="Find Your Product"
              onPress={handleFindProduct}
              showArrow
              arrowDirection="right"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    marginTop: 16,
  },
  question: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  description: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#FFFFFF',
    minHeight: 120,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
  },
});
