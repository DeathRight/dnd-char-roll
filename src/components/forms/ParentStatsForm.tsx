import { useEffect, useId, useMemo, useState } from "react";
import { parentStatsArray } from "../../contexts/settings-context";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import { NumberInputProps, StatNames } from "../../util/component-props";
import NumberInput from "../inputs/NumberInput";

const ParentStatInput = (props: NumberInputProps) => {
    const { onChange, value, ...spread } = props;
    const [num, setNum] = useState(value ? parseInt(value as string) : 0);

    useUpdateEffect(() => {
        if (value !== num) setNum(value ? parseInt(value as string) : 0);
    }, [value]);
    return (
        <NumberInput
            max={30}
            value={num}
            onChange={(n) => setNum(n)}
            onBlur={(n) => {
                if (n !== num) setNum(n);
                onChange?.(num);
            }}
            {...spread}
        />
    );
};

const ParentStatsForm = (props: {
    stats?: parentStatsArray;
    onChange?: (stats: parentStatsArray) => void;
}) => {
    const { stats, onChange } = props;

    const uId = useId();
    const [values, setValues] = useState<parentStatsArray>(
        stats ?? [0, 0, 0, 0, 0, 0]
    );

    useEffect(() => {
        if (stats !== values) onChange?.(values);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onChange, values]);

    const statInputs = useMemo(
        () =>
            StatNames.map((v, i) => (
                <>
                    <ParentStatInput
                        value={values[i] ?? 0}
                        onChange={(n) => {
                            let a = Array.from(values) as typeof values;
                            a[i] = n;
                            setValues(a);
                        }}
                        text={v}
                        key={`${uId}-${i}`}
                    />
                </>
            )),
        [uId, values]
    );

    return <>{statInputs}</>;
};

export default ParentStatsForm;
