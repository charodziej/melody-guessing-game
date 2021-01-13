import React, { ReactElement } from 'react'
import { Button, makeStyles, Paper, Typography } from '@material-ui/core'
import { useView } from 'components/App'
import { ViewType } from 'types'

interface Props {}

const useStyles = makeStyles((theme) => ({
    main: {
        margin: 'auto',
        display: 'flex',
        flexShrink: 1,
        flexDirection: 'column',

        padding: theme.spacing(2),
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        justifyContent: 'space-evenly',
        paddingTop: theme.spacing(2),
    },
}))

export function WelcomeScreen({}: Props): ReactElement {
    const classes = useStyles()
    const [view, setView] = useView()

    return (
        <Paper className={classes.main}>
            <Typography variant="h4">Melody Guessing Game</Typography>
            <Typography>
                Welcome to the Melody Guessing Game! Below you can start a new
                game, or load an existing config file
            </Typography>
            <div className={classes.buttonWrapper}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setView(ViewType.newGame)}
                >
                    New Game
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setView(ViewType.loadConfig)}
                >
                    Load config
                </Button>
            </div>
        </Paper>
    )
}
