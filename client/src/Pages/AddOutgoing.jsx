import React from 'react';
import HeaderBack from "../Components/Header/HeaderBack.jsx";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import axios from "../axios.js";
import styles from "../styles/AddCar.module.scss";
import Title from "../Components/UI/Title.jsx";
import Input from "../Components/UI/Input.jsx";
import Button from "../Components/UI/Button.jsx";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {outgoingsTypes} from "../utils/outgoingsTypes.js";

const AddOutgoing = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const currentCurrency = useSelector(state => state.car.currentCurrency)
    const currentCar = useSelector(state => state.car.currentCar)
    const goBack = () => {
        navigate(-1)
    }

    const {
        register, handleSubmit, setError, formState: {
            errors, isValid
        }
    } = useForm({
        defaultValues: {
            price: '',
            currency: currentCurrency,
            description: '',
            type: '',
        },
        mode: 'onChange'
    })

    const onSubmit = async (values) => {
        const fields = {
            ...values,
            price: Number(values.price),

        }

        const car = await axios.post('/outgoing/', fields, {
            headers: {
                carid: currentCar._id
            }
        })
        goBack()
    }


    return (
        <div className={styles.addCar}>
            <HeaderBack title="Add car"/>
            <form className={styles.addCar__form} onSubmit={handleSubmit(onSubmit)}>
                <Title>Add outgoing to {currentCar?.brand} {currentCar?.model} {currentCar?.year}</Title>
                <Input
                    register={register}
                    name={'price'}
                    rules={{required: 'Enter price'}}
                    type="number"
                    placeholder="Price"
                />
                <Input
                    register={register}
                    name={'currency'}
                    rules={{required: 'Enter currency'}}
                    type="text"
                    placeholder="Currency"
                />
                <Input
                    register={register}
                    name={'description'}
                    rules={{required: 'Enter description'}}
                    type="text"
                    placeholder="Description"
                />

                <div className={styles.selectBlock}>
                    <FormControl className={"demo-simple-select"} fullWidth>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Type"
                            helperText={errors.type?.message}
                            {...register('type', {required: 'Enter type'})}

                        >
                            {
                                outgoingsTypes.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)
                            }

                        </Select>
                    </FormControl>
                </div>

                <Button type="submit">Add outgoing</Button>
            </form>
        </div>
    );
};

export default AddOutgoing;