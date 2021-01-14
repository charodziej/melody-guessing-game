import React, { ReactElement, useState } from 'react'
import {
    Collapse,
    IconButton,
    makeStyles,
    Paper,
    Typography,
} from '@material-ui/core'
import { useRounds, useView } from 'components/App'
import { blue, green, red } from '@material-ui/core/colors'
import {
    ArrowForward as ArrowForwardIcon,
    Done as DoneIcon,
    PlayArrow as PlayArrowIcon,
} from '@material-ui/icons'
import FilePlayer from 'components/FilePlayer'

interface Props {}

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyItems: 'space-around',
        minHeight: 'calc(100vh - 64px)',

        userSelect: 'none',
    },
    main: {
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',

        padding: theme.spacing(8),
        width: '30vw',
        transition: theme.transitions.create(['width', 'margin']),
    },
    roundFinished: {
        color: green['A400'],
        transition: theme.transitions.create('color'),
    },
    currentRound: {
        color: blue['A200'],
        transition: theme.transitions.create('color'),
    },
    futureRound: {
        paddingLeft: 32,
        transition: theme.transitions.create('color'),
    },
    icon: {
        marginBottom: 0,
        marginRight: 8,
    },
    files: {
        paddingLeft: 40,
    },
    file: {
        margin: theme.spacing(1),
        height: 36,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    smallIcon: {
        marginLeft: theme.spacing(2),
        padding: theme.spacing(1),
    },
    correct: {
        overflow: 'hidden',
        paddingRight: 44,
        width: '100%',
        transition: theme.transitions.create(['color', 'width']),
        whiteSpace: 'nowrap',

        color: green['A400'],
    },
    wrong: {
        overflow: 'hidden',
        paddingRight: 44,
        width: '100%',
        transition: theme.transitions.create(['color', 'width']),
        whiteSpace: 'nowrap',

        color: red['A400'],
    },
    uncovered: {
        overflow: 'hidden',
        width: '100%',
        transition: theme.transitions.create('width'),
    },
}))

export function GameRunningScreen({}: Props): ReactElement {
    const classes = useStyles()
    const [view, setView] = useView()
    const [rounds, setRounds] = useRounds()
    const [currRound, setCurrRound] = useState(0)
    const [playedFiles, setPlayedFiles] = useState<number[]>(
        rounds[currRound].files.map(() => 0)
    )
    const [showFiles, setShowFiles] = useState(true)
    const [playingFile, setPlayingFile] = useState(-1)

    const playNextRound = () => {
        const nextRound = (currRound + 1) % rounds.length

        setTimeout(() => setShowFiles(false), 500)
        setTimeout(() => {
            setPlayedFiles(rounds[nextRound].files.map(() => 0))
            setCurrRound(nextRound)
        }, 1500)
        setTimeout(() => setShowFiles(true), 2000)
    }

    const setFilePlayed = (index: number, value: number) => {
        setPlayedFiles((oldVal) => {
            const newVal = Array.from(oldVal)
            newVal[index] = value
            if (newVal.every((val) => val > 0)) playNextRound()
            return newVal
        })
        setPlayingFile(-1)
    }

    return (
        <div
            className={classes.wrapper}
            onContextMenu={(event) => {
                event.preventDefault()
                return false
            }}
        >
            <Paper className={classes.main}>
                {rounds.map(({ name, files }, index) => (
                    <div key={index}>
                        {index < currRound ? (
                            <Typography
                                variant="h4"
                                className={classes.roundFinished}
                            >
                                <DoneIcon className={classes.icon} />
                                {name}
                            </Typography>
                        ) : index === currRound ? (
                            <Typography
                                variant="h4"
                                className={classes.currentRound}
                            >
                                <ArrowForwardIcon className={classes.icon} />
                                {name}
                            </Typography>
                        ) : (
                            <Typography
                                variant="h4"
                                className={classes.futureRound}
                            >
                                {name}
                            </Typography>
                        )}
                        <Collapse
                            in={showFiles && index === currRound}
                            timeout={700}
                            classes={{ wrapperInner: classes.files }}
                        >
                            {files.map(({ name, valueUrl }, fileIndex) => (
                                <div key={fileIndex} className={classes.file}>
                                    <Typography
                                        variant="body1"
                                        className={
                                            playedFiles[fileIndex] === 0
                                                ? classes.uncovered
                                                : playedFiles[fileIndex] === 1
                                                ? classes.correct
                                                : classes.wrong
                                        }
                                        style={
                                            playingFile === fileIndex
                                                ? { width: 0 }
                                                : {}
                                        }
                                    >
                                        {playedFiles[fileIndex] === 0
                                            ? '??????????'
                                            : name}
                                    </Typography>
                                    {playedFiles[fileIndex] === 0 && (
                                        <IconButton
                                            className={classes.smallIcon}
                                            disabled={playingFile !== -1}
                                            onClick={(event) => {
                                                setPlayingFile(fileIndex)
                                                event.currentTarget.blur()
                                            }}
                                        >
                                            <PlayArrowIcon fontSize="small" />
                                        </IconButton>
                                    )}
                                </div>
                            ))}
                        </Collapse>
                    </div>
                ))}
            </Paper>
            <FilePlayer
                file={rounds[currRound].files[playingFile]}
                setResult={(res) => setFilePlayed(playingFile, res)}
            />
        </div>
    )
}
