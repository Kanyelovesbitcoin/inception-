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

type TechLeverageScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TechLeverage'
>;

interface Props {
  navigation: TechLeverageScreenNavigationProp;
}

export function TechLeverageScreen({ navigation }: Props) {
  const { data, setTechLeverage } = useWizard();

  const handleContinue = () => {
    navigation.navigate('Constraints');
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
          <ProgressIndicator currentStep={2} totalSteps={3} />

          <View style={styles.content}>
            <Text style={styles.question}>What tech can you leverage?</Text>
            <Text style={styles.description}>
              AI, automation, crypto, APIs, mobile, hardware — what's your multiplier?
            </Text>

            <TextInput
              style={[styles.input, Platform.OS === 'android' && { textAlignVertical: 'top' }]}
              placeholder="e.g. AI, workflow automation, mobile apps..."
              placeholderTextColor="#666666"
              value={data.techLeverage}
              onChangeText={setTechLeverage}
              multiline
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
              title="Continue"
              onPress={handleContinue}
              showArrow
              arrowDirection="right"
              disabled={data.techLeverage.trim().length === 0}
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
