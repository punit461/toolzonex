'use client';

import WindowsScreen from './WindowsScreen';

export const Windows10BsodScreen = () => (
  <WindowsScreen
    os={10}
    variant="bsod"
    title="Windows 10 Blue Screen"
    description="A fake Windows 10 blue screen of death (BSOD) prank. Go fullscreen for the full effect -- nothing is actually wrong."
    url="/utilities/windows-10-blue-screen"
  />
);

export const Windows10UpdateScreen = () => (
  <WindowsScreen
    os={10}
    variant="update"
    title="Windows 10 Update Screen"
    description="A fake Windows 10 'Working on updates' screen prank. Go fullscreen for the full effect."
    url="/utilities/windows-10-update-screen"
  />
);

export const Windows11BsodScreen = () => (
  <WindowsScreen
    os={11}
    variant="bsod"
    title="Windows 11 Blue Screen"
    description="A fake Windows 11 error screen prank. Go fullscreen for the full effect -- nothing is actually wrong."
    url="/utilities/windows-11-blue-screen"
  />
);

export const Windows11UpdateScreen = () => (
  <WindowsScreen
    os={11}
    variant="update"
    title="Windows 11 Update Screen"
    description="A fake Windows 11 'Working on updates' screen prank. Go fullscreen for the full effect."
    url="/utilities/windows-11-update-screen"
  />
);
