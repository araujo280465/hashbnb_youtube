import { useState } from "react";
import Perks from "./Perks";

const NewPlace = () => {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [extras, setExtras] = useState("");
  const [price, setPrice] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to handle form submission, e.g., sending data to the server
    //const newPlace = await axios.post("/places", {    });
  };

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

      <div className="flex flex-col gap-1">
        <label htmlFor="ip_photo" className="ml-2 text-2xl font-bold">
          Fotos
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Adicione o link da foto"
            className="grow rounded-full border border-gray-300 px-4 py-2"
            id="ip_photo"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
          <button className="cursor-pointer rounded-full border border-gray-300 bg-gray-300 px-4 py-2 transition hover:bg-gray-200">
            Enviar foto
          </button>
        </div>
        <div className="mt-2 grid grid-cols-5 gap-4">
          <label
            htmlFor="ip_file"
            className="flex aspect-square cursor-pointer items-center justify-center gap-2 rounded-2xl border border-gray-300"
          >
            <input type="file" id="ip_file" className="hidden" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
            Upload
          </label>
        </div>
      </div>

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
              onChange={(e) => setprice(e.target.value)}
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

        <Perks />
      </div>

      <button className="hover:bg-primary-500 bg-primary-400 min-w-44 cursor-pointer rounded-full px-4 py-2 text-white transition">
        Salvar Informações
      </button>
    </form>
  );
};

export default NewPlace;
