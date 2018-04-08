import React from 'react';
import { Email, Item, A, renderEmail } from 'react-html-email';

  const SendEmail = () => (
    <Email title='link'>
        <Item>
            <A style={{ paddingLeft: 10 }}>Click me!</A>
        </Item>
    </Email>
);
export default  SendEmail;

