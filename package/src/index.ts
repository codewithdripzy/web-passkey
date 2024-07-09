import { PlatformSupport } from "./core/enums"; // Import PlatformSupport enum
import { PasskeyOptions } from "./core/interface"; // Import PasskeyOptions interface

/**
 * Class representing a Web Passkey for authentication.
 */
class WebPasskey {
    options: PasskeyOptions | null; // Property to store passkey options

    /**
     * Constructor to initialize WebPasskey with options.
     * @param options - Configuration options for the passkey.
     */
    constructor(options: PasskeyOptions | null) {
        this.options = options; // Set the options property
    }

    /**
     * Method to check if the device supports WebAuthn features.
     * @returns A promise that resolves to a boolean indicating support.
     */
    async isSupported(): Promise<boolean> {
        if (window.PublicKeyCredential &&
            await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable() &&
            await PublicKeyCredential.isConditionalMediationAvailable()) {
            return true; // If all conditions are met, return true
        } else {
            return false; // Otherwise, return false
        }
    }

    /**
     * Method to authenticate the user using WebAuthn.
     * @returns A promise that resolves to a Credential object or null if authentication fails.
     */
    async authenticate(): Promise<Credential | null> {
        // Check if the user's browser supports WebAuthn features
        if (await this.isSupported()) {
            try {
                // Check if User Verifying Platform Authenticator and Conditional Mediation are available
                const results = await Promise.all([
                    PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(),
                    PublicKeyCredential.isConditionalMediationAvailable()
                ]);

                if (results.every(r => r === true)) {
                    // If the options are not null, proceed with creating credentials
                    if (this.options !== null) {
                        // Get the hostname of the current page
                        const host = location.hostname;

                        // Create a new passkey using navigator.credentials.create
                        const passkey = await navigator.credentials.create({
                            publicKey: {
                                user: {
                                    // Convert user ID to BufferSource
                                    id: typeof this.options.user.id == "string" ? toBuffer(this.options.user.id) as unknown as BufferSource : toBuffer(this.options.user.id.toString()) as unknown as BufferSource,
                                    name: this.options.user.name,
                                    displayName: this.options.user.displayName,
                                },
                                pubKeyCredParams: [
                                    {
                                        type: "public-key",
                                        alg: -7 // Algorithm for public key
                                    }
                                ],
                                // Convert challenge to Uint8Array
                                challenge: typeof this.options.challenge == "undefined" ? new Uint8Array(16) : typeof this.options.challenge == "function" ? await this.options.challenge() : toBuffer(this.options.challenge.toString()) as unknown as Uint8Array,
                                attestation: "none", // Attestation type
                                authenticatorSelection: {
                                    authenticatorAttachment: this.options?.type == PlatformSupport.platform ? "platform" : "cross-platform", // Authenticator type
                                },
                                rp: {
                                    id: host,
                                    name: host // Relying party information
                                },
                            },
                        });

                        return passkey; // Return the created passkey
                    } else {
                        console.log("Passkey cannot be initialized, No configuration defined");
                        return null; // Return null if options are not defined
                    }
                } else {
                    console.log('This device does not support passkeys.');
                    return null; // Return null if the device does not support passkeys
                }
            } catch (e) {
                console.error(e);
                return null; // Return null if an error occurs during authentication
            }
        } else {
            console.error("Device not supported");
            return null; // Return null if the device does not support WebAuthn features
        }
    }
}

/**
 * Utility function to convert a string to a Uint8Array buffer.
 * @param data - The string to be converted.
 * @returns The Uint8Array buffer.
 */
const toBuffer = (data: string) => {
    return new TextEncoder().encode(data);
}

/**
 * Hook to create and use a WebPasskey instance.
 * @param options - Configuration options for the passkey.
 * @returns A function to trigger the authentication process.
 */
const usePasskey = (options: PasskeyOptions | null): () => Promise<Credential | null> => {
    const passkey = new WebPasskey(options); // Create a new WebPasskey instance

    passkey.isSupported().then((isSupported) => {
        if (isSupported) {
            // Do nothing if supported
        } else {
            throw "Passkey is not Supported for this device"; // Throw an error if not supported
        }
    }).catch((e) => console.log(e ?? "Unable to setup passkey")); // Catch and log errors

    /**
     * Function to trigger the authentication process.
     * @returns A promise that resolves to a Credential object or null if authentication fails.
     */
    async function trigger(): Promise<Credential | null> {
        try {
            const data = await passkey.authenticate();
            return data; // Return the authentication data
        } catch (error) {
            return null; // Return null if an error occurs
        }
    }

    return trigger; // Return the trigger function
}

export default WebPasskey;
export { usePasskey, toBuffer }