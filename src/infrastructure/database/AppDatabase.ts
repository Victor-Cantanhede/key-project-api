import { PrismaClient } from '@prisma/client';
import { User } from '@prisma/client';


export class AppDatabase extends PrismaClient {}

// TYPES
export type DbUserType = User;