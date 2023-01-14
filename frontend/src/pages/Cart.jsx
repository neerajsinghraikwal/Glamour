import { Box, Button, Image, Img, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  deleteCartItem,
  getCartDetails,
  updateQuantity,
} from "../redux/cart/action";
import { useDispatch, useSelector } from "react-redux";
import "../styles/cart.css";
import { Link } from "react-router-dom";
import { getItem } from "../redux/localStorage";
import deleteicon from "../Images/deleteicon.jpg" 

const Cart = () => {
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((Store) => Store.cart);
  const token = getItem("token");
  const totalCartItems = data.cartData.length;

  let cartDetails = data.cartData;
  const id = getItem("userid");
  const findTotal = (cartDetails) => {
    let total = 0;
    let data = cartDetails.map((el) => {
      total = total + el.quantity * el.price;
    });
    return total;
  };

  let total = (findTotal(cartDetails)).toFixed(2);

  const handleInc = (idd, quantity) => {
    dispatch(updateQuantity(idd, quantity + 1));
    setFlag(!flag);
  };

  const handleDec = (idd, quantity) => {
    dispatch(updateQuantity(idd, quantity - 1));
    setFlag(!flag);     
  };
  console.log("cart",cartDetails)
  
  const handleRemove = (idd) => {
    dispatch(deleteCartItem(idd));
    setFlag(!flag);
  };

  useEffect(() => {
    dispatch(getCartDetails(id, token));
  }, [flag,dispatch]);

  return +totalCartItems === 0 ? (
    <Box h="400px">
      <Text textAlign={"center"} mt="20vh">
        Oops! Your bag is empty!
      </Text>
      <Box
        display="flex"
        justifyContent={"center"}
        alignItems="center"
        mt={"20px"}
      >
        <Image src="https://res.cloudinary.com/dcmmvm9mf/image/upload/v1671372251/olximages/img-empty-shopping-cart_zijcie.png"></Image>
      </Box>
    </Box>
  ) : (
    <>
      <div className="outerbox">
        <h1>Bag</h1>
        <div className="productsOuter">
          {cartDetails?.map((el, i) => {
            return (
              <div className="singleProduct" key={el._id}>
                <div className="Imgdiv">
                  <img src={el.image_link} alt="default" />
                </div>
                <div className="detailsdiv">
                  <div className="productname">
                    <Text fontSize={{ base: "20px", md: "25px", lg: "28px" }}>
                      {el.name}
                    </Text>
                  </div>
                  <div className="productprice">
                    <Text fontSize={{ base: "20px", md: "25px", lg: "28px" }}>
                      ${el.price}
                    </Text>
                  </div>
                  <div className="counter">
                    <button
                      className="counterbtn"
                      onClick={() => handleDec(el._id, el.quantity)}
                      disabled={+el.quantity === 1}
                    >
                      -
                    </button>
                    <Text
                      className="countText"
                      fontSize={["16px", "16px", "20px"]}
                    >
                      {el.quantity}
                    </Text>
                    <button
                      className="counterbtn"
                      disabled={+el.quantity === 10}
                      onClick={() => handleInc(el._id, el.quantity)}
                    >
                      +
                    </button>
                  </div>
                  <div className="removeproduct">
                    <img src={deleteicon} alt="" className="removebtn"
                      onClick={() => handleRemove(el._id)}>
                    </img>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Box
        w="100vw"
        mt={"30px"}
        border="1px solid transparent"
        h={"50px"}
        fontSize={["15px", "20px", "21px", "21px"]}
        pl={"60vw"}
        alignItems="center"
        bgColor={"whitesmoke"}
        pt="7px"
        fontWeight={"bold"}
      >
        {`GRAND TOTAL: $${total}`}
      </Box>
      <Link to={"/addressform"}>
        <Button
          colorScheme={"black"}
          bgColor="black"
          color={"white"}
          fontSize={["15px", "22px", "24px"]}
          borderRadius="0%"
          display={"block"}
          m={"auto"}
          mt="30px"
          w={["60vw", "55vw", "40vw", "35vw", "25vw", "25vw"]}
          h={["25px", "40px", "40px"]}
        >
          PROCEED TO CHECKOUT
        </Button>
      </Link>
    </>
  );
};

export default Cart;
