import {
  Box, Card, CardHeader, Checkbox, Divider, FormControl, IconButton, InputLabel, ListItem, ListItemText, Menu, MenuItem, Select, Table,
  TableBody,
  TableCell, TableContainer, TableHead,
  TablePagination,
  TableRow, Tooltip, Typography,
  useTheme
} from '@mui/material';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';


import Label from '@/components/Label';
import BulkActions from '@/content/Management/BulkActions';
import { RequestDto, RequestDtoForStaff, RequestStatus } from '@/models/crypto_requests';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import MoreVert from '@mui/icons-material/MoreVert';
import Link from 'src/components/Link';

const apiURL = "https://soleauthenticity.azurewebsites.net/api/admin/request-sell-secondhands";

interface RecentRequestsTableProps {
  className?: string;
}

interface Filters {
  status?: RequestStatus;
}

const getStatusLabel = (requestStatus: RequestStatus): JSX.Element => {
  const map = {
    Cancle: {
      text: 'Cancle',
      color: 'error'
    },
    Sold: {
      text: 'Sold',
      color: 'success'
    },
    Checking: {
      text: 'Checking',
      color: 'primary'
    },
    Accept: {
      text: 'Accept',
      color: 'warning'
    },
    In_Progress: {
      text: 'In_Progress',
      color: 'secondary'
    },
  };

  const { text, color }: any = map[requestStatus];

  return <Label color={color}>{text}</Label>;
};

const RecentRequestsTable: FC<RecentRequestsTableProps> = () => {
  const [data, setData] = useState<RequestDtoForStaff>();
  const [datat, setDatat] = useState<RequestDto[]>([]);
  const [selectedRequests, setSelectedRequests] = useState<number[]>(
    []
  );
  const selectedBulkActions = selectedRequests.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };
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
): RequestDto[] => {
  return datat.filter((request) => {
    let matches = true;
    console.log(request.requestStatus);
    if (filters.status && request.requestStatus !== filters.status) {
      matches = false;
    }
    return matches;
  });
};

const applyPagination = (
  datat: RequestDto[],
  page: number,
  limit: number
): RequestDto[] => {
  return datat.slice(page * limit, page * limit + limit);
};
  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'Cancle',
      name: 'Cancle'
    },
    {
      id: 'Sold',
      name: 'Sold'
    },
    {
      id: 'Checking',
      name: 'Checking'
    },
    {
      id: 'Accept',
      name: 'Accept'
    },
    {
      id: 'In_Progress',
      name: 'In_Progress'
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

  const handleSelectAllRequests = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedRequests(
      event.target.checked
        ? datat.map((request) => request.id)
        : []
    );
  };

  const handleSelectOneRequest = (
    _event: ChangeEvent<HTMLInputElement>,
    requestId: number,
  ): void => {
    if (!selectedRequests.includes(requestId)) {
      setSelectedRequests((prevSelected) => [
        ...prevSelected,
        requestId
      ]);
    } else {
      setSelectedRequests((prevSelected) =>
        prevSelected.filter((id) => id !== requestId)
      );
    }
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredRequests = applyFilters(filters);
  const paginatedRequests = applyPagination(
    filteredRequests,
    page,
    limit
  );
  const selectedSomeRequests =
    selectedRequests.length > 0 &&
    selectedRequests.length < datat.length;
  const selectedAllRequests =
    selectedRequests.length === datat.length;
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
          title="Recent Requests"
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
                  checked={selectedAllRequests}
                  indeterminate={selectedSomeRequests}
                  onChange={handleSelectAllRequests}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Brand Name</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell align="right">PriceBuy</TableCell>
              <TableCell align="right">PriceSell</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRequests.map((data) => {
              const isRequestSelected = selectedRequests.includes(
                data.id
              );
              return (
                <TableRow
                  hover
                  key={data.id}
                  selected={isRequestSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isRequestSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneRequest(event, data.id)
                      }
                      value={isRequestSelected}
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
                      {data.productName}
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
                      {data.userName}
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
                      {data.brandName}
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
                      {data.contact}
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
                      {data.priceBuy}
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
                      {data.priceSell}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(data.requestStatus)}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Request" arrow>
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
                    <Tooltip title="Delete Request" arrow>
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
                            {/* <ListWrapper
                              sx={{
                                display: {
                                  xs: 'none',
                                  md: 'block'
                                }
                              }}
                            > */}
                              <ListItem
                                classes={{ root: 'MuiListItem-indicators' }}
                                button
                                ref={ref}
                                onClick={handleOpen}

                              >
                                <ListItemText
                                  primaryTypographyProps={{ noWrap: true }}
                                  primary={
                                      <Box display="flex" alignItems="center" pl={0.3}>
                                        <MoreVert fontSize="small" />
                                      </Box>
                                  }
                                />
                              </ListItem>
                            {/* </ListWrapper> */}
                            <Menu anchorEl={ref.current} onClose={handleClose} open={isOpen}>
                              <MenuItem sx={{ px: 3 }} component={Link} href="/">
                                ACCEPTED
                              </MenuItem>
                              <MenuItem sx={{ px: 3 }} component={Link} href="/components/tabs">
                                Checking
                              </MenuItem>
                              <MenuItem sx={{ px: 3 }} component={Link} href="/components/cards">
                                Cancle
                              </MenuItem>
                              <MenuItem sx={{ px: 3 }} component={Link} href="/components/cards">
                                Sold
                              </MenuItem>
                            </Menu>
                          </IconButton>
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
          count={filteredRequests.length}
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
export default RecentRequestsTable;
