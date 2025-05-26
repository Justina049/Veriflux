import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/veriflux_chain_backend"; 
import { canisterId } from "../../../declarations/veriflux_chain_backend";
import { getIdentity } from "../auth/identity"; 

let agent = null;
let veriflux_chain_backend = null;

export async function createActor() {
  // If not initialized, get a new identity from AuthClient
  const userIdentity = getIdentity
  if (!userIdentity) {
    throw new Error("Identity not initialized. Please login first.");
  }

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
