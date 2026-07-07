import { Platform, Linking, Alert, NativeModules } from 'react-native';

const { FloatingAvatar } = NativeModules;

export async function requestOverlayPermission(): Promise<boolean> {
  if (Platform.OS !== 'android') return false;

  Alert.alert(
    'Permiso necesario',
    'Animi necesita permiso para mostrar el personaje encima de otras apps.',
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Ir a Configuración',
        onPress: () => Linking.openSettings(),
      },
    ]
  );
  return true;
}

export async function showFloatingAvatar(avatarUrl: string): Promise<void> {
  if (!FloatingAvatar) {
    console.log('FloatingAvatar module not available');
    return;
  }
  try {
    await FloatingAvatar.showAvatar(avatarUrl);
  } catch (e) {
    console.log('Error:', e);
  }
}

export async function hideFloatingAvatar(): Promise<void> {
  if (!FloatingAvatar) return;
  await FloatingAvatar.hideAvatar();
}