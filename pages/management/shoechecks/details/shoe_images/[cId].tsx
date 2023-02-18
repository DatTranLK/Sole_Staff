import SidebarLayout from '@/layouts/SidebarLayout';
import { useRouter } from 'next/router';
import { CSSProperties, useEffect, useState } from 'react';






import { ImageDto } from '@/models/crypto_images';

// const label = { inputProps: { 'aria-label': 'Switch demo' } };



// const currencies = [
//   {
//     value: 'USD',
//     label: '$'
//   },
//   {
//     value: 'EUR',
//     label: '€'
//   },
//   {
//     value: 'BTC',
//     label: '฿'
//   },
//   {
//     value: 'JPY',
//     label: '¥'
//   }
// ];

function Forms() {
  // const [currency, setCurrency] = useState('EUR');

  // const handleChange = (event) => {
  //   setCurrency(event.target.value);
  // };

  // const [value, setValue] = useState(30);

  // const handleChange2 = (_event, newValue) => {
  //   setValue(newValue);
  // };



  const router = useRouter();
  const {cId} = router.query;
  console.log(cId);

//   const apiURL = `https://soleauthenticity.azurewebsites.net/api/shoe-checks/admin/shoe-check/${cId}`;
  const apiURLImage = `https://soleauthenticity.azurewebsites.net/api/shoe-check-images/${cId}`;
  // console.log("api", apiURLImage);

  const [isRender, setisRender] = useState<boolean>(false);
  // const [datat, setDatat] = useState<CheckDto>();
  const [images, setImages] = useState<ImageDto[]>([]);
  const [img1, setImg1] = useState<string>();
  const [img2, setImg2] = useState<string>();
  const [img3, setImg3] = useState<string>();
  const [img4, setImg4] = useState<string>();
  const [img5, setImg5] = useState<string>();
  const [img6, setImg6] = useState<string>();
  const [img7, setImg7] = useState<string>();
  const [img8, setImg8] = useState<string>();
  const [img9, setImg9] = useState<string>();
  const [img10, setImg10] = useState<string>();
  const [zoom, setZoom] = useState(100);

  const getZoomedImageStyles = (zoom: number): CSSProperties => ({
    transform: `scale(${zoom / 100})`,
    transition: 'transform 0.5s',
  });

//   useEffect(()=>{
//     if (router.asPath !== router.route) {
//       fetch(apiURL)
//       .then((response) => response.json())
//       .then((responsedata) => {
//         setDatat(responsedata.data);
//         setisRender(true);
//       //   console.log(responsedata.data);
//       })
//       // fetch(apiURLImage)
//       // .then((response) => response.json())
//       // .then((responsedata) => {
//       //   setImage(responsedata.data);
//       // //   console.log(responsedata.data);
//       // })
      
//     }
    
//  }, [router.asPath, router.route])
console.log(images);

useEffect(() => {
  if (router.asPath !== router.route) {
    const fetchData = async () => {
      try {
        // const res = await fetch(
        //   apiURL
        // );
        // const data = await res.json();
        // console.log(data.data);

        // setDatat(data.data);

        const resFull = await fetch(
          apiURLImage
        );
        const dataFull = await resFull.json();

        setImages(dataFull.data);
        console.log("Image data: ", dataFull.data);
        
        if(dataFull.data[0].imgPath != null)
        {
            setImg1(dataFull.data[0].imgPath);
        }
        if(dataFull.data[1].imgPath != null)
        {
            setImg2(dataFull.data[1].imgPath);
        }
        if(dataFull.data[2].imgPath != null)
        {
            setImg3(dataFull.data[2].imgPath);
        }
        if(dataFull.data[3].imgPath != null)
        {
            setImg4(dataFull.data[3].imgPath);
        }
        if(dataFull.data[4].imgPath != null)
        {
            setImg5(dataFull.data[4].imgPath);
        }
        if(dataFull.data[5].imgPath != null)
        {
            setImg6(dataFull.data[5].imgPath);
        }
        if(dataFull.data[6].imgPath != null)
        {
            setImg7(dataFull.data[6].imgPath);
        }
        if(dataFull.data[7].imgPath != null)
        {
            setImg8(dataFull.data[7].imgPath);
        }
        if(dataFull.data[8].imgPath != null)
        {
            setImg9(dataFull.data[8].imgPath);
        }
        if(dataFull.data[9].imgPath != null)
        {
            setImg10(dataFull.data[9].imgPath);
        }

        setisRender(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }
  

}, [router.asPath, router.route]);

  return (
    <>
        {isRender ? (<>
      {/* <Head>
        <title>Forms - Components</title>
      </Head>
      <PageTitleWrapper>
          <Typography variant="h3" component="h3" gutterBottom>
            Check - Details
          </Typography>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Fields of Shoe Check" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' }
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                        id="outlined-read-only-input"
                        label="ID"
                        defaultValue={datat.id}
                        multiline
                        InputProps={{
                          readOnly: true
                        }}
                      />
                    <TextField
                        id="outlined-read-only-input"
                        label="Code"
                        defaultValue={datat.code}
                        multiline
                        InputProps={{
                          readOnly: true
                        }}
                      />
                    <TextField
                        id="outlined-read-only-input"
                        label="Is Authentic"
                        defaultValue={datat.isAuthentic}
                        multiline
                        InputProps={{
                          readOnly: true
                        }}
                      />
                    <TextField
                        id="outlined-read-only-input"
                        label="Is Active"
                        defaultValue={datat.isActive}
                        multiline
                        InputProps={{
                          readOnly: true
                        }}
                      />
                  </div>
                  <div>
                    <TextField
                        id="outlined-read-only-input"
                        label="Customer Name"
                        defaultValue={datat.customerName}
                        multiline
                        InputProps={{
                          readOnly: true
                        }}
                      />
                    <TextField
                        id="outlined-read-only-input"
                        label="Date Submitted"
                        defaultValue={datat.dateSubmitted}
                        multiline
                        InputProps={{
                          readOnly: true
                        }}
                      />
                    <TextField
                        id="outlined-read-only-input"
                        label="Date Completed"
                        defaultValue={datat.dateCompletedChecking}
                        multiline
                        InputProps={{
                          readOnly: true
                        }}
                      />
                    <TextField
                        id="outlined-read-only-input"
                        label="Status"
                        defaultValue={datat.statusChecking}
                        multiline
                        InputProps={{
                          readOnly: true
                        }}
                      />
                    </div>
                    <div>
                      <TextField
                          id="outlined-read-only-input"
                          label="Shoe Name"
                          defaultValue={datat.shoeName}
                          multiline
                          InputProps={{
                            readOnly: true
                          }}
                      />
                    </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Image Shoe Check" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' }
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <List component={Box} display="flex" width={320} justifyContent={'space-between'} >
                    <Button variant="contained" href={`/management/shoechecks/details/shoe_images/${datat.id}`}>Show Images</Button>
                  </List>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer /> */}
      <div>
      {
        <img style={getZoomedImageStyles(zoom)} width={100} height={100} src={img1}/>
        
      }
      <button onClick={() => setZoom(zoom + 10)}>+</button>
      <button onClick={() => setZoom(zoom - 10)}>-</button>
      </div>
      {
        <img width={100} height={100} src={img2}/>
    
      }
      {
        <img width={100} height={100} src={img3}/>
    
      }
      {
        <img width={100} height={100} src={img4}/>
    
      }
      {
        <img width={100} height={100} src={img5}/>
    
      }
      {
        <img width={100} height={100} src={img6}/>
    
      }
      {
        <img width={100} height={100} src={img7}/>
    
      }
      {
        <img width={100} height={100} src={img8}/>
    
      }
      {
        <img width={100} height={100} src={img9}/>
    
      }
      {
        <img width={100} height={100} src={img10}/>
    
      }
    </>) : <></>}
    </>
    
  );
}

Forms.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Forms;
