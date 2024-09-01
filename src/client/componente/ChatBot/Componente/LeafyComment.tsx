import { Avatar } from "@mui/material";

interface LeafyCommentProps {
  mesaj: string;
  marginTop?: boolean;
}

export const LeafyComment = (props: LeafyCommentProps) => {
  return (
    <div className="flex flex-col gap-4 w-2/3 border px-4 py-4 rounded-md ">
      <section className="flex gap-2 items-center">
        <Avatar
          sx={{ backgroundColor: "green", width: "2.2rem", height: "2.2rem" }}>
          <img
            src="/leafy.png"
            alt="leafy"
            style={{
              width: "18px",
              height: "18px",
            }}
          />
        </Avatar>
        <div>
          <h1 className="font-bold text-sm text-green-700">Leafy</h1>
          <h2 className="text-xs">Support bot</h2>
        </div>
      </section>
      <p className="text-sm text-gray-500">{props.mesaj}</p>
      <h3 className="text-xs text-gray-400 self-end">
        {new Date().toLocaleString()}
      </h3>
    </div>
  );
};
