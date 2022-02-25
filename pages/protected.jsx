import { useState, useEffect } from "react";

const Protected = () => {
  const providers = ["google"];
  const redirect = " window.location.pathname;"
  const [userInfo, setUserInfo] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      setUserInfo(await getUserInfo());
    })();
  }, []);

    useEffect(() => {
    (async () => {
      setData(await getData())
    })()
  },[])

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



    async function getData() {
    try {
      return await( await fetch(`/api/directors`)).json();

    } catch (error) {
      console.error("No profile could be found");
      return undefined;
    }
  }

  return (
    <div className="home">
      <h1>Should be protected</h1>

      <ul className="menu-list auth">
        {!userInfo &&
          providers.map((provider) => (
            <li><a
              key={provider}
              href={`/.auth/login/${provider}?post_login_redirect_uri=${redirect}`}
            >
              {provider}
            </a></li>
          ))}
        {userInfo && (
          <li><a href={`/.auth/logout?post_logout_redirect_uri=${redirect}`}>
            Logout
          </a></li>
        )}
      </ul>

      {userInfo && (
        <div>
          <div className="user">
            <p>Welcome </p>
            <p>{userInfo && userInfo.userDetails}</p>

          </div>
        </div>
      )}
      
      <p>results</p>
      { JSON.stringify(data) }
    </div>
  );
};

export default Protected;
