import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/UserContext';

const SignUp = () => {
    const { userSignUp } = useContext(AuthContext);
    const [confirmPassworderror, setConfirmPassworderror] = useState(null);
    const [passworderror, setPassworderror] = useState(null);
    const handlerSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(email, password);
        if (password !== confirm) {
            setConfirmPassworderror('Password not match');
            return;

        }
        if (!/(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}/.test(password)) {
            setPassworderror('Atleast 8 characters length,2 letters in Upper Case,1 Special Character2 numerals 3 letters in Lower Case');
            return;
        }

        userSignUp(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
            })
            .catch(error => console.error(error));






    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">

                <div className="hero-content flex-col lg:flex-row-reverse">
                    <h1 className="text-5xl font-bold">SignUp now!</h1>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handlerSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                <p className='text-red-500'><small>{passworderror}</small></p>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">confirm Password</span>
                                </label>
                                <input type="password" name='confirm' placeholder="password" className="input input-bordered" required />
                                <p className='text-red-500'><small>{confirmPassworderror}</small></p>

                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">SignUp</button>
                            </div>
                        </form>
                        <label className="label">
                            <p><small>Have an account? please <button className="btn btn-active btn-link"><Link to='/login'>LogIn</Link></button></small></p>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;