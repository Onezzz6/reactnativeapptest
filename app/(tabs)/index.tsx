import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRecovery } from '../../context/RecoveryContext';
import { useTraining } from '../../context/TrainingContext';
import { Ionicons } from '@expo/vector-icons';
import CircularProgress from 'react-native-circular-progress-indicator';
import { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

export default function HomeScreen() {
  const { recoveryScore } = useRecovery();
  const { activePlan, selectedDate, setSelectedDate } = useTraining();
  const [currentWeek, setCurrentWeek] = useState<Date[]>([]);
  const [calorieIntake, setCalorieIntake] = useState(1575);
  const [dailyCalorieGoal] = useState(2500);
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

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
            <Ionicons name="football-outline" size={24} color="#4FC3F7" />
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
                <Ionicons name="person-outline" size={20} color="white" />
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
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Log a Meal</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.calorieCard}>
          <CircularProgress
            value={calorieIntake}
            maxValue={dailyCalorieGoal}
            radius={80}
            duration={1000}
            progressValueColor={'#304FFE'}
            title="Kcal"
            titleColor={'#666'}
            titleStyle={{ fontSize: 14 }}
            activeStrokeColor={'#304FFE'}
            inActiveStrokeColor={'#E8EAF6'}
            inActiveStrokeOpacity={0.2}
            progressValueStyle={{ fontSize: 32, fontWeight: 'bold', color: '#000' }}
          />
          <Text style={styles.calorieSubtitle}>Current Day Intake</Text>
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
  calorieSubtitle: {
    color: '#666',
    marginTop: 8,
    fontSize: 14,
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
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 0.5,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  username: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  profilePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});
