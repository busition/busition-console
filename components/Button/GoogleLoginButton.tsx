import firebase from "firebase";

export default function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        result.user?.getIdToken().then((token) => console.log(token));
      })
      .catch((error) => {
        // Handle errors
        console.log(error);
      });
  };

  return (
    <>
      <button
        className="flex mt-3 w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        onClick={handleGoogleLogin}
      >
        Sign in with Google
      </button>
    </>
  );
}
