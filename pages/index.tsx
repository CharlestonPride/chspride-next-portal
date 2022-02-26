import Link from "next/link";
import { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { LinkGradientButton } from "../components/button";

interface UserInfo {
  userDetails: string; // email
  identityProvider: string;
  userRoles: string[];
  claims: Claim[];
}

interface Claim {
  typ: string;
  val: string;
}

function findClaim(typ: string, claims: Claim[]): string {
  let claim = claims.find((c) => c.typ === typ);
  return claim?.val;
}

function getDisplayName(userInfo: UserInfo): string {
  if (userInfo.claims) {
    let givenName = findClaim(
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname",
      userInfo.claims
    );
    if (!!givenName) {
      return givenName;
    }
  }
  return userInfo.userDetails;
}

const Title = () => {
  return (
    <Card.Title>
      <h1 className="text-primary text-gradient">Charleston Pride Portal</h1>
    </Card.Title>
  );
};

const Home = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>();

  useEffect(() => {
    (async () => {
      setUserInfo(await getUserInfo());
    })();
  }, []);

  async function getUserInfo() {
    try {
      const response = await fetch("/.auth/me");
      const payload = await response.json();
      const { clientPrincipal } = payload;
      return clientPrincipal;
    } catch (error) {
      return undefined;
    }
  }

  return (
    <main className="background">
      <Container>
        <Row>
          <Col>
            <div className="d-flex flex-column">
              {userInfo && (
                <Card className="mx-auto mt-8">
                  <Card.Body>
                    <Title />
                    <Card.Text className="my-3">
                      <h2> {"Welcome " + getDisplayName(userInfo)}</h2>
                    </Card.Text>
                    <div>
                      <LinkGradientButton
                        color="primary"
                        href="/protected"
                        className="mx-2"
                      >
                        Continue
                      </LinkGradientButton>
                      <Link href="/.auth/logout?post_logout_redirect_uri=/">
                        <a className="text-secondary">Logout</a>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              )}

              {!userInfo && (
                <Card className="mx-auto mt-8">
                  <Card.Body>
                    <Title />
                    <Card.Text className="my-3">
                      <h2>Please login to continue</h2>
                    </Card.Text>
                    <div>
                      <LinkGradientButton
                        color="primary"
                        href="/.auth/login/google?post_login_redirect_uri=/protected"
                        className="mx-2"
                      >
                        Login
                      </LinkGradientButton>
                    </div>
                  </Card.Body>
                </Card>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Home;
