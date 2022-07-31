import { useId, useMemo, useState } from "react";
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
            value={num}
            onChange={(n) => setNum(n)}
            onBlur={() => onChange?.(num)}
            {...spread}
        />
    );
};

const ParentStatsForm = (props: {
    stats?: number[];
    onChange?: (stats: number[]) => void;
}) => {
    const { stats, onChange } = props;

    const uId = useId();
    const [values, setValues] = useState(stats ?? []);

    useUpdateEffect(() => {
        onChange?.(values);
    }, [values]);

    const statInputs = useMemo(
        () =>
            StatNames.map((v, i) => (
                <>
                    <ParentStatInput
                        value={values[i] ?? 0}
                        onChange={(n) => {
                            let a = Array.from(values);
                            a[i] = n;
                            setValues(a);
                        }}
                        title={v}
                        key={`${uId}-${i}`}
                    />
                </>
            )),
        [uId, values]
    );

    return <>{statInputs}</>;
};

export default ParentStatsForm;
