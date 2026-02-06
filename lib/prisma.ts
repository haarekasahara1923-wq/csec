import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool, neonConfig } from '@neondatabase/serverless'
import ws from 'ws'

// Fix for Vercel/Next.js environment
// We set the WebSocket constructor explicitly
if (typeof window === 'undefined') {
  neonConfig.webSocketConstructor = ws
}

const prismaClientSingleton = () => {
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
