import {connect, useDispatch} from "react-redux";
import {setX, setY, setR, sendPoints, resetPoints, getPoints} from "../../redux/actions/pointsActions";
import {
    StyledFormControl,
    StyledFormLabel,
    StyledRadioGroup,
    StyledFormControlLabel,
    StyledRadio,
    Container,
    StyledTextField,
    StyledButton
} from './inputsStyles';
import {useEffect} from "react";
import {useAuth} from "../../services/auth";
import {useNavigate} from "react-router-dom";

const Inputs = (props) => {
    const {x, y, r, ERROR} = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useAuth();
    const handleXChange = (event) => {
        dispatch(setX(event.target.value));
    };
    const handleYChange = (event) => {
        dispatch(setY(event.target.value));
    };
    const handleRChange = (event) => {
        const newR = event.target.value;
        dispatch(setR(newR));
        changeR(newR);
        dispatch(getPoints(x, y, newR));
        clearSVG();
    };
    const handleLogout = async () => {
            await auth.logout();
            navigate("/");
    };
    const handleSubmit = () => {
        dispatch(sendPoints(x, y, r));
        dispatch(getPoints(r));
        calculator(x, y, r);
    };
    const handleDelete = () => {
        dispatch(resetPoints());
        dispatch(getPoints(0));
        clearSVG();
    }

    const calculator = (x, y, r) => {
        const svg = document.querySelector('svg');
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        const width = 400;
        const height = 400;
        const centerX = width / 2;
        const centerY = height / 2;
        const cx = centerX + x * (width / (3.3 * r));
        const cy = centerY - y * (height / (3.3 * r));
        setRound(cx, cy);
        svg.appendChild(circle);
    };

    function clearSVG() {
        const svg = document.querySelector('svg');
        const circles = svg.querySelectorAll("circle");
        circles.forEach(circle => {
            svg.removeChild(circle);
        });
    }

    const setRound = (cx, cy) => {
        const svg = document.querySelector('svg');
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute("cx", cx);
        circle.setAttribute("cy", cy);
        circle.setAttribute("r", '5');
        circle.setAttribute("fill", "beige");
        svg.appendChild(circle);
    };
    useEffect(() => {
        const svg = document.querySelector('svg');
        const getXY = (svg, event) => {
            const rect = svg.getBoundingClientRect();
            return {x: event.clientX - rect.left, y: event.clientY - rect.top};
        };

        let xPoint, yPoint;

        const drawPoint = (event) => {
            let radius = r;
            const point = getXY(svg, event);
            xPoint = point.x;
            yPoint = point.y;
            console.log(xPoint, yPoint);
            const tempX = point.x - 200;
            const tempY = 200 - point.y;
            const temp = 120 / radius;
            const newX = (tempX / temp).toFixed(1);
            const newY = (tempY / temp).toFixed(1);
            console.log(newX, newY)
            setRound(xPoint, yPoint);
            dispatch(sendPoints(newX, newY, radius));
        };

        svg.addEventListener("click", drawPoint);

        return () => {
            svg.removeEventListener("click", drawPoint);
        };
    }, [r]);

    function changeR(r) {
        const elements = {
            "Ry": r,
            "R/2y": r / 2,
            "-R/2y": -r / 2,
            "-Ry": -r,
            "Rx": -r,
            "R/2x": -r / 2,
            "-R/2x": r / 2,
            "-Rx": r
        };
        for (const id in elements) {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = elements[id] ? elements[id].toString() : "";
            }
        }
    }

    return (
        <Container>
            <StyledFormControl>
                <StyledFormLabel component="legend">X: </StyledFormLabel>
                <StyledRadioGroup aria-label="x" name="x" value={x} onChange={handleXChange}>
                    {['-2', '-1.5', '-1', '-0.5', '0', '0.5', '1', '1.5', '2'].map((value) => (
                        <StyledFormControlLabel key={value} value={value} control={<StyledRadio/>} label={value}/>
                    ))}
                </StyledRadioGroup>
            </StyledFormControl>

            <StyledFormControl>
                <StyledFormLabel component="legend">Y: </StyledFormLabel>
                <StyledTextField
                    type="number"
                    placeholder={'-5..3'}
                    onChange={handleYChange}
                    value={y || ''}
                    InputProps={{
                        inputProps: {
                            min: -5,
                            max: 3,
                        },
                        maxLength: 2,
                    }}
                />

            </StyledFormControl>

            <StyledFormControl>
                <StyledFormLabel component="legend">R: </StyledFormLabel>
                <StyledRadioGroup row aria-label="r" name="r" onChange={handleRChange} value={r}>
                    {['-2', '-1.5', '-1', '-0.5', '0.5', '1', '1.5', '2'].map((value) => (
                        <StyledFormControlLabel key={value} value={value} control={<StyledRadio/>} label={value}/>
                    ))}
                </StyledRadioGroup>
            </StyledFormControl>
            <StyledButton onClick={handleSubmit}>Send</StyledButton>
            <StyledButton onClick={handleDelete}>Clear</StyledButton>
            <StyledButton onClick={handleLogout}>Clear</StyledButton>


            {ERROR && <div style={{color: 'red'}}>{ERROR}</div>}
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        x: state.x,
        y: state.y,
        r: state.r,
        ERROR: state.ERROR,
    };
};

export default connect(mapStateToProps)(Inputs);
