"use client"

import toast from "react-hot-toast";

export default function Home() {
  const teste = () => {
    toast.success("CLICOUUU!");
  }

  return (
    <main>
      <button onClick={teste}>Clica</button>
      <h1>Home Page</h1>
    </main>
  );
}
