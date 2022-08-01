import { styled } from '../stitches.config';
import { DialogProps, DialogPropsSpecific } from '../util/component-props';
import Backdrop from './common/Backdrop';
import Card from './common/Card';
import Modal from './common/Modal';

export const DialogTitle = styled("div", {
  alignSelf: "stretch",
  justifySelf: "flex-start",
  alignContent: "start",
  fontSize: "$lg",
  color: "$hiC",
});

export const DialogContent = styled("div", {
  alignSelf: "stretch",
  justifySelf: "center",
  alignContent: "start",
  fontSize: "$md",
  color: "$loC",
  mt: "$3",
});

export const DialogActions = styled("div", {
  display: "flex",
  alignSelf: "stretch",
  justifySelf: "flex-end",
  justifyContent: "end",
  mt: "$3",
  "&button": {
    mx: "$3",
  },
});

const Dialog = (props: DialogProps) => {
  const { children, className, as, show, onHide } = props;

  // Remove specific props so we can spread to base component
  // No actual performance hit, since it should never have to do more than a handful of iterations
  const baseProps = Object.fromEntries(
    Object.entries(props).filter(([k]) => !DialogPropsSpecific[k])
  );

  return (
    <Modal
      renderBackdrop={(bdProps: any) => <Backdrop {...bdProps} />}
      show={show}
      onHide={onHide}
      as={as}
      className={className}
      {...baseProps}
    >
      <Card>{children}</Card>
    </Modal>
  );
};

export default Dialog;
