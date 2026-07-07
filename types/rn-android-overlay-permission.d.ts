declare module 'rn-android-overlay-permission' {
  const OverlayPermissionModule: {
    isRequestOverlayPermissionGranted: (callback: (status: boolean) => void) => void;
    requestOverlayPermission: () => void;
  };
  export default OverlayPermissionModule;
}