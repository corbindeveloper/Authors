import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

const OneAuthor = () => {

    const {_id} = useParams();
    const [details, setDetails] = useState({})
    const[missing, setMissing] = useState(false)
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`http://localhost:8000/${_id}`)
            .then(res => {
                console.log(res);
                if(res.data.results) {
                    setDetails(res.data.results)
                } else {
                    setMissing(true)
                }
            })
            .catch(err => console.log(err));

    }, [])


    return (
        
        <div>
            <h1>Work!</h1>
        </div>
    );
}

export default OneAuthor;
