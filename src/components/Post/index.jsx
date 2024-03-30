import moment from "moment/moment";
import "moment/locale/tr";
import Buttons from "./Buttons";
import { auth, db } from "../../firebase/config";
import Dropdown from "./Dropdown";
import {
  deleteDoc,
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useState } from "react";
import EditMode from "./EditMode";
import Content from "./Content";
const Post = ({ tweet }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  //güncel tarih alma ve ...zaman önce gibi
  const date = moment(tweet?.createdAt?.toDate()).fromNow();

  //oturumu acık olan kullanıcının tweetin like dizisinde varmı
  const isLiked = tweet.likes.includes(auth.currentUser.uid);

  //tweeti kaldır
  const handleDelete = async () => {
    //kaldırılacak tweetin referansını alma
    const tweetRef = doc(db, "tweets", tweet.id);
    //Dökümanı kaldır
    deleteDoc(tweetRef)
      .then(() => {
        toast.warn("Tweet başarıyla kaldırıldı");
      })
      .catch(() => {
        toast.danger("Tweet Kaldırılırken Sorun Olustu");
      });
  };
  //like güncelleme
  const handleLike = async () => {
    //Güncellenecek Dökümanın referansını alma
    const tweetRef = doc(db, "tweets", tweet.id);

    //belgeyi güncelle
    //like layan kullanıcının id sini like dizisine ekle
    updateDoc(tweetRef, {
      likes: isLiked
        ? arrayUnion(auth.currentUser.uid) //like varsa like i kaldır
        : arrayUnion(auth.currentUser.uid), // like yoksa ekle
    });
  };
  console.log(isEditMode);
  return (
    <div className="border-b py-6 px-3 border-zinc-600 flex gap-3">
      <img
        className="w-12 h-12 rounded-full"
        src={tweet.user.photo}
        alt={tweet.user.name}
      />

      <div className="w-full">
        {/* En üst Kısım */}
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center whitespace-nowrap">
            <p className="font-semibold">{tweet.user.name}</p>
            <p className="text-gray-400 text-sm">
              @{tweet.user.name?.toLowerCase().split(" ").join("_")}
            </p>
            <p className="text-gray-400 text-sm">{date}</p>
            {tweet.isEdited && (
              <p className="text-gray-400 text-xs">Düzenlendi</p>
            )}
          </div>
          {tweet.user.id === auth.currentUser.uid && (
            <Dropdown
              handleEdit={() => setIsEditMode(true)}
              handleDelete={handleDelete}
            />
          )}
        </div>

        {/* orta kısım */}
        <div className="my-4">
          {isEditMode ? (
            <EditMode tweet={tweet} close={() => setIsEditMode(false)} />
          ) : (
            <Content tweet={tweet} />
          )}
        </div>

        {/* Alt kısım */}
        <div>
          <Buttons
            isLiked={isLiked}
            handleLike={handleLike}
            likeCount={tweet.likes.length}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
