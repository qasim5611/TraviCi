import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Container,
    makeStyles,
    Typography,
} from '@material-ui/core'
import ApiConfig from "../../../Config/APIconfig";
import axios from "axios";

import React, { useState, useEffect } from 'react'
import DisputeListData from './DisputeListData';

const useStyles = makeStyles((theme) => ({}))

export default function DisputeListTable({ dataParticular, obj }) {
    const classes = useStyles()
    const [disputedList, setDisputedList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    console.log("disputedList----", obj);

    const disputeHandler = async () => {
        setIsLoading(true)
        try {

            const res = await axios({
                method: "GET",
                url: ApiConfig.disputedContractListByMilestoneId,
                headers: {
                    token: localStorage.getItem("creatturAccessToken")
                },
                params: {
                    contractId: obj?.contractId?._id ? obj?.contractId?._id : obj?._id
                }
            })
            if (res.data.response_code === 200) {
                setDisputedList(res.data.result)
                setIsLoading(false)

            }
            setIsLoading(false)

        } catch (error) {
            console.log(error);
            setIsLoading(false)

        }
    }
    useEffect(() => {
        disputeHandler()
    }, [])


    return (
        <Box>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="tableCell" align="left">
                                Sr. No
                            </TableCell>
                            <TableCell className="tableCell" align="left">
                                Document
                            </TableCell>

                            <TableCell className="tableCell" align="left">
                                Status
                            </TableCell>
                            <TableCell className="tableCell" align="left">
                                User Type
                            </TableCell>
                            <TableCell className="tableCell" align="left">
                                Action
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {disputedList &&
                            disputedList.map((data, index) => (
                                <DisputeListData
                                    data={data}
                                    classes={classes}
                                    index={index}
                                    loading={isLoading}

                                />
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>


        </Box>
    )
}
