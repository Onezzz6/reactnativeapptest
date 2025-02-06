import { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView,
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // TODO: Implement Firebase authentication
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logoIcon}>🏋️</Text>
        <Text style={styles.title}>Welcome to BallerAI</Text>
        <Text style={styles.subtitle}>
          Your personal AI football trainer that adapts to your goals and helps you reach your full potential
        </Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.signInIcon}>→</Text>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signUpLink}>
          <Text style={styles.signUpText}>
            Don't have an account? Sign up
          </Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoIcon: {
    fontSize: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
    maxWidth: 400,
    lineHeight: 24,
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    color: 'white',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    fontSize: 16,
  },
  signInButton: {
    width: '100%',
    padding: 14,
    backgroundColor: '#304FFE',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  signInIcon: {
    color: 'white',
    marginRight: 8,
    fontSize: 18,
  },
  signInText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpLink: {
    marginTop: 24,
  },
  signUpText: {
    color: 'white',
  },
});
