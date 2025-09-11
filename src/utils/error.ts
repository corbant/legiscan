export class LegiScanSdkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LegiScanSdkError';
  }
}

export class LegiScanApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LegiScanApiError';
  }
}
