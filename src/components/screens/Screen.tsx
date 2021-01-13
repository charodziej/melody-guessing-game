import React, { ReactElement } from 'react'
import { makeStyles, Paper, Typography } from '@material-ui/core'
import { useView } from 'components/App'

interface Props {}

const useStyles = makeStyles((theme) => ({
    main: {
        margin: 'auto',
        display: 'flex',
        flexShrink: 1,
        flexDirection: 'column',

        padding: theme.spacing(2),
    },
}))

export function Screen({}: Props): ReactElement {
    const classes = useStyles()
    const [view, setView] = useView()

    return (
        <Paper className={classes.main}>
            <Typography variant="h4">Melody Guessing Game</Typography>
        </Paper>
    )
}
