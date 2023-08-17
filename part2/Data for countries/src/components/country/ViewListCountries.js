import { useEffect, useState } from "react"
import ShowCountry from "./ShowCountry"


const ViewListCountries = ({ listCountry, fetched }) => {

    const [country, setCountry] = useState(null)
    const [showComponent, setShowComponent] = useState(false)

    const hook = () => {
        setCountry(null)
        setShowComponent(false)
    }
    useEffect(hook, [listCountry])

    const handleClick = (countryData) => {
        setCountry(countryData)
        setShowComponent(true)
        console.log("Click Handled from :", countryData)
    }


    if (listCountry.length > 10) return 'Too Many Result'
    if (listCountry.length === 0) return 'Please check the keyword'
    if (listCountry.length === 1) {
        return (
            <>
                <ShowCountry country={fetched[0]} />
            </>
        )
    }

    // if (showComponent) return <ViewComp />

    return (
        <div>
            <ul>
                {fetched.map(x => {
                    return (
                        <li key={x.name.common}>{x.name.common} <button onClick={() => handleClick(x)}>show</button> </li>
                    )
                })}

            </ul>

            <br />

            {showComponent && <ShowCountry country={country} />}



            {/* <pre>
                {(country === null) ? '' : JSON.stringify(country, null, 2)}
            </pre> */}


        </div>
    )
}

export default ViewListCountries