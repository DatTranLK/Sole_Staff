import {
  Box, Button, Card, CardHeader, Checkbox, Divider, FormControl, IconButton, InputLabel, List, MenuItem, Select, Table,
  TableBody,
  TableCell, TableContainer, TableHead,
  TablePagination,
  TableRow, Tooltip, Typography,
  useTheme
} from '@mui/material';
import { ChangeEvent, FC, useEffect, useState } from 'react';


import Label from '@/components/Label';
import BulkActions from '@/content/Management/BulkActions';
import { OrderDto, OrderDtoForStaff, OrderStatus } from '@/models/crypto_order';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

const apiURL = "https://soleauthenticity.azurewebsites.net/api/orders/staff";

// const apiURLChangeStatusToAccept = "https://soleauthenticity.azurewebsites.net//api/orders/order/accepted/";

interface RecentOrdersTableProps {
  className?: string;
}

interface Filters {
  status?: OrderStatus;
}

// const ListWrapper = styled(Box)(
//   ({ theme }) => `
//         .MuiTouchRipple-root {
//             display: none;
//         }
        
//         .MuiListItem-root {
//             transition: ${theme.transitions.create(['color', 'fill'])};
            
//             &.MuiListItem-indicators {
//                 // padding: ${theme.spacing(1, 2)};
            
//                 .MuiListItemText-root {
//                     .MuiTypography-root {
//                         &:before {
//                             height: 4px;
//                             width: 22px;
//                             opacity: 0;
//                             visibility: hidden;
//                             display: block;
//                             // position: absolute !important;
//                             bottom: -10px;
//                             transition: all .2s;
//                             border-radius: ${theme.general.borderRadiusLg};
//                             content: "";
//                             background: ${theme.colors.primary.main};
//                         }
//                     }
//                 }

//                 &.active,
//                 &:active,
//                 // &:hover {
                
//                 //     background: transparent;
                
//                 //     .MuiListItemText-root {
//                 //         .MuiTypography-root {
//                 //             &:before {
//                 //                 opacity: 1;
//                 //                 visibility: visible;
//                 //                 bottom: 0px;
//                 //             }
//                 //         }
//                 //     }
//                 // }
//             }
//         }
// `
// );

const getStatusLabel = (orderStatus: OrderStatus): JSX.Element => {
  const map = {
    CANCEL: {
      text: 'CANCEL',
      color: 'error'
    },
    DONE: {
      text: 'DONE',
      color: 'success'
    },
    PROCESSING: {
      text: 'PROCESSING',
      color: 'primary'
    },
    ACCEPTED: {
      text: 'ACCEPTED',
      color: 'warning'
    },
  };

  const { text, color }: any = map[orderStatus];

  return <Label color={color}>{text}</Label>;
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = () => {
  const [data, setData] = useState<OrderDtoForStaff>();
  const [datat, setDatat] = useState<OrderDto[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<number[]>(
    []
  );
  const selectedBulkActions = selectedOrders.length > 0;
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
      // console.log(responsedata.data);
    })
 }, [])

 






const applyFilters = (
  filters: Filters
): OrderDto[] => {
  return datat.filter((order) => {
    let matches = true;
    // console.log(order.orderStatus);
    if (filters.status && order.orderStatus !== filters.status) {
      matches = false;
    }
    return matches;
  });
};

const applyPagination = (
  datat: OrderDto[],
  page: number,
  limit: number
): OrderDto[] => {
  return datat.slice(page * limit, page * limit + limit);
};
  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'DONE',
      name: 'DONE'
    },
    {
      id: 'PROCESSING',
      name: 'PROCESSING'
    },
    {
      id: 'CANCEL',
      name: 'CANCEL'
    },
    {
      id: 'ACCEPTED',
      name: 'ACCEPTED'
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

  const handleSelectAllOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedOrders(
      event.target.checked
        ? datat.map((order) => order.id)
        : []
    );
  };

  const handleSelectOneOrder = (
    _event: ChangeEvent<HTMLInputElement>,
    orderId: number,
  ): void => {
    if (!selectedOrders.includes(orderId)) {
      setSelectedOrders((prevSelected) => [
...prevSelected,
        orderId
      ]);
    } else {
      setSelectedOrders((prevSelected) =>
        prevSelected.filter((id) => id !== orderId)
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
  const paginatedOrders = applyPagination(
    filteredOrders,
    page,
    limit
  );
  const selectedSomeOrders =
    selectedOrders.length > 0 &&
    selectedOrders.length < datat.length;
  const selectedAllOrders =
    selectedOrders.length === datat.length;
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
          title="Recent Orders"
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
                  checked={selectedAllOrders}
                  indeterminate={selectedSomeOrders}
                  onChange={handleSelectAllOrders}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              {/* <TableCell>Cus ID</TableCell> */}
              <TableCell>Shipping Address</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((data) => {
              const isOrderSelected = selectedOrders.includes(
                data.id
              );
              return (
                <TableRow
                  hover
                  key={data.id}
                  selected={isOrderSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
color="primary"
                      checked={isOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneOrder(event, data.id)
                      }
                      value={isOrderSelected}
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
                      {data.customerName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      ID: {data.customerId}
                    </Typography>
                  </TableCell>
                  {/* <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {data.customerId}
                    </Typography>
                  </TableCell> */}
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {data.shippingAddress}
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
                      {data.paymentMethod}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {data.totalPrice}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(data.orderStatus)}
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
                        <EditTwoToneIcon fontSize="small" />
                        
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
                  <List component={Box} display="flex" width={320} justifyContent={'space-between'} >
                  <Button variant="contained" href={`/management/transactions/details/accepted/${data.id}`}>Accepted</Button>
                  <Button variant="contained" href={`/management/transactions/details/done/${data.id}`}>Done</Button>
                  <Button variant="contained" href={`/management/transactions/details/cancel/${data.id}`}>Cancel</Button>
                  </List>
                    {/* <Button variant="contained" onClick={() => fetchDataForStatusAccepted(data.id)} component={Link} href="/management/transactions">Accepted</Button>
                    <Button variant="contained" onClick={() => fetchDataForStatusDone(data.id)} component={Link} href="/management/transactions">Done</Button>
                    <Button variant="contained" onClick={() => fetchDataForStatusCancel(data.id)} component={Link} href="/management/transactions">Cancel</Button> */}
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
export default RecentOrdersTable;