// @types/global.d.ts

declare interface Window {
  executeQuery(query: string, params: [], calbackSucess: CallableFunction, callbackFail: CallableFunction): void;

  workspace: {
    showMessage(message: string): void;
  }
}
