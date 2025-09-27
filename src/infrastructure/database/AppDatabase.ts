import { PrismaClient } from '@prisma/client';
import { User, Key } from '@prisma/client';


export class AppDatabase extends PrismaClient {}

// TYPES
export type DbUserType = User;
export type DbKeyType = Key;