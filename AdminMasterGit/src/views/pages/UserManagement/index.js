import React, { useEffect, useState } from "react";
import SearchFilter from "../../../component/SearchFilter";
import ContentLoading from "src/component/ContentLoading";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { BsSearch } from "react-icons/bs";
import { GrDocumentCsv } from "react-icons/gr";
import { SiMicrosoftexcel } from "react-icons/si";
import { CSVLink, CSVDownload } from "react-csv";
import * as XLSX from "xlsx/xlsx.mjs";
// import BlockIcon from "@material-ui/icons/Block";

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
  Grid,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import axios from "axios";
import ApiConfig from "src/Config/APIconfig";

import { Link as RouterLink } from "react-router-dom";
import { usePagination } from "@material-ui/lab/Pagination";
import Pagination from "@material-ui/lab/Pagination";

import BlockIcon from "@material-ui/icons/Block";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";

import Page from "src/component/Page";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import NoDataFound from "src/component/NoDataFound";
import { toast } from "react-toastify";
import { KeyboardDatePicker } from "@material-ui/pickers";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

// import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
const currencies = [
  {
    value: "COMPANY",
    label: "COMPANY",
  },
  {
    value: "FREELANCER",
    label: "FREELANCER",
  },
];
// import { DataGrid } from '@material-ui/data-grid';
const accessToken = window.sessionStorage.getItem("creatturAccessToken");
const useStyles = makeStyles({
  root: {
    "& .MuiTextField-root": {
      width: "25ch",
    },
  },
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
    backgroundColor: "#C54C82",
    color: "rgb(255 255 255 / 87%)",
  },
  table: {
    "& .MuiTableCell-root": {
      padding: "11px",
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
});

export default function (props) {
  const [users, setUsers] = useState([]);
  const [pages, setPage] = useState(1);
  const [numpages, setNumpages] = useState(1);
  const [userId, setUserId] = useState("");

  const classes = useStyles();
  const { items } = usePagination({
    count: 10,
  });
  const [isBlock, setBlock] = React.useState(false);
  const [idds, setIdd] = useState([]);
  console.log("idds", idds);

  const openBlock = (id) => {
    setIdd(id);
    setBlock(true);
  };
  const closeBlock = () => {
    setBlock(false);
  };
  const [isDelete, setDelete] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionNotFound, setTransactionNotFound] = useState(false);
  const openDelete = () => {
    setDelete(true);
  };
  const handleBlock = (id) => {
    setUserId(id);
    console.log("user-management1", id);
    openBlock();
  };
  const [loader2, setloader2] = React.useState(false);

  const toggleBlock = async () => {
    setloader2(true);

    const response = await axios({
      method: "POST",
      url: ApiConfig.toggleUser,
      headers: {
        token: accessToken,
      },
      params: {
        _id: idds._id,
      },
    })
      .then((response) => {
        if (response.data.response_code !== 200) {
          setloader2(false);
          toast.error(response.data.response_message);
        } else {
          setloader2(false);
          toast.success(response.data.response_message);
          UserList();
          console.log(response.data.result);
          // setIsLoading(false);
          closeBlock();
          // window.location.reload();
          setUserId(null);
          setBlock(false);
          // setBlock(false);
        }
      })
      .catch((response) => {
        toast.info(response);

        setloader2(false);

        // setIsUpdating(false);

        console.log("response", response);
      });
  };
  const closeDelete = () => {
    setDelete(false);
  };

  const [timeFilter, setTimeFilter] = useState();
  const [toTimeFilter, setToTimeFilter] = useState();
  const [searchName, setSearchName] = useState("");
  const [activities, setActivities] = useState("");
  const [isClear, setIsClear] = useState(false);

  const UserList = async (pages) => {
    setIsLoading(true);
    axios
      .post(
        ApiConfig.getUserList,
        {
          fromDate: timeFilter,
          toDate: toTimeFilter,
          search: searchName,
          limit: 15,
          page: pages,
          type:
            activities == "COMPANY"
              ? "COMPANY"
              : activities == "FREELANCER"
                ? "FREELANCER"
                : undefined,
        },

        {
          headers: {
            token: accessToken,
          },
        }
      )
      .then((response) => {
        if (response.data.response_code !== 200) {
          setIsLoading(false);
          if (response.data.response_code === 404) {
            setTransactionNotFound(true);
            setUsers([]);
            setIsLoading(false);
            setIsClear(false);
          }
        } else {
          setIsLoading(false);
          setUsers(response.data.result.docs);
          setNumpages(response.data.result.pages);

          console.log("userList", response);

          // else setHistory(depositFilter);
        }
      })
      .catch((response) => {
        setIsLoading(false);
        console.log("response", response);
      });
  };

  const clearHandler = () => {
    setSearchName("");
    setTimeFilter("");
    setToTimeFilter("");
    setActivities("");
    setIsClear(true);
  };
  // useEffect(() => {
  //   UserList(pages);

  // }, [pages, search, selectedDate, toDate]);

  useEffect(() => {
    if (isClear) {
      UserList();
    } else {
      UserList(pages);
    }
  }, [isClear, pages]);
  let theRecord = [];
  let theHeader = [
    "Fistname",
    "Lastname",
    "MobileNumber",
    "Email",
    "CreatedAt",
    "Status",
  ];
  undefined !== users &&
    users.forEach((row, rowIndex) => {
      theRecord[rowIndex] = [
        row.firstName,
        row.lastName,
        row.mobileNumber,
        row.email,
        row.createdAt,
        row.status,
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
    <Page title="User Management">
      <Box mb={5}>
        <Typography variant="h3" style={{ marginBottom: "8px" }}>
          <strong> User Management</strong>
        </Typography>
        <Divider />
      </Box>

      <Box className={classes.filterBox} mb={5}>
        <Typography variant="h6">Filter</Typography>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <label>From</label>
            <TextField
              fullWidth
              id="datetime-local"
              onChange={(e) => setTimeFilter(e.target.value)}
              value={timeFilter}
              type="datetime-local"
              variant="outlined"
              // defaultValue='2021-09-12T23:08'
              inputProps={{ max: moment().format("YYYY-MM-DDThh:mm") }}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {/* <KeyboardDatePicker
                                placeholder="YYYY-MM-DD"
                                value={timeFilter}
                                onChange={setTimeFilter}

                                // onChange={(date) => {
                                //   setTimeFilter("timeFilter", new Date(date));
                                // }}
                                format="YYYY-MM-DD"
                                inputVariant="outlined"
                                // margin="dense"
                                helperText={""}
                                name="startDate"
                                maxDate={new Date()}
                                fullWidth

                             
                              /> */}
            {/* <TextField id="outlined-basic" type="date" 
            min={new Date()}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
            variant="outlined" onChange={(e)=>setTimeFilter(e.target.value)}
               value={timeFilter}  fullWidth /> */}
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <label>To</label>
            <TextField
              fullWidth
              id="datetime-local"
              onChange={(e) => setToTimeFilter(e.target.value)}
              value={toTimeFilter}
              type="datetime-local"
              variant="outlined"
              // defaultValue='2021-09-12T23:08'
              inputProps={{ min: moment().format(timeFilter) }}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {/* <TextField id="outlined-basic" type="date" onChange={(e) => setToTimeFilter(e.target.value)}
              value={toTimeFilter} variant="outlined" fullWidth /> */}
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
              onClick={UserList}
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
          {users && users.length > 0 ? (
            <>
              <TableContainer component={Paper}>
                <Table
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
                        Email Address
                      </TableCell>
                      {/* <TableCell style={{ color: 'white', backgroundColor: '#C54C82' }} align="center">
              Location
            </TableCell> */}
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
                        Registration Date
                      </TableCell>
                      <TableCell
                        style={{ color: "white", backgroundColor: "#C54C82" }}
                        align="center"
                      >
                        Status
                      </TableCell>
                      {/* <TableCell style={{ color: 'white', backgroundColor: '#C54C82' }} align="center">
              Assigned external Validator
            </TableCell> */}
                      <TableCell
                        style={{ color: "white", backgroundColor: "#C54C82" }}
                        align="center"
                      >
                        User Types
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
                    {users.map((row, i) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {i + 1}
                        </TableCell>

                        <TableCell
                          align="center"
                          style={{ textTransform: "capitalize" }}
                        >
                          {row?.firstName?.substring(0, 10)}
                        </TableCell>
                        {/* <TableCell align="center">{row.IP_Address}</TableCell> */}
                        <TableCell
                          align="center"
                          style={{ textTransform: "capitalize" }}
                        >
                          {row?.lastName?.substring(0, 10)}
                        </TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        {/* <TableCell align="center">{row.location}</TableCell> */}
                        <TableCell align="center">
                          {row?.countryCode}-{row.mobileNumber}
                        </TableCell>
                        <TableCell align="center">
                          {moment(row.createdAt).format("YYYY-MM-DD")}
                        </TableCell>
                        {row.status === "BLOCK" ? (
                          <>
                            {" "}
                            <TableCell align="center" style={{ color: "red" }}>
                              {row.status === "BLOCK" ? "BLOCKED" : "DELETE"}
                            </TableCell>
                          </>
                        ) : (
                          <>
                            {" "}
                            <TableCell align="center">{row.status}</TableCell>
                          </>
                        )}
                        {/* <TableCell align="center">{row.assignedValidator}</TableCell>*/}
                        <TableCell align="center">{row?.userType === "FREELANCER" ? (
                          "CLIENT"
                        ) : (
                          "COMPANY"
                        )}</TableCell>

                        <TableCell style={{ width: 5 }} align="right">
                          <Box display="flex">
                            <Link
                              to={{
                                pathname: "/view-user",
                                state: {
                                  data: row._id,
                                  userType: row.userType,
                                  email: row.email,
                                },
                              }}
                              component={RouterLink}
                            >
                              <Button
                                variant="contained"
                                className={classes.button}
                              >
                                <VisibilityIcon style={{ fontSize: "15px" }} />
                              </Button>
                            </Link>
                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.button}
                              onClick={() => openBlock(row)}
                            >
                              <BlockIcon
                                fontSize="small"
                                style={{ fontSize: "15px" }}
                              />
                            </Button>

                            {/* <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => handleBlock(row._id)}
                        // onClick={openBlock}
                      >
                        <BlockIcon
                          fontSize="small"
                          style={{ fontSize: "15px" }}
                        />
                      </Button> */}
                            {/* <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={openDelete}
                  >
                    <DeleteIcon fontSize="small" style={{ fontSize: '15px' }} />
                  </Button> */}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box display="flex" pt={2} justifyContent="flex-end">
                {/* <Pagination count={1} shape="rounded" /> */}
                <Pagination
                  onChange={(e, v) => setPage(v)}
                  page={pages}
                  count={parseInt(numpages)}
                  color="primary"
                />
              </Box>
            </>
          ) : (
            <NoDataFound />
          )}
        </>
      )}

      <Dialog
        open={isBlock}
        onClose={closeBlock}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* {row.status} */}
            {`Are you sure  to ${idds.status === "BLOCK" ? "ACTIVE" : "BLOCK"
              } this user?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" disabled={loader2} onClick={toggleBlock}>
            Yes {loader2 && <ButtonCircularProgress />}
          </Button>
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
            Are you sure you want to delete this User?
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
  );
}
