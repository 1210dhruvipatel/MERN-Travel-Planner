import {useState, useEffect} from 'react';

const useFatch=(url)=>{
    const [data,setData] = useState([])
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        const fatchData = async()=>{
            setLoading(true)
            try{
                const res = await fetch(url)

                if(!res.ok){
                    setError('faild to fatch')
                }
                const result = await res.json()
                setData(result.data);
                setLoading(false);
            }catch(err){
                setError(err.message)
                setLoading(false)
            }
        };
        fatchData();
    },[url]);
    return{
        data,
        error,
        loading,
    };
};

export default useFatch