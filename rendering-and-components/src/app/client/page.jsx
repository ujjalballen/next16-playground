"use client"

import { useEffect, useState } from "react"

export default function ClientPage(){
    const [count, setCount] = useState(0);
    const [userDatas, setUserDatas] = useState([]);

    useEffect(() => {
        const getUsers = async() => {
            const res = await fetch("https://jsonplaceholder.typicode.com/users");
            const users= await res.json();
            setUserDatas(users);
        };

        getUsers();
    }, [])

    console.log(userDatas)

    const origin = window.location.origin;

    return(
        <div>
            This is a Client Page!
            <h1>Counter: </h1>
            <p>count no:{count}</p>
            <button onClick={() => setCount(count + 1)}>Increase</button><br />
            {origin} <br />
            <div>
                {JSON.stringify(userDatas)}
            </div>
        </div>
    )
}