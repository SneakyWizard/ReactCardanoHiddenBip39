import React from 'react';
import Popup from 'reactjs-popup';

export default () => (
  <Popup defaultOpen='true' modal nested >
    {close => (
      <div className="modal">
        <div className="header"> User agreement </div>
        <div className="content">
          {' '}
          &#8226; You agree that there is no internet connection while using this.<br />
          &#8226; You agree that you are solely responsible for your funds and this doesn&apos;t guarantee safety.<br />
          &#8226; You agree that there is no support for this bip39 cryptogram generator.<br />
          &#8226; You agree that you are using this free software "as is."<br />
          &#8226; You agree that you are 100% responsible and liable for your tokens.<br />
          &#8226; You agree that you should print only the cryptogram and write down the cipher key seperately.<br />
          &#8226; It is better to use a live linux such as tails linux and running this on there.&nbsp;&nbsp;With no internet.<br />
          &#8226; Becareful of printer buffers and verify your translation after you print!<br />
        </div>
        <div className="actions">
          <button className="button red-button" onClick={() => { window.location = 'about:blank' }}>NO</button>
		&nbsp;
		&nbsp;
          <button className="button" onClick={() => { close(); }}>YES</button>
        </div>
      </div>
    )}
  </Popup>
);
