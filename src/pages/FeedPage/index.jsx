import { useEffect, useState } from "react";
import Aside from "./Aside";
import Main from "./Main";
import Nav from "./Nav";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";

const FeedPage = () => {
  const [user, setUser] = useState(null);

  // Kullanıcı verisini al ve state e aktar
  useEffect(() => {
    // Anlık olarak kullanıcının oturumunu izler
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Kullanıcı home sayfasından ayrıldığında onAuthStateChanged methodunun sürekli kullanıcı oturumunu izleme olayını iptal ediyoruz sebebi ise performans için
    return () => unsub();
  }, []);
  return (
    <section className="feed h-screen bg-black overflow-hidden">
      <Nav user={user} />
      <Main user={user} />
      <Aside />
    </section>
  );
};

export default FeedPage;
