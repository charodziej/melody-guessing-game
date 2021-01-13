import React, { useContext } from 'react'

export const createGenericContext = <T extends unknown>() => {
    const genericContext = React.createContext<
        [T, React.Dispatch<React.SetStateAction<T>>] | undefined
    >(undefined)

    const useGenericContext = () => {
        const context = useContext(genericContext)
        if (!context) {
            throw new Error('Context must be used inside a Provider')
        }

        return context
    }

    return [useGenericContext, genericContext.Provider] as const
}
