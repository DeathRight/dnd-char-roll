import { styled } from '../../stitches.config';

const Backdrop = styled("div", {
  position: "fixed",
  zIndex: "$4",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  backgroundColor: "$blackA6",
  opacity: "0.5",
  display: "flex",
  flexDirection: "row",
  flexGrow: "0",
  flexShrink: "0",
  justifyContent: "center",
  alignItems: "center",
});

export default Backdrop;
