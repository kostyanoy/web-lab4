import { styled } from '@mui/system';
import { Button, TextField } from "@mui/material";

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 60px;
  width: 40%; 

  @media (min-width: 1255px) {
    width: 35%;
    margin-top: 60px;
  }

  @media (min-width: 814px) and (max-width: 1254px) {
    width: 60%;
    margin-top: 80px;
  }

  @media screen and (max-width: 814px) {
    width: 70%;
    margin-top: 40px;
  }
`;

export const TextFieldStyle = styled(TextField)`
  color: #462904;
  width: 100%;
  margin-bottom: 5px;
  font-family: Lato, Montserrat, sans-serif;

  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: #462904;
    }
    &:hover fieldset {
      border-color: #462904;
    }
    &.Mui-focused fieldset {
      border-color: #462904;
    }
    & input {
      color: #462904;
      background-color: #d8c8bc;
    }
    & .MuiInputLabel-root {
      color: #462904 !important;
    }
  }
`;

export const ButtonContainer = styled(`div`)`
  display: flex;
  flex-direction: column;
  width: 100%;

`;

export const StyledButton = styled(Button)`
  font-family: Lato, Montserrat, sans-serif;
  color: #d8c8bc;
  background-color: #462904;
  font-weight: bold;
  width: 100%;
  font-size: 16px;
  margin-bottom: 10px;

  @media (min-width: 1255px) {
    font-size: 16px;
    margin-bottom: 10px;
  }

  @media (min-width: 814px) and (max-width: 1254px) {
    font-size: 14px;
    margin-bottom: 7px;
  }

  @media screen and (max-width: 814px) {
    font-size: 12px;
    margin-bottom: 5px;
  }

  &:hover {
    background-color: #d8c8bc;
    color: #462904;
  }

  &:active {
    background-color: #d8c8bc;
    color: #462904;
  }
`;
export const Message = styled('div')`
  color: #462904;
  border: 1px solid #462904;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  border-radius: 6px;
  margin-top: 25px;
  padding: 10px;
  
  @media (min-width: 1255px) {
    border-radius: 6px;
    margin-top: 15px;
    padding: 10px;
  }

  @media (min-width: 814px) and (max-width: 1254px) {
    border-radius: 6px;
    margin-top: 40px;
    padding: 15px;
  }

  @media screen and (max-width: 814px) {
    border-radius: 6px;
    margin-top: 50px;
    padding: 17px;
  }
`;
