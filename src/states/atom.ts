import { IContato } from "@/interface/IContato";
import { atom } from "recoil";

export const contato = atom<IContato[]>({
    key: 'contato',
    default: []
})

export const primeirasLetras = atom<String[]>({
    key: 'primeirasLetras',
    default: []
})