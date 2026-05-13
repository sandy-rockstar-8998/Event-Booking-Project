import React from "react";
function Footer(){
    return(
        <footer className="bg-dark text-light pt-4 pb-2">
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <h5> Online Event Booking </h5>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit, cum. 
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum necessitatibus laudantium, 
                        ullam consequuntur commodi numquam!</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-light text-decoration-none">Home</a></li>
                            <li><a href="#" className="text-light text-decoration-none">Contact</a></li>
                            <li><a href="#" className="text-light text-decoration-none">Service</a></li>
                            <li><a href="#" className="text-light text-decoration-none">Login</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5>Contact</h5>
                        <p>Email : sandy_official@gmail.com</p>
                        <p>Phone : +91 9384254312</p>
                    </div>
                </div>
                <hr className="bg-light"/>
                <div className="text-center">
                    <p>@ 2026 Sandy Official Website. All Rights Reserved.</p>
                </div>                
            </div>
        </footer>
    )
}
export default Footer;
