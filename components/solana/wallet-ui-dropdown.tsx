import React, { useState } from 'react'
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard'
import { useThemeColor } from '@/hooks/use-theme-color'
import { useWalletUi } from '@/components/solana/use-wallet-ui'
import { ellipsify } from '@/utils/ellipsify'
import { useCluster } from '@/components/cluster/cluster-provider'
import { Button, ButtonProps } from 'react-native-paper'

export function useWalletUiTheme() {
  const backgroundColor = useThemeColor({}, 'background')
  const listBackgroundColor = useThemeColor({}, 'background')
  const borderColor = useThemeColor({}, 'border')
  const textColor = useThemeColor({}, 'text')
  return {
    backgroundColor,
    listBackgroundColor,
    borderColor,
    textColor,
  }
}

function BaseButton({
  icon,
  label,
  onPress,
  ...props
}: Omit<ButtonProps, 'children'> & {
  label: string
  onPress: () => void
}) {
  return (
    <Button mode="contained-tonal" icon={icon} onPress={onPress} {...props}>
      {label}
    </Button>
  )
}

function ListItem({ label, onPress }: { label: string; onPress: () => void }) {
  const { borderColor, textColor } = useWalletUiTheme()
  return (
    <TouchableOpacity style={[styles.item, { borderBottomColor: borderColor }]} onPress={onPress}>
      <Text style={{ color: textColor }}>{label}</Text>
    </TouchableOpacity>
  )
}

export function WalletUiConnectButton({ label = 'Connect', then }: { label?: string; then?: () => void }) {
  const { connect } = useWalletUi()

  return <BaseButton icon="wallet" label={label} onPress={() => connect().then(() => then?.())} />
}

export function WalletUiDisconnectButton({ label = 'Disconnect', then }: { label?: string; then?: () => void }) {
  const { disconnect } = useWalletUi()

  return <BaseButton icon="wallet" label={label} onPress={() => disconnect().then(() => then?.())} />
}

export function WalletUiDropdown() {
  const { getExplorerUrl } = useCluster()
  const { account, disconnect } = useWalletUi()
  const [isOpen, setIsOpen] = useState(false)
  const { backgroundColor, listBackgroundColor, borderColor } = useWalletUiTheme()

  if (!account) {
    return <WalletUiConnectButton then={() => setIsOpen(false)} />
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <BaseButton icon="wallet" label={ellipsify(account.publicKey.toString())} onPress={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <View style={[styles.list, { backgroundColor: listBackgroundColor, borderColor }]}>
          <ListItem
            label="Copy Address"
            onPress={() => {
              Clipboard.setString(account.publicKey.toString())
              setIsOpen(false)
            }}
          />
          <ListItem
            label="View in Explorer"
            onPress={async () => {
              await Linking.openURL(getExplorerUrl(`account/${account.publicKey.toString()}`))
              setIsOpen(false)
            }}
          />
          <ListItem
            label="Disconnect"
            onPress={async () => {
              await disconnect()
              setIsOpen(false)
            }}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    borderRadius: 50,
    position: 'relative',
  },
  header: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
  },
  list: {
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 8,
    marginTop: 50,
    width: 'auto',
    position: 'absolute',
    zIndex: 10,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    flexWrap: 'nowrap',
  },
})
