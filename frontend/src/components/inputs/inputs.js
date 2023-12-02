import React, {useState, useEffect} from 'react';
import { setX, setY, setR, sendPoint} from '../../redux/actions/pointsActions';

import {
    StyledFormControl,
    StyledFormLabel,
    StyledRadioGroup,
    StyledFormControlLabel,
    StyledRadio,
    Container,
    StyledTextField
} from './inputsStyles';
import {useDispatch} from "react-redux";

const Inputs = () => {
    const [selectedR, setSelectedR] = useState('0');
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const handleXChange = (event) => {
        dispatch(setX(event.target.value));
    };

    const handleYChange = (event) => {
        dispatch(setY(event.target.value));
    };

    const handleRChange = (event) => {
        const rNum = event.target.value;
        if (!isNaN(rNum)) {
            setSelectedR(rNum);
            dispatch(setR(event.target.value));
            setError(null);
        } else {
            setError('Invalid R value');
        }
    };
    useEffect(() => {
        const svg = document.querySelector('svg');
        const setRound = (cx, cy) => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute("cx", cx);
            circle.setAttribute("cy", cy);
            circle.setAttribute("r", '5');
            circle.setAttribute("fill", "beige");
            svg.appendChild(circle);
        };

        const getXY = (svg, event) => {
            const rect = svg.getBoundingClientRect();
            return {x: event.clientX - rect.left, y: event.clientY - rect.top};
        };
        let xPoint, yPoint;
        const drawPoint = (event) => {
            let r = selectedR;
            const point = getXY(svg, event);
            xPoint = point.x;
            yPoint = point.y;
            console.log(xPoint,yPoint);
            const tempX = point.x - 200;
            const tempY = 200 - point.y;
            const temp = 120 / r;
            const newX = (tempX / temp).toFixed(1);
            const newY = (tempY / temp).toFixed(1);
            console.log(newX,newY)
            setRound(xPoint, yPoint);
        };

        svg.addEventListener("click", drawPoint);

        return () => {
            svg.removeEventListener("click", drawPoint);
        };
    }, [selectedR]);
    const handleSubmit = () => {
        dispatch(sendPoint());
    };

    return (
        <Container>
            <StyledFormControl>
                <StyledFormLabel component="legend">X: </StyledFormLabel>
                <StyledRadioGroup aria-label="x" name="x">
                    {['-2', '-1.5', '-1', '-0.5', '0', '0.5', '1', '1.5', '2'].map((value) => (
                        <StyledFormControlLabel key={value} value={value} control={<StyledRadio/>} label={value} onChange={handleXChange}/>
                    ))}
                </StyledRadioGroup>
            </StyledFormControl>

            <StyledFormControl>
                <StyledFormLabel component="legend">Y: </StyledFormLabel>
                <StyledTextField type="number" placeholder={'-5..3'} onChange={handleYChange}
                                 InputProps={{
                                     inputProps: {
                                         min: -5,
                                         max: 3,
                                     },
                                     maxLength: 2
                                 }}
                />
            </StyledFormControl>

            <StyledFormControl>
                <StyledFormLabel component="legend">R: </StyledFormLabel>
                <StyledRadioGroup row aria-label="r" name="r" value={selectedR} onChange={handleRChange}>
                    {['-2', '-1.5', '-1', '-0.5', '0.5', '1', '1.5', '2'].map((value) => (
                        <StyledFormControlLabel key={value} value={value} control={<StyledRadio/>} label={value}/>
                    ))}
                </StyledRadioGroup>
            </StyledFormControl>
            <button onClick={handleSubmit}>Отправить точку</button>
        </Container>
    );
};

export default Inputs;
  