import { db } from '../lib/db';
import { users } from './schema';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function seed() {
  console.log('🌱 Seeding database...');

  try {
    // Crear usuario admin de prueba
    const [adminUser] = await db
      .insert(users)
      .values({
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin',
        emailVerified: new Date(),
      })
      .returning();

    console.log('✅ Admin user created:', adminUser.email);

    // Crear usuario regular de prueba
    const [regularUser] = await db
      .insert(users)
      .values({
        email: 'user@example.com',
        name: 'Regular User',
        role: 'user',
        emailVerified: new Date(),
      })
      .returning();

    console.log('✅ Regular user created:', regularUser.email);

    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    process.exit(0);
  }
}

seed();