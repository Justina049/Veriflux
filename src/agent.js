// import { Actor, HttpAgent } from "@dfinity/agent";
// import { idlFactory } from "../declarations/veriflux_backend"; // Auto-generated from backend
// import { canisterId } from "../declarations/veriflux_backend";

// // Connect to the Internet Computer backend


// if (process.env.DFX_NETWORK === "local") {
//     agent.fetchRootKey()
//       .then(() => console.log("Local root key fetched"))
//       .catch((err) => console.warn("Could not fetch root key:", err));
//   }

// // const agent = new HttpAgent();
// const veriflux_backend = Actor.createActor(idlFactory, { agent, canisterId });

// export { veriflux_backend };

import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from '../../declarations/veriflux_chain';
import { canisterId } from "../../declarations/veriflux_chain";
import { identity } from "./identity"; // assuming you export `identity` or a getter from identity.js

let agent = null;
let veriflux_chain_backend = null;

export async function createActor() {
  // If not initialized, get a new identity from AuthClient
  const userIdentity = identity || null;

  agent = new HttpAgent({ identity: userIdentity });

  if (process.env.DFX_NETWORK === "local") {
    await agent.fetchRootKey().catch((err) => {
      console.warn("Could not fetch root key:", err);
    });
  }

  // Create the actor
  veriflux_chain_backend = Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });

  return veriflux_chain_backend;
}

export { agent, veriflux_chain_backend };
