import { contato } from '@/states/atom'
import { Dispatch, SetStateAction, useState } from 'react'
import { styled } from 'styled-components'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { IContato } from '@/interface/IContato'

const FundoModal = styled.section<{display: string}>`
    position: fixed;
    inset: 0;
    display: ${props => props.display};
    justify-content: center;
    align-items: center;
`

const ModalContainer = styled.div`
    background-color: #fff;
    padding: 2rem 2rem 0 2rem;
    h2{
        font-weight: bold;
    }
    div{
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin: 3rem 0;
    }
    .botoes{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        gap: 1rem;
        button{
            border: none;
            padding: 0.5rem 2rem;
        }
        button:hover{
            cursor: pointer;
        }
        button:nth-child(1){
            font-weight: bold;
            color: #333333;
        }
        button:nth-child(2){
            background-color: #007DFE;
            color: #fff;
        }
    }
`

interface Props {
    modalDeleteOpen: boolean,
    setModalDeleteOpen: Dispatch<SetStateAction<boolean>>,
    itemSelecionado: IContato | undefined,
    setItemSelecionado: Dispatch<SetStateAction<IContato | undefined>>
}

const ModalExcluir = ({modalDeleteOpen, setModalDeleteOpen, itemSelecionado, setItemSelecionado}: Props) => {

    const setListaContato = useSetRecoilState(contato)
    const listaDeContatos = useRecoilValue(contato)

    function excluirContato(){
        const novaLista = listaDeContatos.filter(itemDaLista => itemDaLista !== itemSelecionado)
        setListaContato(novaLista)
        setModalDeleteOpen(false)
        setItemSelecionado(undefined)
    }

    function cancelarExcluir(){
        setModalDeleteOpen(false)
        setItemSelecionado(undefined)
    }

    return(
        <FundoModal display={modalDeleteOpen ? 'flex' : 'none'}>
            <ModalContainer>
                <h2>Excluir contato</h2>
                <div>
                    <span>Usuário: {itemSelecionado?.nome}</span>
                    <span>Telefone: {itemSelecionado?.telefone}</span>
                </div>
                <div className='botoes'>
                    <button onClick={cancelarExcluir}>CANCELAR</button>
                    <button onClick={excluirContato}>CONFIRMAR</button>
                </div>
            </ModalContainer>
        </FundoModal>
    )
}

export default ModalExcluir