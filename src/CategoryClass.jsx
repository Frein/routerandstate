import React, {Component, createContext, memo, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {Link, Redirect, Route, useHistory, useParams} from "react-router-dom";
import {ConcreteCategory, UpCategoryProvider} from "./Category";

function StateRender({state}) {
    return (<div>
        {
            Object.keys(state).map(k => k)
        }</div>)
}

class RouteClass extends React.Component{
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }

    render() {
        return <div><Route
            exact
            path={`${this.props.path}`}
            component={() => {
                return <ConcreteCategory name='Shoes' changeState={this.props.changeState}/>;
            }}
        />
            <Route
                path={`${this.props.path}/shoes`}
                component={() => <ConcreteCategory name='Shoes' changeState={this.props.changeState}/>}
            />
            <Route
                path={`${this.props.path}/boots`}
                component={() => <ConcreteCategory name='Boots' changeState={this.props.changeState}/>}
            />
            <Route
                path={`${this.props.path}/footwear`}
                component={() => <ConcreteCategory name='Footwear' changeState={this.props.changeState}/>}
            /></div>
    }
}

class CategoryClass extends React.Component {
constructor(props) {
    super(props);
    this.state={};
}
    changeState = (code) => this.setState({...this.state, [code]: true});

    componentDidMount() {
        console.log('Category page mount');
    }
    componentWillUnmount() {
        console.log('Category page UN mount')
    }

    render(){
        // const {id} = useContext(UpCategoryProvider);
        // const history = useHistory();
        // useEffect(() => {
        //     console.log('Category page mount');
        //     return () => console.log('Category page UN mount');
        // }, [])
        //


        return (
            <div>
                {/*{id}*/}
                <StateRender state={this.state}/>
                <ul>
                    <li>
                        <div onClick={() => this.props.history.push(`${this.props.match.url}/shoes`)}>Shoes</div>

                        {/*<Link to={`${props.match.url}/shoes`}>Shoes</Link>*/}
                    </li>
                    <li>
                        <div onClick={() => this.props.history.push(`${this.props.match.url}/boots`)}>Boots</div>
                        {/*<Link to={`${props.match.url}/boots`}>Boots</Link>*/}
                    </li>
                    <li>
                        <div onClick={() => this.props.history.push(`${this.props.match.url}/footwear`)}>Footwear</div>
                        {/*<Link to={`${props.match.url}/footwear`}>Footwear</Link>*/}
                    </li>
                </ul>
                <RouteClass changeState={this.changeState} path={this.props.match.path}/>
                {/* redirect */}
            </div>
        );
    }

}

export default CategoryClass;
