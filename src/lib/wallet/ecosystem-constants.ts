export const ECOSYSTEM_TYPES = {
  EVM: 'evm',
  SOLANA: 'solana',
} as const;

export type EcosystemType = (typeof ECOSYSTEM_TYPES)[keyof typeof ECOSYSTEM_TYPES];

export interface EcosystemData {
  type: EcosystemType;
  name: string;
  description: string;
  icon: string;
  wallets: string[];
  color: string;
  textColor: string;
  hoverColor: string;
  borderColor: string;
  shadowColor: string;
}

export const ECOSYSTEM_DATA: EcosystemData[] = [
  {
    type: ECOSYSTEM_TYPES.EVM,
    name: 'Ethereum',
    description: 'Connect to Ethereum and EVM-compatible chains',
    icon: '🔷',
    wallets: ['MetaMask', 'Rainbow', 'Coinbase', 'Trust'],
    color: 'bg-blue-50 dark:bg-gradient-to-br dark:from-blue-900/30 dark:to-cyan-900/20',
    textColor:
      'text-blue-700 dark:text-neon-cyan dark:drop-shadow-[0_0_4px_var(--color-neon-cyan)]',
    hoverColor:
      'hover:shadow-lg dark:hover:shadow-[0_0_24px_var(--color-neon-cyan-66),0_0_32px_var(--color-neon-pink-44)]',
    borderColor:
      'border-blue-200 dark:border-neon-cyan/40 hover:border-blue-400 dark:hover:border-neon-cyan/60',
    shadowColor:
      'shadow-[0_0_8px_var(--color-blue-500)] dark:shadow-[0_0_16px_var(--color-neon-cyan-44)]',
  },
  {
    type: ECOSYSTEM_TYPES.SOLANA,
    name: 'Solana',
    description: 'Connect to Solana blockchain',
    icon: '🟣',
    wallets: ['Phantom', 'Solflare'],
    color: 'bg-purple-50 dark:bg-gradient-to-br dark:from-purple-900/30 dark:to-pink-900/20',
    textColor:
      'text-purple-700 dark:text-neon-pink dark:drop-shadow-[0_0_4px_var(--color-neon-pink)]',
    hoverColor:
      'hover:shadow-lg dark:hover:shadow-[0_0_24px_var(--color-neon-pink-66),0_0_32px_var(--color-neon-cyan-44)]',
    borderColor:
      'border-purple-200 dark:border-neon-pink/40 hover:border-purple-400 dark:hover:border-neon-pink/60',
    shadowColor:
      'shadow-[0_0_8px_var(--color-purple-500)] dark:shadow-[0_0_16px_var(--color-neon-pink-44)]',
  },
];

export const WALLET_BADGE_STYLES = {
  [ECOSYSTEM_TYPES.EVM]:
    'bg-blue-100 dark:bg-neon-cyan/10 border-blue-200 dark:border-neon-cyan/30 text-blue-700 dark:text-neon-cyan shadow-[0_0_4px_var(--color-blue-500)] dark:shadow-[0_0_4px_var(--color-neon-cyan)]',
  [ECOSYSTEM_TYPES.SOLANA]:
    'bg-purple-100 dark:bg-neon-pink/10 border-purple-200 dark:border-neon-pink/30 text-purple-700 dark:text-neon-pink shadow-[0_0_4px_var(--color-purple-500)] dark:shadow-[0_0_4px_var(--color-neon-pink)]',
} as const;
