import { Avatar } from "@mui/material";
import Face2Icon from "@mui/icons-material/Face2";
import FaceIcon from "@mui/icons-material/Face";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import React from "react";
import { AvatarUtilizatorProps } from "./Interfete";

const avatarIcons: Record<"male" | "female", React.ReactElement> = {
  male: <FaceIcon fontSize="large" />,
  female: <Face2Icon fontSize="medium" />,
};

export const AvatarUtilizator = (props: AvatarUtilizatorProps) => {
  const [gender, setGender] = React.useState<"male" | "female" | null>(null);

  const determineGender = React.useCallback((cnp: string) => {
    const firstDigit = parseInt(cnp[0]);
    const avatarMap: { [key: number]: "male" | "female" } = {
      1: "male",
      2: "female",
      5: "male",
      6: "female",
    };
    setGender(avatarMap[firstDigit] || null);
  }, []);

  React.useEffect(() => {
    if (["STANDARD", "ADMINISTRATOR"].includes(props.tip)) {
      if (props.cnp) {
        determineGender(props.cnp);
      }
    }
  }, [props.cnp, props.tip, determineGender]);

  if (["STANDARD", "ADMINISTRATOR"].includes(props.tip)) {
    return (
      <Avatar
        src={props.poza || ""}
        sx={{
          width: 40,
          height: 40,
          bgcolor: props.poza ? undefined : "#388e3c",
        }}>
        {!props.poza && avatarIcons[gender ?? "male"]}
      </Avatar>
    );
  }

  return (
    <Avatar
      src={props.poza || ""}
      sx={{
        width: 40,
        height: 40,
        bgcolor: props.poza ? undefined : "#388e3c",
      }}>
      {!props.poza && <BusinessCenterIcon />}
    </Avatar>
  );
};
