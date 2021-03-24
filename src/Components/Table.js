import '../css/App.css';
import CipherGenerator     from '../CipherGenerator.js';
import React, { useState } from 'react';
import { Container, Header, List, Checkbox, Table, Icon } from "semantic-ui-react";

const letter_map = { 1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'E', 6: 'F', 7: 'G', 8: 'H', 9: 'I', 10: 'J', 11: 'K', 12: 'L' };
const header     = [ 'ℐ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L' ];
const Cipher     = new CipherGenerator();

var cache = {};

// Convert the tags into a secret words array from props.
function set_secret_array( args ) { 

	const secret_words = args['secret_words'];

	let result = [];

	for ( let x in secret_words ) { 
		let tag = secret_words[ x ].name;
		result.push( tag );
	}

	return result;
}

// Semantic-ui-react table that is the cipher text.
function SecretTable( args ) {

	let secret_words = args['secret_words'];

	secret_words = set_secret_array( { secret_words: secret_words } );

	const [ mapHidden, setMapHidden ] = useState( true );
	const [ mapSecret, setMapSecret ] = useState( true );

	let map_keys = cache['map_keys'] ? cache['map_keys'] : [];
	let map_key  = cache['map_key']  ? cache['map_key']  : [];
	let map_sec  = cache['map_sec']  ? cache['map_sec']  : [];
	let data     = cache['data']     ? cache['data']     : [];

	if ( !map_keys.length && !map_key.length && !data.length ) {

		// Scrambled words.
		const cipher_result = Cipher.init( { secret_words: secret_words } );
		data                = cipher_result['data'];
		map_key             = cipher_result['map_key'];

		// Pad the data so that it contains an index in front of the table.
		for ( let i = 0; i < data.length; i++ ) {
			let c = i + 1;
			data[ i ].unshift( c.toString() );
		}

		// Create the cipher key string.
		for ( let x in map_key ) {
			let key_ref = map_key[ x ];
			for ( let a in key_ref ) {
				let key  = key_ref[ a ];
				let line = key.line;
				let col  = letter_map[ key.col ];
				map_keys.push( `${col}${line}` );
			}

			map_sec.push( Object.keys( map_key[ x ] ).toString() );
		}
		
		// Strings for display.
		map_keys = map_keys.join('-');
		map_sec  = map_sec.join(',');

		// Add the cache.
		cache['map_keys'] = map_keys;
		cache['map_key']  = map_key;
		cache['map_sec']  = map_sec;
		cache['data']     = data;
	}

	// Show or hide the key map.
	function show_map( args ) {

		let name = args['name'];

		let fun = name[0].toLowerCase() + name.substr(1);
		fun     = eval( fun.toString() );

		if ( fun === true ) {
			eval( `set${name}( false )` );
		} else {
			eval( `set${name}( true )` );
		}
	}

	return (
		<>
			<Container style={{ margin: 20 }}>
				<Header as="h3">UNIQUE BIP39 CRYPTOGRAM</Header>
				<List verticalAlign='middle'>
					<List.Item>
						<List.Content floated='left'><Checkbox slider onClick={() => show_map( { 'name': 'MapHidden' } )}/></List.Content>
						<List.Content className={`${mapHidden ? 'normal' : 'bold'}`} floated='left'>Reveal the cipher text:</List.Content>
						<List.Content className='bold' hidden={mapHidden} floated='right'>{map_keys}</List.Content>
					</List.Item>
					<List.Item>
						<List.Content floated='left'><Checkbox slider onClick={() => show_map( { 'name': 'MapSecret' } )}/></List.Content>
						<List.Content className={`${mapSecret ? 'normal' : 'bold'}`} floated='left'>Show secret (hide screen):</List.Content>
						<List.Content className='bold' hidden={mapSecret} floated='right'>{map_sec}</List.Content>
					</List.Item>
					<List.Item>
						<List.Content floated='left'><Icon name='linkify' /></List.Content>
						<List.Content floated='left'><a href='javascript:window.location.reload(false)'> Clear</a></List.Content>
					</List.Item>
					<List.Item>
						<List.Content floated='left'><Icon name='print' /></List.Content>
						<List.Content floated='left'><a href="javascript:window.print();">Print</a></List.Content>
					</List.Item>
				</List>
				<Table celled small='true' compact>
					<Table.Header>
						<Table.Row>
							{ header.map( ( letter, i ) => ( 
								<Table.HeaderCell collapsing textAlign='center' key={i}>{letter}</Table.HeaderCell>
							) ) }
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{ data.map( ( row ) => ( 
							<Table.Row key={row.toString()}>
								{ row.map( ( word, i ) => (
										<Table.Cell collapsing textAlign='center' key={i}>{word}</Table.Cell>
								) ) }
							</Table.Row>
						) ) }
					</Table.Body>
				</Table>
			</Container>
		</>
	);
}

export default SecretTable
