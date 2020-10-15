import React, {
    Component,
    createContext,
    memo,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";
import {Link, Redirect, Route, useHistory, useParams} from "react-router-dom";
import CategoryClass from "./CategoryClass";

export const UpCategoryProvider = createContext({
    id: '0',
});


export function UpCategory(props) {
    const {id} = useParams();
    useEffect(() => {
        console.log(`UpCategory page mount`);
        return () => console.log(`UpCategory  UN page mount`);
    }, []);

    return (
        <UpCategoryProvider.Provider value={{id}}>
            <Route
                path={`${props.match.path}`}
                component={Category}/>
        </UpCategoryProvider.Provider>
    );
}

export function ConcreteCategory({name, changeState}) {
    // const {func} = useContext(FuncProvider)
    useEffect(() => {
        console.log(`${name} page mount`);
        setTimeout(() => {
               changeState(name)
            // func(name)
        }, 1000)
        return () => console.log(`${name}  UN page mount`);
    },);

    return <div>
        {" "}
        <h3> {name} </h3>
    </div>
};

function StateRender({state}) {
    return (<div>
        {
            Object.keys(state).map(k => k)
        }</div>)
}

let Routes = ({path, changeState}) => (<div><Route
    exact
    path={`${path}`}
    component={() => {
        return <ConcreteCategory name='Shoes' changeState={changeState}/>;
    }}
/>
    <Route
        path={`${path}/shoes`}
        component={() => <ConcreteCategory name='Shoes' changeState={changeState}/>}
    />
    <Route
        path={`${path}/boots`}
        component={() => <ConcreteCategory name='Boots' changeState={changeState}/>}
    />
    <Route
        path={`${path}/footwear`}
        component={() => <ConcreteCategory name='Footwear' changeState={changeState}/>}
    /></div>);

function Category(props) {
    const {id} = useContext(UpCategoryProvider);
    const history = useHistory();
    useEffect(() => {
        console.log('Category page mount');
        return () => console.log('Category page UN mount');
    }, [])

    const [state, setState] = useState({});
    // const funcRef = useRef((code) => setState({...state, [code]: true}));
    let changeState = useCallback((code) => {
        debugger
        setState((s)=>({...s, [code]: true}))
    },[]);

    return (
        <div>
            {id}
            <StateRender state={state}/>
            <ul>
                <li>
                    <div onClick={() => history.push(`${props.match.url}/shoes`)}>Shoes</div>

                    {/*<Link to={`${props.match.url}/shoes`}>Shoes</Link>*/}
                </li>
                <li>
                    <div onClick={() => history.push(`${props.match.url}/boots`)}>Boots</div>
                    {/*<Link to={`${props.match.url}/boots`}>Boots</Link>*/}
                </li>
                <li>
                    <div onClick={() => history.push(`${props.match.url}/footwear`)}>Footwear</div>
                    {/*<Link to={`${props.match.url}/footwear`}>Footwear</Link>*/}
                </li>
            </ul>
            {/*<FuncProvider.Provider value={{func: changeState}}>*/}
                <Routes path={props.match.path} changeState={changeState}/>
            {/*</FuncProvider.Provider>*/}

            {/* redirect */}
        </div>
    );
}

export default Category;
