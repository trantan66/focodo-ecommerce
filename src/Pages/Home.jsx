import { Link } from "react-router-dom";

export default function Home(){
    return(
        <div>
            <p>this is HomePage</p>
            <Link className="underline mr-20" to="/product" >to product</Link>
            <Link className="underline" to="/login" >to login</Link>
        </div>
    )
}