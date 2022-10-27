// FICHIER de CONFIG dédié pour les migrations (mais qui s'appui sur celui utilisé par l'app)
// car SINON au lancement de l'app, le dossier "migrations" est interprété
// et on tente d'exécuter le code de ces migrations, ce qui génère des erreurs
import { typeOrmConfig } from './typeorm.config';
export = {
  ...typeOrmConfig,
  migrations: ['apps/cola-booking/database/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'apps/cola-booking/database/migrations',
  },
};
