import { customAlphabet } from 'nanoid';

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const generateShortId = customAlphabet(alphabet, 6);

export function generateAffiliateId() {
  return generateShortId();
}

export function generateAffiliateCode(): string {
  return `CSEC-${generateShortId()}`;
}

export function buildAffiliateLink(code: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://csecgwl.com';
  return `${baseUrl}/apply?ref=${code}`;
}
