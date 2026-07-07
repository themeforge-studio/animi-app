import { NativeModules, Platform, Linking, Alert } from 'react-native';

const { FloatingAvatar } = NativeModules;

export async function requestOverlayPermission(): Promise<boolean> {
  if (Platform.OS !== 'android') return false;

  // Intentar mostrar directamente — si falla es porque no hay permiso
  try {
    if (FloatingAvatar) {
      await FloatingAvatar.showAvatar('');
      return true;
    }
  } catch (e) {
    // No hay permiso, abrir configuración
    Alert.alert(
      'Permiso necesario',
      'Activa "Display over other apps" en Configuración para mostrar el personaje.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Ir a Configuración',
          onPress: () => Linking.openSettings(),
        },
      ]
    );
    return false;
  }
  return false;
}

export async function showFloatingAvatar(avatarUrl: string): Promise<void> {
  if (!FloatingAvatar) {
    console.log('FloatingAvatar module not available');
    return;
  }
  try {
    await FloatingAvatar.showAvatar(avatarUrl);
  } catch (e) {
    console.log('Error mostrando avatar:', e);
  }
}

export async function hideFloatingAvatar(): Promise<void> {
  if (!FloatingAvatar) return;
  await FloatingAvatar.hideAvatar();
}