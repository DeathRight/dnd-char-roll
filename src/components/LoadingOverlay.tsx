import Modal from "./common/Modal";
import Spinner from "./Spinner";

const LoadingOverlay = () => (
  <Modal show={true} css={{ outline: "none" }}>
    <Spinner />
  </Modal>
);
export default LoadingOverlay;
