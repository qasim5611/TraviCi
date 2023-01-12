import React, { useEffect, useState } from 'react';
import SearchFilter from '../../../component/SearchFilter';
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

function download_table_as_csv(table_id, separator = ',') {
	// Select rows from table_id
	var rows = document.querySelectorAll('table#' + table_id + ' tr');
	// Construct csv
	var csv = [];
	for (var i = 0; i < rows.length; i++) {
		var row = [],
			cols = rows[i].querySelectorAll('td, th');
		for (var j = 0; j < cols.length; j++) {
			// Clean innertext to remove multiple spaces and jumpline (break csv)
			var data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ');
			// Escape double-quote with double-double-quote (see https://stackoverflow.com/questions/17808511/properly-escape-a-double-quote-in-csv)
			data = data.replace(/"/g, '""');
			// Push escaped string
			row.push('"' + data + '"');
		}
		csv.push(row.join(separator));
	}
	var csv_string = csv.join('\n');
	// Download it
	var filename = 'export_' + table_id + '_' + new Date().toLocaleDateString() + '.csv';
	var link = document.createElement('a');
	link.style.display = 'none';
	link.setAttribute('target', '_blank');
	link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
	link.setAttribute('download', filename);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}
export default function (props) {
	const [users, setUsers] = useState([]);
	const [filterData, setFilterData] = useState({
		fromDate: '05/05/2021',
		toDate: '11/06/2021',
	});
	const classes = useStyles();
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
		// setIsLoading(true);
		axios
			.post(
				ApiConfig.getUserList,
				{ fromDate: filterData.fromDate, toDate: filterData.toDate, search: filterData.search },
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
					setUsers(response.data.result.docs);
					console.log(response);

					// else setHistory(depositFilter);
				}
				// setIsLoading(false);
			})
			.catch((response) => {
				// setIsUpdating(false);

				console.log('response', response);
			});
	}, [filterData]);
	function createData(Sr_No, contractName, milestone1, milestone2, milestone3, milestone4) {
		return {
			Sr_No,
			contractName,
			milestone1,
			milestone2,
			milestone3,
			milestone4,
		};
	}
	const rows = [
		createData(1, 'contract Name', 'M1', 'M2', 'M3', 'M4'),
		createData(2, 'contract Name', 'M1', 'M2', 'M3', 'M4'),
		createData(3, 'contract Name', 'M1', 'M2', 'M3', 'M4'),
		createData(4, 'contract Name', 'M1', 'M2', 'M3', 'M4'),
		createData(5, 'contract Name', 'M1', 'M2', 'M3', 'M4'),
	];

	return (
		<Container maxWidth="xl" style={{ overflowX: 'auto', paddingBottom: '100px' }}>
			<Page style={{ display: 'flex', flexDirection: 'column' }} title="Milestone Management">
				<Box py={3}>
					<Typography variant="h3" style={{ marginBottom: '8px' }}>
						<strong>Milestone Management</strong>
					</Typography>
					<Divider />

					<Box py={5}>
						<SearchFilter
							exportProps={{ title: 'Export CSV', onClick: download_table_as_csv, name: 'user_list' }}
							pdfProps={{ title: 'Export PDF', name: 'user_list' }}
							searchProps="Search By Name"
							setfilterData={setFilterData}
							filterData={filterData}
						/>
					</Box>
				</Box>

				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label="simple table" id="user_list">
						<TableHead>
							<TableRow>
								<TableCell style={{ color: 'white', backgroundColor: '#252d47' }}>Sr.No</TableCell>
								<TableCell style={{ color: 'white', backgroundColor: '#252d47' }} align="center">
									Contract Name
								</TableCell>
								<TableCell style={{ color: 'white', backgroundColor: '#252d47' }} align="center">
									MileStone 1
								</TableCell>
								<TableCell style={{ color: 'white', backgroundColor: '#252d47' }} align="center">
									MileStone 2
								</TableCell>
								<TableCell style={{ color: 'white', backgroundColor: '#252d47' }} align="center">
									MileStone 3
								</TableCell>
								<TableCell style={{ color: 'white', backgroundColor: '#252d47' }} align="center">
									MileStone 4
								</TableCell>

								<TableCell style={{ color: 'white', backgroundColor: '#252d47' }} align="center">
									Actions
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row, i) => (
								<TableRow key={row.name}>
									<TableCell component="th" scope="row">
										{i + 1}
									</TableCell>

									<TableCell align="center">{row.contractName}</TableCell>
									{/* <TableCell align="center">{row.IP_Address}</TableCell> */}
									<TableCell align="center">{row.milestone1}</TableCell>
									<TableCell align="center">{row.milestone2}</TableCell>
									<TableCell align="center">{row.milestone3}</TableCell>
									<TableCell align="center">{row.milestone4}</TableCell>

									<TableCell style={{ width: 5 }} align="right">
										<Box display="flex">
											<Link href="/view-milestone">
												<Button variant="contained" color="primary" className={classes.button}>
													<VisibilityIcon style={{ fontSize: '15px' }} />
												</Button>
											</Link>


											<Button
												variant="contained"
												color="secondary"
												className={classes.button}
												onClick={openDelete}
											>
												<DeleteIcon fontSize="small" style={{ fontSize: '15px' }} />
											</Button>
										</Box>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<Box display="flex" justifyContent="flex-end">
					<Pagination count={1} shape="rounded" />
				</Box>
				<Dialog
					open={isBlock}
					onClose={closeBlock}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Are you sure you want to block this User?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button color="primary">Yes</Button>
						<Button onClick={closeBlock} color="primary" autoFocus>
							No
						</Button>
					</DialogActions>
				</Dialog>

				<Dialog
					open={isDelete}
					onClose={closeDelete}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Are you sure you want to delete this Milestone?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button color="primary">Yes</Button>
						<Button onClick={closeDelete} color="primary" autoFocus>
							No
						</Button>
					</DialogActions>
				</Dialog>
			</Page>
		</Container>
	);
}
