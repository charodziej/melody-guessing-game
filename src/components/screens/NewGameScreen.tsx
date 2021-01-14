import React, { ReactElement, useState } from 'react'
import { Button, makeStyles, Paper, Typography } from '@material-ui/core'
import { useRounds, useView } from 'components/App'
import { Round, ViewType } from 'types'
import RoundAccordion from 'components/RoundAccordion'

interface Props {}

const useStyles = makeStyles((theme) => ({
    main: {
        margin: 'auto',
        display: 'flex',
        flexShrink: 1,
        flexDirection: 'column',

        padding: theme.spacing(2),
    },
    accordionDetails: {
        display: 'flex',
        flexDirection: 'column',
    },
    file: {
        margin: theme.spacing(1),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    smallIcon: {
        marginLeft: theme.spacing(2),
        padding: theme.spacing(1),
    },
    nameField: {
        paddingBottom: theme.spacing(2),
    },
    title: {
        alignSelf: 'center',
        marginBottom: theme.spacing(1),
    },
}))

export function NewGameScreen({}: Props): ReactElement {
    const classes = useStyles()
    const [view, setView] = useView()
    const [rounds, setRounds] = useRounds()
    const [expandedRound, setExpandedRound] = useState(0)

    const setCurrRound = (func: (oldVal: Round) => Round, index: number) => {
        setRounds((oldVal) => {
            const newRounds = Array.from(oldVal)
            newRounds[index] = func(oldVal[index])
            return newRounds
        })
    }

    return (
        <Paper className={classes.main}>
            <Typography variant="h4" className={classes.title}>
                New game
            </Typography>
            {rounds.map((round, roundIndex) => (
                <RoundAccordion
                    round={round}
                    setRound={(val) => setCurrRound(val, roundIndex)}
                    deleteRound={() => {
                        setRounds((oldVal) => {
                            const rounds = Array.from(oldVal)
                            rounds.splice(roundIndex, 1)
                            return rounds
                        })
                    }}
                    expanded={roundIndex === expandedRound}
                    setExpanded={() =>
                        setExpandedRound((oldVal) =>
                            roundIndex === oldVal ? -1 : roundIndex
                        )
                    }
                    key={roundIndex}
                />
            ))}
            <Button
                variant="contained"
                style={{ marginBottom: 8, marginTop: 8 }}
                onClick={() =>
                    setRounds((oldVal) => [
                        ...oldVal,
                        { name: 'Untitled Round', files: [] },
                    ])
                }
            >
                Add round
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setView(ViewType.gameRunning)}
            >
                Start game
            </Button>
        </Paper>
    )
}
