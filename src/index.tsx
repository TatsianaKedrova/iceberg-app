import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { RootThemeProvider } from './RootThemeProvider';
import { CssBaseline } from '@mui/material';
import reportWebVitals from './reportWebVitals';
import Roots from './components/root/Roots';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
    <StrictMode>
        <RootThemeProvider>
            <BrowserRouter>
                <CssBaseline />
                <Roots />
            </BrowserRouter>
        </RootThemeProvider>
    </StrictMode>,
    document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
