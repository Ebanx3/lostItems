import Image from "next/image";
import Loader from "../../public/loader1.gif";
import { useRouter } from "next/navigation";

export default function Modal({ loading }: { loading: boolean }) {
  const router = useRouter();
  if (loading) {
    return (
      <>
        <Image src={Loader} alt="loader" width={100} height={100} />
      </>
    );
  }
  return (
    <>
      <span className="font-bold text-2xl">Felicidades!</span>
      <span className="text-xl text-center">
        Acabas de subir un nuevo objeto encontrado, esperemos que pronto te
        contacte el dueño
      </span>
      <button
        className="bg-azul-claro p-2 mt-4 font-bold text-xl hover:bg-azul-oscuro rounded-md text-white"
        onClick={() => router.back()}
      >
        Aceptar
      </button>
    </>
  );
}
