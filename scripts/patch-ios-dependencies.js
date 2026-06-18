const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function patchFile(relativePath, patcher) {
  const filePath = path.join(root, relativePath);
  if (!fs.existsSync(filePath)) {
    console.log(`[postinstall] Skipped missing ${relativePath}`);
    return;
  }

  const original = fs.readFileSync(filePath, 'utf8');
  const updated = patcher(original);

  if (updated !== original) {
    fs.writeFileSync(filePath, updated);
    console.log(`[postinstall] Patched ${relativePath}`);
  } else {
    console.log(`[postinstall] ${relativePath} already compatible`);
  }
}

patchFile('node_modules/react-native-date-picker/ios/RNDatePickerManager.mm', source => {
  let updated = source;

  if (!updated.includes('#import <React/RCTUtils.h>')) {
    updated = updated.replace(
      '#import <React/RCTUIManager.h>\n',
      '#import <React/RCTUIManager.h>\n#import <React/RCTUtils.h>\n',
    );
  }

  updated = updated.replace(
    'UIViewController *rootViewController = [UIApplication sharedApplication].delegate.window.rootViewController;',
    'UIViewController *rootViewController = RCTPresentedViewController();',
  );

  return updated;
});

patchFile('node_modules/react-native-screens/ios/RNSScreenWindowTraits.mm', source => {
  if (source.includes('ESIM_CAMPUS_XCODE26_RNSScreenWindowTraits')) {
    return source;
  }

  return `// ESIM_CAMPUS_XCODE26_RNSScreenWindowTraits
#import "RNSScreenWindowTraits.h"
#import "RNSScreenContainer.h"
#import "RNSScreenStack.h"

@implementation RNSScreenWindowTraits

#if !TARGET_OS_TV
+ (UIWindow *)rns_activeWindow
{
  NSSet<UIScene *> *connectedScenes = [UIApplication sharedApplication].connectedScenes;

  for (UIScene *scene in connectedScenes) {
    if (![scene isKindOfClass:[UIWindowScene class]]) {
      continue;
    }

    UIWindowScene *windowScene = (UIWindowScene *)scene;
    if (windowScene.activationState != UISceneActivationStateForegroundActive &&
        windowScene.activationState != UISceneActivationStateForegroundInactive) {
      continue;
    }

    for (UIWindow *window in windowScene.windows) {
      if (window.isKeyWindow) {
        return window;
      }
    }

    UIWindow *firstWindow = windowScene.windows.firstObject;
    if (firstWindow != nil) {
      return firstWindow;
    }
  }

  return nil;
}

+ (UIViewController *)rns_rootViewController
{
  return [RNSScreenWindowTraits rns_activeWindow].rootViewController;
}

+ (void)assertViewControllerBasedStatusBarAppearenceSet
{
  static dispatch_once_t once;
  static bool viewControllerBasedAppearence;
  dispatch_once(&once, ^{
    viewControllerBasedAppearence =
        [[[NSBundle mainBundle] objectForInfoDictionaryKey:@"UIViewControllerBasedStatusBarAppearance"] boolValue];
  });
  if (!viewControllerBasedAppearence) {
    RCTLogError(@"If you want to change the appearance of status bar, you have to change UIViewControllerBasedStatusBarAppearance key in the Info.plist to YES");
  }
}
#endif

+ (void)updateStatusBarAppearance
{
#if !TARGET_OS_TV
  [UIView animateWithDuration:0.4
                   animations:^{
                     [[RNSScreenWindowTraits rns_rootViewController] setNeedsStatusBarAppearanceUpdate];
                   }];
#endif
}

+ (void)updateHomeIndicatorAutoHidden
{
#if !TARGET_OS_TV
  if (@available(iOS 11.0, *)) {
    [[RNSScreenWindowTraits rns_rootViewController] setNeedsUpdateOfHomeIndicatorAutoHidden];
  }
#endif
}

#if !TARGET_OS_TV
+ (UIStatusBarStyle)statusBarStyleForRNSStatusBarStyle:(RNSStatusBarStyle)statusBarStyle
{
  if (@available(iOS 13.0, *)) {
    switch (statusBarStyle) {
      case RNSStatusBarStyleAuto:
        return [UITraitCollection.currentTraitCollection userInterfaceStyle] == UIUserInterfaceStyleDark
            ? UIStatusBarStyleLightContent
            : UIStatusBarStyleDarkContent;
      case RNSStatusBarStyleInverted:
        return [UITraitCollection.currentTraitCollection userInterfaceStyle] == UIUserInterfaceStyleDark
            ? UIStatusBarStyleDarkContent
            : UIStatusBarStyleLightContent;
      case RNSStatusBarStyleLight:
        return UIStatusBarStyleLightContent;
      case RNSStatusBarStyleDark:
        return UIStatusBarStyleDarkContent;
      default:
        return UIStatusBarStyleLightContent;
    }
  }

  if (statusBarStyle == RNSStatusBarStyleLight) {
    return UIStatusBarStyleLightContent;
  }
  return UIStatusBarStyleDefault;
}

+ (UIInterfaceOrientation)defaultOrientationForOrientationMask:(UIInterfaceOrientationMask)orientationMask
{
  if (UIInterfaceOrientationMaskPortrait & orientationMask) {
    return UIInterfaceOrientationPortrait;
  } else if (UIInterfaceOrientationMaskLandscapeLeft & orientationMask) {
    return UIInterfaceOrientationLandscapeLeft;
  } else if (UIInterfaceOrientationMaskLandscapeRight & orientationMask) {
    return UIInterfaceOrientationLandscapeRight;
  } else if (UIInterfaceOrientationMaskPortraitUpsideDown & orientationMask) {
    return UIInterfaceOrientationPortraitUpsideDown;
  }
  return UIInterfaceOrientationUnknown;
}

+ (UIInterfaceOrientation)interfaceOrientationFromDeviceOrientation:(UIDeviceOrientation)deviceOrientation
{
  switch (deviceOrientation) {
    case UIDeviceOrientationPortrait:
      return UIInterfaceOrientationPortrait;
    case UIDeviceOrientationPortraitUpsideDown:
      return UIInterfaceOrientationPortraitUpsideDown;
    case UIDeviceOrientationLandscapeLeft:
      return UIInterfaceOrientationLandscapeRight;
    case UIDeviceOrientationLandscapeRight:
      return UIInterfaceOrientationLandscapeLeft;
    default:
      return UIInterfaceOrientationUnknown;
  }
}

+ (UIInterfaceOrientationMask)maskFromOrientation:(UIInterfaceOrientation)orientation
{
  return 1 << orientation;
}
#endif

+ (void)enforceDesiredDeviceOrientation
{
#if !TARGET_OS_TV
  dispatch_async(dispatch_get_main_queue(), ^{
    UIViewController *rootViewController = [RNSScreenWindowTraits rns_rootViewController];
    if (rootViewController == nil) {
      return;
    }

    UIInterfaceOrientationMask orientationMask = rootViewController.supportedInterfaceOrientations;
    UIInterfaceOrientation currentDeviceOrientation =
        [RNSScreenWindowTraits interfaceOrientationFromDeviceOrientation:[[UIDevice currentDevice] orientation]];
    UIInterfaceOrientation currentInterfaceOrientation = [RNSScreenWindowTraits interfaceOrientation];
    UIInterfaceOrientation newOrientation = UIInterfaceOrientationUnknown;

    if ([RNSScreenWindowTraits maskFromOrientation:currentDeviceOrientation] & orientationMask) {
      if (!([RNSScreenWindowTraits maskFromOrientation:currentInterfaceOrientation] & orientationMask)) {
        newOrientation = currentDeviceOrientation;
      } else if (currentDeviceOrientation != currentInterfaceOrientation) {
        newOrientation = currentDeviceOrientation;
      }
    } else if (!([RNSScreenWindowTraits maskFromOrientation:currentInterfaceOrientation] & orientationMask)) {
      newOrientation = [RNSScreenWindowTraits defaultOrientationForOrientationMask:orientationMask];
    }

    if (newOrientation == UIInterfaceOrientationUnknown) {
      return;
    }

    if (@available(iOS 16.0, *)) {
      UIWindowScene *windowScene = [RNSScreenWindowTraits rns_activeWindow].windowScene;
      if (windowScene == nil) {
        return;
      }

      UIWindowSceneGeometryPreferencesIOS *geometryPreferences =
          [[UIWindowSceneGeometryPreferencesIOS alloc] initWithInterfaceOrientations:orientationMask];
      [windowScene requestGeometryUpdateWithPreferences:geometryPreferences errorHandler:^(NSError *_Nonnull error){}];

      UIViewController *topController = rootViewController;
      while (topController.presentedViewController) {
        topController = topController.presentedViewController;
      }
      [topController setNeedsUpdateOfSupportedInterfaceOrientations];
    } else {
      [[UIDevice currentDevice] setValue:@(newOrientation) forKey:@"orientation"];
      [UIViewController attemptRotationToDeviceOrientation];
    }
  });
#endif
}

+ (void)updateWindowTraits
{
  [RNSScreenWindowTraits updateStatusBarAppearance];
  [RNSScreenWindowTraits enforceDesiredDeviceOrientation];
  [RNSScreenWindowTraits updateHomeIndicatorAutoHidden];
}

#if !TARGET_OS_TV
+ (UIInterfaceOrientation)interfaceOrientation
{
  UIWindowScene *windowScene = [RNSScreenWindowTraits rns_activeWindow].windowScene;
  if (windowScene == nil) {
    return UIInterfaceOrientationUnknown;
  }
  return windowScene.interfaceOrientation;
}
#endif

+ (BOOL)shouldAskScreensForTrait:(RNSWindowTrait)trait
                 includingModals:(BOOL)includingModals
                inViewController:(UIViewController *)vc
{
  UIViewController *lastViewController = [[vc childViewControllers] lastObject];
  if ([lastViewController conformsToProtocol:@protocol(RNSViewControllerDelegate)]) {
    UIViewController *vc = nil;
    if ([lastViewController isKindOfClass:[RNSViewController class]]) {
      vc = [(RNSViewController *)lastViewController findActiveChildVC];
    } else if ([lastViewController isKindOfClass:[RNSNavigationController class]]) {
      vc = [(RNSNavigationController *)lastViewController topViewController];
    }
    return [vc isKindOfClass:[RNSScreen class]] &&
        [(RNSScreen *)vc findChildVCForConfigAndTrait:trait includingModals:includingModals] != nil;
  }
  return NO;
}

+ (BOOL)shouldAskScreensForScreenOrientationInViewController:(UIViewController *)vc
{
  return [RNSScreenWindowTraits shouldAskScreensForTrait:RNSWindowTraitOrientation
                                         includingModals:YES
                                        inViewController:vc];
}

@end
`;
});
