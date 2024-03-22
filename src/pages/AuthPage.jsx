import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "./../firebase/config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isError, setIsError] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      //Eğer kaydolma modundaysa

      createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.info("Hesabınız oluşturuldu");
          navigate("/home");
        })
        .catch((err) => toast.error(err.message));
    } else {
      // Eğer giriş yapma modundaysa
      signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.info("Hesabınıza Giriş Yapıldı");
          navigate("/home");
        }) //başarısız olursa
        .catch((err) => {
          toast.error(err.message);
          setIsError(true);
        });
    }
  };
  //şifre unutulursa  şifre sıfırlama maili gönderdik
  const sendEmail = () => {
    sendPasswordResetEmail(auth, email).then(() => {
      toast.info("Epostanıza şifre sıfırlama bağlantısı gönderildi");
    });
  };
  // google ile giriş yapmak için
  const handleGoogle = () => {
    signInWithPopup(auth, provider).then(() => {
      toast.success("Hesabına Giriş Yapıldı");
      navigate("/home");
    });
  };

  return (
    <section className="h-screen grid place-items-center">
      <div className="bg-black flex flex-col gap-10 py-16 px-32 rounded-lg">
        <div className="flex justify-center">
          <img className="h-[60px]" src="x-logo.webp" alt="x" />
        </div>

        <h1 className="text-center font-bold text-xl">Twitter'a Giriş Yap</h1>
        <button
          onClick={handleGoogle}
          className="bg-white flex items-center py-2 px-10 rounded-full gap-3 transition hover:bg-gray-300"
        >
          <img className="h-[20px]" src="/google-logo.svg" alt="google" />
          <span className="text-black whitespace-nowrap">
            Google ile Giriş Yap
          </span>
        </button>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Email</label>
          <input
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="mt-5">Şifre</label>
          <input
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="password"
            onChange={(e) => setPass(e.target.value)}
          />

          <button
            className="mt-10 bg-white text-black rounded-full p-1 font-bold transition hover:bg-gray-300"
            type="submit"
          >
            {isSignUp ? "Kaydol" : "Giriş Yap"}
          </button>

          <p onClick={() => setIsSignUp(!isSignUp)} className="mt-5">
            <span className="text-gray-500">
              {isSignUp ? "Hesabınız varsa" : "Hesabınız yoksa"}
            </span>
            <span className="ms-2 text-blue-500 cursor-pointer">
              {isSignUp ? "Giriş Yapın" : "Kaydolun"}
            </span>
          </p>
        </form>
        {!isSignUp && isError && (
          <button
            onClick={sendEmail}
            className="text-center text-red-500 cursor-pointer"
          >
            Şifrenizi mi Unuttunuz
          </button>
        )}
      </div>
    </section>
  );
};

export default AuthPage;
