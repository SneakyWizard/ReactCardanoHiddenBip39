
/*
	https://travis-ci.org/i-like-robots/react-tags
	npm install --save react-tag-autocomplete
*/

import Popup       from "./Components/Modal.js";
import Front       from "./Components/Front.js";
import ReactTags   from 'react-tag-autocomplete'
import SecretTable from "./Components/Table.js";

import React, { useState, useEffect, useRef } from 'react';
import { Container, Header }                  from 'semantic-ui-react'

import 'reactjs-popup/dist/index.css';
import './css/App.css';
import './css/Grid.css';
import './css/Modal.css';

const bip39 = require('bip39');
const data  = bip39.wordlists.EN;
const max   = 24;

function App() {

	const reactTags                               = useRef();
	const [ next, setNext ]                       = useState(0);
	const [ tags, setTags ]                       = useState([]);
	const [ suggestions, setSuggestions ]         = useState([]);
	const [ placeholderText, setplaceHolderText ] = useState('ENTER BIP39 WORDS');

	useEffect( () => { 
		set_add_bip39();
	}, [] );

	// Builds the necessary ref structure for react-tags.
	function set_add_bip39() {

		let count    = 0;
		let data_ref = [];

		for ( let d in data ) {
			let name    = data[ d ]; 	
			let ref     = {};
			ref['id']   = count++;
			ref['name'] = name;
			count++;
			data_ref.push( ref );
		}

		// New suggestions that are only bip39 based.
		setSuggestions( data_ref );

	}

	// Remove a word.
	function del( i ) {
		tags.splice( i, 1 );
		setTags( tags );
		nextTable( { l: tags.length } );
	}

	// Add a word.  Not allowing dups.
	function add( tag ) {
		if ( Number( tags.indexOf( tag ) ) === -1 ) { 
			tags.push( tag );
			setTags( tags );
			nextTable( { l: tags.length } );
		}
	}

	// Move to the cipher text table.
	function nextTable( args ) {

		args = args || [];

		let l = args['l'];

		if ( l === max ) {
			setNext( 1 );
		}
	}

	// Input before the table render.  Also includes a simple semantic-ui layout.
	function tagInput() {
		return (
			<>
				<Popup />
				<div style={{ display:"flex", minHeight:"100vh", flexDirection:"column" }}>
					<div style={{ flex:1 }}>
						<Container text>
							<Header as='h3'>&nbsp;</Header>
							<Header as='h1' className='word-space'>BIP39 CRYPTOGRAM GENERATOR</Header>
							<Front />
							<ReactTags ref={reactTags} tags={tags} suggestions={suggestions} placeholderText={placeholderText} onDelete={del} onAddition={add} />
						</Container>
					</div>
					<span><small><i><b>Version 1.0.1</b></i></small></span>
				</div>
			</>
		)
	}

	// The secret word table.
	function displayTable() { 
		return ( 
			<>
				<SecretTable secret_words={tags} />
			</>
		)
	}

	// Content switching.
	return (
		<div className="App">
			{next ? displayTable() : tagInput()}
		</div>
	);
}

export default App;
