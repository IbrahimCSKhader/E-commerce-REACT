import { jwtDecode } from "jwt-decode";

const claimCandidates = {
  id: [
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
    "nameid",
    "sub",
  ],
  name: [
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
    "unique_name",
    "name",
  ],
  email: [
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
    "email",
  ],
  role: [
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
    "role",
  ],
  userName: ["unique_name", "userName", "username"],
};

function pickClaim(decodedToken, keys) {
  return keys
    .map((key) => decodedToken?.[key])
    .find((value) => value !== undefined && value !== null && value !== "");
}

export function extractAccessToken(payload) {
  return (
    payload?.accessToken ??
    payload?.token ??
    payload?.response?.accessToken ??
    payload?.response?.token ??
    null
  );
}

export function buildUserFromToken(accessToken) {
  const decodedToken = jwtDecode(accessToken);

  return {
    id: pickClaim(decodedToken, claimCandidates.id) ?? null,
    name: pickClaim(decodedToken, claimCandidates.name) ?? null,
    email: pickClaim(decodedToken, claimCandidates.email) ?? null,
    role: pickClaim(decodedToken, claimCandidates.role) ?? null,
    userName: pickClaim(decodedToken, claimCandidates.userName) ?? null,
    exp: decodedToken?.exp ?? null,
  };
}

export function readPersistedAuthState(storageKey = "authValueInLocalStorage") {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(storageKey);
    if (!rawValue) {
      return null;
    }

    const parsedValue = JSON.parse(rawValue);
    return parsedValue?.state ?? null;
  } catch (error) {
    console.error("Failed to read persisted auth state", error);
    return null;
  }
}
