import React, { createContext, useReducer, ReactNode, Dispatch, useContext } from "react";

export type LoginType = 'email' | 'normal';

const LoginTypeReducer = (state: string, action: LoginType): string => {
    return action;
}

export const LoginTypeContext = createContext<string>('');
export const LoginTypeDispatch = createContext<Dispatch<LoginType> | null>(null);

export const LoginTypeProvider = ({ children }: { children: ReactNode }) => {
    const [ type, dispatch ] = useReducer(LoginTypeReducer, 'email')

    return (
        <LoginTypeContext.Provider value={type}>
            <LoginTypeDispatch.Provider value={dispatch}>
                {children}
            </LoginTypeDispatch.Provider>
        </LoginTypeContext.Provider>
    );
}