import { contato, primeirasLetras } from '@/states/atom'
import { Dispatch, SetStateAction, useState } from 'react'
import { styled } from 'styled-components'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { mascaraTelefone } from '@/utilidades/mascaraTelefone'
import InputMask from "react-input-mask";
import { IContato } from '@/interface/IContato'
import { useEffect } from 'react'
import { BackgroundCorPrimeiraLetra } from '@/utilidades/BackgroundCorPrimeiraLetra'

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
    background-color: #fff;
    padding: 1rem;
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
        justify-content: center;
        gap: 0.5rem;
        button{
            border: none;
            padding: 0.5rem 2rem;
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
        width: 738px;
        padding: 2rem;
        div{
            justify-content: space-between;
        }
        .botoes{
            justify-content: flex-end;
            gap: 1rem;
            button:hover{
                cursor: pointer;
            }
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
    const [letra, setLetra] = useState('')

    useEffect(() => {
        if(itemSelecionado === undefined){
            setNome('')
            setTelefone('')
        } else {
            setNome(itemSelecionado.nome)
            setTelefone(itemSelecionado.telefone)
        }
    },[itemSelecionado])

    const setListaContato = useSetRecoilState<IContato[]>(contato)
    const setPrimeirasLetras = useSetRecoilState<String[]>(primeirasLetras)

    function verificaCriarOuAtualizar(){
        // const nomeJaExistente = listaDeContato.some(itemDaLista => itemDaLista.nome.toUpperCase() === nome.toUpperCase())
        // const numeroJaExistente = listaDeContato.some(ItemDaLista => ItemDaLista.telefone === telefone)

        if(itemSelecionado === undefined){
            criarContato()
        } else {
            atualizarContato()
        }
    }

    const listaPrimeirasLetras = useRecoilValue(primeirasLetras)

    function criarContato(){
        if(nome === '' && telefone.length < 10){
            alert('Por favor preencha os campos corretamente')
        } else {
            const letraJaAdicionada = listaPrimeirasLetras.some(letraLista => letraLista.toUpperCase() === letra.toUpperCase())
            const novoContato = {
                nome: nome,
                telefone: mascaraTelefone(telefone),
                primeiraLetra: letraJaAdicionada ? '' : letra,
                cor: BackgroundCorPrimeiraLetra()
            }
            setListaContato(contatoAntigo => [...contatoAntigo, novoContato])
            setModalOpen(false)
            setNome('')
            setTelefone('')
            setPrimeirasLetras(letraAntiga => [...letraAntiga, letra])
        }
        setLetra('')
    }

    function atualizarContato(){
        const itemAtualizado = {
            ...itemSelecionado as IContato
        }
        
        if(nome === '' || telefone === ''){
            alert('Por favor preencha todos os campos')
        } else {
            itemAtualizado.nome = nome
            itemAtualizado.telefone = telefone

            setListaContato(listaAntiga => {
                const itemAtual = listaAntiga.findIndex(evt => evt.nome === itemSelecionado?.nome)
                return [...listaAntiga.slice(0, itemAtual), itemAtualizado, ...listaAntiga.slice(itemAtual + 1)]
            })

            setModalOpen(false)
            setItemSelecionado(undefined)
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
                    <input type="text" placeholder="Nome*" value={nome} onChange={(e) => {
                        setNome(e.target.value)
                        setLetra(nome.substr(0,1))
                    }}/>
                    <InputMask 
                        mask="(99) 99999-9999"
                        placeholder="Telefone*" 
                        value={telefone} 
                        onChange={(e) => setTelefone(e.target.value)}
                    />
                </div>
                <div className='botoes'>
                    <button onClick={cancelarContato}>CANCELAR</button>
                    <button onClick={verificaCriarOuAtualizar}>SALVAR</button>
                </div>
            </ModalContainer>
        </FundoModal>
    )
}

export default ModalAdicionarEAtualizar