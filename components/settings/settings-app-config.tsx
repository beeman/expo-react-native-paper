import { useAppConfig } from '@/constants/app-config'
import { AppText } from '@/components/app-text'
import { AppView } from '@/components/app-view'
import { AppExternalLink, AppExternalLinkProps } from '@/components/app-external-link'

export function SettingsAppConfig() {
  const { name, url } = useAppConfig()
  return (
    <AppView>
      <AppText variant="titleMedium">App Config</AppText>
      <AppText>
        Name: <AppText>{name}</AppText>
      </AppText>
      <AppText>
        URL: <AppExternalLink href={url as AppExternalLinkProps['href']}>{url}</AppExternalLink>
      </AppText>
    </AppView>
  )
}
