import React, {Component} from 'react';

class Footer extends Component {
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
                        <div className="footer__copyright">
                            <div className="copyright">Copyright © 2018 - 2020 All rights reserved. </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;