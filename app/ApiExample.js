"use client";

import React, { useState, useEffect } from 'react';
import MyComponent from './MyComponent';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const ApiExample = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mySearch, setMySearch] = useState("");
    const [showOnlyOpen, setShowOnlyOpen] = useState(false);

    const fetchData = async () => {
        try {
            const response = await fetch('https://api.publicapis.org/entries');
            const result = await response.json();
            setData(result);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    let filtered = "";
    if (data.length !== 0) {
        filtered = data.entries.filter((entry) => {
            if (showOnlyOpen) {
                return entry.Auth === '' && (entry.Description.toLowerCase().includes(mySearch.toLowerCase()) || entry.API.toLowerCase().includes(mySearch.toLowerCase()));
            } else {
                return (entry.Description.toLowerCase().includes(mySearch.toLowerCase()) || entry.API.toLowerCase().includes(mySearch.toLowerCase()));
            }
        });
    } else {
        filtered = data.entries;
    }

    return (
        <div>
            {loading ? (
                <p>Loading data...</p>
            ) : (
                <div>
                    <h3>{filtered.length} Public APIs</h3>
                    <div className="filterfield">
                        Suche: <input type="text" value={mySearch} onChange={(e) => setMySearch(e.target.value)} />
                    </div>
                    <div className="filterfield">
                        <ToggleButtonGroup value={showOnlyOpen} exclusive onChange={() => setShowOnlyOpen(!showOnlyOpen)} aria-label="text alignment">
                            <ToggleButton value={true}>Nur APIs mit offenem Auth anzeigen</ToggleButton>
                            <ToggleButton value={false}>Alle anzeigen</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <div className="filteredList">
                        {filtered.map((entry) => (
                            <MyComponent key={entry.API + entry.Description} api={entry} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApiExample;
