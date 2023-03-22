import React from 'react';
import {Link} from 'react-router-dom'
import Input from "../Components/UI/Input.jsx";
import styles from "../styles/Registration.module.scss"
import Button from "../Components/UI/Button.jsx";
import Title from "../Components/UI/Title.jsx";
import Subtitle from "../Components/UI/Subtitle.jsx";
import {useForm} from "react-hook-form";

const Registration = () => {

    const {
        register, handleSubmit, setError, formState: {
            errors, isValid
        }
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onChange'
    })

    const onSubmit = async (values) => {
        console.log(123)
        console.log(values)
    }

    console.log(isValid)

    return (
        <div className={styles.Registration}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.titles}>
                    <Title>Let's get started</Title>
                    <Subtitle>Registration</Subtitle>
                </div>

                <div className={styles.form__item}>
                    <Input
                        {...register('email', {required: 'Enter email'})}
                        type="email"
                        id="email"
                        placeholder="Email"
                    />
                </div>

                <div className={styles.form__item}>
                    <Input
                        {...register('password', {required: 'Enter password'})}
                        type="password"
                        id="password"
                        placeholder="Password"
                    />
                </div>

                <Button type="submit">Create account</Button>


                <div className={styles.caption}>
                    Already have account? <Link to={'/login'}>Login</Link>
                </div>
            </form>


        </div>
    );
};

export default Registration;