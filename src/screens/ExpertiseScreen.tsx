import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Header, ProgressIndicator, Button } from '../components';
import { useWizard } from '../context/WizardContext';
import { RootStackParamList } from '../types';

type ExpertiseScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Expertise'
>;

interface Props {
  navigation: ExpertiseScreenNavigationProp;
}

export function ExpertiseScreen({ navigation }: Props) {
  const { data, setExpertise } = useWizard();

  const handleContinue = () => {
    navigation.navigate('TechLeverage');
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
          <ProgressIndicator currentStep={1} totalSteps={3} />

          <View style={styles.content}>
            <Text style={styles.question}>
              What domain do you actually understand?
            </Text>
            <Text style={styles.description}>
              Real expertise from work, hobbies, or lived experience — not just interest
            </Text>

            <TextInput
              style={styles.input}
              placeholder="e.g. Restaurant operations — I've worked in kitchens for 5 years and know the chaos..."
              placeholderTextColor="#666666"
              value={data.expertise}
              onChangeText={setExpertise}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.footer}>
            <View style={styles.spacer} />
            <Button
              title="Continue"
              onPress={handleContinue}
              showArrow
              arrowDirection="right"
              disabled={data.expertise.trim().length === 0}
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
  spacer: {
    width: 100,
  },
});
