import {Container} from "react-bootstrap";
import {BarChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label, Bar} from 'recharts';
import {getUsersStats} from "../helpers/UserHelper";
import {useEffect, useState} from "react";

const data = [
    {
        username: "Tomek",
        rentalsNumber: 4000,
        totalCost: 2400,
    },
    {
        username: "Krzysiek",
        rentalsNumber: 3000,
        totalCost: 1000,
    }
];

// x: maile

// y: wartość i liczba wypożyczeń

export default function Analytics() {
    const [userStats, setUserStats] = useState([]);

    async function fetchData() {
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
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="username" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                    type="monotone"
                    dataKey="rentalsNumber"
                    fill="#8884d8"
                />
                <Bar type="monotone" dataKey="totalCost" fill="#82ca9d" />
            </BarChart>

            <div>
                <Label>
                    test bar
                </Label>
                <div className="progress" role="progressbar" aria-label="Example with label" aria-valuenow="10"
                     aria-valuemin="0" aria-valuemax="100">
                    <div className="progress-bar overflow-visible text-dark" style={{width: '10%'}}>Long label text for the
                        progress bar, set to a dark color
                    </div>
                </div>
            </div>
        </Container>
    );
}