import { clusterApiUrl } from '@solana/web3.js'
import { Cluster } from '@/components/cluster/cluster'
import { ClusterNetwork } from '@/components/cluster/cluster-network'

export interface AppConfig {
  name: string
  url: string
  clusters: Cluster[]
}

export function useAppConfig(): AppConfig {
  return {
    name: 'expo-react-native-paper',
    url: 'https://example.com',
    clusters: [
      {
        id: 'solana:devnet',
        name: 'Devnet',
        endpoint: clusterApiUrl('devnet'),
        network: ClusterNetwork.Devnet,
      },
      {
        id: 'solana:testnet',
        name: 'Testnet',
        endpoint: clusterApiUrl('testnet'),
        network: ClusterNetwork.Testnet,
      },
    ],
  }
}
