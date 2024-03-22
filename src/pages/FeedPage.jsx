import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const FeedPage = () => {
  return (
    <div className="text-4xl text-center my-10">
      Ana Akış Sayfası <br />
      <button onClick={() => signOut(auth)} className="my-10">
        Çıkış Yap
      </button>
    </div>
  );
};

export default FeedPage;
