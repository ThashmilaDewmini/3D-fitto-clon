import {
    Facebook,
    Instagram,
    MailOutline,
    Phone,
    Pinterest,
    Room,
    Twitter,
  } from "@material-ui/icons";
import styled from "styled-components";
import img from './image/payment.png';  
import { Link } from "react-router-dom";
  
  const Container = styled.div`
    display: flex;
    flex-direction:row;
    justify-content: space-between;
  `;
  
  const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
  `;
  
  const Logo = styled.h1``;
  
  const Desc = styled.p`
    margin: 20px 0px;
  `;
  
  const SocialContainer = styled.div`
    display: flex;
  `;
  
  const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
  `;
  
  const Center = styled.div`
    flex: 1;
    padding: 20px;
    
  `;
  
  const Title = styled.h3`
    margin-bottom: 30px;
  `;
  
  const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  `;
  
  const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
  `;
  
  const Right = styled.div`
    flex: 1;
    padding: 20px;
    
  `;
  
  const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  `;
  
  const Payment = styled.img`
      width: 50%;
  `;
  
  const Footer = () => {
    return (
      <Container>
        <Left>
          <Logo>FitTo</Logo>
          <Desc>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don’t look even slightly believable.
          </Desc>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <Twitter />
            </SocialIcon>
            <SocialIcon color="E60023">
              <Pinterest />
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>
          <Title>Useful Links</Title>
          <List>
          <ListItem><Link to="/" style={{textDecoration: 'none', color: 'black'}}>Home</Link></ListItem>
          <ListItem><Link to="/category/c001" style={{textDecoration: 'none', color: 'black'}}>Cap & Hat</Link></ListItem>
        <ListItem><Link to="/category/c002" style={{textDecoration: 'none', color: 'black'}}>Jewelry</Link></ListItem>
        <ListItem><Link to="/category/c004" style={{textDecoration: 'none', color: 'black'}}>Sunglass</Link></ListItem>
        <ListItem><Link to="/category/c003" style={{textDecoration: 'none', color: 'black'}}>Watch</Link></ListItem>
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <Room style={{marginRight:"10px"}}/> 07 Colombo, Rathmalana.
          </ContactItem>
          <ContactItem>
            <Phone style={{marginRight:"10px"}}/> +94 7656 85834
          </ContactItem>
          <ContactItem>
            <MailOutline style={{marginRight:"10px"}} /> fitto@gmail.com
          </ContactItem>
          <Payment src={img} />
        </Right>
      </Container>
    );
  };
  
  export default Footer;