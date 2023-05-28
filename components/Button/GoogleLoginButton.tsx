import firebase from "firebase";
import { useAuthUser } from "next-firebase-auth";

export default function GoogleLoginButton() {
  const handleGoogleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (result) => {
        const token = await result.user?.getIdToken();
        const res = await fetch("/api/signin", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/JSON",
            accept: "application:JSON",
          },
          body: '{ "type": 1 }',
        });
        console.log(res);
        if (res.status != 200) {
          await firebase.auth().signOut();
          throw new Error("server error");
        }
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
