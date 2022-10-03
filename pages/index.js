import Head from 'next/head'
import { useState } from 'react';

export default function Home() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const ops = ["/", "*", "+", "-", "."];

  const updateCalculator = value => {
    if(
      ops.includes(value) && calc === '' || 
      ops.includes(value) && ops.includes(calc.slice(-1))
      ) {
        return;
      }
    setCalc(calc + value);

    if(!ops.includes(value)) {
      try {
      setResult(eval(calc + value).toString());
      }catch(err){
        setResult("Invalid")
      }
    }
  }

  const backspace = () => {
    setCalc(calc.slice(0, calc.length - 1));
  };
  
  const resetCalculator = () => {
    setCalc("");
    setResult("");
  }

  const digitsButtons = () => {
    const digits = [];

    for(let i = 1; i < 10; i++) {
      digits.push(
        <button key={i} onClick={() => updateCalculator(i.toString())}
         className='appearance-none border-0 outline-0 
         text-gray-300 text-[20px] p-[16px] cursor-pointer transition-[0.4s] hover:opacity-[0.9] flex-2 max-w-[33.333%] bg-gray-900'>{i}</button>
      )
      
    }
    return digits;
  }

  const calculate = () => {
    try{
      setCalc(eval(calc).toString())
    }catch(err){
      setCalc("Invalid input try again!");
  }
  }

  return (
    <div>
    <div className='bg-[#cfcfcf] h-screen m-0 p-0 box-border'>
    <Head>
        <title>My Calculator</title>
        <meta name="description" content="Nextjs Calculator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className='flex min-h-[100vh] items-center justify-center p-[18px]'>
      <div className='w-[100%] max-w-[400px] bg-white rounded-[14px] overflow-hidden'>
        <div className='p-[24px] text-right bg-gray-900 text-gray-300 text-[24px] font-[500]'>
          { result ? <span className='text-[16px] px-1 text-black min-w-[324px]'>({ result })</span> : '' } {calc || "0"}
        </div>

        <div className='flex font-bold'>
            <button onClick={() => updateCalculator('/')} 
            className='appearance-none border-0 outline-0 text-gray-300 text-[20px] p-[16px] cursor-pointer transition-[0.4s] hover:opacity-[0.9] flex-1 bg-[#a91e1e]'>/</button>
            <button onClick={() => updateCalculator('*')} 
            className='appearance-none border-0 outline-0 text-gray-300 text-[20px] p-[16px] cursor-pointer transition-[0.4s] hover:bg-[#df6e6e] flex-1 bg-[#a91e1e]'>*</button>
            <button onClick={() => updateCalculator('+')} 
            className='appearance-none border-0 outline-0 text-gray-300 text-[20px] p-[16px] cursor-pointer transition-[0.4s] hover:opacity-[0.9] flex-1 bg-[#a91e1e]'>+</button>
            <button onClick={() => updateCalculator('-')} 
            className='appearance-none border-0 outline-0 text-gray-300 text-[20px] p-[16px] cursor-pointer transition-[0.4s] hover:opacity-[0.9] flex-1 bg-[#a91e1e]'>-</button>
            <button onClick={() => backspace('Del')} 
            className='appearance-none border-0 outline-0 text-gray-300 text-[20px] p-[16px] cursor-pointer transition-[0.4s] hover:opacity-[0.9] flex-1 bg-[#a91e1e]'>Del</button>
            <button onClick={() => resetCalculator()} 
            className='appearance-none border-0 outline-0 text-gray-300 text-[20px] p-[16px] cursor-pointer transition-[0.4s] hover:opacity-[0.9] flex-1 bg-[#a91e1e]'>C</button>
        </div>

        <div className='flex flex-wrap font-bold'>
          { digitsButtons() }
          <button onClick={() => updateCalculator('0')} className='appearance-none border-0 outline-0 text-gray-300 text-[20px] p-[16px] cursor-pointer transition-[0.4s] hover:opacity-[0.9] flex-2 max-w-[33.333%] bg-gray-900'>0</button>
          <button onClick={() => updateCalculator('.')} className='appearance-none border-0 outline-0 text-gray-300 text-[20px] p-[16px] cursor-pointer transition-[0.4s] hover:opacity-[0.9] flex-2 max-w-[33.333%] bg-gray-900'>.</button>
          <button onClick={() => calculate()} className='appearance-none border-0 outline-0 text-gray-300 text-[20px] p-[16px] cursor-pointer transition-[0.4s] hover:opacity-[0.9] flex-2 max-w-[33.333%] bg-gray-900'>
            =
            </button>
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}
