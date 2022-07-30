import React, { useState } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import useUpdateEffect from "../hooks/useUpdateEffect";
import { styled } from "../stitches.config";
import { DnDListItem, HeaderDnDListProps } from "../util/component-props";
import { StrictModeDroppable } from "./common/StrictModeDroppable";

const HeaderDiv = styled("div", {
    display: "inline-flex",
    flexWrap: "nowrap",
    alignItems: "center",
    flexDirection: "row",
    overflowX: "auto",
    width: "100%",

    borderWidth: "$1",
    borderStyle: "solid",
    borderColor: "$attSelect",
});
const HeaderContent = styled("div", {
    display: "flex",
    alignItems: "center",
    padding: "$1",
    "&:first-child": { borderLeftColor: "transparent" },
    "&:last-child": { borderRightColor: "transparent" },
    borderLeftWidth: "$1",
    borderRightWidth: "$1",
    borderStyle: "solid",
    borderColor: "$attSelect",
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    userSelect: "none",
    cursor: "grab",
});

const HeaderItem = (props: { value: DnDListItem; index: number }) => {
    const { value, index } = props;
    const { key: id, label: text } = value;

    return (
        <Draggable key={id} draggableId={id} index={index}>
            {(provided) => (
                <HeaderContent
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {text}
                </HeaderContent>
            )}
        </Draggable>
    );
};

const HeaderList = React.memo((props: { list: DnDListItem[] }) => {
    return (
        <>
            {props.list.map((v, i) => (
                <HeaderItem value={v} index={i} />
            ))}
        </>
    );
});

const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = new Array(...list);
    result.splice(endIndex, 0, result.splice(startIndex, 1)[0]);
    return result;
};

const HeaderDnDList = (props: HeaderDnDListProps) => {
    const { list, onChange } = props;

    const [items, setItems] = useState(list);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        if (result.destination.index === result.source.index) return;

        const l = reorder(items, result.source.index, result.destination.index);
        setItems(l);
    };

    useUpdateEffect(() => {
        onChange?.(items);
    }, [items]);

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <StrictModeDroppable
                droppableId={"headerList"}
                direction={"horizontal"}
            >
                {(provided) => (
                    <HeaderDiv
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <HeaderList list={items} />
                        {provided.placeholder}
                    </HeaderDiv>
                )}
            </StrictModeDroppable>
        </DragDropContext>
    );
};

export default HeaderDnDList;
