import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool, neonConfig } from '@neondatabase/serverless'

const prismaClientSingleton = () => {
  if (typeof window === 'undefined') {
    // Only import 'ws' in Node.js environment
    // Use dynamic import or require to prevent bundling issues in Edge/Client
    const ws = require('ws');
    neonConfig.webSocketConstructor = ws;
  }

  const connectionString = process.env.DATABASE_URL
  const neonPool = new Pool({ connectionString })
  const adapter = new PrismaNeon(neonPool)
  return new PrismaClient({ adapter })
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
