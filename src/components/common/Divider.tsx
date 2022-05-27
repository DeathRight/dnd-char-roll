import { styled } from '../../stitches.config';

const Container = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
const ContainerH = styled(Container, {
  width: "100%",
  //"&:nth-child(1)": { height: "1px" },
});
const ContainerV = styled(Container, {
  height: "100%",
  //"&:nth-child(1)": { width: "1px" },
  "&:nth-child(2)": {
    writingMode: "vertical-rl",
    transform: "rotate(180deg)",
  },
});

const Line = styled("div", {
  flexGrow: 1,
  backgroundColor: "$p6",
});
const LineH = styled(Line, { height: "1px" });
const LineV = styled(Line, { width: "1px" });

const Label = styled("div", {
  flexGrow: 0,
  marginLeft: "$2",
  marginRight: "$2",
  color: "$loC",
  userSelect: "none",
});

export enum Orientations {
  horizontal = "horizontal",
  vertical = "vertical",
}
export type Orientation = keyof typeof Orientations;
const Divider: React.FC<{ orientation?: Orientation; label?: string }> = ({
  orientation = Orientations.horizontal,
  label,
}) => {
  const ContainerO =
    orientation === Orientations.horizontal ? ContainerH : ContainerV;
  const LineO = orientation === Orientations.horizontal ? LineH : LineV;
  const Items = label ? (
    <>
      <Label>{label}</Label>
      <LineO />
    </>
  ) : undefined;
  return (
    <ContainerO role={"separator"} aria-orientation={orientation}>
      <LineO />
      {Items}
    </ContainerO>
  );
};

export default Divider;
