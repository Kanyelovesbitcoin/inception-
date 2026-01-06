import React, { createContext, useContext, useState, ReactNode } from 'react';
import { WizardData, AnalysisResult } from '../types';

interface WizardContextType {
  data: WizardData;
  setExpertise: (value: string) => void;
  setTechLeverage: (value: string) => void;
  setConstraints: (value: string) => void;
  resetWizard: () => void;
  generateAnalysis: () => AnalysisResult;
}

const initialData: WizardData = {
  expertise: '',
  techLeverage: '',
  constraints: '',
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<WizardData>(initialData);

  const setExpertise = (value: string) => {
    setData((prev) => ({ ...prev, expertise: value }));
  };

  const setTechLeverage = (value: string) => {
    setData((prev) => ({ ...prev, techLeverage: value }));
  };

  const setConstraints = (value: string) => {
    setData((prev) => ({ ...prev, constraints: value }));
  };

  const resetWizard = () => {
    setData(initialData);
  };

  const isValidInput = (input: string): boolean => {
    // Check if input is meaningful (not just random characters)
    const trimmed = input.trim().toLowerCase();
    if (trimmed.length < 5) return false;

    // Check for gibberish patterns
    const gibberishPatterns = /^[a-z]{2,6}$/i;
    if (gibberishPatterns.test(trimmed)) return false;

    // Check for repeated characters
    if (/(.)\1{3,}/.test(trimmed)) return false;

    // Should contain at least one space or common word patterns
    const hasStructure = trimmed.includes(' ') || trimmed.length > 10;

    return hasStructure;
  };

  const generateAnalysis = (): AnalysisResult => {
    const { expertise, techLeverage, constraints } = data;

    const expertiseValid = isValidInput(expertise);
    const techValid = isValidInput(techLeverage);

    if (!expertiseValid) {
      return {
        expertiseAnalysis: `"${expertise}" is not a recognizable domain or area of expertise. To provide a valuable analysis, I need a clear description of the individual's domain expertise.

Please describe the domain expertise. For example:
* "I build and lead high-performing B2B sales teams in the SaaS industry."
* "My expertise is in optimizing backend database performance for large-scale e-commerce platforms."
* "I specialize in creating engaging educational content for K-12 students with learning disabilities."

Once you provide a clear description, I can analyze it effectively.`,
        techLeverageAnalysis: '',
        productThesis: '',
        isValid: false,
      };
    }

    if (!techValid) {
      return {
        expertiseAnalysis: `Your domain expertise in **${expertise}** is recognized.`,
        techLeverageAnalysis: `"${techLeverage}" is not a recognizable technology or tech leverage. Please specify a technology like:
* Generative AI (Large Language Models)
* Computer Vision and Image Recognition
* Blockchain and Smart Contracts
* Workflow Automation (Zapier, n8n)
* Mobile App Development`,
        productThesis: '',
        isValid: false,
      };
    }

    // Generate meaningful analysis
    const expertiseAnalysis = generateExpertiseAnalysis(expertise, techLeverage);
    const techLeverageAnalysis = generateTechAnalysis(expertise, techLeverage, constraints);
    const productThesis = generateProductThesis(expertise, techLeverage, constraints);

    return {
      expertiseAnalysis,
      techLeverageAnalysis,
      productThesis,
      isValid: true,
    };
  };

  const generateExpertiseAnalysis = (expertise: string, tech: string): string => {
    return `Domain Expertise: **${expertise}**
Tech Leverage: **${tech}**${data.constraints ? `\nFocus/Constraint: **${data.constraints}**` : ''}

${tech} would multiply the value of ${expertise} by automating and augmenting numerous tactical and strategic tasks. Instead of manual data synthesis and report generation, the expert could leverage AI to rapidly analyze vast datasets, identify emerging trends, and model the impact of various transformation pathways. This wasn't possible before; synthesizing highly complex, multi-variable scenarios and their potential outcomes would have taken weeks of human effort.`;
  };

  const generateTechAnalysis = (expertise: string, tech: string, constraints: string): string => {
    const constraint = constraints || 'general market applications';
    return `**Why ${tech} × ${expertise}?**

This combination creates a powerful moat because:

1. **Domain Knowledge Barrier**: Generic ${tech} solutions lack the nuanced understanding of ${expertise} that you possess
2. **Data Advantage**: Your experience gives you insight into what data matters and why
3. **Trust Factor**: ${constraints ? `In ${constraint}, ` : ''}practitioners trust solutions from people who understand their world
4. **Iteration Speed**: You can validate and refine faster because you know what "good" looks like`;
  };

  const generateProductThesis = (expertise: string, tech: string, constraints: string): string => {
    const focus = constraints || 'professionals in your field';
    return `**Your Product Thesis**

Build a ${tech}-powered solution that helps ${focus} by leveraging your deep understanding of ${expertise}.

**The Differentiation Formula:**
Your expertise (${expertise}) × Tech leverage (${tech}) = A product that generic AI/outsiders couldn't build

**Key Insight**: You're not competing with ${tech} companies—you're competing with other ${expertise} experts, most of whom don't know how to leverage ${tech}.

**Next Steps:**
1. Identify the most painful manual process in your domain
2. Prototype a ${tech} solution for that specific pain point
3. Validate with 5-10 people in your network
4. Iterate based on feedback before building fully`;
  };

  return (
    <WizardContext.Provider
      value={{
        data,
        setExpertise,
        setTechLeverage,
        setConstraints,
        resetWizard,
        generateAnalysis,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
}
