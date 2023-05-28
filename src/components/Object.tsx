import Image from "next/image";
import Link from "next/link";

export default function Object({ object }: any) {
  return (
    <Link
      href={`/search/${object._id}`}
      className="border-2 border-stone-600 pb-2 mb-6 rounded-lg overflow-hidden hover:scale-105 ease-in duration-150"
    >
      <Image
        src={object.imgUrl}
        alt={object.category}
        width={400}
        height={400}
      />
      <p className="mt-2 ml-2">{object.description}</p>
    </Link>
  );
}
