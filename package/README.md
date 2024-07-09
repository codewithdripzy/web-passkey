# WebPasskey Library

The WebPasskey library provides a simple interface for implementing WebAuthn passkey authentication in your web applications.

## Installation

First, install the WebPasskey library via npm:

```bash
npm install web-passkey
```

### Usage

Here is an example of how to use the `usePasskey` hook in your React application.

```typescript
import { uuid } from "uuidv4"; // Import uuid for generating unique user IDs
import { usePasskey } from "web-passkey"; // Import usePasskey from the web-passkey library
import { PasskeyOptions } from "web-passkey/core/interface"; // Import PasskeyOptions interface

function App() {
  // Define the passkey configuration options
  const passkeyConfig: PasskeyOptions = {
    user: {
      id: uuid(), // Generate a unique ID for the user
      name: "John Doe", // User's name
      displayName: 'thecodeguyy', // User's display name
    },
    challenge: undefined, // Challenge for WebAuthn (can be undefined)
    type: "platform" // Type of authenticator
  }

  // Create a passkey instance using the configuration options
  const passkey = usePasskey(passkeyConfig);

  // Render a button that triggers the passkey authentication
  return (
    <div style={{
      display: "flex",
      placeItems: "center",
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
      height: "100vh"
    }}>
      <button onClick={async () => {
        const psk = await passkey(); // Trigger the passkey authentication
        console.log(psk); // Log the authentication result
      }} style={{
        padding: "15px 30px",
        backgroundColor: "#1E90FF",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        color: "#ffffff",
        fontFamily: "monospace"
      }}>
        Use Passkey
      </button>
    </div>
  )
}

export default App;
```

### API

#### `usePasskey(options: PasskeyOptions): () => Promise<Credential | null>`

Creates a new passkey instance with the provided options.

**Parameters:**

- `options` (PasskeyOptions): Configuration options for the passkey.

**Returns:**

- A function that triggers the authentication process and returns a promise that resolves to a `Credential` object or `null` if authentication fails.

#### `PasskeyOptions`

An interface defining the configuration options for the passkey.

**Properties:**

- `user` (object): User information.
  - `id` (string): Unique identifier for the user.
  - `name` (string): User's name.
  - `displayName` (string): User's display name.
- `challenge` (Uint8Array | function | undefined): A challenge for the WebAuthn process. Can be `undefined`.
- `type` (string): Type of authenticator (`"platform"` or `"cross-platform"`).

### Example

Here is a full example of how to integrate the `usePasskey` hook in a React component:

```typescript
import { uuid } from "uuidv4";
import { usePasskey } from "web-passkey";
import { PasskeyOptions } from "web-passkey/core/interface";

function App() {
  const passkeyConfig: PasskeyOptions = {
    user: {
      id: uuid(),
      name: "John Doe",
      displayName: 'thecodeguyy',
    },
    challenge: undefined, // Challenge can be undefined
    type: "platform"
  }
  const passkey = usePasskey(passkeyConfig);
  
  return (
    <div style={{
      display: "flex",
      placeItems: "center",
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
      height: "100vh"
    }}>
      <button onClick={async () => {
        const psk = await passkey();
        console.log(psk);
      }} style={{
        padding: "15px 30px",
        backgroundColor: "#1E90FF",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        color: "#ffffff",
        fontFamily: "monospace"
      }}>
        Use Passkey
      </button>
    </div>
  )
}

export default App;
```

### Notes

- Ensure your application is served over HTTPS, as WebAuthn requires a secure context.
- The `challenge` should be a randomly generated value unique to each authentication request. If `challenge` is undefined, the library will handle it appropriately.

For more detailed documentation and examples, please visit the [WebPasskey GitHub repository](https://github.com/codewithdripzy/web-passkey).

## Contribution

We welcome contributions to improve `web-passkey`. Feel free to submit pull requests for bug fixes, new features, or improved documentation.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Author

- [Bankole Emmanuel](https://github.com/codewithdripzy) (https://buymeacoffee.com/thecodeguyy)

<a href="https://x.com/thecodeguyy">
  <img src="https://cdn.cms-twdigitalassets.com/content/dam/about-twitter/x/brand-toolkit/logo-black.png.twimg.768.png" alt="Follow me on X" width="20" height="20" />
</a>
<a href="https://www.linkedin.com/in/emmanuel-bankole-746258235/">
  <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="Follow me on LinkedIn" width="20" height="20">
</a>

**Buy Me a Coffee**

If you find this library helpful, consider buying me a coffee to support further development:

[![Buy me a coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/thecodeguyy)
