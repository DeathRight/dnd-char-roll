import React, { useState } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import useUpdateEffect from "../hooks/useUpdateEffect";
import { styled } from "../stitches.config";
import { DnDListItem, HeaderDnDListProps } from "../util/component-props";
import Flex from "./common/Flex";
import { StrictModeDroppable } from "./common/StrictModeDroppable";

const HeaderContent = Flex;

const HeaderItem = (props: { value: DnDListItem; index: number }) => {
    const { value, index } = props;
    const { id, text } = value;

    return (
        <Draggable draggableId={id} index={index}>
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
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

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
                    <Flex
                        style={{ flexDirection: "row" }}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <HeaderList list={items} />
                        {provided.placeholder}
                    </Flex>
                )}
            </StrictModeDroppable>
        </DragDropContext>
    );
};

export default HeaderDnDList;
