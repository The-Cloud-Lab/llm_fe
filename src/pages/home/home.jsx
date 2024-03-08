import { useEffect, React, useState } from "react";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Cards from '../../components/cards'
import { Container } from "@mui/material";
import axios from "axios";
import Navbar from '../../components/navbar'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import ModalList from '../modalsList/modallist'
import Loader from "../../components/Loader";
import Dropdown from "../../components/Dropdown";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Finetune from '../../pages/Finetune/Finetune'


export default function Home() {
  const classes = {
    root: {
      flexGrow: 1
    }
  };
  const steps = ['Classification ', 'Dataset selection', 'Model selection', 'Tune parameters'];


  const theme = useTheme();
  const [Data, setdata] = useState([]);
  const [modaldata, setmodaldata] = useState([]);
  const [next, setNext] = useState(0);
  const [loader, setLoader] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [dropdowndata, setdropdowndata] = useState();
  const [finetunefields, setfinetunefields] = useState([]);





  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  //To do change name to get models list
  const Dropdowndata = async (taskId) => {
    console.log("my dropdown data====>", taskId)
    setLoader(true)
   try {


      const response = await axios.get('https://llmbe-a85c5f05191e.herokuapp.com/datasets', {
        params: {
          task_id: taskId
        },
      });


      if (response.status === 200) {
        console.log("Dropdown data===>" ,response.data.datasets)
        setdropdowndata(response.data.datasets)
        setLoader(false);

      }

    } catch (error) {
      console.error('Error fetching data:', error);
    } 
    setNext(next + 1)
  }

  const handleNext = async (myid) => {
    console.log("my filter========>", myid)
    let newSkipped = skipped;
    console.log("my active step===============>", activeStep)
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);


    await Dropdowndata(myid);
    localStorage.setItem('filter', myid);

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setNext((prevActiveStep) => prevActiveStep - 1);
  };

  const getModals = async () => {

    setNext(next + 1);
    let newSkipped = skipped;
    console.log("my active step===============>", activeStep);
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

    const storedValue = localStorage.getItem('filter');
    console.log("my store value===>", storedValue)
    setLoader(true);

    try {
      const response = await axios.get('https://llmbe-a85c5f05191e.herokuapp.com/models', {
        params: {
          filter: storedValue

        },
      });


      if (response.status === 200) {

        setLoader(false);
        console.log(response.data);
        setmodaldata(response.data);

      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const getFineTunesFields = async (model_id) => {
    console.log("i am fine tune", model_id)
    let newSkipped = skipped;
    console.log("my active step===============>", activeStep)
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    setNext(next + 1)
    try {
      const response = await axios.get('https://llmbe-a85c5f05191e.herokuapp.com/hyperparameters', {
        params: {
          model_id: model_id

        },
      });


      if (response.status === 200) {

        console.log("my finetunedata=====>", response.data);
        setfinetunefields(response.data)

        setLoader(false);

      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }



  }
  const receiveDataFromGrandchild = (data) => {
    getFineTunesFields(data)
  };
 const dataSetValue = (dataset)=>{
  const datasetValue = dataset.value; 
  localStorage.setItem("dataset", datasetValue);
 }

  useEffect(() => {
    console.log("Api response======>");
    axios.get("https://llmbe-a85c5f05191e.herokuapp.com/tasks").then((response) => {
      console.log("Api response===>" + setdata(response.data.tasks));
    });
  }, []);

  return (
    <Container sx={{ width: '100%' }}>
      <Navbar />
      <Box sx={{ display: 'flex' }}>
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Container sx={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }} style={classes.root}>
              <Box sx={{ width: '100%', position: 'relative' }}>
                <Stepper activeStep={activeStep}>
                  {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepSkipped(index)) {
                      stepProps.completed = false;
                    }
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel style={{ fontFamily: "AirbnbCereal_W_Md" }}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>


                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, alignItems: 'center', justifyContent: 'center' }}>
                  <Box sx={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>

                  </Box>

                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ ml: -1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />

                </Box>


              </Box>
              <Divider sx={{ marginBottom: 3 }}>
              </Divider>
              {next === 0 ? (
                <Box>
                  <Grid container spacing={4} sx={{ marginBottom: 10 }}>

                    {Data.map(item => (
                      <Grid item xs={12} md={3} sm={6} key={item.id}>
                        <Cards data={item} onDataFromChild={handleNext} />

                      </Grid>
                    ))}
                  </Grid>

                </Box>
              ) : next === 1 ? (
                <div>
                  <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Dropdown dataSetValue={dataSetValue} dropdowndata={dropdowndata} />
                  </div>
                  <div style={{ marginTop: 100 }}>
                    <Divider>
                      <Chip label="OR" size="medium" />
                    </Divider>
                  </div>
                  <div style={{ marginTop: 60, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx={{ fontFamily: 'roboto', color: 'darkblack' }} variant="h4" gutterBottom>Upload File </Typography>
                  </div>
                  <div style={{ marginTop: 30, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <input
                      id="contained-button-file"
                      multiple
                      type="file"
                      style={{
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        padding: '20px'
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 120, marginRight: -90 }}>
                    <Button
                      variant="contained"
                      endIcon={<ArrowRightAltIcon />}
                      onClick={getModals}
                    >
                      Next
                    </Button>
                  </div>



                </div>


              ) : next === 2 ? (
                <div>
                  <ModalList modaldata={modaldata} sendDataToParent={receiveDataFromGrandchild} />
                </div>

              ) : next === 3 ? (
                <div>
                  <Finetune finetunefields={finetunefields} />
                </div>) : null



              }
            </Container>
          </Box>
        </Box>
        {loader && <Loader startloder={loader} />}
      </Box>

    </Container>
  );
}
