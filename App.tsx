import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WizardProvider } from './src/context/WizardContext';
import {
  ExpertiseScreen,
  TechLeverageScreen,
  ConstraintsScreen,
  ResultsScreen,
} from './src/screens';
import { RootStackParamList } from './src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <WizardProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator
            initialRouteName="Expertise"
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#000000' },
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name="Expertise" component={ExpertiseScreen} />
            <Stack.Screen name="TechLeverage" component={TechLeverageScreen} />
            <Stack.Screen name="Constraints" component={ConstraintsScreen} />
            <Stack.Screen name="Results" component={ResultsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </WizardProvider>
    </SafeAreaProvider>
  );
}
