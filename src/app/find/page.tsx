"use client";
import InfoBox from "@/components/InfoBox";
import { useState } from "react";
import Form from "@/components/Form";

export default function Page() {
  const [showInfo, setShowInfo] = useState(true);

  return (
    <main className=" bg-azul-oscuro relative">
      <div className="flex min-h-screen max-w-3xl flex-col items-center justify-center m-auto">
        {showInfo ? (
          <InfoBox
            onAceptarClick={() => {
              setShowInfo(false);
            }}
          />
        ) : (
          <>
            <Form />
          </>
        )}
      </div>
    </main>
  );
}
