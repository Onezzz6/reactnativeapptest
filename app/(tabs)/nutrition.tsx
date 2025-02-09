import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useNutrition } from '../../context/NutritionContext';
import { useState } from 'react';
import LogMealModal from '../../components/LogMealModal';
import Svg, { Circle, CircleProps } from 'react-native-svg';

type MacroGoal = {
  current: number;
  goal: number;
  unit: string;
};

export default function NutritionScreen() {
  const router = useRouter();
  const { meals, dailyNutrition, nutritionGoals, deleteMeal } = useNutrition();
  const [logMealVisible, setLogMealVisible] = useState(false);

  // Use values from context instead of hardcoded ones
  const calorieGoal = nutritionGoals.dailyCalories;
  const macros = {
    protein: { current: dailyNutrition.totalProtein, goal: nutritionGoals.protein, unit: 'g' } as MacroGoal,
    carbs: { current: dailyNutrition.totalCarbs, goal: nutritionGoals.carbs, unit: 'g' } as MacroGoal,
    fat: { current: dailyNutrition.totalFat, goal: nutritionGoals.fat, unit: 'g' } as MacroGoal,
  };

  const foodCalories = dailyNutrition.totalCalories;
  const exerciseCalories = 0;
  const remainingCalories = calorieGoal - foodCalories + exerciseCalories;

  const percentage = Math.min((foodCalories / calorieGoal) * 100, 100);
  const strokeWidth = 16;
  const size = 200;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const handleDeleteMeal = async (mealId: string) => {
    try {
      await deleteMeal(mealId);
      // No need to manually update UI - context will handle it
    } catch (error) {
      console.error('Error deleting meal:', error);
      Alert.alert(
        'Error',
        'Failed to delete meal. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Nutrition Tracker</Text>

      {/* Calorie Circle */}
      <View style={styles.calorieCard}>
        <View style={styles.circleContainer}>
          <View style={styles.circleWrapper}>
            <Svg width={size} height={size}>
              {/* Background Circle */}
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              {/* Progress Circle */}
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#FF9800"
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
              />
            </Svg>
            <View style={styles.circleContent}>
              <Text style={styles.calorieNumber}>{remainingCalories}</Text>
              <Text style={styles.calorieLabel}>kcal remaining</Text>
              <Text style={styles.percentageText}>{Math.round(percentage)}% of daily goal</Text>
            </View>
          </View>
        </View>

        <View style={styles.calorieStats}>
          <View style={styles.calorieStat}>
            <Text style={styles.statLabel}>Daily Goal</Text>
            <View style={styles.statRow}>
              <Text style={styles.statNumber}>{calorieGoal}</Text>
              <Text style={styles.statUnit}>kcal</Text>
            </View>
          </View>
          <View style={styles.calorieStat}>
            <Text style={styles.statLabel}>Consumed</Text>
            <View style={styles.statRow}>
              <Text style={styles.statNumber}>{foodCalories}</Text>
              <Text style={styles.statUnit}>kcal</Text>
            </View>
          </View>
          <View style={styles.calorieStat}>
            <Text style={styles.statLabel}>Remaining</Text>
            <View style={styles.statRow}>
              <Text style={[
                styles.statNumber,
                remainingCalories < 0 ? styles.overBudget : null
              ]}>
                {Math.abs(remainingCalories)}
              </Text>
              <Text style={[
                styles.statUnit,
                remainingCalories < 0 ? styles.overBudget : null
              ]}>
                kcal{remainingCalories < 0 ? ' over' : ''}
              </Text>
            </View>
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
            onPress={() => setLogMealVisible(true)}
          >
            <Ionicons name="add" size={24} color="white" />
            <Text style={styles.addButtonText}>Log Meal</Text>
          </TouchableOpacity>
        </View>

        {meals.length === 0 ? (
          <Text style={styles.emptyMealsText}>
            No meals added yet. Start by adding your first meal!
          </Text>
        ) : (
          <View style={styles.mealsList}>
            {meals.map((meal) => (
              <View key={meal.id} style={styles.mealItem}>
                <View style={styles.mealInfo}>
                  <Text style={styles.mealName}>{meal.name}</Text>
                  <Text style={styles.mealMacros}>
                    {meal.calories} cal • {meal.protein}g P • {meal.carbs}g C • {meal.fat}g F
                  </Text>
                </View>
                <TouchableOpacity 
                  style={styles.deleteMealButton}
                  onPress={() => handleDeleteMeal(meal.id)}
                >
                  <Ionicons name="trash-outline" size={20} color="rgba(255, 255, 255, 0.6)" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>

      <LogMealModal 
        visible={logMealVisible}
        onClose={() => setLogMealVisible(false)}
      />
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
  circleWrapper: {
    position: 'relative',
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleContent: {
    position: 'absolute',
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
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  calorieStat: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 8,
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 4,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  statUnit: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  overBudget: {
    color: '#FF5252',  // Red color for over budget
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
  mealsList: {
    flex: 1,
  },
  mealItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  mealMacros: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  deleteMealButton: {
    padding: 8,
  },
  percentageText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 4,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  calorieUnit: {
    fontSize: 18,
    color: 'rgba(0, 0, 0, 0.6)',
    marginTop: 4,
  },
}); 