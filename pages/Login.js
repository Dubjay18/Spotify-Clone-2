import { getProviders, signIn } from "next-auth/react";
const Login = ({ providers }) => {
 
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <img
        className="w-52 mb-5"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />
      {Object.values(providers).map((provider) => {
        return (
          <div key={provider.name}>
            <button
              className="bg-[#1ed15d] text-white p-5 rounded-lg"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              Login with {provider.name}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
