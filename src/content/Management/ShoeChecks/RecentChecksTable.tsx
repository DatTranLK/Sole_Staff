import {
  Box, Button, Card, CardHeader, Checkbox, Divider, FormControl, IconButton, InputLabel, List, MenuItem, Select, Table,
  TableBody,
  TableCell, TableContainer, TableHead,
  TablePagination,
  TableRow, Tooltip, Typography,
  useTheme
} from '@mui/material';
import NextLink from 'next/link';
import { ChangeEvent, FC, useEffect, useState } from 'react';

import Label from '@/components/Label';
import BulkActions from '@/content/Management/BulkActions';
import { CheckDto, CheckDtoForStaff, CheckStatus } from '@/models/crypto_checks';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import Link from 'src/components/Link';

const apiURL = "https://soleauthenticity.azurewebsites.net/api/shoe-checks/admin";

interface RecentChecksTableProps {
  className?: string;
}

interface Filters {
  status?: CheckStatus;
}

const getStatusLabel = (checkStatus: CheckStatus): JSX.Element => {
  const map = {
    CHECKED: {
      text: 'CHECKED',
      color: 'success'
    },
    CHECKING: {
      text: 'CHECKING',
      color: 'warning'
    },
    PROCESSING: {
      text: 'PROCESSING',
      color: 'secondary'
    },
  };

  const { text, color }: any = map[checkStatus];

  return <Label color={color}>{text}</Label>;
};

const RecentChecksTable: FC<RecentChecksTableProps> = () => {
  const [data, setData] = useState<CheckDtoForStaff>();
  const [datat, setDatat] = useState<CheckDto[]>([]);
  const [selectedChecks, setSelectedChecks] = useState<number[]>(
    []
  );
  const selectedBulkActions = selectedChecks.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  // const ref = useRef<any>(null);
  // const [isOpen, setOpen] = useState<boolean>(false);

  // const handleOpen = (): void => {
  //   setOpen(true);
  // };

  // const handleClose = (): void => {
  //   setOpen(false);
  // };
  console.log(data);
  
 useEffect(()=>{
    fetch(apiURL+"?page=1&pageSize=30")
    .then((response) => response.json())
    .then((responsedata) => {
      setData(responsedata.data);
      setDatat(responsedata.data);
      console.log(responsedata.data);
    })
 }, [])

 const fetchDataForStatusChecking = async (shoeCheckId : number) => {
  console.log(shoeCheckId);
  const response = await fetch('https://soleauthenticity.azurewebsites.net/api/shoe-checks/shoe-check/'+shoeCheckId, {
    method: 'PUT',
    body: JSON.stringify({ /* data to be sent in the request body */ }),
    // headers: { 'Content-Type': 'application/json' }
  })
  location.reload();
  // .then(response => response.json())
  // .then(data => {
  //     console.log(data);
// })
  console.log(response);
  
};
// const fetchDataForStatusChecked = async (shoeCheckId : number) => {
//   console.log(shoeCheckId);
//   const response = await fetch('https://soleauthenticity.azurewebsites.net/api/shoe-checks/shoe-check/confirm/'+shoeCheckId, {
//     method: 'PUT',
//     body: JSON.stringify({ /* data to be sent in the request body */ }),
//     // headers: { 'Content-Type': 'application/json' }
//   })
//   location.reload();
//   // .then(response => response.json())
//   // .then(data => {
//   //     console.log(data);
//   // })

// };
const applyFilters = (
  filters: Filters
): CheckDto[] => {
  return datat.filter((order) => {
    let matches = true;
    // console.log(order.statusChecking);
    if (filters.status && order.statusChecking !== filters.status) {
      matches = false;
    }
    return matches;
  });
};

const applyPagination = (
  page: number,
  limit: number
): CheckDto[] => {
  return datat.slice(page * limit, page * limit + limit);
};
  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'PROCESSING',
      name: 'PROCESSING'
    },
    {
      id: 'CHECKING',
      name: 'CHECKING'
    },
    {
      id: 'CHECKED',
      name: 'CHECKED'
    },
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllChecks = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedChecks(
      event.target.checked
        ? datat.map((order) => order.id)
        : []
    );
  };

  const handleSelectOneCheck = (
    _event: ChangeEvent<HTMLInputElement>,
    checkId: number,
  ): void => {
    if (!selectedChecks.includes(checkId)) {
      setSelectedChecks((prevSelected) => [
        ...prevSelected,
        checkId
      ]);
    } else {
      setSelectedChecks((prevSelected) =>
        prevSelected.filter((id) => id !== checkId)
      );
    }
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredOrders = applyFilters(filters);
  const paginatedChecks = applyPagination(
    // filteredOrders,
    page,
    limit
  );
  const selectedSomeChecks =
    selectedChecks.length > 0 &&
    selectedChecks.length < datat.length;
  const selectedAllChecks =
    selectedChecks.length === datat.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Recent Checks"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllChecks}
                  indeterminate={selectedSomeChecks}
                  onChange={handleSelectAllChecks}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Shoe Name</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Date Submitted</TableCell>
              <TableCell>Date Completed</TableCell>
              <TableCell align='right'>Authentic</TableCell>
              <TableCell align='right'>Active</TableCell>
              <TableCell align='right'>Status</TableCell>
              <TableCell align='right'>Actions</TableCell>
              <TableCell align='right'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedChecks.map((data) => {
              const isCheckSelected = selectedChecks.includes(
                data.id
              );
              return (
                <TableRow
                  hover
                  key={data.id}
                  selected={isCheckSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCheckSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCheck(event, data.id)
                      }
                      value={isCheckSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {data.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {data.shoeName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      Code: {data.code}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {data.customerName}
                    </Typography>
                  </TableCell> 
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {data.dateSubmitted}
                    </Typography>
                  </TableCell> 
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {data.dateCompletedChecking}
                    </Typography>
                  </TableCell> 
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {data.isAuthentic == true? <Label color='success'>Authentic</Label> : <Label color='error'>Replica</Label>}
                    </Typography>
                  </TableCell> 
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {data.isActive == true? <Label color='primary'>Active</Label> : <Label color='secondary'>Inactive</Label>}
                    </Typography>
                  </TableCell> 
                  <TableCell align="right">
                    {getStatusLabel(data.statusChecking)}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"

                      >
                          <NextLink href={`/management/shoechecks/details/${data.id}`}><EditTwoToneIcon fontSize="small"/></NextLink>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                  <List component={Box} display="flex" justifyContent={'space-between'} >
                  <Button variant="contained" onClick={() => fetchDataForStatusChecking(data.id)} component={Link} href={`/management/shoechecks/details/${data.id}`}>Checking</Button>
                    </List>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};
export default RecentChecksTable;