"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Loader from "../../../../public/loader1.gif";
import wppLogo from "../../../../public/brand-whatsapp.svg";
import phoneLogo from "../../../../public/phone-call.svg";
import mailLogo from "../../../../public/mail-forward.svg";
import { useRouter } from "next/navigation";
export default function Page() {
  const [object, setObject] = useState({
    imgUrl: "",
    category: "",
    description: "",
    contactMethod: "",
    contactInfo: "",
  });
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();

  const fetchById = async () => {
    const res = await fetch(`/api/getObject/?${params.id}`, {
      headers: { "Content-Type": "application/json" },
    });
    const response = await res.json();
    console.log(response);
    if (response.success) {
      setObject(response.data);
      setLoading(false);
    } else {
      router.back();
    }
  };

  useEffect(() => {
    fetchById();
  }, []);

  if (loading) {
    return (
      <main className=" bg-azul-oscuro relative">
        <div className="flex  min-h-screen max-w-3xl flex-col items-center justify-center m-auto">
          {" "}
          <Image src={Loader} alt="loader" width={200} height={200} />
        </div>
      </main>
    );
  }
  return (
    <main className=" bg-azul-oscuro relative text-gris-claro p-8 min-h-screen flex items-center">
      <button
        className="absolute top-4 left-4 bg-gris-claro text-gris-oscuro p-2 rounded-md font-bold hover:bg-azul-claro z-50"
        onClick={() => router.back()}
      >
        Atras
      </button>
      <div className="flex  max-w-3xl flex-col items-center justify-center m-auto text-gris-claro text-lg border-2 border-stone-500 p-2 py-8">
        <Image
          src={object.imgUrl}
          width={600}
          height={600}
          alt={object.category}
        />
        <span className="mt-16 font-bold self-start">Detalles</span>
        <span className="mt-4">{object.description}</span>
        <span className="mt-16 font-bold self-start">
          Información de contacto
        </span>
        {object.contactMethod === "email" && (
          <>
            <span className="mt-4">Enviar email</span>
            <a href={`mailto:${object.contactInfo}`} target="__blank">
              <Image
                src={mailLogo}
                alt="phonelogo"
                width={60}
                height={60}
                className="bg-orange-500 rounded-full p-1 hover:bg-orange-400 mt-2"
              />
            </a>
          </>
        )}
        {object.contactMethod === "phone" && (
          <>
            <span className="mt-4">LLamada telefónica</span>
            <a href={`tel:${object.contactInfo}`} target="__blank">
              <Image
                src={phoneLogo}
                alt="phonelogo"
                width={60}
                height={60}
                className="bg-sky-500 rounded-full p-2 hover:bg-sky-400 mt-2"
              />
            </a>
          </>
        )}
        {object.contactMethod === "whatsapp" && (
          <>
            <span className="mt-4">Contactar vía whatsapp </span>
            <a href={`https://wa.me/${object.contactInfo}`} target="__blank">
              <Image
                src={wppLogo}
                alt="wpplogo"
                width={60}
                height={60}
                className="bg-emerald-500 rounded-full p-2 hover:bg-emerald-400 mt-2"
              />
            </a>
          </>
        )}
      </div>
    </main>
  );
}
