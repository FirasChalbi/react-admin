import React, { useEffect, useState, PureComponent} from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Chart from 'chart.js/auto';
const Graph = () => {

    const [data, setData] = useState([]);

    const [formData, setFormData] = useState({
        label: '',
        value: ''
    });

    useEffect(() => {
        fetch('/api/data')
            .then(res => res.json())
            .then(res => {
                setData(res.data);
                
            })
            .catch(err => console.log(err));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setData([...data, formData]);
        
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Label:
                    <input type="text" name="label" onChange={handleChange} value={formData.label} />
                </label>
                <label>
                    Value:
                    <input type="number" name="value" onChange={handleChange} value={formData.value} />
                </label>
                <input type="submit" value="Add Data" />
            </form>
            <div className='css-ll806y'>
        <ResponsiveContainer className='css-ll806y' width={700} height={400}>
        <BarChart height={250} data={data} barGap={22} >
            <CartesianGrid stroke= {null}  />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" style={{fill: "#8884d8", strokeWidth: 1, opacity: 0.8}} radius={100} barSize={30} stroke= {null} />
        </BarChart>
        </ResponsiveContainer>
        </div>
        </div>
        
    );
    
};

export default Graph;


