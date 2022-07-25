import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';

const CreateAuthor = (props) => {

    // useState
    let [formInfo, setFormInfo] = useState({});
    let [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();


    // Change Handler
    const changeHandler = e => {
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })
    }


    // Submit Handler
    const submitHandler = e => {
        e.preventDefault();
        axios.post("http://localhost:8000/new", formInfo)
            .then(res => {
                console.log("***** RESPONSE:", res)
                console.log(res.data.errors);
                if(res.data.errors) {
                    setFormErrors(res.data.errors)
                } else {
                    setFormErrors({});
                    props.setFormSubmitted(!props.formSubmitted)
                    navigate("/")
                }
            })
            .catch(err => console.log(err))
    }


    return (
        <div>
            <p>Submit form to add a new author.</p>

            <form onSubmit={submitHandler}>

                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" className='form-control' onChange={changeHandler}/>
                    <p className="text-danger">{formErrors.name?.message}</p>
                </div>

                <input type="submit" defaultValue="Submit" className='p-2 m-2 submit-btn' />
                <Link to='/' className='p-2 m-2 cancel-btn'>Cancel</Link>
                <p></p>

            </form>
        </div>
    );
}

export default CreateAuthor;
