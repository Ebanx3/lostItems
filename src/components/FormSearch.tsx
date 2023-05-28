import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FormSearch({
  setDataToSearch,
}: {
  setDataToSearch: ({
    typeObject,
    dataObject,
  }: {
    typeObject: string;
    dataObject: string;
  }) => void;
}) {
  const [objectType, setObjectType] = useState("phone");
  const [textInput, setTextInput] = useState("");

  const router = useRouter();

  const handleSearchButton = () => {
    setDataToSearch({ typeObject: objectType, dataObject: textInput });
  };

  return (
    <div className="flex flex-col items-stretch w-2/3 sm:w-2/3 lg:w-1/2 ">
      <h1 className="text-2xl mb-12">Que buscas?</h1>
      <select
        name=""
        id=""
        className="mb-4 p-4 bg-gris-oscuro text-lg appearance-none focus:outline-none"
        value={objectType}
        onChange={(e) => setObjectType(e.target.value)}
      >
        <option value="phone" className="">
          Celular
        </option>
        <option value="doc" className="">
          Documento
        </option>
        <option value="keys" className="">
          Llaves
        </option>
        <option value="wallet" className=" ">
          Billetera/Cartera
        </option>
        <option value="other" className=" ">
          Otro
        </option>
      </select>
      {objectType === "phone" && <label>Marca y/o modelo</label>}
      {objectType === "doc" && <label>Ingresa tu nombre</label>}
      {objectType === "wallet" && <label>Ingresa tu nombre</label>}
      {objectType === "other" && (
        <label>Ingresa algún detalle de lo que buscas</label>
      )}

      {objectType !== "keys" && (
        <input
          type="text"
          className="mb-4 p-4 bg-gris-oscuro focus:outline-none"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
      )}
      <div className="flex justify-between">
        <button
          className="bg-gris-claro self-end mt-4 py-2 px-4 rounded-md text-xl font-bold hover:bg-stone-400 text-azul-oscuro"
          onClick={() => router.back()}
        >
          Atras
        </button>
        <button
          className="bg-azul-claro self-end mt-4 py-2 px-4 rounded-md text-xl font-bold hover:bg-gris-claro text-azul-oscuro"
          onClick={handleSearchButton}
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
