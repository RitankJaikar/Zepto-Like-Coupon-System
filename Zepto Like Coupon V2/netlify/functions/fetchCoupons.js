// netlify/functions/fetchCoupons.js

exports.handler = async (event) => {
    // Dynamically import node-fetch
    const fetch = (await import('node-fetch')).default;

    const body = JSON.parse(event.body);
    const apiUrl = process.env.API_URL_V2; // Use the environment variable

    // Define your allowed origin
    const allowedOrigin = "https://custom-swiggy-style-chatbot.netlify.app";

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            return {
                statusCode: response.status,
                headers: {
                    //"Access-Control-Allow-Origin": "*", // Allow requests from any origin
                    "Access-Control-Allow-Origin": allowedOrigin // Allow only specified origin
                },
                body: JSON.stringify({ error: "Error fetching from API" })
            };
        }

        const data = await response.json();
        return {
            statusCode: 200,
            headers: {
                //"Access-Control-Allow-Origin": "*", // Allow requests from any origin
                "Access-Control-Allow-Origin": allowedOrigin
            },
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                //"Access-Control-Allow-Origin": "*", // Allow requests from any origin
                "Access-Control-Allow-Origin": allowedOrigin
            },
            body: JSON.stringify({ error: "Server error" })
        };
    }
};