import React, { ReactElement } from 'react'
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Button,
    IconButton,
    makeStyles,
    TextField,
    Typography,
} from '@material-ui/core'
import {
    Delete as DeleteIcon,
    ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons'
import { Round } from 'types'

interface Props {
    round: Round
    setRound: React.Dispatch<(oldVal: Round) => Round>
    deleteRound: () => void
    setExpanded: () => void
    expanded: boolean
}

const useStyles = makeStyles((theme) => ({
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
}))

export default function RoundAccordion({
    round,
    setRound,
    deleteRound,
    setExpanded,
    expanded,
}: Props): ReactElement {
    const classes = useStyles()

    return (
        <Accordion expanded={expanded} onChange={setExpanded}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{round.name}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
                <TextField
                    label="Name"
                    className={classes.nameField}
                    value={round.name}
                    onChange={(event) =>
                        setRound((oldVal) => ({
                            ...oldVal,
                            name: event.target.value,
                        }))
                    }
                />
                <Typography>Files:</Typography>
                {round.files.map(({ name, valueUrl }, fileIndex) => (
                    <div className={classes.file} key={fileIndex}>
                        <div>
                            <Typography variant="body2">
                                {fileIndex + 1}. {name}
                            </Typography>
                        </div>
                        <IconButton
                            className={classes.smallIcon}
                            onClick={() => {
                                setRound((oldVal) => {
                                    const files = Array.from(oldVal.files)
                                    files.splice(fileIndex, 1)
                                    return {
                                        ...oldVal,
                                        files,
                                    }
                                })
                            }}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </div>
                ))}
            </AccordionDetails>
            <AccordionActions>
                <Button variant="text" onClick={deleteRound}>
                    Delete
                </Button>
                <Button variant="contained" color="primary" component="label">
                    Add files
                    <input
                        type="file"
                        hidden
                        accept="video/*,audio/*"
                        multiple
                        onChange={(event) => {
                            setRound((oldVal) => ({
                                ...oldVal,
                                files: [
                                    ...oldVal.files,
                                    ...Array.from(event.target.files || []).map(
                                        (file) => ({
                                            name: file.name,
                                            valueUrl: URL.createObjectURL(file),
                                            type: file.type,
                                        })
                                    ),
                                ],
                            }))
                        }}
                    />
                </Button>
            </AccordionActions>
        </Accordion>
    )
}
