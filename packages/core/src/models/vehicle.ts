import { z } from 'zod';

// Vehicle Category
export const VehicleCategorySchema = z.enum([
  'Exotic',
  'Luxury Sedan',
  'Luxury SUV',
  'Sports Car',
  'Grand Tourer',
  'Convertible',
]);

export type VehicleCategory = z.infer<typeof VehicleCategorySchema>;

// Transmission Type
export const TransmissionTypeSchema = z.enum(['Automatic', 'Manual']);

export type TransmissionType = z.infer<typeof TransmissionTypeSchema>;

// Vehicle Model
export const VehicleSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  brand: z.string().min(1),
  category: VehicleCategorySchema,
  description: z.string().optional(),
  image: z.string().url(),
  images: z.array(z.string().url()).optional(),
  price: z.number().positive(),
  seats: z.number().int().positive(),
  transmission: TransmissionTypeSchema,
  topSpeed: z.string(),
  horsepower: z.number().int().positive().optional(),
  acceleration: z.string().optional(),
  fuelType: z.string().optional(),
  available: z.boolean(),
  featured: z.boolean(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Vehicle = z.infer<typeof VehicleSchema>;

// Partial vehicle for creation
export const CreateVehicleSchema = VehicleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateVehicle = z.infer<typeof CreateVehicleSchema>;

// Vehicle update
export const UpdateVehicleSchema = CreateVehicleSchema.partial();

export type UpdateVehicle = z.infer<typeof UpdateVehicleSchema>;
