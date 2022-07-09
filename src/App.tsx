import React, {ChangeEventHandler, useState} from "react";

const SubComponentA = ()=>{
    console.log("SubComponentA が描画された")
    return <div>
        a
    </div>
}

const SubComponentB = React.memo((props:{callback:(s:string)=>number})=>{
    console.log("SubComponentB が描画された")
    const [value,setValue] = useState('');
    const handleInput:ChangeEventHandler<HTMLInputElement> = (e)=>{
        setValue(e.target.value)
    }
    return <div style={{
        border:"solid 1px #000"
    }}>
        b
        <div><input onChange={handleInput}/></div>
        <div>{props.callback(value)}</div>
    </div>
})

const App = ()=>{
    console.log("App が描画された")
    const [value,setValue] = useState('');
    const handleInput:ChangeEventHandler<HTMLInputElement> = (e)=>{
        setValue(e.target.value)
    }

    const handleCount = React.useCallback((s:string)=>{
        return s.length
    },[])

    return <>
        parent
        <div>{value}</div>
        <div><input onChange={handleInput}/></div>
        <SubComponentA/>
        <SubComponentB callback={handleCount}/>
    </>
}

export default App