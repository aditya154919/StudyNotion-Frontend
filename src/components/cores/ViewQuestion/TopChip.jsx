import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { getTag } from '../../../Services/operations/QuestionApi';

const TopChip = () => {
  const [topics,setTopics] = useState([]);

  useEffect(()=>{
    (async ()=>{
       const result = await getTag();
       setTopics(result);
    })();
  },[])
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {topics.map((item) => (
        <button
          key={item}
          className="px-5 py-2 rounded-full bg-[#1b1b1b] hover:bg-[#252525] cursor-pointer"
        >
          {item}
        </button>
      ))}
    </div>
  )
}

export default TopChip
