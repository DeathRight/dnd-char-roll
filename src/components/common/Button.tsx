import { styled } from "../../stitches.config";

const Button = styled("button", {
    backgroundColor: "$active",
    fontSize: "$md",
    color: "$hiC",
    height: "$4",
    borderWidth: "$1",
    borderStyle: "solid",
    borderRadius: "$2",
    borderColor: "$a7",
    margin: "$1",
    padding: "$3",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "$1",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: "$hover",
        //boxShadow: "$2",
    },
    "&:active": {
        backgroundColor: "$select",
    },
    "&:disabled": {
        backgroundColor: "$inactive",
        color: "$loC",
    },
});

export default Button;
