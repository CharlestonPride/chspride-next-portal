export interface UserInfo {
  userDetails: string; // email
  identityProvider: string;
  userRoles: string[];
  claims: Claim[];
}

export interface Claim {
  typ: string;
  val: string;
}

function findClaim(typ: string, claims: Claim[]): string {
  let claim = claims.find((c) => c.typ === typ);
  return claim?.val;
}

function getDisplayName(userInfo: UserInfo): string {
  if (userInfo?.claims) {
    let givenName = findClaim(
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname",
      userInfo.claims
    );
    if (!!givenName) {
      return givenName;
    }
  }
  return userInfo?.userDetails;
}

export { findClaim, getDisplayName };
