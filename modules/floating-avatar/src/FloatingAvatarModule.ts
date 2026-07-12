import { NativeModule, requireNativeModule } from 'expo';

declare class FloatingAvatarModule extends NativeModule<{}> {
  showAvatar(avatarUrl: string): Promise<void>;
  hideAvatar(): Promise<void>;
  showAvatarOverlay(): Promise<void>;
  hideAvatarOverlay(): Promise<void>;
}

export default requireNativeModule<FloatingAvatarModule>('FloatingAvatar');