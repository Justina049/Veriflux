// import { AuthClient } from '@dfinity/auth-client';

// let authClient = null;
// let identity = null;
// let principal = null;

// export async function initAuth() {
//   const authClient = await AuthClient.create();
//   if (await authClient.isAuthenticated()) {
//     const identity = authClient.getIdentity();
//     const principal = identity.getPrincipal().toText();
//   }
// }

// export async function login(onSuccess) {
//   authClient = await AuthClient.create();
//   await authClient.login({
//     identityProvider: 'https://identity.ic0.app/#authorize',
//     onSuccess: async () => {
//       identity = authClient.getIdentity();
//       principal = identity.getPrincipal().toText();

//       if (onSuccess) onSuccess(principal);
//     },
//   });
// }

// export function getPrincipal() {
//   return principal;
// }

// export function getIdentity() {
//   return identity;
// }

// export async function logout() {
//   await authClient.logout();
//   identity = null;
//   principal = null;
//   window.location.reload();
// }

