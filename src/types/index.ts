export interface WizardData {
  expertise: string;
  techLeverage: string;
  constraints: string;
}

export interface AnalysisResult {
  expertiseAnalysis: string;
  techLeverageAnalysis: string;
  productThesis: string;
  isValid: boolean;
}

export type RootStackParamList = {
  Expertise: undefined;
  TechLeverage: undefined;
  Constraints: undefined;
  Results: undefined;
};
