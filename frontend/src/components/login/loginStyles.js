import { styled } from '@mui/material/styles';
import {Button} from "@mui/material";
import {TextField} from "@mui/material";

export const Container = styled('div')`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const TextFieldStyle = styled(TextField)`
  color: #462904;
  width: 500px;
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
export const StyledButton = styled(Button)`
  font-family: Lato, Montserrat, sans-serif;
  color: #d8c8bc;
  background-color: #462904;
  font-size: 16px;
  font-weight: bold;
  width: 500px;
  margin-bottom: 10px;
  &:hover {
    background-color: #d8c8bc;
    color: #462904;
  }
  &:active {
    background-color: #d8c8bc;
    color: #462904;
  }
`;