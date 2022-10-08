import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function Mainpage() {
  const [quote, setQuote] = useState("");
  const [quotes, setQuotes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  let allquotes=[];

  useEffect(() => {
    const getallquotes = async ()=>{
      const {data}=await axios.get(`http://localhost:7700/api/add/getuserquotes/${id}`)
      // console.log({data});
      setQuotes({data}.data);
      allquotes={data}.data;
      console.log(allquotes)
    }
    getallquotes();
  }, []);
  const token = localStorage.getItem('token');
  const addQuote = async (e) => {
    e.preventDefault();
    const userId=id;
    const data={quote,userId};

    const res = await axios.post(`http://localhost:7700/api/add/addquote`, data,{
      headers:{
        "Authorization":`Bearer ${token}`
    },
    });
    window.location.reload(true);
    console.log(res);
  };

  const deleteQuote = async (q)=>{
    console.log(q._id)
    try{
      const response = await axios.delete(`http://localhost:7700/api/add/deletequote/${q._id}`,{
        headers:{
          "Authorization":`Bearer ${token}`
      },
      })
      window.location.reload(true);
      console.log(response);
    }
    catch(err){

    }
  }
  return (
    <div>
      <form onSubmit={addQuote}>
        <input
          placeholder="Add your quote"
          onChange={(e) => {
            setQuote(e.target.value);
          }}
        />
        <button type="submit">Add</button>
      </form>
      <div className="allquotes">
          <ul>
          {quotes? 
            quotes.map((quote)=>{
              return <div><li>{quote.quote}</li>
              <button onClick={(e)=>{
                 e.preventDefault();
                console.log(quote._id)
                deleteQuote(quote)
              }}>Delete</button><button>Update</button></div>
            }):<li>No quote</li>
          }
          </ul>
      </div>
    </div>
  );
}

export default Mainpage;
