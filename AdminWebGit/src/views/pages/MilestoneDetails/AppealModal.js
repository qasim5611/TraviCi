import { Box, Button, Dialog, DialogContent, TextField, Typography } from '@material-ui/core'
import React from 'react'

export default function AppealModal({ appealOpen, setAppealOpen }) {
    return (
        <Dialog open={appealOpen} onClose={() => setAppealOpen(false)} >
            <DialogContent>
                <Typography>Appeal For Dispute</Typography>
                <Box mt={1}>
                    <label style={{ paddingBottom: "6px" }}>Appeal</label>
                    <TextField variant='outlined' placeholder='Enter your point' fullWidth />
                </Box>
                <Box mt={1}>
                    <Button variant='contained' color="primary">Appeal File</Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
}
