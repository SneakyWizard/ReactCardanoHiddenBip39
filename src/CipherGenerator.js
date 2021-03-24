var bip39 = require('bip39');
var data  = bip39.wordlists.EN;

export default class CipherGenerator {

	// Run the program.
	init( args ) {

		args = args || [];

		let secret_words = args['secret_words'];

		let result = {};
		
		// Bool.
		let is_valid = this.check_words( { secret_words: secret_words } );
		
		if ( is_valid ) {
		
			let word_res = [];
			
			if ( secret_words.length === 24 ) {
			
				// How many lines from top to bottom.
				for ( let i = 0; i < secret_words.length * 2; i++ ) {
				
					let word_list = []
					
					// Amount of random words per line.
					for ( let i = 0; i < 12; i++ ) {
						let rand = Math.floor( Math.random() * ( data.length - 0 ) + 0 );
						word_list.push( data[ rand ].toLowerCase() );
					}
			
					word_list = this.hide_secret( { secret_words: secret_words, word_list: word_list, s: i } );
				
					word_res.push( word_list );
				}
			
				word_res = this.shuffle( word_res );
			}
			
			const word_map = this.get_word_map( { secret_words: secret_words, word_res: word_res } );
		
			if ( word_res && word_map ) { 
				result['data']    = word_res;
				result['map_key'] = word_map;
			}
		}

		return result;
	}

	// Fetch the set.  Word location.
	get_word_map( args ) {

		args = args || [];
		
		let secret_words = args['secret_words'];
		let word_res     = args['word_res'];
		
		let result = [];
		let found  = {};
		
		let hide = false;
		
		for ( let w in secret_words ) {
		
			w = secret_words[ w ];
		
			let pos = 1;
		
			for ( let r in word_res ) {
			
				// Result element array.
				r = word_res[ r ];
			
				let n = 1;
			
				// Individual words in word_res. 
				for ( let s in r ) { 
			
					if ( w === r[ s ] && !found[ w ] ) { 
		
						let ref = {};
		
						if ( hide ) { 
							ref = { line: pos, col: n };
						} else { 
		
							// Position placement map of secret words.
							// Ex:  [ { you: { line: 38, col: 8 } }, ... ]
							ref            = {};
							ref[  r[ s ] ] = { line: pos, col: n };
		
						}
		
						result.push( ref );
		
						found[ w ] = 1;
						break;
					}
			
					n++;
				}
			
				pos++;
			}
		}

		return result;
	}

	// Mix in.
	hide_secret( args ) { 

		args = args || [];
		
		let s            = args['s'];
		let word_list    = args['word_list'];
		let secret_words = args['secret_words'];
		
		let sec_word = secret_words[ s ];
		let has_word = word_list.filter( n => n === sec_word ); 
		
		// Replace if not in the word list.
		if ( has_word.length ) {
		
			for ( let n in word_list ) { 
				word_list[ n ] = sec_word;
				break;
			}
		
		} else if ( sec_word ) {
		
			// Get the total of each line.
			let max  = word_list.length;
			let rand = Math.floor( Math.random() * ( max - 0 ) + 0 );
		
			word_list[ rand ] = sec_word;
		}
		
		return word_list;
	}

	// Make sure the word bip39 is compatible. 
	check_words( args ) { 

		args = args || [];
		
		let secret_words = args['secret_words'];
		
		let is_valid = true;
		
		for ( let s in secret_words ) { 
		
			let sec_word = secret_words[ s ];
			let has_word = data.filter( n => n === sec_word ); 
		
			// An invalid one found.
			if ( !has_word.length ) { 
				is_valid = false;
				break;
			}
		}
		
		return is_valid;
	}

	// Lastly the result.
	shuffle( array ) {

		for ( let i = array.length - 1; i > 0; i-- ) {
			let j  = Math.floor( Math.random() * ( i + 1 ) );
			[ array[ i ], array[ j ] ] = [ array[ j ], array[ i ] ];
		}
		
		return array;
	}
}
