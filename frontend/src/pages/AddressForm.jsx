import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setItem } from "../redux/localStorage";
import "../styles/addressform.css";
import axios from "axios"
// import {Link} from 'react-router-dom'

let initial ={
  name:"",
  mobile:"",
  pincode:"",
  city:"",
  state:""
}

const AddressForm = () => {
  const [type, setType] = useState("");
  const [city,setCity] = useState("")
  const [state,setState] = useState("")
  const [formData, setFormData] = useState(initial);
  const navigate = useNavigate()
  const handleAddress = (e) => {
    console.log(e.target.className);
    let targeted1 = document.getElementsByClassName("home type");
    let targeted2 = document.getElementsByClassName("office type");
    setType(e.target.className);
    if (e.target.className === "home type") {
      targeted1[0].style.backgroundColor = "rgb(251, 208, 190)";
      targeted1[0].style.borderColor = "rgb(253, 122, 70)"
      targeted1[0].style.color = "rgb(253, 122, 70)"
      targeted2[0].style.backgroundColor = "white";
      targeted2[0].style.borderColor = "black"
      targeted2[0].style.color = "black"

    } else {
      targeted1[0].style.backgroundColor = "white";
      targeted1[0].style.borderColor = "black"
      targeted1[0].style.color = "black"
      targeted2[0].style.backgroundColor = "rgb(251, 208, 190)";
      targeted2[0].style.borderColor = "rgb(253, 122, 70)"
      targeted2[0].style.color = "rgb(253, 122, 70)"
    }
  };


  const getPinCodeInfo = async() => {
    let query = document.querySelector("#pin").value
    console.log(query)
    try{
      const data = await axios.get(`https://api.postalpincode.in/pincode/${query}`)
      if(query.length !== 6){
        setCity("")
        setState("")
      }else{
        setCity(data.data[0].PostOffice[0].Block)
        setState(data.data[0].PostOffice[0].State)
      }
    }catch(err){
      
    }
  }

  // getPinCodeInfo()

  console.log(type);
  const handleChange = (e) => {
    e.preventDefault()
    const {name,value} = e.target
    setFormData({...formData,[name]:value})
    console.log(formData)
  }
  let id;
  function debounce(func,delay){
    if(id){
        clearTimeout(id);
    }
    id=setTimeout(function(){
        func();
    },delay);
}


let address = formData
  const handleSubmit=(e) => {
    e.preventDefault()
    address = {...formData,"type":type}
    setItem("address",JSON.stringify(address))
    console.log(address)
    navigate("/checkout")
  }

  return (
    <>
      <Box className="addressbox">
        <Text fontSize="17px" fontWeight={"600"}>
          ADD NEW ADDRESS
        </Text>
        <div className="line1"></div>
        <Text fontSize="16px" fontWeight={"600"} textAlign="left" ml={"5vw"} mt="30px">
          Contact
        </Text>
        <form action="onSubmit" onSubmit={handleSubmit}>

        <Box className="contactInfo">
          <div className="myfloat">
            <input type="text" placeholder=" " required onChange={handleChange}  name="name"/>
            <label>Name</label>
          </div>
          <div className="myfloat">
            <input type="number" placeholder=" " required onChange={handleChange} name="mobile"/>
            <label>Mobile</label>
          </div>
        </Box>
        <Box className="divider"></Box>
        <Text fontSize="16px" fontWeight={"600"} textAlign="left" ml={"5vw"} mt="3vh">
          Address
        </Text>
        <Box className="addressInfo">
          <Box className="addresspin">
            <div className="myfloat">
              <input type="number" placeholder=" " id="pin" required onChange={getPinCodeInfo} name="pincode" oninput="debounce(main,200)" />
              <label>Pincode</label>
            </div>
            <div className="myfloat">
              <input type="text" placeholder=" " required  name="city" disabled value={city} />
              <label>City</label>
            </div>
            <div className="myfloat">
              <input type="text" placeholder=" " required  name="state" value={state} disabled />
              <label>State</label>
            </div>
          </Box>
          <Box className="detailedaddress">
            <div className="myfloat addressfield">
              <input type="text" placeholder=" " required onChange={handleChange} name="address" />
              <label>Address</label>
            </div>
          </Box>
          <Text fontSize="16px" fontWeight={"600"} textAlign="left" ml={"5vw"} mt="3vh">Type of Address</Text>
          <Box className="typesof" required>
            <div className="home type" onClick={handleAddress}>
              Home
            </div>
            <div className="office type" onClick={handleAddress}>
              Office
            </div>
          </Box>
          <Box className="lastbuttons">
            <Link to="/cart"><button className="lastbtn">Back</button></Link>
            <button className="lastbtn shipbtn" type="submit" >Ship to this Address</button>
          </Box>
        </Box>
        </form>
      </Box>
    </>
  );
};

export default AddressForm;
