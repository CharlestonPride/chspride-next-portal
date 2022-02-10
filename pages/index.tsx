import { useState, useEffect } from "react";

interface UserInfo {
  userDetails: any;
  identityProvider: any;
}

const Home = () => {
  const providers = ["twitter", "github", "aad"];
  const redirect = " window.location.pathname;";
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

      <ul className="menu-list auth">
        {!userInfo &&
          providers.map((provider) => (
            <li>
              <a
                key={provider}
                href={`/.auth/login/${provider}?post_login_redirect_uri=${redirect}`}
              >
                {provider}
              </a>
            </li>
          ))}
        {userInfo && (
          <li>
            <a href={`/.auth/logout?post_logout_redirect_uri=${redirect}`}>
              Logout
            </a>
          </li>
        )}
      </ul>

      {userInfo && (
        <div>
          <div className="user">
            <p>Welcome</p>
            <p>{userInfo && userInfo.userDetails}</p>
            <p>{userInfo && userInfo.identityProvider}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
