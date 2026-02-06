import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool, neonConfig } from '@neondatabase/serverless'

const prismaClientSingleton = () => {
  // Use ws only on server side
  if (typeof window === 'undefined') {
    try {
      const ws = require('ws')
      neonConfig.webSocketConstructor = ws
    } catch (e) {
      console.warn('WebSocket (ws) not found, Neon might fall back to fetch if available.')
    }
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
