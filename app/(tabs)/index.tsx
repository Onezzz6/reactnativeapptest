import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Calendar } from 'react-native-calendars';

export default function HomeScreen() {
  const router = useRouter();
  
  // Example data - replace with real data from your context/state
  const nutritionData = {
    currentCalories: 1200,
    targetCalories: 2500,
  };

  const recoveryScore = 85; // 0-100 score based on sleep, soreness, etc.

  const handleAddMeal = () => {
    router.push('/add-meal');
  };

  const handleProfile = () => {
    router.push('/(tabs)/profile');
  };

  const handleCompleteTraining = () => {
    // Add your training completion logic here
    console.log('Training completed');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={handleProfile}
        >
          <Ionicons name="person-circle-outline" size={32} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.indicators}>
        {/* Calorie Indicator */}
        <View style={styles.indicatorCard}>
          <Text style={styles.indicatorTitle}>Calories</Text>
          <CircularProgress
            value={nutritionData.currentCalories}
            maxValue={nutritionData.targetCalories}
            radius={50}
            duration={2000}
            progressValueColor={'#fff'}
            activeStrokeColor={'#304FFE'}
            inActiveStrokeColor={'rgba(255, 255, 255, 0.2)'}
            inActiveStrokeOpacity={0.5}
            inActiveStrokeWidth={6}
            activeStrokeWidth={12}
            title={'kcal'}
            titleColor={'rgba(255, 255, 255, 0.6)'}
            titleStyle={{ fontSize: 12 }}
          />
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddMeal}
          >
            <Ionicons name="add-circle" size={20} color="#4FC3F7" />
            <Text style={styles.addButtonText}>Add Meal</Text>
          </TouchableOpacity>
        </View>

        {/* Recovery Score */}
        <View style={styles.indicatorCard}>
          <Text style={styles.indicatorTitle}>Recovery</Text>
          <CircularProgress
            value={recoveryScore}
            maxValue={100}
            radius={50}
            duration={2000}
            progressValueColor={'#fff'}
            activeStrokeColor={'#4CAF50'}
            inActiveStrokeColor={'rgba(255, 255, 255, 0.2)'}
            inActiveStrokeOpacity={0.5}
            inActiveStrokeWidth={6}
            activeStrokeWidth={12}
            title={'score'}
            titleColor={'rgba(255, 255, 255, 0.6)'}
            titleStyle={{ fontSize: 12 }}
          />
        </View>

        {/* Training Card */}
        <View style={styles.trainingCard}>
          <Text style={styles.indicatorTitle}>Today's Training</Text>
          <Text style={styles.trainingText}>Lower Body Strength</Text>
          <TouchableOpacity 
            style={styles.completeButton}
            onPress={handleCompleteTraining}
          >
            <Text style={styles.completeButtonText}>Complete Training</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Calendar */}
      <View style={styles.calendarContainer}>
        <Text style={styles.sectionTitle}>History</Text>
        <Calendar
          theme={{
            backgroundColor: 'transparent',
            calendarBackground: 'transparent',
            textSectionTitleColor: '#fff',
            selectedDayBackgroundColor: '#304FFE',
            selectedDayTextColor: '#fff',
            todayTextColor: '#304FFE',
            dayTextColor: '#fff',
            textDisabledColor: 'rgba(255, 255, 255, 0.3)',
            monthTextColor: '#fff',
            arrowColor: '#fff',
          }}
          markedDates={{
            // Add your marked dates here
            '2024-02-07': { marked: true, dotColor: '#4CAF50' },
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a237e',
  },
  header: {
    padding: 16,
    paddingTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicators: {
    padding: 16,
    gap: 16,
  },
  indicatorCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  indicatorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(79, 195, 247, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 16,
    gap: 8,
  },
  addButtonText: {
    color: '#4FC3F7',
    fontSize: 14,
    fontWeight: '500',
  },
  trainingCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  trainingText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 16,
  },
  completeButton: {
    backgroundColor: '#304FFE',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  completeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  calendarContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
});
