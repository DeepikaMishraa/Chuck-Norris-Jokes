import React,{useState,useEffect} from 'react';
import './App.css';
import Jokes from './Jokes';

function App() {
  const[category,setCategory]=useState([])
  const[joke,setJoke]=useState([])
  const[cat,setCat]=useState("")
 // const[darkMode,setDarkMode]=useState(true)
 
   
  const fetchCategory= async ()=> {
    const response=await fetch("https://api.chucknorris.io/jokes/categories")
    const category=await response.json()
    setCategory(category);
  }

  useEffect(()=>{
    fetchCategory();
  },[])



  const fetchJoke = async () => {
    if(cat===""){
    const response=await fetch("https://api.chucknorris.io/jokes/random")
    const joke=await response.json()  
    setJoke(joke);
    }
    else{
      let url="https://api.chucknorris.io/jokes/random?category="+cat;
  
      const response=await fetch(url)
      const joke=await response.json()  
      setJoke(joke);
    }
  }




  useEffect(()=>{
    fetchJoke();
  },[cat])
  
 const handleChange=(e)=>{
  console.log(e.target.value)
  setCat(e.target.value)
  console.log("Category is "+cat)
 }


  return (
    <main>
        
        <center><img  alt='Chuck Norris Image' src='https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png' align='centre' height='145px'></img></center>
        <center><select  className='drop-down' onChange={(e)=>handleChange(e)}>{category.map((items)=><option className='option'>{items}</option>)}</select></center>
        <Jokes joke={joke} name="mario" />
        
  </main>
  );
}

export default App;
