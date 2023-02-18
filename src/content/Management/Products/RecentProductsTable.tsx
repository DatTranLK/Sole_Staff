import {
  Box, Button, Card, CardHeader, Checkbox, Divider, IconButton, List, Table,
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
import { CodeName, ProductDto, ProductDtoForStaff } from '@/models/crypto_products';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import Link from 'src/components/Link';

const apiURL = "https://soleauthenticity.azurewebsites.net/api/products";

interface RecentProductsTableProps {
  className?: string;
}

interface Filters {
  code?: CodeName;
}

// const getStatusLabel = (codeName: CodeName): JSX.Element => {
//   const map = {
//     SKU: {
//       text: 'SKU',
//       color: 'success'
//     },
//     NIKE: {
//       text: 'NIKE',
//       color: 'warning'
//     },
//   };

//   const { text, color }: any = map[codeName];

//   return <Label color={color}>{text}</Label>;
// };

const RecentProductsTable: FC<RecentProductsTableProps> = () => {
  const [data, setData] = useState<ProductDtoForStaff>();
  const [datat, setDatat] = useState<ProductDto[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<number[]>(
    []
  );
  const selectedBulkActions = selectedProducts.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    code: null
  });

  // const ref = useRef<any>(null);
  // const [isOpen, setOpen] = useState<boolean>(false);

  // const handleOpen = (): void => {
  //   setOpen(true);
  // };

  // const handleClose = (): void => {
  //   setOpen(false);
  // };
  
  console.log(setFilters);
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

//  const fetchDataForStatusProducting = async (productId : number) => {
//   console.log(productId);
//   const response = await fetch('https://soleauthenticity.azurewebsites.net/api/shoe-checks/shoe-check/'+productId, {
//     method: 'PUT',
//     body: JSON.stringify({ /* data to be sent in the request body */ }),
//     // headers: { 'Content-Type': 'application/json' }
//   })
//   location.reload();
//   // .then(response => response.json())
//   // .then(data => {
//   //     console.log(data);
// // })

// };
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
): ProductDto[] => {
  return datat.filter((product) => {
    let matches = true;
    if (filters.code && product.code !== filters.code) {
      matches = false;
    }
    return matches;
  });
};

const applyPagination = (
  page: number,
  limit: number
): ProductDto[] => {
  return datat.slice(page * limit, page * limit + limit);
};
  // const statusOptions = [
  //   {
  //     id: 'all',
  //     name: 'All'
  //   },
  //   {
  //     id: 'SKU',
  //     name: 'SKU'
  //   },
  //   {
  //     id: 'NIKE',
  //     name: 'NIKE'
  //   },
  // ];

  // const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
  //   let value = null;

  //   if (e.target.value !== 'all') {
  //     value = e.target.value;
  //   }
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     code: value
  //   }));
  // };

  const handleSelectAllProducts = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedProducts(
      event.target.checked
        ? datat.map((order) => order.id)
        : []
    );
  };

  const handleSelectOneProduct = (
    _event: ChangeEvent<HTMLInputElement>,
    productId: number,
  ): void => {
    if (!selectedProducts.includes(productId)) {
      setSelectedProducts((prevSelected) => [
        ...prevSelected,
        productId
      ]);
    } else {
      setSelectedProducts((prevSelected) =>
        prevSelected.filter((id) => id !== productId)
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
  const selectedSomeProducts =
    selectedProducts.length > 0 &&
    selectedProducts.length < datat.length;
  const selectedAllProducts =
    selectedProducts.length === datat.length;
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
                <InputLabel>Code Name</InputLabel>
                <Select
                  value={filters.code || 'all'}
onChange={handleStatusChange}
                  label="Code Name"
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
          title="Recent Products"
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
                  checked={selectedAllProducts}
                  indeterminate={selectedSomeProducts}
                  onChange={handleSelectAllProducts}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell align='right'>Price</TableCell>
              <TableCell align='right'>AmountInStore</TableCell>
              <TableCell align='right'>AmountSold</TableCell>
              <TableCell align='right'>Active</TableCell>
              <TableCell align='right'>Actions</TableCell>
              <TableCell align='right'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedChecks.map((data) => {
              const isProductSelected = selectedProducts.includes(
                data.id
              );
              return (
                <TableRow
                  hover
                  key={data.id}
                  selected={isProductSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isProductSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneProduct(event, data.id)
                      }
                      value={isProductSelected}
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
                      {data.name}
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
                      {data.dateCreated}
                    </Typography>
                  </TableCell> 
                  <TableCell align='right'>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {data.price}
                    </Typography>
                  </TableCell> 
                  <TableCell align='right'>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {data.amountInStore}
                    </Typography>
                  </TableCell> 
                  <TableCell align='right'>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {data.amountSold}
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
                          <NextLink href="/management/reviews/details/create/index"><EditTwoToneIcon fontSize="small"/></NextLink>
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
                  <List component={Box} width={150} display="flex" justifyContent={'space-between'} >
                  <Button variant="contained" component={Link} href={`/management/reviews/details/create/${data.id}`}>Add Review</Button>
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
export default RecentProductsTable;