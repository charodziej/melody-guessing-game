export enum ViewType {
    welcome,
    newGame,
    loadConfig,
}

export interface File {
    name: string
    valueUrl: string
}

export interface Round {
    name: string
    files: File[]
}
