import React, { ReactElement, useEffect, useRef, useState } from 'react'
import {
    CircularProgress,
    makeStyles,
    Paper,
    Typography,
} from '@material-ui/core'
import { File } from 'types'

interface Props {
    file: File
    setResult: (res: number) => void
}

const useStyles = makeStyles((theme) => ({
    wrapper: {
        margin: 'auto',
        width: '60vw',
        display: 'flex',
    },
    main: {
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 1,

        padding: theme.spacing(2),
    },
    progressWrapper: {
        position: 'relative',
        height: 256,
    },
    videoProgressWrapper: {
        top: 0,
        left: 0,
        position: 'absolute',
        height: 136,
        width: 136,
        backgroundColor: 'white',
        paddingRight: 8,
        paddingBottom: 8,
        borderBottomRightRadius: '50%',
    },
    audioProgress: {
        position: 'absolute',
    },
    audioLabel: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        inset: 0,
    },
}))

export default function FilePlayer({ file, setResult }: Props): ReactElement {
    const classes = useStyles()
    const playerRef = useRef<HTMLAudioElement & HTMLVideoElement>(null)
    const [timePassed, setTimePassed] = useState(0)

    let width = '96px'
    let type = 'none'
    if (file) {
        if (file.type.match(/audio\/*./)) {
            width = '288px'
            type = 'audio'
        }
        if (file.type.match(/video\/*./)) {
            width = '60vw'
            type = 'video'
        }
    }

    useEffect(() => {
        const processKey = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'p':
                    if (playerRef.current?.paused) {
                        playerRef.current?.play()
                    } else {
                        playerRef.current?.pause()
                    }
                    break
                case 'c':
                    setResult(1)
                    break
                case 'w':
                    setResult(2)
                    break
            }
        }
        const processMouse = (event: MouseEvent) => {
            if (!playerRef.current?.paused) {
                playerRef.current?.pause()
            }
        }

        if (file) {
            document.addEventListener('keydown', processKey)
            document.addEventListener('click', processMouse)
        }
        return () => {
            if (file) {
                document.removeEventListener('keydown', processKey)
                document.removeEventListener('click', processMouse)
            }
        }
    }, [setResult, file])

    return (
        <div className={classes.wrapper}>
            <Paper className={classes.main} style={{ width }}>
                {type === 'none' && <CircularProgress size={64} />}
                {type === 'audio' && (
                    <>
                        <div className={classes.progressWrapper}>
                            <CircularProgress
                                size={256}
                                variant="determinate"
                                className={classes.audioProgress}
                                value={
                                    (100 * timePassed) /
                                    (playerRef.current?.duration || 60)
                                }
                            />
                            <div className={classes.audioLabel}>
                                <Typography component="div" variant="h3">
                                    {Math.floor(timePassed / 60)}:
                                    {Math.floor(timePassed % 60)
                                        .toString()
                                        .padStart(2, '0')}
                                </Typography>
                            </div>
                        </div>
                        <audio
                            autoPlay
                            src={file.valueUrl}
                            muted={false}
                            ref={playerRef}
                            onTimeUpdate={(event) => {
                                setTimePassed(event.currentTarget.currentTime)
                            }}
                        />
                    </>
                )}
                {type === 'video' && (
                    <div style={{ position: 'relative' }}>
                        <div className={classes.videoProgressWrapper}>
                            <CircularProgress
                                size={128}
                                variant="determinate"
                                className={classes.audioProgress}
                                value={
                                    (100 * timePassed) /
                                    (playerRef.current?.duration || 60)
                                }
                            />
                            <div className={classes.audioLabel}>
                                <Typography component="div" variant="h4">
                                    {Math.floor(timePassed / 60)}:
                                    {Math.floor(timePassed % 60)
                                        .toString()
                                        .padStart(2, '0')}
                                </Typography>
                            </div>
                        </div>
                        <video
                            autoPlay
                            src={file.valueUrl}
                            muted={false}
                            ref={playerRef}
                            onTimeUpdate={(event) => {
                                setTimePassed(event.currentTarget.currentTime)
                            }}
                            style={{ width: '100%' }}
                        />
                    </div>
                )}
            </Paper>
        </div>
    )
}
