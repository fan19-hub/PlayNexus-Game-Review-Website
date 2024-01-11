
import {NavLink, useParams} from "react-router-dom";
import { Link, useNavigate } from "react-router-dom"
import { useState, useMemo, useCallback, useEffect, useRef} from 'react';
import { Col, Dropdown, Form, Image, Row } from 'react-bootstrap';
import DataListInput from 'react-datalist-input';
import api from '../../api/axiosConfig'; 
import 'react-datalist-input/dist/styles.css'
import Header from "../header/Header";
import "./search.css"

const Search = () => {
    const [keywords, setKeywords] = useState("");
    const initialkeywords = useParams().initialkeywords;
    const revText = useRef();
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
    const [minPrice,setMinPrice]=useState();
    const [maxPrice,setMaxPrice]=useState();
    const [checkedLinux,setcheckedLinux]=useState(0);
    const [checkedWindows,setcheckedWindows]=useState(0);
    const [checkedMac,setcheckedMac]=useState(0);
    const [serachRes,setserachRes]=useState();
    const [purchase_enable, setPurchase_enable] = useState(0);
    const [languages, setLanguages] = useState(0);
    const [sortbyprice, setSortbyprice] = useState(0);
  
    const options = [
        { name: 'MineCraft' },
        { name: 'Star War' },
        { name: 'GTA' },
        { name: 'One Piece' },
        { name: 'It Takes Two' },
        { name: 'OverCooked' }
      ];   

    const options1 = [
        { name: 'Chinese' },
        { name: 'English' },
        { name: 'Franch' },
        { name: 'Spanish' }
      ];  

    function searchInput(event){
        if (event.key === 'Enter') {
            navigate(`/search/${keywords}`);
            getsearch()
            console.log(keywords);
        }
    }
    const onSelectHistory = useCallback((selectedItem) => {   // The onSelect callback function is called if the user selects one option out of the search history.
        
        console.log('selectedItem', selectedItem);
        setKeywords(selectedItem.value)
        
      }, []);
    
    const onSelectLanguage = useCallback((selectedItem) => {   // The onSelect callback function is called if the user selects one option out of the search history.
        
        console.log('selectedItem', selectedItem);
        setLanguages(selectedItem.value)
        
      }, []);

    const searchHistory = useMemo(
        () =>
          options.map((option) => ({
            id: option.name,
            value: option.name,
          })),
        [],
      );

      const languageOptions = useMemo(
        () =>
          options1.map((option) => ({
            id: option.name,
            value: option.name,
          })),
        [],
      );


      const onMinPriceChange=(e)=>{
        
        if(e.target.value>=0){
            setMinPrice(e.target.value);
        }
        else{
            setMinPrice("0");
        }
        
      };
      const onMaxPriceChange=(e)=>{
        if(e.target.value>=0){
            setMaxPrice(e.target.value);
        }
        else{
            setMaxPrice("0");
        }
        
      };



      const getsearch=async()=>{
        
        var response;
        if(keywords==""){
          response = await api.post('/ad_search', {"term":initialkeywords,"min_price":minPrice,"max_price":maxPrice,"platformLinux":checkedLinux,"platformMac":checkedMac,"platformWindows":checkedWindows,"purchase_enable":0,"support_language":languages,"orderbyprice":sortbyprice,"orderbyrecom":!sortbyprice}); 
        }
        else{
          response = await api.post('/ad_search', {"term":keywords,"min_price":minPrice,"max_price":maxPrice,"platformLinux":checkedLinux,"platformMac":checkedMac,"platformWindows":checkedWindows,"purchase_enable":0,"support_language":languages,"orderbyprice":sortbyprice,"orderbyrecom":!sortbyprice});
        }
        
        if("msg" in response.data){
          setserachRes([]); 
        }  
        else{
          setserachRes(response.data); 
          debugger
        }      
      }

      const pageInitial=()=>{
        setKeywords(initialkeywords);
        getsearch();
      }

    useEffect(() => {pageInitial();},[]);
    return(
        <div>
            <Header/>
            <div className="search_board_container">
            <section className="search_board">
                <section className="left_half">
                    <section className="serach_bar_container">
                    <DataListInput className="search-bar" placeholder="Search games!" items={searchHistory}  onSelect={onSelectHistory} onKeyDown={searchInput} onChange={(e) => setKeywords(e.target.value)} />
                    </section>
                    <section className="search_res_list">
                    {serachRes?.map((game) => (
                      <div style={{"display":"flex","flex-direction":"column"}}>
                          <div className="search_res_item">
                            {(game.PosterImage && game.PosterImage.includes("http"))?
                            <img className="search_res_img" src={game.PosterImage} alt="" />
                            :
                            <img className="search_res_img" src={"https://th.bing.com/th/id/OIP.kgfkdioyvqIrLPdA5bXckAHaE8"} alt="" />
                            }
                            <a href={`/Reviews/${game.GameID}`} className="searchresitem">{game.GameName}</a>
                          </div>
                            <hr style={{"width":"70vw"}}/>
                      </div>      
                    ))}
                     </section>
                </section>
                <section className="right_half">
                    <button className="filter_button" onClick={getsearch}>Start Filtering</button>
                    <section className="price_filter">
                        <h6 style={{"textAlign":"left","background-color":"grey","padding":"2px"}}>Price Range</h6>
                        <div className="price_range">
                            <Form.Control type="number" style={{"width":"100px","height":"30px"}} value={minPrice} onChange={onMinPriceChange} />
                            <div style={{"margin":"10px"}}> ——— </div>
                            <Form.Control type="number" style={{"width":"100px","height":"30px"}} value={maxPrice} onChange={onMaxPriceChange} />
                        </div>
                        <hr/>
                        <div ><input type="checkbox" checked={0} onChange={(e)=>{setSortbyprice(!sortbyprice);}}/>{sortbyprice? <span>Sorted by Price</span> : <span>Sorted by Recommends</span>}</div>
                    </section>
                    
                    <section className="other_filter" style={{"margin-top":"10px"}}>
 
                            <div style={{"float":"left"}}><input type="checkbox" checked={checkedWindows} onChange={(e)=>{setcheckedWindows(!checkedWindows);}}/>Platform Windows</div>
                            <div style={{"float":"left"}}><input type="checkbox" checked={checkedLinux} onChange={(e)=>{setcheckedLinux(!checkedLinux);}}/>Platform Linux</div>
                            <div style={{"float":"left"}}><input type="checkbox" checked={checkedMac} onChange={(e)=>{setcheckedMac(!checkedMac);}}/>Platform Mac</div>
                            <div style={{"float":"left"}}><input type="checkbox" checked={purchase_enable} onChange={(e)=>{setPurchase_enable(!purchase_enable);}}/>Purchase Available</div>
                            <DataListInput className="languageSelect" placeholder="supported languages" items={languageOptions}  onSelect={onSelectLanguage} />
                          
                    </section>
                </section>
            </section>
            
            </div>

        </div>
    );
}

export default Search;