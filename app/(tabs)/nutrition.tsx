import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type MacroGoal = {
  current: number;
  goal: number;
  unit: string;
};

export default function NutritionScreen() {
  // These would typically come from user's profile/settings
  const calorieGoal = 3560;
  const macros = {
    protein: { current: 0, goal: 160, unit: 'g' } as MacroGoal,
    carbs: { current: 0, goal: 445, unit: 'g' } as MacroGoal,
    fat: { current: 0, goal: 99, unit: 'g' } as MacroGoal,
  };

  const foodCalories = 0;
  const exerciseCalories = 0;
  const remainingCalories = calorieGoal - foodCalories + exerciseCalories;

  const handleAddMeal = () => {
    // TODO: Navigate to meal input screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Nutrition Tracker</Text>

      {/* Calorie Circle */}
      <View style={styles.calorieCard}>
        <View style={styles.circleContainer}>
          <View style={styles.circle}>
            <Text style={styles.calorieNumber}>{remainingCalories}</Text>
            <Text style={styles.calorieLabel}>remaining</Text>
          </View>
        </View>

        <View style={styles.calorieStats}>
          <View style={styles.calorieStat}>
            <Text style={styles.statLabel}>Base Goal</Text>
            <Text style={styles.statNumber}>{calorieGoal}</Text>
          </View>
          <View style={styles.calorieStat}>
            <Text style={styles.statLabel}>Food</Text>
            <Text style={styles.statNumber}>{foodCalories}</Text>
          </View>
          <View style={styles.calorieStat}>
            <Text style={styles.statLabel}>Exercise</Text>
            <Text style={styles.statNumber}>{exerciseCalories}</Text>
          </View>
        </View>
      </View>

      {/* Macros Grid */}
      <View style={styles.macrosGrid}>
        {Object.entries(macros).map(([macro, data]) => (
          <View key={macro} style={styles.macroCard}>
            <Text style={styles.macroTitle}>{macro.charAt(0).toUpperCase() + macro.slice(1)}</Text>
            <Text style={styles.macroNumber}>{data.current}{data.unit}</Text>
            <Text style={styles.macroGoal}>Goal: {data.goal}{data.unit}</Text>
          </View>
        ))}
      </View>

      {/* Today's Meals Section */}
      <View style={styles.mealsSection}>
        <View style={styles.mealHeader}>
          <Text style={styles.sectionTitle}>Today's Meals</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddMeal}
          >
            <Ionicons name="add" size={24} color="white" />
            <Text style={styles.addButtonText}>Add Meal</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.emptyMealsText}>
          No meals added yet. Start by adding your first meal!
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a237e',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 24,
  },
  calorieCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  circleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 8,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calorieNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  calorieLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  calorieStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calorieStat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  macrosGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  macroCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
  },
  macroTitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 4,
  },
  macroNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  macroGoal: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  mealsSection: {
    flex: 1,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#304FFE',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  emptyMealsText: {
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    marginTop: 32,
  },
}); 