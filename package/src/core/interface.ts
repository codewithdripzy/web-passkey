import { PlatformSupport } from "./enums";

interface PasskeyOptions {
    user: {
      id: string | number;
      name: string;
      displayName: string;
    };
    challenge?: Uint8Array | (() => Promise<Uint8Array>);
    type?: PlatformSupport | string
}


export type { PasskeyOptions };