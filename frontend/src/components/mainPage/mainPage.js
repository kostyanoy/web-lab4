import React from 'react';
import './mainPage.css';
import Inputs from "../inputs/inputs";
import Table from "../table/table";
const MainPage = () => {
    return (
        <div>
            <div className="window">
                <div id="coordinatePanelWrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <div id="coordinatePanel" style={{ position: 'relative', width: '400px', height: '400px', textAlign: 'center' }}>
                        <svg width="400" height="400">
                            <line x1="0" y1="200" x2="400" y2="200" style={{ stroke: 'black', strokeWidth: 2 }} />
                            <line x1="200" y1="0" x2="200" y2="400" style={{ stroke: 'black', strokeWidth: 2 }} />
                            <polygon points="400,200 390,195 390,205" style={{ fill: 'black' }} />
                            <polygon points="200,0 195,10 205,10" style={{ fill: 'black' }} />
                            <line x1="80" y1="195" x2="80" y2="205" style={{ stroke: 'black', strokeWidth: 2 }} />
                            <line x1="140" y1="195" x2="140" y2="205" style={{ stroke: 'black', strokeWidth: 2 }} />
                            <line x1="260" y1="195" x2="260" y2="205" style={{ stroke: 'black', strokeWidth: 2 }} />
                            <line x1="320" y1="195" x2="320" y2="205" style={{ stroke: 'black', strokeWidth: 2 }} />
                            <text id="Rx" x="75" y="220" fontSize="12">-R</text>
                            <text id="R/2x" x="135" y="220" fontSize="12">-R/2</text>
                            <text id="-R/2x" x="255" y="220" fontSize="12">R/2</text>
                            <text id="-Rx" x="315" y="220" fontSize="12">R</text>
                            <line x1="195" y1="80" x2="205" y2="80" style={{ stroke: 'black', strokeWidth: 2 }} />
                            <line x1="195" y1="140" x2="205" y2="140" style={{ stroke: 'black', strokeWidth: 2 }} />
                            <line x1="195" y1="260" x2="205" y2="260" style={{ stroke: 'black', strokeWidth: 2 }} />
                            <line x1="195" y1="320" x2="205" y2="320" style={{ stroke: 'black', strokeWidth: 2 }} />
                            <text id="Ry" x="180" y="85" fontSize="12">R</text>
                            <text id="R/2y" x="180" y="145" fontSize="12">R/2</text>
                            <text id="-R/2y" x="180" y="265" fontSize="12">-R/2</text>
                            <text id="-Ry" x="180" y="325" fontSize="12">-R</text>
                        <path d="M200,200 L200,140 A80,80 0 0,1 260,200 Z"
                              style={{ fill: 'rgba(225, 217, 206, 0.5)', stroke: 'black', strokeWidth: 2 }} />
                        <polygon points="260,200 200,200 200,260"
                                 style={{ fill: 'rgba(225, 217, 206, 0.5)', stroke: 'black', strokeWidth: 2 }} />
                        <polygon points="80,200 200,200 200,320 80,320"
                                 style={{ fill: 'rgba(225, 217, 206, 0.5)', stroke: 'black', strokeWidth: 2 }} />
                        </svg>
                    </div>
                </div>
                <Inputs/>
            </div>
            <Table />
        </div>
    );
};
export default MainPage;
