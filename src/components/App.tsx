import React, { ReactElement } from 'react'
import { CssBaseline, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    main: {
        width: '100vw',
        height: '100vh',

        display: 'flex',
        flexDirection: 'column',
    },
}))

export default function App(): ReactElement {
    const classes = useStyles()

    return (
        <div className={classes.main}>
            <CssBaseline />
            <p>
                Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a>
        </div>
    )
}
