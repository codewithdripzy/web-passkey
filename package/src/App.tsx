import { uuid } from "uuidv4";
import { usePasskey } from "."
import { PasskeyOptions } from "./core/interface";

function App() {
  const passkeyConfig : PasskeyOptions = {
    user : {
      id: uuid(),
      name: "Bankole Emmanuel",
      displayName: 'thecodeguyy',
    },
    // challenge: new Uint8Array(16),
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
      <button onClick={async ()=>{
        const psk = await passkey();
        console.log(psk);
        
      }} style={{
        padding: "15px 30px",
        backgroundColor: "#1E90FF",
        borderRadius: "5px",
        border: "none",
        cursor : "pointer",
        color: "#ffffff",
        fontFamily: "monospace"
      }}>Use Passkey</button>
    </div>
  )
}

export default App
