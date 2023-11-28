import { create } from "zustand";


interface Snippet {
    name: string,
    code: string
    // lang: string,
}

interface SnippetState {
    snippetsNames: string[],
    selectedSnippet: Snippet | null,
    setSnippetName: (name: string) => void,
    setSelectedSnippet: (snippet: Snippet | null) => void
    setSnippetsNames: (names: string[]) => void
}


export const useSnippetStore =  create<SnippetState>((set) => ({
    snippetsNames: [],
    selectedSnippet: null,
    setSnippetName: (name: string) => 
        set( state => ({
            snippetsNames: [...state.snippetsNames, name]
        })),
    setSelectedSnippet: (snippet) => set(_state => ({selectedSnippet: snippet})),
    setSnippetsNames: (names: string[]) => 
    set( _state => ({
        snippetsNames:  names
    }))
})) 