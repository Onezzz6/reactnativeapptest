import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRecovery } from '../../context/RecoveryContext';
import { useTraining } from '../../context/TrainingContext';
import { useNutrition } from '../../context/NutritionContext';
import { Ionicons } from '@expo/vector-icons';
import CircularProgress from 'react-native-circular-progress-indicator';
import { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import LogMealModal from '../../components/LogMealModal';

export default function HomeScreen() {
  const { recoveryScore } = useRecovery();
  const { activePlan, selectedDate, setSelectedDate } = useTraining();
  const { dailyNutrition, nutritionGoals } = useNutrition();
  const [currentWeek, setCurrentWeek] = useState<Date[]>([]);
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [logMealVisible, setLogMealVisible] = useState(false);

  const calorieGoal = nutritionGoals.dailyCalories;
  const consumedCalories = dailyNutrition.totalCalories;
  const remainingCalories = calorieGoal - consumedCalories;
  const percentage = Math.min((consumedCalories / calorieGoal) * 100, 100);

  useEffect(() => {
    generateWeekDays();
    const loadUserData = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        const userData = userDoc.data();
        if (userData) {
          setUsername(userData.username || '');
          setProfileImage(userData.photoURL || null);
        }
      }
    };
    loadUserData();
  }, []);

  const generateWeekDays = () => {
    const today = new Date();
    const week = [];
    for (let i = -3; i <= 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      week.push(date);
    }
    setCurrentWeek(week);
  };

  const formatDay = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate?.toDateString() === date.toDateString();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with Logo and Profile */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Ionicons name="football-outline" size={28} color="#4FC3F7" />
          </View>
          <Text style={styles.logoText}>BallerAI</Text>
        </View>
        <View style={styles.profileContainer}>
          {username ? (
            <Text style={styles.username}>{username}</Text>
          ) : (
            <Text style={styles.username}>Welcome</Text>
          )}
          <TouchableOpacity>
            {profileImage ? (
              <Image 
                source={{ uri: profileImage }} 
                style={styles.profileImage}
              />
            ) : (
              <View style={[styles.profileImage, styles.profilePlaceholder]}>
                <Ionicons name="person-outline" size={24} color="white" />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Nutrition Progress */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.titleContainer}>
            <Ionicons name="nutrition-outline" size={24} color="white" />
            <Text style={styles.sectionTitle}>Nutrition Progress</Text>
          </View>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setLogMealVisible(true)}
          >
            <Text style={styles.addButtonText}>+ Log a Meal</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.calorieCard}>
          <CircularProgress
            value={consumedCalories}
            maxValue={calorieGoal}
            radius={80}
            duration={1000}
            progressValueColor={'#304FFE'}
            progressValueStyle={{ display: 'none' }}
            title={consumedCalories.toString()}
            titleColor={'#000'}
            titleStyle={{ 
              fontSize: 32, 
              fontWeight: 'bold',
              textAlign: 'center'
            }}
            subtitle={'kcal consumed'}
            subtitleColor={'#666'}
            subtitleStyle={{ 
              fontSize: 16,
              marginTop: -8 
            }}
            inActiveStrokeColor={'#E8EAF6'}
            activeStrokeColor={'#FF9800'}
            inActiveStrokeOpacity={0.2}
          />
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
                <Text style={styles.statNumber}>{consumedCalories}</Text>
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
      </View>

      {/* Weekly Overview */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.titleContainer}>
            <Ionicons name="calendar-outline" size={24} color="white" />
            <Text style={styles.sectionTitle}>Weekly Overview</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="calendar" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.calendar}>
          {currentWeek.map((date, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayButton,
                isSelected(date) && styles.selectedDay,
                isToday(date) && styles.today,
              ]}
              onPress={() => setSelectedDate(date)}
            >
              <Text style={[
                styles.dayText,
                (isSelected(date) || isToday(date)) && styles.selectedDayText
              ]}>
                {formatDay(date)}
              </Text>
              <Text style={[
                styles.dateText,
                (isSelected(date) || isToday(date)) && styles.selectedDayText
              ]}>
                {date.getDate()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Daily Plan */}
      {selectedDate && activePlan && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Plan</Text>
          <View style={styles.planCard}>
            <Text style={styles.planTitle}>{activePlan.name}</Text>
            <Text style={styles.planDescription}>{activePlan.description}</Text>
          </View>
        </View>
      )}

      <LogMealModal 
        visible={logMealVisible}
        onClose={() => setLogMealVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a237e',
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  addButton: {
    backgroundColor: '#304FFE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  calorieCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  calorieStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  calorieStat: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statUnit: {
    fontSize: 12,
    color: '#666',
  },
  overBudget: {
    color: '#FF5252',
  },
  calendar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
  },
  dayButton: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  selectedDay: {
    backgroundColor: '#304FFE',
  },
  today: {
    backgroundColor: '#304FFE',
  },
  dayText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginBottom: 4,
  },
  dateText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedDayText: {
    color: 'white',
  },
  planCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  planDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 0.5,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  username: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    marginRight: 10,
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  profilePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});
