import { CSVLink } from "react-csv";
import { SaveToCSVProps } from "../../util/component-props";

const SaveToCSV = (props: SaveToCSVProps) => {
    const { headers, data } = props;

    return (
        <>
            {data?.[0] !== undefined ? (
                <CSVLink headers={headers} data={data} filename={"Characters"}>
                    Export to CSV
                </CSVLink>
            ) : (
                "(loading...)"
            )}
        </>
    );
};
export default SaveToCSV;
