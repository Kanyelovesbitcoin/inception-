import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Header } from '../components';
import { useWizard } from '../context/WizardContext';
import { RootStackParamList } from '../types';

type ResultsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Results'
>;

interface Props {
  navigation: ResultsScreenNavigationProp;
}

interface ResultCardProps {
  title: string;
  content: string;
}

function ResultCard({ title, content }: ResultCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardContent}>{content}</Text>
    </View>
  );
}

export function ResultsScreen({ navigation }: Props) {
  const { generateAnalysis, resetWizard } = useWizard();

  const analysis = useMemo(() => generateAnalysis(), [generateAnalysis]);

  const handleGoDeeper = () => {
    // In a full implementation, this would generate more detailed analysis
    // For now, we'll just stay on this screen
  };

  const handleTryDifferent = () => {
    resetWizard();
    navigation.navigate('Expertise');
  };

  const handleStartOver = () => {
    resetWizard();
    navigation.navigate('Expertise');
  };

  if (!analysis.isValid) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Header />

          <ResultCard title="YOUR EXPERTISE" content={analysis.expertiseAnalysis} />

          {analysis.techLeverageAnalysis && (
            <ResultCard title="TECH LEVERAGE" content={analysis.techLeverageAnalysis} />
          )}

          {analysis.productThesis && (
            <ResultCard title="YOUR PRODUCT THESIS" content={analysis.productThesis} />
          )}

          <View style={styles.actionsContainer}>
            <Text style={styles.actionPrompt}>What would you like to do next?</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleStartOver}
                activeOpacity={0.7}
              >
                <Text style={styles.actionIcon}>↺</Text>
                <Text style={styles.actionButtonTitle}>Try Again</Text>
                <Text style={styles.actionButtonSubtitle}>
                  Provide better inputs
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header />

        <ResultCard title="YOUR EXPERTISE" content={analysis.expertiseAnalysis} />

        <ResultCard title="TECH LEVERAGE" content={analysis.techLeverageAnalysis} />

        <ResultCard title="YOUR PRODUCT THESIS" content={analysis.productThesis} />

        <View style={styles.actionsContainer}>
          <Text style={styles.actionPrompt}>What would you like to do next?</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleGoDeeper}
              activeOpacity={0.7}
            >
              <Text style={styles.actionIcon}>◎</Text>
              <Text style={styles.actionButtonTitle}>Go Deeper</Text>
              <Text style={styles.actionButtonSubtitle}>
                Explore this angle further
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleTryDifferent}
              activeOpacity={0.7}
            >
              <Text style={styles.actionIcon}>↻</Text>
              <Text style={styles.actionButtonTitle}>Try Different</Text>
              <Text style={styles.actionButtonSubtitle}>New combination</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#0A0A0A',
    borderWidth: 1,
    borderColor: '#222222',
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666666',
    letterSpacing: 2,
    marginBottom: 16,
  },
  cardContent: {
    fontSize: 15,
    color: '#CCCCCC',
    lineHeight: 24,
  },
  actionsContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  actionPrompt: {
    fontSize: 16,
    color: '#888888',
    marginBottom: 24,
    fontFamily: 'monospace',
  },
  actionButtons: {
    flexDirection: 'row',
    width: '100%',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  actionIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  actionButtonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  actionButtonSubtitle: {
    fontSize: 12,
    color: '#666666',
  },
});
