import api from "../api/axios.js";
import {useState} from "react";

export default function StepElement({step, onCheck}) {
    const [checked, setChecked] = useState(step.completed);

    async function handleCheck(id) {

        try {
            checked ? onCheck(prev => prev - 1) : onCheck(prev => prev + 1);
            setChecked(!checked);

            await api.get('/sanctum/csrf-cookie');
            await api.patch(`/api/steps/${id}/toggle`);
        } catch (error) {
            console.log(error)
        }
    }

    return <li className='flex items-center space-x-6'>
        <input className='cursor-pointer' type='checkbox' checked={checked} onChange={() => handleCheck(step.id)}/>
        <p className='text-left text-wrap px-2'>{step.step}</p>
    </li>
}