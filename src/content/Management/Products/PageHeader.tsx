import { Grid, Typography } from '@mui/material';


function PageHeader() {
  const user = {
    name: 'Staff',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Product
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, these are your recent products
        </Typography>
      </Grid>
      {/* <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Create Order
        </Button>
      </Grid> */}
    </Grid>
  );
}

export default PageHeader;
