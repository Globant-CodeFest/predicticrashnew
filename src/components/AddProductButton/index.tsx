import formatNumber from '@/services/formatnumber'
import { Line } from '@/types'
import { ButtonsContainer, QuantityButton, ItemQuantity, ItemQuantityNumber, TotalButton, TotalText } from './styled'


interface Props {
    line: Line
    disableButton: boolean
    setQuantity: React.Dispatch<React.SetStateAction<number>>
    quantity: number
    handleAddToCart: () => void
    stock: boolean
}

const AddProductButton = ({ line, disableButton , setQuantity, quantity, handleAddToCart, stock }: Props) => {

    const handleSubstract = () => {
        quantity > 1 &&
        setQuantity((q) => q - 1)
    }
    
    const handleAdd = () => {
        setQuantity((q) => q + 1)
    }

    if(stock) return(
        <ButtonsContainer>
                <QuantityButton>
                    <ItemQuantity onClick={handleSubstract}>
                        -
                    </ItemQuantity>
                    <ItemQuantityNumber>
                        {quantity}
                    </ItemQuantityNumber>
                    <ItemQuantity onClick={handleAdd}>
                        +
                    </ItemQuantity>
                </QuantityButton>
                <TotalButton disabled={disableButton} onClick={handleAddToCart}>
                    <TotalText>
                        Agregar
                    </TotalText>
                    <TotalText>
                        $ {formatNumber(line.price * quantity)}
                    </TotalText>
                </TotalButton>
        </ButtonsContainer>
    )
    return<></>
}

export default AddProductButton