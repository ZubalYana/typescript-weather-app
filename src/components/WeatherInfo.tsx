import { useState, useEffect } from 'react'
import { TextField, Button } from '@mui/material';
export default function WeatherInfo() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState<WeatherResponse | null>(null);

    interface WeatherCondition {
        id: number;
        main: string;
        description: string;
        icon: string;
    }

    interface WeatherMain {
        temp: number;
        humidity: number;
        temp_max: number;
        temp_min: number;
        feels_like: number;
        description: string;
    }

    interface WeatherResponse {
        weather: WeatherCondition[];
        main: WeatherMain;
        name: string;
    }

    async function fetchWeather(city: string): Promise<WeatherResponse> {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"a02e8e52c2abc0854670e1095c03d755"}&units=metric`
        );
        if (!res.ok) throw new Error('City not found');
        return res.json();
    }

    useEffect(() => {
        fetchWeather(city).then((data) => {
            console.log(data);
            setWeather(data);
        });
    }, []);

    return (
        <div className='w-full h-screen p-4 xl:p-8'>
            <div className='flex flex-col xl:w-[350px]'>
                <TextField
                    id="outlined-basic"
                    label="City"
                    variant="outlined"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <Button
                    variant="contained"
                    onClick={() => {
                        fetchWeather(city).then((data) => {
                            console.log(data);
                            setWeather(data);
                        });
                    }}
                    sx={
                        {
                            mt: 2
                        }
                    }
                >
                    Search
                </Button>
            </div>
            <div className='mt-8'>
                <h2 className='mb-2 text-[24px] font-semibold'>Weather data:</h2>
                <p>Temperature: <span className='font-bold'>{weather?.main.temp}°</span></p>
                <p>Feels like: <span className='font-bold'>{weather?.main.feels_like}°</span></p>
                <p>Max temperature: <span className='font-bold'>{weather?.main.temp_max}°</span></p>
                <p>Min temperature: <span className='font-bold'>{weather?.main.temp_min}°</span></p>
                <p>Weather description: <span className='font-bold'>{weather?.weather[0].description}</span></p>
            </div>
        </div>
    )
}
