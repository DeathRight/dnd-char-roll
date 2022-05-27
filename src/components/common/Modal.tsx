import Mod from 'react-overlays/Modal';

import { styled } from '../../stitches.config';

const Modal = styled(Mod, {
  position: "fixed",
  zIndex: "$4",
  backgroundColor: "transparent",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export default Modal;
