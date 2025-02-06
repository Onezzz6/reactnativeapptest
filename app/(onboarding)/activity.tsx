import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

const ACTIVITY_LEVELS = [
  { 
    id: 'sedentary',
    label: 'Sedentary',
    description: 'Little to no exercise, desk job'
  },
  {
    id: 'light',
    label: 'Lightly Active',
    description: 'Light exercise 1-3 days/week'
  },
  {
    id: 'moderate',
    label: 'Moderately Active',
    description: 'Moderate exercise 3-5 days/week'
  },
  {
    id: 'very',
    label: 'Very Active',
    description: 'Hard exercise 6-7 days/week'
  },
  {
    id: 'extra',
    label: 'Extra Active',
    description: 'Very hard exercise, physical job or training twice per day'
  },
];

export default function ActivityScreen() {
  const router = useRouter();

  const handleSelect = (activityLevel: string) => {
    // Store activity level in state if needed
    router.push('/(onboarding)/paywall');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.stepText}>Step 7 of 10</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>What's your activity level?</Text>
        
        {ACTIVITY_LEVELS.map((level) => (
          <TouchableOpacity 
            key={level.id}
            style={styles.optionButton}
            onPress={() => handleSelect(level.id)}
          >
            <Text style={styles.optionTitle}>{level.label}</Text>
            <Text style={styles.optionDescription}>{level.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a237e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    padding: 8,
  },
  backText: {
    color: 'white',
    fontSize: 16,
  },
  stepText: {
    color: 'white',
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 32,
  },
  optionButton: {
    width: '100%',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    marginBottom: 16,
  },
  optionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  optionDescription: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
}); 