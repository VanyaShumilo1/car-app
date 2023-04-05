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
            model: '',
            brand: '',
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
            year: Number(values.year),
            engineSize: Number(values.engineSize),
            description: values.description ? values.description : ""
        }
        console.log(fields)
        const car = await axios.post('/car', fields)
        goBack()
    }


    return (
        <div className={styles.addCar}>
            <HeaderBack title="Add car"/>
            <form className={styles.addCar__form} onSubmit={handleSubmit(onSubmit)}>
                <Title>Add Car</Title>
                <Input
                    register={register}
                    name={'brand'}
                    rules={{required: 'Enter brand'}}
                    type="text"
                    placeholder="Brand"
                />
                <Input
                    register={register}
                    name={'model'}
                    rules={{required: 'Enter model'}}
                    type="text"
                    placeholder="Model"
                />
                <Input
                    register={register}
                    name={'year'}
                    rules={{required: 'Enter year'}}
                    type="number"
                    placeholder="Year"
                />
                <Input
                    register={register}
                    name={'fuelType'}
                    rules={{required: 'Enter fuelType'}}
                    type="text"
                    placeholder="Fuel"
                />
                <Input
                    register={register}
                    name={'engineSize'}
                    rules={{required: 'Enter engineSize'}}
                    step="0.01"
                    type="text"
                    placeholder="Engine size (L)"
                />
                <Input
                    register={register}
                    name={'description'}
                    rules={{}}
                    type="text"
                    placeholder="Description"
                />

                <Button type="submit">Add car</Button>
            </form>
        </div>
    );
};

export default AddCar;