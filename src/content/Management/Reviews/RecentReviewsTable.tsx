import {
  Box, Card, CardHeader, Checkbox, Divider, IconButton,
  Table,
  TableBody,
  TableCell, TableContainer, TableHead,
  TablePagination,
  TableRow, Tooltip, Typography,
  useTheme
} from '@mui/material';
import { ChangeEvent, FC, useEffect, useState } from 'react';

import BulkActions from '@/content/Management/BulkActions';
import { ReviewAuthorName, ReviewDto, ReviewDtoForStaff } from '@/models/crypto_reviews';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

const apiURL = "https://soleauthenticity.azurewebsites.net/api/reviews";

interface RecentReviewsTableProps {
  className?: string;
}

interface Filters {
  status?: ReviewAuthorName;
}

// const getStatusLabel = (orderStatus: OrderStatus): JSX.Element => {
//   const map = {
//     CANCEL: {
//       text: 'CANCEL',
//       color: 'error'
//     },
//     DONE: {
//       text: 'DONE',
//       color: 'success'
//     },
//     PROCESSING: {
//       text: 'PROCESSING',
//       color: 'primary'
//     },
//     ACCEPTED: {
//       text: 'ACCEPTED',
//       color: 'warning'
//     },
//   };

//   const { text, color }: any = map[orderStatus];

//   return <Label color={color}>{text}</Label>;
// };

const RecentReviewsTable: FC<RecentReviewsTableProps> = () => {
  const [data, setData] = useState<ReviewDtoForStaff>();
  const [datat, setDatat] = useState<ReviewDto[]>([]);
  const [selectedReviews, setSelectedReviews] = useState<number[]>(
    []
  );
  const selectedBulkActions = selectedReviews.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });
  console.log(setFilters);
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
): ReviewDto[] => {
  return datat.filter((order) => {
    let matches = true;
    console.log(order.authorName);
    if (filters.status && order.authorName !== filters.status) {
      matches = false;
    }
    return matches;
  });
};

const applyPagination = (
  page: number,
  limit: number
): ReviewDto[] => {
  return datat.slice(page * limit, page * limit + limit);
};
  // const statusOptions = [
  //   {
  //     id: 'all',
  //     name: 'All'
  //   },
  //   {
  //     id: 'DONE',
  //     name: 'DONE'
  //   },
  //   {
  //     id: 'PROCESSING',
  //     name: 'PROCESSING'
  //   },
  //   {
  //     id: 'CANCEL',
  //     name: 'CANCEL'
  //   },
  //   {
  //     id: 'ACCEPTED',
  //     name: 'ACCEPTED'
  //   },
  // ];

  // const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
  //   let value = null;

  //   if (e.target.value !== 'all') {
  //     value = e.target.value;
  //   }
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     status: value
  //   }));
  // };

  const handleSelectAllReviews = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedReviews(
      event.target.checked
        ? datat.map((order) => order.productId)
        : []
    );
  };

  const handleSelectOneReview = (
    _event: ChangeEvent<HTMLInputElement>,
    reviewId: number,
  ): void => {
    if (!selectedReviews.includes(reviewId)) {
      setSelectedReviews((prevSelected) => [
        ...prevSelected,
        reviewId
      ]);
    } else {
      setSelectedReviews((prevSelected) =>
        prevSelected.filter((id) => id !== reviewId)
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
  const paginatedReviews = applyPagination(
    // filteredOrders,
    page,
    limit
  );
  const selectedSomeReviews =
    selectedReviews.length > 0 &&
    selectedReviews.length < datat.length;
  const selectedAllReviews =
    selectedReviews.length === datat.length;
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
              {/* <FormControl fullWidth variant="outlined">
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
              </FormControl> */}
            </Box>
          }
          title="Recent Reviews"
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
                  checked={selectedAllReviews}
                  indeterminate={selectedSomeReviews}
                  onChange={handleSelectAllReviews}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              {/* <TableCell>Staff ID</TableCell> */}
              <TableCell>Author Name</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedReviews.map((data) => {
              const isReviewSelected = selectedReviews.includes(
                data.productId
              );
              return (
                <TableRow
                  hover
                  key={data.productId}
                  selected={isReviewSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isReviewSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneReview(event, data.productId)
                      }
                      value={isReviewSelected}
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
                      {data.productId}
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
                      {data.title}
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
                      {data.staffId}
                    </Typography>
                  </TableCell>  */}
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {data.authorName}
                    </Typography>
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
export default RecentReviewsTable;
