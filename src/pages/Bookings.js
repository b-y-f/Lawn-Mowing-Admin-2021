import { filter } from 'lodash';
import { Icon } from '@iconify/react';
// import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Avatar
} from '@mui/material';
// components
import { format } from 'date-fns';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import {
  UserListHead,
  UserListToolbar,
  BookingMoreMenu,
  SelectWorkerMenu
} from '../components/_dashboard/user';
import { getStorageValue } from '../utils/localStorage';
// service
import bookingService from '../services/bookings';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
  { id: 'bookingDate', label: 'Booking Date', alignRight: false },
  { id: 'created', label: 'Create Date', alignRight: false },
  { id: 'rating', label: 'Rating', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'worker', label: 'Worker', alignRight: false }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (booking) => {
      const name = `${booking.user.firstName}${booking.user.lastName}`;
      // console.log(booking.user);
      return name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  console.log(bookings);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('desc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('date');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setBookings(getStorageValue('bookings'));
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = bookings.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    console.log(selectedIndex);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
    // console.log(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  // const handleDelete = (id) => {
  //   quoteService
  //     .remove(id)
  //     .then(() => {
  //       alert('delete quote ok!');
  //       setQuotes(bookings.filter((q) => q.id !== id));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleApprove = (id) => {
    // console.log('id:', id);
    bookingService
      .approveById(id)
      .then(() => {
        alert('approved!');
        setBookings(bookings.map((b) => (b.id === id ? { ...b, status: 'approved' } : b)));
      })
      .catch((err) => {
        console.log('approve failed! error:', err);
      });
  };

  const handleDecline = (id) => {
    bookingService
      .declineById(id)
      .then(() => {
        alert('approved!');
        setBookings(bookings.map((b) => (b.id === id ? { ...b, status: 'declined' } : b)));
      })
      .catch((err) => {
        console.log('decline failed! error:', err);
      });
  };

  const handleComplete = (id) => {
    bookingService
      .completeById(id)
      .then(() => {
        alert('complete set!');
        setBookings(bookings.map((b) => (b.id === id ? { ...b, status: 'completed' } : b)));
      })
      .catch((err) => {
        console.log('complete failed! error:', err);
      });
  };

  const handleStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'info';
      case 'declined':
        return 'warning';
      case 'completed':
        return 'secondary';
      default:
        return '';
    }
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bookings.length) : 0;

  const filteredUsers = applySortFilter(bookings, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Bookings
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            Send Invoice
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={bookings.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, address, bookingDate, created, rating, worker, status, user } =
                        row;

                      const { firstName, lastName, photoURL } = user;
                      const isItemSelected = selected.indexOf(id) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, id)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={firstName} src={photoURL} />
                              <Typography variant="subtitle2" noWrap>
                                {`${firstName} ${lastName}`}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{address}</TableCell>
                          <TableCell align="left">
                            {format(new Date(bookingDate), 'dd/MM/yyyy')}
                          </TableCell>
                          <TableCell align="left">
                            {format(new Date(created), 'dd/MM/yyyy')}
                          </TableCell>
                          <TableCell align="left">{rating}</TableCell>
                          <TableCell align="left">
                            <Label variant="ghost" color={handleStatusColor(status)}>
                              {status}
                            </Label>
                          </TableCell>
                          {/* <TableCell align="left">{JSON.stringify(serviceItem)}</TableCell> */}
                          <TableCell align="left">
                            <SelectWorkerMenu id={id} worker={worker} />
                          </TableCell>
                          {/* <TableCell align="left">{garbageVolumn}</TableCell> */}
                          <TableCell align="right">
                            <BookingMoreMenu
                              id={id}
                              handleApprove={handleApprove}
                              handleDecline={handleDecline}
                              handleComplete={handleComplete}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={bookings.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
