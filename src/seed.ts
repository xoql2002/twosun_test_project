import { DataSource } from 'typeorm';
import config from '../ormconfig';
import { Category } from './entities/category.entity';

async function seed() {
  const ds = new DataSource(config as any);
  await ds.initialize();
  const catRepo = ds.getRepository(Category);

  const categories = ['요리','그림','음악','영화','독서'];
  for (const c of categories) {
    const found = await catRepo.findOneBy({ name: c });
    if (!found) await catRepo.save({ name: c });
  }

  console.log('Seed finished');
  process.exit(0);
}

seed();
