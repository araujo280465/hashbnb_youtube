import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import AccProfile from "../components/AccProfile";
import AccPlaces from "../components/AccPlaces";
import { useUserContext } from "../Contexts/UserContext";

const Account = () => {
  const { subpage } = useParams(); // Get the subpage parameter from the URL
  const { user, ready } = useUserContext();

  const buttonClass = (button) => {
    let finalClass =
      "hover:bg-primary-400 cursor-pointer rounded-full px-4 py-2 transition hover:text-white";

    if (button === subpage) return (finalClass += " bg-primary-400 text-white");

    return finalClass;
  };

  if (!user && ready) return <Navigate to="/login" />;

  return (
    <section className="p-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8">
        <div className="flex gap-2">
          <Link to="/account/profile" className={buttonClass("profile")}>
            Perfil
          </Link>
          <Link to="/account/bookings" className={buttonClass("bookings")}>
            Reservas
          </Link>
          <Link to="/account/places" className={buttonClass("places")}>
            Lugares
          </Link>
        </div>
        {subpage === "profile" && <AccProfile />}
        {subpage === "places" && <AccPlaces />}
      </div>
    </section>
  );
};

export default Account;
