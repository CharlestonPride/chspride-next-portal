import { useState, useEffect } from "react";

interface UserInfo {
  userDetails: any;
  identityProvider: any;
}

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
      console.error("No profile could be found");
      return undefined;
    }
  }

  return (
    <div className="home">
      <h1>Home page</h1>

      {userInfo && (
        <div>
          <div className="user">
            <p>Welcome</p>
            <p>{userInfo && userInfo.userDetails}</p>
            <p>{userInfo && userInfo.identityProvider}</p>
            <a href="/protected">continue</a>
          </div>
        </div>
      )}

      {!userInfo && (
        <a href={`/.auth/login/google?post_login_redirect_uri=/protected`}>
          login with google
        </a>
      )}
      {userInfo && (
        <a href={`/.auth/logout?post_logout_redirect_uri=/`}>Logout</a>
      )}
    </div>
  );
};

export default Home;
