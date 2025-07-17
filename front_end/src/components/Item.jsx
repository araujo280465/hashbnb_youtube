import React from "react";

const Item = () => {
  return (
    <a href="/" className="flex flex-col gap-2">
      <img
        src="/images/b5619c14-5973-4c3c-825e-9ea97a3de6e4-1741624968441.jpg"
        alt="imagem do hospede"
        className="aspect-square rounded-4xl object-cover"
      />

      <div>
        <h3 className="text-xl font-semibold">Cabo Frio, Rio de Janeiro</h3>
        <p className="truncate text-gray-600">
          Descrição da acomodação addsadasdsd sdasddsadsdsdasad
          sdsdsadsadsdsadsadsad4rerewrewrewr
        </p>
      </div>
      <p>
        <span className="font-semibold">R$ 100,00</span> por noite
      </p>
    </a>
  );
};

export default Item;
