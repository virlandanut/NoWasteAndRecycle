import { ComentariuTichet } from "../../../../../../../server/Routes/Raportare/Interfete";

import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";

interface ComentariuAdminstratorProps {
  comentariu: ComentariuTichet;
  selfEnd?: boolean;
}

const ComentariuAdministrator = ({
  comentariu,
  selfEnd = true,
}: ComentariuAdminstratorProps) => {
  return (
    <div
      className={`w-1/2 border rounded flex flex-col gap-4 p-4 ${selfEnd ? "self-end" : ""} shadow-sm`}>
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <h2 className="font-bold text-[#15803d] text-lg">
            {comentariu.nume}
          </h2>
          <AdminPanelSettingsRoundedIcon fontSize="medium" color="success" />
        </div>
        <span className="text-xs text-gray-500 italic">{`<${comentariu.rol}>`}</span>
      </div>
      <p className="text-sm text-gray-500">{comentariu.mesaj}</p>
      <h3 className="text-sm text-gray-400 self-end">
        {comentariu.data.toString()}
      </h3>
    </div>
  );
};

export default ComentariuAdministrator;
