import { contato } from '@/states/atom'
import { Dispatch, SetStateAction, useState } from 'react'
import { styled } from 'styled-components'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { mascaraTelefone } from '@/utilidades/mascara-telefone'
import InputMask from "react-input-mask";
import { IContato } from '@/interface/IContato'
import { useEffect } from 'react'

const FundoModal = styled.section<{display: string}>`
    position: fixed;
    inset: 0;
    display: ${props => props.display};
    justify-content: center;
    align-items: center;
`

const ModalContainer = styled.div`
    background-color: #fff;
    padding: 2rem;
    h2{
        font-weight: bold;
    }
    div{
        display: flex;
        justify-content: space-between;
        input{
            width: 40%;
            margin: 2rem 0 3rem 0;
            padding: 0.5rem;
            border: 1px solid lightgray;
            outline: none;
        }
    }
    .botoes{
        display: flex;
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
    modalOpen: boolean,
    setModalOpen: Dispatch<SetStateAction<boolean>>,
    itemSelecionado: IContato | undefined,
    setItemSelecionado: Dispatch<SetStateAction<IContato | undefined>>
}

const ModalAdicionarEAtualizar = ({modalOpen, setModalOpen, itemSelecionado, setItemSelecionado}: Props) => {
    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')

    useEffect(() => {
        if(itemSelecionado === undefined){
            null
        } else {
            setNome(itemSelecionado.nome)
            setTelefone(itemSelecionado.telefone)
        }
    },[itemSelecionado])

    const listaDeContato = useRecoilValue(contato)
    const setListaContato = useSetRecoilState(contato)

    function enviarContato(){
        // const nomeJaExistente = listaDeContato.some(ItemDaLista => ItemDaLista.nome.toUpperCase() === nome.toUpperCase())
        const numeroJaExistente = listaDeContato.some(ItemDaLista => ItemDaLista.telefone === telefone)

        if(numeroJaExistente){
            alert('Numero já existente, por favor adicione outro numero')
            setTelefone('')
        } else {
            if(itemSelecionado === undefined){
                if(nome === '' && telefone === ''){
                    alert('Por favor preencha todos os campos')
                } else {
                    const novoContato = {
                        nome: nome,
                        telefone: mascaraTelefone(telefone)
                    }
                    setListaContato(contatoAntigo => [...contatoAntigo, novoContato])
                    setModalOpen(false)
                    setNome('')
                    setTelefone('')
                }
            } else {
                console.log('aquilo')
                // const novoItem = itemSelecionado
                // novoItem.nome = nome
                // novoItem.telefone = telefone
                // console.log(novoItem)
                // setItemSelecionado({
                //     itemSelecionado.nome = nome,
                // })
            }
        }
    }
    
    function cancelarContato(){
        setModalOpen(false)
        setNome('')
        setTelefone('')
        setItemSelecionado(undefined)
    }

    return(
        <FundoModal display={modalOpen ? 'flex' : 'none'}>
            <ModalContainer>
                {itemSelecionado === undefined ? <h2>Adicionar contato</h2> : <h2>Atualizar contato</h2>}
                <div>
                    <input type="text" placeholder="Nome*" value={nome} onChange={e => setNome(e.target.value)}/>
                    <InputMask 
                        mask="(99) 99999-9999"
                        placeholder="Telefone*" 
                        value={telefone} 
                        onChange={(e) => setTelefone(e.target.value)}
                    />
                </div>
                <div className='botoes'>
                    <button onClick={cancelarContato}>CANCELAR</button>
                    <button onClick={enviarContato}>SALVAR</button>
                </div>
            </ModalContainer>
        </FundoModal>
    )
}

export default ModalAdicionarEAtualizar