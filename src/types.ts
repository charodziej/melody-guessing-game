export enum ViewType {
    welcome,
    newGame,
    loadConfig,
    gameRunning,
}

export interface File {
    name: string
    valueUrl: string
    type: string
}

export interface Round {
    name: string
    files: File[]
}
