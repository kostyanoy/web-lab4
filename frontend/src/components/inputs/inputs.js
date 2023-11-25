import React, { useState } from "react";
import { ComboBox, Spinner} from 'belle';
import "./inputs.css";

const Inputs = () => {
    const [xCoordinate, setXCoordinate] = useState('');
    const [yCoordinate, setYCoordinate] = useState(0);
    const [radius, setRadius] = useState('');
    const handleXChange = (value) => {
        setXCoordinate(value);
    };
    const handleYChange = (value) => {
        setYCoordinate(value);
    };
    const handleRadiusChange = (value) => {
        setRadius(value);
    };

    return (
        <div>
            <form>
                <ComboBox
                    placeholder="Choose X"
                    value={xCoordinate}
                    onUpdate={(obj) => handleXChange(obj.value)}>
                    {['-2', '-1.5', '-1', '-0.5', '0', '0.5', '1', '1.5', '2'].map((value, index) => (
                        <Option key={index} value={value}>{value}</Option>
                    ))}
                </ComboBox>
                <br />
                <Spinner defaultValue={0} value={yCoordinate} onChange={handleYChange} min={-5} max={3} placeholder="Choose Y"/>
                <br />
                <ComboBox
                    placeholder="Choose R"
                    value={radius}
                    onUpdate={(obj) => handleRadiusChange(obj.value)}>
                    {['-2', '-1.5', '-1', '-0.5', '0', '0.5', '1', '1.5', '2'].map((value, index) => (
                        <Option key={index} value={value}>{value}</Option>
                    ))}
                </ComboBox>
            </form>
        </div>
    );
};

export default Inputs;
