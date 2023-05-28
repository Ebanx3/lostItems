import React from "react";

const infoToShow = [
  "- Establecer una forma de evitar que la persona incorrecta se quede con lo que encontraste, puedes ocultar algún detalle y pedirselo a quien mencione ser el dueño para asegurarte",
  "- En caso de subir foto de algún documento cubrir información delicada",
  "- Si el objeto que encontraste tiene nombre y apellido, agregarlos como detalle para facilitarle la busqueda al dueño",
];

const InfoBox = ({ onAceptarClick }: { onAceptarClick: () => void }) => {
  return (
    <div className="absolute bg-white max-w-md p-4 text-xl flex flex-col">
      <span className="font-bold">Ten presente:</span>
      <span>{infoToShow[0]}</span>
      <span>{infoToShow[1]}</span>
      <span>{infoToShow[2]}</span>
      <button
        className="bg-azul-claro py-2 text-gris-oscuro font-bold hover:bg-gris-claro mt-4 rounded-md"
        onClick={onAceptarClick}
      >
        Aceptar
      </button>
    </div>
  );
};

export default InfoBox;
