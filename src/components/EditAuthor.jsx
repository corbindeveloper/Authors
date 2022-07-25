import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Link} from 'react-router-dom';

const EditAuthor = (props) => {

    // useState and useParams HERE
    const {_id} = useParams();
    const [details, setDetails] = useState({});
    let [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();
    const [missing, setMissing] = useState(false)


    // useEffect
    useEffect(() => {
        axios.get(`http://localhost:8000/${_id}`)
        .then(res => {
            console.log(res);
            if(res.data.results) {
                setDetails(res.data.results)
            } else  {
                setMissing(true);
            }
        })
        .catch(err => console.log(err));

    }, [_id])


    // Change Handler
    const changeHandler = e => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        })
    }


    // Submit Handler 
    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/${_id}`, details)
            .then(res => {
                console.log(res)
                if(res.data.errors) {
                    setFormErrors(res.data.errors)
                } else {
                    setFormErrors({});
                    props.setFormSubmitted(!props.formSubmitted)
                    navigate("/")
                }
            })
            .catch(err=>console.log(err));
    }



    return (
        <div>
            {
                missing===true?
                <h1>The author does not exist.</h1>:
                <>
                    <p>Currently Editing: {details.name}</p>

                    <form onSubmit={submitHandler}>

                        <div className="form-group">
                            <label>Name:</label>
                            <p className="text-danger">{formErrors.name?.message}</p>
                            <input type="text" name="name" className='form-control' onChange={changeHandler} defaultValue={details.name}/>
                        </div>

                        <input type="submit" defaultValue="Submit" className='p-2 m-2 submit-btn' />
                        <Link to='/' className='p-2 m-2 cancel-btn'>Cancel</Link>

                    </form>
                </>
            }
        </div>
    );
}

export default EditAuthor;
