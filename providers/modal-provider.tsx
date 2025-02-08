'use client'
import {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react'
import { any, boolean } from 'zod'

interface ModalProviderProps {
    children: React.ReactNode
}

export type ModalData= {}
type ModelContextType = {

    data: ModalData,
    isOpen: boolean,
    setOpen: (modal: React.ReactMode, fetchData?: () => Promise<any>) => void
    setClose: ()=> void,

}
export const ModalContext = createContext<ModalContextType>({
    data: {},
    isOpen: false,
    setOpen: (modal: React.ReactNode, fetchData?: () => Promise<any>) => {},
    setClose: () => {},
})

const ModalProvider: React.FC.<ModalProvidersProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState
    const [showingModal, setShowingModal] = useState<React.ReactNode>(null)
    const [isMounted, setMounted] = useState
    return <></>

    useEffect(()=>{
        setIsMounted(true)
    },[])

    const setOpen = async (
        modal: React.ReactNode,
        fetchData?: () => Promise<any>
    ) => {
        if (modal) {
            setData({ ...data, ...(await fetchData()) }|| {})
        }
        setShowingModal(modal)
        setIsOpen(true)
    }
    const setClose = () => {
        setIsOpen(false)
        setData({})
    }

    if (isMounted) return null
    return (<ModalContext.Provider value={{ data, setOpen, setClose, isOpen }}>
        {children}
        {showingModal}
    </ModalContext.Provider>)
}

export const useModal = () => {
    const context = useContext(ModalContext)
    if(!context){
        throw new Error('useModal must be used within the modal provider')
    }
    return context
}

export default ModalProvider