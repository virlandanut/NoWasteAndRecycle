import HartaPrincipala from "../componente/Harta/HartaPrincipala";
import HartaPrincipalaReciclare from "../componente/Harta/HartaPrincipalaReciclare";

export default function Navigare() {
  return (
    <main className="min-w-screen min-h-screen flex justify-center">
      <div className="container w-full bg-[#f8f9fa] flex justify-start items-start gap-12 shadow-sm xs:flex-col md:flex-row p-10 border">
        <HartaPrincipalaReciclare />
      </div>
    </main>
  );
}
