import FloatingAvatarModule from '../modules/floating-avatar/src/FloatingAvatarModule';

export async function showFloatingAvatar(avatarUrl: string): Promise<void> {
  try {
    await FloatingAvatarModule.showAvatar(avatarUrl);
  } catch (e) {
    console.log('Error mostrando avatar:', e);
  }
}

export async function hideFloatingAvatar(): Promise<void> {
  try {
    await FloatingAvatarModule.hideAvatar();
  } catch (e) {
    console.log('Error ocultando avatar:', e);
  }
}