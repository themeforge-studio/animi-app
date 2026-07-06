import { NativeModules, Platform, PermissionsAndroid } from 'react-native';

const { FloatingAvatar } = NativeModules;

export async function requestOverlayPermission(): Promise<boolean> {
  if (Platform.OS !== 'android') return false;
  
  try {
    const granted = await PermissionsAndroid.request(
      'android.permission.SYSTEM_ALERT_WINDOW' as any,
      {
        title: 'Permiso de Overlay',
        message: 'Animi necesita permiso para mostrar el personaje encima de otras apps',
        buttonPositive: 'Permitir',
        buttonNegative: 'Cancelar',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (e) {
    console.log('Error solicitando permiso:', e);
    return false;
  }
}

export async function showFloatingAvatar(avatarUrl: string): Promise<void> {
  if (!FloatingAvatar) {
    console.log('FloatingAvatar module not available');
    return;
  }
  await FloatingAvatar.showAvatar(avatarUrl);
}

export async function hideFloatingAvatar(): Promise<void> {
  if (!FloatingAvatar) return;
  await FloatingAvatar.hideAvatar();
}