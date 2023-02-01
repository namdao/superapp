export let RootNavigator: any;
export let ContainerModule: any = {};
export let BlurViewRoot: any;
export function setRootNavigator(rootNavigator: any) {
  RootNavigator = rootNavigator;
}
export function setBlurViewRoot(blurView: any) {
  BlurViewRoot = blurView;
}
export function getDataFromRootParent() {
  return RootNavigator.getCurrentRoute();
}
export function setContainer(fn: () => void) {
  ContainerModule = {
    ...ContainerModule,
    ...fn,
  };
}

export function callFunction(funcName: string, arg: any) {
  if (ContainerModule[funcName]) {
    if (arg) {
      ContainerModule[funcName](arg);
    } else {
      ContainerModule[funcName];
    }
  }
}
