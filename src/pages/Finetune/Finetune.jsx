import { useEffect, React, useState } from "react";
import Navbar from '../../components/navbar';
import { Grid, TextField, Button, Typography } from '@mui/material';
import axios from "axios";


export default function Finetune({ finetunefields }) {
    const [inputData, setInputData] = useState([]);

    useEffect(() => {
        // Initialize input data with the provided finetunefields
        const initialInputData = finetunefields.map(field => ({
            label: field.hyper_param,
            value: field.hyper_value,
            readOnly: true // Initially set all fields as read-only
        }));
        setInputData(initialInputData);
    }, [finetunefields]);

    const handleChange = (index, value) => {
        const updatedData = [...inputData];
        updatedData[index].value = value;
        updatedData[index].readOnly = false; // Allow editing once user interacts with the field
        setInputData(updatedData);
    };
    const handleSubmit = async(event) => {
        event.preventDefault(); // Prevent default form submission behavior
        const formData = inputData.map(input => input);
        const transformedData = {};
        formData.forEach(item => {
            transformedData[item.label] = item.value;
        });
        console.log("my transformed data", transformedData)

        const modelId = localStorage.getItem('filter');
        const datasetValue = localStorage.getItem('dataset');
        console.log('modelId :', modelId);
        console.log('datasetValue :', datasetValue);
        try {
            const response = await axios.get('http://localhost:5000/train_model', {
                params: {
                    model_id: modelId,
                    dataset: datasetValue,
                    training_args: transformedData


                },
            });


            if (response.status === 200) {

            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }



return (
    <div className="App">
        <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'center', margin: 30 }}>
            <Typography component="h1" variant="h5" fontFamily="Roboto-Medium">Tune Hyper-Parameters</Typography>
        </div>

        <form onSubmit={handleSubmit}>
            <Grid container spacing={6}>
                {inputData.map((input, index) => (
                    <Grid item xs={6} key={index}>
                        <TextField
                            label={input.label}
                            margin="dense"
                            fullWidth
                            value={input.value}
                            onChange={e => handleChange(index, e.target.value)}
                            readOnly="false"
                        />
                    </Grid>
                ))}
            </Grid>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 120, marginRight: -90 }}>
                <Button type="submit" variant="contained" color="primary">Trigger Job</Button>

            </div>
        </form>
    </div>
);
                }
