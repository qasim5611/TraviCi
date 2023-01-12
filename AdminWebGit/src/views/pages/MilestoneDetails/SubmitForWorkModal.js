import { Box, FormControl, Button, Dialog, DialogContent, Divider, makeStyles, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import InputAdornment from '@material-ui/core/InputAdornment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { Cancel } from "@material-ui/icons";



const useStyles = makeStyles((theme) => ({
    mainBody: {
        "& h5": {
            fontSize: "14px"
        },
        "& h6": {
            paddingBottom: '.2rem',
            paddingTop: '.5rem',
            fontSize: "15px"
        }
    }
}))

export default function SubmitForWorkModal({ workOpen, setWorkOpen, workData }) {
    const classes = useStyles()
    console.log("workData---", workData);
    const [fileUpload, setFileUpload] = React.useState("");

    const clear = () => {
        setFileUpload("")

    }

    return (
        <Dialog open={workOpen} onClose={() => setWorkOpen(false)} >
            <DialogContent className={classes.mainBody}>
                <Box>
                    <Typography>
                        Submit Work or request payment for a milestone
                    </Typography>
                </Box>
                <Box mt={1} mb={2}>
                    <Divider />
                </Box>
                <Box>
                    <Typography variant='h5'>Use this form to request approval for the work youe've completed. Your payment will be released upon approval. </Typography>
                    <Typography variant='h6'>Milestone</Typography>
                    <Select variant='outlined' fullWidth value={workData?.milestone} >
                        <MenuItem value={workData?.milestone}>{workData?.milestone}</MenuItem>
                    </Select>
                    <Typography variant='h6'>Description</Typography>
                    <TextField placeholder='Enter description' value={workData?.description} fullWidth variant='outlined' multiline rows={3} />
                </Box>
                <Box>
                    <Typography variant='h6'>Amount</Typography>
                    <TextField variant='outlined' value={workData?.amount} InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AttachMoneyIcon />
                            </InputAdornment>
                        ),
                    }} />
                    <Typography variant='h6'>Message</Typography>

                    <TextField variant='outlined' placeholder='Enter message' fullWidth multiline rows={3} />
                </Box>
                <Box mt={2}>
                    <FormControl fullWidth>
                        <Button
                            variant="outlined"
                            component="label"
                            style={{ justifyContent: "flex-start" }}
                        >
                            {" + Attach File"}
                            <input
                                type="file" accept="image/png, image/gif, image/jpeg"
                                hidden
                                name="file"
                                multiple
                                onChange={(e) =>
                                    setFileUpload(e.currentTarget.files[0])
                                }
                            />
                        </Button>
                    </FormControl>
                    <Typography variant="h6" style={{ display: "flex", cursor: "pointer" }}>
                        {fileUpload && fileUpload?.name}
                        {fileUpload && <Cancel onClick={clear} />}
                    </Typography>


                </Box>
                <Box>
                    <Button variant="outlined" color="secondary">Submit</Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
}
