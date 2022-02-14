import React,{useState,useEffect} from 'react';
import './css/Account.css';
import Search from './Search';

export default function AccountSearch() {
    const [keyword,setKeyword] = useState("")
    useEffect(()=>{
        if (keyword.length==0){
            console.log('아직 입력 안함.')
        }else if(keyword.length<4){
            console.log('4글자 이하입니다.')
        }else{
            console.log('4글자 이상입니다.')
        }
    },[keyword])
    return (
        <div>
            <Search setKeyword={setKeyword}/>
        </div>
    );
}
