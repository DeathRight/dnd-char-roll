import { ReloadIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useState } from "react";

import useUpdateEffect from "../../hooks/useUpdateEffect";
import { NameGenInputProps } from "../../util/component-props";
import Center from "../common/Center";
import Flex from "../common/Flex";
import {
    useCharacter,
    useCharName,
} from "../contexts/CharacterContextProvider";
import IconButton from "../IconButton";
import NameInput from "./NameInput";

const NameGenInput = (props: NameGenInputProps) => {
    const { shown = true } = props;

    const { sex } = useCharacter();
    const [_sex, setSex] = useState(sex);
    const [name, genName] = useCharName();

    useUpdateEffect(() => {
        if (_sex !== sex) {
            setSex(sex);
        }
    }, [sex]);

    useUpdateEffect(() => {
        genName(_sex).full();
    }, [_sex]);

    return shown ? (
        <Center style={{ flexGrow: "unset", flexShrink: "unset" }}>
            <NameInput
                htmlFor="firstName"
                text="First Name"
                onChange={(v) => {
                    if (name.firstName !== v) genName(v).first();
                }}
                onClick={() => genName().first()}
                value={name.firstName}
            />
            <NameInput
                htmlFor="lastName"
                text="Last Name"
                onChange={(v) => {
                    if (name.lastName !== v) genName(v).last();
                }}
                onClick={() => genName().last()}
                value={name.lastName}
            />
            <Flex>
                <IconButton
                    icon={UpdateIcon}
                    aria-label="Regenerate both names"
                    onClick={() => genName().full()}
                    width="100%"
                    tooltip="Regenerate both names"
                />
                <IconButton
                    icon={ReloadIcon}
                    aria-label="Regenerate seed"
                    onClick={() => genName().seed(sex)}
                    width="100%"
                    tooltip="Regenerate seed"
                />
            </Flex>
        </Center>
    ) : (
        <>
            <NameInput
                htmlFor="firstName"
                text="First Name"
                onChange={(v) => {
                    if (name.firstName !== v) genName(v).first();
                }}
                value={name.firstName}
                shown={false}
            />
            <NameInput
                htmlFor="lastName"
                text="Last Name"
                onChange={(v) => {
                    if (name.lastName !== v) genName(v).last();
                }}
                value={name.lastName}
                shown={false}
            />
        </>
    );
};

export default NameGenInput;
