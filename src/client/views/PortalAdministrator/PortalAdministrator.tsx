import CardContainereNoi from "./Componente/CardContainereNoi";
import CardUtilizatoriNoi from "./Componente/CardUtilizatoriNoi";
import GraficContainere from "./Componente/GraficContainere";
import GraficUtilizatori from "./Componente/GraficUtilizatori";
import PanelFirme from "./Componente/PanelFirme/PanelFirme";
import PanelTicheteRaport from "./Componente/PanelTicheteRaport/PanelTicheteRaport";

const PortalAdministrator = () => {
  return (
    <main className="min-w-screen min-h-screen flex justify-center">
      <div className="w-5/6 h-auto p-10 flex flex-col gap-4">
        <section className="w-full p-4 border border-gray-200 rounded-lg flex flex-col gap-4">
          <div className="w-full flex gap-4">
            <CardContainereNoi />
            <div className="w-2/3">
              <GraficContainere />
            </div>
          </div>
          <div className="w-full flex gap-4">
            <CardUtilizatoriNoi />
            <div className="w-2/3 ">
              <GraficUtilizatori />
            </div>
          </div>
        </section>
        <section className="w-full flex gap-4">
          <PanelFirme />
          <PanelTicheteRaport />
        </section>
      </div>
    </main>
  );
};

export default PortalAdministrator;
