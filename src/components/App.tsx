import React, { ReactElement, useState } from 'react'
import {
    Button,
    createMuiTheme,
    CssBaseline,
    makeStyles,
    ThemeProvider,
} from '@material-ui/core'
import { orange, red } from '@material-ui/core/colors'
import { createGenericContext } from 'utils'
import { WelcomeScreen, NewGameScreen, GameRunningScreen } from './screens'
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons'
import { Round, ViewType } from 'types'

const [useView, ViewContextProvider] = createGenericContext<ViewType>()
const [useRounds, RoundContextProvider] = createGenericContext<Round[]>()
export { useView, useRounds }

const useStyles = makeStyles((theme) => ({
    main: {
        width: '100%',
        minHeight: '100vh',

        display: 'flex',
        flexDirection: 'column',

        backgroundColor: red[700],
        padding: theme.spacing(4),
    },
    backButton: {
        alignSelf: 'start',
        margin: -theme.spacing(2),
    },
}))

const theme = createMuiTheme({
    palette: {
        primary: orange,
    },
})

export default function App(): ReactElement {
    const classes = useStyles()
    const [view, setView] = useState(ViewType.welcome)
    const [rounds, setRounds] = useState<Round[]>([
        { name: 'Untitled Round', files: [] },
    ])

    return (
        <ThemeProvider theme={theme}>
            <ViewContextProvider value={[view, setView]}>
                <RoundContextProvider value={[rounds, setRounds]}>
                    <div className={classes.main}>
                        <CssBaseline />

                        {view !== ViewType.welcome &&
                            view !== ViewType.gameRunning && (
                                <Button
                                    className={classes.backButton}
                                    variant="contained"
                                    onClick={() => setView(ViewType.welcome)}
                                >
                                    <ArrowBackIcon fontSize="small" />
                                    Home
                                </Button>
                            )}
                        {view === ViewType.welcome && <WelcomeScreen />}
                        {view === ViewType.newGame && <NewGameScreen />}
                        {view === ViewType.gameRunning && <GameRunningScreen />}
                    </div>
                </RoundContextProvider>
            </ViewContextProvider>
        </ThemeProvider>
    )
}
