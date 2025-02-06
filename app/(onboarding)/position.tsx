import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

const POSITIONS = [
  { id: 'goalkeeper', label: 'Goalkeeper' },
  { id: 'defender', label: 'Defender' },
  { id: 'midfielder', label: 'Midfielder' },
  { id: 'attacker', label: 'Attacker' },
];

export default function PositionScreen() {
  const router = useRouter();

  const handleSelect = (position: string) => {
    // Store position in state if needed
    router.push('/(onboarding)/injury');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.stepText}>Step 5 of 10</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>What's your preferred position?</Text>
        
        {POSITIONS.map((position) => (
          <TouchableOpacity 
            key={position.id}
            style={styles.optionButton}
            onPress={() => handleSelect(position.id)}
          >
            <Text style={styles.optionText}>{position.label}</Text>
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
  optionText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
}); 