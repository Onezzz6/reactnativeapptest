import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';

const FEATURES = [
  {
    id: 'training',
    icon: '👑',
    title: 'Build elite skills',
    description: 'with AI-guided training plans tailored to your position'
  },
  {
    id: 'tracking',
    icon: '👑',
    title: 'Track your progress',
    description: 'with smart performance tracking and real-time feedback'
  },
  {
    id: 'custom',
    icon: '👑',
    title: 'Reach your goals your way',
    description: 'with personalized drills and intensity levels'
  }
];

export default function PaywallScreen() {
  const router = useRouter();

  const handleStartTrial = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Say hello to{'\n'}your pro career.</Text>
        <Text style={styles.subtitle}>
          Premium players are 65% more likely to reach their football goals.
        </Text>

        <View style={styles.features}>
          {FEATURES.map((feature) => (
            <View key={feature.id} style={styles.featureItem}>
              <Text style={styles.featureIcon}>{feature.icon}</Text>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.plansContainer}>
          <Text style={styles.plansTitle}>Select a plan for your free trial.</Text>
          
          <View style={styles.plans}>
            <TouchableOpacity style={[styles.planCard, styles.planCardSelected]}>
              <View style={styles.savingsBadge}>
                <Text style={styles.savingsText}>67% SAVINGS</Text>
              </View>
              <Text style={styles.planType}>YEARLY</Text>
              <Text style={styles.planPrice}>$79.99<Text style={styles.planPeriod}>/YR</Text></Text>
              <Text style={styles.planOriginalPrice}>$239.88/YR</Text>
              <Text style={styles.planBilling}>Billed yearly after free trial.</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.planCard}>
              <Text style={styles.planType}>MONTHLY</Text>
              <Text style={styles.planPrice}>$19.99<Text style={styles.planPeriod}>/MO</Text></Text>
              <Text style={styles.planBilling}>Billed monthly after free trial.</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.cancelText}>Change plans or cancel anytime.</Text>

        <TouchableOpacity style={styles.startButton} onPress={handleStartTrial}>
          <Text style={styles.startButtonText}>START 1-MONTH FREE TRIAL</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a237e',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 40,
  },
  features: {
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  plansContainer: {
    marginBottom: 24,
  },
  plansTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  plans: {
    flexDirection: 'row',
    gap: 16,
  },
  planCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    position: 'relative',
  },
  planCardSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 2,
    borderColor: '#304FFE',
  },
  savingsBadge: {
    position: 'absolute',
    top: -12,
    left: 16,
    backgroundColor: '#304FFE',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  savingsText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  planType: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  planPeriod: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  planOriginalPrice: {
    color: 'rgba(255, 255, 255, 0.6)',
    textDecorationLine: 'line-through',
    marginBottom: 4,
  },
  planBilling: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  cancelText: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 24,
  },
  startButton: {
    backgroundColor: '#304FFE',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 