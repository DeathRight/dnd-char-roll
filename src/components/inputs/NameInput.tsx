import { blackA } from '@radix-ui/colors';
import { CheckIcon, CopyIcon, UpdateIcon } from '@radix-ui/react-icons';
import * as LabelPrim from '@radix-ui/react-label';
import React from 'react';
import { useEffect, useState } from 'react';

import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import { styled } from '../../stitches.config';
import { properNoun } from '../../util';
import { NameInputProps } from '../../util/component-props';
import Button from '../common/Button';
import Center from '../common/Center';
import Flex from '../common/Flex';
import { useTheme } from '../contexts/ThemeContextProvider';
import IconButton from '../IconButton';
import IconMorph from '../IconMorph';

const Label = styled(LabelPrim.Root, {
  fontSize: "$md",
  fontWeight: "bold",
  color: "$loC",
  userSelect: "none",
  marginRight: "$4",
});
const Input = styled("input", {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "$1",
  paddingLeft: "$2",
  paddingTop: "$2",
  paddingBottom: "$2",
  fontSize: "$md",
  color: "$hiC",
  backgroundColor: "$attActive",
  boxShadow: `0 0 0 1px ${blackA.blackA5}`,
  "&:focus": { boxShadow: `0 0 0 2px black` },
});
const RightDiv = styled(Center, {
  width: "auto",
  justifySelf: "flex-end",
  flexGrow: "unset",
  position: "relative",
});
const StyledIconButton = styled(Button, {
  borderWidth: "0",
  position: "absolute",
  bottom: "0",
  right: "0",
  width: "auto",
  paddingLeft: "6px",
  paddingRight: "6px",
  marginTop: "auto",
  boxShadow: "none",
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: "$hover",
    boxShadow: "none",
  },
  "&:active": {
    backgroundColor: "$active",
  },
  "&:disabled": {
    backgroundColor: "$select",
  },
});

const NameInput = (props: NameInputProps) => {
  const { gen, regen, htmlFor, text, onChange } = props;
  const [name, setName] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [copyValue, copy] = useCopyToClipboard();
  const [disabled, setDisabled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [Icon, setIcon] = useState(() => CopyIcon);
  const theme = useTheme();

  useEffect(() => {
    setName(properNoun(gen()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regen]);

  useEffect(() => {
    if (copied === true) {
      setIcon(CheckIcon);
      setTimeout(() => {
        setCopied(false);
        setDisabled(false);
        setIcon(CopyIcon);
      }, 3000);
    }
  }, [copied]);

  const onCopyClick = () => {
    copy(name)
      .then((v) => setCopied(true))
      .catch((r) => setDisabled(false));
    setDisabled(true);
  };

  const onInputChange = (v: string) => {
    if (v !== name) {
      onChange?.(v);
      setName(v);
    }
  };

  return (
    <Flex>
      <div>
        <Label htmlFor={htmlFor}>{text}</Label>
        <Input
          type="text"
          id={htmlFor}
          value={name}
          onChange={(e) => onInputChange(e.target.value)}
        />
        <RightDiv>
          <StyledIconButton
            aria-label={`Copy ${text}`}
            onClick={onCopyClick}
            disabled={disabled}
          >
            <IconMorph
              icon={Icon}
              color={copied ? theme.colors.successA.value : undefined}
            />
          </StyledIconButton>
        </RightDiv>
      </div>
      <IconButton
        icon={UpdateIcon}
        aria-label={`Regenerate ${text}`}
        onClick={() => onInputChange(properNoun(gen()))}
        tooltip={`Regenerate ${text}`}
      />
    </Flex>
  );
};

export default NameInput;
