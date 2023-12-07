import { styled } from '@mui/material/styles';
import {FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Button} from '@mui/material';

export const Container = styled('div')`
  font-size: 25px;
  font-family: Lato, Montserrat, sans-serif;
  display: flex;
  flex-direction: column;
  margin-top: 480px;
`;

export const StyledFormControl = styled(FormControl)`
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
`;

export const StyledFormLabel = styled(FormLabel)`
  color: #462904;
  margin-right: 10px;
  &:hover {
    color: #462904; 
  }
`;

export const StyledRadioGroup = styled(RadioGroup)`
  color: #462904;
  display: flex;
  flex-direction: row;
`;

export const StyledFormControlLabel = styled(FormControlLabel)`
  font-size: 20px;
  color: #462904;
  & .MuiRadio-root.Mui-checked {
    color: #d8c8bc;
  }
  &:hover {
    border-color: #d8c8bc; 
  }
`;

export const StyledRadio = styled(Radio)`
  font-size: 20px;
  color: #462904;
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
  width: 200px;
  border-color: #462904;
  border-radius: 6px;
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
`;
export const StyledButton = styled(Button)`
  font-family: Lato, Montserrat, sans-serif;
  color: #d8c8bc;
  background-color: #462904;
  font-weight: bold;
  width: 100%;
  max-width: 80%; 
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