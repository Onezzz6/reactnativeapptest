import { createContext, useContext, useState } from 'react';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

type OnboardingData = {
  gender?: string;
  age?: number;
  height?: number;
  weight?: number;
  level?: string;
  position?: string;
  injuryHistory?: string;
  activityLevel?: string;
  motivation?: string;
};

type OnboardingContextType = {
  onboardingData: OnboardingData;
  updateOnboardingData: (data: Partial<OnboardingData>) => void;
  saveOnboardingData: () => Promise<void>;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({});

  const updateOnboardingData = (data: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...data }));
  };

  const saveOnboardingData = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error('No user logged in');

    await updateDoc(doc(db, 'users', userId), {
      ...onboardingData,
      onboardingComplete: true,
      updatedAt: serverTimestamp(),
    });
  };

  return (
    <OnboardingContext.Provider value={{ onboardingData, updateOnboardingData, saveOnboardingData }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (undefined === context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
} 