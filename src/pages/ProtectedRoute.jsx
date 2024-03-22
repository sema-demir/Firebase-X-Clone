import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase/config";

const ProtectedRoute = () => {
  //kullanıcının yetkisi varmı state i
  const [isAuth, setIsAuth] = useState();
  useEffect(() => {
    // onAuthStateChanged kullanıcı oturmununun değişimini izler actıgını veya kapattığını
    const unsub = onAuthStateChanged(auth, (user) => {
      // Kullanıcı  oturum açtıysa yetkiyi true ya kapattıysa false a çekiyoruz
      setIsAuth(user ? true : false);
    });
    return () => unsub();
  }, []);
  // eğer yetkisi yoksa logine yönlendir
  if (isAuth === false) {
    // useNavigate kullanınca bileşen tam yüklenmeden yönlendirme yaptıgımız için  react uyarı veriyordu useNavigate yerine Navigate bileşeni kullandım. Bunu kullanınca browser router bileşenin yüklenme işlemini tamamlamış gibi algıyo ve to propu olarak tanımladığımız sayfaya yönlendiriyor

    return <Navigate to={"/"} />;
  }
  //Kapsayıcı bir Route da alt route cağırmak için
  return <Outlet />;
};

export default ProtectedRoute;
