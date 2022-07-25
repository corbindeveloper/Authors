import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const AllAuthors = (props) => {

    // useState HERE
    let [authors, setAuthors] = useState([]);
    let [authorDeleted, setAuthorDeleted] = useState(false);


    //  useEffect HERE
    useEffect(() => {
		axios.get('http://localhost:8000/')
			.then((res) => {
				console.log("***** RESPONSE:", res);
				setAuthors(res.data.results);
			})
			.catch(err => console.log(err));
	}, [props.formSubmitted, authorDeleted])

    // DELETE
    const deleteAuthor = (_id) => {
        axios.delete(`http://localhost:8000/${_id}`)
            .then(res => {
                console.log(res)
                setAuthorDeleted(!authorDeleted)
            })
            .catch(err=>console.log(err))
    }


    return (
        <div className='list mt-4'>
            <Link to='/new' className='addAuthor'>Add an Author</Link>

            <h4 className='sub'>We have quotes by:</h4>

            <div className='d-flex flex-column allAuthors'>
                <div className='d-flex flex-row even-row'>
                    <h2 className='m-2 title'>Authors</h2>
                    <h2 className='m-2 title'>Actions Available</h2>
                </div>
                {
                    authors.map((author) => {
                        return (
                            <div key={author._id} className='d-flex flex-row p-1 even-row'>

                                <h4 className='p-1 m-2'>{author.name}</h4>
                                <div className='d-flex buttons-case'>


                                    <Link to={`/${author._id}`} className='p-2 m-2 edit-btn'>Edit</Link>


                                    <button onClick={() => deleteAuthor(author._id)} className='p-2 m-2 delete-btn'>Delete</button>
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default AllAuthors;
