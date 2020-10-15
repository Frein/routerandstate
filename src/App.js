import React, {Component} from "react";
import {Redirect, Link, Route, Switch} from "react-router-dom";
import Category, {UpCategory} from "./Category";
import Products from "./Products";
import Login, {fakeAuth} from "./Login";

class App extends Component {
    constructor(props) {
        super(props);
        console.log("app constructor");
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar">
                    <ul className="nav">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/category/123">Category123</Link>
                        </li>
                        <li>
                            <Link to="/category/456">Category456</Link>
                        </li>
                        <li>
                            <Link to="/products">Products</Link>
                        </li>
                        <li>
                            <Link to="/admin">Admin area</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route exact path="/" component={Home}/>
                    <Route path="/category/:id" component={UpCategory}/>
                    <PrivateRoute path="/admin" component={Admin}/>
                    <Route path="/products" component={Products}/>
                </Switch>
            </div>
        );
    }
}

//Private router function
const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props =>
                fakeAuth.isAuthenticated === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{pathname: "/login", state: {from: props.location}}}
                    />
                )
            }
        />
    );
};

//Home component
const Home = props => (
    <div>
        <h2>Home {console.log(props)}</h2>
    </div>
);

//Admin component
const Admin = ({match}) => {
    return (
        <div>
            {" "}
            <h2>Welcome admin </h2>
        </div>
    );
};

export default App;
