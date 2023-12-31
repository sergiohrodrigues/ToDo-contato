import { contato, primeirasLetras } from '@/states/atom'
import { Dispatch, SetStateAction } from 'react'
import { styled } from 'styled-components'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { IContato } from '@/interface/IContato'

const FundoModal = styled.section<{display: string}>`
    position: fixed;
    inset: 0;
    display: ${props => props.display};
    justify-content: center;
    align-items: center;
    padding: 1rem;

    @media screen and (min-width: 768px){
        padding: 0;
    }
`

const ModalContainer = styled.div`
    width: 90%;
    max-width: 400px;
    margin: 0 auto;
    background-color: #fff;
    padding: 1rem;
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
        justify-content: center;
        gap: 0.5rem;
        button{
            border: none;
            padding: 0.5rem 1rem;
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
    @media screen and (min-width: 768px){
        padding: 2rem 2rem 0 2rem;
        .botoes{
            justify-content: flex-end;
            gap: 1rem;
            button{
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
    }
`

interface Props {
    modalDeleteOpen: boolean,
    setModalDeleteOpen: Dispatch<SetStateAction<boolean>>,
    itemSelecionado: IContato | undefined,
    setItemSelecionado: Dispatch<SetStateAction<IContato | undefined>>,
    adicionarMaisItensALista: () => void,
    ordenarPorNome: () => void
}

const ModalExcluir = ({modalDeleteOpen, setModalDeleteOpen, itemSelecionado, setItemSelecionado, adicionarMaisItensALista, ordenarPorNome}: Props) => {

    const setListaContato = useSetRecoilState(contato)
    const listaDeContatos = useRecoilValue(contato)

    const listaPrimeirasLetras = useRecoilValue(primeirasLetras)
    const setListaPrimeirasLetras = useSetRecoilState(primeirasLetras)

    function excluirContato(){
        const excluirLetra = listaPrimeirasLetras.filter(item => item !== itemSelecionado?.primeiraLetra)
        setListaPrimeirasLetras(excluirLetra)
        const novaLista = listaDeContatos.filter(itemDaLista => itemDaLista.nome !== itemSelecionado?.nome)
        setListaContato(novaLista)
        setModalDeleteOpen(false)
        setItemSelecionado(undefined)
        adicionarMaisItensALista()
        ordenarPorNome()
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