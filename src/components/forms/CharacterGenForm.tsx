import { useState } from 'react';

import { Sex } from '../../util';
import Center from '../common/Center';
import Divider from '../common/Divider';
import Flex from '../common/Flex';
import RadioGroup, { RadioItem } from '../common/RadioGroup';
import NameGenInput from '../inputs/NameGenInput';

const CharacterGenForm = () => {
  const [sex, setSex] = useState(Sex.Male);

  return (
    <Center as={"form"} onSubmit={(e: any) => e.preventDefault()}>
      <Divider label="Sex" />
      <Flex>
        <RadioGroup
          orientation="horizontal"
          defaultValue={Sex[sex]}
          aria-label="Sex"
          onValueChange={(v: keyof typeof Sex) => setSex(Sex[v])}
        >
          <RadioItem value="Male" label="Male" />
          <RadioItem value="Female" label="Female" />
        </RadioGroup>
      </Flex>
      <Divider label="Name Generator" />
      <NameGenInput sex={sex} />
    </Center>
  );
};

export default CharacterGenForm;
