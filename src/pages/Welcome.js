import React from 'react';

class Welcome extends React.Component {

    render() {
        return (
            <div style={{ margin: "20px", textAlign: "center" }}>
                <h2>Welcome to React Bank.</h2>
                <img src="https://cdn.pixabay.com/photo/2018/02/27/06/30/skyscraper-3184798_960_720.jpg" style={{ maxWidth: "333px" }} alt="bank" ></img>
                <p>A large national bank with over 16,000 ATMs across the country, Bank of America is a trusted name in finance. Its financial services are basic, and you're not going to get any crazy high rates on your savings accounts. But, it offers great technology and savings tools to its customers.

                What we like: If Bank of America notices a suspicious transaction, it will send you a notification right away so that you can verify or decline it. You will then have up to 60 days to do so. You can easily link your Merrill Lynch brokerage account to the mobile app and even view that info directly from the accounts tab. In the AmeriDeals section, you'll find local cash-back opportunities, which can be a fun way to earn rewards while en route, such as during your morning or evening commute.

                What we don't like: While the functionality is all there, the appearance of the app is nothing to write home about. Make sure to mind your balance, too, as you need to maintain a monthly account minimum if you want to avoid the monthly maintenance fee of $14, and you can be hit with a $35 overdraft fee up to four times a day if you're not careful.</p>
            </div>
        );
    }
}

export default Welcome;