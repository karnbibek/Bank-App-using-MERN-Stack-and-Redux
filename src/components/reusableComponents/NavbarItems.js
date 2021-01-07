import React from 'react';
import { Link } from 'react-router-dom';

class NavbarItems extends React.Component {

    render() {
        const {destination, displayText} = this.props;
        return (
            <div className="ui item">
                <Link to={`/${destination}`}>{displayText}</Link>
            </div>
        );
    }
}

export default NavbarItems;