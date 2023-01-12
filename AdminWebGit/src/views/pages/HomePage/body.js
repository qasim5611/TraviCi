import React, { useState } from "react";
import { Typography, Box, Card, Grid, Button, makeStyles, TextField, withStyles, ThemeProvider, createMuiTheme, CardMedia, MenuItem } from "@material-ui/core";
import InviteImage from '../../../Images/NewProject.jpg'
const teams = [
    {
        value: 'teamA',
        label: 'B.A.',
    },
    {
        value: 'teamB',
        label: 'Marketing',
    },
    {
        value: 'teamC',
        label: 'Back-end',
    },
    {
        value: 'teamD',
        label: 'Front-end',
    },
];


const CustomButton = withStyles({
    root: {
        width: 140,
        marginRight: 18,
        marginTop: 18,
        borderRadius: '4px',
    },
},
)(Button);

const privacies = [
    {
        value: 'privacyA',
        label: 'Public to team',
    },
    {
        value: 'privacyB',
        label: 'Public to everyone',
    },

];

const useStyles = makeStyles((theme) => ({

    modal: {
        // top: '5%',
        // left: '14%',
        // right: '12%',
        // bottom: '15%',
        // position: 'absolute',
        borderRadius: '4px',
        backgroundColor: 'white'
    },
    fullHeight: { height: '100%' },
    mainContainer: {
        maxWidth: 1200
    }

}))

const Body = () => {

    const [team, setTeam] = useState('teamA');
    const [privacy, setPrivacy] = useState('privacyA');

    const privacyChange = (event) => {
        setPrivacy(event.target.value)
    }

    const teamChange = (event) => {
        setTeam(event.target.value);
    };


    const classes = useStyles();
    return (
        <Box className={classes.mainContainer}>
            <Grid container className={classes.modal}>
                <Grid item xs={6}>
                    <Box pt={5} pl={8} width='70%'>
                        <Grid container justify="center" alignItems="center">
                            <Grid container spacing={3} direction='column'>

                                <Grid item className='contract-head'>
                                    <Typography variant='h1'>New Contract yy</Typography>
                                    <Typography variant='h6'>Fill out Details</Typography>

                                </Grid>

                                <Grid item className='Status'>
                                    <Grid item><Typography variant='h4'>Status</Typography></Grid>
                                    <Grid item>

                                        <CustomButton variant='outlined'>In Draft</CustomButton>
                                        <CustomButton variant='outlined'>In Review</CustomButton>
                                        <CustomButton variant='outlined'>Live/ Active</CustomButton>
                                        <CustomButton fullWidth variant='outlined'>Validation</CustomButton>
                                        <CustomButton variant='outlined'>Completed</CustomButton>


                                    </Grid>
                                </Grid>

                                <Grid item className='Contract-name'>
                                    <Grid container spacing={3} direction='column'>
                                        <Grid item><Typography variant='h4'>Contract Name</Typography></Grid>
                                        <Grid item><TextField id="outlined-basic" fullWidth='true' placeholder="example" variant="outlined" /></Grid>
                                    </Grid>

                                </Grid>

                                <Grid item className='teamPrivacy'>
                                    <Grid container spacing={3}>
                                        <Grid item>
                                            <Typography variant='h4'>Team</Typography>
                                            <TextField onChange={teamChange} select value={team} >

                                                {teams.map((option) => (

                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}


                                            </TextField>
                                        </Grid>

                                        <Grid item>
                                            <Typography variant='h4'>Privacy</Typography>
                                            <TextField onChange={privacyChange} select value={privacy} >

                                                {privacies.map((option) => (

                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}


                                            </TextField>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item><CustomButton variant='contained' color='secondary'>Next</CustomButton></Grid>


                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

                <Grid item className={classes.fullHeight} xs={6}>
                    <Card className={classes.fullHeight} elevation={0}>
                        <CardMedia component='img' alt='cardA' image={InviteImage} />

                    </Card>
                </Grid>

            </Grid>
        </Box>
    )


}

export default Body