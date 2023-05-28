import Image from "next/image";
import Link from "next/link";
import logo from "../../public/130.svg";

export default function Home() {
  return (
    <main className=" bg-azul-oscuro relative">
      <div className="flex  min-h-screen max-w-3xl flex-col items-center justify-center m-auto">
        <Image src={logo} alt=" lupa" className="h-60 w-auto" />
        <span className=" text-white w-full  pb-4 text-5xl font-bold text-center uppercase  block my-24">
          perdidos y encontrados
        </span>
        <span className="text-white mb-12 text-xl w-3/4 text-center">
          Un lugar para encontrar y devolver lo perdido
        </span>
        <div className=" grid grid-cols-2 gap-4 w-11/12">
          <Link
            href={"/search"}
            className="bg-azul-claro  text-white font-bold text-2xl py-4 px-6 text-center rounded-lg uppercase hover:bg-blanco hover:text-azul-claro"
          >
            busco
          </Link>
          <Link
            href={"/find"}
            className="bg-azul-claro text-white font-bold text-2xl py-4 px-4 text-center rounded-lg uppercase hover:bg-blanco hover:text-azul-claro"
          >
            encontré
          </Link>
        </div>
      </div>
    </main>
  );
}
