import React, {Component} from 'react';

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">

                <div className="row">
                    <div className="col-1-of-2">
                        <div className="footer__navigation">
                            Contact: zlatea.alexandra@gmail.com
                        </div>
                    </div>
                    <div className="col-1-of-2">
                        <p className="footer__copyright">
                            <p class="copyright">Copyright © 2018 All rights reserved. </p>
                        </p>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;