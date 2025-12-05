export default function StepElement({step}) {

    return <li className='flex justify-between gap-x-5'>
        {step.step}
        {step.completed === 0 && <span>✅</span>}
    </li>
}