import React from 'react';
import {Link, Navigate} from 'react-router-dom'
import Input from "../Components/UI/Input.jsx";
import styles from "../styles/Registration.module.scss"
import Button from "../Components/UI/Button.jsx";
import Title from "../Components/UI/Title.jsx";
import Subtitle from "../Components/UI/Subtitle.jsx";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuth, selectIsAuth} from "../redux/slices/auth.js";

const Login = () => {

    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth)

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
        const data = await dispatch(fetchAuth(values))

        if(!data.payload) {
            return alert("Login failed")
        }

        if('token' in data.payload) {
            localStorage.setItem('token', data.payload.token)
        }
    }

    if (isAuth) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className={styles.Authorization}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.titles}>
                    <Title>Let's get started</Title>
                    <Subtitle>Log in</Subtitle>
                </div>

                <div className={styles.form__item}>
                    <Input
                        register={register}
                        name={'email'}
                        rules={{required: 'Enter email'}}
                        type="email"
                        id="email"
                        placeholder="Email"
                    />
                </div>

                <div className={styles.form__item}>
                    <Input
                        register={register}
                        name={'password'}
                        rules={{required: 'Enter password'}}
                        type="password"
                        id="password"
                        placeholder="Password"
                    />
                </div>

                <Button type="submit">Log in</Button>

                <div className={styles.caption}>
                    Do not have an account? <Link to={'/register'}>Let's create it now!</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;