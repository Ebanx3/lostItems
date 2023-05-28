import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Modal from "./Modal";
import FileResizer from "react-image-file-resizer";

export default function Form() {
  const [description, setDescription] = useState("");
  const [contactInfo, setContactInfo] = useState<string | number>("");
  const [category, setCategory] = useState("phone");
  const [contactMethod, setContactMethod] = useState("email");
  const router = useRouter();
  const [alertText, setAlertText] = useState("");

  const showAlertBy3S = (content: string) => {
    setAlertText(content);
    setTimeout(() => {
      setAlertText("");
    }, 3000);
  };

  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<
    ArrayBuffer | string | null
  >();

  const resizeFile = (file: File) =>
    new Promise((resolve) => {
      FileResizer.imageFileResizer(
        file,
        600,
        600,
        "JPEG",
        70,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const setFileToBase = async (file: File) => {
    const resizedFile = await resizeFile(file);
    setSelectedFile(resizedFile as string);
  };
  const handleUpload = async () => {
    if (description === "") {
      showAlertBy3S("El campo DESCRIPCIÓN no puede estar vacío");
      return;
    }
    if (contactInfo === "") {
      showAlertBy3S("Debes agregar un método de contacto");
      return;
    }
    if (selectedFile == null) {
      showAlertBy3S("Debes subir una foto del objeto");
      return;
    }
    setSending(true);
    setLoading(true);
    try {
      if (!selectedFile) return;

      const { data } = await axios.post("/api/createObject", {
        description,
        contactMethod,
        contactInfo,
        category,
        img: selectedFile,
      });
      console.log(data);
      if (data.success === true) {
        setLoading(false);
      }
    } catch (error) {}
    setSelectedFile(undefined);
  };

  return (
    <div className="flex flex-col px-2 w-full sm:w-2/3 lg:w-1/2 justify-center items-stretch text-gris-claro text-lg relative overflow-hidden">
      <label htmlFor="">Categoría:</label>
      <select
        name=""
        id=""
        className="mb-4 p-4 bg-gris-oscuro text-lg appearance-none focus:outline-none"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
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
      <label htmlFor="">Descripción:</label>
      <textarea
        cols={30}
        rows={10}
        className="mb-4 p-4 bg-gris-oscuro resize-none focus:outline-none"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <label htmlFor="">Selecciona la forma de contacto</label>
      <select
        name=""
        id=""
        className="mb-4 p-4 bg-gris-oscuro text-lg appearance-none focus:outline-none"
        value={contactMethod}
        onChange={(e) => setContactMethod(e.target.value)}
      >
        <option value="email" className="">
          email
        </option>
        <option value="phone" className="">
          número telefónico
        </option>
        <option value="whatsapp" className=" ">
          whatsapp
        </option>
      </select>
      {contactMethod === "email" && (
        <>
          <label htmlFor="">Agrega un email de contacto</label>
          <input
            type="text"
            className="mb-4 p-4 bg-gris-oscuro focus:outline-none"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
          />
        </>
      )}
      {contactMethod === "phone" && (
        <>
          <label htmlFor="">Agrega un número de contacto</label>
          <input
            type="number"
            className="mb-4 p-4 bg-gris-oscuro appearance-none focus:outline-none"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
          />
        </>
      )}
      {contactMethod === "whatsapp" && (
        <>
          <label htmlFor="">Agrega un número de contacto</label>
          <input
            type="number"
            className="mb-4 p-4 bg-gris-oscuro appearance-none focus:outline-none"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
          />
        </>
      )}
      <label
        htmlFor="uploadImg"
        className="bg-orange-300 text-center py-2 my-2 text-black font-bold rounded-md hover:bg-orange-200 cursor-pointer"
      >
        Subir foto
      </label>
      <input
        type="file"
        id="uploadImg"
        className="hidden"
        maxLength={1048576}
        accept="image/png, image/jpg, image/jpeg"
        onChange={({ target }) => {
          if (target.files) {
            const file = target.files[0];
            setFileToBase(file);
          }
        }}
      />
      <div className="flex justify-between">
        <button
          className="bg-gris-claro self-end mt-4 py-2 px-4 rounded-md text-xl font-bold hover:bg-stone-400 text-azul-oscuro"
          onClick={() => router.back()}
        >
          Atras
        </button>
        <button
          className="bg-azul-claro self-end mt-4 py-2 px-4 rounded-md text-xl font-bold hover:bg-gris-claro text-azul-oscuro"
          onClick={handleUpload}
          disabled={loading}
        >
          Enviar
        </button>
      </div>
      {alertText != "" && (
        <div className="absolute bg-red-500 p-4 left-0 right-0">
          {alertText}
        </div>
      )}
      {sending && (
        <div className="backdrop-blur-sm h-screen w-full absolute left-0 right-0 flex justify-center items-center">
          <div className=" bg-gris-claro text-black h-60 px-4 flex flex-col justify-center items-center w-11/12 rounded-md">
            <Modal loading={loading} />
          </div>
        </div>
      )}
    </div>
  );
}
