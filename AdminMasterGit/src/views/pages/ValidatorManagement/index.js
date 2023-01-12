import React, { useEffect, useState, useRef } from "react";
import ContentLoading from "src/component/ContentLoading";
import SearchFilter from "../../../component/SearchFilter";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { BsSearch } from "react-icons/bs";
import { GrDocumentCsv } from "react-icons/gr";
import { SiMicrosoftexcel } from "react-icons/si";
import { CSVLink, CSVDownload } from "react-csv";
import moment from "moment";
// import { useDownloadExcel } from 'react-export-table-to-excel';
import {
  Container,
  Dialog,
  Paper,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  Box,
  Typography,
  Button,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Table,
  CircularProgress,
  Grid,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import axios from "axios";
import ApiConfig from "src/Config/APIconfig";
import { usePagination } from "@material-ui/lab/Pagination";
import Pagination from "@material-ui/lab/Pagination";

import BlockIcon from "@material-ui/icons/Block";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Page from "src/component/Page";
import { makeStyles } from "@material-ui/core/styles";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import NoDataFound from "src/component/NoDataFound";
import { KeyboardDatePicker } from "@material-ui/pickers";
import * as XLSX from "xlsx/xlsx.mjs";

const currencies = [
  {
    value: "ACTIVE",
    label: "ACTIVE",
  },
  {
    value: "BLOCK",
    label: "BLOCK",
  },
];
// import { DataGrid } from '@material-ui/data-grid';
const accessToken = window.sessionStorage.getItem("creatturAccessToken");
const useStyles = makeStyles({
  table: {
    minWidth: 320,
  },
  pdbt: {
    paddingBottom: 68,
    minWidth: "1050px",
    width: "auto",
  },

  button: {
    minWidth: "initial",
    padding: "6px",
    marginLeft: "7px",
  },
  butm1: {
    backgroundColor: "#180a4c",
    color: "#fff",
    "&:hover": {
      backgroundColor: "red",
    },
  },
  filterBox: {
    border: "1px solid #c4c4c4",
    padding: "15px",
    position: "relative",
    "& h6": {
      position: "absolute",
      top: "-20px",
      backgroundColor: "#ffffff",
      padding: "5px 10px",
      left: "0px",
      fontSize: "19px",
      color: "#C54C82",
      fontWeight: 600,
    },
    "& label": {
      fontSize: "14px",
      fontWeight: 600,
    },
  },
  headingBox: {
    display: "flex",
    justifyContent: "space-between",
    "@media (max-width:767px)": {
      display: "block",
    },
  },
});

export default function (props) {
  const [currency, setCurrency] = React.useState("EUR");
  const tableRef = useRef(null);
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  const history = useHistory();
  const [validators, setValidators] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState(1);
  const [numpages, setNumpages] = useState(1);

  const classes = useStyles();
  const { items } = usePagination({
    count: 10,
  });
  const [loader2, setloader2] = React.useState(false);
  const [loaderDe, setloaderDe] = React.useState(false);

  const [isBlock, setBlock] = React.useState(false);

  const [idds, setIdd] = useState([]);
  console.log("idds", idds);
  const handleDelete = (id) => {
    setIdd(id);
    setDelete(true);
  };
  const openBlock = (id) => {
    setIdd(id);
    setBlock(true);
  };

  const closeBlock = () => {
    setBlock(false);
  };
  const lockUnblockValidator = async (idd, pages) => {
    console.log("accessToken", accessToken);
    // formData.append("staticId", idd);
    try {
      setloader2(true);
      if (idd !== "") {
        const response = await axios({
          method: "GET",
          url: ApiConfig.blockUnblockValidator,
          params: {
            validatorId: idds._id,
          },
          headers: {
            token: accessToken,
          },
          data: {
            pages: pages,
          },
        });
        if (response.data.response_code === 200) {
          toast.success(response.data.response_message);
          listValidator();
          closeBlock();
          setloader2(false);
        } else {
          toast.error(response.data.response_message);
          setloader2(false);
        }
      }
    } catch (err) {
      setloader2(false);
      console.log(err);
    }
  };
  const [isDelete, setDelete] = React.useState(false);

  console.log("idds", idds);

  const closeDelete = () => {
    setDelete(false);
  };
  // const[]
  const deletevalidator = async (idd) => {
    try {
      if (idd !== "") {
        setloaderDe(true);
        const response = await axios({
          method: "DELETE",
          url: ApiConfig.deleteValidator,
          params: {
            validatorId: idds._id,
          },
          headers: {
            token: accessToken,
          },
        });
        if (response.data.response_code.SUCCESS === 200) {
          toast.success(response.data.response_message);
          listValidator();
          setDelete(false);
          setloaderDe(false);
        } else {
          toast.error(response.data.response_message);
          setloaderDe(false);
        }
      }
    } catch (err) {
      console.log(err);
      setloaderDe(false);
    }
  };

  const [timeFilter, setTimeFilter] = useState();
  const [toTimeFilter, setToTimeFilter] = useState();
  const [searchName, setSearchName] = useState();
  const [activities, setActivities] = useState("");
  const [isClear, setIsClear] = useState(false);

  const clearHandler = () => {
    setSearchName("");
    setTimeFilter("");
    setToTimeFilter("");
    setActivities("");
    setIsClear(true);
  };
  const listValidator = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(ApiConfig.listValidator, {
        fromDate: timeFilter,
        toDate: toTimeFilter,
        search: searchName,
        page: pages,
        status:
          activities == "ACTIVE"
            ? "ACTIVE"
            : activities == "BLOCK"
              ? "BLOCK"
              : undefined,
      });

      if (response.data.response_code === 200) {
        setValidators(response.data.result.docs);
        setIsLoading(false);
        setNumpages(response.data.result.pages);
      } else {
        setIsClear(false);
        console.log("no users");
        setIsLoading(false);
        setValidators([]);
        // else setHistory(depositFilter);
      }
    } catch (err) {
      setIsLoading(false);
      console.error(err.response);
      toast.error(err);
    }
  };

  useEffect(() => {
    if (isClear) {
      listValidator(pages);
    } else {
      listValidator(pages);
    }
  }, [isClear, pages]);

  // useEffect(() => {
  //   listValidator();
  // }, []);
  let theRecord = [];
  let theHeader = [
    "Fistname",
    "Lastname",
    "MobileNumber",
    "Email",
    "CreatedAt",
    "Status",
  ];
  undefined !== validators &&
    validators.forEach((row, rowIndex) => {
      theRecord[rowIndex] = [
        row.firstName,
        row.lastName,
        row.mobileNumber,
        row.email,
        row.createdAt,
        row.validateStatus,
      ];
    });
  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet([theHeader, ...theRecord]);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "userList");
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "user_list.xlsx");
  };

  return (
    <Page title="Validator Management">
      <Box mb={5}>
        <Box className={classes.headingBox} pb={2}>
          <Typography variant="h3" style={{ marginBottom: "8px" }}>
            <strong> Validator Management</strong>
          </Typography>
          <Link to="/add-validator" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Add new
            </Button>
          </Link>
        </Box>
        <Divider />
      </Box>

      <Box className={classes.filterBox} mb={5}>
        <Typography variant="h6">Filter</Typography>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <label>From</label>
            <TextField
              id="datetime-local"
              onChange={(e) => setTimeFilter(e.target.value)}
              value={timeFilter}
              fullWidth
              type="datetime-local"
              variant="outlined"
              // defaultValue='2021-09-12T23:08'
              inputProps={{ max: moment().format("YYYY-MM-DDThh:mm") }}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <label>To</label>
            <TextField
              id="datetime-local"
              onChange={(e) => setToTimeFilter(e.target.value)}
              value={toTimeFilter}
              fullWidth
              type="datetime-local"
              variant="outlined"
              // defaultValue='2021-09-12T23:08'
              inputProps={{ min: moment().format(timeFilter) }}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {/* <KeyboardDatePicker
              placeholder="YYYY-MM-DD"
              value={toTimeFilter}
              onChange={setToTimeFilter}
              format="YYYY-MM-DD"
              inputVariant="outlined"
              // margin="dense"
              minDate={timeFilter}
              helperText={""}

              fullWidth
            /> */}
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <label>Type</label>
            <TextField
              id="outlined-select-currency"
              select
              fullWidth
              onChange={(e) => setActivities(e.target.value)}
              value={activities}
              variant="outlined"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <label>Search </label>
            <TextField
              id="outlined-basic"
              placeholder="First name,email "
              type="search"
              onChange={(e) => setSearchName(e.target.value)}
              value={searchName}
              variant="outlined"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {" "}
                    <IconButton>
                      <BsSearch />
                    </IconButton>{" "}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2} lg={1}>
            {/* <label>&nbsp; </label> */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={listValidator}
            >
              Apply
            </Button>
          </Grid>
          <Grid item xs={12} sm={4} md={2} lg={1}>
            {/* <label>&nbsp; </label> */}
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={clearHandler}
            >
              Clear
            </Button>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            {/* <label>&nbsp; </label> */}
            {/* <CSVLink data={[theHeader, ...theRecord]}>Download in csv format</CSVLink> */}
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={downloadExcel}
            >
              Download CSV
            </Button>
          </Grid>
        </Grid>
      </Box>

      {isLoading ? (
        <Box pt={4} textAlign="center" margin={2}>
          <CircularProgress style={{ color: "#C54C82" }} />
        </Box>
      ) : (
        <>
          {validators && validators.length > 0 ? (
            <Box>
              <TableContainer component={Paper}>
                <Table
                  ref={tableRef}
                  className={classes.table}
                  aria-label="simple table"
                  id="user_list"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{ color: "white", backgroundColor: "#C54C82" }}
                      >
                        Sr.No
                      </TableCell>
                      <TableCell
                        style={{ color: "white", backgroundColor: "#C54C82" }}
                        align="center"
                      >
                        First Name
                      </TableCell>
                      <TableCell
                        style={{ color: "white", backgroundColor: "#C54C82" }}
                        align="center"
                      >
                        Last Name
                      </TableCell>

                      <TableCell
                        style={{ color: "white", backgroundColor: "#C54C82" }}
                        align="center"
                      >
                        Validator Email
                      </TableCell>
                      <TableCell
                        style={{ color: "white", backgroundColor: "#C54C82" }}
                        align="center"
                      >
                        Phone Number
                      </TableCell>

                      <TableCell
                        style={{ color: "white", backgroundColor: "#C54C82" }}
                        align="center"
                      >
                        Status
                      </TableCell>
                      <TableCell
                        style={{ color: "white", backgroundColor: "#C54C82" }}
                        align="center"
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {validators &&
                      validators.map((validators, index) => {
                        console.log("validators", validators);

                        return (
                          <TableRow key={validators.name}>
                            <TableCell component="th" scope="row">
                              {index + 1}
                            </TableCell>

                            <TableCell
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              {validators.firstName}
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              {validators.lastName}
                            </TableCell>
                            {/* <TableCell align="center">{row.IP_Address}</TableCell> */}
                            <TableCell align="center">
                              {validators.email}
                            </TableCell>
                            <TableCell align="center">
                              {validators?.countryCode}&nbsp;{" "}
                              {validators.mobileNumber}
                            </TableCell>
                            {validators.status === "BLOCK" ||
                              validators.status === "DELETE" ? (
                              <>
                                {" "}
                                <TableCell
                                  align="center"
                                  style={{ color: "red" }}
                                >
                                  {validators.status === "BLOCK"
                                    ? "BLOCKED"
                                    : "DELETE"}
                                </TableCell>
                              </>
                            ) : (
                              <>
                                {" "}
                                <TableCell align="center">
                                  {validators.status}
                                </TableCell>
                              </>
                            )}
                            <TableCell style={{ width: 5 }} align="right">
                              <Box display="flex">
                                <Button
                                  variant="contained"
                                  color="primary"
                                  className={classes.button}
                                  onClick={() =>
                                    history.push({
                                      pathname: "/view-validator",
                                      search: validators._id,
                                    })
                                  }
                                >
                                  <VisibilityIcon
                                    style={{ fontSize: "15px" }}
                                  />
                                </Button>
                                {/* <Button
													variant="contained" 
													className={classes.button}
													onClick={() =>
														history.push({
															pathname: "/edit-validator",
															search: validators._id,
														})
													}
												>
													<EditIcon fontSize="small" style={{ fontSize: '15px' }} />

												</Button> */}
                                <Button
                                  variant="contained"
                                  color="primary"
                                  className={classes.button}
                                  onClick={() => openBlock(validators)}
                                >
                                  <BlockIcon
                                    fontSize="small"
                                    style={{ fontSize: "15px" }}
                                  />
                                </Button>
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  className={classes.button}
                                  onClick={() => handleDelete(validators)}
                                >
                                  <DeleteIcon
                                    fontSize="small"
                                    style={{ fontSize: "15px" }}
                                  />
                                </Button>
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box display="flex" justifyContent="flex-end" pt={1}>
                <Pagination
                  page={pages}
                  onChange={(e, v) => setPages(v)}
                  count={parseInt(numpages)}
                  color="primary"
                />
              </Box>
              <Dialog
                open={isBlock}
                onClose={closeBlock}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="xs"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <Box mt={3} align="center">
                      <Typography variant="body2" style={{ color: "#000" }}>
                        {validators.status}
                        {`Are you sure  to ${idds.status === "BLOCK" ? "ACTIVE" : "BLOCK"
                          } this user?`}
                      </Typography>
                    </Box>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    color="primary"
                    onClick={lockUnblockValidator}
                    disabled={loader2}
                  >
                    Yes {loader2 && <ButtonCircularProgress />}
                  </Button>
                  <Button
                    onClick={closeBlock}
                    color="primary"
                    autoFocus
                    style={{ color: "#8b8888" }}
                  >
                    No
                  </Button>
                </DialogActions>
              </Dialog>

              <Dialog
                open={isDelete}
                onClose={closeDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="xs"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <Box mt={3} align="center">
                      <Typography variant="body2" style={{ color: "#000" }}>
                        Are you sure you want to delete <br /> this validator?
                      </Typography>
                    </Box>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    color="primary"
                    onClick={deletevalidator}
                    disabled={loaderDe}
                  >
                    Yes {loaderDe && <ButtonCircularProgress />}
                  </Button>
                  <Button
                    onClick={closeDelete}
                    color="primary"
                    autoFocus
                    style={{ color: "#8b8888" }}
                  >
                    No
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          ) : (
            <NoDataFound />
          )}
        </>
      )}
    </Page>
  );
}
