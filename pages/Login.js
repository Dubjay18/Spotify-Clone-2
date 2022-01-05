import { loginUrl } from "../lib/spotify";

const Login = () => {
  // const log = (provider) => {
  //   setKey(true);
  //   signIn(provider.id, { callbackUrl: "/" });
  // };
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <img
        className="w-52 mb-5"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />

      <div>
        <a className="bg-[#1ed15d] text-white p-5 rounded-lg" href={loginUrl}>
          Login with Spotify
        </a>
      </div>
    </div>
  );
};

export default Login;
