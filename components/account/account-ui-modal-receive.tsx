import { AppView } from '@/components/app-view'
import { AppText } from '@/components/app-text'
import { PublicKey } from '@solana/web3.js'
import { AppQrCode } from '@/components/app-qr-code'
import { Button } from 'react-native-paper'
import Clipboard from '@react-native-clipboard/clipboard'

export function AccountUiModalReceive({ address }: { address: PublicKey }) {
  return (
    <AppView style={{ gap: 16 }}>
      <AppText variant="titleMedium">Send assets to this address:</AppText>
      <AppView style={{ alignItems: 'center', gap: 16 }}>
        <AppText style={{ textAlign: 'center' }}>{address.toString()}</AppText>
        <Button mode="contained-tonal" onPressIn={() => Clipboard.setString(address.toString())}>
          Copy Address
        </Button>
        <AppQrCode value={address.toString()} />
      </AppView>
    </AppView>
  )
}
