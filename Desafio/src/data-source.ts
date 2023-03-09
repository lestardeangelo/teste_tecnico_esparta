import { DataSource } from 'typeorm';
import { Project } from './entities/project.entity';
import { Tasks } from './entities/tasks.entity';
import { initial1678367037250 } from './migrations/1678367037250-initial';

require('dotenv').config();


export const AppDataSource =
  process.env.NODE_ENV === 'test'
    ? new DataSource({
        type: 'sqlite',
        database: ':memory:',
        entities: [Project, Tasks],
        synchronize: true,
      })
    : new DataSource({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === "production" ?
          {rejectUnauthorized: false}
          : false,
        synchronize: false,
        logging: true,
        entities: process.env.NODE_ENV === "production" ? [Project, Tasks]
        : [Project, Tasks],
        migrations: process.env.NODE_ENV === "production" ? [initial1678367037250] 
        : [initial1678367037250],
      });