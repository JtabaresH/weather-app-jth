import React from 'react';
import RingLoader from "react-spinners/RingLoader";

const Loader = () => {

    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState("#ffffff");

    useEffect(() => {
        setLoading(true);
         setTimeout(() => {
            setLoading(false);
         }, 5000)
    }, []);
    return (
        {
            loading ?
        }
        <div>
            
        </div>
    );
};

export default Loader;