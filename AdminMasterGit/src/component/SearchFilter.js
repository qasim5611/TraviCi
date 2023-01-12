import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Box, Typography, TextField, Card, Link, CardContent, Button, Grid } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
const SearchFilter = ({
	exportProps,
	addProps,
	showTabs,
	searchProps,
	selectedTab,
	searchByDrop,
	tabChange,
	transactionType,
	currencyType,
	searchBar,
	pdfProps,
	setfilterData,
	filterData,
	handleSearch
}) => {
	const [selectedDate1, setSelectedDate1] = React.useState(new Date('2014-08-18T21:11:54'));

	const handleDateChange1 = (date) => {
		setfilterData({ ...filterData, fromDate: date});
		
	};

	const [selectedDate2, setSelectedDate2] = React.useState(new Date('2014-08-18T21:11:54'));

	const handleDateChange2 = (date) => {
		setfilterData({ ...filterData, toDate: date});
	};

	const categories = [
		{
			value: 'all',
			label: 'All',
		},
		{
			value: 'referenceId',
			label: 'Reference Id',
		},
		{
			value: 'date',
			label: 'Date',
		},
	];


	const searchByHandler = (e) => {
		setfilterData({ ...filterData, search: e.target.value });
		
	};

	return (
		<Card raised>
			<CardContent>
				{showTabs && (
					<Box pb={7}>
						<Tabs
							value={selectedTab}
							onChange={tabChange}
							aria-label="simple tabs example"
							indicatorColor="secondary"
						>
							<Tab value="General" label="General" />
							<Tab value="Contracts" label="Contracts" />
						</Tabs>
					</Box>
				)}

				<Typography variant="h4" style={{ marginBottom: '18px' }}>
					Filter by
				</Typography>
				<Grid container spacing={1} alignItems="center">
					{searchBar && (
						<Grid item md={3}>
							<Typography variant="h3">Search:</Typography>
							<TextField
								style={{ marginTop: '10px' }}
								variant="outlined"
								placeholder={searchBar.placeholder}
								fullWidth
								size="small"
							/>
						</Grid>
					)}
					{searchByDrop && (
						<Grid item md={3}>
							<Typography variant="h3">Search By</Typography>
							<TextField
								style={{ marginTop: '10px' }}
								variant="outlined"
								fullWidth
								select
								value={filterData.search}
								onChange={searchByHandler}
								style={{ width: '190px', marginTop: '13px' }}
							>
								{categories.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						</Grid>
					)}

					{transactionType && (
						<Grid item md={3}>
							<Typography variant="h3" style={{ marginBottom: '13px' }}>
								{transactionType.title}
							</Typography>
							<TextField
								variant="outlined"
								size="small"
								select
								value={transactionType.transaction}
								onChange={transactionType.handler}
								style={{ width: '190px', marginTop: '13px' }}
							>
								{transactionType.transactions.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						</Grid>
					)}

					{currencyType && (
						<Grid item md={3}>
							<Typography variant="h3">Currency</Typography>
							<TextField
								variant="outlined"
								size="small"
								select
								value={currencyType.currency}
								onChange={currencyType.handler}
								style={{ width: '190px', marginTop: '13px' }}
							>
								{currencyType.currencies.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						</Grid>
					)}

					<Grid item md={3}>
						<Typography variant="h3">From Date</Typography>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								inputVariant="outlined"
								disableToolbar
								variant="inline"
								format="yyyy/mm/dd"
								margin="normal"
								id="date-picker-inline"
								value={filterData.fromDate}
								onChange={handleDateChange1}
								KeyboardButtonProps={{
									'aria-label': 'change date',
								}}
								size="small"
							/>
						</MuiPickersUtilsProvider>
					</Grid>
					<Grid item md={3}>
						{' '}
						<Typography variant="h3">To Date</Typography>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								inputVariant="outlined"
								disableToolbar
								variant="inline"
								format="yyyy/mm/dd"
								margin="normal"
								id="date-picker-inline"
								value={filterData.toDate}
								onChange={handleDateChange2}
								KeyboardButtonProps={{
									'aria-label': 'change date',
								}}
								size="small"
							/>
						</MuiPickersUtilsProvider>
					</Grid>
					{searchProps && (
						<Grid item md={3}>
							<Box mt={4}>
								<TextField variant="outlined" placeholder={searchProps} size="small" />
							</Box>
						</Grid>
					)}
					<Grid item md={3} xs={12}>
						<Box style={{ height: '65px' }} display="flex" alignItems="flex-end">
							<Button variant="contained" color="primary" onClick={handleSearch}>
								Search
							</Button>
							<Button
								variant="contained"
								color="primary"
								style={{ marginLeft: '3px', marginRight: '3px' }}
							>
								Reset
							</Button>
						</Box>
					</Grid>
				</Grid>
				<Box display="flex" mt={2}>
					{exportProps && (
						<Button
							variant="contained"
							color="primary"
							onClick={() => exportProps.onClick(exportProps.name)}
						>
							{exportProps.title}
						</Button>
					)}
					{pdfProps && (
						<Button
							variant="contained"
							color="primary"
							onClick={() => pdfProps.onClick(pdfProps.name)}
							style={{ marginLeft: '5px' }}
						>
							{pdfProps.title}
						</Button>
					)}
				</Box>

				<Box display="flex" justifyContent="flex-end" py={4}>
					{addProps && (
						<Link href={addProps.link}>
							<Button variant="contained" color="primary">
								{addProps.title}
							</Button>
						</Link>
					)}
				</Box>
			</CardContent>
		</Card>
	);
};

export default SearchFilter;
