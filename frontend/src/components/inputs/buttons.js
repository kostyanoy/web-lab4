import React, {useState, useEffect} from 'react';
import {Container, StyledButton} from "./buttonsStyle";


const Buttons = () => {
    return (
        <div>
            <form>
                <Container>
                        <StyledButton type="button" onClick={}>Login</StyledButton>
                        <StyledButton type="button" onClick={}>Register</StyledButton>
                </Container>
            </form>
        </div>
    );
}
export default Buttons;
