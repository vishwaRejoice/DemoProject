import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DynmiceTable = () => {
    const [values, setValues] = useState({});
    const [keys, setKeys] = useState([]);
    const [list, setList] = useState([]);
    const [errors, setErrors] = useState({});

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });


    }

    const handleOnAdd = () => {
        const matchkey = keys.some(existingKey => existingKey === values.key);
        if (matchkey) {
            toast.error("Already added this key");
        } else if (!values.key) {
            toast.error("Key cannot be empty");
        } else {
            setKeys([...keys, values.key]);
            setValues({ ...values, key: '' }); // Clear the input field after adding
        }
    }

    const handleOnAddToList = () => {
        const newErrors = validateForm(values);
        if (Object.keys(newErrors).length === 0) {
            setList([...list, values]);
            setValues({}); // Clear the form after adding to list
            setErrors({});
        } else {
            setErrors(newErrors);
        }
    }

  
    const validateForm = (fields) => {
        const newErrors = {};
        keys.forEach(key => {
            if (!fields[key]) {
                newErrors[key] = `${key} is required`;
            }
        });
        return newErrors;
    }

    return (
        <div>
            <input 
                type="text" 
                placeholder="Enter a key" 
                name="key" 
                value={values.key || ''} 
                onChange={handleOnChange} 
            />
            {errors.key && <span style={{ color: 'red' }}>{errors.key}</span>}
            <button onClick={handleOnAdd}>Add Key</button>
            {keys.map((item, i) => (
                <div key={i}>
                    <label>{item}</label>
                    <input 
                        type={item.includes("number") ? "number" : "text"} // Dynamically set input type
                        placeholder={`Enter a ${item}`} 
                        name={item} 
                        value={values[item] || ''} 
                        onChange={handleOnChange} 
                    />
                    {errors[item] && <span style={{ color: 'red' }}>{errors[item]}</span>}
                </div>
            ))}
            <button onClick={handleOnAddToList}>Add to List</button>

            <table>
                <thead>
                    <tr>
                        {keys.map((key, i) => (
                            <th key={i}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, i) => (
                        <tr key={i}>
                            {keys.map((key, j) => (
                                <td key={j}>{item[key] ?? '-'}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DynmiceTable;
