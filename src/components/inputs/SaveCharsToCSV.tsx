import { DownloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { CSVDownload } from "react-csv";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import { SaveToCSVProps } from "../../util/component-props";
import { useGenSettings } from "../contexts/SettingsContextProvider";
import IconButton from "../IconButton";
import Spinner from "../Spinner";

const SaveCharsToCSV = (props: SaveToCSVProps) => {
    const { headers } = props;
    const { characters } = useGenSettings();
    const [exporting, setExporting] = useState(false);

    useUpdateEffect(() => {
        if (exporting) setExporting(false);
    }, [exporting]);

    return (
        <>
            {exporting && (
                <CSVDownload
                    filename={"Characters"}
                    headers={headers}
                    data={characters as object[]}
                    target={"_self"}
                />
            )}
            {characters ? (
                <IconButton
                    leftIcon={DownloadIcon}
                    text={"Export to CSV"}
                    onClick={(e) => setExporting(true)}
                />
            ) : (
                <Spinner />
            )}
        </>
    );
};
export default SaveCharsToCSV;
