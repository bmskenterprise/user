import {useEffect} from 'react';
import Slider from "react-slick"
import {useAPI} from '../contexts/APIContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default () =>{
  const {fetchSlideImages,slideImages} = useAPI()
  useEffect(()=>{fetchSlideImages()},[])
  
  let settings = {
    dots: true,//speed:500
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  
  return <Slider {...settings}>{slideImages?.map((link,i)=> <div key={i} style={{width:'100%',height:'auto'}}><img style={{width:'100%',height:'auto'}} src={link}/></div>)}</Slider>
};