import {styled} from "@mui/system";
import {Button} from "@mui/material";

export const Container = styled('div')`
  margin-top: 500px;
  width: 500px;
  display: flex;
  align-items: center;
`;

export const StyledButton = styled(Button)`
  font-family: Lato, Montserrat, sans-serif;
  color: #d8c8bc;
  background-color: #462904;
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px; 
  &:hover {
    background-color: #d8c8bc;
    color: #462904;
  }
  &:active {
    background-color: #d8c8bc;
    color: #462904;
  }
`;
