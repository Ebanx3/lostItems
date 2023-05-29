import { useEffect, useState } from "react";
import Object from "./Object";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loader from "../../public/loader1.gif";

export default function ObjectsContainer({
  dataToSearch,
}: {
  dataToSearch: {
    typeObject: string;
    dataObject: string;
  };
}) {
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const fetchObjects = async () => {
    let query = `?type=${dataToSearch.typeObject}`;
    if (dataToSearch.dataObject !== "") {
      query = query + `&data=${dataToSearch.dataObject}`;
    }

    const response = await fetch(`/api/getObjects${query}`, {
      headers: { "Content-Type": "application/json" },
    });
    const res = await response.json();
    console.log(res);
    if (res.success) {
      setObjects(res.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObjects();
  }, []);

  if (loading) {
    return <Image src={Loader} alt="loader" width={200} height={200} />;
  }

  return (
    <>
      <button
        className="absolute top-4 left-4 bg-gris-claro text-gris-oscuro p-2 rounded-md font-bold hover:bg-azul-claro z-50"
        onClick={() => router.back()}
      >
        Atras
      </button>
      <div className="h-8"></div>
      {objects.length === 0 && (
        <span>No hay objetos de este tipo o con la descripción que buscas</span>
      )}
      {objects.map((object: any) => (
        <Object key={object._id} object={object} />
      ))}
      <div className="h-8"></div>
    </>
  );
}
