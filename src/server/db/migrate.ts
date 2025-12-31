import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const runMigrations = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL no está definida');
  }

  console.log('🚀 Ejecutando migraciones...');

  const migrationClient = postgres(process.env.DATABASE_URL, { max: 1 });
  const db = drizzle(migrationClient);

  await migrate(db, { migrationsFolder: './src/server/db/migrations' });

  await migrationClient.end();

  console.log('✅ Migraciones completadas exitosamente');
  process.exit(0);
};

runMigrations().catch((err) => {
  console.error('❌ Error ejecutando migraciones:', err);
  process.exit(1);
});