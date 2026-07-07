import { Platform, Linking, Alert } from 'react-native';
import OverlayPermissionModule from 'rn-android-overlay-permission';

export async function requestOverlayPermission(): Promise<boolean> {
  if (Platform.OS !== 'android') return false;

  return new Promise((resolve) => {
    OverlayPermissionModule.isRequestOverlayPermissionGranted((status: any) => {
      if (!status) {
        Alert.alert(
          'Permiso necesario',
          'Animi necesita permiso para mostrar el personaje encima de otras apps.',
          [
            { text: 'Cancelar', style: 'cancel', onPress: () => resolve(false) },
            {
              text: 'Dar permiso',
              onPress: () => {
                OverlayPermissionModule.requestOverlayPermission();
                resolve(true);
              },
            },
          ]
        );
      } else {
        resolve(true);
      }
    });
  });
}

export async function showFloatingAvatar(avatarUrl: string): Promise<void> {
  console.log('Showing avatar:', avatarUrl);
}

export async function hideFloatingAvatar(): Promise<void> {
  console.log('Hiding avatar');
}