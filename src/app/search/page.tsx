"use client";

import FormSearch from "@/components/FormSearch";
import ObjectsContainer from "@/components/ObjectsContainer";
import { useState } from "react";

export default function Page() {
  const [dataToSearch, setDataToSearch] = useState({
    typeObject: "",
    dataObject: "",
  });
  return (
    <main className=" bg-azul-oscuro">
      <div className="flex min-h-screen max-w-3xl flex-col items-center justify-center m-auto text-gris-claro">
        {dataToSearch.typeObject === "" ? (
          <FormSearch setDataToSearch={setDataToSearch} />
        ) : (
          <ObjectsContainer dataToSearch={dataToSearch} />
        )}
      </div>
    </main>
  );
}
