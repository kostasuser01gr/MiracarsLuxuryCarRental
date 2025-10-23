import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native';
import { Vehicle } from '@mira-cars/core';
import { Link } from 'expo-router';

// Mock data - in production this would come from Firebase via React Query
const vehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Aventador SVJ',
    brand: 'Lamborghini',
    category: 'Exotic',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
    price: 1500,
    seats: 2,
    transmission: 'Automatic',
    topSpeed: '217 mph',
    available: true,
    featured: true,
  },
  {
    id: '2',
    name: 'S-Class',
    brand: 'Mercedes-Benz',
    category: 'Luxury Sedan',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
    price: 450,
    seats: 5,
    transmission: 'Automatic',
    topSpeed: '155 mph',
    available: true,
    featured: true,
  },
  {
    id: '3',
    name: '911 Carrera',
    brand: 'Porsche',
    category: 'Sports Car',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
    price: 900,
    seats: 4,
    transmission: 'Manual',
    topSpeed: '191 mph',
    available: true,
    featured: false,
  },
];

export default function FleetScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Link href={`/vehicle/${item.id}`} asChild>
            <Pressable style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.cardContent}>
                <View style={styles.header}>
                  <View>
                    <Text style={styles.vehicleName}>
                      {item.brand} {item.name}
                    </Text>
                    <Text style={styles.category}>{item.category}</Text>
                  </View>
                  {item.featured && (
                    <View style={styles.featuredBadge}>
                      <Text style={styles.featuredText}>Featured</Text>
                    </View>
                  )}
                </View>
                <View style={styles.specs}>
                  <Text style={styles.specText}>{item.seats} seats</Text>
                  <Text style={styles.specText}>•</Text>
                  <Text style={styles.specText}>{item.transmission}</Text>
                </View>
                <View style={styles.footer}>
                  <View>
                    <Text style={styles.price}>€{item.price}</Text>
                    <Text style={styles.priceLabel}>/day</Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      item.available ? styles.available : styles.unavailable,
                    ]}
                  >
                    <Text style={styles.statusText}>
                      {item.available ? 'Available' : 'Unavailable'}
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  list: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
  },
  cardContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: '600',
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  featuredBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  featuredText: {
    fontSize: 12,
    color: '#92400e',
  },
  specs: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  specText: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  available: {
    backgroundColor: '#000',
  },
  unavailable: {
    backgroundColor: '#e0e0e0',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});
