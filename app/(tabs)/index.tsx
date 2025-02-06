import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to BallerAI</Text>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="pulse" size={24} color="#4FC3F7" />
          <Text style={styles.cardTitle}>Training Progress</Text>
        </View>
        <Text style={[styles.metric, styles.blueMetric]}>0</Text>
        <Text style={styles.metricLabel}>Completed this week</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="trending-up" size={24} color="#4CAF50" />
          <Text style={styles.cardTitle}>Average Intensity</Text>
        </View>
        <Text style={[styles.metric, styles.greenMetric]}>0.0</Text>
        <Text style={styles.metricLabel}>Out of 10</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="calendar" size={24} color="#9C27B0" />
          <Text style={styles.cardTitle}>Nutrition Goals</Text>
        </View>
        <Text style={[styles.metric, styles.purpleMetric]}>0%</Text>
        <Text style={styles.metricLabel}>Weekly adherence</Text>
      </View>

      <View style={styles.overviewSection}>
        <Text style={styles.sectionTitle}>Weekly Overview</Text>
        {/* Add weekly overview content here */}
      </View>

      {/* Bottom Tab Navigation */}
      <View style={styles.tabBar}>
        <View style={styles.tabItem}>
          <Ionicons name="home" size={24} color="#4FC3F7" />
          <Text style={[styles.tabLabel, styles.tabLabelActive]}>Home</Text>
        </View>
        <View style={styles.tabItem}>
          <Ionicons name="barbell-outline" size={24} color="rgba(255, 255, 255, 0.6)" />
          <Text style={styles.tabLabel}>Training</Text>
        </View>
        <View style={styles.tabItem}>
          <Ionicons name="restaurant-outline" size={24} color="rgba(255, 255, 255, 0.6)" />
          <Text style={styles.tabLabel}>Nutrition</Text>
        </View>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 24,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  metric: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  blueMetric: {
    color: '#4FC3F7',
  },
  greenMetric: {
    color: '#4CAF50',
  },
  purpleMetric: {
    color: '#9C27B0',
  },
  metricLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
  },
  overviewSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 16,
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 4,
    fontSize: 12,
  },
  tabLabelActive: {
    color: '#4FC3F7',
  },
});
