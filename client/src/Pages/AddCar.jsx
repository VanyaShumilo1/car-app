import React from 'react';
import {useNavigate} from "react-router-dom";
import Input from "../Components/UI/Input.jsx";
import styles from '../styles/AddCar.module.scss'
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import axios from "../axios.js";
import Button from "../Components/UI/Button.jsx";
import HeaderBack from "../Components/Header/HeaderBack.jsx";
import Title from "../Components/UI/Title.jsx";
import {capitalize} from "../utils/capitalize.js";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {fuelTypes} from "../utils/fuelTypes.js";
import '../styles/Inputs.scss'

const AddCar = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const goBack = () => {
        navigate(-1)
    }

    const {
        register, handleSubmit, setError, formState: {
            errors, isValid
        }
    } = useForm({
        defaultValues: {
            brand: '',
            model: '',
            year: '',
            fuelType: '',
            engineSize: '',
            description: '',
        },
        mode: 'onChange'
    })

    const onSubmit = async (values) => {
        const fields = {
            ...values,
            brand: capitalize(values.brand),
            model: capitalize(values.model),
            year: Number(values.year),
            engineSize: Number(values.engineSize),
            description: values.description ? values.description : ""
        }
        console.log(fields)
        const car = await axios.post('/car', fields)
        goBack()
    }

    console.log(errors.fuelType)

    return (
        <div className={styles.addCar}>
            <HeaderBack title="Add car"/>
            <form className={styles.addCar__form} onSubmit={handleSubmit(onSubmit)}>
                <Title>Add Car</Title>
                <TextField
                    className={styles.field}
                    type="text"
                    label="Brand"
                    variant="standard"
                    error={Boolean(errors.brand?.message)}
                    helperText={errors.brand?.message}
                    {...register('brand', {required: 'Enter brand'})}

                />

                <TextField
                    className={styles.field}
                    type="text"
                    label="Model"
                    variant="standard"
                    error={Boolean(errors.model?.message)}
                    helperText={errors.model?.message}
                    {...register('model', {required: 'Enter model'})}
                />

                <TextField
                    className={styles.field}
                    type="number"
                    label="Year"
                    variant="standard"
                    error={Boolean(errors.year?.message)}
                    helperText={errors.year?.message}
                    {...register('year', {required: 'Enter year'})}
                />

                <TextField
                    className={styles.field}
                    type="text"
                    label="Engine size"
                    variant="standard"
                    error={Boolean(errors.engineSize?.message)}
                    helperText={errors.engineSize?.message}
                    {...register('engineSize', {required: 'Enter engine size'})}
                />

                <TextField
                    className={styles.field}
                    type="text"
                    label="Description"
                    variant="standard"
                    error={Boolean(errors.description?.message)}
                    helperText={errors.description?.message}

                    {...register('description', {})}
                />

                <div className={styles.fuelSelectBlock}>
                    <FormControl className={"demo-simple-select"} fullWidth>
                        <InputLabel id="demo-simple-select-label">Fuel</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Fuel"
                            helperText={errors.fuelType?.message}
                            {...register('fuelType', {required: 'Enter fuel type'})}

                        >
                            {
                                fuelTypes.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)
                            }

                        </Select>
                    </FormControl>
                </div>


                <Button type="submit">Add car</Button>
            </form>
        </div>
    );
};

export default AddCar;