import { styled } from '../../stitches.config';

const StickyHeader = styled("header", {
  position: "sticky",
  top: "0",
  backgroundColor: "$blackA6",
  opacity: "0.5",
  display: "flex",
  flexDirection: "row-reverse",
  flex: "0 0 auto",
});
export default StickyHeader;
