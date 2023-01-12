import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import SearchFilter from '../../../component/SearchFilter';
import ContentLoading from 'src/component/ContentLoading';
import {
	Container,
	Dialog,
	Paper,
	DialogActions,
	DialogContent,
	DialogContentText,
	Divider,
	Box,
	Link,
	Typography,
	Button,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableBody,
	Table,
} from '@material-ui/core';
import axios from 'axios';
import ApiConfig from 'src/Config/APIconfig';
import { usePagination } from '@material-ui/lab/Pagination';
import Pagination from '@material-ui/lab/Pagination';

import BlockIcon from '@material-ui/icons/Block';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';

import Page from 'src/component/Page';
import { makeStyles } from '@material-ui/core/styles';

// import { DataGrid } from '@material-ui/data-grid';
const accessToken = window.sessionStorage.getItem('creatturAccessToken');
const useStyles = makeStyles({
	table: {
		minWidth: 320,
	},
	pdbt: {
		paddingBottom: 68,
		minWidth: '1050px',
		width: 'auto',
	},

	button: {
		minWidth: 'initial',
		padding: '6px',
		marginLeft: '7px',
	},
});

export default function (props) {
	const [plans, setPlans] = React.useState([]);
	const classes = useStyles();
	const [isLoading, setIsLoading] = useState(false);
	const { items } = usePagination({
		count: 10,
	});
	const [isBlock, setBlock] = React.useState(false);

	const openBlock = () => {
		setBlock(true);
	};

	const closeBlock = () => {
		setBlock(false);
	};
	const [isDelete, setDelete] = React.useState(false);

	const openDelete = () => {
		setDelete(true);
	};

	const closeDelete = () => {
		setDelete(false);
	};
	useEffect(() => {
		setIsLoading(true);
		axios
			.get(
				ApiConfig.getPlanList,

				{
					headers: {
						token: accessToken,
					},
				}
			)
			.then((response) => {
				if (response.data.response_code !== 200) {
				} else {
					// setDisplayname
					// console.log(result)
					const recievedPlans = response.data.result.splice(0, 4);
					setPlans(recievedPlans);
					console.log(response);

					// else setHistory(depositFilter);
				}
				setIsLoading(false);
			})
			.catch((response) => {
				// setIsUpdating(false);

				console.log('response', response);
			});
	}, []);
	function createData(Sr_No, planName, planPrice, updatedDate) {
		return {
			Sr_No,
			planName,
			planPrice,
			updatedDate,
		};
	}
	const rows = [
		createData(1, 'Mobile App', 166.259, '25/12/2020 14:25:26'),
		createData(2, 'Web App', 1669, '25/12/2020 14:25:26'),
		createData(3, 'Game App', 259, '25/12/2020 14:25:26'),
		createData(4, 'Responsive', 5689, '25/12/2020 14:25:26'),
		createData(5, 'Mobile App', 1259, '25/12/2020 14:25:26'),
	];

	return (
		<Container maxWidth="xl" style={{ overflowX: 'auto', paddingBottom: '100px' }}>
			<Page style={{ display: 'flex', flexDirection: 'column' }} title="Subscription Plan management">
				<Box py={3}>
					<Typography variant="h3" style={{ marginBottom: '8px' }}>
						<strong>Subscription Plan Management</strong>
					</Typography>
					<Divider />
				</Box>
				{isLoading ? (<ContentLoading />) : (
					<TableContainer component={Paper}>
						<Table className={classes.table} aria-label="simple table" id="user_list">
							<TableHead>
								<TableRow>
									<TableCell style={{ color: 'white', backgroundColor: '#252d47' }}>Sr.No</TableCell>
									{/* <TableCell style={{ color: 'white', backgroundColor: '#252d47' }} align="center">
									Plan Image
								</TableCell> */}
									<TableCell style={{ color: 'white', backgroundColor: '#252d47' }} align="center">
										Plan Name
									</TableCell>
									<TableCell style={{ color: 'white', backgroundColor: '#252d47' }} align="center">
										Plan price
									</TableCell>

									<TableCell style={{ color: 'white', backgroundColor: '#252d47' }} align="center">
										Last updated Date & Time
									</TableCell>

									<TableCell style={{ color: 'white', backgroundColor: '#252d47' }} align="center">
										Actions
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{plans.map((row, i) => (
									<TableRow key={row.name}>
										<TableCell component="th" scope="row">
											{i + 1}
										</TableCell>

										{/* <TableCell align="center">
										<img src={row.planImage} alt="planImage" />
									</TableCell> */}
										<TableCell align="center">{row.planName}</TableCell>
										{/* <TableCell align="center">{row.IP_Address}</TableCell> */}
										<TableCell align="center">{row.amount}</TableCell>
										<TableCell align="center">{row.updatedAt}</TableCell>

										<TableCell style={{ width: 5 }} align="right">
											<Box display="flex">
												<Link
													to={{
														pathname: '/view-subscription-plan',
														state: {
															name: row.planName,
															price: row.amount,
														},
													}}
													component={RouterLink}
												>
													<Button variant="contained" color="primary" className={classes.button}>
														<VisibilityIcon style={{ fontSize: '15px' }} />
													</Button>
												</Link>
												<Link
													to={{
														pathname: '/edit-plan',
														state: {

															id: row._id
														},
													}}
													component={RouterLink}
												>
													<Button variant="contained" className={classes.button}>
														<EditIcon fontSize="small" style={{ fontSize: '15px' }} />
													</Button>
												</Link>
											</Box>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				)}
				{/* <Box display="flex" justifyContent="flex-end">
					<Pagination count={3} shape="rounded" />
				</Box> */}
			</Page>
		</Container>
	);
}
