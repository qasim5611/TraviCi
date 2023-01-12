import React, { useState } from "react";
import {
    TableCell,
    TableRow,
    makeStyles,
    Box,
    Grid,
    Avatar,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Tooltip } from "@material-ui/core";
import DisputeModal from "./DisputeModal";
import ContractModal from "./ContractModal";
import { useHistory } from "react-router-dom";

function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();

    return <Tooltip arrow classes={classes} {...props} />;
}
const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
        color: theme.palette.common.black,
    },
    tooltip: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
}));

export default function DisputeContractData({
    data,
    setIsOpenView,
    index,
    loading,
}) {
    const history = useHistory()
    const [open, setOpen] = useState(false);
    const [requestedData, setRequestedData] = useState();
    const handleData = (data) => {
        setRequestedData(data);
        setOpen(true);
    };
    return (
        <TableRow>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
                <Avatar src={data?.contractId?.contractDocument[0]} />
            </TableCell>
            <TableCell>{data?.companyId?.agencyTeam}</TableCell>
            <TableCell>{data?.contractId?.contractName}</TableCell>

            <TableCell align="left">
                <Box display="flex">
                    <Grid container >
                        <Box item display="flex">
                            <BootstrapTooltip
                                title="View Details"
                                onClick={() => history.push({
                                    pathname: "/dispute-list",
                                    state: data?.contractId?._id
                                })}
                            >
                                <VisibilityIcon
                                    style={{
                                        fontSize: "25px",
                                        cursor: "pointer",
                                        marginRight: "5px",
                                    }}
                                />
                            </BootstrapTooltip>
                        </Box>
                    </Grid>
                </Box>
            </TableCell>

        </TableRow>
    );
}
