import React, { useEffect, useState } from 'react'
import Plots from './Plots';
import AppService from '../Service/AppService';

function Body() {
const [plots, setPlots] = useState([]);
const [loading, setLoading] = useState(true);

const fetchPlots = async () => {
try {
    const response = await AppService.getAllPlots();
    setPlots(response.data);
    setLoading(false);
} catch (error) {
    console.error('Error fetching plots:', error);
}
};

useEffect(() => {
  fetchPlots();
}, []);
  return (
    <div>
        <Plots plots={plots} loading={loading}/>
    </div>
  )
}

export default Body