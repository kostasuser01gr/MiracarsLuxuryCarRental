import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>Mira Cars</Text>
        <Text style={styles.subtitle}>Luxury Car Rental in Greece</Text>
        <Text style={styles.description}>
          Experience the finest collection of luxury and exotic vehicles
        </Text>
      </View>

      <View style={styles.features}>
        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>Premium Fleet</Text>
          <Text style={styles.featureText}>
            Exotic and luxury vehicles from top brands
          </Text>
        </View>
        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>24/7 Support</Text>
          <Text style={styles.featureText}>Always here to assist you</Text>
        </View>
        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>Best Rates</Text>
          <Text style={styles.featureText}>
            Competitive pricing with seasonal offers
          </Text>
        </View>
      </View>

      <Link href="/fleet" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>View Fleet</Text>
        </Pressable>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  hero: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    color: '#666',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  features: {
    padding: 16,
    gap: 12,
  },
  featureCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureText: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    margin: 16,
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
