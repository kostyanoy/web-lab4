import {useDispatch, useSelector} from "react-redux";
import {setX, setY, setR, sendPoints, resetPoints, getPoints, logoutAuth, saveStateToLocalStorage} from "../../redux/actions/pointsActions";
import {StyledFormControl, StyledFormLabel, StyledRadioGroup, StyledFormControlLabel, StyledRadio, Container, StyledTextField, StyledButton, Message, ButtonContainer,} from "./inputsStyles";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../services/auth";
import {useNavigate} from "react-router-dom";

const Inputs = () => {
    const x = useSelector((state) => state.x);
    const y = useSelector((state) => state.y);
    const r = useSelector((state) => state.r);
    const points = useSelector((state) => state.points);
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
            setMessage("");
            dispatch(setX(event.target.value));
        }
    };
    const handleYChange = (event) => {
        const Y = event.target.value;
        const regex = /^-?\d*\.?\d*$/;
        if (!regex.test(Y) || Y < -5 || Y > 3 || Y === "") {
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
            setMessage("");
            changeR(event.target.value);
            setIsRadiusSelected(true);
            dispatch(setR(event.target.value));
            await dispatch(getPoints(parseFloat(event.target.value)));
        }
    };
    const handleSubmit = async () => {
        try {
            if (!x || !y || !r) {
                setMessage("Заполните все поля перед отправкой.");
                return;
            }
            setMessage("");
            dispatch(sendPoints(x, y, r));
            await dispatch(getPoints(r));
        } catch (error) {
            console.error("Упс:", error);
        }
    };
    const updateSVG = () => {
        clearSVG();
        points.forEach((point) => {
            const {x, y, r} = point;
            calculator(x, y, r);
        });
    };
    const handleDelete = async () => {
        clearSVG();
        await dispatch(resetPoints());
        setMessage("Точки удалены");
        await dispatch(saveStateToLocalStorage());
    };

    const handleLogout = async () => {
        clearSVG();
        dispatch(saveStateToLocalStorage());
        dispatch(logoutAuth());
        await auth.logout();
        navigate("/");
    };

    let flag;
    function check(x, y, r) {
        const isInsideCircle = (x, y, radius) => x * x + y * y <= radius * radius;
        const isInsideRectangle = (x, y, height, width) => Math.abs(x) <= width && Math.abs(y) <= height;
        const isInsideRhombus = (x, y, height, width) => Math.abs(x) / width + Math.abs(y) / height <= 1;
        flag = (x >= 0 && y >= 0 && isInsideCircle(x, y, r / 2)) ||
            (x >= 0 && y <= 0 && isInsideRhombus(x, y, r / 2, r / 2)) ||
            (x <= 0 && y <= 0 && isInsideRectangle(x, y, r, r));
    }

    useEffect(() => {
        const svg = document.querySelector("svg");
        const getXY = (svg, event) => {
            const rect = svg.getBoundingClientRect();
            return {x: event.clientX - rect.left, y: event.clientY - rect.top};
        };
        const drawPoint = async (event) => {
            if (!isRadiusSelected) {
                setMessage("А кто радиус выбирать будет?!");
                return;
            }
            let radius = r;
            const point = getXY(svg, event);
            const tempX = point.x - 200;
            const tempY = 200 - point.y;
            const temp = 120 / radius;
            const newX = (tempX / temp).toFixed(1);
            const newY = (tempY / temp).toFixed(1);
            dispatch(setX(newX));
            dispatch(setY(newY));
            dispatch(sendPoints(newX, newY, radius));
            calculator(newX, newY, radius);
        };

        svg.addEventListener("click", drawPoint);

        return () => {
            svg.removeEventListener("click", drawPoint);
        };
    }, [check, updateSVG]);

    const calculator = (x, y, r) => {
        const width = 400;
        const height = 400;
        const centerX = width / 2;
        const centerY = height / 2;
        const cx = centerX + x * (width / (3.3 * r));
        const cy = centerY - y * (height / (3.3 * r));
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
                    type="number"
                    placeholder={"-5..3"}
                    onChange={handleYChange}
                    value={y !== null ? y : ""}/>
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
            <ButtonContainer>
                <StyledButton onClick={handleSubmit}>Send</StyledButton>
                <StyledButton onClick={handleDelete}>Clear</StyledButton>
                <StyledButton onClick={handleLogout}>Logout</StyledButton>
            </ButtonContainer>
            {message && <Message>{message}</Message>}
        </Container>
    );
};
export default Inputs;