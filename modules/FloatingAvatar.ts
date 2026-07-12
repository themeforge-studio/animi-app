import FloatingAvatarModule from '../modules/floating-avatar/src/FloatingAvatarModule';
import { Linking, Alert } from 'react-native';

export async function showFloatingAvatar(avatarUrl: string): Promise<void> {
  try {
    await FloatingAvatarModule.showAvatar(avatarUrl);
  } catch (e: any) {
    if (e.message?.includes('PERMISSION_DENIED')) {
      Alert.alert(
        'Permiso necesario',
        'Activa "Display over other apps" para Animi en Configuración.',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Ir a Configuración', onPress: () => Linking.openSettings() },
        ]
      );
    } else {
      console.log('Error:', e);
    }
  }
}

export async function hideFloatingAvatar(): Promise<void> {
  try {
    await FloatingAvatarModule.hideAvatar();
  } catch (e) {
    console.log('Error:', e);
  }
}

export async function showKiraOverlay(): Promise<void> {
  try {
    await FloatingAvatarModule.showAvatarOverlay();
  } catch (e) {
    console.log('Error:', e);
  }
}

export async function hideKiraOverlay(): Promise<void> {
  try {
    await FloatingAvatarModule.hideAvatarOverlay();
  } catch (e) {
    console.log('Error:', e);
  }
}