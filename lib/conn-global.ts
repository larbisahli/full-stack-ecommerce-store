export class GlobalRef<T> {
    private readonly sym: symbol;
    constructor(uniqueName: string) {
      this.sym = Symbol.for(uniqueName);
    }
    get value() {
      return (global as any)[this.sym] as T | undefined;
    }
    set value(value: T) {
      (global as any)[this.sym] = value;
    }
  }