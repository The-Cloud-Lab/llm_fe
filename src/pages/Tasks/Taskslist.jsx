import { useEffect,React,useState } from "react";
import Grid from "@mui/material/Grid";
import { Container, Typography,Box } from "@mui/material";
import Cards from '../../components/cards'
import Navbar from '../../components/navbar'
import axios from "axios";


export default function TaskList() {
const [List, setList] = useState([]);
  const classes = {
    root: {
      flexGrow: 1
    }

  };

useEffect(() => {
  console.log("Api response======>");
    axios.get("https://llmbe-a85c5f05191e.herokuapp.com/tasks").then((response) => {
      console.log("Api response" + setList(response.data.tasks));
    });
  }, []);

  return (
    <><Navbar />
    <Container sx={{ justifyContent: 'center', alignItems: 'center',backgroundColor: '#f0f0f0' }} style={classes.root}>

      <Typography component="h1" variant="h8" align="center"
       color="#007FFF"margin={10} paddingTop={4}>Select the Suitable Option</Typography>

      <Grid container spacing={4} sx={{marginBottom:10}}>
        {List.map(item => (
          <Grid item xs={6} md={2}>
            <Cards data={item} />
          </Grid>
        ))}






      </Grid>
    </Container></>
  );
} 