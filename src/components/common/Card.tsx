import { styled } from '../../stitches.config';

const Card = styled("div", {
    backgroundColor: "$cardBg",
    display: "flex",
    flex: "0 1 auto",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    boxShadow: "$1",
    borderRadius: "$2",
    margin: "$2",
    padding: "$2",
    /*"&:hover": {
    boxShadow: "$2",
  },*/
});

export default Card;
