import * as SliderPrimitive from '@radix-ui/react-slider';

import { styled } from '../../stitches.config';

const StyledSlider = styled(SliderPrimitive.Root, {
    position: "relative",
    display: "flex",
    alignItems: "center",
    userSelect: "none",
    touchAction: "none",
    width: 200,

    '&[data-orientation="horizontal"]': {
        height: 20,
    },

    '&[data-orientation="vertical"]': {
        flexDirection: "column",
        width: 20,
        height: 100,
    },
});

const StyledTrack = styled(SliderPrimitive.Track, {
    backgroundColor: "$blackA10",
    position: "relative",
    flexGrow: 1,
    borderRadius: "$pill",

    '&[data-orientation="horizontal"]': { height: 3 },
    '&[data-orientation="vertical"]': { width: 3 },
});

const StyledRange = styled(SliderPrimitive.Range, {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: "$pill",
    height: "100%",
});

const StyledThumb = styled(SliderPrimitive.Thumb, {
    all: "unset",
    display: "block",
    width: 20,
    height: 20,
    backgroundColor: "white",
    boxShadow: `0 2px 10px ${"$blackA7"}`,
    borderRadius: 10,
    "&:hover": { backgroundColor: "$a3" },
    "&:focus": { boxShadow: `0 0 0 5px ${"$blackA8"}` },
});

const Slider = (props: SliderPrimitive.SliderProps) => {
    const { children, max = 100, step = 1, ...spread } = props;
    return (
        <form>
            <StyledSlider max={max} step={step} {...spread}>
                <StyledTrack>
                    <StyledRange />
                </StyledTrack>
                <StyledThumb />
            </StyledSlider>
        </form>
    );
};

export default Slider;
