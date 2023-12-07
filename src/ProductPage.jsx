
import styled from "styled-components";
import { useStateValue } from "./StateProvider";
import { Link } from 'react-router-dom';


const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  flex-direction: column;
  margin: 5px;
  min-width: 280px;
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &:hover{
    border:1px solid black;
  }
`;

const Image = styled.img`
  flex:2;
  margin-top:30px;
  height: 250px;
  width: 250px;
  z-index: 2;
`;
const TextContainer = styled.div`
  flex:1
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-item: center;
  height: 250px;
  width: 250px;
`
const Price = styled.p`
  color:red;
  margin-right:20px;
`
const Text = styled.p`
`
const Below = styled.div`
  display: flex;
  flex-direction:row;
  align-items: center;
  
`
const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

function Product({ item }) {

  const [{ basket }, dispatch] = useStateValue();
  console.log("this is a basket>>", basket);
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: item.id,
        title: item.title,
        image: item.img,
        price: item.price,
      },
    });
  };
  
  
  return (
    <Container>
      <Link key={item.id} to={`/product/${item?.id}`} style={{textDecoration: 'none', color: 'black'}}>
      <Image src={item?.img} />
      
      </Link>
      
      <TextContainer>
      <Text>{item?.title}</Text>
      
      <Below>
      <Price>{item?.price}$</Price>
      <button onClick={addToBasket} >ADD TO BUCKET</button>
      </Below>
      
      </TextContainer>
    </Container>
  );
}

export default Product;
