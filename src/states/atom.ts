import { IContato } from "@/interface/IContato";
import { atom } from "recoil";

export const contato = atom<IContato[]>({
    key: 'contato',
    default: []
})