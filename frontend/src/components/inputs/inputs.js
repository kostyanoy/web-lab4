import {connect, useDispatch} from "react-redux";
import {
    setX,
    setY,
    setR,
    sendPoints,
    resetPoints,
    getPoints,
    getPointsForTable
} from "../../redux/actions/pointsActions";
import {
    StyledFormControl,
    StyledFormLabel,
    StyledRadioGroup,
    StyledFormControlLabel,
    StyledRadio,
    Container,
    StyledTextField,
    StyledButton,
    Message,
} from "./inputsStyles";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../services/auth";
import {useNavigate} from "react-router-dom";

const Inputs = (props) => {
    const {x, y, r, points} = props;
    const [message, setMessage] = useState("");
    const [isRadiusSelected, setIsRadiusSelected] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useAuth();
    useEffect(() => {
        updateSVG();
    }, [points]);
    const handleXChange = (event) => {
        if (event.target.value === "") {
            setMessage("Вы не выбрали R!!!");
        } else {
            dispatch(setX(event.target.value));
            setMessage("");
        }
    };
    const handleYChange = (event) => {
        const Y = event.target.value;
        if (isNaN(Y) || Y < -5 || Y > 3 || Y === "") {
            setMessage("Y должен быть числом в интервале от -5 до 3");
            dispatch(setY(null));
        } else {
            setMessage("");
            dispatch(setY(Y));
        }
    };

    const handleRChange = async (event) => {
        if (event.target.value === "") {
            setMessage("Вы не выбрали R!!!");
        } else {
            dispatch(setR(event.target.value));
            changeR(event.target.value);
            setIsRadiusSelected(true);
            await dispatch(getPoints(parseFloat(event.target.value)));
            setMessage("");
        }
    };
    const handleSubmit = async () => {
        try {
            if (!x || !y || !r) {
                setMessage("Заполните все поля перед отправкой.");
                return;
            }
            dispatch(sendPoints(x, y, r));
            dispatch(getPoints(r));
            dispatch(getPointsForTable());
            setMessage("");
        } catch (error) {
            console.error("Упс:", error);
        }
    };
    const updateSVG = () => {
        clearSVG();
        points.forEach((point) => {
            const { x, y, r } = point;
            calculator(x, y, r);
        });
    };
    const handleDelete = () => {
        dispatch(resetPoints());
        clearSVG();
        setMessage("Точки удалены");
        window.location.reload();
    };
    const handleLogout = async () => {
        await auth.logout();
        navigate("/");
    };
    let flag;
    function check(x, y, r) {
        flag = (x >= 0 && y <= 0 && x <= r / 2 && y >= -r / 2 && x+y>=-r/2) ||
            (x <= 0 && y <= 0 && x >= -r && y >= -r) ||
            (x >= 0 && y >= 0 && x <= r/2 && y <= r/2 && (Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r/2, 2)));
    }

    useEffect(() => {
        const svg = document.querySelector("svg");
        const getXY = (svg, event) => {
            const rect = svg.getBoundingClientRect();
            return { x: event.clientX - rect.left, y: event.clientY - rect.top };
        };
        let xPoint, yPoint;

        const drawPoint = async (event) => {
            if (!isRadiusSelected) {
                setMessage("А кто радиус выбирать будет?!");
                return;
            }
            let radius = r;
            const point = getXY(svg, event);
            xPoint = point.x;
            yPoint = point.y;
            const tempX = point.x - 200;
            const tempY = 200 - point.y;
            const temp = 120 / radius;
            const newX = (tempX / temp).toFixed(1);
            const newY = (tempY / temp).toFixed(1);
            check(xPoint, yPoint, radius);
            setRound(xPoint, yPoint, flag);
            dispatch(setX(newX));
            dispatch(setY(newY));
            dispatch(sendPoints(newX, newY, radius));
            dispatch(getPointsForTable());
        };

        svg.addEventListener("click", drawPoint);

        return () => {
            svg.removeEventListener("click", drawPoint);
        };
    }, [r, isRadiusSelected, check, dispatch, flag, y]);

    const calculator = (x, y, r) => {
        const width = 400;
        const height = 400;
        const centerX = width / 2;
        const centerY = height / 2;
        const cx = centerX + x * (width / (3.3 * r));
        const cy = centerY - y * (height / (3.3 * r));
        console.log('Calculator - cx, cy:', cx, cy);
        check(x, y, r);
        setRound(cx, cy, flag);
    }
    const setRound = (cx, cy, flag) => {
        const svg = document.querySelector("svg");
        const circle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );
        circle.setAttribute("cx", cx);
        circle.setAttribute("cy", cy);
        circle.setAttribute("r", "5");
        if (flag) {
            circle.setAttribute("fill", "beige");
        } else {
            circle.setAttribute("fill", "black");
        }
        svg.appendChild(circle);
    };
    function clearSVG() {
        const svg = document.querySelector("svg");
        const circles = svg.querySelectorAll("circle");
        circles.forEach((circle) => {
            svg.removeChild(circle);
        });
    }
    function changeR(r) {
        const elements = {
            Ry: r,
            "R/2y": r / 2,
            "-R/2y": -r / 2,
            "-Ry": -r,
            Rx: -r,
            "R/2x": -r / 2,
            "-R/2x": r / 2,
            "-Rx": r,
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
                <StyledRadioGroup
                    aria-label="x"
                    name="x"
                    value={x}
                    onChange={handleXChange}
                >
                    {["-2", "-1.5", "-1", "-0.5", "0", "0.5", "1", "1.5", "2"].map(
                        (value) => (
                            <StyledFormControlLabel
                                key={value}
                                value={value}
                                control={<StyledRadio/>}
                                label={value}
                            />
                        )
                    )}
                </StyledRadioGroup>
            </StyledFormControl>

            <StyledFormControl>
                <StyledFormLabel component="legend">Y: </StyledFormLabel>
                <StyledTextField
                    type="text"
                    placeholder={"-5..3"}
                    onChange={handleYChange}
                    value={props.y !== null ? props.y : ''}
                />
            </StyledFormControl>

            <StyledFormControl>
                <StyledFormLabel component="legend">R: </StyledFormLabel>
                <StyledRadioGroup
                    row
                    aria-label="r"
                    name="r"
                    onChange={handleRChange}
                    value={r}
                >
                    {["1", "1.5", "2", "2.5", "3", "3.5", "4"].map((value) => (
                        <StyledFormControlLabel
                            key={value}
                            value={value}
                            control={<StyledRadio/>}
                            label={value}
                        />
                    ))}
                </StyledRadioGroup>
            </StyledFormControl>
            <StyledButton onClick={handleSubmit}>Send</StyledButton>
            <StyledButton onClick={handleDelete}>Clear</StyledButton>
            <StyledButton onClick={handleLogout}>Logout</StyledButton>
            {message && <Message>{message}</Message>}
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        x: state.x,
        y: state.y,
        r: state.r,
        points: state.points,
    };
};

export default connect(mapStateToProps)(Inputs);
