import { IContato } from "@/interface/IContato";
import { atom } from "recoil";

export const contato = atom<IContato[]>({
    key: 'contato',
    default: [
        {
            nome: 'Sergio',
            telefone: '(43)99834-3648'
        },
        {
            nome: 'Dety',
            telefone: '(43)99834-3648'
        },
        {
            nome: 'Sergio Rodrigues',
            telefone: '(43)99834-3648'
        },
        {
            nome: 'Erik',
            telefone: '(43)99834-3648'
        },
        {
            nome: 'Helo',
            telefone: '(43)99834-3648'
        },
]
})