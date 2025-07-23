import { useState } from "react";
import Perks from "./Perks";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../Contexts/UserContext";
import PhotoUploader from "./PhotoUploader";

const NewPlace = () => {
  const { user } = useUserContext();
  const [perks, setPerks] = useState([]);
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [photo, setPhoto] = useState([]);
  const [description, setDescription] = useState("");
  const [extras, setExtras] = useState("");
  const [price, setPrice] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [photolink, setPhotoLink] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // photo.length > 0 &&

    if (
      title &&
      city &&
      description &&
      price &&
      checkin &&
      checkout &&
      guests
    ) {
      try {
        const newPlace = await axios.post("/places", {
          owner: user._id,
          title,
          city,
          photo,
          description,
          extras,
          perks,
          price,
          checkin,
          checkout,
          guests,
        });

        console.log(newPlace);

        setRedirect(true);
      } catch (error) {
        //console.error(JSON.stringify(error));
        console.error(error);
        alert("Deu erro ao criar um novo lugar ");
      }
    } else {
      alert("Preencha todas as informações antes de enviar.");
    }
  };

  if (redirect) return <Navigate to="/account/places" />;

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6 px-8">
      <div className="flex flex-col gap-1">
        <label htmlFor="ip_title" className="ml-2 text-2xl font-bold">
          Título
        </label>

        <input
          type="text"
          placeholder="Digite o título do seu anúncio"
          className="rounded-full border border-gray-300 px-4 py-2"
          id="ip_title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="ip_city" className="ml-2 text-2xl font-bold">
          Cidade e País
        </label>
        <input
          type="text"
          placeholder="Digite a cidade e o pais do seu anúncio"
          className="rounded-full border border-gray-300 px-4 py-2"
          id="ip_city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <PhotoUploader {...{ photolink, setPhotoLink, setPhoto, photo }} />

      <div className="flex flex-col gap-1">
        <label htmlFor="ip_description" className="ml-2 text-2xl font-bold">
          Descrição
        </label>

        <textarea
          placeholder="Digite a descrição do seu anúncio"
          className="h-56 resize-none rounded-2xl border border-gray-300 px-4 py-2"
          id="ip_description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="ip_extras" className="ml-2 text-2xl font-bold">
          Informações Extras
        </label>

        <textarea
          placeholder="Digite a descrição do seu anúncio"
          className="h-56 resize-none rounded-2xl border border-gray-300 px-4 py-2"
          id="ip_extras"
          value={extras}
          onChange={(e) => setExtras(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="ml-2 text-2xl font-bold">Restrições e Preços</h2>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(225px,1fr))] gap-6">
          <div className="flex flex-col gap-2">
            <label className="ml-2 text-xl font-bold" htmlFor="ip_price">
              Preço
            </label>
            <input
              type="number"
              placeholder="500"
              className="rounded-full border border-gray-300 px-4 py-2"
              id="ip_price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="ml-2 text-xl font-bold" htmlFor="ip_checkin">
              CheckIn
            </label>
            <input
              type="text"
              placeholder="16:00"
              className="rounded-full border border-gray-300 px-4 py-2"
              id="ip_checkin"
              value={checkin}
              onChange={(e) => setCheckin(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="ml-2 text-xl font-bold" htmlFor="ip_checkout">
              CheckOut
            </label>
            <input
              type="text"
              placeholder="10:00"
              className="rounded-full border border-gray-300 px-4 py-2"
              id="ip_checkout"
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="ml-2 text-xl font-bold" htmlFor="ip_guests">
              Número convidados
            </label>
            <input
              type="number"
              placeholder="4"
              className="rounded-full border border-gray-300 px-4 py-2"
              id="ip_guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="ip_perks" className="ml-2 text-2xl font-bold">
          Comodidades
        </label>

        <Perks {...{ perks, setPerks }} />
      </div>

      <button className="hover:bg-primary-500 bg-primary-400 min-w-44 cursor-pointer rounded-full px-4 py-2 text-white transition">
        Salvar Informações
      </button>
    </form>
  );
};

export default NewPlace;
