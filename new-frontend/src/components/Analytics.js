import {Container} from "react-bootstrap";
import {Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis} from 'recharts';
import {getUsersStats} from "../helpers/UserHelper";
import {useEffect, useState} from "react";

export default function Analytics () {
    const [userStats, setUserStats] = useState([]);

    async function fetchData () {
        const response = await getUsersStats();

        response.json().then((t) => {
            setUserStats(t);
            console.log(t);
        });
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <Container>
            <label>
                Liczba wypożyczeń na użytkownika
            </label>
            <BarChart
                width={1000}
                height={300}
                data={userStats}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="lastName"/>
                <YAxis/>
                <Bar
                    dataKey="rentalsNumber"
                    fill="#8884d8"
                />
            </BarChart>
            <label>
                Wydatki użytkownika
            </label>
            <BarChart
                width={1000}
                height={300}
                data={userStats}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis type={"category"} dataKey="lastName" hide={false}/>
                <YAxis/>
                <Tooltip/>
                <Bar
                    dataKey="totalCost"
                    fill="#82ca9d"
                />
            </BarChart>
        </Container>
    );
}