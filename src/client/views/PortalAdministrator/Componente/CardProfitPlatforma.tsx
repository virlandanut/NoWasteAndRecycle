import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";

interface CardProfitPlatforma {
  profitAzi: number;
  medieProfit: number;
}

const CardProfitPlatforma = ({
  profitAzi,
  medieProfit,
}: CardProfitPlatforma) => {
  return (
    <div className="w-1/3 bg-green-800 border rounded-lg flex flex-col gap-6 p-4">
      <div className="flex items-center justify-between">
        <PaymentsRoundedIcon
          className=" text-white"
          sx={{ fontSize: 100, margin: 0, padding: 0 }}
        />
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-white self-end">
            {profitAzi} RON
          </h1>
          <h2 className="text-xl text-white uppercase font-semibold self-end">
            Profit astăzi
          </h2>
        </div>
      </div>
      {profitAzi > medieProfit ? (
        <div className="flex items-end gap-2 self-center">
          <TrendingUpRoundedIcon className="text-white" sx={{ fontSize: 80 }} />
          <h3 className="text-7xl font-bold text-white">
            {Math.abs(Math.floor(100 - (medieProfit * 100) / profitAzi))}%
          </h3>
        </div>
      ) : (
        <div className="flex items-end gap-2 self-center">
          <TrendingDownRoundedIcon
            className="text-white"
            sx={{ fontSize: 80 }}
          />
          <h3 className="text-7xl font-bold text-white">
            {Math.abs(Math.floor(100 - (profitAzi * 100) / medieProfit))}%
          </h3>
        </div>
      )}
    </div>
  );
};

export default CardProfitPlatforma;
