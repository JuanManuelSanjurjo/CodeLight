import { create } from "zustand";

interface Config {
    dir: string,
    setDir:(directory: string) => void
}

export const useConfigStore =  create<Config>((set) => ({
    dir: "",
    setDir: (directory: string) => set(_state => ({dir: directory }))
})) 