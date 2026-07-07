import { registerWebModule, NativeModule } from 'expo';

// FloatingAvatarModule is not available on the web platform.
class FloatingAvatarModule extends NativeModule<{}> {}

export default registerWebModule(FloatingAvatarModule, 'FloatingAvatarModule');
