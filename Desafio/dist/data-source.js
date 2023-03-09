"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const project_entity_1 = require("./entities/project.entity");
const tasks_entity_1 = require("./entities/tasks.entity");
require('dotenv').config();
exports.AppDataSource = process.env.NODE_ENV === 'test'
    ? new typeorm_1.DataSource({
        type: 'sqlite',
        database: ':memory:',
        entities: [project_entity_1.Project, tasks_entity_1.Tasks],
        synchronize: true,
    })
    : new typeorm_1.DataSource({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === "production" ?
            { rejectUnauthorized: false }
            : false,
        synchronize: false,
        logging: true,
        entities: process.env.NODE_ENV === "production" ? [project_entity_1.Project, tasks_entity_1.Tasks]
            : [project_entity_1.Project, tasks_entity_1.Tasks],
        migrations: process.env.NODE_ENV === "production" ? []
            : [],
    });
