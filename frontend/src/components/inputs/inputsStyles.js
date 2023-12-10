import { styled } from '@mui/material/styles';
import {FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Button} from '@mui/material';

export const Container = styled('div')`
  font-family: Lato, Montserrat, sans-serif;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 1255px) {
    margin-top: 7px;
  }

  @media (min-width: 814px) and (max-width: 1254px) {
    margin-top: 10px;
  }

  @media screen and (max-width: 814px) {
    margin-top: 10px;
  }
`;

export const StyledFormControl = styled(FormControl)`
  font-size: 14px;
  color: #462904;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 8px;
  align-items: center;
  margin-bottom: 16px;
  transition: color 0.3s ease;
  &:hover {
    color: #462904;
  }
  @media (min-width: 1255px) {
    margin-bottom: 5px;
  }

  @media (min-width: 814px) and (max-width: 1254px) {
    margin-bottom: 2px;
  }

  @media screen and (max-width: 814px) {
    margin-bottom: 2px;
  }
`;

export const StyledFormLabel = styled(FormLabel)`
  font-size: 14px;
  color: #462904;
  &:hover {
    color: #462904; 
  }
`;

export const StyledRadioGroup = styled(RadioGroup)`
  font-size: 14px;
  color: #462904;
  display: flex;
  flex-direction: row;
`;

export const StyledFormControlLabel = styled(FormControlLabel)`
  font-size: 14px;
  color: #462904;
  & .MuiRadio-root.Mui-checked {
    color: #d8c8bc;
  }
  &:hover {
    border-color: #d8c8bc; 
  }
  span {
    font-size: 14px;
  }
`;

export const StyledRadio = styled(Radio)`
  color: #462904;
  & .MuiSvgIcon-root {
    font-size: 10px;
  }
  &.Mui-checked {
    color: #d8c8bc;
    & ~ .MuiFormLabel-root {
      color: #d8c8bc; 
    }
  }
`;

export const StyledTextField = styled(TextField)`
  background-color: #d8c8bc;
  color: #462904;
  font-size: 14px;
  width: 150px;
  border-color: #462904;
  border-radius: 6px;
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: #462904;
    }
    .MuiInputLabel-root {
      font-size: 12px; 
    }

    &:hover fieldset {
      border-color: #462904;
    }
    .MuiInputBase-input {
      font-size: 12px; 
    }
    &.Mui-focused fieldset {
      border-color: #462904;
    }
`;
export const StyledButton = styled(Button)`
  font-family: Lato, Montserrat, sans-serif;
  color: #462904;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  background-color: #d8c8bc;
  font-weight: bold;
  width: 100%;
  max-width: 80%;
  font-size: 12px;
  margin-bottom: 5px;

  @media (min-width: 1255px) {
    font-size: 14px;
    margin-bottom: 10px;
  }

  @media (min-width: 814px) and (max-width: 1254px) {
    font-size: 12px;
    margin-bottom: 7px;
  }

  @media screen and (max-width: 814px) {
    font-size: 12px;
    margin-bottom: 5px;
  }

  &:hover {
    background-color: #462904;
    color: #d8c8bc;
  }

  &:active {
    background-color: #462904;
    color: #d8c8bc;
  }
`;
export const Message = styled('div')`
  color: #462904;
  border: 1px solid #462904;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  border-radius: 6px;
  margin-top: 10px;
  padding: 10px;
  
  @media (min-width: 1255px) {
    margin-top: 10px;
    font-size: 12px;
  }

  @media (min-width: 814px) and (max-width: 1254px) {
    margin-top: 5px;
    font-size: 12px;
  }

  @media screen and (max-width: 814px) {
    margin-top: 5px;
    font-size: 12px;
  }
`;