/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

;/********************************************
	-	THEMEPUNCH TOOLS Ver. 6.0     -
	 Last Update of Tools 12.02.2019
*********************************************/


/*
* @fileOverview TouchSwipe - jQuery Plugin
* @version 6.0.0
*
* @author Matt Bryson http://www.github.com/mattbryson
* @see https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
* @see http://labs.skinkers.com/touchSwipe/
* @see http://plugins.jquery.com/project/touchSwipe
*
* Copyright (c) 2010 Matt Bryson
* Dual licensed under the MIT or GPL Version 2 licenses.
*
*/

(function(a){if(typeof define==="function"&&define.amd&&define.amd.jQuery){define(["jquery"],a)}else{a(jQuery)}}(function(f){var y="1.6.9",p="left",o="right",e="up",x="down",c="in",A="out",m="none",s="auto",l="swipe",t="pinch",B="tap",j="doubletap",b="longtap",z="hold",E="horizontal",u="vertical",i="all",r=10,g="start",k="move",h="end",q="cancel",a="ontouchstart" in window,v=window.navigator.msPointerEnabled&&!window.navigator.pointerEnabled,d=window.navigator.pointerEnabled||window.navigator.msPointerEnabled,C="TouchSwipe";var n={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,hold:null,triggerOnTouchEnd:true,triggerOnTouchLeave:false,allowPageScroll:"auto",fallbackToMouseEvents:true,excludedElements:"label, button, input, select, textarea, a, .noSwipe",preventDefaultEvents:true};f.fn.swipetp=function(H){var G=f(this),F=G.data(C);if(F&&typeof H==="string"){if(F[H]){return F[H].apply(this,Array.prototype.slice.call(arguments,1))}else{f.error("Method "+H+" does not exist on jQuery.swipetp")}}else{if(!F&&(typeof H==="object"||!H)){return w.apply(this,arguments)}}return G};f.fn.swipetp.version=y;f.fn.swipetp.defaults=n;f.fn.swipetp.phases={PHASE_START:g,PHASE_MOVE:k,PHASE_END:h,PHASE_CANCEL:q};f.fn.swipetp.directions={LEFT:p,RIGHT:o,UP:e,DOWN:x,IN:c,OUT:A};f.fn.swipetp.pageScroll={NONE:m,HORIZONTAL:E,VERTICAL:u,AUTO:s};f.fn.swipetp.fingers={ONE:1,TWO:2,THREE:3,ALL:i};function w(F){if(F&&(F.allowPageScroll===undefined&&(F.swipe!==undefined||F.swipeStatus!==undefined))){F.allowPageScroll=m}if(F.click!==undefined&&F.tap===undefined){F.tap=F.click}if(!F){F={}}F=f.extend({},f.fn.swipetp.defaults,F);return this.each(function(){var H=f(this);var G=H.data(C);if(!G){G=new D(this,F);H.data(C,G)}})}function D(a5,aw){var aA=(a||d||!aw.fallbackToMouseEvents),K=aA?(d?(v?"MSPointerDown":"pointerdown"):"touchstart"):"mousedown",az=aA?(d?(v?"MSPointerMove":"pointermove"):"touchmove"):"mousemove",V=aA?(d?(v?"MSPointerUp":"pointerup"):"touchend"):"mouseup",T=aA?null:"mouseleave",aE=(d?(v?"MSPointerCancel":"pointercancel"):"touchcancel");var ah=0,aQ=null,ac=0,a2=0,a0=0,H=1,ar=0,aK=0,N=null;var aS=f(a5);var aa="start";var X=0;var aR=null;var U=0,a3=0,a6=0,ae=0,O=0;var aX=null,ag=null;try{aS.bind(K,aO);aS.bind(aE,ba)}catch(al){f.error("events not supported "+K+","+aE+" on jQuery.swipetp")}this.enable=function(){aS.bind(K,aO);aS.bind(aE,ba);return aS};this.disable=function(){aL();return aS};this.destroy=function(){aL();aS.data(C,null);aS=null};this.option=function(bd,bc){if(aw[bd]!==undefined){if(bc===undefined){return aw[bd]}else{aw[bd]=bc}}else{f.error("Option "+bd+" does not exist on jQuery.swipetp.options")}return null};function aO(be){if(aC()){return}if(f(be.target).closest(aw.excludedElements,aS).length>0){return}var bf=be.originalEvent?be.originalEvent:be;var bd,bg=bf.touches,bc=bg?bg[0]:bf;aa=g;if(bg){X=bg.length}else{be.preventDefault()}ah=0;aQ=null;aK=null;ac=0;a2=0;a0=0;H=1;ar=0;aR=ak();N=ab();S();if(!bg||(X===aw.fingers||aw.fingers===i)||aY()){aj(0,bc);U=au();if(X==2){aj(1,bg[1]);a2=a0=av(aR[0].start,aR[1].start)}if(aw.swipeStatus||aw.pinchStatus){bd=P(bf,aa)}}else{bd=false}if(bd===false){aa=q;P(bf,aa);return bd}else{if(aw.hold){ag=setTimeout(f.proxy(function(){aS.trigger("hold",[bf.target]);if(aw.hold){bd=aw.hold.call(aS,bf,bf.target)}},this),aw.longTapThreshold)}ap(true)}return null}function a4(bf){var bi=bf.originalEvent?bf.originalEvent:bf;if(aa===h||aa===q||an()){return}var be,bj=bi.touches,bd=bj?bj[0]:bi;var bg=aI(bd);a3=au();if(bj){X=bj.length}if(aw.hold){clearTimeout(ag)}aa=k;if(X==2){if(a2==0){aj(1,bj[1]);a2=a0=av(aR[0].start,aR[1].start)}else{aI(bj[1]);a0=av(aR[0].end,aR[1].end);aK=at(aR[0].end,aR[1].end)}H=a8(a2,a0);ar=Math.abs(a2-a0)}if((X===aw.fingers||aw.fingers===i)||!bj||aY()){aQ=aM(bg.start,bg.end);am(bf,aQ);ah=aT(bg.start,bg.end);ac=aN();aJ(aQ,ah);if(aw.swipeStatus||aw.pinchStatus){be=P(bi,aa)}if(!aw.triggerOnTouchEnd||aw.triggerOnTouchLeave){var bc=true;if(aw.triggerOnTouchLeave){var bh=aZ(this);bc=F(bg.end,bh)}if(!aw.triggerOnTouchEnd&&bc){aa=aD(k)}else{if(aw.triggerOnTouchLeave&&!bc){aa=aD(h)}}if(aa==q||aa==h){P(bi,aa)}}}else{aa=q;P(bi,aa)}if(be===false){aa=q;P(bi,aa)}}function M(bc){var bd=bc.originalEvent?bc.originalEvent:bc,be=bd.touches;if(be){if(be.length){G();return true}}if(an()){X=ae}a3=au();ac=aN();if(bb()||!ao()){aa=q;P(bd,aa)}else{if(aw.triggerOnTouchEnd||(aw.triggerOnTouchEnd==false&&aa===k)){bc.preventDefault();aa=h;P(bd,aa)}else{if(!aw.triggerOnTouchEnd&&a7()){aa=h;aG(bd,aa,B)}else{if(aa===k){aa=q;P(bd,aa)}}}}ap(false);return null}function ba(){X=0;a3=0;U=0;a2=0;a0=0;H=1;S();ap(false)}function L(bc){var bd=bc.originalEvent?bc.originalEvent:bc;if(aw.triggerOnTouchLeave){aa=aD(h);P(bd,aa)}}function aL(){aS.unbind(K,aO);aS.unbind(aE,ba);aS.unbind(az,a4);aS.unbind(V,M);if(T){aS.unbind(T,L)}ap(false)}function aD(bg){var bf=bg;var be=aB();var bd=ao();var bc=bb();if(!be||bc){bf=q}else{if(bd&&bg==k&&(!aw.triggerOnTouchEnd||aw.triggerOnTouchLeave)){bf=h}else{if(!bd&&bg==h&&aw.triggerOnTouchLeave){bf=q}}}return bf}function P(be,bc){var bd,bf=be.touches;if((J()||W())||(Q()||aY())){if(J()||W()){bd=aG(be,bc,l)}if((Q()||aY())&&bd!==false){bd=aG(be,bc,t)}}else{if(aH()&&bd!==false){bd=aG(be,bc,j)}else{if(aq()&&bd!==false){bd=aG(be,bc,b)}else{if(ai()&&bd!==false){bd=aG(be,bc,B)}}}}if(bc===q){ba(be)}if(bc===h){if(bf){if(!bf.length){ba(be)}}else{ba(be)}}return bd}function aG(bf,bc,be){var bd;if(be==l){aS.trigger("swipeStatus",[bc,aQ||null,ah||0,ac||0,X,aR]);if(aw.swipeStatus){bd=aw.swipeStatus.call(aS,bf,bc,aQ||null,ah||0,ac||0,X,aR);if(bd===false){return false}}if(bc==h&&aW()){aS.trigger("swipe",[aQ,ah,ac,X,aR]);if(aw.swipe){bd=aw.swipe.call(aS,bf,aQ,ah,ac,X,aR);if(bd===false){return false}}switch(aQ){case p:aS.trigger("swipeLeft",[aQ,ah,ac,X,aR]);if(aw.swipeLeft){bd=aw.swipeLeft.call(aS,bf,aQ,ah,ac,X,aR)}break;case o:aS.trigger("swipeRight",[aQ,ah,ac,X,aR]);if(aw.swipeRight){bd=aw.swipeRight.call(aS,bf,aQ,ah,ac,X,aR)}break;case e:aS.trigger("swipeUp",[aQ,ah,ac,X,aR]);if(aw.swipeUp){bd=aw.swipeUp.call(aS,bf,aQ,ah,ac,X,aR)}break;case x:aS.trigger("swipeDown",[aQ,ah,ac,X,aR]);if(aw.swipeDown){bd=aw.swipeDown.call(aS,bf,aQ,ah,ac,X,aR)}break}}}if(be==t){aS.trigger("pinchStatus",[bc,aK||null,ar||0,ac||0,X,H,aR]);if(aw.pinchStatus){bd=aw.pinchStatus.call(aS,bf,bc,aK||null,ar||0,ac||0,X,H,aR);if(bd===false){return false}}if(bc==h&&a9()){switch(aK){case c:aS.trigger("pinchIn",[aK||null,ar||0,ac||0,X,H,aR]);if(aw.pinchIn){bd=aw.pinchIn.call(aS,bf,aK||null,ar||0,ac||0,X,H,aR)}break;case A:aS.trigger("pinchOut",[aK||null,ar||0,ac||0,X,H,aR]);if(aw.pinchOut){bd=aw.pinchOut.call(aS,bf,aK||null,ar||0,ac||0,X,H,aR)}break}}}if(be==B){if(bc===q||bc===h){clearTimeout(aX);clearTimeout(ag);if(Z()&&!I()){O=au();aX=setTimeout(f.proxy(function(){O=null;aS.trigger("tap",[bf.target]);if(aw.tap){bd=aw.tap.call(aS,bf,bf.target)}},this),aw.doubleTapThreshold)}else{O=null;aS.trigger("tap",[bf.target]);if(aw.tap){bd=aw.tap.call(aS,bf,bf.target)}}}}else{if(be==j){if(bc===q||bc===h){clearTimeout(aX);O=null;aS.trigger("doubletap",[bf.target]);if(aw.doubleTap){bd=aw.doubleTap.call(aS,bf,bf.target)}}}else{if(be==b){if(bc===q||bc===h){clearTimeout(aX);O=null;aS.trigger("longtap",[bf.target]);if(aw.longTap){bd=aw.longTap.call(aS,bf,bf.target)}}}}}return bd}function ao(){var bc=true;if(aw.threshold!==null){bc=ah>=aw.threshold}return bc}function bb(){var bc=false;if(aw.cancelThreshold!==null&&aQ!==null){bc=(aU(aQ)-ah)>=aw.cancelThreshold}return bc}function af(){if(aw.pinchThreshold!==null){return ar>=aw.pinchThreshold}return true}function aB(){var bc;if(aw.maxTimeThreshold){if(ac>=aw.maxTimeThreshold){bc=false}else{bc=true}}else{bc=true}return bc}function am(bc,bd){if(aw.preventDefaultEvents===false){return}if(aw.allowPageScroll===m){bc.preventDefault()}else{var be=aw.allowPageScroll===s;switch(bd){case p:if((aw.swipeLeft&&be)||(!be&&aw.allowPageScroll!=E)){bc.preventDefault()}break;case o:if((aw.swipeRight&&be)||(!be&&aw.allowPageScroll!=E)){bc.preventDefault()}break;case e:if((aw.swipeUp&&be)||(!be&&aw.allowPageScroll!=u)){bc.preventDefault()}break;case x:if((aw.swipeDown&&be)||(!be&&aw.allowPageScroll!=u)){bc.preventDefault()}break}}}function a9(){var bd=aP();var bc=Y();var be=af();return bd&&bc&&be}function aY(){return !!(aw.pinchStatus||aw.pinchIn||aw.pinchOut)}function Q(){return !!(a9()&&aY())}function aW(){var bf=aB();var bh=ao();var be=aP();var bc=Y();var bd=bb();var bg=!bd&&bc&&be&&bh&&bf;return bg}function W(){return !!(aw.swipe||aw.swipeStatus||aw.swipeLeft||aw.swipeRight||aw.swipeUp||aw.swipeDown)}function J(){return !!(aW()&&W())}function aP(){return((X===aw.fingers||aw.fingers===i)||!a)}function Y(){return aR[0].end.x!==0}function a7(){return !!(aw.tap)}function Z(){return !!(aw.doubleTap)}function aV(){return !!(aw.longTap)}function R(){if(O==null){return false}var bc=au();return(Z()&&((bc-O)<=aw.doubleTapThreshold))}function I(){return R()}function ay(){return((X===1||!a)&&(isNaN(ah)||ah<aw.threshold))}function a1(){return((ac>aw.longTapThreshold)&&(ah<r))}function ai(){return !!(ay()&&a7())}function aH(){return !!(R()&&Z())}function aq(){return !!(a1()&&aV())}function G(){a6=au();ae=event.touches.length+1}function S(){a6=0;ae=0}function an(){var bc=false;if(a6){var bd=au()-a6;if(bd<=aw.fingerReleaseThreshold){bc=true}}return bc}function aC(){return !!(aS.data(C+"_intouch")===true)}function ap(bc){if(bc===true){aS.bind(az,a4);aS.bind(V,M);if(T){aS.bind(T,L)}}else{aS.unbind(az,a4,false);aS.unbind(V,M,false);if(T){aS.unbind(T,L,false)}}aS.data(C+"_intouch",bc===true)}function aj(bd,bc){var be=bc.identifier!==undefined?bc.identifier:0;aR[bd].identifier=be;aR[bd].start.x=aR[bd].end.x=bc.pageX||bc.clientX;aR[bd].start.y=aR[bd].end.y=bc.pageY||bc.clientY;return aR[bd]}function aI(bc){var be=bc.identifier!==undefined?bc.identifier:0;var bd=ad(be);bd.end.x=bc.pageX||bc.clientX;bd.end.y=bc.pageY||bc.clientY;return bd}function ad(bd){for(var bc=0;bc<aR.length;bc++){if(aR[bc].identifier==bd){return aR[bc]}}}function ak(){var bc=[];for(var bd=0;bd<=5;bd++){bc.push({start:{x:0,y:0},end:{x:0,y:0},identifier:0})}return bc}function aJ(bc,bd){bd=Math.max(bd,aU(bc));N[bc].distance=bd}function aU(bc){if(N[bc]){return N[bc].distance}return undefined}function ab(){var bc={};bc[p]=ax(p);bc[o]=ax(o);bc[e]=ax(e);bc[x]=ax(x);return bc}function ax(bc){return{direction:bc,distance:0}}function aN(){return a3-U}function av(bf,be){var bd=Math.abs(bf.x-be.x);var bc=Math.abs(bf.y-be.y);return Math.round(Math.sqrt(bd*bd+bc*bc))}function a8(bc,bd){var be=(bd/bc)*1;return be.toFixed(2)}function at(){if(H<1){return A}else{return c}}function aT(bd,bc){return Math.round(Math.sqrt(Math.pow(bc.x-bd.x,2)+Math.pow(bc.y-bd.y,2)))}function aF(bf,bd){var bc=bf.x-bd.x;var bh=bd.y-bf.y;var be=Math.atan2(bh,bc);var bg=Math.round(be*180/Math.PI);if(bg<0){bg=360-Math.abs(bg)}return bg}function aM(bd,bc){var be=aF(bd,bc);if((be<=45)&&(be>=0)){return p}else{if((be<=360)&&(be>=315)){return p}else{if((be>=135)&&(be<=225)){return o}else{if((be>45)&&(be<135)){return x}else{return e}}}}}function au(){var bc=new Date();return bc.getTime()}function aZ(bc){bc=f(bc);var be=bc.offset();var bd={left:be.left,right:be.left+bc.outerWidth(),top:be.top,bottom:be.top+bc.outerHeight()};return bd}function F(bc,bd){return(bc.x>bd.left&&bc.x<bd.right&&bc.y>bd.top&&bc.y<bd.bottom)}}}));

if(typeof(console) === 'undefined') {
    var console = {};
    console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = console.groupCollapsed = function() {};
}

var RS_CacheGS = window.GreenSockGlobals, RS_CacheGS_queue = window._gsQueue,RS_Cache_define = window._gsDefine; window._gsDefine = null;delete window._gsDefine;var punchgs = window.GreenSockGlobals = {};

/*!
 * VERSION: 2.0.2
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 * 
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("TweenMax",["core.Animation","core.SimpleTimeline","TweenLite"],function(a,b,c){var d=function(a){var b,c=[],d=a.length;for(b=0;b!==d;c.push(a[b++]));return c},e=function(a,b,c){var d,e,f=a.cycle;for(d in f)e=f[d],a[d]="function"==typeof e?e(c,b[c]):e[c%e.length];delete a.cycle},f=function(a,b,d){c.call(this,a,b,d),this._cycle=0,this._yoyo=this.vars.yoyo===!0||!!this.vars.yoyoEase,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._repeat&&this._uncache(!0),this.render=f.prototype.render},g=1e-10,h=c._internals,i=h.isSelector,j=h.isArray,k=f.prototype=c.to({},.1,{}),l=[];f.version="2.0.2",k.constructor=f,k.kill()._gc=!1,f.killTweensOf=f.killDelayedCallsTo=c.killTweensOf,f.getTweensOf=c.getTweensOf,f.lagSmoothing=c.lagSmoothing,f.ticker=c.ticker,f.render=c.render,k.invalidate=function(){return this._yoyo=this.vars.yoyo===!0||!!this.vars.yoyoEase,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._yoyoEase=null,this._uncache(!0),c.prototype.invalidate.call(this)},k.updateTo=function(a,b){var d,e=this.ratio,f=this.vars.immediateRender||a.immediateRender;b&&this._startTime<this._timeline._time&&(this._startTime=this._timeline._time,this._uncache(!1),this._gc?this._enabled(!0,!1):this._timeline.insert(this,this._startTime-this._delay));for(d in a)this.vars[d]=a[d];if(this._initted||f)if(b)this._initted=!1,f&&this.render(0,!0,!0);else if(this._gc&&this._enabled(!0,!1),this._notifyPluginsOfEnabled&&this._firstPT&&c._onPluginEvent("_onDisable",this),this._time/this._duration>.998){var g=this._totalTime;this.render(0,!0,!1),this._initted=!1,this.render(g,!0,!1)}else if(this._initted=!1,this._init(),this._time>0||f)for(var h,i=1/(1-e),j=this._firstPT;j;)h=j.s+j.c,j.c*=i,j.s=h-j.c,j=j._next;return this},k.render=function(a,b,d){this._initted||0===this._duration&&this.vars.repeat&&this.invalidate();var e,f,i,j,k,l,m,n,o,p=this._dirty?this.totalDuration():this._totalDuration,q=this._time,r=this._totalTime,s=this._cycle,t=this._duration,u=this._rawPrevTime;if(a>=p-1e-7&&a>=0?(this._totalTime=p,this._cycle=this._repeat,this._yoyo&&0!==(1&this._cycle)?(this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0):(this._time=t,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1),this._reversed||(e=!0,f="onComplete",d=d||this._timeline.autoRemoveChildren),0===t&&(this._initted||!this.vars.lazy||d)&&(this._startTime===this._timeline._duration&&(a=0),(0>u||0>=a&&a>=-1e-7||u===g&&"isPause"!==this.data)&&u!==a&&(d=!0,u>g&&(f="onReverseComplete")),this._rawPrevTime=n=!b||a||u===a?a:g)):1e-7>a?(this._totalTime=this._time=this._cycle=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==r||0===t&&u>0)&&(f="onReverseComplete",e=this._reversed),0>a&&(this._active=!1,0===t&&(this._initted||!this.vars.lazy||d)&&(u>=0&&(d=!0),this._rawPrevTime=n=!b||a||u===a?a:g)),this._initted||(d=!0)):(this._totalTime=this._time=a,0!==this._repeat&&(j=t+this._repeatDelay,this._cycle=this._totalTime/j>>0,0!==this._cycle&&this._cycle===this._totalTime/j&&a>=r&&this._cycle--,this._time=this._totalTime-this._cycle*j,this._yoyo&&0!==(1&this._cycle)&&(this._time=t-this._time,o=this._yoyoEase||this.vars.yoyoEase,o&&(this._yoyoEase||(o!==!0||this._initted?this._yoyoEase=o=o===!0?this._ease:o instanceof Ease?o:Ease.map[o]:(o=this.vars.ease,this._yoyoEase=o=o?o instanceof Ease?o:"function"==typeof o?new Ease(o,this.vars.easeParams):Ease.map[o]||c.defaultEase:c.defaultEase)),this.ratio=o?1-o.getRatio((t-this._time)/t):0)),this._time>t?this._time=t:this._time<0&&(this._time=0)),this._easeType&&!o?(k=this._time/t,l=this._easeType,m=this._easePower,(1===l||3===l&&k>=.5)&&(k=1-k),3===l&&(k*=2),1===m?k*=k:2===m?k*=k*k:3===m?k*=k*k*k:4===m&&(k*=k*k*k*k),1===l?this.ratio=1-k:2===l?this.ratio=k:this._time/t<.5?this.ratio=k/2:this.ratio=1-k/2):o||(this.ratio=this._ease.getRatio(this._time/t))),q===this._time&&!d&&s===this._cycle)return void(r!==this._totalTime&&this._onUpdate&&(b||this._callback("onUpdate")));if(!this._initted){if(this._init(),!this._initted||this._gc)return;if(!d&&this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration))return this._time=q,this._totalTime=r,this._rawPrevTime=u,this._cycle=s,h.lazyTweens.push(this),void(this._lazy=[a,b]);!this._time||e||o?e&&this._ease._calcEnd&&!o&&(this.ratio=this._ease.getRatio(0===this._time?0:1)):this.ratio=this._ease.getRatio(this._time/t)}for(this._lazy!==!1&&(this._lazy=!1),this._active||!this._paused&&this._time!==q&&a>=0&&(this._active=!0),0===r&&(2===this._initted&&a>0&&this._init(),this._startAt&&(a>=0?this._startAt.render(a,!0,d):f||(f="_dummyGS")),this.vars.onStart&&(0!==this._totalTime||0===t)&&(b||this._callback("onStart"))),i=this._firstPT;i;)i.f?i.t[i.p](i.c*this.ratio+i.s):i.t[i.p]=i.c*this.ratio+i.s,i=i._next;this._onUpdate&&(0>a&&this._startAt&&this._startTime&&this._startAt.render(a,!0,d),b||(this._totalTime!==r||f)&&this._callback("onUpdate")),this._cycle!==s&&(b||this._gc||this.vars.onRepeat&&this._callback("onRepeat")),f&&(!this._gc||d)&&(0>a&&this._startAt&&!this._onUpdate&&this._startTime&&this._startAt.render(a,!0,d),e&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!b&&this.vars[f]&&this._callback(f),0===t&&this._rawPrevTime===g&&n!==g&&(this._rawPrevTime=0))},f.to=function(a,b,c){return new f(a,b,c)},f.from=function(a,b,c){return c.runBackwards=!0,c.immediateRender=0!=c.immediateRender,new f(a,b,c)},f.fromTo=function(a,b,c,d){return d.startAt=c,d.immediateRender=0!=d.immediateRender&&0!=c.immediateRender,new f(a,b,d)},f.staggerTo=f.allTo=function(a,b,g,h,k,m,n){h=h||0;var o,p,q,r,s=0,t=[],u=function(){g.onComplete&&g.onComplete.apply(g.onCompleteScope||this,arguments),k.apply(n||g.callbackScope||this,m||l)},v=g.cycle,w=g.startAt&&g.startAt.cycle;for(j(a)||("string"==typeof a&&(a=c.selector(a)||a),i(a)&&(a=d(a))),a=a||[],0>h&&(a=d(a),a.reverse(),h*=-1),o=a.length-1,q=0;o>=q;q++){p={};for(r in g)p[r]=g[r];if(v&&(e(p,a,q),null!=p.duration&&(b=p.duration,delete p.duration)),w){w=p.startAt={};for(r in g.startAt)w[r]=g.startAt[r];e(p.startAt,a,q)}p.delay=s+(p.delay||0),q===o&&k&&(p.onComplete=u),t[q]=new f(a[q],b,p),s+=h}return t},f.staggerFrom=f.allFrom=function(a,b,c,d,e,g,h){return c.runBackwards=!0,c.immediateRender=0!=c.immediateRender,f.staggerTo(a,b,c,d,e,g,h)},f.staggerFromTo=f.allFromTo=function(a,b,c,d,e,g,h,i){return d.startAt=c,d.immediateRender=0!=d.immediateRender&&0!=c.immediateRender,f.staggerTo(a,b,d,e,g,h,i)},f.delayedCall=function(a,b,c,d,e){return new f(b,0,{delay:a,onComplete:b,onCompleteParams:c,callbackScope:d,onReverseComplete:b,onReverseCompleteParams:c,immediateRender:!1,useFrames:e,overwrite:0})},f.set=function(a,b){return new f(a,0,b)},f.isTweening=function(a){return c.getTweensOf(a,!0).length>0};var m=function(a,b){for(var d=[],e=0,f=a._first;f;)f instanceof c?d[e++]=f:(b&&(d[e++]=f),d=d.concat(m(f,b)),e=d.length),f=f._next;return d},n=f.getAllTweens=function(b){return m(a._rootTimeline,b).concat(m(a._rootFramesTimeline,b))};f.killAll=function(a,c,d,e){null==c&&(c=!0),null==d&&(d=!0);var f,g,h,i=n(0!=e),j=i.length,k=c&&d&&e;for(h=0;j>h;h++)g=i[h],(k||g instanceof b||(f=g.target===g.vars.onComplete)&&d||c&&!f)&&(a?g.totalTime(g._reversed?0:g.totalDuration()):g._enabled(!1,!1))},f.killChildTweensOf=function(a,b){if(null!=a){var e,g,k,l,m,n=h.tweenLookup;if("string"==typeof a&&(a=c.selector(a)||a),i(a)&&(a=d(a)),j(a))for(l=a.length;--l>-1;)f.killChildTweensOf(a[l],b);else{e=[];for(k in n)for(g=n[k].target.parentNode;g;)g===a&&(e=e.concat(n[k].tweens)),g=g.parentNode;for(m=e.length,l=0;m>l;l++)b&&e[l].totalTime(e[l].totalDuration()),e[l]._enabled(!1,!1)}}};var o=function(a,c,d,e){c=c!==!1,d=d!==!1,e=e!==!1;for(var f,g,h=n(e),i=c&&d&&e,j=h.length;--j>-1;)g=h[j],(i||g instanceof b||(f=g.target===g.vars.onComplete)&&d||c&&!f)&&g.paused(a)};return f.pauseAll=function(a,b,c){o(!0,a,b,c)},f.resumeAll=function(a,b,c){o(!1,a,b,c)},f.globalTimeScale=function(b){var d=a._rootTimeline,e=c.ticker.time;return arguments.length?(b=b||g,d._startTime=e-(e-d._startTime)*d._timeScale/b,d=a._rootFramesTimeline,e=c.ticker.frame,d._startTime=e-(e-d._startTime)*d._timeScale/b,d._timeScale=a._rootTimeline._timeScale=b,b):d._timeScale},k.progress=function(a,b){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&0!==(1&this._cycle)?1-a:a)+this._cycle*(this._duration+this._repeatDelay),b):this._time/this.duration()},k.totalProgress=function(a,b){return arguments.length?this.totalTime(this.totalDuration()*a,b):this._totalTime/this.totalDuration()},k.time=function(a,b){return arguments.length?(this._dirty&&this.totalDuration(),a>this._duration&&(a=this._duration),this._yoyo&&0!==(1&this._cycle)?a=this._duration-a+this._cycle*(this._duration+this._repeatDelay):0!==this._repeat&&(a+=this._cycle*(this._duration+this._repeatDelay)),this.totalTime(a,b)):this._time},k.duration=function(b){return arguments.length?a.prototype.duration.call(this,b):this._duration},k.totalDuration=function(a){return arguments.length?-1===this._repeat?this:this.duration((a-this._repeat*this._repeatDelay)/(this._repeat+1)):(this._dirty&&(this._totalDuration=-1===this._repeat?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat,this._dirty=!1),this._totalDuration)},k.repeat=function(a){return arguments.length?(this._repeat=a,this._uncache(!0)):this._repeat},k.repeatDelay=function(a){return arguments.length?(this._repeatDelay=a,this._uncache(!0)):this._repeatDelay},k.yoyo=function(a){return arguments.length?(this._yoyo=a,this):this._yoyo},f},!0),_gsScope._gsDefine("TimelineLite",["core.Animation","core.SimpleTimeline","TweenLite"],function(a,b,c){var d=function(a){b.call(this,a),this._labels={},this.autoRemoveChildren=this.vars.autoRemoveChildren===!0,this.smoothChildTiming=this.vars.smoothChildTiming===!0,this._sortChildren=!0,this._onUpdate=this.vars.onUpdate;var c,d,e=this.vars;for(d in e)c=e[d],i(c)&&-1!==c.join("").indexOf("{self}")&&(e[d]=this._swapSelfInParams(c));i(e.tweens)&&this.add(e.tweens,0,e.align,e.stagger)},e=1e-10,f=c._internals,g=d._internals={},h=f.isSelector,i=f.isArray,j=f.lazyTweens,k=f.lazyRender,l=_gsScope._gsDefine.globals,m=function(a){var b,c={};for(b in a)c[b]=a[b];return c},n=function(a,b,c){var d,e,f=a.cycle;for(d in f)e=f[d],a[d]="function"==typeof e?e(c,b[c]):e[c%e.length];delete a.cycle},o=g.pauseCallback=function(){},p=function(a){var b,c=[],d=a.length;for(b=0;b!==d;c.push(a[b++]));return c},q=d.prototype=new b;return d.version="2.0.2",q.constructor=d,q.kill()._gc=q._forcingPlayhead=q._hasPause=!1,q.to=function(a,b,d,e){var f=d.repeat&&l.TweenMax||c;return b?this.add(new f(a,b,d),e):this.set(a,d,e)},q.from=function(a,b,d,e){return this.add((d.repeat&&l.TweenMax||c).from(a,b,d),e)},q.fromTo=function(a,b,d,e,f){var g=e.repeat&&l.TweenMax||c;return b?this.add(g.fromTo(a,b,d,e),f):this.set(a,e,f)},q.staggerTo=function(a,b,e,f,g,i,j,k){var l,o,q=new d({onComplete:i,onCompleteParams:j,callbackScope:k,smoothChildTiming:this.smoothChildTiming}),r=e.cycle;for("string"==typeof a&&(a=c.selector(a)||a),a=a||[],h(a)&&(a=p(a)),f=f||0,0>f&&(a=p(a),a.reverse(),f*=-1),o=0;o<a.length;o++)l=m(e),l.startAt&&(l.startAt=m(l.startAt),l.startAt.cycle&&n(l.startAt,a,o)),r&&(n(l,a,o),null!=l.duration&&(b=l.duration,delete l.duration)),q.to(a[o],b,l,o*f);return this.add(q,g)},q.staggerFrom=function(a,b,c,d,e,f,g,h){return c.immediateRender=0!=c.immediateRender,c.runBackwards=!0,this.staggerTo(a,b,c,d,e,f,g,h)},q.staggerFromTo=function(a,b,c,d,e,f,g,h,i){return d.startAt=c,d.immediateRender=0!=d.immediateRender&&0!=c.immediateRender,this.staggerTo(a,b,d,e,f,g,h,i)},q.call=function(a,b,d,e){return this.add(c.delayedCall(0,a,b,d),e)},q.set=function(a,b,d){return d=this._parseTimeOrLabel(d,0,!0),null==b.immediateRender&&(b.immediateRender=d===this._time&&!this._paused),this.add(new c(a,0,b),d)},d.exportRoot=function(a,b){a=a||{},null==a.smoothChildTiming&&(a.smoothChildTiming=!0);var e,f,g,h,i=new d(a),j=i._timeline;for(null==b&&(b=!0),j._remove(i,!0),i._startTime=0,i._rawPrevTime=i._time=i._totalTime=j._time,g=j._first;g;)h=g._next,b&&g instanceof c&&g.target===g.vars.onComplete||(f=g._startTime-g._delay,0>f&&(e=1),i.add(g,f)),g=h;return j.add(i,0),e&&i.totalDuration(),i},q.add=function(e,f,g,h){var j,k,l,m,n,o;if("number"!=typeof f&&(f=this._parseTimeOrLabel(f,0,!0,e)),!(e instanceof a)){if(e instanceof Array||e&&e.push&&i(e)){for(g=g||"normal",h=h||0,j=f,k=e.length,l=0;k>l;l++)i(m=e[l])&&(m=new d({tweens:m})),this.add(m,j),"string"!=typeof m&&"function"!=typeof m&&("sequence"===g?j=m._startTime+m.totalDuration()/m._timeScale:"start"===g&&(m._startTime-=m.delay())),j+=h;return this._uncache(!0)}if("string"==typeof e)return this.addLabel(e,f);if("function"!=typeof e)throw"Cannot add "+e+" into the timeline; it is not a tween, timeline, function, or string.";e=c.delayedCall(0,e)}if(b.prototype.add.call(this,e,f),e._time&&(j=Math.max(0,Math.min(e.totalDuration(),(this.rawTime()-e._startTime)*e._timeScale)),Math.abs(j-e._totalTime)>1e-5&&e.render(j,!1,!1)),(this._gc||this._time===this._duration)&&!this._paused&&this._duration<this.duration())for(n=this,o=n.rawTime()>e._startTime;n._timeline;)o&&n._timeline.smoothChildTiming?n.totalTime(n._totalTime,!0):n._gc&&n._enabled(!0,!1),n=n._timeline;return this},q.remove=function(b){if(b instanceof a){this._remove(b,!1);var c=b._timeline=b.vars.useFrames?a._rootFramesTimeline:a._rootTimeline;return b._startTime=(b._paused?b._pauseTime:c._time)-(b._reversed?b.totalDuration()-b._totalTime:b._totalTime)/b._timeScale,this}if(b instanceof Array||b&&b.push&&i(b)){for(var d=b.length;--d>-1;)this.remove(b[d]);return this}return"string"==typeof b?this.removeLabel(b):this.kill(null,b)},q._remove=function(a,c){b.prototype._remove.call(this,a,c);var d=this._last;return d?this._time>this.duration()&&(this._time=this._duration,this._totalTime=this._totalDuration):this._time=this._totalTime=this._duration=this._totalDuration=0,this},q.append=function(a,b){return this.add(a,this._parseTimeOrLabel(null,b,!0,a))},q.insert=q.insertMultiple=function(a,b,c,d){return this.add(a,b||0,c,d)},q.appendMultiple=function(a,b,c,d){return this.add(a,this._parseTimeOrLabel(null,b,!0,a),c,d)},q.addLabel=function(a,b){return this._labels[a]=this._parseTimeOrLabel(b),this},q.addPause=function(a,b,d,e){var f=c.delayedCall(0,o,d,e||this);return f.vars.onComplete=f.vars.onReverseComplete=b,f.data="isPause",this._hasPause=!0,this.add(f,a)},q.removeLabel=function(a){return delete this._labels[a],this},q.getLabelTime=function(a){return null!=this._labels[a]?this._labels[a]:-1},q._parseTimeOrLabel=function(b,c,d,e){var f,g;if(e instanceof a&&e.timeline===this)this.remove(e);else if(e&&(e instanceof Array||e.push&&i(e)))for(g=e.length;--g>-1;)e[g]instanceof a&&e[g].timeline===this&&this.remove(e[g]);if(f="number"!=typeof b||c?this.duration()>99999999999?this.recent().endTime(!1):this._duration:0,"string"==typeof c)return this._parseTimeOrLabel(c,d&&"number"==typeof b&&null==this._labels[c]?b-f:0,d);if(c=c||0,"string"!=typeof b||!isNaN(b)&&null==this._labels[b])null==b&&(b=f);else{if(g=b.indexOf("="),-1===g)return null==this._labels[b]?d?this._labels[b]=f+c:c:this._labels[b]+c;c=parseInt(b.charAt(g-1)+"1",10)*Number(b.substr(g+1)),b=g>1?this._parseTimeOrLabel(b.substr(0,g-1),0,d):f}return Number(b)+c},q.seek=function(a,b){return this.totalTime("number"==typeof a?a:this._parseTimeOrLabel(a),b!==!1)},q.stop=function(){return this.paused(!0)},q.gotoAndPlay=function(a,b){return this.play(a,b)},q.gotoAndStop=function(a,b){return this.pause(a,b)},q.render=function(a,b,c){this._gc&&this._enabled(!0,!1);var d,f,g,h,i,l,m,n=this._time,o=this._dirty?this.totalDuration():this._totalDuration,p=this._startTime,q=this._timeScale,r=this._paused;if(n!==this._time&&(a+=this._time-n),a>=o-1e-7&&a>=0)this._totalTime=this._time=o,this._reversed||this._hasPausedChild()||(f=!0,h="onComplete",i=!!this._timeline.autoRemoveChildren,0===this._duration&&(0>=a&&a>=-1e-7||this._rawPrevTime<0||this._rawPrevTime===e)&&this._rawPrevTime!==a&&this._first&&(i=!0,this._rawPrevTime>e&&(h="onReverseComplete"))),this._rawPrevTime=this._duration||!b||a||this._rawPrevTime===a?a:e,a=o+1e-4;else if(1e-7>a)if(this._totalTime=this._time=0,(0!==n||0===this._duration&&this._rawPrevTime!==e&&(this._rawPrevTime>0||0>a&&this._rawPrevTime>=0))&&(h="onReverseComplete",f=this._reversed),0>a)this._active=!1,this._timeline.autoRemoveChildren&&this._reversed?(i=f=!0,h="onReverseComplete"):this._rawPrevTime>=0&&this._first&&(i=!0),this._rawPrevTime=a;else{if(this._rawPrevTime=this._duration||!b||a||this._rawPrevTime===a?a:e,0===a&&f)for(d=this._first;d&&0===d._startTime;)d._duration||(f=!1),d=d._next;a=0,this._initted||(i=!0)}else{if(this._hasPause&&!this._forcingPlayhead&&!b){if(a>=n)for(d=this._first;d&&d._startTime<=a&&!l;)d._duration||"isPause"!==d.data||d.ratio||0===d._startTime&&0===this._rawPrevTime||(l=d),d=d._next;else for(d=this._last;d&&d._startTime>=a&&!l;)d._duration||"isPause"===d.data&&d._rawPrevTime>0&&(l=d),d=d._prev;l&&(this._time=a=l._startTime,this._totalTime=a+this._cycle*(this._totalDuration+this._repeatDelay))}this._totalTime=this._time=this._rawPrevTime=a}if(this._time!==n&&this._first||c||i||l){if(this._initted||(this._initted=!0),this._active||!this._paused&&this._time!==n&&a>0&&(this._active=!0),0===n&&this.vars.onStart&&(0===this._time&&this._duration||b||this._callback("onStart")),m=this._time,m>=n)for(d=this._first;d&&(g=d._next,m===this._time&&(!this._paused||r));)(d._active||d._startTime<=m&&!d._paused&&!d._gc)&&(l===d&&this.pause(),d._reversed?d.render((d._dirty?d.totalDuration():d._totalDuration)-(a-d._startTime)*d._timeScale,b,c):d.render((a-d._startTime)*d._timeScale,b,c)),d=g;else for(d=this._last;d&&(g=d._prev,m===this._time&&(!this._paused||r));){if(d._active||d._startTime<=n&&!d._paused&&!d._gc){if(l===d){for(l=d._prev;l&&l.endTime()>this._time;)l.render(l._reversed?l.totalDuration()-(a-l._startTime)*l._timeScale:(a-l._startTime)*l._timeScale,b,c),l=l._prev;l=null,this.pause()}d._reversed?d.render((d._dirty?d.totalDuration():d._totalDuration)-(a-d._startTime)*d._timeScale,b,c):d.render((a-d._startTime)*d._timeScale,b,c)}d=g}this._onUpdate&&(b||(j.length&&k(),this._callback("onUpdate"))),h&&(this._gc||(p===this._startTime||q!==this._timeScale)&&(0===this._time||o>=this.totalDuration())&&(f&&(j.length&&k(),this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!b&&this.vars[h]&&this._callback(h)))}},q._hasPausedChild=function(){for(var a=this._first;a;){if(a._paused||a instanceof d&&a._hasPausedChild())return!0;a=a._next}return!1},q.getChildren=function(a,b,d,e){e=e||-9999999999;for(var f=[],g=this._first,h=0;g;)g._startTime<e||(g instanceof c?b!==!1&&(f[h++]=g):(d!==!1&&(f[h++]=g),a!==!1&&(f=f.concat(g.getChildren(!0,b,d)),h=f.length))),g=g._next;return f},q.getTweensOf=function(a,b){var d,e,f=this._gc,g=[],h=0;for(f&&this._enabled(!0,!0),d=c.getTweensOf(a),e=d.length;--e>-1;)(d[e].timeline===this||b&&this._contains(d[e]))&&(g[h++]=d[e]);return f&&this._enabled(!1,!0),g},q.recent=function(){return this._recent},q._contains=function(a){for(var b=a.timeline;b;){if(b===this)return!0;b=b.timeline}return!1},q.shiftChildren=function(a,b,c){c=c||0;for(var d,e=this._first,f=this._labels;e;)e._startTime>=c&&(e._startTime+=a),e=e._next;if(b)for(d in f)f[d]>=c&&(f[d]+=a);return this._uncache(!0)},q._kill=function(a,b){if(!a&&!b)return this._enabled(!1,!1);for(var c=b?this.getTweensOf(b):this.getChildren(!0,!0,!1),d=c.length,e=!1;--d>-1;)c[d]._kill(a,b)&&(e=!0);return e},q.clear=function(a){var b=this.getChildren(!1,!0,!0),c=b.length;for(this._time=this._totalTime=0;--c>-1;)b[c]._enabled(!1,!1);return a!==!1&&(this._labels={}),this._uncache(!0)},q.invalidate=function(){for(var b=this._first;b;)b.invalidate(),b=b._next;return a.prototype.invalidate.call(this)},q._enabled=function(a,c){if(a===this._gc)for(var d=this._first;d;)d._enabled(a,!0),d=d._next;return b.prototype._enabled.call(this,a,c)},q.totalTime=function(b,c,d){this._forcingPlayhead=!0;var e=a.prototype.totalTime.apply(this,arguments);return this._forcingPlayhead=!1,e},q.duration=function(a){return arguments.length?(0!==this.duration()&&0!==a&&this.timeScale(this._duration/a),this):(this._dirty&&this.totalDuration(),this._duration)},q.totalDuration=function(a){if(!arguments.length){if(this._dirty){for(var b,c,d=0,e=this._last,f=999999999999;e;)b=e._prev,e._dirty&&e.totalDuration(),e._startTime>f&&this._sortChildren&&!e._paused&&!this._calculatingDuration?(this._calculatingDuration=1,this.add(e,e._startTime-e._delay),this._calculatingDuration=0):f=e._startTime,e._startTime<0&&!e._paused&&(d-=e._startTime,this._timeline.smoothChildTiming&&(this._startTime+=e._startTime/this._timeScale,this._time-=e._startTime,this._totalTime-=e._startTime,this._rawPrevTime-=e._startTime),this.shiftChildren(-e._startTime,!1,-9999999999),f=0),c=e._startTime+e._totalDuration/e._timeScale,c>d&&(d=c),e=b;this._duration=this._totalDuration=d,this._dirty=!1}return this._totalDuration}return a&&this.totalDuration()?this.timeScale(this._totalDuration/a):this},q.paused=function(b){if(!b)for(var c=this._first,d=this._time;c;)c._startTime===d&&"isPause"===c.data&&(c._rawPrevTime=0),c=c._next;return a.prototype.paused.apply(this,arguments)},q.usesFrames=function(){for(var b=this._timeline;b._timeline;)b=b._timeline;return b===a._rootFramesTimeline},q.rawTime=function(a){return a&&(this._paused||this._repeat&&this.time()>0&&this.totalProgress()<1)?this._totalTime%(this._duration+this._repeatDelay):this._paused?this._totalTime:(this._timeline.rawTime(a)-this._startTime)*this._timeScale},d},!0),_gsScope._gsDefine("TimelineMax",["TimelineLite","TweenLite","easing.Ease"],function(a,b,c){var d=function(b){a.call(this,b),this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._cycle=0,this._yoyo=this.vars.yoyo===!0,this._dirty=!0},e=1e-10,f=b._internals,g=f.lazyTweens,h=f.lazyRender,i=_gsScope._gsDefine.globals,j=new c(null,null,1,0),k=d.prototype=new a;return k.constructor=d,k.kill()._gc=!1,d.version="2.0.2",k.invalidate=function(){return this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._uncache(!0),a.prototype.invalidate.call(this)},k.addCallback=function(a,c,d,e){return this.add(b.delayedCall(0,a,d,e),c)},k.removeCallback=function(a,b){if(a)if(null==b)this._kill(null,a);else for(var c=this.getTweensOf(a,!1),d=c.length,e=this._parseTimeOrLabel(b);--d>-1;)c[d]._startTime===e&&c[d]._enabled(!1,!1);return this},k.removePause=function(b){return this.removeCallback(a._internals.pauseCallback,b)},k.tweenTo=function(a,c){c=c||{};var d,e,f,g={ease:j,useFrames:this.usesFrames(),immediateRender:!1,lazy:!1},h=c.repeat&&i.TweenMax||b;for(e in c)g[e]=c[e];return g.time=this._parseTimeOrLabel(a),d=Math.abs(Number(g.time)-this._time)/this._timeScale||.001,f=new h(this,d,g),g.onStart=function(){f.target.paused(!0),f.vars.time===f.target.time()||d!==f.duration()||f.isFromTo||f.duration(Math.abs(f.vars.time-f.target.time())/f.target._timeScale).render(f.time(),!0,!0),c.onStart&&c.onStart.apply(c.onStartScope||c.callbackScope||f,c.onStartParams||[])},f},k.tweenFromTo=function(a,b,c){c=c||{},a=this._parseTimeOrLabel(a),c.startAt={onComplete:this.seek,onCompleteParams:[a],callbackScope:this},c.immediateRender=c.immediateRender!==!1;var d=this.tweenTo(b,c);return d.isFromTo=1,d.duration(Math.abs(d.vars.time-a)/this._timeScale||.001)},k.render=function(a,b,c){this._gc&&this._enabled(!0,!1);var d,f,i,j,k,l,m,n,o=this._time,p=this._dirty?this.totalDuration():this._totalDuration,q=this._duration,r=this._totalTime,s=this._startTime,t=this._timeScale,u=this._rawPrevTime,v=this._paused,w=this._cycle;if(o!==this._time&&(a+=this._time-o),a>=p-1e-7&&a>=0)this._locked||(this._totalTime=p,this._cycle=this._repeat),this._reversed||this._hasPausedChild()||(f=!0,j="onComplete",k=!!this._timeline.autoRemoveChildren,0===this._duration&&(0>=a&&a>=-1e-7||0>u||u===e)&&u!==a&&this._first&&(k=!0,u>e&&(j="onReverseComplete"))),this._rawPrevTime=this._duration||!b||a||this._rawPrevTime===a?a:e,this._yoyo&&0!==(1&this._cycle)?this._time=a=0:(this._time=q,a=q+1e-4);else if(1e-7>a)if(this._locked||(this._totalTime=this._cycle=0),this._time=0,(0!==o||0===q&&u!==e&&(u>0||0>a&&u>=0)&&!this._locked)&&(j="onReverseComplete",f=this._reversed),0>a)this._active=!1,this._timeline.autoRemoveChildren&&this._reversed?(k=f=!0,j="onReverseComplete"):u>=0&&this._first&&(k=!0),this._rawPrevTime=a;else{if(this._rawPrevTime=q||!b||a||this._rawPrevTime===a?a:e,0===a&&f)for(d=this._first;d&&0===d._startTime;)d._duration||(f=!1),d=d._next;a=0,this._initted||(k=!0)}else if(0===q&&0>u&&(k=!0),this._time=this._rawPrevTime=a,this._locked||(this._totalTime=a,0!==this._repeat&&(l=q+this._repeatDelay,this._cycle=this._totalTime/l>>0,0!==this._cycle&&this._cycle===this._totalTime/l&&a>=r&&this._cycle--,this._time=this._totalTime-this._cycle*l,this._yoyo&&0!==(1&this._cycle)&&(this._time=q-this._time),this._time>q?(this._time=q,a=q+1e-4):this._time<0?this._time=a=0:a=this._time)),this._hasPause&&!this._forcingPlayhead&&!b){if(a=this._time,a>=o||this._repeat&&w!==this._cycle)for(d=this._first;d&&d._startTime<=a&&!m;)d._duration||"isPause"!==d.data||d.ratio||0===d._startTime&&0===this._rawPrevTime||(m=d),d=d._next;else for(d=this._last;d&&d._startTime>=a&&!m;)d._duration||"isPause"===d.data&&d._rawPrevTime>0&&(m=d),d=d._prev;m&&m._startTime<q&&(this._time=a=m._startTime,this._totalTime=a+this._cycle*(this._totalDuration+this._repeatDelay))}if(this._cycle!==w&&!this._locked){var x=this._yoyo&&0!==(1&w),y=x===(this._yoyo&&0!==(1&this._cycle)),z=this._totalTime,A=this._cycle,B=this._rawPrevTime,C=this._time;if(this._totalTime=w*q,this._cycle<w?x=!x:this._totalTime+=q,this._time=o,this._rawPrevTime=0===q?u-1e-4:u,this._cycle=w,this._locked=!0,o=x?0:q,this.render(o,b,0===q),b||this._gc||this.vars.onRepeat&&(this._cycle=A,this._locked=!1,this._callback("onRepeat")),o!==this._time)return;if(y&&(this._cycle=w,this._locked=!0,o=x?q+1e-4:-1e-4,this.render(o,!0,!1)),this._locked=!1,this._paused&&!v)return;this._time=C,this._totalTime=z,this._cycle=A,this._rawPrevTime=B}if(!(this._time!==o&&this._first||c||k||m))return void(r!==this._totalTime&&this._onUpdate&&(b||this._callback("onUpdate")));if(this._initted||(this._initted=!0),this._active||!this._paused&&this._totalTime!==r&&a>0&&(this._active=!0),0===r&&this.vars.onStart&&(0===this._totalTime&&this._totalDuration||b||this._callback("onStart")),n=this._time,n>=o)for(d=this._first;d&&(i=d._next,n===this._time&&(!this._paused||v));)(d._active||d._startTime<=this._time&&!d._paused&&!d._gc)&&(m===d&&this.pause(),d._reversed?d.render((d._dirty?d.totalDuration():d._totalDuration)-(a-d._startTime)*d._timeScale,b,c):d.render((a-d._startTime)*d._timeScale,b,c)),d=i;else for(d=this._last;d&&(i=d._prev,n===this._time&&(!this._paused||v));){if(d._active||d._startTime<=o&&!d._paused&&!d._gc){if(m===d){for(m=d._prev;m&&m.endTime()>this._time;)m.render(m._reversed?m.totalDuration()-(a-m._startTime)*m._timeScale:(a-m._startTime)*m._timeScale,b,c),m=m._prev;m=null,this.pause()}d._reversed?d.render((d._dirty?d.totalDuration():d._totalDuration)-(a-d._startTime)*d._timeScale,b,c):d.render((a-d._startTime)*d._timeScale,b,c)}d=i}this._onUpdate&&(b||(g.length&&h(),this._callback("onUpdate"))),j&&(this._locked||this._gc||(s===this._startTime||t!==this._timeScale)&&(0===this._time||p>=this.totalDuration())&&(f&&(g.length&&h(),this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!b&&this.vars[j]&&this._callback(j)))},k.getActive=function(a,b,c){null==a&&(a=!0),null==b&&(b=!0),null==c&&(c=!1);var d,e,f=[],g=this.getChildren(a,b,c),h=0,i=g.length;for(d=0;i>d;d++)e=g[d],e.isActive()&&(f[h++]=e);return f},k.getLabelAfter=function(a){a||0!==a&&(a=this._time);var b,c=this.getLabelsArray(),d=c.length;for(b=0;d>b;b++)if(c[b].time>a)return c[b].name;return null},k.getLabelBefore=function(a){null==a&&(a=this._time);for(var b=this.getLabelsArray(),c=b.length;--c>-1;)if(b[c].time<a)return b[c].name;return null},k.getLabelsArray=function(){var a,b=[],c=0;for(a in this._labels)b[c++]={time:this._labels[a],name:a};return b.sort(function(a,b){return a.time-b.time}),b},k.invalidate=function(){return this._locked=!1,a.prototype.invalidate.call(this)},k.progress=function(a,b){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&0!==(1&this._cycle)?1-a:a)+this._cycle*(this._duration+this._repeatDelay),b):this._time/this.duration()||0},k.totalProgress=function(a,b){return arguments.length?this.totalTime(this.totalDuration()*a,b):this._totalTime/this.totalDuration()||0},k.totalDuration=function(b){return arguments.length?-1!==this._repeat&&b?this.timeScale(this.totalDuration()/b):this:(this._dirty&&(a.prototype.totalDuration.call(this),this._totalDuration=-1===this._repeat?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat),this._totalDuration)},k.time=function(a,b){return arguments.length?(this._dirty&&this.totalDuration(),a>this._duration&&(a=this._duration),this._yoyo&&0!==(1&this._cycle)?a=this._duration-a+this._cycle*(this._duration+this._repeatDelay):0!==this._repeat&&(a+=this._cycle*(this._duration+this._repeatDelay)),this.totalTime(a,b)):this._time},k.repeat=function(a){return arguments.length?(this._repeat=a,this._uncache(!0)):this._repeat},k.repeatDelay=function(a){return arguments.length?(this._repeatDelay=a,this._uncache(!0)):this._repeatDelay},k.yoyo=function(a){return arguments.length?(this._yoyo=a,this):this._yoyo},k.currentLabel=function(a){return arguments.length?this.seek(a,!0):this.getLabelBefore(this._time+1e-8)},d},!0),function(){var a=180/Math.PI,b=[],c=[],d=[],e={},f=_gsScope._gsDefine.globals,g=function(a,b,c,d){c===d&&(c=d-(d-b)/1e6),a===b&&(b=a+(c-a)/1e6),this.a=a,this.b=b,this.c=c,this.d=d,this.da=d-a,this.ca=c-a,this.ba=b-a},h=",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",i=function(a,b,c,d){var e={a:a},f={},g={},h={c:d},i=(a+b)/2,j=(b+c)/2,k=(c+d)/2,l=(i+j)/2,m=(j+k)/2,n=(m-l)/8;return e.b=i+(a-i)/4,f.b=l+n,e.c=f.a=(e.b+f.b)/2,f.c=g.a=(l+m)/2,g.b=m-n,h.b=k+(d-k)/4,g.c=h.a=(g.b+h.b)/2,[e,f,g,h]},j=function(a,e,f,g,h){var j,k,l,m,n,o,p,q,r,s,t,u,v,w=a.length-1,x=0,y=a[0].a;for(j=0;w>j;j++)n=a[x],k=n.a,l=n.d,m=a[x+1].d,h?(t=b[j],u=c[j],v=(u+t)*e*.25/(g?.5:d[j]||.5),o=l-(l-k)*(g?.5*e:0!==t?v/t:0),p=l+(m-l)*(g?.5*e:0!==u?v/u:0),q=l-(o+((p-o)*(3*t/(t+u)+.5)/4||0))):(o=l-(l-k)*e*.5,p=l+(m-l)*e*.5,q=l-(o+p)/2),o+=q,p+=q,n.c=r=o,0!==j?n.b=y:n.b=y=n.a+.6*(n.c-n.a),n.da=l-k,n.ca=r-k,n.ba=y-k,f?(s=i(k,y,r,l),a.splice(x,1,s[0],s[1],s[2],s[3]),x+=4):x++,y=p;n=a[x],n.b=y,n.c=y+.4*(n.d-y),n.da=n.d-n.a,n.ca=n.c-n.a,n.ba=y-n.a,f&&(s=i(n.a,y,n.c,n.d),a.splice(x,1,s[0],s[1],s[2],s[3]))},k=function(a,d,e,f){var h,i,j,k,l,m,n=[];if(f)for(a=[f].concat(a),i=a.length;--i>-1;)"string"==typeof(m=a[i][d])&&"="===m.charAt(1)&&(a[i][d]=f[d]+Number(m.charAt(0)+m.substr(2)));if(h=a.length-2,0>h)return n[0]=new g(a[0][d],0,0,a[0][d]),n;for(i=0;h>i;i++)j=a[i][d],k=a[i+1][d],n[i]=new g(j,0,0,k),e&&(l=a[i+2][d],b[i]=(b[i]||0)+(k-j)*(k-j),c[i]=(c[i]||0)+(l-k)*(l-k));return n[i]=new g(a[i][d],0,0,a[i+1][d]),n},l=function(a,f,g,i,l,m){var n,o,p,q,r,s,t,u,v={},w=[],x=m||a[0];l="string"==typeof l?","+l+",":h,null==f&&(f=1);for(o in a[0])w.push(o);if(a.length>1){for(u=a[a.length-1],t=!0,n=w.length;--n>-1;)if(o=w[n],Math.abs(x[o]-u[o])>.05){t=!1;break}t&&(a=a.concat(),m&&a.unshift(m),a.push(a[1]),m=a[a.length-3])}for(b.length=c.length=d.length=0,n=w.length;--n>-1;)o=w[n],e[o]=-1!==l.indexOf(","+o+","),v[o]=k(a,o,e[o],m);for(n=b.length;--n>-1;)b[n]=Math.sqrt(b[n]),
c[n]=Math.sqrt(c[n]);if(!i){for(n=w.length;--n>-1;)if(e[o])for(p=v[w[n]],s=p.length-1,q=0;s>q;q++)r=p[q+1].da/c[q]+p[q].da/b[q]||0,d[q]=(d[q]||0)+r*r;for(n=d.length;--n>-1;)d[n]=Math.sqrt(d[n])}for(n=w.length,q=g?4:1;--n>-1;)o=w[n],p=v[o],j(p,f,g,i,e[o]),t&&(p.splice(0,q),p.splice(p.length-q,q));return v},m=function(a,b,c){b=b||"soft";var d,e,f,h,i,j,k,l,m,n,o,p={},q="cubic"===b?3:2,r="soft"===b,s=[];if(r&&c&&(a=[c].concat(a)),null==a||a.length<q+1)throw"invalid Bezier data";for(m in a[0])s.push(m);for(j=s.length;--j>-1;){for(m=s[j],p[m]=i=[],n=0,l=a.length,k=0;l>k;k++)d=null==c?a[k][m]:"string"==typeof(o=a[k][m])&&"="===o.charAt(1)?c[m]+Number(o.charAt(0)+o.substr(2)):Number(o),r&&k>1&&l-1>k&&(i[n++]=(d+i[n-2])/2),i[n++]=d;for(l=n-q+1,n=0,k=0;l>k;k+=q)d=i[k],e=i[k+1],f=i[k+2],h=2===q?0:i[k+3],i[n++]=o=3===q?new g(d,e,f,h):new g(d,(2*e+d)/3,(2*e+f)/3,f);i.length=n}return p},n=function(a,b,c){for(var d,e,f,g,h,i,j,k,l,m,n,o=1/c,p=a.length;--p>-1;)for(m=a[p],f=m.a,g=m.d-f,h=m.c-f,i=m.b-f,d=e=0,k=1;c>=k;k++)j=o*k,l=1-j,d=e-(e=(j*j*g+3*l*(j*h+l*i))*j),n=p*c+k-1,b[n]=(b[n]||0)+d*d},o=function(a,b){b=b>>0||6;var c,d,e,f,g=[],h=[],i=0,j=0,k=b-1,l=[],m=[];for(c in a)n(a[c],g,b);for(e=g.length,d=0;e>d;d++)i+=Math.sqrt(g[d]),f=d%b,m[f]=i,f===k&&(j+=i,f=d/b>>0,l[f]=m,h[f]=j,i=0,m=[]);return{length:j,lengths:h,segments:l}},p=_gsScope._gsDefine.plugin({propName:"bezier",priority:-1,version:"1.3.8",API:2,global:!0,init:function(a,b,c){this._target=a,b instanceof Array&&(b={values:b}),this._func={},this._mod={},this._props=[],this._timeRes=null==b.timeResolution?6:parseInt(b.timeResolution,10);var d,e,f,g,h,i=b.values||[],j={},k=i[0],n=b.autoRotate||c.vars.orientToBezier;this._autoRotate=n?n instanceof Array?n:[["x","y","rotation",n===!0?0:Number(n)||0]]:null;for(d in k)this._props.push(d);for(f=this._props.length;--f>-1;)d=this._props[f],this._overwriteProps.push(d),e=this._func[d]="function"==typeof a[d],j[d]=e?a[d.indexOf("set")||"function"!=typeof a["get"+d.substr(3)]?d:"get"+d.substr(3)]():parseFloat(a[d]),h||j[d]!==i[0][d]&&(h=j);if(this._beziers="cubic"!==b.type&&"quadratic"!==b.type&&"soft"!==b.type?l(i,isNaN(b.curviness)?1:b.curviness,!1,"thruBasic"===b.type,b.correlate,h):m(i,b.type,j),this._segCount=this._beziers[d].length,this._timeRes){var p=o(this._beziers,this._timeRes);this._length=p.length,this._lengths=p.lengths,this._segments=p.segments,this._l1=this._li=this._s1=this._si=0,this._l2=this._lengths[0],this._curSeg=this._segments[0],this._s2=this._curSeg[0],this._prec=1/this._curSeg.length}if(n=this._autoRotate)for(this._initialRotations=[],n[0]instanceof Array||(this._autoRotate=n=[n]),f=n.length;--f>-1;){for(g=0;3>g;g++)d=n[f][g],this._func[d]="function"==typeof a[d]?a[d.indexOf("set")||"function"!=typeof a["get"+d.substr(3)]?d:"get"+d.substr(3)]:!1;d=n[f][2],this._initialRotations[f]=(this._func[d]?this._func[d].call(this._target):this._target[d])||0,this._overwriteProps.push(d)}return this._startRatio=c.vars.runBackwards?1:0,!0},set:function(b){var c,d,e,f,g,h,i,j,k,l,m=this._segCount,n=this._func,o=this._target,p=b!==this._startRatio;if(this._timeRes){if(k=this._lengths,l=this._curSeg,b*=this._length,e=this._li,b>this._l2&&m-1>e){for(j=m-1;j>e&&(this._l2=k[++e])<=b;);this._l1=k[e-1],this._li=e,this._curSeg=l=this._segments[e],this._s2=l[this._s1=this._si=0]}else if(b<this._l1&&e>0){for(;e>0&&(this._l1=k[--e])>=b;);0===e&&b<this._l1?this._l1=0:e++,this._l2=k[e],this._li=e,this._curSeg=l=this._segments[e],this._s1=l[(this._si=l.length-1)-1]||0,this._s2=l[this._si]}if(c=e,b-=this._l1,e=this._si,b>this._s2&&e<l.length-1){for(j=l.length-1;j>e&&(this._s2=l[++e])<=b;);this._s1=l[e-1],this._si=e}else if(b<this._s1&&e>0){for(;e>0&&(this._s1=l[--e])>=b;);0===e&&b<this._s1?this._s1=0:e++,this._s2=l[e],this._si=e}h=(e+(b-this._s1)/(this._s2-this._s1))*this._prec||0}else c=0>b?0:b>=1?m-1:m*b>>0,h=(b-c*(1/m))*m;for(d=1-h,e=this._props.length;--e>-1;)f=this._props[e],g=this._beziers[f][c],i=(h*h*g.da+3*d*(h*g.ca+d*g.ba))*h+g.a,this._mod[f]&&(i=this._mod[f](i,o)),n[f]?o[f](i):o[f]=i;if(this._autoRotate){var q,r,s,t,u,v,w,x=this._autoRotate;for(e=x.length;--e>-1;)f=x[e][2],v=x[e][3]||0,w=x[e][4]===!0?1:a,g=this._beziers[x[e][0]],q=this._beziers[x[e][1]],g&&q&&(g=g[c],q=q[c],r=g.a+(g.b-g.a)*h,t=g.b+(g.c-g.b)*h,r+=(t-r)*h,t+=(g.c+(g.d-g.c)*h-t)*h,s=q.a+(q.b-q.a)*h,u=q.b+(q.c-q.b)*h,s+=(u-s)*h,u+=(q.c+(q.d-q.c)*h-u)*h,i=p?Math.atan2(u-s,t-r)*w+v:this._initialRotations[e],this._mod[f]&&(i=this._mod[f](i,o)),n[f]?o[f](i):o[f]=i)}}}),q=p.prototype;p.bezierThrough=l,p.cubicToQuadratic=i,p._autoCSS=!0,p.quadraticToCubic=function(a,b,c){return new g(a,(2*b+a)/3,(2*b+c)/3,c)},p._cssRegister=function(){var a=f.CSSPlugin;if(a){var b=a._internals,c=b._parseToProxy,d=b._setPluginRatio,e=b.CSSPropTween;b._registerComplexSpecialProp("bezier",{parser:function(a,b,f,g,h,i){b instanceof Array&&(b={values:b}),i=new p;var j,k,l,m=b.values,n=m.length-1,o=[],q={};if(0>n)return h;for(j=0;n>=j;j++)l=c(a,m[j],g,h,i,n!==j),o[j]=l.end;for(k in b)q[k]=b[k];return q.values=o,h=new e(a,"bezier",0,0,l.pt,2),h.data=l,h.plugin=i,h.setRatio=d,0===q.autoRotate&&(q.autoRotate=!0),!q.autoRotate||q.autoRotate instanceof Array||(j=q.autoRotate===!0?0:Number(q.autoRotate),q.autoRotate=null!=l.end.left?[["left","top","rotation",j,!1]]:null!=l.end.x?[["x","y","rotation",j,!1]]:!1),q.autoRotate&&(g._transform||g._enableTransforms(!1),l.autoRotate=g._target._gsTransform,l.proxy.rotation=l.autoRotate.rotation||0,g._overwriteProps.push("rotation")),i._onInitTween(l.proxy,q,g._tween),h}})}},q._mod=function(a){for(var b,c=this._overwriteProps,d=c.length;--d>-1;)b=a[c[d]],b&&"function"==typeof b&&(this._mod[c[d]]=b)},q._kill=function(a){var b,c,d=this._props;for(b in this._beziers)if(b in a)for(delete this._beziers[b],delete this._func[b],c=d.length;--c>-1;)d[c]===b&&d.splice(c,1);if(d=this._autoRotate)for(c=d.length;--c>-1;)a[d[c][2]]&&d.splice(c,1);return this._super._kill.call(this,a)}}(),_gsScope._gsDefine("plugins.CSSPlugin",["plugins.TweenPlugin","TweenLite"],function(a,b){var c,d,e,f,g=function(){a.call(this,"css"),this._overwriteProps.length=0,this.setRatio=g.prototype.setRatio},h=_gsScope._gsDefine.globals,i={},j=g.prototype=new a("css");j.constructor=g,g.version="2.0.2",g.API=2,g.defaultTransformPerspective=0,g.defaultSkewType="compensated",g.defaultSmoothOrigin=!0,j="px",g.suffixMap={top:j,right:j,bottom:j,left:j,width:j,height:j,fontSize:j,padding:j,margin:j,perspective:j,lineHeight:""};var k,l,m,n,o,p,q,r,s=/(?:\-|\.|\b)(\d|\.|e\-)+/g,t=/(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,u=/(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,v=/(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,w=/(?:\d|\-|\+|=|#|\.)*/g,x=/opacity *= *([^)]*)/i,y=/opacity:([^;]*)/i,z=/alpha\(opacity *=.+?\)/i,A=/^(rgb|hsl)/,B=/([A-Z])/g,C=/-([a-z])/gi,D=/(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,E=function(a,b){return b.toUpperCase()},F=/(?:Left|Right|Width)/i,G=/(M11|M12|M21|M22)=[\d\-\.e]+/gi,H=/progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,I=/,(?=[^\)]*(?:\(|$))/gi,J=/[\s,\(]/i,K=Math.PI/180,L=180/Math.PI,M={},N={style:{}},O=_gsScope.document||{createElement:function(){return N}},P=function(a,b){return O.createElementNS?O.createElementNS(b||"http://www.w3.org/1999/xhtml",a):O.createElement(a)},Q=P("div"),R=P("img"),S=g._internals={_specialProps:i},T=(_gsScope.navigator||{}).userAgent||"",U=function(){var a=T.indexOf("Android"),b=P("a");return m=-1!==T.indexOf("Safari")&&-1===T.indexOf("Chrome")&&(-1===a||parseFloat(T.substr(a+8,2))>3),o=m&&parseFloat(T.substr(T.indexOf("Version/")+8,2))<6,n=-1!==T.indexOf("Firefox"),(/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(T)||/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(T))&&(p=parseFloat(RegExp.$1)),b?(b.style.cssText="top:1px;opacity:.55;",/^0.55/.test(b.style.opacity)):!1}(),V=function(a){return x.test("string"==typeof a?a:(a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100:1},W=function(a){_gsScope.console&&console.log(a)},X="",Y="",Z=function(a,b){b=b||Q;var c,d,e=b.style;if(void 0!==e[a])return a;for(a=a.charAt(0).toUpperCase()+a.substr(1),c=["O","Moz","ms","Ms","Webkit"],d=5;--d>-1&&void 0===e[c[d]+a];);return d>=0?(Y=3===d?"ms":c[d],X="-"+Y.toLowerCase()+"-",Y+a):null},$=("undefined"!=typeof window?window:O.defaultView||{getComputedStyle:function(){}}).getComputedStyle,_=g.getStyle=function(a,b,c,d,e){var f;return U||"opacity"!==b?(!d&&a.style[b]?f=a.style[b]:(c=c||$(a))?f=c[b]||c.getPropertyValue(b)||c.getPropertyValue(b.replace(B,"-$1").toLowerCase()):a.currentStyle&&(f=a.currentStyle[b]),null==e||f&&"none"!==f&&"auto"!==f&&"auto auto"!==f?f:e):V(a)},aa=S.convertToPixels=function(a,c,d,e,f){if("px"===e||!e&&"lineHeight"!==c)return d;if("auto"===e||!d)return 0;var h,i,j,k=F.test(c),l=a,m=Q.style,n=0>d,o=1===d;if(n&&(d=-d),o&&(d*=100),"lineHeight"!==c||e)if("%"===e&&-1!==c.indexOf("border"))h=d/100*(k?a.clientWidth:a.clientHeight);else{if(m.cssText="border:0 solid red;position:"+_(a,"position")+";line-height:0;","%"!==e&&l.appendChild&&"v"!==e.charAt(0)&&"rem"!==e)m[k?"borderLeftWidth":"borderTopWidth"]=d+e;else{if(l=a.parentNode||O.body,-1!==_(l,"display").indexOf("flex")&&(m.position="absolute"),i=l._gsCache,j=b.ticker.frame,i&&k&&i.time===j)return i.width*d/100;m[k?"width":"height"]=d+e}l.appendChild(Q),h=parseFloat(Q[k?"offsetWidth":"offsetHeight"]),l.removeChild(Q),k&&"%"===e&&g.cacheWidths!==!1&&(i=l._gsCache=l._gsCache||{},i.time=j,i.width=h/d*100),0!==h||f||(h=aa(a,c,d,e,!0))}else i=$(a).lineHeight,a.style.lineHeight=d,h=parseFloat($(a).lineHeight),a.style.lineHeight=i;return o&&(h/=100),n?-h:h},ba=S.calculateOffset=function(a,b,c){if("absolute"!==_(a,"position",c))return 0;var d="left"===b?"Left":"Top",e=_(a,"margin"+d,c);return a["offset"+d]-(aa(a,b,parseFloat(e),e.replace(w,""))||0)},ca=function(a,b){var c,d,e,f={};if(b=b||$(a,null))if(c=b.length)for(;--c>-1;)e=b[c],(-1===e.indexOf("-transform")||Da===e)&&(f[e.replace(C,E)]=b.getPropertyValue(e));else for(c in b)(-1===c.indexOf("Transform")||Ca===c)&&(f[c]=b[c]);else if(b=a.currentStyle||a.style)for(c in b)"string"==typeof c&&void 0===f[c]&&(f[c.replace(C,E)]=b[c]);return U||(f.opacity=V(a)),d=Ra(a,b,!1),f.rotation=d.rotation,f.skewX=d.skewX,f.scaleX=d.scaleX,f.scaleY=d.scaleY,f.x=d.x,f.y=d.y,Fa&&(f.z=d.z,f.rotationX=d.rotationX,f.rotationY=d.rotationY,f.scaleZ=d.scaleZ),f.filters&&delete f.filters,f},da=function(a,b,c,d,e){var f,g,h,i={},j=a.style;for(g in c)"cssText"!==g&&"length"!==g&&isNaN(g)&&(b[g]!==(f=c[g])||e&&e[g])&&-1===g.indexOf("Origin")&&("number"==typeof f||"string"==typeof f)&&(i[g]="auto"!==f||"left"!==g&&"top"!==g?""!==f&&"auto"!==f&&"none"!==f||"string"!=typeof b[g]||""===b[g].replace(v,"")?f:0:ba(a,g),void 0!==j[g]&&(h=new sa(j,g,j[g],h)));if(d)for(g in d)"className"!==g&&(i[g]=d[g]);return{difs:i,firstMPT:h}},ea={width:["Left","Right"],height:["Top","Bottom"]},fa=["marginLeft","marginRight","marginTop","marginBottom"],ga=function(a,b,c){if("svg"===(a.nodeName+"").toLowerCase())return(c||$(a))[b]||0;if(a.getCTM&&Oa(a))return a.getBBox()[b]||0;var d=parseFloat("width"===b?a.offsetWidth:a.offsetHeight),e=ea[b],f=e.length;for(c=c||$(a,null);--f>-1;)d-=parseFloat(_(a,"padding"+e[f],c,!0))||0,d-=parseFloat(_(a,"border"+e[f]+"Width",c,!0))||0;return d},ha=function(a,b){if("contain"===a||"auto"===a||"auto auto"===a)return a+" ";(null==a||""===a)&&(a="0 0");var c,d=a.split(" "),e=-1!==a.indexOf("left")?"0%":-1!==a.indexOf("right")?"100%":d[0],f=-1!==a.indexOf("top")?"0%":-1!==a.indexOf("bottom")?"100%":d[1];if(d.length>3&&!b){for(d=a.split(", ").join(",").split(","),a=[],c=0;c<d.length;c++)a.push(ha(d[c]));return a.join(",")}return null==f?f="center"===e?"50%":"0":"center"===f&&(f="50%"),("center"===e||isNaN(parseFloat(e))&&-1===(e+"").indexOf("="))&&(e="50%"),a=e+" "+f+(d.length>2?" "+d[2]:""),b&&(b.oxp=-1!==e.indexOf("%"),b.oyp=-1!==f.indexOf("%"),b.oxr="="===e.charAt(1),b.oyr="="===f.charAt(1),b.ox=parseFloat(e.replace(v,"")),b.oy=parseFloat(f.replace(v,"")),b.v=a),b||a},ia=function(a,b){return"function"==typeof a&&(a=a(r,q)),"string"==typeof a&&"="===a.charAt(1)?parseInt(a.charAt(0)+"1",10)*parseFloat(a.substr(2)):parseFloat(a)-parseFloat(b)||0},ja=function(a,b){"function"==typeof a&&(a=a(r,q));var c="string"==typeof a&&"="===a.charAt(1);return"string"==typeof a&&"v"===a.charAt(a.length-2)&&(a=(c?a.substr(0,2):0)+window["inner"+("vh"===a.substr(-2)?"Height":"Width")]*(parseFloat(c?a.substr(2):a)/100)),null==a?b:c?parseInt(a.charAt(0)+"1",10)*parseFloat(a.substr(2))+b:parseFloat(a)||0},ka=function(a,b,c,d){var e,f,g,h,i,j=1e-6;return"function"==typeof a&&(a=a(r,q)),null==a?h=b:"number"==typeof a?h=a:(e=360,f=a.split("_"),i="="===a.charAt(1),g=(i?parseInt(a.charAt(0)+"1",10)*parseFloat(f[0].substr(2)):parseFloat(f[0]))*(-1===a.indexOf("rad")?1:L)-(i?0:b),f.length&&(d&&(d[c]=b+g),-1!==a.indexOf("short")&&(g%=e,g!==g%(e/2)&&(g=0>g?g+e:g-e)),-1!==a.indexOf("_cw")&&0>g?g=(g+9999999999*e)%e-(g/e|0)*e:-1!==a.indexOf("ccw")&&g>0&&(g=(g-9999999999*e)%e-(g/e|0)*e)),h=b+g),j>h&&h>-j&&(h=0),h},la={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},ma=function(a,b,c){return a=0>a?a+1:a>1?a-1:a,255*(1>6*a?b+(c-b)*a*6:.5>a?c:2>3*a?b+(c-b)*(2/3-a)*6:b)+.5|0},na=g.parseColor=function(a,b){var c,d,e,f,g,h,i,j,k,l,m;if(a)if("number"==typeof a)c=[a>>16,a>>8&255,255&a];else{if(","===a.charAt(a.length-1)&&(a=a.substr(0,a.length-1)),la[a])c=la[a];else if("#"===a.charAt(0))4===a.length&&(d=a.charAt(1),e=a.charAt(2),f=a.charAt(3),a="#"+d+d+e+e+f+f),a=parseInt(a.substr(1),16),c=[a>>16,a>>8&255,255&a];else if("hsl"===a.substr(0,3))if(c=m=a.match(s),b){if(-1!==a.indexOf("="))return a.match(t)}else g=Number(c[0])%360/360,h=Number(c[1])/100,i=Number(c[2])/100,e=.5>=i?i*(h+1):i+h-i*h,d=2*i-e,c.length>3&&(c[3]=Number(c[3])),c[0]=ma(g+1/3,d,e),c[1]=ma(g,d,e),c[2]=ma(g-1/3,d,e);else c=a.match(s)||la.transparent;c[0]=Number(c[0]),c[1]=Number(c[1]),c[2]=Number(c[2]),c.length>3&&(c[3]=Number(c[3]))}else c=la.black;return b&&!m&&(d=c[0]/255,e=c[1]/255,f=c[2]/255,j=Math.max(d,e,f),k=Math.min(d,e,f),i=(j+k)/2,j===k?g=h=0:(l=j-k,h=i>.5?l/(2-j-k):l/(j+k),g=j===d?(e-f)/l+(f>e?6:0):j===e?(f-d)/l+2:(d-e)/l+4,g*=60),c[0]=g+.5|0,c[1]=100*h+.5|0,c[2]=100*i+.5|0),c},oa=function(a,b){var c,d,e,f=a.match(pa)||[],g=0,h="";if(!f.length)return a;for(c=0;c<f.length;c++)d=f[c],e=a.substr(g,a.indexOf(d,g)-g),g+=e.length+d.length,d=na(d,b),3===d.length&&d.push(1),h+=e+(b?"hsla("+d[0]+","+d[1]+"%,"+d[2]+"%,"+d[3]:"rgba("+d.join(","))+")";return h+a.substr(g)},pa="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";for(j in la)pa+="|"+j+"\\b";pa=new RegExp(pa+")","gi"),g.colorStringFilter=function(a){var b,c=a[0]+" "+a[1];pa.test(c)&&(b=-1!==c.indexOf("hsl(")||-1!==c.indexOf("hsla("),a[0]=oa(a[0],b),a[1]=oa(a[1],b)),pa.lastIndex=0},b.defaultStringFilter||(b.defaultStringFilter=g.colorStringFilter);var qa=function(a,b,c,d){if(null==a)return function(a){return a};var e,f=b?(a.match(pa)||[""])[0]:"",g=a.split(f).join("").match(u)||[],h=a.substr(0,a.indexOf(g[0])),i=")"===a.charAt(a.length-1)?")":"",j=-1!==a.indexOf(" ")?" ":",",k=g.length,l=k>0?g[0].replace(s,""):"";return k?e=b?function(a){var b,m,n,o;if("number"==typeof a)a+=l;else if(d&&I.test(a)){for(o=a.replace(I,"|").split("|"),n=0;n<o.length;n++)o[n]=e(o[n]);return o.join(",")}if(b=(a.match(pa)||[f])[0],m=a.split(b).join("").match(u)||[],n=m.length,k>n--)for(;++n<k;)m[n]=c?m[(n-1)/2|0]:g[n];return h+m.join(j)+j+b+i+(-1!==a.indexOf("inset")?" inset":"")}:function(a){var b,f,m;if("number"==typeof a)a+=l;else if(d&&I.test(a)){for(f=a.replace(I,"|").split("|"),m=0;m<f.length;m++)f[m]=e(f[m]);return f.join(",")}if(b=a.match(u)||[],m=b.length,k>m--)for(;++m<k;)b[m]=c?b[(m-1)/2|0]:g[m];return h+b.join(j)+i}:function(a){return a}},ra=function(a){return a=a.split(","),function(b,c,d,e,f,g,h){var i,j=(c+"").split(" ");for(h={},i=0;4>i;i++)h[a[i]]=j[i]=j[i]||j[(i-1)/2>>0];return e.parse(b,h,f,g)}},sa=(S._setPluginRatio=function(a){this.plugin.setRatio(a);for(var b,c,d,e,f,g=this.data,h=g.proxy,i=g.firstMPT,j=1e-6;i;)b=h[i.v],i.r?b=i.r(b):j>b&&b>-j&&(b=0),i.t[i.p]=b,i=i._next;if(g.autoRotate&&(g.autoRotate.rotation=g.mod?g.mod.call(this._tween,h.rotation,this.t,this._tween):h.rotation),1===a||0===a)for(i=g.firstMPT,f=1===a?"e":"b";i;){if(c=i.t,c.type){if(1===c.type){for(e=c.xs0+c.s+c.xs1,d=1;d<c.l;d++)e+=c["xn"+d]+c["xs"+(d+1)];c[f]=e}}else c[f]=c.s+c.xs0;i=i._next}},function(a,b,c,d,e){this.t=a,this.p=b,this.v=c,this.r=e,d&&(d._prev=this,this._next=d)}),ta=(S._parseToProxy=function(a,b,c,d,e,f){var g,h,i,j,k,l=d,m={},n={},o=c._transform,p=M;for(c._transform=null,M=b,d=k=c.parse(a,b,d,e),M=p,f&&(c._transform=o,l&&(l._prev=null,l._prev&&(l._prev._next=null)));d&&d!==l;){if(d.type<=1&&(h=d.p,n[h]=d.s+d.c,m[h]=d.s,f||(j=new sa(d,"s",h,j,d.r),d.c=0),1===d.type))for(g=d.l;--g>0;)i="xn"+g,h=d.p+"_"+i,n[h]=d.data[i],m[h]=d[i],f||(j=new sa(d,i,h,j,d.rxp[i]));d=d._next}return{proxy:m,end:n,firstMPT:j,pt:k}},S.CSSPropTween=function(a,b,d,e,g,h,i,j,k,l,m){this.t=a,this.p=b,this.s=d,this.c=e,this.n=i||b,a instanceof ta||f.push(this.n),this.r=j?"function"==typeof j?j:Math.round:j,this.type=h||0,k&&(this.pr=k,c=!0),this.b=void 0===l?d:l,this.e=void 0===m?d+e:m,g&&(this._next=g,g._prev=this)}),ua=function(a,b,c,d,e,f){var g=new ta(a,b,c,d-c,e,-1,f);return g.b=c,g.e=g.xs0=d,g},va=g.parseComplex=function(a,b,c,d,e,f,h,i,j,l){c=c||f||"","function"==typeof d&&(d=d(r,q)),h=new ta(a,b,0,0,h,l?2:1,null,!1,i,c,d),d+="",e&&pa.test(d+c)&&(d=[c,d],g.colorStringFilter(d),c=d[0],d=d[1]);var m,n,o,p,u,v,w,x,y,z,A,B,C,D=c.split(", ").join(",").split(" "),E=d.split(", ").join(",").split(" "),F=D.length,G=k!==!1;for((-1!==d.indexOf(",")||-1!==c.indexOf(","))&&(-1!==(d+c).indexOf("rgb")||-1!==(d+c).indexOf("hsl")?(D=D.join(" ").replace(I,", ").split(" "),E=E.join(" ").replace(I,", ").split(" ")):(D=D.join(" ").split(",").join(", ").split(" "),E=E.join(" ").split(",").join(", ").split(" ")),F=D.length),F!==E.length&&(D=(f||"").split(" "),F=D.length),h.plugin=j,h.setRatio=l,pa.lastIndex=0,m=0;F>m;m++)if(p=D[m],u=E[m]+"",x=parseFloat(p),x||0===x)h.appendXtra("",x,ia(u,x),u.replace(t,""),G&&-1!==u.indexOf("px")?Math.round:!1,!0);else if(e&&pa.test(p))B=u.indexOf(")")+1,B=")"+(B?u.substr(B):""),C=-1!==u.indexOf("hsl")&&U,z=u,p=na(p,C),u=na(u,C),y=p.length+u.length>6,y&&!U&&0===u[3]?(h["xs"+h.l]+=h.l?" transparent":"transparent",h.e=h.e.split(E[m]).join("transparent")):(U||(y=!1),C?h.appendXtra(z.substr(0,z.indexOf("hsl"))+(y?"hsla(":"hsl("),p[0],ia(u[0],p[0]),",",!1,!0).appendXtra("",p[1],ia(u[1],p[1]),"%,",!1).appendXtra("",p[2],ia(u[2],p[2]),y?"%,":"%"+B,!1):h.appendXtra(z.substr(0,z.indexOf("rgb"))+(y?"rgba(":"rgb("),p[0],u[0]-p[0],",",Math.round,!0).appendXtra("",p[1],u[1]-p[1],",",Math.round).appendXtra("",p[2],u[2]-p[2],y?",":B,Math.round),y&&(p=p.length<4?1:p[3],h.appendXtra("",p,(u.length<4?1:u[3])-p,B,!1))),pa.lastIndex=0;else if(v=p.match(s)){if(w=u.match(t),!w||w.length!==v.length)return h;for(o=0,n=0;n<v.length;n++)A=v[n],z=p.indexOf(A,o),h.appendXtra(p.substr(o,z-o),Number(A),ia(w[n],A),"",G&&"px"===p.substr(z+A.length,2)?Math.round:!1,0===n),o=z+A.length;h["xs"+h.l]+=p.substr(o)}else h["xs"+h.l]+=h.l||h["xs"+h.l]?" "+u:u;if(-1!==d.indexOf("=")&&h.data){for(B=h.xs0+h.data.s,m=1;m<h.l;m++)B+=h["xs"+m]+h.data["xn"+m];h.e=B+h["xs"+m]}return h.l||(h.type=-1,h.xs0=h.e),h.xfirst||h},wa=9;for(j=ta.prototype,j.l=j.pr=0;--wa>0;)j["xn"+wa]=0,j["xs"+wa]="";j.xs0="",j._next=j._prev=j.xfirst=j.data=j.plugin=j.setRatio=j.rxp=null,j.appendXtra=function(a,b,c,d,e,f){var g=this,h=g.l;return g["xs"+h]+=f&&(h||g["xs"+h])?" "+a:a||"",c||0===h||g.plugin?(g.l++,g.type=g.setRatio?2:1,g["xs"+g.l]=d||"",h>0?(g.data["xn"+h]=b+c,g.rxp["xn"+h]=e,g["xn"+h]=b,g.plugin||(g.xfirst=new ta(g,"xn"+h,b,c,g.xfirst||g,0,g.n,e,g.pr),g.xfirst.xs0=0),g):(g.data={s:b+c},g.rxp={},g.s=b,g.c=c,g.r=e,g)):(g["xs"+h]+=b+(d||""),g)};var xa=function(a,b){b=b||{},this.p=b.prefix?Z(a)||a:a,i[a]=i[this.p]=this,this.format=b.formatter||qa(b.defaultValue,b.color,b.collapsible,b.multi),b.parser&&(this.parse=b.parser),this.clrs=b.color,this.multi=b.multi,this.keyword=b.keyword,this.dflt=b.defaultValue,this.pr=b.priority||0},ya=S._registerComplexSpecialProp=function(a,b,c){"object"!=typeof b&&(b={parser:c});var d,e,f=a.split(","),g=b.defaultValue;for(c=c||[g],d=0;d<f.length;d++)b.prefix=0===d&&b.prefix,b.defaultValue=c[d]||g,e=new xa(f[d],b)},za=S._registerPluginProp=function(a){if(!i[a]){var b=a.charAt(0).toUpperCase()+a.substr(1)+"Plugin";ya(a,{parser:function(a,c,d,e,f,g,j){var k=h.com.greensock.plugins[b];return k?(k._cssRegister(),i[d].parse(a,c,d,e,f,g,j)):(W("Error: "+b+" js file not loaded."),f)}})}};j=xa.prototype,j.parseComplex=function(a,b,c,d,e,f){var g,h,i,j,k,l,m=this.keyword;if(this.multi&&(I.test(c)||I.test(b)?(h=b.replace(I,"|").split("|"),i=c.replace(I,"|").split("|")):m&&(h=[b],i=[c])),i){for(j=i.length>h.length?i.length:h.length,g=0;j>g;g++)b=h[g]=h[g]||this.dflt,c=i[g]=i[g]||this.dflt,m&&(k=b.indexOf(m),l=c.indexOf(m),k!==l&&(-1===l?h[g]=h[g].split(m).join(""):-1===k&&(h[g]+=" "+m)));b=h.join(", "),c=i.join(", ")}return va(a,this.p,b,c,this.clrs,this.dflt,d,this.pr,e,f)},j.parse=function(a,b,c,d,f,g,h){return this.parseComplex(a.style,this.format(_(a,this.p,e,!1,this.dflt)),this.format(b),f,g)},g.registerSpecialProp=function(a,b,c){ya(a,{parser:function(a,d,e,f,g,h,i){var j=new ta(a,e,0,0,g,2,e,!1,c);return j.plugin=h,j.setRatio=b(a,d,f._tween,e),j},priority:c})},g.useSVGTransformAttr=!0;var Aa,Ba="scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),Ca=Z("transform"),Da=X+"transform",Ea=Z("transformOrigin"),Fa=null!==Z("perspective"),Ga=S.Transform=function(){this.perspective=parseFloat(g.defaultTransformPerspective)||0,this.force3D=g.defaultForce3D!==!1&&Fa?g.defaultForce3D||"auto":!1},Ha=_gsScope.SVGElement,Ia=function(a,b,c){var d,e=O.createElementNS("http://www.w3.org/2000/svg",a),f=/([a-z])([A-Z])/g;for(d in c)e.setAttributeNS(null,d.replace(f,"$1-$2").toLowerCase(),c[d]);return b.appendChild(e),e},Ja=O.documentElement||{},Ka=function(){var a,b,c,d=p||/Android/i.test(T)&&!_gsScope.chrome;return O.createElementNS&&!d&&(a=Ia("svg",Ja),b=Ia("rect",a,{width:100,height:50,x:100}),c=b.getBoundingClientRect().width,b.style[Ea]="50% 50%",b.style[Ca]="scaleX(0.5)",d=c===b.getBoundingClientRect().width&&!(n&&Fa),Ja.removeChild(a)),d}(),La=function(a,b,c,d,e,f){var h,i,j,k,l,m,n,o,p,q,r,s,t,u,v=a._gsTransform,w=Qa(a,!0);v&&(t=v.xOrigin,u=v.yOrigin),(!d||(h=d.split(" ")).length<2)&&(n=a.getBBox(),0===n.x&&0===n.y&&n.width+n.height===0&&(n={x:parseFloat(a.hasAttribute("x")?a.getAttribute("x"):a.hasAttribute("cx")?a.getAttribute("cx"):0)||0,y:parseFloat(a.hasAttribute("y")?a.getAttribute("y"):a.hasAttribute("cy")?a.getAttribute("cy"):0)||0,width:0,height:0}),b=ha(b).split(" "),h=[(-1!==b[0].indexOf("%")?parseFloat(b[0])/100*n.width:parseFloat(b[0]))+n.x,(-1!==b[1].indexOf("%")?parseFloat(b[1])/100*n.height:parseFloat(b[1]))+n.y]),c.xOrigin=k=parseFloat(h[0]),c.yOrigin=l=parseFloat(h[1]),d&&w!==Pa&&(m=w[0],n=w[1],o=w[2],p=w[3],q=w[4],r=w[5],s=m*p-n*o,s&&(i=k*(p/s)+l*(-o/s)+(o*r-p*q)/s,j=k*(-n/s)+l*(m/s)-(m*r-n*q)/s,k=c.xOrigin=h[0]=i,l=c.yOrigin=h[1]=j)),v&&(f&&(c.xOffset=v.xOffset,c.yOffset=v.yOffset,v=c),e||e!==!1&&g.defaultSmoothOrigin!==!1?(i=k-t,j=l-u,v.xOffset+=i*w[0]+j*w[2]-i,v.yOffset+=i*w[1]+j*w[3]-j):v.xOffset=v.yOffset=0),f||a.setAttribute("data-svg-origin",h.join(" "))},Ma=function(a){var b,c=P("svg",this.ownerSVGElement&&this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),d=this.parentNode,e=this.nextSibling,f=this.style.cssText;if(Ja.appendChild(c),c.appendChild(this),this.style.display="block",a)try{b=this.getBBox(),this._originalGetBBox=this.getBBox,this.getBBox=Ma}catch(g){}else this._originalGetBBox&&(b=this._originalGetBBox());return e?d.insertBefore(this,e):d.appendChild(this),Ja.removeChild(c),this.style.cssText=f,b},Na=function(a){try{return a.getBBox()}catch(b){return Ma.call(a,!0)}},Oa=function(a){return!(!Ha||!a.getCTM||a.parentNode&&!a.ownerSVGElement||!Na(a))},Pa=[1,0,0,1,0,0],Qa=function(a,b){var c,d,e,f,g,h,i=a._gsTransform||new Ga,j=1e5,k=a.style;if(Ca?d=_(a,Da,null,!0):a.currentStyle&&(d=a.currentStyle.filter.match(G),d=d&&4===d.length?[d[0].substr(4),Number(d[2].substr(4)),Number(d[1].substr(4)),d[3].substr(4),i.x||0,i.y||0].join(","):""),c=!d||"none"===d||"matrix(1, 0, 0, 1, 0, 0)"===d,!Ca||!(h=!$(a)||"none"===$(a).display)&&a.parentNode||(h&&(f=k.display,k.display="block"),a.parentNode||(g=1,Ja.appendChild(a)),d=_(a,Da,null,!0),c=!d||"none"===d||"matrix(1, 0, 0, 1, 0, 0)"===d,f?k.display=f:h&&Va(k,"display"),g&&Ja.removeChild(a)),(i.svg||a.getCTM&&Oa(a))&&(c&&-1!==(k[Ca]+"").indexOf("matrix")&&(d=k[Ca],c=0),e=a.getAttribute("transform"),c&&e&&(e=a.transform.baseVal.consolidate().matrix,d="matrix("+e.a+","+e.b+","+e.c+","+e.d+","+e.e+","+e.f+")",c=0)),c)return Pa;for(e=(d||"").match(s)||[],wa=e.length;--wa>-1;)f=Number(e[wa]),e[wa]=(g=f-(f|=0))?(g*j+(0>g?-.5:.5)|0)/j+f:f;return b&&e.length>6?[e[0],e[1],e[4],e[5],e[12],e[13]]:e},Ra=S.getTransform=function(a,c,d,e){if(a._gsTransform&&d&&!e)return a._gsTransform;var f,h,i,j,k,l,m=d?a._gsTransform||new Ga:new Ga,n=m.scaleX<0,o=2e-5,p=1e5,q=Fa?parseFloat(_(a,Ea,c,!1,"0 0 0").split(" ")[2])||m.zOrigin||0:0,r=parseFloat(g.defaultTransformPerspective)||0;if(m.svg=!(!a.getCTM||!Oa(a)),m.svg&&(La(a,_(a,Ea,c,!1,"50% 50%")+"",m,a.getAttribute("data-svg-origin")),Aa=g.useSVGTransformAttr||Ka),f=Qa(a),f!==Pa){if(16===f.length){var s,t,u,v,w,x=f[0],y=f[1],z=f[2],A=f[3],B=f[4],C=f[5],D=f[6],E=f[7],F=f[8],G=f[9],H=f[10],I=f[12],J=f[13],K=f[14],M=f[11],N=Math.atan2(D,H);m.zOrigin&&(K=-m.zOrigin,I=F*K-f[12],J=G*K-f[13],K=H*K+m.zOrigin-f[14]),m.rotationX=N*L,N&&(v=Math.cos(-N),w=Math.sin(-N),s=B*v+F*w,t=C*v+G*w,u=D*v+H*w,F=B*-w+F*v,G=C*-w+G*v,H=D*-w+H*v,M=E*-w+M*v,B=s,C=t,D=u),N=Math.atan2(-z,H),m.rotationY=N*L,N&&(v=Math.cos(-N),w=Math.sin(-N),s=x*v-F*w,t=y*v-G*w,u=z*v-H*w,G=y*w+G*v,H=z*w+H*v,M=A*w+M*v,x=s,y=t,z=u),N=Math.atan2(y,x),m.rotation=N*L,N&&(v=Math.cos(N),w=Math.sin(N),s=x*v+y*w,t=B*v+C*w,u=F*v+G*w,y=y*v-x*w,C=C*v-B*w,G=G*v-F*w,x=s,B=t,F=u),m.rotationX&&Math.abs(m.rotationX)+Math.abs(m.rotation)>359.9&&(m.rotationX=m.rotation=0,m.rotationY=180-m.rotationY),N=Math.atan2(B,C),m.scaleX=(Math.sqrt(x*x+y*y+z*z)*p+.5|0)/p,m.scaleY=(Math.sqrt(C*C+D*D)*p+.5|0)/p,m.scaleZ=(Math.sqrt(F*F+G*G+H*H)*p+.5|0)/p,x/=m.scaleX,B/=m.scaleY,y/=m.scaleX,C/=m.scaleY,Math.abs(N)>o?(m.skewX=N*L,B=0,"simple"!==m.skewType&&(m.scaleY*=1/Math.cos(N))):m.skewX=0,m.perspective=M?1/(0>M?-M:M):0,m.x=I,m.y=J,m.z=K,m.svg&&(m.x-=m.xOrigin-(m.xOrigin*x-m.yOrigin*B),m.y-=m.yOrigin-(m.yOrigin*y-m.xOrigin*C))}else if(!Fa||e||!f.length||m.x!==f[4]||m.y!==f[5]||!m.rotationX&&!m.rotationY){var O=f.length>=6,P=O?f[0]:1,Q=f[1]||0,R=f[2]||0,S=O?f[3]:1;m.x=f[4]||0,m.y=f[5]||0,i=Math.sqrt(P*P+Q*Q),j=Math.sqrt(S*S+R*R),k=P||Q?Math.atan2(Q,P)*L:m.rotation||0,l=R||S?Math.atan2(R,S)*L+k:m.skewX||0,m.scaleX=i,m.scaleY=j,m.rotation=k,m.skewX=l,Fa&&(m.rotationX=m.rotationY=m.z=0,m.perspective=r,m.scaleZ=1),m.svg&&(m.x-=m.xOrigin-(m.xOrigin*P+m.yOrigin*R),m.y-=m.yOrigin-(m.xOrigin*Q+m.yOrigin*S))}Math.abs(m.skewX)>90&&Math.abs(m.skewX)<270&&(n?(m.scaleX*=-1,m.skewX+=m.rotation<=0?180:-180,m.rotation+=m.rotation<=0?180:-180):(m.scaleY*=-1,m.skewX+=m.skewX<=0?180:-180)),m.zOrigin=q;for(h in m)m[h]<o&&m[h]>-o&&(m[h]=0)}return d&&(a._gsTransform=m,m.svg&&(Aa&&a.style[Ca]?b.delayedCall(.001,function(){Va(a.style,Ca)}):!Aa&&a.getAttribute("transform")&&b.delayedCall(.001,function(){a.removeAttribute("transform")}))),m},Sa=function(a){var b,c,d=this.data,e=-d.rotation*K,f=e+d.skewX*K,g=1e5,h=(Math.cos(e)*d.scaleX*g|0)/g,i=(Math.sin(e)*d.scaleX*g|0)/g,j=(Math.sin(f)*-d.scaleY*g|0)/g,k=(Math.cos(f)*d.scaleY*g|0)/g,l=this.t.style,m=this.t.currentStyle;if(m){c=i,i=-j,j=-c,b=m.filter,l.filter="";var n,o,q=this.t.offsetWidth,r=this.t.offsetHeight,s="absolute"!==m.position,t="progid:DXImageTransform.Microsoft.Matrix(M11="+h+", M12="+i+", M21="+j+", M22="+k,u=d.x+q*d.xPercent/100,v=d.y+r*d.yPercent/100;if(null!=d.ox&&(n=(d.oxp?q*d.ox*.01:d.ox)-q/2,o=(d.oyp?r*d.oy*.01:d.oy)-r/2,u+=n-(n*h+o*i),v+=o-(n*j+o*k)),s?(n=q/2,o=r/2,t+=", Dx="+(n-(n*h+o*i)+u)+", Dy="+(o-(n*j+o*k)+v)+")"):t+=", sizingMethod='auto expand')",-1!==b.indexOf("DXImageTransform.Microsoft.Matrix(")?l.filter=b.replace(H,t):l.filter=t+" "+b,(0===a||1===a)&&1===h&&0===i&&0===j&&1===k&&(s&&-1===t.indexOf("Dx=0, Dy=0")||x.test(b)&&100!==parseFloat(RegExp.$1)||-1===b.indexOf(b.indexOf("Alpha"))&&l.removeAttribute("filter")),!s){var y,z,A,B=8>p?1:-1;for(n=d.ieOffsetX||0,o=d.ieOffsetY||0,d.ieOffsetX=Math.round((q-((0>h?-h:h)*q+(0>i?-i:i)*r))/2+u),d.ieOffsetY=Math.round((r-((0>k?-k:k)*r+(0>j?-j:j)*q))/2+v),wa=0;4>wa;wa++)z=fa[wa],y=m[z],c=-1!==y.indexOf("px")?parseFloat(y):aa(this.t,z,parseFloat(y),y.replace(w,""))||0,A=c!==d[z]?2>wa?-d.ieOffsetX:-d.ieOffsetY:2>wa?n-d.ieOffsetX:o-d.ieOffsetY,l[z]=(d[z]=Math.round(c-A*(0===wa||2===wa?1:B)))+"px"}}},Ta=S.set3DTransformRatio=S.setTransformRatio=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,o,p,q,r,s,t,u,v,w,x,y,z=this.data,A=this.t.style,B=z.rotation,C=z.rotationX,D=z.rotationY,E=z.scaleX,F=z.scaleY,G=z.scaleZ,H=z.x,I=z.y,J=z.z,L=z.svg,M=z.perspective,N=z.force3D,O=z.skewY,P=z.skewX;if(O&&(P+=O,B+=O),((1===a||0===a)&&"auto"===N&&(this.tween._totalTime===this.tween._totalDuration||!this.tween._totalTime)||!N)&&!J&&!M&&!D&&!C&&1===G||Aa&&L||!Fa)return void(B||P||L?(B*=K,x=P*K,y=1e5,c=Math.cos(B)*E,f=Math.sin(B)*E,d=Math.sin(B-x)*-F,g=Math.cos(B-x)*F,x&&"simple"===z.skewType&&(b=Math.tan(x-O*K),b=Math.sqrt(1+b*b),d*=b,g*=b,O&&(b=Math.tan(O*K),b=Math.sqrt(1+b*b),c*=b,f*=b)),L&&(H+=z.xOrigin-(z.xOrigin*c+z.yOrigin*d)+z.xOffset,I+=z.yOrigin-(z.xOrigin*f+z.yOrigin*g)+z.yOffset,Aa&&(z.xPercent||z.yPercent)&&(q=this.t.getBBox(),H+=.01*z.xPercent*q.width,I+=.01*z.yPercent*q.height),q=1e-6,q>H&&H>-q&&(H=0),q>I&&I>-q&&(I=0)),u=(c*y|0)/y+","+(f*y|0)/y+","+(d*y|0)/y+","+(g*y|0)/y+","+H+","+I+")",L&&Aa?this.t.setAttribute("transform","matrix("+u):A[Ca]=(z.xPercent||z.yPercent?"translate("+z.xPercent+"%,"+z.yPercent+"%) matrix(":"matrix(")+u):A[Ca]=(z.xPercent||z.yPercent?"translate("+z.xPercent+"%,"+z.yPercent+"%) matrix(":"matrix(")+E+",0,0,"+F+","+H+","+I+")");if(n&&(q=1e-4,q>E&&E>-q&&(E=G=2e-5),q>F&&F>-q&&(F=G=2e-5),!M||z.z||z.rotationX||z.rotationY||(M=0)),B||P)B*=K,r=c=Math.cos(B),s=f=Math.sin(B),P&&(B-=P*K,r=Math.cos(B),s=Math.sin(B),"simple"===z.skewType&&(b=Math.tan((P-O)*K),b=Math.sqrt(1+b*b),r*=b,s*=b,z.skewY&&(b=Math.tan(O*K),b=Math.sqrt(1+b*b),c*=b,f*=b))),d=-s,g=r;else{if(!(D||C||1!==G||M||L))return void(A[Ca]=(z.xPercent||z.yPercent?"translate("+z.xPercent+"%,"+z.yPercent+"%) translate3d(":"translate3d(")+H+"px,"+I+"px,"+J+"px)"+(1!==E||1!==F?" scale("+E+","+F+")":""));c=g=1,d=f=0}k=1,e=h=i=j=l=m=0,o=M?-1/M:0,p=z.zOrigin,q=1e-6,v=",",w="0",B=D*K,B&&(r=Math.cos(B),s=Math.sin(B),i=-s,l=o*-s,e=c*s,h=f*s,k=r,o*=r,c*=r,f*=r),B=C*K,B&&(r=Math.cos(B),s=Math.sin(B),b=d*r+e*s,t=g*r+h*s,j=k*s,m=o*s,e=d*-s+e*r,h=g*-s+h*r,k*=r,o*=r,d=b,g=t),1!==G&&(e*=G,h*=G,k*=G,o*=G),1!==F&&(d*=F,g*=F,j*=F,m*=F),1!==E&&(c*=E,f*=E,i*=E,l*=E),(p||L)&&(p&&(H+=e*-p,I+=h*-p,J+=k*-p+p),L&&(H+=z.xOrigin-(z.xOrigin*c+z.yOrigin*d)+z.xOffset,I+=z.yOrigin-(z.xOrigin*f+z.yOrigin*g)+z.yOffset),q>H&&H>-q&&(H=w),q>I&&I>-q&&(I=w),q>J&&J>-q&&(J=0)),u=z.xPercent||z.yPercent?"translate("+z.xPercent+"%,"+z.yPercent+"%) matrix3d(":"matrix3d(",u+=(q>c&&c>-q?w:c)+v+(q>f&&f>-q?w:f)+v+(q>i&&i>-q?w:i),u+=v+(q>l&&l>-q?w:l)+v+(q>d&&d>-q?w:d)+v+(q>g&&g>-q?w:g),C||D||1!==G?(u+=v+(q>j&&j>-q?w:j)+v+(q>m&&m>-q?w:m)+v+(q>e&&e>-q?w:e),u+=v+(q>h&&h>-q?w:h)+v+(q>k&&k>-q?w:k)+v+(q>o&&o>-q?w:o)+v):u+=",0,0,0,0,1,0,",u+=H+v+I+v+J+v+(M?1+-J/M:1)+")",A[Ca]=u;
};j=Ga.prototype,j.x=j.y=j.z=j.skewX=j.skewY=j.rotation=j.rotationX=j.rotationY=j.zOrigin=j.xPercent=j.yPercent=j.xOffset=j.yOffset=0,j.scaleX=j.scaleY=j.scaleZ=1,ya("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin",{parser:function(a,b,c,d,f,h,i){if(d._lastParsedTransform===i)return f;d._lastParsedTransform=i;var j,k=i.scale&&"function"==typeof i.scale?i.scale:0;"function"==typeof i[c]&&(j=i[c],i[c]=b),k&&(i.scale=k(r,a));var l,m,n,o,p,s,t,u,v,w=a._gsTransform,x=a.style,y=1e-6,z=Ba.length,A=i,B={},C="transformOrigin",D=Ra(a,e,!0,A.parseTransform),E=A.transform&&("function"==typeof A.transform?A.transform(r,q):A.transform);if(D.skewType=A.skewType||D.skewType||g.defaultSkewType,d._transform=D,"rotationZ"in A&&(A.rotation=A.rotationZ),E&&"string"==typeof E&&Ca)m=Q.style,m[Ca]=E,m.display="block",m.position="absolute",-1!==E.indexOf("%")&&(m.width=_(a,"width"),m.height=_(a,"height")),O.body.appendChild(Q),l=Ra(Q,null,!1),"simple"===D.skewType&&(l.scaleY*=Math.cos(l.skewX*K)),D.svg&&(s=D.xOrigin,t=D.yOrigin,l.x-=D.xOffset,l.y-=D.yOffset,(A.transformOrigin||A.svgOrigin)&&(E={},La(a,ha(A.transformOrigin),E,A.svgOrigin,A.smoothOrigin,!0),s=E.xOrigin,t=E.yOrigin,l.x-=E.xOffset-D.xOffset,l.y-=E.yOffset-D.yOffset),(s||t)&&(u=Qa(Q,!0),l.x-=s-(s*u[0]+t*u[2]),l.y-=t-(s*u[1]+t*u[3]))),O.body.removeChild(Q),l.perspective||(l.perspective=D.perspective),null!=A.xPercent&&(l.xPercent=ja(A.xPercent,D.xPercent)),null!=A.yPercent&&(l.yPercent=ja(A.yPercent,D.yPercent));else if("object"==typeof A){if(l={scaleX:ja(null!=A.scaleX?A.scaleX:A.scale,D.scaleX),scaleY:ja(null!=A.scaleY?A.scaleY:A.scale,D.scaleY),scaleZ:ja(A.scaleZ,D.scaleZ),x:ja(A.x,D.x),y:ja(A.y,D.y),z:ja(A.z,D.z),xPercent:ja(A.xPercent,D.xPercent),yPercent:ja(A.yPercent,D.yPercent),perspective:ja(A.transformPerspective,D.perspective)},p=A.directionalRotation,null!=p)if("object"==typeof p)for(m in p)A[m]=p[m];else A.rotation=p;"string"==typeof A.x&&-1!==A.x.indexOf("%")&&(l.x=0,l.xPercent=ja(A.x,D.xPercent)),"string"==typeof A.y&&-1!==A.y.indexOf("%")&&(l.y=0,l.yPercent=ja(A.y,D.yPercent)),l.rotation=ka("rotation"in A?A.rotation:"shortRotation"in A?A.shortRotation+"_short":D.rotation,D.rotation,"rotation",B),Fa&&(l.rotationX=ka("rotationX"in A?A.rotationX:"shortRotationX"in A?A.shortRotationX+"_short":D.rotationX||0,D.rotationX,"rotationX",B),l.rotationY=ka("rotationY"in A?A.rotationY:"shortRotationY"in A?A.shortRotationY+"_short":D.rotationY||0,D.rotationY,"rotationY",B)),l.skewX=ka(A.skewX,D.skewX),l.skewY=ka(A.skewY,D.skewY)}for(Fa&&null!=A.force3D&&(D.force3D=A.force3D,o=!0),n=D.force3D||D.z||D.rotationX||D.rotationY||l.z||l.rotationX||l.rotationY||l.perspective,n||null==A.scale||(l.scaleZ=1);--z>-1;)v=Ba[z],E=l[v]-D[v],(E>y||-y>E||null!=A[v]||null!=M[v])&&(o=!0,f=new ta(D,v,D[v],E,f),v in B&&(f.e=B[v]),f.xs0=0,f.plugin=h,d._overwriteProps.push(f.n));return E=A.transformOrigin,D.svg&&(E||A.svgOrigin)&&(s=D.xOffset,t=D.yOffset,La(a,ha(E),l,A.svgOrigin,A.smoothOrigin),f=ua(D,"xOrigin",(w?D:l).xOrigin,l.xOrigin,f,C),f=ua(D,"yOrigin",(w?D:l).yOrigin,l.yOrigin,f,C),(s!==D.xOffset||t!==D.yOffset)&&(f=ua(D,"xOffset",w?s:D.xOffset,D.xOffset,f,C),f=ua(D,"yOffset",w?t:D.yOffset,D.yOffset,f,C)),E="0px 0px"),(E||Fa&&n&&D.zOrigin)&&(Ca?(o=!0,v=Ea,E=(E||_(a,v,e,!1,"50% 50%"))+"",f=new ta(x,v,0,0,f,-1,C),f.b=x[v],f.plugin=h,Fa?(m=D.zOrigin,E=E.split(" "),D.zOrigin=(E.length>2&&(0===m||"0px"!==E[2])?parseFloat(E[2]):m)||0,f.xs0=f.e=E[0]+" "+(E[1]||"50%")+" 0px",f=new ta(D,"zOrigin",0,0,f,-1,f.n),f.b=m,f.xs0=f.e=D.zOrigin):f.xs0=f.e=E):ha(E+"",D)),o&&(d._transformType=D.svg&&Aa||!n&&3!==this._transformType?2:3),j&&(i[c]=j),k&&(i.scale=k),f},prefix:!0}),ya("boxShadow",{defaultValue:"0px 0px 0px 0px #999",prefix:!0,color:!0,multi:!0,keyword:"inset"}),ya("borderRadius",{defaultValue:"0px",parser:function(a,b,c,f,g,h){b=this.format(b);var i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],z=a.style;for(q=parseFloat(a.offsetWidth),r=parseFloat(a.offsetHeight),i=b.split(" "),j=0;j<y.length;j++)this.p.indexOf("border")&&(y[j]=Z(y[j])),m=l=_(a,y[j],e,!1,"0px"),-1!==m.indexOf(" ")&&(l=m.split(" "),m=l[0],l=l[1]),n=k=i[j],o=parseFloat(m),t=m.substr((o+"").length),u="="===n.charAt(1),u?(p=parseInt(n.charAt(0)+"1",10),n=n.substr(2),p*=parseFloat(n),s=n.substr((p+"").length-(0>p?1:0))||""):(p=parseFloat(n),s=n.substr((p+"").length)),""===s&&(s=d[c]||t),s!==t&&(v=aa(a,"borderLeft",o,t),w=aa(a,"borderTop",o,t),"%"===s?(m=v/q*100+"%",l=w/r*100+"%"):"em"===s?(x=aa(a,"borderLeft",1,"em"),m=v/x+"em",l=w/x+"em"):(m=v+"px",l=w+"px"),u&&(n=parseFloat(m)+p+s,k=parseFloat(l)+p+s)),g=va(z,y[j],m+" "+l,n+" "+k,!1,"0px",g);return g},prefix:!0,formatter:qa("0px 0px 0px 0px",!1,!0)}),ya("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius",{defaultValue:"0px",parser:function(a,b,c,d,f,g){return va(a.style,c,this.format(_(a,c,e,!1,"0px 0px")),this.format(b),!1,"0px",f)},prefix:!0,formatter:qa("0px 0px",!1,!0)}),ya("backgroundPosition",{defaultValue:"0 0",parser:function(a,b,c,d,f,g){var h,i,j,k,l,m,n="background-position",o=e||$(a,null),q=this.format((o?p?o.getPropertyValue(n+"-x")+" "+o.getPropertyValue(n+"-y"):o.getPropertyValue(n):a.currentStyle.backgroundPositionX+" "+a.currentStyle.backgroundPositionY)||"0 0"),r=this.format(b);if(-1!==q.indexOf("%")!=(-1!==r.indexOf("%"))&&r.split(",").length<2&&(m=_(a,"backgroundImage").replace(D,""),m&&"none"!==m)){for(h=q.split(" "),i=r.split(" "),R.setAttribute("src",m),j=2;--j>-1;)q=h[j],k=-1!==q.indexOf("%"),k!==(-1!==i[j].indexOf("%"))&&(l=0===j?a.offsetWidth-R.width:a.offsetHeight-R.height,h[j]=k?parseFloat(q)/100*l+"px":parseFloat(q)/l*100+"%");q=h.join(" ")}return this.parseComplex(a.style,q,r,f,g)},formatter:ha}),ya("backgroundSize",{defaultValue:"0 0",formatter:function(a){return a+="","co"===a.substr(0,2)?a:ha(-1===a.indexOf(" ")?a+" "+a:a)}}),ya("perspective",{defaultValue:"0px",prefix:!0}),ya("perspectiveOrigin",{defaultValue:"50% 50%",prefix:!0}),ya("transformStyle",{prefix:!0}),ya("backfaceVisibility",{prefix:!0}),ya("userSelect",{prefix:!0}),ya("margin",{parser:ra("marginTop,marginRight,marginBottom,marginLeft")}),ya("padding",{parser:ra("paddingTop,paddingRight,paddingBottom,paddingLeft")}),ya("clip",{defaultValue:"rect(0px,0px,0px,0px)",parser:function(a,b,c,d,f,g){var h,i,j;return 9>p?(i=a.currentStyle,j=8>p?" ":",",h="rect("+i.clipTop+j+i.clipRight+j+i.clipBottom+j+i.clipLeft+")",b=this.format(b).split(",").join(j)):(h=this.format(_(a,this.p,e,!1,this.dflt)),b=this.format(b)),this.parseComplex(a.style,h,b,f,g)}}),ya("textShadow",{defaultValue:"0px 0px 0px #999",color:!0,multi:!0}),ya("autoRound,strictUnits",{parser:function(a,b,c,d,e){return e}}),ya("border",{defaultValue:"0px solid #000",parser:function(a,b,c,d,f,g){var h=_(a,"borderTopWidth",e,!1,"0px"),i=this.format(b).split(" "),j=i[0].replace(w,"");return"px"!==j&&(h=parseFloat(h)/aa(a,"borderTopWidth",1,j)+j),this.parseComplex(a.style,this.format(h+" "+_(a,"borderTopStyle",e,!1,"solid")+" "+_(a,"borderTopColor",e,!1,"#000")),i.join(" "),f,g)},color:!0,formatter:function(a){var b=a.split(" ");return b[0]+" "+(b[1]||"solid")+" "+(a.match(pa)||["#000"])[0]}}),ya("borderWidth",{parser:ra("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}),ya("float,cssFloat,styleFloat",{parser:function(a,b,c,d,e,f){var g=a.style,h="cssFloat"in g?"cssFloat":"styleFloat";return new ta(g,h,0,0,e,-1,c,!1,0,g[h],b)}});var Ua=function(a){var b,c=this.t,d=c.filter||_(this.data,"filter")||"",e=this.s+this.c*a|0;100===e&&(-1===d.indexOf("atrix(")&&-1===d.indexOf("radient(")&&-1===d.indexOf("oader(")?(c.removeAttribute("filter"),b=!_(this.data,"filter")):(c.filter=d.replace(z,""),b=!0)),b||(this.xn1&&(c.filter=d=d||"alpha(opacity="+e+")"),-1===d.indexOf("pacity")?0===e&&this.xn1||(c.filter=d+" alpha(opacity="+e+")"):c.filter=d.replace(x,"opacity="+e))};ya("opacity,alpha,autoAlpha",{defaultValue:"1",parser:function(a,b,c,d,f,g){var h=parseFloat(_(a,"opacity",e,!1,"1")),i=a.style,j="autoAlpha"===c;return"string"==typeof b&&"="===b.charAt(1)&&(b=("-"===b.charAt(0)?-1:1)*parseFloat(b.substr(2))+h),j&&1===h&&"hidden"===_(a,"visibility",e)&&0!==b&&(h=0),U?f=new ta(i,"opacity",h,b-h,f):(f=new ta(i,"opacity",100*h,100*(b-h),f),f.xn1=j?1:0,i.zoom=1,f.type=2,f.b="alpha(opacity="+f.s+")",f.e="alpha(opacity="+(f.s+f.c)+")",f.data=a,f.plugin=g,f.setRatio=Ua),j&&(f=new ta(i,"visibility",0,0,f,-1,null,!1,0,0!==h?"inherit":"hidden",0===b?"hidden":"inherit"),f.xs0="inherit",d._overwriteProps.push(f.n),d._overwriteProps.push(c)),f}});var Va=function(a,b){b&&(a.removeProperty?(("ms"===b.substr(0,2)||"webkit"===b.substr(0,6))&&(b="-"+b),a.removeProperty(b.replace(B,"-$1").toLowerCase())):a.removeAttribute(b))},Wa=function(a){if(this.t._gsClassPT=this,1===a||0===a){this.t.setAttribute("class",0===a?this.b:this.e);for(var b=this.data,c=this.t.style;b;)b.v?c[b.p]=b.v:Va(c,b.p),b=b._next;1===a&&this.t._gsClassPT===this&&(this.t._gsClassPT=null)}else this.t.getAttribute("class")!==this.e&&this.t.setAttribute("class",this.e)};ya("className",{parser:function(a,b,d,f,g,h,i){var j,k,l,m,n,o=a.getAttribute("class")||"",p=a.style.cssText;if(g=f._classNamePT=new ta(a,d,0,0,g,2),g.setRatio=Wa,g.pr=-11,c=!0,g.b=o,k=ca(a,e),l=a._gsClassPT){for(m={},n=l.data;n;)m[n.p]=1,n=n._next;l.setRatio(1)}return a._gsClassPT=g,g.e="="!==b.charAt(1)?b:o.replace(new RegExp("(?:\\s|^)"+b.substr(2)+"(?![\\w-])"),"")+("+"===b.charAt(0)?" "+b.substr(2):""),a.setAttribute("class",g.e),j=da(a,k,ca(a),i,m),a.setAttribute("class",o),g.data=j.firstMPT,a.style.cssText=p,g=g.xfirst=f.parse(a,j.difs,g,h)}});var Xa=function(a){if((1===a||0===a)&&this.data._totalTime===this.data._totalDuration&&"isFromStart"!==this.data.data){var b,c,d,e,f,g=this.t.style,h=i.transform.parse;if("all"===this.e)g.cssText="",e=!0;else for(b=this.e.split(" ").join("").split(","),d=b.length;--d>-1;)c=b[d],i[c]&&(i[c].parse===h?e=!0:c="transformOrigin"===c?Ea:i[c].p),Va(g,c);e&&(Va(g,Ca),f=this.t._gsTransform,f&&(f.svg&&(this.t.removeAttribute("data-svg-origin"),this.t.removeAttribute("transform")),delete this.t._gsTransform))}};for(ya("clearProps",{parser:function(a,b,d,e,f){return f=new ta(a,d,0,0,f,2),f.setRatio=Xa,f.e=b,f.pr=-10,f.data=e._tween,c=!0,f}}),j="bezier,throwProps,physicsProps,physics2D".split(","),wa=j.length;wa--;)za(j[wa]);j=g.prototype,j._firstPT=j._lastParsedTransform=j._transform=null,j._onInitTween=function(a,b,h,j){if(!a.nodeType)return!1;this._target=q=a,this._tween=h,this._vars=b,r=j,k=b.autoRound,c=!1,d=b.suffixMap||g.suffixMap,e=$(a,""),f=this._overwriteProps;var n,p,s,t,u,v,w,x,z,A=a.style;if(l&&""===A.zIndex&&(n=_(a,"zIndex",e),("auto"===n||""===n)&&this._addLazySet(A,"zIndex",0)),"string"==typeof b&&(t=A.cssText,n=ca(a,e),A.cssText=t+";"+b,n=da(a,n,ca(a)).difs,!U&&y.test(b)&&(n.opacity=parseFloat(RegExp.$1)),b=n,A.cssText=t),b.className?this._firstPT=p=i.className.parse(a,b.className,"className",this,null,null,b):this._firstPT=p=this.parse(a,b,null),this._transformType){for(z=3===this._transformType,Ca?m&&(l=!0,""===A.zIndex&&(w=_(a,"zIndex",e),("auto"===w||""===w)&&this._addLazySet(A,"zIndex",0)),o&&this._addLazySet(A,"WebkitBackfaceVisibility",this._vars.WebkitBackfaceVisibility||(z?"visible":"hidden"))):A.zoom=1,s=p;s&&s._next;)s=s._next;x=new ta(a,"transform",0,0,null,2),this._linkCSSP(x,null,s),x.setRatio=Ca?Ta:Sa,x.data=this._transform||Ra(a,e,!0),x.tween=h,x.pr=-1,f.pop()}if(c){for(;p;){for(v=p._next,s=t;s&&s.pr>p.pr;)s=s._next;(p._prev=s?s._prev:u)?p._prev._next=p:t=p,(p._next=s)?s._prev=p:u=p,p=v}this._firstPT=t}return!0},j.parse=function(a,b,c,f){var g,h,j,l,m,n,o,p,s,t,u=a.style;for(g in b){if(n=b[g],"function"==typeof n&&(n=n(r,q)),h=i[g])c=h.parse(a,n,g,this,c,f,b);else{if("--"===g.substr(0,2)){this._tween._propLookup[g]=this._addTween.call(this._tween,a.style,"setProperty",$(a).getPropertyValue(g)+"",n+"",g,!1,g);continue}m=_(a,g,e)+"",s="string"==typeof n,"color"===g||"fill"===g||"stroke"===g||-1!==g.indexOf("Color")||s&&A.test(n)?(s||(n=na(n),n=(n.length>3?"rgba(":"rgb(")+n.join(",")+")"),c=va(u,g,m,n,!0,"transparent",c,0,f)):s&&J.test(n)?c=va(u,g,m,n,!0,null,c,0,f):(j=parseFloat(m),o=j||0===j?m.substr((j+"").length):"",(""===m||"auto"===m)&&("width"===g||"height"===g?(j=ga(a,g,e),o="px"):"left"===g||"top"===g?(j=ba(a,g,e),o="px"):(j="opacity"!==g?0:1,o="")),t=s&&"="===n.charAt(1),t?(l=parseInt(n.charAt(0)+"1",10),n=n.substr(2),l*=parseFloat(n),p=n.replace(w,"")):(l=parseFloat(n),p=s?n.replace(w,""):""),""===p&&(p=g in d?d[g]:o),n=l||0===l?(t?l+j:l)+p:b[g],o!==p&&(""!==p||"lineHeight"===g)&&(l||0===l)&&j&&(j=aa(a,g,j,o),"%"===p?(j/=aa(a,g,100,"%")/100,b.strictUnits!==!0&&(m=j+"%")):"em"===p||"rem"===p||"vw"===p||"vh"===p?j/=aa(a,g,1,p):"px"!==p&&(l=aa(a,g,l,p),p="px"),t&&(l||0===l)&&(n=l+j+p)),t&&(l+=j),!j&&0!==j||!l&&0!==l?void 0!==u[g]&&(n||n+""!="NaN"&&null!=n)?(c=new ta(u,g,l||j||0,0,c,-1,g,!1,0,m,n),c.xs0="none"!==n||"display"!==g&&-1===g.indexOf("Style")?n:m):W("invalid "+g+" tween value: "+b[g]):(c=new ta(u,g,j,l-j,c,0,g,k!==!1&&("px"===p||"zIndex"===g),0,m,n),c.xs0=p))}f&&c&&!c.plugin&&(c.plugin=f)}return c},j.setRatio=function(a){var b,c,d,e=this._firstPT,f=1e-6;if(1!==a||this._tween._time!==this._tween._duration&&0!==this._tween._time)if(a||this._tween._time!==this._tween._duration&&0!==this._tween._time||this._tween._rawPrevTime===-1e-6)for(;e;){if(b=e.c*a+e.s,e.r?b=e.r(b):f>b&&b>-f&&(b=0),e.type)if(1===e.type)if(d=e.l,2===d)e.t[e.p]=e.xs0+b+e.xs1+e.xn1+e.xs2;else if(3===d)e.t[e.p]=e.xs0+b+e.xs1+e.xn1+e.xs2+e.xn2+e.xs3;else if(4===d)e.t[e.p]=e.xs0+b+e.xs1+e.xn1+e.xs2+e.xn2+e.xs3+e.xn3+e.xs4;else if(5===d)e.t[e.p]=e.xs0+b+e.xs1+e.xn1+e.xs2+e.xn2+e.xs3+e.xn3+e.xs4+e.xn4+e.xs5;else{for(c=e.xs0+b+e.xs1,d=1;d<e.l;d++)c+=e["xn"+d]+e["xs"+(d+1)];e.t[e.p]=c}else-1===e.type?e.t[e.p]=e.xs0:e.setRatio&&e.setRatio(a);else e.t[e.p]=b+e.xs0;e=e._next}else for(;e;)2!==e.type?e.t[e.p]=e.b:e.setRatio(a),e=e._next;else for(;e;){if(2!==e.type)if(e.r&&-1!==e.type)if(b=e.r(e.s+e.c),e.type){if(1===e.type){for(d=e.l,c=e.xs0+b+e.xs1,d=1;d<e.l;d++)c+=e["xn"+d]+e["xs"+(d+1)];e.t[e.p]=c}}else e.t[e.p]=b+e.xs0;else e.t[e.p]=e.e;else e.setRatio(a);e=e._next}},j._enableTransforms=function(a){this._transform=this._transform||Ra(this._target,e,!0),this._transformType=this._transform.svg&&Aa||!a&&3!==this._transformType?2:3};var Ya=function(a){this.t[this.p]=this.e,this.data._linkCSSP(this,this._next,null,!0)};j._addLazySet=function(a,b,c){var d=this._firstPT=new ta(a,b,0,0,this._firstPT,2);d.e=c,d.setRatio=Ya,d.data=this},j._linkCSSP=function(a,b,c,d){return a&&(b&&(b._prev=a),a._next&&(a._next._prev=a._prev),a._prev?a._prev._next=a._next:this._firstPT===a&&(this._firstPT=a._next,d=!0),c?c._next=a:d||null!==this._firstPT||(this._firstPT=a),a._next=b,a._prev=c),a},j._mod=function(a){for(var b=this._firstPT;b;)"function"==typeof a[b.p]&&(b.r=a[b.p]),b=b._next},j._kill=function(b){var c,d,e,f=b;if(b.autoAlpha||b.alpha){f={};for(d in b)f[d]=b[d];f.opacity=1,f.autoAlpha&&(f.visibility=1)}for(b.className&&(c=this._classNamePT)&&(e=c.xfirst,e&&e._prev?this._linkCSSP(e._prev,c._next,e._prev._prev):e===this._firstPT&&(this._firstPT=c._next),c._next&&this._linkCSSP(c._next,c._next._next,e._prev),this._classNamePT=null),c=this._firstPT;c;)c.plugin&&c.plugin!==d&&c.plugin._kill&&(c.plugin._kill(b),d=c.plugin),c=c._next;return a.prototype._kill.call(this,f)};var Za=function(a,b,c){var d,e,f,g;if(a.slice)for(e=a.length;--e>-1;)Za(a[e],b,c);else for(d=a.childNodes,e=d.length;--e>-1;)f=d[e],g=f.type,f.style&&(b.push(ca(f)),c&&c.push(f)),1!==g&&9!==g&&11!==g||!f.childNodes.length||Za(f,b,c)};return g.cascadeTo=function(a,c,d){var e,f,g,h,i=b.to(a,c,d),j=[i],k=[],l=[],m=[],n=b._internals.reservedProps;for(a=i._targets||i.target,Za(a,k,m),i.render(c,!0,!0),Za(a,l),i.render(0,!0,!0),i._enabled(!0),e=m.length;--e>-1;)if(f=da(m[e],k[e],l[e]),f.firstMPT){f=f.difs;for(g in d)n[g]&&(f[g]=d[g]);h={};for(g in f)h[g]=k[e][g];j.push(b.fromTo(m[e],c,h,f))}return j},a.activate([g]),g},!0),function(){var a=_gsScope._gsDefine.plugin({propName:"roundProps",version:"1.7.0",priority:-1,API:2,init:function(a,b,c){return this._tween=c,!0}}),b=function(a){var b=1>a?Math.pow(10,(a+"").length-2):1;return function(c){return(Math.round(c/a)*a*b|0)/b}},c=function(a,b){for(;a;)a.f||a.blob||(a.m=b||Math.round),a=a._next},d=a.prototype;d._onInitAllProps=function(){var a,d,e,f,g=this._tween,h=g.vars.roundProps,i={},j=g._propLookup.roundProps;if("object"!=typeof h||h.push)for("string"==typeof h&&(h=h.split(",")),e=h.length;--e>-1;)i[h[e]]=Math.round;else for(f in h)i[f]=b(h[f]);for(f in i)for(a=g._firstPT;a;)d=a._next,a.pg?a.t._mod(i):a.n===f&&(2===a.f&&a.t?c(a.t._firstPT,i[f]):(this._add(a.t,f,a.s,a.c,i[f]),d&&(d._prev=a._prev),a._prev?a._prev._next=d:g._firstPT===a&&(g._firstPT=d),a._next=a._prev=null,g._propLookup[f]=j)),a=d;return!1},d._add=function(a,b,c,d,e){this._addTween(a,b,c,c+d,b,e||Math.round),this._overwriteProps.push(b)}}(),function(){_gsScope._gsDefine.plugin({propName:"attr",API:2,version:"0.6.1",init:function(a,b,c,d){var e,f;if("function"!=typeof a.setAttribute)return!1;for(e in b)f=b[e],"function"==typeof f&&(f=f(d,a)),this._addTween(a,"setAttribute",a.getAttribute(e)+"",f+"",e,!1,e),this._overwriteProps.push(e);return!0}})}(),_gsScope._gsDefine.plugin({propName:"directionalRotation",version:"0.3.1",API:2,init:function(a,b,c,d){"object"!=typeof b&&(b={rotation:b}),this.finals={};var e,f,g,h,i,j,k=b.useRadians===!0?2*Math.PI:360,l=1e-6;for(e in b)"useRadians"!==e&&(h=b[e],"function"==typeof h&&(h=h(d,a)),j=(h+"").split("_"),f=j[0],g=parseFloat("function"!=typeof a[e]?a[e]:a[e.indexOf("set")||"function"!=typeof a["get"+e.substr(3)]?e:"get"+e.substr(3)]()),h=this.finals[e]="string"==typeof f&&"="===f.charAt(1)?g+parseInt(f.charAt(0)+"1",10)*Number(f.substr(2)):Number(f)||0,i=h-g,j.length&&(f=j.join("_"),-1!==f.indexOf("short")&&(i%=k,i!==i%(k/2)&&(i=0>i?i+k:i-k)),-1!==f.indexOf("_cw")&&0>i?i=(i+9999999999*k)%k-(i/k|0)*k:-1!==f.indexOf("ccw")&&i>0&&(i=(i-9999999999*k)%k-(i/k|0)*k)),(i>l||-l>i)&&(this._addTween(a,e,g,g+i,e),this._overwriteProps.push(e)));return!0},set:function(a){var b;if(1!==a)this._super.setRatio.call(this,a);else for(b=this._firstPT;b;)b.f?b.t[b.p](this.finals[b.p]):b.t[b.p]=this.finals[b.p],b=b._next}})._autoCSS=!0,_gsScope._gsDefine("easing.Back",["easing.Ease"],function(a){var b,c,d,e,f=_gsScope.GreenSockGlobals||_gsScope,g=f.com.greensock,h=2*Math.PI,i=Math.PI/2,j=g._class,k=function(b,c){var d=j("easing."+b,function(){},!0),e=d.prototype=new a;return e.constructor=d,e.getRatio=c,d},l=a.register||function(){},m=function(a,b,c,d,e){var f=j("easing."+a,{easeOut:new b,easeIn:new c,easeInOut:new d},!0);return l(f,a),f},n=function(a,b,c){this.t=a,this.v=b,c&&(this.next=c,c.prev=this,this.c=c.v-b,this.gap=c.t-a)},o=function(b,c){var d=j("easing."+b,function(a){this._p1=a||0===a?a:1.70158,this._p2=1.525*this._p1},!0),e=d.prototype=new a;return e.constructor=d,e.getRatio=c,e.config=function(a){return new d(a)},d},p=m("Back",o("BackOut",function(a){return(a-=1)*a*((this._p1+1)*a+this._p1)+1}),o("BackIn",function(a){return a*a*((this._p1+1)*a-this._p1)}),o("BackInOut",function(a){return(a*=2)<1?.5*a*a*((this._p2+1)*a-this._p2):.5*((a-=2)*a*((this._p2+1)*a+this._p2)+2)})),q=j("easing.SlowMo",function(a,b,c){b=b||0===b?b:.7,null==a?a=.7:a>1&&(a=1),this._p=1!==a?b:0,this._p1=(1-a)/2,this._p2=a,this._p3=this._p1+this._p2,this._calcEnd=c===!0},!0),r=q.prototype=new a;return r.constructor=q,r.getRatio=function(a){var b=a+(.5-a)*this._p;return a<this._p1?this._calcEnd?1-(a=1-a/this._p1)*a:b-(a=1-a/this._p1)*a*a*a*b:a>this._p3?this._calcEnd?1===a?0:1-(a=(a-this._p3)/this._p1)*a:b+(a-b)*(a=(a-this._p3)/this._p1)*a*a*a:this._calcEnd?1:b},q.ease=new q(.7,.7),r.config=q.config=function(a,b,c){return new q(a,b,c)},b=j("easing.SteppedEase",function(a,b){a=a||1,this._p1=1/a,this._p2=a+(b?0:1),this._p3=b?1:0},!0),r=b.prototype=new a,r.constructor=b,r.getRatio=function(a){return 0>a?a=0:a>=1&&(a=.999999999),((this._p2*a|0)+this._p3)*this._p1},r.config=b.config=function(a,c){return new b(a,c)},c=j("easing.ExpoScaleEase",function(a,b,c){this._p1=Math.log(b/a),this._p2=b-a,this._p3=a,this._ease=c},!0),r=c.prototype=new a,r.constructor=c,r.getRatio=function(a){return this._ease&&(a=this._ease.getRatio(a)),(this._p3*Math.exp(this._p1*a)-this._p3)/this._p2},r.config=c.config=function(a,b,d){return new c(a,b,d)},d=j("easing.RoughEase",function(b){b=b||{};for(var c,d,e,f,g,h,i=b.taper||"none",j=[],k=0,l=0|(b.points||20),m=l,o=b.randomize!==!1,p=b.clamp===!0,q=b.template instanceof a?b.template:null,r="number"==typeof b.strength?.4*b.strength:.4;--m>-1;)c=o?Math.random():1/l*m,d=q?q.getRatio(c):c,"none"===i?e=r:"out"===i?(f=1-c,e=f*f*r):"in"===i?e=c*c*r:.5>c?(f=2*c,e=f*f*.5*r):(f=2*(1-c),e=f*f*.5*r),o?d+=Math.random()*e-.5*e:m%2?d+=.5*e:d-=.5*e,p&&(d>1?d=1:0>d&&(d=0)),j[k++]={x:c,y:d};for(j.sort(function(a,b){return a.x-b.x}),h=new n(1,1,null),m=l;--m>-1;)g=j[m],h=new n(g.x,g.y,h);this._prev=new n(0,0,0!==h.t?h:h.next)},!0),r=d.prototype=new a,r.constructor=d,r.getRatio=function(a){var b=this._prev;if(a>b.t){for(;b.next&&a>=b.t;)b=b.next;b=b.prev}else for(;b.prev&&a<=b.t;)b=b.prev;return this._prev=b,b.v+(a-b.t)/b.gap*b.c},r.config=function(a){return new d(a)},d.ease=new d,m("Bounce",k("BounceOut",function(a){return 1/2.75>a?7.5625*a*a:2/2.75>a?7.5625*(a-=1.5/2.75)*a+.75:2.5/2.75>a?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375}),k("BounceIn",function(a){return(a=1-a)<1/2.75?1-7.5625*a*a:2/2.75>a?1-(7.5625*(a-=1.5/2.75)*a+.75):2.5/2.75>a?1-(7.5625*(a-=2.25/2.75)*a+.9375):1-(7.5625*(a-=2.625/2.75)*a+.984375)}),k("BounceInOut",function(a){var b=.5>a;return a=b?1-2*a:2*a-1,a=1/2.75>a?7.5625*a*a:2/2.75>a?7.5625*(a-=1.5/2.75)*a+.75:2.5/2.75>a?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375,b?.5*(1-a):.5*a+.5})),m("Circ",k("CircOut",function(a){return Math.sqrt(1-(a-=1)*a)}),k("CircIn",function(a){return-(Math.sqrt(1-a*a)-1)}),k("CircInOut",function(a){return(a*=2)<1?-.5*(Math.sqrt(1-a*a)-1):.5*(Math.sqrt(1-(a-=2)*a)+1)})),e=function(b,c,d){var e=j("easing."+b,function(a,b){this._p1=a>=1?a:1,this._p2=(b||d)/(1>a?a:1),this._p3=this._p2/h*(Math.asin(1/this._p1)||0),this._p2=h/this._p2},!0),f=e.prototype=new a;return f.constructor=e,f.getRatio=c,f.config=function(a,b){return new e(a,b)},e},m("Elastic",e("ElasticOut",function(a){return this._p1*Math.pow(2,-10*a)*Math.sin((a-this._p3)*this._p2)+1},.3),e("ElasticIn",function(a){return-(this._p1*Math.pow(2,10*(a-=1))*Math.sin((a-this._p3)*this._p2))},.3),e("ElasticInOut",function(a){return(a*=2)<1?-.5*(this._p1*Math.pow(2,10*(a-=1))*Math.sin((a-this._p3)*this._p2)):this._p1*Math.pow(2,-10*(a-=1))*Math.sin((a-this._p3)*this._p2)*.5+1},.45)),m("Expo",k("ExpoOut",function(a){return 1-Math.pow(2,-10*a)}),k("ExpoIn",function(a){return Math.pow(2,10*(a-1))-.001}),k("ExpoInOut",function(a){return(a*=2)<1?.5*Math.pow(2,10*(a-1)):.5*(2-Math.pow(2,-10*(a-1)))})),m("Sine",k("SineOut",function(a){return Math.sin(a*i)}),k("SineIn",function(a){return-Math.cos(a*i)+1}),k("SineInOut",function(a){return-.5*(Math.cos(Math.PI*a)-1)})),j("easing.EaseLookup",{find:function(b){return a.map[b]}},!0),l(f.SlowMo,"SlowMo","ease,"),l(d,"RoughEase","ease,"),l(b,"SteppedEase","ease,"),p},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(a,b){"use strict";var c={},d=a.document,e=a.GreenSockGlobals=a.GreenSockGlobals||a,f=e[b];if(f)return"undefined"!=typeof module&&module.exports&&(module.exports=f),f;var g,h,i,j,k,l=function(a){var b,c=a.split("."),d=e;for(b=0;b<c.length;b++)d[c[b]]=d=d[c[b]]||{};return d},m=l("com.greensock"),n=1e-10,o=function(a){var b,c=[],d=a.length;for(b=0;b!==d;c.push(a[b++]));return c},p=function(){},q=function(){var a=Object.prototype.toString,b=a.call([]);return function(c){return null!=c&&(c instanceof Array||"object"==typeof c&&!!c.push&&a.call(c)===b)}}(),r={},s=function(d,f,g,h){this.sc=r[d]?r[d].sc:[],r[d]=this,this.gsClass=null,this.func=g;var i=[];this.check=function(j){for(var k,m,n,o,p=f.length,q=p;--p>-1;)(k=r[f[p]]||new s(f[p],[])).gsClass?(i[p]=k.gsClass,q--):j&&k.sc.push(this);if(0===q&&g){if(m=("com.greensock."+d).split("."),n=m.pop(),o=l(m.join("."))[n]=this.gsClass=g.apply(g,i),h)if(e[n]=c[n]=o,"undefined"!=typeof module&&module.exports)if(d===b){module.exports=c[b]=o;for(p in c)o[p]=c[p]}else c[b]&&(c[b][n]=o);else"function"==typeof define&&define.amd&&define((a.GreenSockAMDPath?a.GreenSockAMDPath+"/":"")+d.split(".").pop(),[],function(){return o});for(p=0;p<this.sc.length;p++)this.sc[p].check()}},this.check(!0)},t=a._gsDefine=function(a,b,c,d){return new s(a,b,c,d)},u=m._class=function(a,b,c){return b=b||function(){},t(a,[],function(){return b},c),b};t.globals=e;var v=[0,0,1,1],w=u("easing.Ease",function(a,b,c,d){this._func=a,this._type=c||0,this._power=d||0,this._params=b?v.concat(b):v},!0),x=w.map={},y=w.register=function(a,b,c,d){for(var e,f,g,h,i=b.split(","),j=i.length,k=(c||"easeIn,easeOut,easeInOut").split(",");--j>-1;)for(f=i[j],e=d?u("easing."+f,null,!0):m.easing[f]||{},g=k.length;--g>-1;)h=k[g],x[f+"."+h]=x[h+f]=e[h]=a.getRatio?a:a[h]||new a};for(i=w.prototype,i._calcEnd=!1,i.getRatio=function(a){if(this._func)return this._params[0]=a,this._func.apply(null,this._params);var b=this._type,c=this._power,d=1===b?1-a:2===b?a:.5>a?2*a:2*(1-a);return 1===c?d*=d:2===c?d*=d*d:3===c?d*=d*d*d:4===c&&(d*=d*d*d*d),1===b?1-d:2===b?d:.5>a?d/2:1-d/2},g=["Linear","Quad","Cubic","Quart","Quint,Strong"],h=g.length;--h>-1;)i=g[h]+",Power"+h,y(new w(null,null,1,h),i,"easeOut",!0),y(new w(null,null,2,h),i,"easeIn"+(0===h?",easeNone":"")),y(new w(null,null,3,h),i,"easeInOut");x.linear=m.easing.Linear.easeIn,x.swing=m.easing.Quad.easeInOut;var z=u("events.EventDispatcher",function(a){this._listeners={},this._eventTarget=a||this});i=z.prototype,i.addEventListener=function(a,b,c,d,e){e=e||0;var f,g,h=this._listeners[a],i=0;for(this!==j||k||j.wake(),null==h&&(this._listeners[a]=h=[]),g=h.length;--g>-1;)f=h[g],f.c===b&&f.s===c?h.splice(g,1):0===i&&f.pr<e&&(i=g+1);h.splice(i,0,{c:b,s:c,up:d,pr:e})},i.removeEventListener=function(a,b){var c,d=this._listeners[a];if(d)for(c=d.length;--c>-1;)if(d[c].c===b)return void d.splice(c,1)},i.dispatchEvent=function(a){var b,c,d,e=this._listeners[a];if(e)for(b=e.length,b>1&&(e=e.slice(0)),c=this._eventTarget;--b>-1;)d=e[b],d&&(d.up?d.c.call(d.s||c,{type:a,target:c}):d.c.call(d.s||c))};var A=a.requestAnimationFrame,B=a.cancelAnimationFrame,C=Date.now||function(){return(new Date).getTime()},D=C();for(g=["ms","moz","webkit","o"],h=g.length;--h>-1&&!A;)A=a[g[h]+"RequestAnimationFrame"],B=a[g[h]+"CancelAnimationFrame"]||a[g[h]+"CancelRequestAnimationFrame"];u("Ticker",function(a,b){var c,e,f,g,h,i=this,l=C(),m=b!==!1&&A?"auto":!1,o=500,q=33,r="tick",s=function(a){var b,d,j=C()-D;j>o&&(l+=j-q),D+=j,i.time=(D-l)/1e3,b=i.time-h,(!c||b>0||a===!0)&&(i.frame++,h+=b+(b>=g?.004:g-b),d=!0),a!==!0&&(f=e(s)),d&&i.dispatchEvent(r)};z.call(i),i.time=i.frame=0,i.tick=function(){s(!0)},i.lagSmoothing=function(a,b){return arguments.length?(o=a||1/n,void(q=Math.min(b,o,0))):1/n>o},i.sleep=function(){null!=f&&(m&&B?B(f):clearTimeout(f),e=p,f=null,i===j&&(k=!1))},i.wake=function(a){null!==f?i.sleep():a?l+=-D+(D=C()):i.frame>10&&(D=C()-o+5),e=0===c?p:m&&A?A:function(a){return setTimeout(a,1e3*(h-i.time)+1|0)},i===j&&(k=!0),s(2)},i.fps=function(a){return arguments.length?(c=a,g=1/(c||60),h=this.time+g,void i.wake()):c},i.useRAF=function(a){return arguments.length?(i.sleep(),m=a,void i.fps(c)):m},i.fps(a),setTimeout(function(){"auto"===m&&i.frame<5&&"hidden"!==(d||{}).visibilityState&&i.useRAF(!1)},1500)}),i=m.Ticker.prototype=new m.events.EventDispatcher,i.constructor=m.Ticker;var E=u("core.Animation",function(a,b){if(this.vars=b=b||{},this._duration=this._totalDuration=a||0,this._delay=Number(b.delay)||0,this._timeScale=1,this._active=b.immediateRender===!0,this.data=b.data,this._reversed=b.reversed===!0,Y){k||j.wake();var c=this.vars.useFrames?X:Y;c.add(this,c._time),this.vars.paused&&this.paused(!0)}});j=E.ticker=new m.Ticker,i=E.prototype,i._dirty=i._gc=i._initted=i._paused=!1,i._totalTime=i._time=0,i._rawPrevTime=-1,i._next=i._last=i._onUpdate=i._timeline=i.timeline=null,i._paused=!1;var F=function(){k&&C()-D>2e3&&("hidden"!==(d||{}).visibilityState||!j.lagSmoothing())&&j.wake();var a=setTimeout(F,2e3);a.unref&&a.unref()};F(),i.play=function(a,b){return null!=a&&this.seek(a,b),this.reversed(!1).paused(!1)},i.pause=function(a,b){return null!=a&&this.seek(a,b),this.paused(!0)},i.resume=function(a,b){return null!=a&&this.seek(a,b),this.paused(!1)},i.seek=function(a,b){return this.totalTime(Number(a),b!==!1)},i.restart=function(a,b){return this.reversed(!1).paused(!1).totalTime(a?-this._delay:0,b!==!1,!0)},i.reverse=function(a,b){return null!=a&&this.seek(a||this.totalDuration(),b),this.reversed(!0).paused(!1)},i.render=function(a,b,c){},i.invalidate=function(){return this._time=this._totalTime=0,this._initted=this._gc=!1,this._rawPrevTime=-1,(this._gc||!this.timeline)&&this._enabled(!0),this},i.isActive=function(){var a,b=this._timeline,c=this._startTime;return!b||!this._gc&&!this._paused&&b.isActive()&&(a=b.rawTime(!0))>=c&&a<c+this.totalDuration()/this._timeScale-1e-7},i._enabled=function(a,b){return k||j.wake(),this._gc=!a,this._active=this.isActive(),b!==!0&&(a&&!this.timeline?this._timeline.add(this,this._startTime-this._delay):!a&&this.timeline&&this._timeline._remove(this,!0)),!1},i._kill=function(a,b){return this._enabled(!1,!1)},i.kill=function(a,b){return this._kill(a,b),this},i._uncache=function(a){for(var b=a?this:this.timeline;b;)b._dirty=!0,b=b.timeline;return this},i._swapSelfInParams=function(a){for(var b=a.length,c=a.concat();--b>-1;)"{self}"===a[b]&&(c[b]=this);return c},i._callback=function(a){var b=this.vars,c=b[a],d=b[a+"Params"],e=b[a+"Scope"]||b.callbackScope||this,f=d?d.length:0;switch(f){case 0:c.call(e);break;case 1:c.call(e,d[0]);break;case 2:c.call(e,d[0],d[1]);break;default:c.apply(e,d)}},i.eventCallback=function(a,b,c,d){if("on"===(a||"").substr(0,2)){var e=this.vars;if(1===arguments.length)return e[a];null==b?delete e[a]:(e[a]=b,e[a+"Params"]=q(c)&&-1!==c.join("").indexOf("{self}")?this._swapSelfInParams(c):c,e[a+"Scope"]=d),"onUpdate"===a&&(this._onUpdate=b)}return this},i.delay=function(a){return arguments.length?(this._timeline.smoothChildTiming&&this.startTime(this._startTime+a-this._delay),this._delay=a,this):this._delay},i.duration=function(a){return arguments.length?(this._duration=this._totalDuration=a,this._uncache(!0),this._timeline.smoothChildTiming&&this._time>0&&this._time<this._duration&&0!==a&&this.totalTime(this._totalTime*(a/this._duration),!0),this):(this._dirty=!1,this._duration)},i.totalDuration=function(a){return this._dirty=!1,arguments.length?this.duration(a):this._totalDuration},i.time=function(a,b){return arguments.length?(this._dirty&&this.totalDuration(),this.totalTime(a>this._duration?this._duration:a,b)):this._time},i.totalTime=function(a,b,c){if(k||j.wake(),!arguments.length)return this._totalTime;if(this._timeline){if(0>a&&!c&&(a+=this.totalDuration()),this._timeline.smoothChildTiming){this._dirty&&this.totalDuration();var d=this._totalDuration,e=this._timeline;if(a>d&&!c&&(a=d),this._startTime=(this._paused?this._pauseTime:e._time)-(this._reversed?d-a:a)/this._timeScale,e._dirty||this._uncache(!1),e._timeline)for(;e._timeline;)e._timeline._time!==(e._startTime+e._totalTime)/e._timeScale&&e.totalTime(e._totalTime,!0),e=e._timeline}this._gc&&this._enabled(!0,!1),(this._totalTime!==a||0===this._duration)&&(K.length&&$(),this.render(a,b,!1),K.length&&$())}return this},i.progress=i.totalProgress=function(a,b){var c=this.duration();return arguments.length?this.totalTime(c*a,b):c?this._time/c:this.ratio;
},i.startTime=function(a){return arguments.length?(a!==this._startTime&&(this._startTime=a,this.timeline&&this.timeline._sortChildren&&this.timeline.add(this,a-this._delay)),this):this._startTime},i.endTime=function(a){return this._startTime+(0!=a?this.totalDuration():this.duration())/this._timeScale},i.timeScale=function(a){if(!arguments.length)return this._timeScale;var b,c;for(a=a||n,this._timeline&&this._timeline.smoothChildTiming&&(b=this._pauseTime,c=b||0===b?b:this._timeline.totalTime(),this._startTime=c-(c-this._startTime)*this._timeScale/a),this._timeScale=a,c=this.timeline;c&&c.timeline;)c._dirty=!0,c.totalDuration(),c=c.timeline;return this},i.reversed=function(a){return arguments.length?(a!=this._reversed&&(this._reversed=a,this.totalTime(this._timeline&&!this._timeline.smoothChildTiming?this.totalDuration()-this._totalTime:this._totalTime,!0)),this):this._reversed},i.paused=function(a){if(!arguments.length)return this._paused;var b,c,d=this._timeline;return a!=this._paused&&d&&(k||a||j.wake(),b=d.rawTime(),c=b-this._pauseTime,!a&&d.smoothChildTiming&&(this._startTime+=c,this._uncache(!1)),this._pauseTime=a?b:null,this._paused=a,this._active=this.isActive(),!a&&0!==c&&this._initted&&this.duration()&&(b=d.smoothChildTiming?this._totalTime:(b-this._startTime)/this._timeScale,this.render(b,b===this._totalTime,!0))),this._gc&&!a&&this._enabled(!0,!1),this};var G=u("core.SimpleTimeline",function(a){E.call(this,0,a),this.autoRemoveChildren=this.smoothChildTiming=!0});i=G.prototype=new E,i.constructor=G,i.kill()._gc=!1,i._first=i._last=i._recent=null,i._sortChildren=!1,i.add=i.insert=function(a,b,c,d){var e,f;if(a._startTime=Number(b||0)+a._delay,a._paused&&this!==a._timeline&&(a._pauseTime=this.rawTime()-(a._timeline.rawTime()-a._pauseTime)),a.timeline&&a.timeline._remove(a,!0),a.timeline=a._timeline=this,a._gc&&a._enabled(!0,!0),e=this._last,this._sortChildren)for(f=a._startTime;e&&e._startTime>f;)e=e._prev;return e?(a._next=e._next,e._next=a):(a._next=this._first,this._first=a),a._next?a._next._prev=a:this._last=a,a._prev=e,this._recent=a,this._timeline&&this._uncache(!0),this},i._remove=function(a,b){return a.timeline===this&&(b||a._enabled(!1,!0),a._prev?a._prev._next=a._next:this._first===a&&(this._first=a._next),a._next?a._next._prev=a._prev:this._last===a&&(this._last=a._prev),a._next=a._prev=a.timeline=null,a===this._recent&&(this._recent=this._last),this._timeline&&this._uncache(!0)),this},i.render=function(a,b,c){var d,e=this._first;for(this._totalTime=this._time=this._rawPrevTime=a;e;)d=e._next,(e._active||a>=e._startTime&&!e._paused&&!e._gc)&&(e._reversed?e.render((e._dirty?e.totalDuration():e._totalDuration)-(a-e._startTime)*e._timeScale,b,c):e.render((a-e._startTime)*e._timeScale,b,c)),e=d},i.rawTime=function(){return k||j.wake(),this._totalTime};var H=u("TweenLite",function(b,c,d){if(E.call(this,c,d),this.render=H.prototype.render,null==b)throw"Cannot tween a null target.";this.target=b="string"!=typeof b?b:H.selector(b)||b;var e,f,g,h=b.jquery||b.length&&b!==a&&b[0]&&(b[0]===a||b[0].nodeType&&b[0].style&&!b.nodeType),i=this.vars.overwrite;if(this._overwrite=i=null==i?W[H.defaultOverwrite]:"number"==typeof i?i>>0:W[i],(h||b instanceof Array||b.push&&q(b))&&"number"!=typeof b[0])for(this._targets=g=o(b),this._propLookup=[],this._siblings=[],e=0;e<g.length;e++)f=g[e],f?"string"!=typeof f?f.length&&f!==a&&f[0]&&(f[0]===a||f[0].nodeType&&f[0].style&&!f.nodeType)?(g.splice(e--,1),this._targets=g=g.concat(o(f))):(this._siblings[e]=_(f,this,!1),1===i&&this._siblings[e].length>1&&ba(f,this,null,1,this._siblings[e])):(f=g[e--]=H.selector(f),"string"==typeof f&&g.splice(e+1,1)):g.splice(e--,1);else this._propLookup={},this._siblings=_(b,this,!1),1===i&&this._siblings.length>1&&ba(b,this,null,1,this._siblings);(this.vars.immediateRender||0===c&&0===this._delay&&this.vars.immediateRender!==!1)&&(this._time=-n,this.render(Math.min(0,-this._delay)))},!0),I=function(b){return b&&b.length&&b!==a&&b[0]&&(b[0]===a||b[0].nodeType&&b[0].style&&!b.nodeType)},J=function(a,b){var c,d={};for(c in a)V[c]||c in b&&"transform"!==c&&"x"!==c&&"y"!==c&&"width"!==c&&"height"!==c&&"className"!==c&&"border"!==c||!(!S[c]||S[c]&&S[c]._autoCSS)||(d[c]=a[c],delete a[c]);a.css=d};i=H.prototype=new E,i.constructor=H,i.kill()._gc=!1,i.ratio=0,i._firstPT=i._targets=i._overwrittenProps=i._startAt=null,i._notifyPluginsOfEnabled=i._lazy=!1,H.version="2.0.2",H.defaultEase=i._ease=new w(null,null,1,1),H.defaultOverwrite="auto",H.ticker=j,H.autoSleep=120,H.lagSmoothing=function(a,b){j.lagSmoothing(a,b)},H.selector=a.$||a.jQuery||function(b){var c=a.$||a.jQuery;return c?(H.selector=c,c(b)):(d||(d=a.document),d?d.querySelectorAll?d.querySelectorAll(b):d.getElementById("#"===b.charAt(0)?b.substr(1):b):b)};var K=[],L={},M=/(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,N=/[\+-]=-?[\.\d]/,O=function(a){for(var b,c=this._firstPT,d=1e-6;c;)b=c.blob?1===a&&null!=this.end?this.end:a?this.join(""):this.start:c.c*a+c.s,c.m?b=c.m.call(this._tween,b,this._target||c.t,this._tween):d>b&&b>-d&&!c.blob&&(b=0),c.f?c.fp?c.t[c.p](c.fp,b):c.t[c.p](b):c.t[c.p]=b,c=c._next},P=function(a,b,c,d){var e,f,g,h,i,j,k,l=[],m=0,n="",o=0;for(l.start=a,l.end=b,a=l[0]=a+"",b=l[1]=b+"",c&&(c(l),a=l[0],b=l[1]),l.length=0,e=a.match(M)||[],f=b.match(M)||[],d&&(d._next=null,d.blob=1,l._firstPT=l._applyPT=d),i=f.length,h=0;i>h;h++)k=f[h],j=b.substr(m,b.indexOf(k,m)-m),n+=j||!h?j:",",m+=j.length,o?o=(o+1)%5:"rgba("===j.substr(-5)&&(o=1),k===e[h]||e.length<=h?n+=k:(n&&(l.push(n),n=""),g=parseFloat(e[h]),l.push(g),l._firstPT={_next:l._firstPT,t:l,p:l.length-1,s:g,c:("="===k.charAt(1)?parseInt(k.charAt(0)+"1",10)*parseFloat(k.substr(2)):parseFloat(k)-g)||0,f:0,m:o&&4>o?Math.round:0}),m+=k.length;return n+=b.substr(m),n&&l.push(n),l.setRatio=O,N.test(b)&&(l.end=null),l},Q=function(a,b,c,d,e,f,g,h,i){"function"==typeof d&&(d=d(i||0,a));var j,k=typeof a[b],l="function"!==k?"":b.indexOf("set")||"function"!=typeof a["get"+b.substr(3)]?b:"get"+b.substr(3),m="get"!==c?c:l?g?a[l](g):a[l]():a[b],n="string"==typeof d&&"="===d.charAt(1),o={t:a,p:b,s:m,f:"function"===k,pg:0,n:e||b,m:f?"function"==typeof f?f:Math.round:0,pr:0,c:n?parseInt(d.charAt(0)+"1",10)*parseFloat(d.substr(2)):parseFloat(d)-m||0};return("number"!=typeof m||"number"!=typeof d&&!n)&&(g||isNaN(m)||!n&&isNaN(d)||"boolean"==typeof m||"boolean"==typeof d?(o.fp=g,j=P(m,n?parseFloat(o.s)+o.c+(o.s+"").replace(/[0-9\-\.]/g,""):d,h||H.defaultStringFilter,o),o={t:j,p:"setRatio",s:0,c:1,f:2,pg:0,n:e||b,pr:0,m:0}):(o.s=parseFloat(m),n||(o.c=parseFloat(d)-o.s||0))),o.c?((o._next=this._firstPT)&&(o._next._prev=o),this._firstPT=o,o):void 0},R=H._internals={isArray:q,isSelector:I,lazyTweens:K,blobDif:P},S=H._plugins={},T=R.tweenLookup={},U=0,V=R.reservedProps={ease:1,delay:1,overwrite:1,onComplete:1,onCompleteParams:1,onCompleteScope:1,useFrames:1,runBackwards:1,startAt:1,onUpdate:1,onUpdateParams:1,onUpdateScope:1,onStart:1,onStartParams:1,onStartScope:1,onReverseComplete:1,onReverseCompleteParams:1,onReverseCompleteScope:1,onRepeat:1,onRepeatParams:1,onRepeatScope:1,easeParams:1,yoyo:1,immediateRender:1,repeat:1,repeatDelay:1,data:1,paused:1,reversed:1,autoCSS:1,lazy:1,onOverwrite:1,callbackScope:1,stringFilter:1,id:1,yoyoEase:1},W={none:0,all:1,auto:2,concurrent:3,allOnStart:4,preexisting:5,"true":1,"false":0},X=E._rootFramesTimeline=new G,Y=E._rootTimeline=new G,Z=30,$=R.lazyRender=function(){var a,b=K.length;for(L={};--b>-1;)a=K[b],a&&a._lazy!==!1&&(a.render(a._lazy[0],a._lazy[1],!0),a._lazy=!1);K.length=0};Y._startTime=j.time,X._startTime=j.frame,Y._active=X._active=!0,setTimeout($,1),E._updateRoot=H.render=function(){var a,b,c;if(K.length&&$(),Y.render((j.time-Y._startTime)*Y._timeScale,!1,!1),X.render((j.frame-X._startTime)*X._timeScale,!1,!1),K.length&&$(),j.frame>=Z){Z=j.frame+(parseInt(H.autoSleep,10)||120);for(c in T){for(b=T[c].tweens,a=b.length;--a>-1;)b[a]._gc&&b.splice(a,1);0===b.length&&delete T[c]}if(c=Y._first,(!c||c._paused)&&H.autoSleep&&!X._first&&1===j._listeners.tick.length){for(;c&&c._paused;)c=c._next;c||j.sleep()}}},j.addEventListener("tick",E._updateRoot);var _=function(a,b,c){var d,e,f=a._gsTweenID;if(T[f||(a._gsTweenID=f="t"+U++)]||(T[f]={target:a,tweens:[]}),b&&(d=T[f].tweens,d[e=d.length]=b,c))for(;--e>-1;)d[e]===b&&d.splice(e,1);return T[f].tweens},aa=function(a,b,c,d){var e,f,g=a.vars.onOverwrite;return g&&(e=g(a,b,c,d)),g=H.onOverwrite,g&&(f=g(a,b,c,d)),e!==!1&&f!==!1},ba=function(a,b,c,d,e){var f,g,h,i;if(1===d||d>=4){for(i=e.length,f=0;i>f;f++)if((h=e[f])!==b)h._gc||h._kill(null,a,b)&&(g=!0);else if(5===d)break;return g}var j,k=b._startTime+n,l=[],m=0,o=0===b._duration;for(f=e.length;--f>-1;)(h=e[f])===b||h._gc||h._paused||(h._timeline!==b._timeline?(j=j||ca(b,0,o),0===ca(h,j,o)&&(l[m++]=h)):h._startTime<=k&&h._startTime+h.totalDuration()/h._timeScale>k&&((o||!h._initted)&&k-h._startTime<=2e-10||(l[m++]=h)));for(f=m;--f>-1;)if(h=l[f],i=h._firstPT,2===d&&h._kill(c,a,b)&&(g=!0),2!==d||!h._firstPT&&h._initted&&i){if(2!==d&&!aa(h,b))continue;h._enabled(!1,!1)&&(g=!0)}return g},ca=function(a,b,c){for(var d=a._timeline,e=d._timeScale,f=a._startTime;d._timeline;){if(f+=d._startTime,e*=d._timeScale,d._paused)return-100;d=d._timeline}return f/=e,f>b?f-b:c&&f===b||!a._initted&&2*n>f-b?n:(f+=a.totalDuration()/a._timeScale/e)>b+n?0:f-b-n};i._init=function(){var a,b,c,d,e,f,g=this.vars,h=this._overwrittenProps,i=this._duration,j=!!g.immediateRender,k=g.ease;if(g.startAt){this._startAt&&(this._startAt.render(-1,!0),this._startAt.kill()),e={};for(d in g.startAt)e[d]=g.startAt[d];if(e.data="isStart",e.overwrite=!1,e.immediateRender=!0,e.lazy=j&&g.lazy!==!1,e.startAt=e.delay=null,e.onUpdate=g.onUpdate,e.onUpdateParams=g.onUpdateParams,e.onUpdateScope=g.onUpdateScope||g.callbackScope||this,this._startAt=H.to(this.target||{},0,e),j)if(this._time>0)this._startAt=null;else if(0!==i)return}else if(g.runBackwards&&0!==i)if(this._startAt)this._startAt.render(-1,!0),this._startAt.kill(),this._startAt=null;else{0!==this._time&&(j=!1),c={};for(d in g)V[d]&&"autoCSS"!==d||(c[d]=g[d]);if(c.overwrite=0,c.data="isFromStart",c.lazy=j&&g.lazy!==!1,c.immediateRender=j,this._startAt=H.to(this.target,0,c),j){if(0===this._time)return}else this._startAt._init(),this._startAt._enabled(!1),this.vars.immediateRender&&(this._startAt=null)}if(this._ease=k=k?k instanceof w?k:"function"==typeof k?new w(k,g.easeParams):x[k]||H.defaultEase:H.defaultEase,g.easeParams instanceof Array&&k.config&&(this._ease=k.config.apply(k,g.easeParams)),this._easeType=this._ease._type,this._easePower=this._ease._power,this._firstPT=null,this._targets)for(f=this._targets.length,a=0;f>a;a++)this._initProps(this._targets[a],this._propLookup[a]={},this._siblings[a],h?h[a]:null,a)&&(b=!0);else b=this._initProps(this.target,this._propLookup,this._siblings,h,0);if(b&&H._onPluginEvent("_onInitAllProps",this),h&&(this._firstPT||"function"!=typeof this.target&&this._enabled(!1,!1)),g.runBackwards)for(c=this._firstPT;c;)c.s+=c.c,c.c=-c.c,c=c._next;this._onUpdate=g.onUpdate,this._initted=!0},i._initProps=function(b,c,d,e,f){var g,h,i,j,k,l;if(null==b)return!1;L[b._gsTweenID]&&$(),this.vars.css||b.style&&b!==a&&b.nodeType&&S.css&&this.vars.autoCSS!==!1&&J(this.vars,b);for(g in this.vars)if(l=this.vars[g],V[g])l&&(l instanceof Array||l.push&&q(l))&&-1!==l.join("").indexOf("{self}")&&(this.vars[g]=l=this._swapSelfInParams(l,this));else if(S[g]&&(j=new S[g])._onInitTween(b,this.vars[g],this,f)){for(this._firstPT=k={_next:this._firstPT,t:j,p:"setRatio",s:0,c:1,f:1,n:g,pg:1,pr:j._priority,m:0},h=j._overwriteProps.length;--h>-1;)c[j._overwriteProps[h]]=this._firstPT;(j._priority||j._onInitAllProps)&&(i=!0),(j._onDisable||j._onEnable)&&(this._notifyPluginsOfEnabled=!0),k._next&&(k._next._prev=k)}else c[g]=Q.call(this,b,g,"get",l,g,0,null,this.vars.stringFilter,f);return e&&this._kill(e,b)?this._initProps(b,c,d,e,f):this._overwrite>1&&this._firstPT&&d.length>1&&ba(b,this,c,this._overwrite,d)?(this._kill(c,b),this._initProps(b,c,d,e,f)):(this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration)&&(L[b._gsTweenID]=!0),i)},i.render=function(a,b,c){var d,e,f,g,h=this._time,i=this._duration,j=this._rawPrevTime;if(a>=i-1e-7&&a>=0)this._totalTime=this._time=i,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1,this._reversed||(d=!0,e="onComplete",c=c||this._timeline.autoRemoveChildren),0===i&&(this._initted||!this.vars.lazy||c)&&(this._startTime===this._timeline._duration&&(a=0),(0>j||0>=a&&a>=-1e-7||j===n&&"isPause"!==this.data)&&j!==a&&(c=!0,j>n&&(e="onReverseComplete")),this._rawPrevTime=g=!b||a||j===a?a:n);else if(1e-7>a)this._totalTime=this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==h||0===i&&j>0)&&(e="onReverseComplete",d=this._reversed),0>a&&(this._active=!1,0===i&&(this._initted||!this.vars.lazy||c)&&(j>=0&&(j!==n||"isPause"!==this.data)&&(c=!0),this._rawPrevTime=g=!b||a||j===a?a:n)),(!this._initted||this._startAt&&this._startAt.progress())&&(c=!0);else if(this._totalTime=this._time=a,this._easeType){var k=a/i,l=this._easeType,m=this._easePower;(1===l||3===l&&k>=.5)&&(k=1-k),3===l&&(k*=2),1===m?k*=k:2===m?k*=k*k:3===m?k*=k*k*k:4===m&&(k*=k*k*k*k),1===l?this.ratio=1-k:2===l?this.ratio=k:.5>a/i?this.ratio=k/2:this.ratio=1-k/2}else this.ratio=this._ease.getRatio(a/i);if(this._time!==h||c){if(!this._initted){if(this._init(),!this._initted||this._gc)return;if(!c&&this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration))return this._time=this._totalTime=h,this._rawPrevTime=j,K.push(this),void(this._lazy=[a,b]);this._time&&!d?this.ratio=this._ease.getRatio(this._time/i):d&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(0===this._time?0:1))}for(this._lazy!==!1&&(this._lazy=!1),this._active||!this._paused&&this._time!==h&&a>=0&&(this._active=!0),0===h&&(this._startAt&&(a>=0?this._startAt.render(a,!0,c):e||(e="_dummyGS")),this.vars.onStart&&(0!==this._time||0===i)&&(b||this._callback("onStart"))),f=this._firstPT;f;)f.f?f.t[f.p](f.c*this.ratio+f.s):f.t[f.p]=f.c*this.ratio+f.s,f=f._next;this._onUpdate&&(0>a&&this._startAt&&a!==-1e-4&&this._startAt.render(a,!0,c),b||(this._time!==h||d||c)&&this._callback("onUpdate")),e&&(!this._gc||c)&&(0>a&&this._startAt&&!this._onUpdate&&a!==-1e-4&&this._startAt.render(a,!0,c),d&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!b&&this.vars[e]&&this._callback(e),0===i&&this._rawPrevTime===n&&g!==n&&(this._rawPrevTime=0))}},i._kill=function(a,b,c){if("all"===a&&(a=null),null==a&&(null==b||b===this.target))return this._lazy=!1,this._enabled(!1,!1);b="string"!=typeof b?b||this._targets||this.target:H.selector(b)||b;var d,e,f,g,h,i,j,k,l,m=c&&this._time&&c._startTime===this._startTime&&this._timeline===c._timeline,n=this._firstPT;if((q(b)||I(b))&&"number"!=typeof b[0])for(d=b.length;--d>-1;)this._kill(a,b[d],c)&&(i=!0);else{if(this._targets){for(d=this._targets.length;--d>-1;)if(b===this._targets[d]){h=this._propLookup[d]||{},this._overwrittenProps=this._overwrittenProps||[],e=this._overwrittenProps[d]=a?this._overwrittenProps[d]||{}:"all";break}}else{if(b!==this.target)return!1;h=this._propLookup,e=this._overwrittenProps=a?this._overwrittenProps||{}:"all"}if(h){if(j=a||h,k=a!==e&&"all"!==e&&a!==h&&("object"!=typeof a||!a._tempKill),c&&(H.onOverwrite||this.vars.onOverwrite)){for(f in j)h[f]&&(l||(l=[]),l.push(f));if((l||!a)&&!aa(this,c,b,l))return!1}for(f in j)(g=h[f])&&(m&&(g.f?g.t[g.p](g.s):g.t[g.p]=g.s,i=!0),g.pg&&g.t._kill(j)&&(i=!0),g.pg&&0!==g.t._overwriteProps.length||(g._prev?g._prev._next=g._next:g===this._firstPT&&(this._firstPT=g._next),g._next&&(g._next._prev=g._prev),g._next=g._prev=null),delete h[f]),k&&(e[f]=1);!this._firstPT&&this._initted&&n&&this._enabled(!1,!1)}}return i},i.invalidate=function(){return this._notifyPluginsOfEnabled&&H._onPluginEvent("_onDisable",this),this._firstPT=this._overwrittenProps=this._startAt=this._onUpdate=null,this._notifyPluginsOfEnabled=this._active=this._lazy=!1,this._propLookup=this._targets?{}:[],E.prototype.invalidate.call(this),this.vars.immediateRender&&(this._time=-n,this.render(Math.min(0,-this._delay))),this},i._enabled=function(a,b){if(k||j.wake(),a&&this._gc){var c,d=this._targets;if(d)for(c=d.length;--c>-1;)this._siblings[c]=_(d[c],this,!0);else this._siblings=_(this.target,this,!0)}return E.prototype._enabled.call(this,a,b),this._notifyPluginsOfEnabled&&this._firstPT?H._onPluginEvent(a?"_onEnable":"_onDisable",this):!1},H.to=function(a,b,c){return new H(a,b,c)},H.from=function(a,b,c){return c.runBackwards=!0,c.immediateRender=0!=c.immediateRender,new H(a,b,c)},H.fromTo=function(a,b,c,d){return d.startAt=c,d.immediateRender=0!=d.immediateRender&&0!=c.immediateRender,new H(a,b,d)},H.delayedCall=function(a,b,c,d,e){return new H(b,0,{delay:a,onComplete:b,onCompleteParams:c,callbackScope:d,onReverseComplete:b,onReverseCompleteParams:c,immediateRender:!1,lazy:!1,useFrames:e,overwrite:0})},H.set=function(a,b){return new H(a,0,b)},H.getTweensOf=function(a,b){if(null==a)return[];a="string"!=typeof a?a:H.selector(a)||a;var c,d,e,f;if((q(a)||I(a))&&"number"!=typeof a[0]){for(c=a.length,d=[];--c>-1;)d=d.concat(H.getTweensOf(a[c],b));for(c=d.length;--c>-1;)for(f=d[c],e=c;--e>-1;)f===d[e]&&d.splice(c,1)}else if(a._gsTweenID)for(d=_(a).concat(),c=d.length;--c>-1;)(d[c]._gc||b&&!d[c].isActive())&&d.splice(c,1);return d||[]},H.killTweensOf=H.killDelayedCallsTo=function(a,b,c){"object"==typeof b&&(c=b,b=!1);for(var d=H.getTweensOf(a,b),e=d.length;--e>-1;)d[e]._kill(c,a)};var da=u("plugins.TweenPlugin",function(a,b){this._overwriteProps=(a||"").split(","),this._propName=this._overwriteProps[0],this._priority=b||0,this._super=da.prototype},!0);if(i=da.prototype,da.version="1.19.0",da.API=2,i._firstPT=null,i._addTween=Q,i.setRatio=O,i._kill=function(a){var b,c=this._overwriteProps,d=this._firstPT;if(null!=a[this._propName])this._overwriteProps=[];else for(b=c.length;--b>-1;)null!=a[c[b]]&&c.splice(b,1);for(;d;)null!=a[d.n]&&(d._next&&(d._next._prev=d._prev),d._prev?(d._prev._next=d._next,d._prev=null):this._firstPT===d&&(this._firstPT=d._next)),d=d._next;return!1},i._mod=i._roundProps=function(a){for(var b,c=this._firstPT;c;)b=a[this._propName]||null!=c.n&&a[c.n.split(this._propName+"_").join("")],b&&"function"==typeof b&&(2===c.f?c.t._applyPT.m=b:c.m=b),c=c._next},H._onPluginEvent=function(a,b){var c,d,e,f,g,h=b._firstPT;if("_onInitAllProps"===a){for(;h;){for(g=h._next,d=e;d&&d.pr>h.pr;)d=d._next;(h._prev=d?d._prev:f)?h._prev._next=h:e=h,(h._next=d)?d._prev=h:f=h,h=g}h=b._firstPT=e}for(;h;)h.pg&&"function"==typeof h.t[a]&&h.t[a]()&&(c=!0),h=h._next;return c},da.activate=function(a){for(var b=a.length;--b>-1;)a[b].API===da.API&&(S[(new a[b])._propName]=a[b]);return!0},t.plugin=function(a){if(!(a&&a.propName&&a.init&&a.API))throw"illegal plugin definition.";var b,c=a.propName,d=a.priority||0,e=a.overwriteProps,f={init:"_onInitTween",set:"setRatio",kill:"_kill",round:"_mod",mod:"_mod",initAll:"_onInitAllProps"},g=u("plugins."+c.charAt(0).toUpperCase()+c.substr(1)+"Plugin",function(){da.call(this,c,d),this._overwriteProps=e||[]},a.global===!0),h=g.prototype=new da(c);h.constructor=g,g.API=a.API;for(b in f)"function"==typeof a[b]&&(h[f[b]]=a[b]);return g.version=a.version,da.activate([g]),g},g=a._gsQueue){for(h=0;h<g.length;h++)g[h]();for(i in r)r[i].func||a.console.log("GSAP encountered missing dependency: "+i)}k=!1}("undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window,"TweenMax");

/* CUSTOM BOUNCE */
/*!
 * VERSION: 0.2.1
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("easing.CustomBounce",["easing.CustomEase"],function(a){var b,c=function(a){var b,c=a.length,d=1/a[c-2],e=1e3;for(b=2;c>b;b+=2)a[b]=(a[b]*d*e|0)/e;a[c-2]=1},d=function(b,c){this.vars=c=c||{},c.squash&&(this.squash=new a(c.squashID||b+"-squash")),a.call(this,b),this.bounce=this,this.update(c)};return d.prototype=b=new a,b.constructor=d,b.update=function(b){b=b||this.vars;var d,e,f,g,h,i,j,k=.999,l=Math.min(k,b.strength||.7),m=l,n=(b.squash||0)/100,o=n,p=1/.03,q=.2,r=1,s=.1,t=[0,0,.07,0,.1,1,.1,1],u=[0,0,0,0,.1,0,.1,0];for(h=0;200>h&&(q*=m*((m+1)/2),r*=l*l,i=s+q,f=s+.49*q,g=1-r,d=s+r/p,e=f+.8*(f-d),n&&(s+=n,d+=n,f+=n,e+=n,i+=n,j=n/o,u.push(s-n,0,s-n,j,s-n/2,j,s,j,s,0,s,0,s,j*-.6,s+(i-s)/6,0,i,0),t.push(s-n,1,s,1,s,1),n*=l*l),t.push(s,1,d,g,f,g,e,g,i,1,i,1),l*=.95,p=r/(i-e),s=i,!(g>k));h++);if(b.endAtStart){if(f=-.1,t.unshift(f,1,f,1,-.07,0),o)for(n=2.5*o,f-=n,t.unshift(f,1,f,1,f,1),u.splice(0,6),u.unshift(f,0,f,0,f,1,f+n/2,1,f+n,1,f+n,0,f+n,0,f+n,-.6,f+n+.033,0),h=0;h<u.length;h+=2)u[h]-=f;for(h=0;h<t.length;h+=2)t[h]-=f,t[h+1]=1-t[h+1]}return n&&(c(u),u[2]="C"+u[2],this.squash||(this.squash=new a(b.squashID||this.id+"-squash")),this.squash.setData("M"+u.join(","))),c(t),t[2]="C"+t[2],this.setData("M"+t.join(","))},d.create=function(a,b){return new d(a,b)},d.version="0.2.1",d},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(a){"use strict";var b=function(){return(_gsScope.GreenSockGlobals||_gsScope)[a]};"undefined"!=typeof module&&module.exports?(require("./CustomEase.min.js"),require("../TweenLite.min.js"),module.exports=b()):"function"==typeof define&&define.amd&&define(["TweenLite","CustomEase"],b)}("CustomBounce");


/* CUSTOM EASE */
/*!
 * VERSION: 0.2.2
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("easing.CustomEase",["easing.Ease"],function(a){var b=/(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,c=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,d=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,e=/[cLlsS]/g,f="CustomEase only accepts Cubic Bezier data.",g=function(a,b,c,d,e,f,h,i,j,k,l){var m,n=(a+c)/2,o=(b+d)/2,p=(c+e)/2,q=(d+f)/2,r=(e+h)/2,s=(f+i)/2,t=(n+p)/2,u=(o+q)/2,v=(p+r)/2,w=(q+s)/2,x=(t+v)/2,y=(u+w)/2,z=h-a,A=i-b,B=Math.abs((c-h)*A-(d-i)*z),C=Math.abs((e-h)*A-(f-i)*z);return k||(k=[{x:a,y:b},{x:h,y:i}],l=1),k.splice(l||k.length-1,0,{x:x,y:y}),(B+C)*(B+C)>j*(z*z+A*A)&&(m=k.length,g(a,b,n,o,t,u,x,y,j,k,l),g(x,y,v,w,r,s,h,i,j,k,l+1+(k.length-m))),k},h=function(a){var b,e,g,h,i,j,k,l,m,n,o,p=(a+"").replace(d,function(a){var b=+a;return 1e-4>b&&b>-1e-4?0:b}).match(c)||[],q=[],r=0,s=0,t=p.length,u=2;for(b=0;t>b;b++)if(m=h,isNaN(p[b])?(h=p[b].toUpperCase(),i=h!==p[b]):b--,e=+p[b+1],g=+p[b+2],i&&(e+=r,g+=s),b||(k=e,l=g),"M"===h)j&&j.length<8&&(q.length-=1,u=0),r=k=e,s=l=g,j=[e,g],u=2,q.push(j),b+=2,h="L";else if("C"===h)j||(j=[0,0]),j[u++]=e,j[u++]=g,i||(r=s=0),j[u++]=r+1*p[b+3],j[u++]=s+1*p[b+4],j[u++]=r+=1*p[b+5],j[u++]=s+=1*p[b+6],b+=6;else if("S"===h)"C"===m||"S"===m?(n=r-j[u-4],o=s-j[u-3],j[u++]=r+n,j[u++]=s+o):(j[u++]=r,j[u++]=s),j[u++]=e,j[u++]=g,i||(r=s=0),j[u++]=r+=1*p[b+3],j[u++]=s+=1*p[b+4],b+=4;else{if("L"!==h&&"Z"!==h)throw f;"Z"===h&&(e=k,g=l,j.closed=!0),("L"===h||Math.abs(r-e)>.5||Math.abs(s-g)>.5)&&(j[u++]=r+(e-r)/3,j[u++]=s+(g-s)/3,j[u++]=r+2*(e-r)/3,j[u++]=s+2*(g-s)/3,j[u++]=e,j[u++]=g,"L"===h&&(b+=2)),r=e,s=g}return q[0]},i=function(a){var b,c=a.length,d=999999999999;for(b=1;c>b;b+=6)+a[b]<d&&(d=+a[b]);return d},j=function(a,b,c){c||0===c||(c=Math.max(+a[a.length-1],+a[1]));var d,e=-1*+a[0],f=-c,g=a.length,h=1/(+a[g-2]+e),j=-b||(Math.abs(+a[g-1]-+a[1])<.01*(+a[g-2]-+a[0])?i(a)+f:+a[g-1]+f);for(j=j?1/j:-h,d=0;g>d;d+=2)a[d]=(+a[d]+e)*h,a[d+1]=(+a[d+1]+f)*j},k=function(a){var b=this.lookup[a*this.l|0]||this.lookup[this.l-1];return b.nx<a&&(b=b.n),b.y+(a-b.x)/b.cx*b.cy},l=function(b,c,d){this._calcEnd=!0,this.id=b,b&&(a.map[b]=this),this.getRatio=k,this.setData(c,d)},m=l.prototype=new a;return m.constructor=l,m.setData=function(a,c){a=a||"0,0,1,1";var d,i,k,l,m,n,o,p,q,r,s=a.match(b),t=1,u=[];if(c=c||{},r=c.precision||1,this.data=a,this.lookup=[],this.points=u,this.fast=1>=r,(e.test(a)||-1!==a.indexOf("M")&&-1===a.indexOf("C"))&&(s=h(a)),d=s.length,4===d)s.unshift(0,0),s.push(1,1),d=8;else if((d-2)%6)throw f;for((0!==+s[0]||1!==+s[d-2])&&j(s,c.height,c.originY),this.rawBezier=s,l=2;d>l;l+=6)i={x:+s[l-2],y:+s[l-1]},k={x:+s[l+4],y:+s[l+5]},u.push(i,k),g(i.x,i.y,+s[l],+s[l+1],+s[l+2],+s[l+3],k.x,k.y,1/(2e5*r),u,u.length-1);for(d=u.length,l=0;d>l;l++)o=u[l],p=u[l-1]||o,o.x>p.x||p.y!==o.y&&p.x===o.x||o===p?(p.cx=o.x-p.x,p.cy=o.y-p.y,p.n=o,p.nx=o.x,this.fast&&l>1&&Math.abs(p.cy/p.cx-u[l-2].cy/u[l-2].cx)>2&&(this.fast=!1),p.cx<t&&(p.cx?t=p.cx:(p.cx=.001,l===d-1&&(p.x-=.001,t=Math.min(t,.001),this.fast=!1)))):(u.splice(l--,1),d--);if(d=1/t+1|0,this.l=d,m=1/d,n=0,o=u[0],this.fast){for(l=0;d>l;l++)q=l*m,o.nx<q&&(o=u[++n]),i=o.y+(q-o.x)/o.cx*o.cy,this.lookup[l]={x:q,cx:m,y:i,cy:0,nx:9},l&&(this.lookup[l-1].cy=i-this.lookup[l-1].y);this.lookup[d-1].cy=u[u.length-1].y-i}else{for(l=0;d>l;l++)o.nx<l*m&&(o=u[++n]),this.lookup[l]=o;n<u.length-1&&(this.lookup[l-1]=u[u.length-2])}return this._calcEnd=1!==u[u.length-1].y||0!==u[0].y,this},m.getRatio=k,m.getSVGData=function(a){return l.getSVGData(this,a)},l.create=function(a,b,c){return new l(a,b,c)},l.version="0.2.2",l.bezierToPoints=g,l.get=function(b){return a.map[b]},l.getSVGData=function(b,c){c=c||{};var d,e,f,g,h,i,j,k,l,m,n=1e3,o=c.width||100,p=c.height||100,q=c.x||0,r=(c.y||0)+p,s=c.path;if(c.invert&&(p=-p,r=0),b=b.getRatio?b:a.map[b]||console.log("No ease found: ",b),b.rawBezier){for(d=[],j=b.rawBezier.length,f=0;j>f;f+=2)d.push(((q+b.rawBezier[f]*o)*n|0)/n+","+((r+b.rawBezier[f+1]*-p)*n|0)/n);d[0]="M"+d[0],d[1]="C"+d[1]}else for(d=["M"+q+","+r],j=Math.max(5,200*(c.precision||1)),g=1/j,j+=2,k=5/j,l=((q+g*o)*n|0)/n,m=((r+b.getRatio(g)*-p)*n|0)/n,e=(m-r)/(l-q),f=2;j>f;f++)h=((q+f*g*o)*n|0)/n,i=((r+b.getRatio(f*g)*-p)*n|0)/n,(Math.abs((i-m)/(h-l)-e)>k||f===j-1)&&(d.push(l+","+m),e=(i-m)/(h-l)),l=h,m=i;return s&&("string"==typeof s?document.querySelector(s):s).setAttribute("d",d.join(" ")),d.join(" ")},l},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(a){"use strict";var b=function(){return(_gsScope.GreenSockGlobals||_gsScope)[a]};"undefined"!=typeof module&&module.exports?(require("../TweenLite.min.js"),module.exports=b()):"function"==typeof define&&define.amd&&define(["TweenLite"],b)}("CustomEase");

/* CUSTOM WIGGLE */
/*!
 * VERSION: 0.2.1
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("easing.CustomWiggle",["easing.CustomEase","easing.Ease"],function(a,b){var c,d={easeOut:new a("","M0,1,C0.7,1,0.6,0,1,0"),easeInOut:new a("","M0,0,C0.104,0,0.242,1,0.444,1,0.644,1,0.608,0,1,0"),anticipate:new a("","M0,0,C0,0.222,0.024,0.386,0.06,0.402,0.181,0.455,0.647,0.646,0.7,0.67,0.9,0.76,1,0.846,1,1"),uniform:new a("","M0,0,C0,0.95,0.01,1,0.01,1,0.01,1,1,1,1,1,1,1,1,0.01,1,0")},e=new a,f=function(c,d){return c=c.getRatio?c:b.map[c]||new a("",c),c.rawBezier||!d?c:{getRatio:function(a){return 1-c.getRatio(a)}}},g=function(b,c){this.vars=c||{},a.call(this,b),this.update(this.vars)};return g.prototype=c=new a,c.constructor=g,c.update=function(a){a=a||this.vars;var b,c,g,h,i,j,k,l,m,n=0|(a.wiggles||10),o=1/n,p=o/2,q="anticipate"===a.type,r=d[a.type]||d.easeOut,s=e,t=1e3;if(q&&(s=r,r=d.easeOut),a.timingEase&&(s=f(a.timingEase)),a.amplitudeEase&&(r=f(a.amplitudeEase,!0)),j=s.getRatio(p),k=q?-r.getRatio(p):r.getRatio(p),l=[0,0,j/4,0,j/2,k,j,k],"random"===a.type){for(l.length=4,b=s.getRatio(o),c=2*Math.random()-1,m=2;n>m;m++)p=b,k=c,b=s.getRatio(o*m),c=2*Math.random()-1,g=Math.atan2(c-l[l.length-3],b-l[l.length-4]),h=Math.cos(g)*o,i=Math.sin(g)*o,l.push(p-h,k-i,p,k,p+h,k+i);l.push(b,0,1,0)}else{for(m=1;n>m;m++)l.push(s.getRatio(p+o/2),k),p+=o,k=(k>0?-1:1)*r.getRatio(m*o),j=s.getRatio(p),l.push(s.getRatio(p-o/2),k,j,k);l.push(s.getRatio(p+o/4),k,s.getRatio(p+o/4),0,1,0)}for(m=l.length;--m>-1;)l[m]=(l[m]*t|0)/t;l[2]="C"+l[2],this.setData("M"+l.join(","))},g.create=function(a,b){return new g(a,b)},g.version="0.2.1",g.eases=d,g},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(a){"use strict";var b=function(){return(_gsScope.GreenSockGlobals||_gsScope)[a]};"undefined"!=typeof module&&module.exports?(require("./CustomEase.min.js"),require("../TweenLite.min.js"),module.exports=b()):"function"==typeof define&&define.amd&&define(["TweenLite","CustomEase"],b)}("CustomWiggle");


/*!
 * VERSION: 0.6.1
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * SplitText is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;!function(a){"use strict";var b=a.GreenSockGlobals||a,c=function(a){var c,d=a.split("."),e=b;for(c=0;c<d.length;c++)e[d[c]]=e=e[d[c]]||{};return e},d=c("com.greensock.utils"),e=function(a){var b=a.nodeType,c="";if(1===b||9===b||11===b){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===b||4===b)return a.nodeValue;return c},f=document,g=f.defaultView?f.defaultView.getComputedStyle:function(){},h=/([A-Z])/g,i=function(a,b,c,d){var e;return(c=c||g(a,null))?(a=c.getPropertyValue(b.replace(h,"-$1").toLowerCase()),e=a||c.length?a:c[b]):a.currentStyle&&(c=a.currentStyle,e=c[b]),d?e:parseInt(e,10)||0},j=function(a){return a.length&&a[0]&&(a[0].nodeType&&a[0].style&&!a.nodeType||a[0].length&&a[0][0])?!0:!1},k=function(a){var b,c,d,e=[],f=a.length;for(b=0;f>b;b++)if(c=a[b],j(c))for(d=c.length,d=0;d<c.length;d++)e.push(c[d]);else e.push(c);return e},l=function(a,b){for(var c,d=b.length;--d>-1;)if(c=b[d],a.substr(0,c.length)===c)return c.length},m=/(?:\r|\n|\t\t)/g,n=/(?:\s\s+)/g,o=55296,p=56319,q=56320,r=127462,s=127487,t=127995,u=127999,v=function(a){return(a.charCodeAt(0)-o<<10)+(a.charCodeAt(1)-q)+65536},w=f.all&&!f.addEventListener,x=" style='position:relative;display:inline-block;"+(w?"*display:inline;*zoom:1;'":"'"),y=function(a,b){a=a||"";var c=-1!==a.indexOf("++"),d=1;return c&&(a=a.split("++").join("")),function(){return"<"+b+x+(a?" class='"+a+(c?d++:"")+"'>":">")}},z=d.SplitText=b.SplitText=function(a,b){if("string"==typeof a&&(a=z.selector(a)),!a)throw"cannot split a null element.";this.elements=j(a)?k(a):[a],this.chars=[],this.words=[],this.lines=[],this._originals=[],this.vars=b||{},this.split(b)},A=function(a,b,c){var d=a.nodeType;if(1===d||9===d||11===d)for(a=a.firstChild;a;a=a.nextSibling)A(a,b,c);else(3===d||4===d)&&(a.nodeValue=a.nodeValue.split(b).join(c))},B=function(a,b){for(var c=b.length;--c>-1;)a.push(b[c])},C=function(a){var b,c=[],d=a.length;for(b=0;b!==d;c.push(a[b++]));return c},D=function(a,b,c){for(var d;a&&a!==b;){if(d=a._next||a.nextSibling)return d.textContent.charAt(0)===c;a=a.parentNode||a._parent}return!1},E=function(a){var b,c,d=C(a.childNodes),e=d.length;for(b=0;e>b;b++)c=d[b],c._isSplit?E(c):(b&&3===c.previousSibling.nodeType?c.previousSibling.nodeValue+=3===c.nodeType?c.nodeValue:c.firstChild.nodeValue:3!==c.nodeType&&a.insertBefore(c.firstChild,c),a.removeChild(c))},F=function(a,b,c,d,e,h,j){var k,l,m,n,o,p,q,r,s,t,u,v,w=g(a),x=i(a,"paddingLeft",w),y=-999,z=i(a,"borderBottomWidth",w)+i(a,"borderTopWidth",w),C=i(a,"borderLeftWidth",w)+i(a,"borderRightWidth",w),F=i(a,"paddingTop",w)+i(a,"paddingBottom",w),G=i(a,"paddingLeft",w)+i(a,"paddingRight",w),H=.2*i(a,"fontSize"),I=i(a,"textAlign",w,!0),J=[],K=[],L=[],M=b.wordDelimiter||" ",N=b.span?"span":"div",O=b.type||b.split||"chars,words,lines",P=e&&-1!==O.indexOf("lines")?[]:null,Q=-1!==O.indexOf("words"),R=-1!==O.indexOf("chars"),S="absolute"===b.position||b.absolute===!0,T=b.linesClass,U=-1!==(T||"").indexOf("++"),V=[];for(U&&(T=T.split("++").join("")),l=a.getElementsByTagName("*"),m=l.length,o=[],k=0;m>k;k++)o[k]=l[k];if(P||S)for(k=0;m>k;k++)n=o[k],p=n.parentNode===a,(p||S||R&&!Q)&&(v=n.offsetTop,P&&p&&Math.abs(v-y)>H&&("BR"!==n.nodeName||0===k)&&(q=[],P.push(q),y=v),S&&(n._x=n.offsetLeft,n._y=v,n._w=n.offsetWidth,n._h=n.offsetHeight),P&&((n._isSplit&&p||!R&&p||Q&&p||!Q&&n.parentNode.parentNode===a&&!n.parentNode._isSplit)&&(q.push(n),n._x-=x,D(n,a,M)&&(n._wordEnd=!0)),"BR"===n.nodeName&&(n.nextSibling&&"BR"===n.nextSibling.nodeName||0===k)&&P.push([])));for(k=0;m>k;k++)n=o[k],p=n.parentNode===a,"BR"!==n.nodeName?(S&&(s=n.style,Q||p||(n._x+=n.parentNode._x,n._y+=n.parentNode._y),s.left=n._x+"px",s.top=n._y+"px",s.position="absolute",s.display="block",s.width=n._w+1+"px",s.height=n._h+"px"),!Q&&R?n._isSplit?(n._next=n.nextSibling,n.parentNode.appendChild(n)):n.parentNode._isSplit?(n._parent=n.parentNode,!n.previousSibling&&n.firstChild&&(n.firstChild._isFirst=!0),n.nextSibling&&" "===n.nextSibling.textContent&&!n.nextSibling.nextSibling&&V.push(n.nextSibling),n._next=n.nextSibling&&n.nextSibling._isFirst?null:n.nextSibling,n.parentNode.removeChild(n),o.splice(k--,1),m--):p||(v=!n.nextSibling&&D(n.parentNode,a,M),n.parentNode._parent&&n.parentNode._parent.appendChild(n),v&&n.parentNode.appendChild(f.createTextNode(" ")),b.span&&(n.style.display="inline"),J.push(n)):n.parentNode._isSplit&&!n._isSplit&&""!==n.innerHTML?K.push(n):R&&!n._isSplit&&(b.span&&(n.style.display="inline"),J.push(n))):P||S?(n.parentNode&&n.parentNode.removeChild(n),o.splice(k--,1),m--):Q||a.appendChild(n);for(k=V.length;--k>-1;)V[k].parentNode.removeChild(V[k]);if(P){for(S&&(t=f.createElement(N),a.appendChild(t),u=t.offsetWidth+"px",v=t.offsetParent===a?0:a.offsetLeft,a.removeChild(t)),s=a.style.cssText,a.style.cssText="display:none;";a.firstChild;)a.removeChild(a.firstChild);for(r=" "===M&&(!S||!Q&&!R),k=0;k<P.length;k++){for(q=P[k],t=f.createElement(N),t.style.cssText="display:block;text-align:"+I+";position:"+(S?"absolute;":"relative;"),T&&(t.className=T+(U?k+1:"")),L.push(t),m=q.length,l=0;m>l;l++)"BR"!==q[l].nodeName&&(n=q[l],t.appendChild(n),r&&n._wordEnd&&t.appendChild(f.createTextNode(" ")),S&&(0===l&&(t.style.top=n._y+"px",t.style.left=x+v+"px"),n.style.top="0px",v&&(n.style.left=n._x-v+"px")));0===m?t.innerHTML="&nbsp;":Q||R||(E(t),A(t,String.fromCharCode(160)," ")),S&&(t.style.width=u,t.style.height=n._h+"px"),a.appendChild(t)}a.style.cssText=s}S&&(j>a.clientHeight&&(a.style.height=j-F+"px",a.clientHeight<j&&(a.style.height=j+z+"px")),h>a.clientWidth&&(a.style.width=h-G+"px",a.clientWidth<h&&(a.style.width=h+C+"px"))),B(c,J),Q&&B(d,K),B(e,L)},G=function(a,b,c,d){var g,h,i,j,k,q,w,x,y,z,B=b.span?"span":"div",C=b.type||b.split||"chars,words,lines",D=-1!==C.indexOf("chars"),E="absolute"===b.position||b.absolute===!0,F=b.wordDelimiter||" ",G=" "!==F?"":E?"&#173; ":" ",H=b.span?"</span>":"</div>",I=!0,J=b.specialChars?"function"==typeof b.specialChars?b.specialChars:l:null,K=f.createElement("div"),L=a.parentNode;for(L.insertBefore(K,a),K.textContent=a.nodeValue,L.removeChild(a),a=K,g=e(a),w=-1!==g.indexOf("<"),b.reduceWhiteSpace!==!1&&(g=g.replace(n," ").replace(m,"")),w&&(g=g.split("<").join("{{LT}}")),k=g.length,h=(" "===g.charAt(0)?G:"")+c(),i=0;k>i;i++)if(q=g.charAt(i),J&&(z=J(g.substr(i),b.specialChars)))q=g.substr(i,z||1),h+=D&&" "!==q?d()+q+"</"+B+">":q,i+=z-1;else if(q===F&&g.charAt(i-1)!==F&&i){for(h+=I?H:"",I=!1;g.charAt(i+1)===F;)h+=G,i++;i===k-1?h+=G:")"!==g.charAt(i+1)&&(h+=G+c(),I=!0)}else"{"===q&&"{{LT}}"===g.substr(i,6)?(h+=D?d()+"{{LT}}</"+B+">":"{{LT}}",i+=5):q.charCodeAt(0)>=o&&q.charCodeAt(0)<=p||g.charCodeAt(i+1)>=65024&&g.charCodeAt(i+1)<=65039?(x=v(g.substr(i,2)),y=v(g.substr(i+2,2)),j=x>=r&&s>=x&&y>=r&&s>=y||y>=t&&u>=y?4:2,h+=D&&" "!==q?d()+g.substr(i,j)+"</"+B+">":g.substr(i,j),i+=j-1):h+=D&&" "!==q?d()+q+"</"+B+">":q;a.outerHTML=h+(I?H:""),w&&A(L,"{{LT}}","<")},H=function(a,b,c,d){var e,f,g=C(a.childNodes),h=g.length,j="absolute"===b.position||b.absolute===!0;if(3!==a.nodeType||h>1){for(b.absolute=!1,e=0;h>e;e++)f=g[e],(3!==f.nodeType||/\S+/.test(f.nodeValue))&&(j&&3!==f.nodeType&&"inline"===i(f,"display",null,!0)&&(f.style.display="inline-block",f.style.position="relative"),f._isSplit=!0,H(f,b,c,d));return b.absolute=j,void(a._isSplit=!0)}G(a,b,c,d)},I=z.prototype;I.split=function(a){this.isSplit&&this.revert(),this.vars=a=a||this.vars,this._originals.length=this.chars.length=this.words.length=this.lines.length=0;for(var b,c,d,e=this.elements.length,f=a.span?"span":"div",g=y(a.wordsClass,f),h=y(a.charsClass,f);--e>-1;)d=this.elements[e],this._originals[e]=d.innerHTML,b=d.clientHeight,c=d.clientWidth,H(d,a,g,h),F(d,a,this.chars,this.words,this.lines,c,b);return this.chars.reverse(),this.words.reverse(),this.lines.reverse(),this.isSplit=!0,this},I.revert=function(){if(!this._originals)throw"revert() call wasn't scoped properly.";for(var a=this._originals.length;--a>-1;)this.elements[a].innerHTML=this._originals[a];return this.chars=[],this.words=[],this.lines=[],this.isSplit=!1,this},z.selector=a.$||a.jQuery||function(b){var c=a.$||a.jQuery;return c?(z.selector=c,c(b)):"undefined"==typeof document?b:document.querySelectorAll?document.querySelectorAll(b):document.getElementById("#"===b.charAt(0)?b.substr(1):b)},z.version="0.6.1"}(_gsScope),function(a){"use strict";var b=function(){return(_gsScope.GreenSockGlobals||_gsScope)[a]};"undefined"!=typeof module&&module.exports?module.exports=b():"function"==typeof define&&define.amd&&define([],b)}("SplitText");

/* CREATE CUSTOM EASE */
punchgs.SFXBounceLite = punchgs.CustomBounce.create("SFXBounceLite", { strength:0.3 ,squash:1, squashID:"SFXBounceLite-squash"});
punchgs.SFXBounceSolid = punchgs.CustomBounce.create("SFXBounceSolid", { strength:0.5,squash:2,squashID:"SFXBounceSolid-squash"});
punchgs.SFXBounceStrong = punchgs.CustomBounce.create("SFXBounceStrong", { strength:0.7,squash:3,squashID:"SFXBounceStrong-squash"});
punchgs.SFXBounceExtrem = punchgs.CustomBounce.create("SFXBounceExtrem", { strength:0.9,squash:4,squashID:"SFXBounceExtrem-squash"});

punchgs.BounceLite = punchgs.CustomBounce.create("BounceLite", { strength:0.3 });
punchgs.BounceSolid = punchgs.CustomBounce.create("BounceSolid", { strength:0.5});
punchgs.BounceStrong = punchgs.CustomBounce.create("BounceStrong", { strength:0.7});
punchgs.BounceExtrem = punchgs.CustomBounce.create("BounceExtrem", { strength:0.9});

try{
	window.GreenSockGlobals = null;
	window._gsQueue = null;
	window._gsDefine = null;
	delete(window.GreenSockGlobals);
	delete(window._gsQueue);
	delete(window._gsDefine);	
   } catch(e) {}

try{
	window.GreenSockGlobals = RS_CacheGS;
	window._gsQueue = RS_CacheGS_queue;
	window._gsDefine = RS_Cache_define;
	} catch(e) {}


(function(e,t){
		e.waitForImages={hasImageProperties:["backgroundImage","listStyleImage","borderImage","borderCornerImage"]};e.expr[":"].uncached=function(t){var n=document.createElement("img");n.src=t.src;return e(t).is('img[src!=""]')&&!n.complete};e.fn.waitForImages=function(t,n,r){if(e.isPlainObject(arguments[0])){n=t.each;r=t.waitForAll;t=t.finished}t=t||e.noop;n=n||e.noop;r=!!r;if(!e.isFunction(t)||!e.isFunction(n)){throw new TypeError("An invalid callback was supplied.")}return this.each(function(){var i=e(this),s=[];if(r){var o=e.waitForImages.hasImageProperties||[],u=/url\((['"]?)(.*?)\1\)/g;i.find("*").each(function(){var t=e(this);if(t.is("img:uncached")){s.push({src:t.attr("src"),element:t[0]})}e.each(o,function(e,n){var r=t.css(n);if(!r){return true}var i;while(i=u.exec(r)){s.push({src:i[2],element:t[0]})}})})}else{i.find("img:uncached").each(function(){s.push({src:this.src,element:this})})}var f=s.length,l=0;if(f==0){t.call(i[0])}e.each(s,function(r,s){var o=new Image;e(o).bind("load error",function(e){l++;n.call(s.element,l,f,e.type=="load");if(l==f){t.call(i[0]);return false}});o.src=s.src})})};		
})(jQuery);

;/*!

  - Slider Revolution 6.0 JavaScript Plugin -

..........................xXXXXX.................
................. xXXXXX..xXXXXX..xXXXXX.........
..................xXXXXX..xXXXXX..xXXXXX.........
..........xXXXXX..xXXXXX..xXXXXX..xXXXXX.........
..........xXXXXX..xXXXXX..xXXXXX..xXXXXX.........
..........xXXXXX..xXXXXX..xXXXXX..xXXXXX.........
..........xXXXXX..xXXXXX..xXXXXX..xXXXXX.........
..........xXXXXX..xXXXXX..xXXXXX..xXXXXX.........
.........,xXXXXX..xXXXXX..xXXXXX..xXXXXX.........
.........,xXXXXX..xXXXXX..xXXXXX..xXXXXX.........
.........,xXXXXX..xXXXXX..xXXXXX..xXXXXX.........
..........xXXXXX..xXXXXX..xXXXXX..xXXXXX.........
.....................xxxxxxxxxxxxxxxxxxx.........
.....................xxxxxxxxxxxxxxxxxxx.........
.....................xxxxxxxxxxxxxxxxxxx.........

				VERSION: 6.1.1
			   DATE: 2019-09-03
    @author: Krisztian Horvath, ThemePunch OHG.


UPDATES AND DOCS AT: 
https://www.themepunch.com/support-center
			
GET LICENSE AT: 
https://codecanyon.net/item/slider-revolution-responsive-wordpress-plugin/2751380?ref=themepunch

LICENSE:
Copyright (c) 2009-2019, ThemePunch. All rights reserved.
This work is subject to the terms at https://codecanyon.net/licenses/standard (Regular / Extended)

*/
!function(e,t){"use strict";var i;e.fn.extend({revolution:function(a){return this.each(function(){for(var o=document.getElementsByClassName("rs-p-wp-fix");o[0];)o[0].parentNode.removeChild(o[0]);var s=this.id=this.id===t?"rs_module_"+Math.round(1e7*Math.random()):this.id;e.fn.revolution[s]=V(a),(i=e.fn.revolution)[s].c=e(this),i[s].cpar=i[s].c.parent(),i[s].canvas=i[s].c.find("rs-slides"),i[s].stopAfterLoops!=t&&i[s].stopAfterLoops>-1?i[s].looptogo=i[s].stopAfterLoops:i[s].looptogo="disabled",window._T=i[s],i[s].BUG_safari_clipPath="Safari"===i.get_browser()&&i.get_browser_version()>"12",i[s].BUG_ie_clipPath="Edge"===i.get_browser()||"IE"===i.get_browser(),i[s].anyid=[],i[s].indexhelper=0,i[s].level=0,i[s].rtl=e("body").hasClass("rtl"),i[s].minHeight=i[s].minHeight!=t&&""!==i[s].minHeight?parseInt(i[s].minHeight,0):0,r(s),"hero"==i[s].sliderType&&i[s].c.find("rs-slide").each(function(t){t>0&&e(this).remove()}),i[s].navigation.use="hero"!==i[s].sliderType&&("carousel"==i[s].sliderType||i[s].navigation.keyboardNavigation||"on"==i[s].navigation.mouseScrollNavigation||"carousel"==i[s].navigation.mouseScrollNavigation||i[s].navigation.touch.touchenabled||i[s].navigation.arrows.enable||i[s].navigation.bullets.enable||i[s].navigation.thumbnails.enable||i[s].navigation.tabs.enable),i[s].c.find("rs-bgvideo").each(function(){"RS-BGVIDEO"!==this.tagName||this.id!==t&&""!==this.id||(this.id="rs-bg-video-"+Math.round(1e6*Math.random()))}),punchgs.force3D="auto",c(s)})},getRSVersion:function(e){var t,i,a=window.SliderRevolutionVersion;if(!e){for(var r in t=i="---------------------------------------------------------\n",t+="    Currently Loaded Slider Revolution & SR Modules :\n"+i,a)a.hasOwnProperty(r)&&(t+=a[r].alias+": "+a[r].ver+"\n");t+=i}return e?a:t},revremoveslide:function(t){return this.each(function(){var a=this.id;if(!(t<0||t>i[a].slideamount)&&i[a]&&i[a].slides.length>0&&(t>0||t<=i[a].slides.length)){var r=i[a].slides[t].dataset.key;i[a].slideamount=i[a].slideamount-1,i[a].realslideamount=i[a].realslideamount-1,s("rs-bullet",r,a),s("rs-tab",r,a),s("rs-thumb",r,a),e(i[a].slides[t]).remove(),i[a].slides=o(i[a].slides,t),i[a].carousel&&i[a].carousel.slides&&(i[a].carousel.slides=o(i[a].carousel.slides,t)),i[a].thumbs=o(i[a].thumbs,t),i.updateNavIndexes&&i.updateNavIndexes(a),t<=i[a].pr_active_key&&(i[a].pr_active_key=i[a].pr_active_key-1)}})},revaddcallback:function(e){return this.each(function(){i[this.id]&&(i[this.id].callBackArray===t&&(i[this.id].callBackArray=[]),i[this.id].callBackArray.push(e))})},revgetparallaxproc:function(){if(i[this[0].id])return i[this[0].id].scrollproc},revdebugmode:function(){},revscroll:function(t){return this.each(function(){var i=e(this);e("body,html").animate({scrollTop:i.offset().top+i.height()-t+"px"},{duration:400})})},revredraw:function(){return this.each(function(){m(this.id)})},revkill:function(){return this.each(function(){var a=this.id;punchgs.TweenMax.killDelayedCallsTo(i.showHideNavElements),i[a].c.data("conthover",1),i[a].c.data("conthoverchanged",1),i[a].c.trigger("revolution.slide.onpause");var r=i[a].cpar.find("rs-progress");i[a].c[0].opt;i[a].tonpause=!0,i[a].c.trigger("stoptimer"),i[a].sliderisrunning=!1;var o="resize.revslider-"+i[a].c.attr("id");e(window).unbind(o),punchgs.TweenMax.killTweensOf(i[a].c.find("*"),!1),punchgs.TweenMax.killTweensOf(i[a].c,!1),i[a].c.unbind("hover, mouseover, mouseenter,mouseleave, resize"),o="resize.revslider-"+i[a].c.attr("id"),e(window).off(o),i[a].c.find("*").each(function(){var i=e(this);i.unbind("on, hover, mouseenter,mouseleave,mouseover, resize,restarttimer, stoptimer"),i.off("on, hover, mouseenter,mouseleave,mouseover, resize"),i.data("mySplitText",null),i.data("ctl",null),i.data("tween")!=t&&i.data("tween").kill(),i.data("pztl")!=t&&i.data("pztl").kill(),i.data("timeline_out")!=t&&i.data("timeline_out").kill(),i.data("timeline")!=t&&i.data("timeline").kill(),i.remove(),i.empty(),i=null}),punchgs.TweenMax.killTweensOf(i[a].c.find("*"),!1),punchgs.TweenMax.killTweensOf(i[a].c,!1),r.remove();try{i[a].c.closest("rs-fullwidth-wrap").remove()}catch(e){}try{i[a].c.closest("rs-module-wrap").remove()}catch(e){}try{i[a].c.remove()}catch(e){}i[a].c.empty(),i[a].c.html(),i[a].c=null})},revpause:function(){return this.each(function(){var a=e(this);a!=t&&a.length>0&&e("body").find("#"+a.attr("id")).length>0&&(a.data("conthover",1),a.data("conthoverchanged",1),a.trigger("revolution.slide.onpause"),i[this.id].tonpause=!0,a.trigger("stoptimer"))})},revresume:function(){return this.each(function(){if(i[this.id]!==t){var a=e(this);a.data("conthover",0),a.data("conthoverchanged",1),a.trigger("revolution.slide.onresume"),i[this.id].tonpause=!1,a.trigger("starttimer")}})},revmodal:function(a){var r=this instanceof e?this[0]:this,o=r.id;i[r.id]!==t&&i.revModal(o,a)},revstart:function(){var a=this instanceof e?this[0]:this;return i[a.id]===t?(console.log("Slider is Not Existing"),!1):i[a.id].sliderisrunning?(console.log("Slider Is Running Already"),!1):(i[a.id].c=e(a),i[a.id].canvas=i[a.id].c.find("rs-slides"),h(a.id),!0)},revnext:function(){return this.each(function(){i[this.id]!==t&&i.callingNewSlide(this.id,1,"carousel"===i[this.id].sliderType)})},revprev:function(){return this.each(function(){i[this.id]!==t&&i.callingNewSlide(this.id,-1,"carousel"===i[this.id].sliderType)})},revmaxslide:function(){return e(this).find("rs-slide").length},revcurrentslide:function(){if(i[e(this)[0].id]!==t)return parseInt(i[e(this)[0].id].pr_active_key,0)+1},revlastslide:function(){return e(this).find("rs-slide").length},revshowslide:function(e){return this.each(function(){i[this.id]!==t&&e!==t&&i.callingNewSlide(this.id,"to"+(e-1))})},revcallslidewithid:function(e){return this.each(function(){i[this.id]!==t&&i.callingNewSlide(this.id,e,"carousel"===i[this.id].sliderType)})}}),i=e.fn.revolution,e.extend(!0,i,{updateFixedScrollTimes:function(e){!0===i[e].sbtimeline.set&&!0===i[e].sbtimeline.fixed&&"auto"!==i[e].sliderLayout&&(i[e].sbtimeline.rest=i[e].duration-i[e].sbtimeline.fixEnd,i[e].sbtimeline.time=i[e].duration-(i[e].sbtimeline.fixStart+i[e].sbtimeline.rest),i[e].sbtimeline.extended=i[e].sbtimeline.time/10)},callContWidthManager:function(e){g(e)},revModal:function(a,r){if(a!==t&&i[a]!==t)switch(r.mode){case"show":r.slide=r.slide===t?"to0":r.slide,i[a].modal.bodyclass!==t&&i[a].modal.bodyclass.length>=0&&document.body.classList.add(i[a].modal.bodyclass),punchgs.TweenMax.to(i[a].modal.bg,2,{display:"block",opacity:1,ease:punchgs.Power3.easeInOut}),punchgs.TweenMax.set(i[a].modal.c,{display:"auto"===i[a].sliderLayout?"inline-block":"block",opacity:0}),punchgs.TweenMax.set(i[a].cpar,{display:"block",opacity:1}),punchgs.TweenMax.fromTo([i[a].modal.c],.01,{opacity:0},{opacity:1,ease:punchgs.Power3.easeInOut,onComplete:function(){i[a].sliderisrunning?i.callingNewSlide(a,r.slide):("to0"!==r.slide&&(i[a].startWithSlideKey=r.slide),h(a))}}),window.overscrollhistory=document.body.style.overflow,document.body.style.overflow="hidden";break;case"close":C(a),document.body.style.overflow=window.overscrollhistory,i[a].modal.bodyclass!==t&&i[a].modal.bodyclass.length>=0&&document.body.classList.remove(i[a].modal.bodyclass),punchgs.TweenMax.to(i[a].modal.bg,2,{display:"none",opacity:0,ease:punchgs.Power3.easeInOut}),punchgs.TweenMax.to(i[a].modal.c,.3,{display:"none",delay:.5,opacity:0,onComplete:function(){punchgs.TweenMax.set(i[a].cpar,{display:"none",opacity:0}),e(document).trigger("revolution.all.resize")}});break;case"init":if(window.RS_60_MODALS=window.RS_60_MODALS===t?[]:window.RS_60_MODALS,-1===e.inArray(i[a].modal.alias,window.RS_60_MODALS)&&window.RS_60_MODALS.push(i[a].modal.alias),i[a].modal.listener===t){i[a].modal.c=e("#"+a+"_modal"),i[a].modal.bg=e('<rs-modal-cover data-rid="'+a+'" id="'+a+'_modal_bg"></rs-modal-cover>'),"auto"===i[a].sliderLayout&&i[a].modal.cover?e("body").append(i[a].modal.bg):i[a].modal.c.append(i[a].modal.bg),i[a].modal.c[0].className+="rs-modal-"+i[a].sliderLayout;var o={left:"auto"===i[a].sliderLayout?"center"===i[a].modal.horizontal?"50%":"left"===i[a].modal.horizontal?"0px":"auto":"0px",right:"auto"===i[a].sliderLayout?"center"===i[a].modal.horizontal?"auto":"left"===i[a].modal.horizontal?"auto":"0px":"0px",top:"auto"===i[a].sliderLayout||"fullwidth"===i[a].sliderLayout?"middle"===i[a].modal.vertical?"50%":"top"===i[a].modal.vertical?"0px":"auto":"0px",bottom:"auto"===i[a].sliderLayout||"fullwidth"===i[a].sliderLayout?"middle"===i[a].modal.vertical?"auto":"top"===i[a].modal.vertical?"auto":"0px":"0px",y:("auto"===i[a].sliderLayout||"fullwidth"===i[a].sliderLayout)&&"middle"===i[a].modal.vertical?"-50%":0,x:"auto"===i[a].sliderLayout&&"center"===i[a].modal.horizontal?"-50%":0};punchgs.TweenMax.set(i[a].modal.c,"auto"===i[a].sliderLayout||"fullscreen"===i[a].sliderLayout?e.extend(!0,o,{opacity:0,display:"none"}):{opacity:0,display:"none"}),"fullwidth"===i[a].sliderLayout&&punchgs.TweenMax.set(i[a].modal.c.find("rs-module-wrap"),o),!1!==i[a].modal.cover&&"false"!==i[a].modal.cover||(i[a].modal.coverColor="transparent"),punchgs.TweenMax.set(i[a].modal.bg,{display:"none",background:i[a].modal.coverColor,opacity:0}),e(document).on("RS_OPENMODAL_"+i[a].modal.alias,function(e,t){i.revModal(a,{mode:"show",slide:t})}),e(document).on("click","rs-modal-cover",function(){i.revModal(this.dataset.rid,{mode:"close"})}),i[a].modal.listener=!0}}},smartConvertDivs:function(e){var t="";if("string"==typeof e&&e.indexOf("#")>=0){var i=e.split(","),a=i.length-1;for(var r in i)t="string"==typeof i[r]&&"#"===i[r][0]?t+i[r][1]/i[r][3]*100+"%"+(r<a?",":""):t+i[r]+(r<a?",":"")}else t=e;return t},revToResp:function(e,i,a,r){if((e=e===t?a:e)!==t){if(r=r===t?",":r,"boolean"!=typeof e&&("object"!=typeof e||Array.isArray(e))){try{e=e.replace(/[[\]]/g,"").replace(/\'/g,"").split(r)}catch(e){}for(e=Array.isArray(e)?e:[e];e.length<i;)e[e.length]=e[e.length-1]}return e}},updateVisibleArea:function(a){for(var r in i[a].viewPort.visible_area=i.revToResp(i[a].viewPort.visible_area,i[a].rle,"200px"),i[a].viewPort.vaType=new Array(4),i[a].viewPort.visible_area)i[a].viewPort.visible_area.hasOwnProperty(r)&&(e.isNumeric(i[a].viewPort.visible_area[r])&&(i[a].viewPort.visible_area[r]+="%"),i[a].viewPort.visible_area[r]!==t&&(i[a].viewPort.vaType[r]=i[a].viewPort.visible_area[r].indexOf("%")>=0?"%":"px"),i[a].viewPort.visible_area[r]=parseInt(i[a].viewPort.visible_area[r],0),i[a].viewPort.visible_area[r]="%"==i[a].viewPort.vaType[r]?i[a].viewPort.visible_area[r]/100:i[a].viewPort.visible_area[r])},fontLoaded:function(e){return i.monoWidth=i.monoWidth===t?n("monospace"):i.monoWidth,i.sansWidth=i.sansWidth===t?n("sans-serif"):i.sansWidth,i.serifWidth=i.serifWidth===t?n("serif"):i.serifWidth,i.monoWidth!==n(e+",monospace")||i.sansWidth!==n(e+",sans-serif")||i.serifWidth!==n(e+",serif")},getversion:function(){return"Slider Revolution 6.1.1"},currentSlideIndex:function(e){return i[e].pr_active_key},simp:function(e,t,i){var a=Math.abs(e)-Math.floor(Math.abs(e/t))*t;return i?a:e<0?-1*a:a},iOSVersion:function(){return!!(navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/iPad/i))&&navigator.userAgent.match(/OS 4_\d like Mac OS X/i)},isIE:function(t,i){var a=e('<div style="display:none;"/>').appendTo(e("body"));a.html("\x3c!--[if "+(i||"")+" IE "+(t||"")+"]><a>&nbsp;</a><![endif]--\x3e");var r=a.find("a").length;return a.remove(),r},is_mobile:function(){var e=["android","webos","iphone","ipad","blackberry","Android","webos","iPod","iPhone","iPad","Blackberry","BlackBerry"],t=!1;for(var i in e)e.hasOwnProperty(i)&&(t=!!(t||navigator.userAgent.split(e[i]).length>1)||t);return t},is_android:function(){var e=["android","Android"],t=!1;for(var i in e)e.hasOwnProperty(i)&&(t=!!(t||navigator.userAgent.split(e[i]).length>1)||t);return t},callBackHandling:function(t,a,r){i[t].callBackArray&&e.each(i[t].callBackArray,function(e,t){t&&t.inmodule&&t.inmodule===a&&t.atposition&&t.atposition===r&&t.callback&&t.callback.call()})},get_browser:function(){var e,t=navigator.userAgent,i=t.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)||[];return/trident/i.test(i[1])?(e=/\brv[ :]+(\d+)/g.exec(t)||[],"IE"):"Chrome"===i[1]&&null!=(e=t.match(/\b(OPR|Edge)\/(\d+)/))?e[1].replace("OPR","Opera"):(i=i[2]?[i[1],i[2]]:[navigator.appName,navigator.appVersion,"-?"],null!=(e=t.match(/version\/(\d+)/i))&&i.splice(1,1,e[1]),i[0])},get_browser_version:function(){var e,t=navigator.appName,i=navigator.userAgent,a=i.match(/(edge|opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);return a&&null!=(e=i.match(/version\/([\.\d]+)/i))&&(a[2]=e[1]),(a=a?[a[1],a[2]]:[t,navigator.appVersion,"-?"])[1]},isFirefox:function(e){return i[e].isFirefox=i[e].isFirefox===t?"Firefox"===i.get_browser():i[e].isFirefox,i[e].isFirefox},isSafari11:function(){return"safari"===e.trim(i.get_browser().toLowerCase())&&parseFloat(i.get_browser_version())>=11},getHorizontalOffset:function(e,t){var i=d(e,".outer-left"),a=d(e,".outer-right");return"left"==t?i:"right"==t?a:i+a},getComingSlide:function(a,r){var o=i[a].pr_next_key!==t?i[a].pr_next_key:i[a].pr_processing_key!==t?i[a].pr_processing_key:i[a].pr_active_key,s=0;if(s=0,i[a].pr_active_slide!==t&&i[a].pr_active_slide.hasClass("not-in-nav")&&(o=i[a].pr_lastshown_key),r!==t&&e.isNumeric(r)||r!==t&&r.match(/to/g))s=1===r||-1===r?parseInt(o,0)+r<0?i[a].slideamount-1:parseInt(o,0)+r>=i[a].slideamount?0:parseInt(o,0)+r:(r=e.isNumeric(r)?r:parseInt(r.split("to")[1],0))<0?0:r>i[a].slideamount-1?i[a].slideamount-1:r;else if(r)for(var n in i[a].slides)i[a].slides.hasOwnProperty(n)&&(s=i[a].slides&&i[a].slides[n]&&i[a].slides[n].dataset&&i[a].slides[n].dataset.key===r?n:s);return{nindex:s,aindex:o}},callingNewSlide:function(e,t,a){var r=i.getComingSlide(e,t);i[e].pr_next_key=r.nindex,i[e].sdir=i[e].pr_next_key<i[e].pr_active_key?1:0,i[e].ctNavElement?i[e].ctNavElement=!1:i[e].c.trigger("revolution.nextslide.waiting"),(r.aindex===i[e].pr_next_key&&r.aindex===i[e].pr_lastshown_key||i[e].pr_next_key!==r.aindex&&-1!=i[e].pr_next_key)&&P(e,a)},updateDimensions:function(e){i[e].lastconw=i[e].conw,i[e].lastconh=i[e].conh,i[e].conw=i[e].c.width(),i[e].conh=i[e].infullscreenmode?i[e].minHeight:i[e].c.height(),i[e].ulw=i[e].canvas.width(),i[e].ulh=i[e].canvas.height()},setSize:function(a,r){var o,s=parseInt(i[a].top_outer||0)+parseInt(i[a].bottom_outer||0),n="carousel"==i[a].sliderType?parseInt(i[a].carousel.padding_top||0,0):0,l="carousel"==i[a].sliderType?parseInt(i[a].carousel.padding_bottom||0,0):0,d=0,c=0,p=0,u=i[a].pr_processing_key||i[a].pr_active_key||0,h=i[a].pr_active_key||0;if(i[a].minHeight=i[a].minHeight===t?0:i[a].minHeight||0,i[a].paddings=i[a].paddings===t?{top:parseInt(i[a].cpar.css("paddingTop"),0)||0,bottom:parseInt(i[a].cpar.css("paddingBottom"),0)||0}:i[a].paddings,i[a].rowzones&&i[a].rowzones.length>0){if(i[a].rowzones[u]!==t)for(o=0;o<i[a].rowzones[u].length;o++)d+=i[a].rowzones[u][o][0].offsetHeight;if(h!==u)for(o=0;o<i[a].rowzones[h].length;o++)c+=i[a].rowzones[h][o][0].offsetHeight}if(i[a].srowzones&&i[a].srowzones.length>0)for(o=0;o<i[a].srowzones.length;o++)p+=i[a].srowzones[o][0].offsetHeight;d=d<p?p:d;var g=Math.max(Math.max(i[a].minHeight,i[a].gridheight[i[a].level]),d);if(g=0!==i[a].maxHeight?Math.min(i[a].maxHeight,g):g,"fullwidth"!=i[a].sliderLayout||i[a].autoHeight||punchgs.TweenMax.set(i[a].c,{maxHeight:g+"px"}),i[a].c.css({marginTop:n,marginBottom:l}),i[a].width=i[a].canvas.width(),i[a].height=i[a].canvas.height(),"fullscreen"==i[a].sliderLayout||i[a].infullscreenmode){var f=e(window).height();if(i[a].fullScreenOffsetContainer!=t){var m=(""+i[a].fullScreenOffsetContainer).split(",");for(var v in m)m.hasOwnProperty(v)&&(f-=e(m[v]).outerHeight(!0)||0)}i[a].fullScreenOffset!=t&&!e.isNumeric(i[a].fullScreenOffset)&&i[a].fullScreenOffset.split("%").length>1?f-=e(window).height()*parseInt(i[a].fullScreenOffset,0)/100:i[a].fullScreenOffset!=t&&i[a].fullScreenOffset.length>0&&e.isNumeric(parseInt(i[a].fullScreenOffset,0))&&(f-=parseInt(i[a].fullScreenOffset,0)),i[a].height=Math.max(d,Math.max(f-s,i[a].minHeight)),h!==u&&(i[a].currentSlideHeight=Math.max(c,Math.max(f-s,i[a].minHeight)),i[a].slides[h].style.maxHeight=i[a].currentSlideHeight!==i[a].height?i[a].currentSlideHeight+"px":"none"),i[a].cpar.height(i[a].height),i[a].c.css({height:"100%"})}else i[a].height=Math.round(i[a].gridheight[i[a].level]*(i[a].keepBPHeight?1:i[a].width/i[a].gridwidth[i[a].level])),i[a].height=Math.max(d,Math.max(i[a].autoHeight?i[a].height:Math.min(i[a].height,i[a].gridheight[i[a].level]),i[a].minHeight)),!1!==r&&i[a].c.height(i[a].height);var b=n+l+s+i[a].height+i[a].paddings.top+i[a].paddings.bottom,w={height:b};if(!1!==r&&(i[a].c.closest("rs-fullwidth-wrap").find("rs-fw-forcer").css(w),i[a].c.closest("rs-module-wrap").css(w)),i[a].sbtimeline.set&&i[a].sbtimeline.fixed&&(i[a].curheight=b,i[a].sbtimeline.extended===t&&i.updateFixedScrollTimes(a),punchgs.TweenMax.set(i[a].forcer,{height:2*b+i[a].sbtimeline.extended})),i[a].middleZones&&i[a].middleZones.length>0&&i[a].middleZones[u]!==t)for(o=0;o<i[a].middleZones[u].length;o++)i[a].middleZones[u][o].style.top=Math.round(b/2-i[a].middleZones[u][o].offsetHeight/2)+"px";if(i[a].smiddleZones&&i[a].smiddleZones.length>0)for(o=0;o<i[a].smiddleZones.length;o++)i[a].smiddleZones[o].style.top=Math.round(b/2-i[a].smiddleZones[o].offsetHeight/2)+"px";y(a)},enterInViewPort:function(a){i[a].waitForCountDown&&(Q(a),i[a].waitForCountDown=!1),i[a].waitForFirstSlide&&(P(a),i[a].waitForFirstSlide=!1,setTimeout(function(){i[a].c.removeClass("tp-waitforfirststart")},500)),"playing"!=i[a].sliderlaststatus&&i[a].sliderlaststatus!=t||i[a].c.trigger("starttimer"),i[a].lastplayedvideos!=t&&i[a].lastplayedvideos.length>0&&e.each(i[a].lastplayedvideos,function(e,t){i.playVideo(t,a)})},leaveViewPort:function(a){i[a].sliderlaststatus=i[a].sliderstatus,i[a].c.trigger("stoptimer"),i[a].playingvideos!=t&&i[a].playingvideos.length>0&&(i[a].lastplayedvideos=e.extend(!0,[],i[a].playingvideos),i[a].playingvideos&&e.each(i[a].playingvideos,function(e,t){i[a].leaveViewPortBasedStop=!0,i.stopVideo&&i.stopVideo(t,a)}))},unToggleState:function(e){if(e!==t)for(var i=0;i<e.length;i++)try{document.getElementById(e[i]).classList.remove("rs-tc-active")}catch(e){}},toggleState:function(e){if(e!==t)for(var i=0;i<e.length;i++)try{document.getElementById(e[i]).classList.add("rs-tc-active")}catch(e){}},swaptoggleState:function(e){if(e!=t&&e.length>0)for(var i=0;i<e.length;i++){var a=document.getElementById(e[i]);if(a.dataset.toggletimestamp!==t&&(new Date).getTime()-a.dataset.toggletimestamp<250)return;a.dataset.toggletimestamp=(new Date).getTime(),null!==a&&(a.className.indexOf("rs-tc-active")>=0?a.classList.remove("rs-tc-active"):a.classList.add("rs-tc-active"))}},lastToggleState:function(e){var i;if(e!==t)for(var a=0;a<e.length;a++){var r=document.getElementById(e[a]);i=!0===i||null!==r&&r.className.indexOf("rs-tc-active")>=0||i}return i},revCheckIDS:function(a,r){if(r.dataset.idcheck===t){for(;-1!=e.inArray(r.id,i[a].anyid);)console.log("Warning !! Double Id in Slider "+a+": "+r.id),r.id=r.id+"_"+Math.round(9999*Math.random());i[a].anyid.push(r.id)}r.dataset.idcheck=!0}});var a=i.is_mobile(),r=(i.is_android(),function(e){i[e].responsiveLevels=i.revToResp(i[e].responsiveLevels,i[e].rle),i[e].visibilityLevels=i.revToResp(i[e].visibilityLevels,i[e].rle),i[e].responsiveLevels[0]=9999,i[e].rle=i[e].responsiveLevels.length||1,i[e].gridwidth=i.revToResp(i[e].gridwidth,i[e].rle),i[e].gridheight=i.revToResp(i[e].gridheight,i[e].rle),i[e].editorheight!==t&&(i[e].editorheight=i.revToResp(i[e].editorheight,i[e].rle)),l(e),y(e);var a=Math.max(i[e].minHeight,i[e].gridheight[i[e].level]*i[e].bw);i[e].editorheight!==t&&(a=Math.max(a,i[e].editorheight[i[e].level]*i[e].bw)),punchgs.TweenMax.set(i[e].c,{height:a})}),o=function(t,i){var a=[];return e.each(t,function(e,t){e!=i&&a.push(t)}),a},s=function(t,a,r){i[r].c.find(t).each(function(){var t=e(this);t.data("key")===a&&t.remove()})},n=function(e){window.revFontTestcontainer==t&&(window.revFontTestcontainer=document.createElement("span"),window.revFontTestcontainer.innerHTML=Array(100).join("wi"),window.revFontTestcontainer.style.cssText=["position:absolute","width:auto","font-size:128px","left:-99999px"].join(" !important;")),window.revFontTestcontainer.style.fontFamily=e,document.body.appendChild(window.revFontTestcontainer);var i=window.revFontTestcontainer.clientWidth;return document.body.removeChild(window.revFontTestcontainer),i},l=function(t,a){var r=9999,o=0,s=0,n=e(window).width(),l=a&&9999==i[t].responsiveLevels?i[t].visibilityLevels:i[t].responsiveLevels;l&&l.length&&e.each(l,function(e,a){n<a&&(0==o||o>parseInt(a))&&(r=parseInt(a),i[t].level=e,o=parseInt(a)),n>a&&o<a&&(o=parseInt(a),s=e)}),o<r&&(i[t].level=s),i[t].levelForced=i[t].level},d=function(t,i){var a=0;return t.find(i).each(function(){var t=e(this);!t.hasClass("tp-forcenotvisible")&&a<t.outerWidth()&&(a=t.outerWidth())}),a},c=function(r){if(r===t||i[r]===t||i[r].c===t)return!1;window._rs_firefox13=!1,window._rs_ie=window._rs_ie===t?!e.support.opacity:window._rs_ie,window._rs_ie9=window._rs_ie9===t?9==document.documentMode:window._rs_ie9;var o=e.fn.jquery.split("."),s=parseFloat(o[0]),n=parseFloat(o[1]);1==s&&n<7&&i[r].c.html('<div style="text-align:center; padding:40px 0px; font-size:20px; color:#992222;"> The Current Version of jQuery:'+o+" <br>Please update your jQuery Version to min. 1.7 in Case you wish to use the Revolution Slider Plugin</div>"),s>1&&(window._rs_ie=!1),i[r].cpar!==t&&i[r].cpar.data("aimg")!=t&&("enabled"==i[r].cpar.data("aie8")&&i.isIE(8)||"enabled"==i[r].cpar.data("amobile")&&a)&&i[r].c.html('<img class="tp-slider-alternative-image" src="'+i[r].cpar.data("aimg")+'">'),i[r].realslideamount=i[r].slideamount=0;var l=i[r].canvas[0].getElementsByTagName("rs-slide");for(var d in l)l.hasOwnProperty(d)&&(l[d].dataset!==t&&"on"==l[d].dataset.hsom&&a?l[d].classList.add("removeslidenow"):(l[d].dataset===t||!l[d].dataset.invisible&&1!=l[d].dataset.invisible?i[r].slideamount++:l[d].classList.add("not-in-nav"),i[r].realslideamount++,l[d].dataset!==t&&(l[d].dataset.originalindex=i[r].realslideamount,l[d].dataset.origindex=i[r].realslideamount-1)));i[r].canvas.find(".removeslidenow").each(function(){e(this).remove()}),i[r].canvas.find(".not-in-nav").each(function(){e(this).appendTo(i[r].canvas)}),i[r].canvas.css({visibility:"visible"}),i[r].slayers=i[r].c.find("rs-static-layers"),i[r].slayers.length>0&&(i[r].slayers[0].dataset.key="staticlayers"),!0===i[r].modal.useAsModal&&(i[r].cpar.wrap('<rs-modal id="'+i[r].c[0].id+'_modal"></rs-modal>'),i[r].modal.c=i[r].cpar.closest("rs-modal"),i[r].modal.c.appendTo(e("body")),i[r].modal!==t&&i[r].modal.alias!==t&&i.revModal(r,{mode:"init"})),1!=i[r].waitForInit&&1!=i[r].modal.useAsModal&&h(r)},p=function(){e("body").data("rs-fullScreenMode",!e("body").data("rs-fullScreenMode")),e("body").data("rs-fullScreenMode")&&setTimeout(function(){e(window).trigger("resize")},200)},u=function(e,a,r){return e.dataset.lazyload!==t?e.dataset.lazyload:i[r].lazyloaddata!==t&&i[r].lazyloaddata.length>0&&e.dataset[i[r].lazyloaddata]!==t?e.dataset[i[r].lazyloaddata]:e.dataset.lazySrc!==t?e.dataset.lazySrc:e.dataset.wpfcOriginalSrc!==t?e.dataset.wpfcOriginalSrc:e.dataset.lazy!==t?e.dataset.lazy:a},h=function(r){if(i[r]!==t){if(i[r].sliderisrunning=!0,e(document).on("revolution.all.resize",function(){i[r].sliderisrunning&&m(r)}),i[r].shuffle){for(var o=i[r].canvas.find("rs-slide:first-child")[0].dataset.firstanim,s=0;s<i[r].slideamount;s++)i[r].canvas.find("rs-slide:eq("+Math.round(Math.random()*i[r].slideamount)+")").prependTo(i[r].canvas);i[r].canvas.find("rs-slide:first-child")[0].dataset.firstanim=o}for(var n in i[r].slides=i[r].canvas[0].getElementsByTagName("rs-slide"),i[r].thumbs=new Array(i[r].slides.length),i[r].slots=4,i[r].firststart=1,i[r].loadqueue=[],i[r].syncload=0,i.updateDimensions(r),i[r].slides)if(i[r].slides.hasOwnProperty(n)){var d=i[r].slides[n],c=d.getElementsByClassName(".rev-slidebg");c=0===c.length?d.getElementsByTagName("img")[0]:c,d.dataset.key=d.dataset.key===t?"rs-"+Math.round(999999*Math.random()):d.dataset.key;var h={params:Array(12),id:d.dataset.key,src:d.dataset.thumb!==t?d.dataset.thumb:u(c,c.src,r)};d.dataset.title=d.dataset.title===t?"":d.dataset.title,d.dataset.description=d.dataset.description===t?"":d.dataset.description,h.params[0]={from:RegExp("\\{\\{title\\}\\}","g"),to:d.dataset.title},h.params[1]={from:RegExp("\\{\\{description\\}\\}","g"),to:d.dataset.description};for(var v=1;v<=10;v++)d.dataset["p"+v]!==t?h.params[v+1]={from:RegExp("\\{\\{param"+v+"\\}\\}","g"),to:d.dataset["p"+v]}:h.params[v+1]={from:RegExp("\\{\\{param"+v+"\\}\\}","g"),to:""};if(i[r].thumbs[n]=h,d.dataset.link!=t||d.dataset.linktoslide!==t){var y=d.dataset.link!==t?d.dataset.link:"slide",w="slide"!=y?"no":d.dataset.linktoslide;if(w!=t&&"no"!=w&&"next"!=w&&"prev"!=w)for(var _ in i[r].slides)i[r].slides.hasOwnProperty(_)&&parseInt(i[r].slides[_].dataset.origindex,0)+1==d.dataset.linktoslide&&(w=i[r].slides[_].dataset.key);e(d).append('<rs-layer class="rs-layer slidelink" style="z-index:'+("back"===d.dataset.seoz?0:"front"===d.dataset.seoz?60:d.dataset.seoz!==t?parseInt(d.dataset.seoz,0):100)+';" dataxy="x:c;y:c" data-dim="w:100%;h:100%" data-basealign="slide"'+("no"==w?"":"  data-actions='"+("scroll_under"===w?"o:click;a:scrollbelow;offset:100px;":"prev"===w?"o:click;a:jumptoslide;slide:prev;d:0.2;":"next"===w?"o:click;a:jumptoslide;slide:next;d:0.2;":"o:click;a:jumptoslide;slide:"+w+";d:0.2;")+"'")+" data-frame_1='e:Power3.easeInOut;st:100;sp:100' data-frame_999='e:Power3.easeInOut;o:0;st:w;sp:100'><a "+("slide"!=y?' target="'+(d.dataset.target||"_self")+'" href="'+y+'"':"")+"><span></span></a></rs-layer>")}}if(i[r].simplifyAll&&(i.isIE(8)||i.iOSVersion())&&(i[r].c.find(".rs-layer").each(function(){var t=e(this);t.removeClass("customin customout").addClass("fadein fadeout"),t.data("splitin",""),t.data("speed",400)}),i[r].slides.each(function(){var t=e(this);t.data("transition","fade"),t.data("masterspeed",500),t.data("slotamount",1),(t.find(".rev-slidebg")||t.find(">img").first()).data("panzoom",null)})),window._rs_desktop=window._rs_desktop===t?!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i):window._rs_desktop,i[r].autoHeight="fullscreen"==i[r].sliderLayout||i[r].autoHeight,"fullwidth"!=i[r].sliderLayout||i[r].autoHeight||i[r].c.css({maxHeight:i[r].gridheight[i[r].level]+"px"}),"auto"==i[r].sliderLayout||0!=i[r].c.closest("rs-fullwidth-wrap").length||"fullscreen"===i[r].sliderLayout&&1==i[r].disableForceFullWidth)i[r].topc=i[r].cpar;else{var x=i[r].cpar[0].style.marginTop,k=i[r].cpar[0].style.marginBottom;x=x===t||""===x?"":"margin-top:"+x+";",k=k===t||""===k?"":"margin-bottom:"+k+";",i[r].topc=e('<rs-fullwidth-wrap id="'+i[r].c[0].id+'_forcefullwidth" style="'+x+k+'"></rs-fullwidth-wrap>'),i[r].forcer=e('<rs-fw-forcer style="height:'+i[r].cpar.height()+'px"></rs-fw-forcer>'),i[r].topc.append(i[r].forcer),i[r].topc.insertBefore(i[r].cpar),i[r].cpar.detach(),i[r].cpar.css({marginTop:"0px",marginBottom:"0px",position:"absolute"}),i[r].cpar.prependTo(i[r].topc)}if(i[r].forceOverflow&&i[r].topc[0].classList.add("rs-forceoverflow"),"carousel"===i[r].sliderType&&i[r].c.css({overflow:"visible"}),0!==i[r].maxHeight&&punchgs.TweenMax.set([i[r].cpar,i[r].c,i[r].topc],{maxHeight:i[r].maxHeight+"px"}),i[r].fixedOnTop&&punchgs.TweenMax.set(i[r].topc,{position:"fixed",top:"0px",left:"0px",pointerEvents:"none",zIndex:5e3}),i[r].shadow!==t&&i[r].shadow>0&&i[r].cpar.addClass("tp-shadow"+i[r].shadow).append('<div class="tp-shadowcover" style="background-color:'+i[r].cpar.css("backgroundColor")+";background-image:"+i[r].cpar.css("backgroundImage")+'"></div>'),l(r),!i[r].c.hasClass("revslider-initialised")){i[r].c[0].classList.add("revslider-initialised"),i[r].c[0].id=i[r].c[0].id===t?"revslider-"+Math.round(1e3*Math.random()+5):i[r].c[0].id,i.revCheckIDS(r,i[r].c[0]),i[r].origcd=parseInt(i[r].duration,0),i[r].scrolleffect._L=[],i[r].sbas=i[r].sbas===t?{}:i[r].sbas,i[r].layers=i[r].layers||{},i[r].sortedLayers=i[r].sortedLayers||{},i[r].c.detach(),i[r].c.find("rs-layer, rs-row, rs-column, rs-group,  rs-bgvideo, .rs-layer").each(function(){var a,o,s=e(this),n=s.data();if(n.startclasses=this.className,n.startclasses=n.startclasses===t||null===n.startclasses?"":n.startclasses,n.animationonscroll=!!i[r].sbtimeline.set&&i[r].sbtimeline.layers,n.animationonscroll=!0===n.animationonscroll||"true"==n.animationonscroll,n.filteronscroll=!!i[r].scrolleffect.set&&i[r].scrolleffect.layers,n.pxundermask=n.startclasses.indexOf("rs-pxmask")>=0&&"off"!==i[r].parallax.type&&n.startclasses.indexOf("rs-pxl-")>=0,n.noPevents=n.startclasses.indexOf("rs-noevents")>=0,n.sba)for(var l in a=n.sba.split(";"))a.hasOwnProperty(l)&&("t"==(o=a[l].split(":"))[0]&&(n.animationonscroll=o[1],"false"==o[1]&&(n.animOnScrollForceDisable=!0)),"e"==o[0]&&(n.filteronscroll=o[1]),"so"==o[0]&&(n.scrollBasedOffset=parseInt(o[1])/1e3));if("true"!=n.animationonscroll&&1!=n.animationonscroll||(n.startclasses+=" rs-sba",s[0].className+=" rs-sba"),n.startclasses.indexOf("rs-layer-static")>=0&&i.handleStaticLayers&&i.handleStaticLayers(s,r),"RS-BGVIDEO"!==s[0].tagName){if(s[0].classList.add("rs-layer"),"column"===n.type&&(n.columnwidth="33.33%",n.verticalalign="top",n.column!==t))for(var d in a=n.column.split(";"))a.hasOwnProperty(d)&&("w"===(o=a[d].split(":"))[0]&&(n.columnwidth=o[1]),"a"===o[0]&&(n.verticalalign=o[1]));var c=n.startclasses.indexOf("slidelink")>=0?"width:100% !important;height:100% !important;":"",p="column"!==n.type?"":n.verticalalign===t?" vertical-align:top;":" vertical-align:"+n.verticalalign+";",u="row"===n.type||"column"===n.type?"position:relative;":"position:absolute;",h="",g="row"===n.type?"rs-row-wrap":"column"===n.type?"rs-column-wrap":"group"===n.type?"rs-group-wrap":"rs-layer-wrap",f="",m="",v=(n.noPevents,";pointer-events:none");for(var y in"row"===n.type||"column"===n.type||"group"===n.type?(s[0].classList.remove("tp-resizeme"),"column"===n.type&&(n.width="auto",s[0].group="row",punchgs.TweenMax.set(s,{width:"auto"}),n.filteronscroll=!1)):(f="display:"+("inline-block"===s[0].style.display?"inline-block":"block")+";",s.closest("rs-column").length>0?(s[0].group="column",n.filteronscroll=!1):s.closest("rs-group-wrap").length>0&&(s[0].group="group",n.filteronscroll=!1)),n.wrpcls!==t&&(h=h+" "+n.wrpcls),n.wrpid!==t&&(m='id="'+n.wrpid+'"'),n.maskinuse=!1,n)n.maskinuse&&n.hasOwnProperty(y)&&(n.maskinuse=y.indexOf("_mask")>0);s.wrap("<"+g+" "+m+' class="rs-parallax-wrap '+h+'" style="'+p+" "+c+u+f+v+'"><rs-loop-wrap style="'+c+u+f+'"><rs-mask-wrap style="'+c+u+f+'">'+(n.pxundermask?"<rs-px-mask></rs-px-mask>":"")+"</rs-mask-wrap></rs-loop-wrap></"+g+">"),!0!==n.filteronscroll&&"true"!=n.filteronscroll||i[r].scrolleffect._L.push(s.parent()),s[0].id=s[0].id===t?"layer-"+Math.round(999999999*Math.random()):s[0].id,i.revCheckIDS(r,s[0]),"column"===n.type&&s.closest(".rs-parallax-wrap").append('<rs-cbg-mask-wrap><rs-column-bg id="'+s[0].id+'_rs_cbg"></rs-column-bg></rs-cbg-mask-wrap>'),"text"===n.type&&s[0].getElementsByTagName("iframe").length>0&&s[0].classList.add("rs-ii-o"),punchgs.TweenMax.set(s,{visibility:"hidden"}),i[r].BUG_safari_clipPath&&s[0].classList.add("rs-pelock")}s[0].dataset.actions&&i.checkActions&&i.checkActions(s,r,i[r]),!i.checkVideoApis||window.rs_addedvim&&window.rs_addedyt||i[r].youtubeapineeded&&i[r].vimeoapineeded||i.checkVideoApis(s,r)}),i.checkActions&&i.checkActions(t,r),i[r].c.prependTo(i[r].cpar),i[r].c[0].addEventListener("mouseenter",function(){i[r].c.trigger("tp-mouseenter"),i[r].overcontainer=!0},{passive:!0}),i[r].c[0].addEventListener("mouseover",function(){i[r].c.trigger("tp-mouseover"),i[r].overcontainer=!0},{passive:!0}),i[r].c[0].addEventListener("mouseleave",function(){i[r].c.trigger("tp-mouseleft"),i[r].overcontainer=!1},{passive:!0}),i[r].c.find(".rs-layer video").each(function(t){var i=e(this);i.removeClass("video-js vjs-default-skin"),i.attr("preload",""),i.css({display:"none"})}),"standard"!==i[r].sliderType&&(i[r].lazyType="all"),i[r].rs_static_layer=i[r].c[0].getElementsByTagName("rs-static-layers"),i[r].rs_static_layer.length>0&&(I(i[r].rs_static_layer[0],r,0,!0),S(i[r].rs_static_layer[0],r,function(){i[r]!==t&&i[r].c.find("rs-static-layers img").each(function(){this.src=z(r,this.dataset.src!=t?this.dataset.src:this.src).src})})),i[r].rowzones=[],i[r].middleZones=[];var T=B("#")[0];if(T.length<9&&T.split("slide").length>1&&-1==T.indexOf("slider")){var L=parseInt(T.split("slide")[1],0);e.isNumeric(parseInt(L,0))&&((L=parseInt(L,0))<1&&(L=1),L>i[r].slideamount&&(L=i[r].slideamount),i[r].startWithSlide=L-1)}var R=parseInt(i[r].spinner.replace("spinner",""),10);if(isNaN(R)||R<6)i[r].loader=e('<rs-loader class="'+i[r].spinner+'"><div class="dot1"></div><div class="dot2"></div><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></rs-loader>');else{var M,O=i[r].spinnerclr||"#ffffff",C='<div class="rs-spinner-inner"';if(7===R)-1!==O.search("#")?(M=O.replace("#",""),M="rgba("+parseInt(M.substring(0,2),16)+", "+parseInt(M.substring(2,4),16)+", "+parseInt(M.substring(4,6),16)+", "):-1!==O.search("rgb")&&(M=O.substring(O.indexOf("(")+1,O.lastIndexOf(")")).split(",")).length>2&&(M="rgba("+M[0].trim()+", "+M[1].trim()+", "+M[2].trim()+", "),M&&"string"==typeof M&&(C+=' style="border-top-color: '+M+"0.65); border-bottom-color: "+M+"0.15); border-left-color: "+M+"0.65); border-right-color: "+M+'0.15)"');else 12===R&&(C+=' style="background:'+O+'"');C+=">";for(var j=[10,0,4,2,5,9,0,4,4,2][R-6],A=0;A<j;A++)A>0&&(C+=" "),C+='<span style="background:'+O+'"></span>';C+="</div>",i[r].loader=e('<rs-loader class="'+i[r].spinner+'">'+C+"</div></rs-loader>")}i[r].c.append(i[r].loader),0===i[r].c.find("rs-progress").length&&i[r].c.append('<rs-progress style="visibility:hidden"></rs-progress>'),i[r].c.find("rs-progress").css({width:"0%"}),i[r].canvas.css({display:"block"}),b(r),i[r].slides=i[r].canvas.find("rs-slide").not(".rs-not-in-nav"),i[r].inli=i[r].canvas.find("rs-slide.rs-not-in-nav"),("off"!==i[r].parallax.type||i[r].scrolleffect.set||i[r].sbtimeline.set)&&i.checkForParallax&&i.checkForParallax(r),i.setSize(r,!1),"hero"!==i[r].sliderType&&i.createNavigation&&i[r].navigation.use&&i.createNavigation(r),i.resizeThumbsTabs&&i.resizeThumbsTabs&&i[r].navigation.use&&i.resizeThumbsTabs(r),g(r);var H=i[r].viewPort;i[r].inviewport=!1,H!=t&&H.enable&&i.scrollTicker&&i.scrollTicker(r),i[r].slides.each(function(t){var a=e(this);i[r].rowzones[t]=[],i[r].middleZones[t]=[],a.find("rs-zone").each(function(){i[r].rowzones[t].push(e(this)),this.className.indexOf("rev_row_zone_middle")>=0&&i[r].middleZones[t].push(this)}),((H.enable&&i[r].inviewport||!H.enable)&&"all"==i[r].lazyType||"smart"==i[r].lazyType&&(0==t||1==t||t==i[r].slideamount||t==i[r].slideamount-1))&&(I(a[0],r,t),S(a[0],r,function(){}))}),i[r].srowzones=[],i[r].smiddleZones=[],i[r].slayers.find("rs-zone").each(function(){i[r].srowzones.push(e(this)),this.className.indexOf("rev_row_zone_middle")>=0&&i[r].smiddleZones.push(this)}),"carousel"===i[r].sliderType&&i.prepareCarousel&&(punchgs.TweenMax.set(i[r].canvas,{scale:1,perspective:1200,transformStyle:"flat",opacity:0}),i.prepareCarousel(r,new punchgs.TimelineLite,t,0),i[r].onlyPreparedSlide=!0),setTimeout(function(){!H.enable||H.enable&&i[r].inviewport||H.enable&&!i[r].inviewport&&"wait"!==H.outof?P(r):(i[r].c.addClass("tp-waitforfirststart"),i[r].waitForFirstSlide=!0,H.presize&&(i[r].pr_next_slide=e(i[r].slides[0]),I(i[r].pr_next_slide[0],r,0,!0),S(i[r].pr_next_slide.find(".tp-layers"),r,function(){i.animateTheLayers&&i.animateTheLayers({slide:i[r].pr_next_key,id:r,mode:"preset"})}))),i.manageNavigation&&i[r].navigation.use&&i.manageNavigation(r),i[r].slideamount>1&&(!H.enable||H.enable&&i[r].inviewport?Q(r):i[r].waitForCountDown=!0),setTimeout(function(){i[r]!==t&&i[r].c.trigger("revolution.slide.onloaded")},50)},i[r].startDelay),i[r].startDelay=0,e("body").data("rs-fullScreenMode",!1),window.addEventListener("fullscreenchange",p,{passive:!0}),window.addEventListener("mozfullscreenchange",p,{passive:!0}),window.addEventListener("webkitfullscreenchange",p,{passive:!0});var N="resize.revslider-"+i[r].c.attr("id");e(window).on(N,function(){if(i[r]!==t){if(i[r].c==t)return!1;0!=e("body").find(i[r].c)&&(l(r),g(r));var o=!1;if("fullscreen"==i[r].sliderLayout){var s=e(window).height();"mobile"==i[r].fallbacks.ignoreHeightChanges&&a||"always"==i[r].fallbacks.ignoreHeightChanges?(i[r].fallbacks.ignoreHeightChangesSize=i[r].fallbacks.ignoreHeightChangesSize==t?0:i[r].fallbacks.ignoreHeightChangesSize,o=s!=i[r].lastwindowheight&&Math.abs(s-i[r].lastwindowheight)>i[r].fallbacks.ignoreHeightChangesSize):o=s!=i[r].lastwindowheight}(i[r].c.outerWidth(!0)!=i[r].width||i[r].c.is(":hidden")||o)&&(i[r].lastwindowheight=e(window).height(),m(r))}}),f(r),g(r),i[r].fallbacks.disableFocusListener||"true"==i[r].fallbacks.disableFocusListener||!0===i[r].fallbacks.disableFocusListener||(i[r].c.addClass("rev_redraw_on_blurfocus"),D())}}},g=function(a){var r=i.getHorizontalOffset(i[a].c,"left");if("auto"===i[a].sliderLayout||"fullscreen"===i[a].sliderLayout&&!0===i[a].disableForceFullWidth?"fullscreen"==i[a].sliderLayout&&1==i[a].disableForceFullWidth?punchgs.TweenMax.set(i[a].cpar,{left:0,width:"auto"}):punchgs.TweenMax.set(i[a].canvas,{left:"carousel"===i[a].sliderType?0:r,width:i[a].c.width()-i.getHorizontalOffset(i[a].c,"both")}):punchgs.TweenMax.set(i[a].cpar,{left:0-Math.ceil(i[a].c.closest("rs-fullwidth-wrap").offset().left-r)+"px",width:e(window).width()-i.getHorizontalOffset(i[a].c,"both")}),"auto"===i[a].sliderLayout&&i[a].modal!==t&&i[a].modal.useAsModal){var o=Math.min(i[a].gridwidth[i[a].level],window.innerWidth);punchgs.TweenMax.set([i[a].modal.c,i[a].canvas],{width:o})}i[a].slayers&&"fullwidth"!=i[a].sliderLayout&&"fullscreen"!=i[a].sliderLayout&&punchgs.TweenMax.set(i[a].slayers,{left:r})},f=function(a,r){e(window).width()<i[a].hideSliderAtLimit?(i[a].c.trigger("stoptimer"),i[a].cpar[0].dataset.displaycache="none"!=i[a].cpar.css("display")?i[a].cpar.css("display"):i[a].cpar[0].dataset.displaycache,i[a].cpar.css({display:"none"})):i[a].c.is(":hidden")&&r&&(i[a].cpar[0].dataset.displaycache!=t&&"none"!=i[a].cpar[0].dataset.displaycache?i[a].cpar.css({display:i[a].cpar[0].dataset.displaycache}):i[a].cpar.css({display:"block"}),i[a].c.trigger("restarttimer"),setTimeout(function(){m(a)},150)),i.hideUnHideNav&&i[a].navigation.use&&i.hideUnHideNav(a)},m=function(a){if(i[a].c===t)return!1;i[a].c.trigger("revolution.slide.beforeredraw"),1==i[a].infullscreenmode&&(i[a].minHeight=e(window).height()),l(a),i.resizeThumbsTabs&&!0!==i.resizeThumbsTabs(a)||(f(a,!0),g(a),"carousel"==i[a].sliderType&&i.prepareCarousel(a,!0),i.setSize(a),i.updateDimensions(a),"standard"===i[a].sliderType&&i[a].mtl!==t&&i.animateSlide({recall:!0,id:a}),"carousel"===i[a].sliderType&&i[a].lastconw!=i[a].conw&&(clearTimeout(i[a].pcartimer),i[a].pcartimer=setTimeout(function(){i.prepareCarousel(a,!0),"carousel"==i[a].sliderType&&i[a].carousel.showLayersAllTime&&e.each(i[a].slides,function(e){i.animateTheLayers&&i.animateTheLayers({slide:e,id:a,mode:"rebuild"})})},100),i[a].lastconw=i[a].conw),i.animateTheLayers&&(i[a].pr_processing_key!==t?i.animateTheLayers({slide:i[a].pr_processing_key,id:a,mode:"rebuild"}):i[a].pr_active_key!==t&&i.animateTheLayers({slide:i[a].pr_active_key,id:a,mode:"rebuild"}),i.scrollHandling&&i.scrollHandling(a,!0)),v(a,i[a].pr_next_bg),"carousel"!==i[a].sliderType&&v(a,i[a].pr_active_bg),i.manageNavigation&&i.manageNavigation(a)),i[a].c.trigger("revolution.slide.afterdraw"),setTimeout(function(){g(a)},19)},v=function(e,a){a&&a.data("panzoom")!==t&&i.startPanZoom(a,e,a.data("pztl")!==t?a.data("pztl").progress():0)},y=function(e){i[e].bw=i[e].width/i[e].gridwidth[i[e].level],i[e].bh=i[e].height/i[e].gridheight[i[e].level],i[e].bw=isNaN(i[e].bw)?1:i[e].bw,i[e].bh=isNaN(i[e].bh)?1:i[e].bh,i[e].bh>i[e].bw?i[e].bh=i[e].bw:i[e].bw=i[e].bh,(i[e].bh>1||i[e].bw>1)&&(i[e].bw=1,i[e].bh=1)},b=function(a){i[a].autoHeight&&punchgs.TweenMax.set([i[a].c,i[a].cpar],{maxHeight:"none"}),punchgs.TweenMax.set(i[a].canvas,{overflow:"hidden",width:"100%",height:"100%",maxHeight:i[a].autoHeight?"none":i[a].cpar.css("maxHeight")}),"carousel"===i[a].sliderType&&(i[a].canvas.css({overflow:"visible"}).wrap("<rs-carousel-wrap></rs-carousel-wrap>"),i[a].cpar.prepend("<rs-carousel-space></rs-carousel-space>").append("<rs-carousel-space></rs-carousel-space>"),i.prepareCarousel(a)),i[a].startWithSlide=i[a].startWithSlide===t?t:parseInt(i[a].startWithSlide)+1,i[a].cpar.css({overflow:"visible"}),i[a].scrolleffect.bgs=[];for(var r=0;r<i[a].slides.length;r++){var o=e(i[a].slides[r]),s=o.find(">img"),n=o.find("rs-bgvideo");s.detach(),n.detach(),(i[a].startWithSlide!=t&&i[a].slides[r].dataset.originalindex==i[a].startWithSlide||i[a].startWithSlide===t&&0==r)&&(i[a].pr_next_key=o.index()),punchgs.TweenMax.set(o,{width:"100%",height:"100%",overflow:"hidden"}),s.wrap("<rs-sbg-px><rs-sbg-wrap></rs-sbg-wrap></rs-sbg-px>");var l=s.closest("rs-sbg-wrap"),d=o.data("mediafilter"),c=w(s.data(),a,s[0].style.backgroundColor),p=c.bgcolor!==t&&c.bgcolor.indexOf("gradient")>=0,h=c.bgcolor!==t&&c.bgcolor.indexOf("gradient")>=0?"background:"+c.bgcolor+";":"background-color:"+c.bgcolor+";";c.src=s[0].src,c.lazyload=u(s[0],t,a),c.slidebgimage=!0,d="none"===d||d===t?"":d,n.length>0&&(n.addClass("defaultvid").css({zIndex:30}),n.appendTo(l),d!==t&&""!==d&&"none"!==d&&n.addClass(d),c.parallax!=t&&(n.data("parallax",c.parallax),n.data("showcoveronpause","on"),n.data("mediafilter",d))),"none"!=i[a].dottedOverlay&&i[a].dottedOverlay!=t&&l.append('<rs-dotted class="'+i[a].dottedOverlay+'"></rs-dotted>'),h+=(p?"":"background-repeat:"+c.bgrepeat+";background-image:url("+c.src+");background-size:"+c.bgfit+";background-position:"+c.bgposition+";")+"width:100%;height:100%;",h+="standard"===i[a].sliderType||"undefined"===i[a].sliderType?"opacity:0;":"",s.data("mediafilter",d),d=s.data("panzoom")!==t?"":d;var g=e("<rs-sbg "+(c.lazyload!==t?'data-lazyload="'+c.lazyload+'"':"")+' src="'+c.src+'" class="'+d+'" data-bgcolor="'+c.bgcolor+'" style="'+h+'"></rs-sbg>');l.append(g);var f=document.createComment("Runtime Modification - Img tag is Still Available for SEO Goals in Source - "+s.get(0).outerHTML);s.replaceWith(f),l.data(c),g.data(c),o[0].dataset.sba=o[0].dataset.sba===t?"":o[0].dataset.sba;var m={},v=o[0].dataset.sba.split(";");for(var y in v)if(v.hasOwnProperty(y)){var b=v[y].split(":");switch(b[0]){case"f":m.f=b[1];break;case"b":m.b=b[1];break;case"g":m.g=b[1];break;case"t":m.s=b[1]}}o[0].dataset.scrollBased=!!i[a].sbtimeline.set&&(m.s!==t&&m.s),i[a].scrolleffect.set?(i[a].scrolleffect.bgs.push({fade:m.f!==t?m.f:!!i[a].scrolleffect.slide&&i[a].scrolleffect.fade,blur:m.b!==t?m.b:!!i[a].scrolleffect.slide&&i[a].scrolleffect.blur,grayscale:m.g!==t?m.g:!!i[a].scrolleffect.slide&&i[a].scrolleffect.grayscale,c:l.wrap("<rs-sbg-effectwrap></rs-sbg-effectwrap>").parent()}),o.prepend(l.parent().parent())):o.prepend(l.parent())}},w=function(r,o,s){r.bg=r.bg===t?"":r.bg;var n=r.bg.split(";"),l={bgposition:"50% 50%",bgfit:"cover",bgrepeat:"no-repeat",bgcolor:s||"transparent"};for(var d in n)if(n.hasOwnProperty(d)){var c=n[d].split(":"),p=c[0],u=c[1],h="";switch(p){case"p":h="bgposition";break;case"f":h="bgfit";break;case"r":h="bgrepeat";break;case"c":h="bgcolor"}h!==t&&(l[h]=u)}return i[o].fallbacks.panZoomDisableOnMobile&&a&&(l.panzoom=null,l.bgfit="cover"),e.extend(!0,r,l)},_=function(e,t){t.find(".slot, .slot-circle-wrapper").each(function(){}),i[e].transition=0},x=function(e){var i=e;return e!=t&&e.length>0&&(i=e.split("?")[0]),i},k=function(e){var i=e;return e!=t&&e.length>0&&(i=i.replace(document.location.protocol,"")),i},T=function(e,t){var i=e.split("/"),a=t.split("/");i.pop();for(var r=0;r<a.length;r++)"."!=a[r]&&(".."==a[r]?i.pop():i.push(a[r]));return i.join("/")},L=function(e,a,r){if(i[a]!==t){for(var o in i[a].syncload--,i[a].loadqueue)if(i[a].loadqueue.hasOwnProperty(o)&&"loaded"!==i[a].loadqueue[o].progress){var s=i[a].loadqueue[o].src!==t?i[a].loadqueue[o].src.replace(/\.\.\/\.\.\//gi,""):i[a].loadqueue[o].src;(s===e.src||k(s)===k(e.src)||x(document.location.protocol+s)===x(decodeURIComponent(e.src))||x(document.location.origin+s)===x(decodeURIComponent(e.src))||x(self.location.href.substring(0,self.location.href.length-1)+s)===x(decodeURIComponent(e.src))||x(T(self.location.href,i[a].loadqueue[o].src))===x(decodeURIComponent(e.src))||x(document.location.origin+"/"+s)===x(decodeURIComponent(e.src))||x(self.location.href.substring(0,self.location.href.length-1)+"/"+s)===x(decodeURIComponent(e.src))||x(i[a].loadqueue[o].src)===x(decodeURIComponent(e.src))||"file://"===window.location.origin&&x(e.src).match(new RegExp(s)))&&(i[a].loadqueue[o].progress=r,i[a].loadqueue[o].width=e.width,i[a].loadqueue[o].height=e.height)}R(a)}},R=function(t){4!=i[t].syncload&&i[t].loadqueue&&e.each(i[t].loadqueue,function(a,r){if("prepared"==r.progress&&i[t].syncload<=4){if(i[t].syncload++,"img"==r.type){var o=new Image;o.onload=function(){L(this,t,"loaded"),r.error=!1},o.onerror=function(){L(this,t,"failed"),r.error=!0},o.src=r.src,r.starttoload=e.now()}else e.get(r.src,function(e){r.innerHTML=(new XMLSerializer).serializeToString(e.documentElement),r.progress="loaded",i[t].syncload--,R(t)}).fail(function(){r.progress="failed",i[t].syncload--,R(t)});r.progress="inload"}})},I=function(a,r,o,s){if(a!==t&&0!==a.length){var n=a.querySelectorAll("img, rs-sbg, .rs-svg");for(var l in n)if(n.hasOwnProperty(l)){var d=u(n[l],t,r),c=d!==t?d:n[l].dataset.svg_src!=t?n[l].dataset.svg_src:n[l].src===t?e(n[l]).data("src"):n[l].src,p=n[l].dataset.svg_src!=t?"svg":"img";c!==t&&0==i[r].loadqueue.filter(function(e){return e.src===c}).length&&i[r].loadqueue.push({src:c,index:l,starttoload:e.now(),type:p||"img",prio:o,progress:n[l].complete&&c===n[l].src?"loaded":"prepared",static:s,width:n[l].complete&&c===n[l].src?n[l].width:t,height:n[l].complete&&c===n[l].src?n[l].height:t})}R(r)}},z=function(e,a){var r=i[e].loadqueue.filter(function(e){return e.src===a})[0];return r===t?{src:a}:r},S=function(r,o,s){if(r!==t&&0!==r.length&&i[o]!==t){var n=!1,l=r.querySelectorAll("img, rs-sbg, .rs-svg");for(var d in l)if(l.hasOwnProperty(d)&&!(l[d].className.indexOf("rs-pzimg")>=0)){var c=e(l[d]).data(),p=u(l[d],t,o),h=p!==t?p:l[d].dataset.svg_src!=t?l[d].dataset.svg_src:l[d].src===t?e(l[d]).data("src"):l[d].src,g=z(o,h);if(c.loaded===t&&g!==t&&g.progress&&"loaded"==g.progress){if(l[d].src=g.src,"img"==g.type){if(c.slidebgimage){-1==g.src.indexOf("images/transparent.png")&&-1==g.src.indexOf("assets/transparent.png")||c.bgcolor===t?l[d].style.backgroundImage='url("'+g.src+'")':c.bgcolor!==t&&(l[d].style.background=c.bgcolor),r.dataset.owidth=g.width,r.dataset.oheight=g.height;var f=r.getElementsByTagName("rs-sbg-wrap");f.length>0&&(f[0].dataset.owidth=g.width,f[0].dataset.oheight=g.height)}}else"svg"==g.type&&"loaded"==g.progress&&(l[d].innerHTML=g.innerHTML);c.loaded=!0}g&&g.progress&&g.progress.match(/inprogress|inload|prepared/g)&&(!g.error&&e.now()-g.starttoload<3e3?n=!0:(g.progress="failed",g.reported_img||(g.reported_img=!0,console.log(h+"  Could not be loaded !")))),1!=i[o].youtubeapineeded||window.YT&&YT.Player!=t||(n=O("youtube",o)),1!=i[o].vimeoapineeded||window.Vimeo||(n=O("vimeo",o))}!a&&i[o].audioqueue&&i[o].audioqueue.length>0&&e.each(i[o].audioqueue,function(t,i){i.status&&"prepared"===i.status&&e.now()-i.start<i.waittime&&(n=!0)}),e.each(i[o].loadqueue,function(t,i){!0===i.static&&("loaded"!=i.progress&&"done"!==i.progress||"failed"===i.progress)&&("failed"!=i.progress||i.reported?!i.error&&e.now()-i.starttoload<5e3?n=!0:i.reported||(i.reported=M(i.src,i.error)):i.reported=M(i.src,i.error))}),n?punchgs.TweenMax.delayedCall(.18,S,[r,o,s]):punchgs.TweenMax.delayedCall(.18,s)}},M=function(e,t){return console.log("Static Image "+e+"  Could not be loaded in time. Error Exists:"+t),!0},O=function(t,a){if(e.now()-i[a][t+"starttime"]>5e3&&1!=i[a][t+"warning"]){i[a][t+"warning"]=!0;var r=t+" Api Could not be loaded !";"https:"===location.protocol&&(r+=" Please Check and Renew SSL Certificate !"),console.error(r),i[a].c.append('<div style="position:absolute;top:50%;width:100%;color:#e74c3c;  font-size:16px; text-align:center; padding:15px;background:#000; display:block;"><strong>'+r+"</strong></div>")}return!0},C=function(a){i[a]!==t&&(i[a].pr_active_slide=e(i[a].slides[i[a].pr_active_key]),i[a].pr_next_slide=e(i[a].slides[i[a].pr_processing_key]),i[a].pr_active_bg=i[a].pr_active_slide.find("rs-sbg-wrap"),i[a].pr_next_bg=i[a].pr_next_slide.find("rs-sbg-wrap"),punchgs.TweenMax.to([i[a].pr_active_bg,i[a].pr_next_bg],.5,{opacity:0}),punchgs.TweenMax.set(i[a].pr_active_slide,{zIndex:18}),punchgs.TweenMax.set(i[a].pr_next_slide,{autoAlpha:0,zIndex:20}),i[a].tonpause=!1,i.removeTheLayers&&i[a].pr_active_key!==t&&i.removeTheLayers(i[a].pr_active_slide,a,!0),i[a].firststart=1,setTimeout(function(){delete i[a].pr_active_key,delete i[a].pr_processing_key},200))},P=function(a,r){if(i[a]!==t)if(clearTimeout(i[a].waitWithSwapSlide),i[a].pr_processing_key===t){if(i[a].startWithSlideKey!==t&&(i[a].pr_next_key=i.getComingSlide(a,i[a].startWithSlideKey).nindex,delete i[a].startWithSlideKey),i[a].pr_active_slide=e(i[a].slides[i[a].pr_active_key]),i[a].pr_next_slide=e(i[a].slides[i[a].pr_next_key]),i[a].pr_next_key==i[a].pr_active_key&&!0!==i[a].onlyPreparedSlide)return delete i[a].pr_next_key;!0===i[a].onlyPreparedSlide&&(i[a].onlyPreparedSlide=!1),i[a].pr_processing_key=i[a].pr_next_key,delete i[a].pr_next_key,i[a].pr_next_slide!==t&&i[a].pr_next_slide[0]!==t&&i[a].pr_next_slide[0].dataset.hal!==t&&(i[a].pr_next_slide[0].dataset.sofacounter=i[a].pr_next_slide[0].dataset.sofacounter==t?1:parseInt(i[a].pr_next_slide[0].dataset.sofacounter,0)+1),i[a].stopLoop&&i[a].pr_processing_key==i[a].lastslidetoshow-1&&(i[a].c.find("rs-progress").css({visibility:"hidden"}),i[a].c.trigger("revolution.slide.onstop"),i[a].noloopanymore=1),i[a].pr_next_slide.index()===i[a].slideamount-1&&i[a].looptogo>0&&"disabled"!==i[a].looptogo&&(i[a].looptogo--,i[a].looptogo<=0&&(i[a].stopLoop=!0)),i[a].tonpause=!0,i[a].c.trigger("stoptimer"),"off"===i[a].spinner&&(i[a].loader!==t?i[a].loader.css({display:"none"}):i[a].loadertimer=setTimeout(function(){i[a].loader!==t&&i[a].loader.css({display:"block"})},18)),I(i[a].pr_next_slide[0],a,1),i.preLoadAudio&&i.preLoadAudio(i[a].pr_next_slide,a,1),S(i[a].pr_next_slide[0],a,function(){i[a]!==t&&(i[a].pr_next_slide.find("rs-bgvideo").each(function(){var t=e(this);t.hasClass("HasListener")||(t.data("bgvideo",1),i.manageVideoLayer&&i.manageVideoLayer(t,a)),0==t.find(".rs-fullvideo-cover").length&&t.append('<div class="rs-fullvideo-cover"></div>')}),j(i[a].pr_next_slide.find("rs-sbg"),a,r))}),g(a)}else i[a].waitWithSwapSlide=setTimeout(function(){P(a,r)},18)},j=function(a,r,o){if(i[r]!==t){if(i[r].pr_active_slide=e(i[r].slides[i[r].pr_active_key]),i[r].pr_next_slide=e(i[r].slides[i[r].pr_processing_key]),i[r].pr_active_bg=i[r].pr_active_slide.find("rs-sbg-wrap"),i[r].pr_next_bg=i[r].pr_next_slide.find("rs-sbg-wrap"),i[r].tonpause=!1,clearTimeout(i[r].loadertimer),i[r].loader!==t&&i[r].loader.css({display:"none"}),i.setSize(r),i.manageNavigation&&i[r].navigation.use&&i.manageNavigation(r,!1),i[r].c.trigger("revolution.slide.onbeforeswap",{slider:r,slideIndex:parseInt(i[r].pr_active_key,0)+1,slideLIIndex:i[r].pr_active_key,nextSlideIndex:parseInt(i[r].pr_processing_key,0)+1,nextSlideLIIndex:i[r].pr_processing_key,nextslide:i[r].pr_next_slide,slide:i[r].pr_active_slide,currentslide:i[r].pr_active_slide,prevslide:i[r].pr_lastshown_key!==t?i[r].slides[i[r].pr_lastshown_key]:""}),i[r].transition=1,i[r].stopByVideo=!1,i[r].pr_next_slide[0]!==t&&i[r].pr_next_slide[0].dataset.duration!=t&&""!=i[r].pr_next_slide[0].dataset.duration?i[r].duration=parseInt(i[r].pr_next_slide[0].dataset.duration,0):i[r].duration=i[r].origcd,i[r].pr_next_slide[0]===t||"true"!=i[r].pr_next_slide[0].dataset.ssop&&!0!==i[r].pr_next_slide[0].dataset.ssop?i[r].ssop=!1:i[r].ssop=!0,i[r].sbtimeline.set&&i[r].sbtimeline.fixed&&i.updateFixedScrollTimes(r),i[r].c.trigger("nulltimer"),i[r].sdir=i[r].pr_processing_key<i[r].pr_active_key?1:0,"arrow"==i[r].sc_indicator&&(0==i[r].pr_active_key&&i[r].pr_processing_key==i[r].slideamount-1&&(i[r].sdir=1),i[r].pr_active_key==i[r].slideamount-1&&0==i[r].pr_processing_key&&(i[r].sdir=0)),i[r].lsdir=i[r].sdir,i[r].pr_active_key!=i[r].pr_processing_key&&1!=i[r].firststart&&"carousel"!==i[r].sliderType&&i.removeTheLayers&&i.removeTheLayers(i[r].pr_active_slide,r),i[r].pr_next_slide.hasClass("rs-pause-timer-once")||i[r].pr_next_slide.hasClass("rs-pause-timer-always")?i[r].stopByVideo=!0:i[r].c.trigger("restarttimer"),i[r].pr_next_slide.removeClass("rs-pause-timer-once"),i[r].pr_next_slide[0]!==t&&(i[r].c[0].dataset.slideactive=i[r].pr_next_slide[0].dataset.key),"carousel"==i[r].sliderType)i[r].mtl=new punchgs.TimelineLite,i.prepareCarousel(r,i[r].mtl),A(r),i[r].transition=0;else{i[r].mtl=new punchgs.TimelineLite({onComplete:function(){A(r)}}),i[r].mtl.add(punchgs.TweenMax.set(i[r].pr_next_bg.find("rs-sbg"),{opacity:0})),i[r].mtl.pause(),i.animateTheLayers&&(i[r].pr_next_key!==t?i.animateTheLayers({slide:i[r].pr_next_key,id:r,mode:"preset"}):i[r].pr_processing_key!==t?i.animateTheLayers({slide:i[r].pr_processing_key,id:r,mode:"preset"}):i[r].pr_active_key!==t&&i.animateTheLayers({slide:i[r].pr_active_key,id:r,mode:"preset"})),1==i[r].firststart&&(punchgs.TweenMax.set(i[r].pr_active_slide,{autoAlpha:0}),i[r].firststart=0),punchgs.TweenMax.set(i[r].pr_active_slide,{zIndex:18}),punchgs.TweenMax.set(i[r].pr_next_slide,{autoAlpha:0,zIndex:20}),"prepared"==i[r].pr_next_slide[0].dataset.differentissplayed&&(i[r].pr_next_slide[0].dataset.differentissplayed="done",i[r].pr_next_slide[0].dataset.anim=i[r].pr_next_slide[0].dataset.savedanim),i[r].pr_next_slide[0].dataset.firstanim!=t&&"done"!=i[r].pr_next_slide[0].dataset.differentissplayed&&(i[r].pr_next_slide[0].dataset.savedanim=i[r].pr_next_slide[0].dataset.anim,i[r].pr_next_slide[0].dataset.anim=i[r].pr_next_slide[0].dataset.firstanim,i[r].pr_next_slide[0].dataset.differentissplayed="prepared");var s=function(e){var i=(e=e===t?"t:random":e).split(";"),a={};for(var r in i)if(i.hasOwnProperty(r)){var o=i[r].split(":"),s=o[0],n=o[1],l="transition";switch(s){case"ei":l="easein";break;case"eo":l="easeout";break;case"s":l="masterspeed";break;case"sl":l="slotamount";break;case"r":l="rotate"}s!==t&&n!==t&&(a[l]=n.split(","))}a.transition===t&&(a={transition:["fade"]});return a}(i[r].pr_next_slide[0].dataset.anim);i[r].pr_next_slide[0].dataset.ntrid="on"==i[r].pr_next_slide[0].dataset.rndtrans?Math.round(80*Math.random()):parseInt(i[r].pr_next_slide[0].dataset.ntrid,0)+1||0,i[r].pr_next_slide[0].dataset.ntrid=s.transition===t||i[r].pr_next_slide[0].dataset.ntrid==s.transition.length?0:i[r].pr_next_slide[0].dataset.ntrid,i.animateSlide({animation:s,ntrid:i[r].pr_next_slide[0].dataset.ntrid,id:r}),i[r].pr_next_bg.data("panzoom")!==t&&(i.startPanZoom(i[r].pr_next_bg,r),i[r].mtl.add(punchgs.TweenMax.set(i[r].pr_next_bg,{autoAlpha:0}))),i[r].mtl.pause()}i.scrollHandling&&i[r].mtl!==t&&(i.scrollHandling(r,!0,0),i[r].mtl.eventCallback("onUpdate",function(){i.scrollHandling(r,!0,0,!0)})),"off"!=i[r].parallax.type&&i[r].parallax.firstgo==t&&i.scrollHandling&&(i[r].parallax.firstgo=!0,i[r].lastscrolltop=-999,i.scrollHandling(r,!0,0),setTimeout(function(){i[r]!==t&&(i[r].lastscrolltop=-999,i.scrollHandling(r,!0,0))},70),setTimeout(function(){i[r]!==t&&(i[r].lastscrolltop=-999,i.scrollHandling(r,!0,0))},100)),i.animateTheLayers?"carousel"===i[r].sliderType?i[r].carousel.showLayersAllTime?(e.each(i[r].slides,function(e){i[r].carousel.allLayersStarted?i.animateTheLayers({slide:e,id:r,mode:"rebuild"}):i.animateTheLayers({slide:e,id:r,mode:"start"})}),i[r].carousel.allLayersStarted=!0):(0!==i[r].firststart?i.animateTheLayers({slide:0,id:r,mode:"start"}):!0!==o&&i.animateTheLayers({slide:i[r].pr_next_key!==t?i[r].pr_next_key:i[r].pr_processing_key!==t?i[r].pr_processing_key:i[r].pr_active_key,id:r,mode:"start"}),i[r].firststart=0):i.animateTheLayers({slide:i[r].pr_next_key!==t?i[r].pr_next_key:i[r].pr_processing_key!==t?i[r].pr_processing_key:i[r].pr_active_key,id:r,mode:"start"}):i[r].mtl!=t&&setTimeout(function(){i[r].mtl.resume()},18),punchgs.TweenMax.to(i[r].pr_next_slide,.001,{autoAlpha:1})}};var A=function(r){if(i[r]!==t&&(i[r].firstSlideAvailable===t&&(i[r].firstSlideAvailable=!0,i.showFirstTime!==t&&i.showFirstTime(r)),"carousel"===i[r].sliderType||(punchgs.TweenMax.to(i[r].pr_next_bg.find("rs-sbg"),.001,{zIndex:20,autoAlpha:1,onComplete:function(){_(r,i[r].pr_next_slide)}}),i[r].pr_next_slide.index()!=i[r].pr_active_slide.index()&&punchgs.TweenMax.to(i[r].pr_active_slide,.2,{zIndex:18,autoAlpha:0,onComplete:function(){_(r,i[r].pr_active_slide)}})),i[r].pr_active_key=i[r].pr_processing_key!==t?i[r].pr_processing_key:i[r].pr_active_key,delete i[r].pr_processing_key,"scroll"!=i[r].parallax.type&&"scroll+mouse"!=i[r].parallax.type&&"mouse+scroll"!=i[r].parallax.type||(i[r].lastscrolltop=-999,i.scrollHandling(r)),i[r].mtldiff=i[r].mtl.time(),delete i[r].mtl,i[r].pr_active_key!==t)){i[r].slides[i[r].pr_active_key].dataset.sloop!==t&&function(e){if(i[e]!==t){i[e].sloops=i[e].sloops===t?{}:i[e].sloops;var a=i[e].slides[i[e].pr_active_key].dataset.key,r=i[e].sloops[a];if(r===t){r={s:2500,e:4500,r:"unlimited"};var o=i[e].slides[i[e].pr_active_key].dataset.sloop.split(";");for(var s in o)if(o.hasOwnProperty(s)){var n=o[s].split(":");switch(n[0]){case"s":r.s=parseInt(n[1],0)/1e3;break;case"e":r.e=parseInt(n[1],0)/1e3;break;case"r":r.r=n[1]}}r.r="unlimited"===r.r?-1:parseInt(r.r,0),i[e].sloops[a]=r,r.key=a}r.ct={time:r.s},r.tl=new punchgs.TimelineMax({}),r.timer=punchgs.TweenMax.fromTo(r.ct,r.e-r.s,{time:r.s},{time:r.e,ease:punchgs.Linear.easeNone,onRepeat:function(){for(var a in i[e].layers[r.key])i[e].layers[r.key].hasOwnProperty(a)&&i[e]._L[a].timeline.play(r.s);var o=i[e].c.find("rs-progress");o!==t&&o[0]!==t&&o[0].tween!==t&&o[0].tween.time(r.s)},onUpdate:function(){},onComplete:function(){}}).repeat(r.r),r.tl.add(r.timer,r.s),r.tl.time(i[e].mtldiff)}}(r),i[r].c.find(".active-rs-slide").removeClass("active-rs-slide"),e(i[r].slides[i[r].pr_active_key]).addClass("active-rs-slide"),i[r].c[0].dataset.slideactive=i[r].slides[i[r].pr_active_key].dataset.key,i[r].pr_active_bg.data("pztl")!=t&&(i[r].pr_active_bg.data("pztl").reverse(),i[r].pr_active_bg.data("pztl").timeScale(25)),i[r].pr_next_bg.data("panzoom")!==t&&(i[r].pr_next_bg.data("pztl")!=t?(i[r].pr_next_bg.data("pztl").timeScale(1),i[r].pr_next_bg.data("pztl").play()):i.startPanZoom(i[r].pr_next_bg,r)),i[r].pr_next_slide.find("rs-bgvideo").each(function(t){if(a&&!i[r].fallbacks.allowHTML5AutoPlayOnAndroid)return!1;var o=e(this);i.resetVideo(o,r,!1,!0),punchgs.TweenMax.fromTo(o,.25,{autoAlpha:0},{autoAlpha:1,ease:punchgs.Power3.easeInOut,delay:.05,onComplete:function(){i.animcompleted&&i.animcompleted(o,r)}})}),i[r].pr_active_bg.find("rs-bgvideo").each(function(t){if(a&&!i[r].fallbacks.allowHTML5AutoPlayOnAndroid)return!1;var o=e(this);i.stopVideo&&(i.resetVideo(o,r),i.stopVideo(o,r)),punchgs.TweenMax.to(o,1,{autoAlpha:0,ease:punchgs.Power3.easeInOut,delay:.2})});var o={slider:r,slideIndex:parseInt(i[r].pr_active_key,0)+1,slideLIIndex:i[r].pr_active_key,slide:i[r].pr_next_slide,currentslide:i[r].pr_next_slide,prevSlideIndex:i[r].pr_lastshown_key!==t&&parseInt(i[r].pr_lastshown_key,0)+1,prevSlideLIIndex:i[r].pr_lastshown_key!==t&&parseInt(i[r].pr_lastshown_key,0),prevSlide:i[r].pr_lastshown_key!==t&&i[r].slides[i[r].pr_lastshown_key]};if(i[r].c.trigger("revolution.slide.onchange",o),i[r].c.trigger("revolution.slide.onafterswap",o),i[r].pr_lastshown_key=i[r].pr_active_key,i[r].startWithSlide!==t&&"done"!==i[r].startWithSlide&&"carousel"===i[r].sliderType){for(var s=i[r].startWithSlide,n=0;n<=i[r].slides.length-1;n++)i[r].slides[n]!==t&&i[r].slides[n][0]!==t&&i[r].slides[n][0].dataset!==t&&i[r].slides[n][0].dataset.originalindex===i[r].startWithSlide&&(s=n);0!==s&&i.callingNewSlide(r,s),i[r].startWithSlide="done"}i[r].duringslidechange=!1,i[r].pr_active_slide.length>0&&i[r].pr_active_slide[0].dataset.hal!=t&&0!=i[r].pr_active_slide[0].dataset.hal&&i[r].pr_active_slide[0].dataset.hal<=i[r].pr_active_slide[0].dataset.sofacounter&&i[r].c.revremoveslide(i[r].pr_active_slide.index());var l=i[r].pr_processing_key||i[r].pr_active_key||0;i[r].rowzones!=t&&(l=l>i[r].rowzones.length?i[r].rowzones.length:l),i[r].rowzones!=t&&i[r].rowzones.length>0&&i[r].rowzones[l]!=t&&l>=0&&l<=i[r].rowzones.length&&i[r].rowzones[l].length>0&&i.setSize(r),delete i[r].sc_indicator,delete i[r].sc_indicator_dir,i[r].firstLetItFree===t&&(i.scrollHandling&&i.scrollHandling(r,!0),i[r].firstLetItFree=!0)}},Q=function(r){i[r].loop=0,i[r].stopAtSlide!=t&&i[r].stopAtSlide>-1?i[r].lastslidetoshow=i[r].stopAtSlide:i[r].lastslidetoshow=999,i[r].stopLoop=!1,0==i[r].looptogo&&(i[r].stopLoop=!0);var o=i[r].c.find("rs-progress");i[r].c.on("stoptimer",function(){var t=e(this).find("rs-progress");t[0].tween.pause(),i[r].disableProgressBar&&t.css({visibility:"hidden"}),i[r].sliderstatus="paused",i.unToggleState(i[r].slidertoggledby)}),i[r].c.on("starttimer",function(){i[r].forcepaused||(1!=i[r].conthover&&1!=i[r].stopByVideo&&i[r].width>i[r].hideSliderAtLimit&&1!=i[r].tonpause&&1!=i[r].overnav&&1!=i[r].ssop&&(1===i[r].noloopanymore||i[r].viewPort.enable&&!i[r].inviewport||(o.css({visibility:"visible"}),o[0].tween.resume(),i[r].sliderstatus="playing")),i[r].disableProgressBar&&o.css({visibility:"hidden"}),i.toggleState(i[r].slidertoggledby))}),i[r].c.on("restarttimer",function(){if(!i[r].forcepaused){var t=e(this).find("rs-progress");if(i[r].mouseoncontainer&&"on"==i[r].navigation.onHoverStop&&!a)return!1;1===i[r].noloopanymore||i[r].viewPort.enable&&!i[r].inviewport||1==i[r].ssop||(t.css({visibility:"visible"}),t[0].tween.kill(),t[0].tween=punchgs.TweenMax.fromTo(t,i[r].duration/1e3,{width:"0%"},{force3D:"auto",width:"100%",ease:punchgs.Linear.easeNone,onComplete:s,delay:1}),i[r].sliderstatus="playing"),i[r].disableProgressBar&&t.css({visibility:"hidden"}),i.toggleState(i[r].slidertoggledby)}}),i[r].c.on("nulltimer",function(){o[0].tween.kill(),o[0].tween=punchgs.TweenMax.fromTo(o,i[r].duration/1e3,{width:"0%"},{force3D:"auto",width:"100%",ease:punchgs.Linear.easeNone,onComplete:s,delay:1}),o[0].tween.pause(0),i[r].disableProgressBar&&o.css({visibility:"hidden"}),i[r].sliderstatus="paused"});var s=function(){0==e("body").find(i[r].c).length&&(!function(t){i[t].c.children().each(function(){try{e(this).die("click")}catch(e){}try{e(this).die("mouseenter")}catch(e){}try{e(this).die("mouseleave")}catch(e){}try{e(this).unbind("hover")}catch(e){}});try{i[t].c.die("click","mouseenter","mouseleave")}catch(e){}clearInterval(i[t].cdint),i[t].c=null}(r),clearInterval(i[r].cdint)),i[r].c.trigger("revolution.slide.slideatend"),1==i[r].c.data("conthoverchanged")&&(i[r].conthover=i[r].c.data("conthover"),i[r].c.data("conthoverchanged",0)),i.callingNewSlide(r,1)};o[0].tween=punchgs.TweenMax.fromTo(o,i[r].duration/1e3,{width:"0%"},{force3D:"auto",width:"100%",ease:punchgs.Linear.easeNone,onComplete:s,delay:1}),i[r].slideamount>1&&(0!=i[r].stopAfterLoops||1!=i[r].stopAtSlide)?i[r].c.trigger("starttimer"):(i[r].noloopanymore=1,i[r].c.trigger("nulltimer")),i[r].c.on("tp-mouseenter",function(){i[r].mouseoncontainer=!0,1!=i[r].navigation.onHoverStop||a||(i[r].c.trigger("stoptimer"),i[r].c.trigger("revolution.slide.onpause"))}),i[r].c.on("tp-mouseleft",function(){i[r].mouseoncontainer=!1,1!=i[r].c.data("conthover")&&1==i[r].navigation.onHoverStop&&(1==i[r].viewPort.enable&&i[r].inviewport||0==i[r].viewPort.enable)&&(i[r].c.trigger("revolution.slide.onresume"),i[r].c.trigger("starttimer"))})},H=function(){e(".rev_redraw_on_blurfocus").each(function(){var e=this.id;if(i[e]==t||i[e].c==t||0===i[e].c.length)return!1;1!=i[e].windowfocused&&(i[e].windowfocused=!0,punchgs.TweenMax.delayedCall(.3,function(){i[e].fallbacks.nextSlideOnWindowFocus&&i[e].c.revnext(),i[e].c.revredraw(),"playing"==i[e].lastsliderstatus&&i[e].c.revresume(),i[e].c.trigger("revolution.slide.tabfocused")}))})},N=function(){document.hasFocus()||e(".rev_redraw_on_blurfocus").each(function(){i[this.id].windowfocused=!1,i[this.id].lastsliderstatus=i[this.id].sliderstatus,i[this.id].c.revpause(),i[this.id].pr_next_bg!==t&&i[this.id].pr_next_bg.data("panzoom")!==t&&i.stopPanZoom(i[this.id].pr_next_bg,i[this.id]),i[this.id].pr_active_bg!==t&&i[this.id].pr_active_bg.data("panzoom")!==t&&i.stopPanZoom(i[this.id].pr_active_bg,i[this.id]),i[this.id].c.trigger("revolution.slide.tabblured")})},D=function(){var i=document.documentMode===t,a=window.chrome;1!==e("body").data("revslider_focus_blur_listener")&&(e("body").data("revslider_focus_blur_listener",1),i&&!a?e(window).on("focusin",function(){H()}).on("focusout",function(){N()}):window.addEventListener?(window.addEventListener("focus",function(e){H()},{capture:!1,passive:!0}),window.addEventListener("blur",function(e){N()},{capture:!1,passive:!0})):(window.attachEvent("focus",function(e){H()}),window.attachEvent("blur",function(e){N()})))},B=function(e){for(var t,i=[],a=window.location.href.slice(window.location.href.indexOf(e)+1).split("_"),r=0;r<a.length;r++)a[r]=a[r].replace("%3D","="),t=a[r].split("="),i.push(t[0]),i[t[0]]=t[1];return i},W=function(e){return e.charAt(0).toUpperCase()+e.slice(1)},V=function(i){return function(i){for(var a in i.minHeight=i.minHeight!==t?"none"===i.minHeight||"0"===i.minHeight||"0px"===i.minHeight||""==i.minHeight||" "==i.minHeight?0:parseInt(i.minHeight,0):0,i.maxHeight="none"===i.maxHeight||"0"===i.maxHeight?0:parseInt(i.maxHeight,0),i.carousel.maxVisibleItems=i.carousel.maxVisibleItems<1?999:i.carousel.maxVisibleItems,i.carousel.vertical_align="top"===i.carousel.vertical_align?"0%":"bottom"===i.carousel.vertical_align?"100%":"50%",i.carousel.space=parseInt(i.carousel.space,0),i.carousel.maxOpacity=parseInt(i.carousel.maxOpacity,0),i.carousel.maxRotation=parseInt(i.carousel.maxRotation,0),i.carousel.minScale=parseInt(i.carousel.minScale,0),i.carousel.speed=parseInt(i.carousel.speed,0),i.navigation.maintypes=["arrows","tabs","thumbnails","bullets"],i.navigation.maintypes)i.navigation.maintypes.hasOwnProperty(a)&&i.navigation[i.navigation.maintypes[a]]!==t&&(i.navigation[i.navigation.maintypes[a]].animDelay=parseInt(i.navigation[i.navigation.maintypes[a]].animDelay,0)/1e3,i.navigation[i.navigation.maintypes[a]].animSpeed=parseInt(i.navigation[i.navigation.maintypes[a]].animSpeed,0)/1e3);if(e.isNumeric(i.scrolleffect.tilt)||-1!==i.scrolleffect.tilt.indexOf("%")&&(i.scrolleffect.tilt=parseInt(i.scrolleffect.tilt)),i.scrolleffect.tilt=i.scrolleffect.tilt/100,i.navigation.thumbnails.position="outer-horizontal"==i.navigation.thumbnails.position?"bottom"==i.navigation.thumbnails.v_align?"outer-bottom":"outer-top":"outer-vertical"==i.navigation.thumbnails.position?"left"==i.navigation.thumbnails.h_align?"outer-left":"outer-right":i.navigation.thumbnails.position,i.navigation.tabs.position="outer-horizontal"==i.navigation.tabs.position?"bottom"==i.navigation.tabs.v_align?"outer-bottom":"outer-top":"outer-vertical"==i.navigation.tabs.position?"left"==i.navigation.tabs.h_align?"outer-left":"outer-right":i.navigation.tabs.position,i.sbtimeline.speed=parseInt(i.sbtimeline.speed,0)/1e3||.5,!0===i.sbtimeline.set&&!0===i.sbtimeline.fixed&&"auto"!==i.sliderLayout?(i.sbtimeline.fixStart=parseInt(i.sbtimeline.fixStart),i.sbtimeline.fixEnd=parseInt(i.sbtimeline.fixEnd)):i.sbtimeline.fixed=!1,i.startDelay=parseInt(i.startDelay,0)||0,i.navigation!==t&&i.navigation.arrows!=t&&i.navigation.arrows.hide_under!=t&&(i.navigation.arrows.hide_under=parseInt(i.navigation.arrows.hide_under)),i.navigation!==t&&i.navigation.bullets!=t&&i.navigation.bullets.hide_under!=t&&(i.navigation.bullets.hide_under=parseInt(i.navigation.bullets.hide_under)),i.navigation!==t&&i.navigation.thumbnails!=t&&i.navigation.thumbnails.hide_under!=t&&(i.navigation.thumbnails.hide_under=parseInt(i.navigation.thumbnails.hide_under)),i.navigation!==t&&i.navigation.tabs!=t&&i.navigation.tabs.hide_under!=t&&(i.navigation.tabs.hide_under=parseInt(i.navigation.tabs.hide_under)),i.navigation!==t&&i.navigation.arrows!=t&&i.navigation.arrows.hide_over!=t&&(i.navigation.arrows.hide_over=parseInt(i.navigation.arrows.hide_over)),i.navigation!==t&&i.navigation.bullets!=t&&i.navigation.bullets.hide_over!=t&&(i.navigation.bullets.hide_over=parseInt(i.navigation.bullets.hide_over)),i.navigation!==t&&i.navigation.thumbnails!=t&&i.navigation.thumbnails.hide_over!=t&&(i.navigation.thumbnails.hide_over=parseInt(i.navigation.thumbnails.hide_over)),i.navigation!==t&&i.navigation.tabs!=t&&i.navigation.tabs.hide_over!=t&&(i.navigation.tabs.hide_over=parseInt(i.navigation.tabs.hide_over)),i.lazyloaddata!==t&&i.lazyloaddata.length>0&&i.lazyloaddata.indexOf("-")>0){var r=i.lazyloaddata.split("-");for(i.lazyloaddata=r[0],a=1;a<r.length;a++)i.lazyloaddata+=W(r[a])}return i.duration=parseInt(i.duration),i}(e.extend(!0,{sliderType:"standard",sliderLayout:"auto",dottedOverlay:"none",duration:9e3,modal:{useAsModal:!1,cover:!0,coverColor:"rgba(0,0,0,0.5)",horizontal:"center",vertical:"middle"},navigation:{keyboardNavigation:!1,keyboard_direction:"horizontal",mouseScrollNavigation:"off",onHoverStop:!0,mouseScrollReverse:"default",touch:{touchenabled:!1,touchOnDesktop:!1,swipe_treshold:75,swipe_min_touches:1,swipe_direction:"horizontal",drag_block_vertical:!1},arrows:{style:"",enable:!1,hide_onmobile:!1,hide_under:0,hide_onleave:!1,hide_delay:200,hide_delay_mobile:1200,hide_over:9999,tmp:"",rtl:!1,left:{h_align:"left",v_align:"center",h_offset:20,v_offset:0,container:"slider"},right:{h_align:"right",v_align:"center",h_offset:20,v_offset:0,container:"slider"}},bullets:{enable:!1,hide_onmobile:!1,hide_onleave:!1,hide_delay:200,hide_delay_mobile:1200,hide_under:0,hide_over:9999,direction:"horizontal",h_align:"center",v_align:"bottom",space:5,h_offset:0,v_offset:20,tmp:'<span class="tp-bullet-image"></span><span class="tp-bullet-title"></span>',container:"slider",rtl:!1,style:""},thumbnails:{container:"slider",rtl:!1,style:"",enable:!1,width:100,height:50,min_width:100,wrapper_padding:2,wrapper_color:"transparent",tmp:'<span class="tp-thumb-image"></span><span class="tp-thumb-title"></span>',visibleAmount:5,hide_onmobile:!1,hide_onleave:!1,hide_delay:200,hide_delay_mobile:1200,hide_under:0,hide_over:9999,direction:"horizontal",span:!1,position:"inner",space:2,h_align:"center",v_align:"bottom",h_offset:0,v_offset:20},tabs:{container:"slider",rtl:!1,style:"",enable:!1,width:100,min_width:100,height:50,wrapper_padding:10,wrapper_color:"transparent",tmp:'<span class="tp-tab-image"></span>',visibleAmount:5,hide_onmobile:!1,hide_onleave:!1,hide_delay:200,hide_delay_mobile:1200,hide_under:0,hide_over:9999,direction:"horizontal",span:!1,space:0,position:"inner",h_align:"center",v_align:"bottom",h_offset:0,v_offset:20}},responsiveLevels:4064,visibilityLevels:[2048,1024,778,480],gridwidth:960,gridheight:500,minHeight:0,maxHeight:0,keepBPHeight:!1,forceOverflow:!1,fixedOnTop:!1,autoHeight:!1,gridEQModule:!1,disableForceFullWidth:!1,fullScreenOffsetContainer:"",fullScreenOffset:"0",hideLayerAtLimit:0,hideAllLayerAtLimit:0,hideSliderAtLimit:0,disableProgressBar:!1,stopAtSlide:-1,stopAfterLoops:0,shadow:0,startDelay:0,lazyType:"smart",spinner:"off",shuffle:!1,viewPort:{enable:!1,outof:"wait",visible_area:"200px",presize:!1},fallbacks:{isJoomla:!1,panZoomDisableOnMobile:!1,simplifyAll:!0,nextSlideOnWindowFocus:!1,disableFocusListener:!1,ignoreHeightChanges:"off",ignoreHeightChangesSize:0,allowHTML5AutoPlayOnAndroid:!0},parallax:{type:"off",levels:[10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85],origo:"enterpoint",disable_onmobile:!1,ddd_shadow:!1,ddd_bgfreeze:!1,ddd_overflow:"visible",ddd_layer_overflow:"visible",ddd_z_correction:65,speed:400,speedbg:0,speedls:0},scrolleffect:{set:!1,fade:!1,blur:!1,scale:!1,grayscale:!1,maxblur:10,layers:!1,slide:!1,direction:"both",multiplicator:1.35,multiplicator_layers:.5,tilt:30,mobile:!1},sbtimeline:{set:!1,fixed:!1,fixStart:0,fixEnd:0,layers:!1,slide:!1,ease:"Linear.easeNone",speed:500},carousel:{easing:punchgs.Power3.easeInOut,speed:800,showLayersAllTime:!1,horizontal_align:"center",vertical_align:"center",infinity:!1,space:0,maxVisibleItems:3,stretch:!1,fadeout:!0,maxRotation:0,maxOpacity:100,minScale:0,vary_fade:!1,vary_rotation:!1,vary_scale:!1,border_radius:"0px",padding_top:0,padding_bottom:0},extensions:"extensions/",extensions_suffix:".min.js",stopLoop:!1,waitForInit:!1},i))}}(jQuery),function($,undefined){"use strict";var _R=jQuery.fn.revolution;jQuery.extend(!0,_R,{checkActions:function(e,t){e===undefined?moduleEnterLeaveActions(t):checkActions_intern(e,t)}});var moduleEnterLeaveActions=function(e){!_R[e].moduleActionsPrepared&&_R[e].c[0].getElementsByClassName("rs-on-sh").length>0&&(_R[e].c.on("tp-mouseenter",function(){_R[e].mouseoncontainer=!0;var t,i=_R[e].pr_next_key!==undefined?_R[e].pr_next_key:_R[e].pr_processing_key!==undefined?_R[e].pr_processing_key:_R[e].pr_active_key!==undefined?_R[e].pr_active_key:_R[e].pr_next_key;if("none"!==i&&i!==undefined){if((i=_R[e].slides[i].dataset.key)!==undefined&&_R[e].layers[i])for(t in _R[e].layers[i])_R[e].layers[i][t].className.indexOf("rs-on-sh")>=0&&_R.renderLayerAnimation({layer:jQuery(_R[e].layers[i][t]),frame:"frame_1",mode:"trigger",id:e});for(t in _R[e].layers.static)_R[e].layers.static[t].className.indexOf("rs-on-sh")>=0&&_R.renderLayerAnimation({layer:jQuery(_R[e].layers.static[t]),frame:"frame_1",mode:"trigger",id:e})}}),_R[e].c.on("tp-mouseleft",function(){_R[e].mouseoncontainer=!0;var t,i=_R[e].pr_next_key!==undefined?_R[e].pr_next_key:_R[e].pr_processing_key!==undefined?_R[e].pr_processing_key:_R[e].pr_active_key!==undefined?_R[e].pr_active_key:_R[e].pr_next_key;if("none"!==i&&i!==undefined){if((i=_R[e].slides[i].dataset.key)!==undefined&&_R[e].layers[i])for(t in _R[e].layers[i])_R[e].layers[i][t].className.indexOf("rs-on-sh")>=0&&_R.renderLayerAnimation({layer:jQuery(_R[e].layers[i][t]),frame:"frame_999",mode:"trigger",id:e});for(t in _R[e].layers.static)_R[e].layers.static[t].className.indexOf("rs-on-sh")>=0&&_R.renderLayerAnimation({layer:jQuery(_R[e].layers.static[t]),frame:"frame_999",mode:"trigger",id:e})}})),_R[e].moduleActionsPrepared=!0},checkActions_intern=function(layer,id){var actions=layer[0].dataset.actions,_L=layer.data();for(var ei in actions=actions.split("||"),layer.addClass("rs-waction"),_L.events=_L.events===undefined?[]:_L.events,actions)if(actions.hasOwnProperty(ei)){var event=getEventParams(actions[ei].split(";"));_L.events.push(event),_R[id].fullscreen_esclistener||"exitfullscreen"!=event.action&&"togglefullscreen"!=event.action||(jQuery(document).keyup(function(e){27==e.keyCode&&jQuery("#rs-go-fullscreen").length>0&&layer.trigger(event.on)}),_R[id].fullscreen_esclistener=!0);var targetlayer="backgroundvideo"==event.layer?jQuery("rs-bgvideo"):"firstvideo"==event.layer?jQuery("rs-slide").find(".rs-layer-video"):jQuery("#"+event.layer);switch(-1!=jQuery.inArray(event.action,["toggleslider","toggle_mute_video","toggle_global_mute_video","togglefullscreen"])&&(_L._togglelisteners=!0),event.action){case"togglevideo":jQuery.each(targetlayer,function(){updateToggleByList(jQuery(this),"videotoggledby",layer[0].id)});break;case"togglelayer":jQuery.each(targetlayer,function(){updateToggleByList(jQuery(this),"layertoggledby",layer[0].id),jQuery(this).data("triggered_startstatus",event.togglestate)});break;case"toggle_global_mute_video":case"toggle_mute_video":jQuery.each(targetlayer,function(){updateToggleByList(jQuery(this),"videomutetoggledby",layer[0].id)});break;case"toggleslider":_R[id].slidertoggledby==undefined&&(_R[id].slidertoggledby=[]),_R[id].slidertoggledby.push(layer[0].id);break;case"togglefullscreen":_R[id].fullscreentoggledby==undefined&&(_R[id].fullscreentoggledby=[]),_R[id].fullscreentoggledby.push(layer[0].id)}}_R[id].actionsPrepared=!0,layer.on("click mouseenter mouseleave",function(e){for(var i in _L.events)if(_L.events.hasOwnProperty(i)&&_L.events[i].on===e.type){var event=_L.events[i];if("click"===event.on&&layer.hasClass("tp-temporarydisabled"))return!1;var targetlayer="backgroundvideo"==event.layer?jQuery(_R[id].slides[_R[id].pr_active_key]).find("rs-sbg-wrap rs-bgvideo"):"firstvideo"==event.layer?jQuery(_R[id].slides[_R[id].pr_active_key]).find(".rs-layer-video").first():jQuery("#"+event.layer),tex=targetlayer.length>0;switch(event.action){case"nextframe":case"prevframe":case"gotoframe":case"togglelayer":case"toggleframes":case"startlayer":case"stoplayer":if(targetlayer[0]===undefined)continue;var _=_R[id]._L[targetlayer[0].id],frame=event.frame,tou="triggerdelay";if("click"===e.type&&_.clicked_time_stamp!==undefined&&(new Date).getTime()-_.clicked_time_stamp<300)return;if("mouseenter"===e.type&&_.mouseentered_time_stamp!==undefined&&(new Date).getTime()-_.mouseentered_time_stamp<300)return;if("mouseleave"===e.type&&_.mouseleaveed_time_stamp!==undefined&&(new Date).getTime()-_.mouseleaveed_time_stamp<300)return;if(clearTimeout(_.triggerdelayIn),clearTimeout(_.triggerdelayOut),clearTimeout(_.triggerdelay),"click"===e.type&&(_.clicked_time_stamp=(new Date).getTime()),"mouseenter"===e.type&&(_.mouseentered_time_stamp=(new Date).getTime()),"mouseleave"===e.type&&(_.mouseleaveed_time_stamp=(new Date).getTime()),"nextframe"===event.action||"prevframe"===event.action){_.forda=_.forda===undefined?getFordWithAction(_):_.forda;var inx=jQuery.inArray(_.currentframe,_.ford);for("nextframe"===event.action&&inx++,"prevframe"===event.action&&inx--;"skip"!==_.forda[inx]&&inx>0&&inx<_.forda.length-1;)"nextframe"===event.action&&inx++,"prevframe"===event.action&&inx--,inx=Math.min(Math.max(0,inx),_.forda.length-1);frame=_.ford[inx]}jQuery.inArray(event.action,["toggleframes","togglelayer","startlayer","stoplayer"])>=0&&(_.triggeredstate="startlayer"===event.action||"togglelayer"===event.action&&"frame_1"!==_.currentframe||"toggleframes"===event.action&&_.currentframe!==event.frameN,frame=_.triggeredstate?"toggleframes"===event.action?event.frameN:"frame_1":"toggleframes"===event.action?event.frameM:"frame_999",tou=_.triggeredstate?"triggerdelayIn":"triggerdelayOut",_.triggeredstate?_R.toggleState(_.layertoggledby):(_R.stopVideo&&_R.stopVideo(targetlayer,id),_R.unToggleState(_.layertoggledby)));var pars={layer:targetlayer,frame:frame,mode:"trigger",id:id};!0===event.children&&(pars.updateChildren=!0,pars.fastforward=!0),_R.renderLayerAnimation&&(clearTimeout(_[tou]),_[tou]=setTimeout(function(e){_R.renderLayerAnimation(e)},1e3*event.delay,pars));break;case"playvideo":tex&&_R.playVideo(targetlayer,id);break;case"stopvideo":tex&&_R.stopVideo&&_R.stopVideo(targetlayer,id);break;case"togglevideo":tex&&(_R.isVideoPlaying(targetlayer,id)?_R.stopVideo&&_R.stopVideo(targetlayer,id):_R.playVideo(targetlayer,id));break;case"mutevideo":tex&&_R.Mute(targetlayer,id,!0);break;case"unmutevideo":tex&&_R.Mute&&_R.Mute(targetlayer,id,!1);break;case"toggle_mute_video":tex&&(_R.Mute(targetlayer,id)?_R.Mute(targetlayer,id,!1):_R.Mute&&_R.Mute(targetlayer,id,!0));break;case"toggle_global_mute_video":var pvl=_R[id].playingvideos!=undefined&&_R[id].playingvideos.length>0;pvl&&(_R[id].globalmute?jQuery.each(_R[id].playingvideos,function(e,t){_R.Mute&&_R.Mute(t,id,!1)}):jQuery.each(_R[id].playingvideos,function(e,t){_R.Mute&&_R.Mute(t,id,!0)})),_R[id].globalmute=!_R[id].globalmute;break;default:punchgs.TweenLite.delayedCall(event.delay,function(targetlayer,id,event,layer){switch(event.action){case"openmodal":if(event.modalslide=event.modalslide===undefined?0:event.modalslide,window.RS_60_MODALS===undefined||-1==jQuery.inArray(event.modal,window.RS_60_MODALS)){var data={action:"revslider_ajax_call_front",client_action:"get_slider_html",token:_R[id].ajaxNonce,alias:event.modal,usage:"modal"};jQuery.ajax({type:"post",url:_R[id].ajaxUrl,dataType:"json",data:data,success:function(e,t,i){1==e.success&&(jQuery("body").append(e.data),setTimeout(function(){jQuery(document).trigger("RS_OPENMODAL_"+event.modal,event.modalslide)},49))},error:function(e){console.log("Modal Can not be Loaded"),console.log(e)}})}else jQuery(document).trigger("RS_OPENMODAL_"+event.modal,event.modalslide);break;case"closemodal":_R.revModal(id,{mode:"close"});break;case"callback":eval(event.callback);break;case"simplelink":window.open(event.url,event.target);break;case"simulateclick":targetlayer.length>0&&targetlayer.click();break;case"toggleclass":targetlayer.length>0&&targetlayer.toggleClass(event.classname);break;case"scrollbelow":case"scrollto":layer.addClass("tp-scrollbelowslider");var doc=jQuery(document),off="scrollbelow"===event.action?(getOffContH(_R[id].fullScreenOffsetContainer)||0)-(parseInt(event.offset,0)||0)||0:0-(parseInt(event.offset,0)||0),c="scrollbelow"===event.action?_R[id].c:jQuery("#"+event.id),ctop=c.length>0?c.offset().top:0,sobj={_y:window.pageYOffset!==document.documentElement.scrollTop?0!==window.pageYOffset?window.pageYOffset:document.documentElement.scrollTop:window.pageYOffset};ctop+="scrollbelow"===event.action?jQuery(_R[id].slides[0]).height():0,punchgs.TweenLite.to(sobj,event.speed/1e3,{_y:ctop-off,ease:event.ease,onUpdate:function(){doc.scrollTop(sobj._y)}});break;case"jumptoslide":switch(event.slide.toLowerCase()){case"+1":case"next":_R[id].sc_indicator="arrow",_R[id].sc_indicator_dir=0,_R.callingNewSlide(id,1,"carousel"===_R[id].sliderType);break;case"previous":case"prev":case"-1":_R[id].sc_indicator="arrow",_R[id].sc_indicator_dir=1,_R.callingNewSlide(id,-1,"carousel"===_R[id].sliderType);break;case"first":_R[id].sc_indicator="arrow",_R[id].sc_indicator_dir=1,_R.callingNewSlide(id,0,"carousel"===_R[id].sliderType);break;case"last":_R[id].sc_indicator="arrow",_R[id].sc_indicator_dir=0,_R.callingNewSlide(id,_R[id].slideamount-1,"carousel"===_R[id].sliderType);break;default:var ts=jQuery.isNumeric(event.slide)?parseInt(event.slide,0):event.slide;_R.callingNewSlide(id,ts,"carousel"===_R[id].sliderType)}break;case"toggleslider":_R[id].noloopanymore=0,"playing"==_R[id].sliderstatus?(_R[id].c.revpause(),_R[id].forcepaused=!0,_R.unToggleState(_R[id].slidertoggledby)):(_R[id].forcepaused=!1,_R[id].c.revresume(),_R.toggleState(_R[id].slidertoggledby));break;case"pauseslider":_R[id].c.revpause(),_R.unToggleState(_R[id].slidertoggledby);break;case"playslider":_R[id].noloopanymore=0,_R[id].c.revresume(),_R.toggleState(_R[id].slidertoggledby);break;case"gofullscreen":case"exitfullscreen":case"togglefullscreen":var gf;jQuery(".rs-go-fullscreen").length>0&&("togglefullscreen"==event.action||"exitfullscreen"==event.action)?(jQuery(".rs-go-fullscreen").removeClass("rs-go-fullscreen"),gf=_R[id].c.closest("rs-fullwidth-wrap").length>0?_R[id].c.closest("rs-fullwidth-wrap"):_R[id].c.closest("rs-module-wrap"),_R[id].minHeight=_R[id].oldminheight,_R[id].infullscreenmode=!1,_R[id].c.revredraw(),jQuery(window).trigger("resize"),_R.unToggleState(_R[id].fullscreentoggledby)):0!=jQuery(".rs-go-fullscreen").length||"togglefullscreen"!=event.action&&"gofullscreen"!=event.action||(gf=_R[id].c.closest("rs-fullwidth-wrap").length>0?_R[id].c.closest("rs-fullwidth-wrap"):_R[id].c.closest("rs-module-wrap"),gf.addClass("rs-go-fullscreen"),_R[id].oldminheight=_R[id].minHeight,_R[id].minHeight=jQuery(window).height(),_R[id].infullscreenmode=!0,_R[id].c.revredraw(),jQuery(window).trigger("resize"),_R.toggleState(_R[id].fullscreentoggledby));break;default:_R[id].c.trigger("layeraction",[event.action,layer,event])}},[targetlayer,id,event,layer])}}})};function getFordWithAction(e){var t=[];for(var i in e.ford)e.frames[e.ford[i]].timeline.waitoncall?t.push(e.ford[i]):t.push("skip");return t}function updateToggleByList(e,t,i){var a=e.data(t);a===undefined&&(a=[]),a.push(i),e.data(t,a)}function getEventParams(e){var t={on:"click",delay:0,ease:"Power2.easeOut",speed:400};for(var i in e)if(e.hasOwnProperty(i)){var a=e[i].split(":");switch(a[0]){case"modal":t.modal=a[1];break;case"ms":t.modalslide=a[1];break;case"m":t.frameM=a[1];break;case"n":t.frameN=a[1];break;case"o":t.on="click"===a[1]||"c"===a[1]?"click":"ml"===a[1]||"mouseleave"===a[1]?"mouseleave":"mouseenter"===a[1]||"me"===a[1]?"mouseenter":a[1];break;case"d":t.delay=parseInt(a[1],0)/1e3,t.delay="NaN"===t.delay||isNaN(t.delay)?0:t.delay;break;case"a":t.action=a[1];break;case"f":t.frame=a[1];break;case"slide":t.slide=a[1];break;case"layer":t.layer=a[1];break;case"sp":t.speed=parseInt(a[1],0);break;case"e":t.ease=a[1];break;case"ls":t.togglestate=a[1];break;case"offset":t.offset=a[1];break;case"call":t.callback=a[1];break;case"url":t.url="";for(var r=1;r<a.length;r++)t.url+=a[r]+(r===a.length-1?"":":");break;case"target":t.target=a[1];break;case"class":t.classname=a[1];break;case"ch":t.children="true"==a[1]||1==a[1]||"t"==a[1];break;default:a[0].length>0&&""!==a[0]&&(t[a[0]]=a[1])}}return t}var getOffContH=function(e){if(e==undefined)return 0;if(e.split(",").length>1){var t=e.split(","),i=0;return t&&jQuery.each(t,function(e,t){jQuery(t).length>0&&(i+=jQuery(t).outerHeight(!0))}),i}return jQuery(e).height()}}(jQuery),function(e){"use strict";var t=jQuery.fn.revolution;jQuery.extend(!0,t,{prepareCarousel:function(e,o,n,l){void 0!==e&&(n=t[e].carousel.lastdirection=a(n,t[e].carousel.lastdirection),i(e),t[e].carousel.slide_offset_target=s(e),void 0!==l?r(e,n,!1,0):null==o?t.carouselToEvalPosition(e,n):r(e,n,!1))},carouselToEvalPosition:function(e,i){var o=t[e].carousel;i=o.lastdirection=a(i,o.lastdirection);var s="center"===o.horizontal_align?(o.wrapwidth/2-o.slide_width/2-o.slide_globaloffset)/o.slide_width:(0-o.slide_globaloffset)/o.slide_width,n=t.simp(s,t[e].slideamount,!1),l=n-Math.floor(n),d=0,c=-1*(Math.ceil(n)-n),p=-1*(Math.floor(n)-n);d=l>=.3&&"left"===i||l>=.7&&"right"===i?c:l<.3&&"left"===i||l<.7&&"right"===i?p:d,d=o.infinity?d:n<0?n:s>t[e].slideamount-1?s-(t[e].slideamount-1):d,o.slide_offset_target=d*o.slide_width,o.slide_offset_target!==o.slide_offset_targetCACHE&&(0!==Math.abs(o.slide_offset_target)?r(e,i,!0):t.organiseCarousel(e,i),o.slide_offset_targetCACHE=o.slide_offset_target)},organiseCarousel:function(e,i,a,r){i=void 0===i||"down"==i||"up"==i||null===i||jQuery.isEmptyObject(i)?"left":i;for(var o=t[e].carousel,s=[],n=t[e].slides.length,l=0;l<n;l++){var d=l*o.slide_width+o.slide_offset;o.infinity&&(d=(d=d>o.wrapwidth-o.inneroffset&&"right"==i?o.slide_offset-(t[e].slides.length-l)*o.slide_width:d)<0-o.inneroffset-o.slide_width&&"left"==i?d+o.maxwidth:d),s[l]=d}var c=999,p=0,u=t[e].ulw;t[e].slides&&jQuery.each(t[e].slides,function(r,l){var d=s[r],h={};o.infinity&&(d=(d=d>o.wrapwidth-o.inneroffset+o.slide_width&&"left"===i?s[0]-(n-r)*o.slide_width:d)<0-o.inneroffset-3*o.slide_width?"left"==i?d+o.maxwidth:"right"===i?s[n-1]+(r+1)*o.slide_width:d:d,(u=u>d?d:u)>0&&d>o.wrapwidth&&(d=o.slide_offset-(t[e].slides.length-r)*o.slide_width)),h.left=d+o.inneroffset;var g="center"===o.horizontal_align?(Math.abs(o.wrapwidth/2)-(h.left+o.slide_width/2))/o.slide_width:(o.inneroffset-h.left)/o.slide_width,f="center"===o.horizontal_align?2:1;if((a&&Math.abs(g)<c||0===g)&&(c=Math.abs(g),o.focused=r),h.width=o.slide_width,h.x=0,h.transformPerspective=1200,h.transformOrigin="50% "+o.vertical_align,o.fadeout)if(o.vary_fade)h.autoAlpha=1-Math.abs(o.maxOpacity/100/Math.ceil(o.maxVisibleItems/f)*g);else switch(o.horizontal_align){case"center":h.autoAlpha=Math.abs(g)<Math.ceil(o.maxVisibleItems/f-1)?1:1-(Math.abs(g)-Math.floor(Math.abs(g)));break;case"left":h.autoAlpha=g<1&&g>0?1-g:Math.abs(g)>o.maxVisibleItems-1?1-(Math.abs(g)-(o.maxVisibleItems-1)):1;break;case"right":h.autoAlpha=g>-1&&g<0?1-Math.abs(g):g>o.maxVisibleItems-1?1-(Math.abs(g)-(o.maxVisibleItems-1)):1}else h.autoAlpha=Math.abs(g)<Math.ceil(o.maxVisibleItems/f)?1:0;void 0!==o.minScale&&o.minScale>0&&(o.vary_scale?h.scale=1-Math.abs(o.minScale/100/Math.ceil(o.maxVisibleItems/f)*g):h.scale=g>=1||g<=-1?1-o.minScale/100:(100-o.minScale*Math.abs(g))/100,p=g*(h.width-h.width*h.scale)/2),void 0!==o.maxRotation&&0!=Math.abs(o.maxRotation)&&(o.vary_rotation?(h.rotationY=Math.abs(o.maxRotation)-Math.abs((1-Math.abs(1/Math.ceil(o.maxVisibleItems/f)*g))*o.maxRotation),h.autoAlpha=Math.abs(h.rotationY)>90?0:h.autoAlpha):h.rotationY=g>=1||g<=-1?o.maxRotation:Math.abs(g)*o.maxRotation,h.rotationY=g<0?-1*h.rotationY:h.rotationY),h.x=-1*o.space*g,h.left=Math.floor(h.left),h.x=Math.floor(h.x),void 0!==h.scale&&(h.x=h.x+p),h.zIndex=Math.round(100-Math.abs(5*g)),h.force3D=!0,h.transformStyle="3D"!=t[e].parallax.type&&"3d"!=t[e].parallax.type?"flat":"preserve-3d",punchgs.TweenLite.set(l,h)}),r&&(o.focused=void 0===o.focused?0:o.focused,o.oldfocused=void 0===o.oldfocused?0:o.oldfocused,t[e].pr_next_key=o.focused,o.focused!==o.oldfocused&&t.animateTheLayers&&(t.removeTheLayers(jQuery(t[e].slides[o.oldfocused]),e),t.animateTheLayers({slide:o.focused,id:e,mode:t[e].carousel.allLayersStarted?"rebuild":"start"})),o.oldfocused=o.focused,t[e].c.trigger("revolution.nextslide.waiting"))}});var i=function(e){void 0===t[e].bw&&t.setSize(e);var i=t[e].carousel,a=t.getHorizontalOffset(t[e].c,"left"),r=t.getHorizontalOffset(t[e].c,"right");void 0===i.wrap&&function(e){var i=t[e].carousel;i.infbackup=i.infinity,i.maxVisiblebackup=i.maxVisibleItems,i.slide_globaloffset="none",i.slide_offset=0,i.wrap=t[e].c.find("rs-carousel-wrap"),0!==i.maxRotation&&("3D"!==t[e].parallax.type&&"3d"!==t[e].parallax.type||punchgs.TweenLite.set(i.wrap,{perspective:"1600px",transformStyle:"preserve-3d"})),void 0!==i.border_radius&&parseInt(i.border_radius,0)>0&&punchgs.TweenLite.set(t[e].c.find("rs-slide"),{borderRadius:i.border_radius})}(e),i.slide_width=!0!==i.stretch?t[e].gridwidth[t[e].level]*(0===t[e].bw?1:t[e].bw):t[e].c.width(),i.slide_height=!0!==i.stretch?t[e].gridheight[t[e].level]*(0===t[e].bw?1:t[e].bw):t[e].c.height(),i.maxwidth=t[e].slideamount*i.slide_width,i.maxVisiblebackup>t[e].slides.length+1&&(i.maxVisibleItems=t[e].slides.length+2),i.wrapwidth=i.maxVisibleItems*i.slide_width+(i.maxVisibleItems-1)*i.space,i.wrapwidth="auto"!=t[e].sliderLayout?i.wrapwidth>t[e].c.width()?t[e].c.width():i.wrapwidth:i.wrapwidth>t[e].canvas.width()?t[e].canvas.width():i.wrapwidth,i.infinity=!(i.wrapwidth>=i.maxwidth)&&i.infbackup,i.wrapoffset="center"===i.horizontal_align?(t[e].c.width()-r-a-i.wrapwidth)/2:0,i.wrapoffset="auto"!=t[e].sliderLayout&&t[e].outernav?0:i.wrapoffset<a?a:i.wrapoffset;var o="3D"==t[e].parallax.type||"3d"==t[e].parallax.type?"visible":"hidden";"right"===i.horizontal_align?punchgs.TweenLite.set(i.wrap,{left:"auto",right:i.wrapoffset+"px",width:i.wrapwidth,overflow:o}):punchgs.TweenLite.set(i.wrap,{right:"auto",left:i.wrapoffset+"px",width:i.wrapwidth,overflow:o}),i.inneroffset="right"===i.horizontal_align?i.wrapwidth-i.slide_width:0,i.realoffset=Math.abs(i.wrap.position().left),i.windhalf=jQuery(window).width()/2},a=function(e,t){return null===e||jQuery.isEmptyObject(e)?t:void 0===e?"right":e},r=function(e,i,r,o){var s=t[e].carousel;i=s.lastdirection=a(i,s.lastdirection);var n={},l=r?punchgs.Power2.easeOut:s.easing;n.from=0,n.to=s.slide_offset_target,o=void 0===o?s.speed/1e3:o,0!==(o=r?o*(Math.abs(n.to)/s.wrapwidth):o)&&o<.1&&Math.abs(n.to)>25&&(o=.3),void 0!==s.positionanim&&s.positionanim.pause(),s.positionanim=punchgs.TweenLite.to(n,o,{from:n.to,onUpdate:function(){s.slide_offset=s.slide_globaloffset+n.from,s.slide_offset=t.simp(s.slide_offset,s.maxwidth),t.organiseCarousel(e,i,!1,!1)},onComplete:function(){s.slide_globaloffset=s.infinity?t.simp(s.slide_globaloffset+s.slide_offset_target,s.maxwidth):s.slide_globaloffset+s.slide_offset_target,s.slide_offset=t.simp(s.slide_offset,s.maxwidth),t.organiseCarousel(e,i,!1,!0),void 0!==s.focused&&r&&t.callingNewSlide(e,jQuery(t[e].slides[s.focused]).data("key"),!0),"carousel"!==t[e].sliderType||t[e].carousel.fadein||(punchgs.TweenLite.to(t[e].canvas,1,{scale:1,opacity:1}),t[e].carousel.fadein=!0),t[e].c.trigger("revolution.slide.carouselchange",{slider:e,slideIndex:parseInt(t[e].pr_active_key,0)+1,slideLIIndex:t[e].pr_active_key,slide:t[e].pr_next_slide,currentslide:t[e].pr_next_slide,prevSlideIndex:void 0!==t[e].pr_lastshown_key&&parseInt(t[e].pr_lastshown_key,0)+1,prevSlideLIIndex:void 0!==t[e].pr_lastshown_key&&parseInt(t[e].pr_lastshown_key,0),prevSlide:void 0!==t[e].pr_lastshown_key&&t[e].slides[t[e].pr_lastshown_key]})},ease:l})},o=function(e,t){return Math.abs(e)>Math.abs(t)?e>0?e-Math.abs(Math.floor(e/t)*t):e+Math.abs(Math.floor(e/t)*t):e},s=function(e){var i,a,r,s,n,l=0,d=t[e].carousel;if(void 0!==d.positionanim&&d.positionanim.kill(),"none"==d.slide_globaloffset)d.slide_globaloffset=l="center"===d.horizontal_align?d.wrapwidth/2-d.slide_width/2:0;else{d.slide_globaloffset=d.slide_offset,d.slide_offset=0;var c=t[e].pr_processing_key,p="center"===d.horizontal_align?(d.wrapwidth/2-d.slide_width/2-d.slide_globaloffset)/d.slide_width:(0-d.slide_globaloffset)/d.slide_width;p=t.simp(p,t[e].slideamount,!1),c=(c=c>=0?c:t[e].pr_active_key)>=0?c:0,l=d.infinity?(i=p,a=c,r=t[e].slideamount,n=a-r-i,s=o(s=a-i,r),n=o(n,r),-(Math.abs(s)>Math.abs(n)?n:s)):p-c,l*=d.slide_width}return l}}(jQuery),function(e){"use strict";var t=["chars","words","lines"],i=jQuery.fn.revolution;i.is_mobile(),i.is_android();jQuery.extend(!0,i,{checkLayerDimensions:function(e){var t=!1;for(var a in i[e.id].layers[e.skey])if(i[e.id].layers[e.skey].hasOwnProperty(a)&&!t){var r=i[e.id].layers[e.skey][a];i[e.id]._L[r.id].eow!==r.offsetWidth&&(t=!0)}return t},initLayer:function(e){var t,a,r,o=e.id,s=e.skey;for(var n in i[o]._L=void 0===i[o]._L?{}:i[o]._L,i[o].layers[s])if(i[o].layers[s].hasOwnProperty(n)){var l="carousel"===i[o].sliderType?0:i[o].width/2-i[o].gridwidth[i[o].level]*i[o].bw/2,d=0,c=i[o].layers[s][n],h=jQuery(c),g=c.dataset.initialised?i[o]._L[c.id]:h.data();if(void 0===c.dataset.initialised){if(i.revCheckIDS(o,c),i[o]._L[c.id]=g,g.ford=void 0===g.ford?"frame_0;frame_1;frame_999":g.ford,g.ford=";"==g.ford[g.ford.length-1]?g.ford.substring(0,g.ford.length-1):g.ford,g.ford=g.ford.split(";"),void 0!==g.clip)for(t in g.clipPath={use:!1,origin:"l",type:"rectangle"},g.clip=g.clip.split(";"),g.clip)g.clip.hasOwnProperty(t)&&("u"==(a=g.clip[t].split(":"))[0]&&(g.clipPath.use="true"==a[1]),"o"==a[0]&&(g.clipPath.origin=a[1]),"t"==a[0]&&(g.clipPath.type=a[1]));if(g.frames=w(g,o),g.c=h,g.p=h.closest(".rs-parallax-wrap"),g.lp=h.closest("rs-loop-wrap"),g.m=h.closest("rs-mask-wrap"),g.triggercache=void 0===g.triggercache?"reset":g.triggercache,g.rsp_bd=void 0===g.rsp_bd?"column"===g.type||"row"===g.type?"off":"on":g.rsp_bd,g.rsp_o=void 0===g.rsp_o?"on":g.rsp_o,g.basealign=void 0===g.basealign?"grid":g.basealign,g.group="group"!==g.type&&h.closest("rs-group-wrap").length>0?"group":"column"!==g.type&&h.closest("rs-column").length>0?"column":"row"!==g.type&&h.closest("rs-row").length>0?"row":void 0,g._lig="group"===g.group?h.closest("rs-group"):"column"===g.group?h.closest("rs-column"):"row"===g.group?h.closest("rs-row"):void 0,g._ligid=void 0!==g._lig?g._lig[0].id:void 0,g._column="RS-COLUMN"===h[0].tagName?h.closest("rs-column-wrap"):"none",g._row="RS-COLUMN"===h[0].tagName&&h.closest("rs-row"),g._ingroup="group"===g.group,g._incolumn="column"===g.group,g._inrow="row"===g.group,(g._ingroup||g._incolumn)&&g._lig[0].className.indexOf("rs-sba")>=0&&(!1!==g.animationonscroll||void 0===g.frames.loop)&&!0!==g.animOnScrollForceDisable&&(g.animationonscroll=!0,h[0].className+=" rs-sba",i[o].sbas[s][c.id]=h[0]),g.animOnScrollRepeats=0,g._isgroup="RS-GROUP"===h[0].tagName,g.type=g.type||"none","row"===g.type&&void 0===g.cbreak&&(g.cbreak=2),g._isnotext=-1!==jQuery.inArray(g.type,["video","image","audio","shape"]),g._mediatag="html5"==g.audio?"audio":"video",g.img=h.find("img"),g.deepiframe=h[0].getElementsByTagName("iframe"),g.deepmedia=h[0].getElementsByTagName(g._mediatag),g.layertype="image"===g.type?"image":h[0].className.indexOf("rs-layer-video")>=0||h[0].className.indexOf("rs-layer-audio")>=0||g.deepiframe.length>0&&(g.deepiframe[0].src.toLowerCase().indexOf("youtube")>0||g.deepiframe[0].src.toLowerCase().indexOf("vimeo")>0)||g.deepmedia.length>0?"video":"html",g.deepiframe.length>0&&(g.deepiframe[0].dataset.layertype=g.layertype),"column"===g.type&&(g.cbg=g.p.find("rs-column-bg"),g.cbgmask=g.p.find("rs-cbg-mask-wrap")),g._slidelink=h[0].className.indexOf("slidelink")>=0,g._isstatic=h[0].className.indexOf("rs-layer-static")>=0,g.slidekey=g._isstatic?"staticlayers":s,g._togglelisteners=h.find(".rs-toggled-content").length>0,g.bgcol=void 0===g.bgcol?h[0].style.background.indexOf("gradient")>=0?h[0].style.background:h.css("backgroundColor"):g.bgcol,g.bgcol=0===g.bgcol.indexOf("rgba(0, 0, 0, 0)")&&g.bgcol.length>18?g.bgcol.replace("rgba(0, 0, 0, 0)",""):g.bgcol,g.zindex=h.css("z-Index"),g._togglelisteners&&h.click(function(){i.swaptoggleState([this.id])}),void 0!==g.border)for(t in g.border=g.border.split(";"),g.bordercolor="transparent",g.border)if(g.border.hasOwnProperty(t))switch((a=g.border[t].split(":"))[0]){case"boc":g.bordercolor=a[1];break;case"bow":g.borderwidth=i.revToResp(a[1],4,0);break;case"bos":g.borderstyle=i.revToResp(a[1],4,0);break;case"bor":g.borderradius=i.revToResp(a[1],4,0)}if("svg"===g.type&&(g.svg=h.find("svg"),g.svgPath=g.svg.find("path"),g.svgI=p(g.svgi,o),g.svgH=p(g.svgh,o)),void 0!==g.btrans){var f=g.btrans;for(t in g.btrans={rX:0,rY:0,rZ:0,o:1},f=f.split(";"))if(f.hasOwnProperty(t))switch((a=f[t].split(":"))[0]){case"rX":g.btrans.rX=a[1];break;case"rY":g.btrans.rY=a[1];break;case"rZ":g.btrans.rZ=a[1];break;case"o":g.btrans.o=a[1]}}if(void 0!==g.tsh)for(t in g.tshadow={c:"rgba(0,0,0,0.25)",v:0,h:0,b:0},g.tsh=g.tsh.split(";"),g.tsh)if(g.tsh.hasOwnProperty(t))switch((a=g.tsh[t].split(":"))[0]){case"c":g.tshadow.c=a[1];break;case"h":g.tshadow.h=a[1];break;case"v":g.tshadow.v=a[1];break;case"b":g.tshadow.b=a[1]}if(void 0!==g.bsh)for(t in g.bshadow={e:"c",c:"rgba(0,0,0,0.25)",v:0,h:0,b:0,s:0},g.bsh=g.bsh.split(";"),g.bsh)if(g.bsh.hasOwnProperty(t))switch((a=g.bsh[t].split(":"))[0]){case"c":g.bshadow.c=a[1];break;case"h":g.bshadow.h=a[1];break;case"v":g.bshadow.v=a[1];break;case"b":g.bshadow.b=a[1];break;case"s":g.bshadow.s=a[1];break;case"e":g.bshadow.e=a[1]}if(void 0!==g.dim)for(t in g.dim=g.dim.split(";"),g.dim)if(g.dim.hasOwnProperty(t))switch((a=g.dim[t].split(":"))[0]){case"w":g.width=a[1];break;case"h":g.height=a[1];break;case"maxw":g.maxwidth=a[1];break;case"maxh":g.maxheight=a[1];break;case"minw":g.minwidth=a[1];break;case"minh":g.minheight=a[1]}if(void 0!==g.xy)for(t in g.xy=g.xy.split(";"),g.xy)if(g.xy.hasOwnProperty(t))switch((a=g.xy[t].split(":"))[0]){case"x":g.x=a[1].replace("px","");break;case"y":g.y=a[1].replace("px","");break;case"xo":g.hoffset=a[1].replace("px","");break;case"yo":g.voffset=a[1].replace("px","")}if(!g._isnotext&&void 0!==g.text)for(t in g.text=g.text.split(";"),g.text)if(g.text.hasOwnProperty(t))switch((a=g.text[t].split(":"))[0]){case"w":g.whitespace=a[1];break;case"td":g.textDecoration=a[1];break;case"c":g.clear=a[1];break;case"f":g.float=a[1];break;case"s":g.fontsize=a[1];break;case"l":g.lineheight=a[1];break;case"ls":g.letterspacing=a[1];break;case"fw":g.fontweight=a[1];break;case"a":g.textalign=a[1]}if(void 0!==g.flcr)for(t in g.flcr=g.flcr.split(";"),g.flcr)if(g.flcr.hasOwnProperty(t))switch((a=g.flcr[t].split(":"))[0]){case"c":g.clear=a[1];break;case"f":g.float=a[1]}if(void 0!==g.padding)for(t in g.padding=g.padding.split(";"),g.padding)if(g.padding.hasOwnProperty(t))switch((a=g.padding[t].split(":"))[0]){case"t":g.paddingtop=a[1];break;case"b":g.paddingbottom=a[1];break;case"l":g.paddingleft=a[1];break;case"r":g.paddingright=a[1]}if(void 0!==g.margin)for(t in g.margin=g.margin.split(";"),g.margin)if(g.margin.hasOwnProperty(t))switch((a=g.margin[t].split(":"))[0]){case"t":g.margintop=a[1];break;case"b":g.marginbottom=a[1];break;case"l":g.marginleft=a[1];break;case"r":g.marginright=a[1]}if(void 0!==g.spike&&(g.spike=I(g.spike)),void 0!==g.corners)for(t in r=g.corners.split(";"),g.corners={},r)r.hasOwnProperty(t)&&r[t].length>0&&(g.corners[r[t]]=jQuery("<"+r[t]+"></"+r[t]+">"),g.c.append(g.corners[r[t]]));g.textalign=u(g.textalign),g.vbility=i.revToResp(g.vbility,i[o].rle,!0),g.hoffset=i.revToResp(g.hoffset,i[o].rle,0),g.voffset=i.revToResp(g.voffset,i[o].rle,0),g.x=i.revToResp(g.x,i[o].rle,"l"),g.y=i.revToResp(g.y,i[o].rle,"t"),k(h,0,o),c.dataset.initialised=!0}var m="grid"===g.basealign?i[o].width:"carousel"!==i[o].sliderType||g._isstatic?i[o].ulw:i[o].carousel.slide_width,v="grid"===g.basealign?i[o].height:("carousel"!==i[o].sliderType||g._isstatic,i[o].ulh),y=g.x[i[o].level],b=g.y[i[o].level];if(d="slide"===g.basealign?0:Math.max(0,"fullscreen"==i[o].sliderLayout?v/2-i[o].gridheight[i[o].level]*(i[o].keepBPHeight?1:i[o].bh)/2:i[o].autoHeight||null!=i[o].minHeight&&i[o].minHeight>0?i[o].conh/2-i[o].gridheight[i[o].level]*i[o].bh/2:d),l="slide"===g.basealign?0:Math.max(0,l),"slide"!==g.basealign&&"carousel"===i[o].sliderType&&g._isstatic&&void 0!==i[o].carousel&&void 0!==i[o].carousel.horizontal_align&&(l=Math.max(0,"center"===i[o].carousel.horizontal_align?0+(i[o].ulw-i[o].gridwidth[i[o].level]*i[o].bw)/2:"right"===i[o].carousel.horizontal_align?i[o].ulw-i[o].gridwidth[i[o].level]*i[o].bw:l)),"updateposition"!==e.mode){if(0==g.vbility[i[o].levelForced]||"f"==g.vbility[i[o].levelForced]||m<i[o].hideLayerAtLimit&&"on"==g.layeronlimit||m<i[o].hideAllLayerAtLimit?g.p[0].classList.add("rs-layer-hidden"):g.p[0].classList.remove("rs-layer-hidden"),g.poster=null==g.poster&&void 0!==g.thumbimage?g.thumbimage:g.poster,"image"===g.layertype)if("cover-proportional"===g.img.data("c")){g.img[0].dataset.owidth=void 0===g.img[0].dataset.owidth?g.img[0].width:g.img[0].dataset.owidth,g.img[0].dataset.oheight=void 0===g.img[0].dataset.oheight?g.img[0].height:g.img[0].dataset.oheight;var _=g.img[0].dataset.owidth/g.img[0].dataset.oheight,x=m/v;_>x&&_<=1||_<x&&_>1?punchgs.TweenMax.set(g.img,{width:"100%",height:"auto",left:"c"===y||"center"===y?"50%":"left"===y||"l"===y?"0":"auto",right:"r"===y||"right"===y?"0":"auto",top:"c"===b||"center"===b?"50%":"top"===b||"t"===b?"0":"auto",bottom:"b"===b||"bottom"===b?"0":"auto",x:"c"===y||"center"===y?"-50%":"0",y:"c"===b||"center"===y?"-50%":"0",position:"absolute"}):punchgs.TweenMax.set(g.img,{height:"100%",width:"auto",left:"c"===y||"center"===y?"50%":"left"===y||"l"===y?"0":"auto",right:"r"===y||"right"===y?"0":"auto",top:"c"===b||"center"===b?"50%":"top"===b||"t"===b?"0":"auto",bottom:"b"===b||"bottom"===b?"0":"auto",x:"c"===y||"center"===y?"-50%":"0",y:"c"===b||"center"===y?"-50%":"0",position:"absolute"})}else{var L="auto"!==g.width[i[o].level]||isNaN(g.width[i[o].level])&&g.width[i[o].level].indexOf("%")>=0?"100%":"auto",z="auto"!==g.height[i[o].level]||isNaN(g.height[i[o].level])&&g.height[i[o].level].indexOf("%")>=0?"100%":"auto";punchgs.TweenMax.set(g.img,{width:L,height:z})}else if("video"===g.layertype){i.manageVideoLayer&&!g.videoLayerManaged&&i.manageVideoLayer(h,o),"rebuild"!==e.mode&&i.resetVideo&&i.resetVideo(h,o,e.mode),null!=g.aspectratio&&g.aspectratio.split(":").length>1&&(1==g.bgvideo||1==g.forcecover)&&i.prepareCoveredVideo(o,h),g.media=void 0===g.media?g.deepiframe.length>0?jQuery(g.deepiframe[0]):jQuery(g.deepmedia[0]):g.media,g.html5vid=void 0===g.html5vid?!(g.deepiframe.length>0):g.html5vid;var S=h[0].className.indexOf("coverscreenvideo")>=0;g.media.css({display:"block"});var M=g.width[i[o].level],O=g.height[i[o].level];M="auto"===M?M:!jQuery.isNumeric(M)&&M.indexOf("%")>0?g._incolumn||g._ingroup?"100%":"grid"===g.basealign?i[o].gridwidth[i[o].level]*i[o].bw:m:"off"!==g.rsp_bd?parseFloat(M)*i[o].bw+"px":parseFloat(M)+"px",O="auto"===O?O:!jQuery.isNumeric(O)&&O.indexOf("%")>0?"grid"===g.basealign?i[o].gridheight[i[o].level]*i[o].bw:v:"off"!==g.rsp_bd?parseFloat(O)*i[o].bh+"px":parseFloat(O)+"px";var C=T(h,o);if(g._incolumn&&"100%"===M&&"auto"===O&&void 0!==g.ytid){g.vd=void 0===g.vd?i[o].videos[h[0].id].ratio.split(":").length>1?i[o].videos[h[0].id].ratio.split(":")[0]/i[o].videos[h[0].id].ratio.split(":")[1]:1:g.vd;var P=h.width()/g.vd;punchgs.TweenLite.set(h,{height:P+"px"}),g.heightSetByVideo=!0}else-1!=h[0].className.indexOf("rs-fsv")||S?(l=0,d=0,g.x=i.revToResp(0,i[o].rle,0),g.y=i.revToResp(0,i[o].rle,0),h.css({width:m,height:i[o].autoHeight?i[o].conh:v})):punchgs.TweenMax.set(h,{paddingTop:Math.round(C.paddingTop*i[o].bh)+"px",paddingBottom:Math.round(C.paddingBottom*i[o].bh)+"px",paddingLeft:Math.round(C.paddingLeft*i[o].bw)+"px",paddingRight:Math.round(C.paddingRight*i[o].bw)+"px",marginTop:C.marginTop*i[o].bh+"px",marginBottom:C.marginBottom*i[o].bh+"px",marginLeft:C.marginLeft*i[o].bw+"px",marginRight:C.marginRight*i[o].bw+"px",borderTopWidth:Math.round(C.borderTopWidth*i[o].bh)+"px",borderBottomWidth:Math.round(C.borderBottomWidth*i[o].bh)+"px",borderLeftWidth:Math.round(C.borderLeftWidth*i[o].bw)+"px",borderRightWidth:Math.round(C.borderRightWidth*i[o].bw)+"px",width:M,height:O}),(0==g.html5vid&&!S||1!=g.forcecover&&!h.hasClass("rs-fsv")&&!S)&&(g.media.width(M),g.media.height(O)),g._ingroup&&null!=M&&!jQuery.isNumeric(M)&&M.indexOf("%")>0&&punchgs.TweenMax.set([g.lp,g.p,g.m],{minWidth:M})}g._slidelink||R(h,o,0,g.rsp_bd),"on"===g.rsp_ch&&"row"!==g.type&&"column"!==g.type&&"group"!==g.type&&h.find("*").each(function(){var e=jQuery(this);null==this.dataset||this.dataset.stylerecorder||k(e,"rekursive",o),R(e,o,"rekursive",g.rsp_bd)})}if("preset"!==e.mode){if(g.eow=h.outerWidth(!0),g.eoh=h.outerHeight(!0),("text"===g.type||"button"===g.type)&&void 0!==g.corners){for(r in g.corners)if(g.corners.hasOwnProperty(r)){g.corners[r].css("borderWidth",g.eoh+"px");var j="rs-fcrt"===r||"rs-fcr"===r;g.corners[r].css("border"+(j?"Right":"Left"),"0px solid transparent"),g.corners[r].css("border"+("rs-fcrt"==r||"rs-bcr"==r?"Bottom":"Top")+"Color",g.bgcol)}g.eow=h.outerWidth(!0)}0==g.eow&&0==g.eoh&&(g.eow=i[o].ulw,g.eoh=i[o].ulh);var A="on"===g.rsp_o?parseInt(g.voffset[i[o].level],0)*i[o].bw:parseInt(g.voffset[i[o].level],0),Q="on"===g.rsp_o?parseInt(g.hoffset[i[o].level],0)*i[o].bw:parseInt(g.hoffset[i[o].level],0),H="grid"===g.basealign?i[o].gridwidth[i[o].level]*i[o].bw:m,N="grid"===g.basealign?i[o].gridheight[i[o].level]*(i[o].keepBPHeight?1:i[o].bh):v;(1==i[o].gridEQModule||void 0!==g._lig&&"row"!==g.type&&"column"!==g.type&&"group"!==g.type)&&(H=void 0!==g._lig?g._lig.width():i[o].ulw,N=void 0!==g._lig?g._lig.height():i[o].ulh,l=0,d=0),y="c"===y||"m"===y||"center"===y||"middle"===y?H/2-g.eow/2+Q:"l"===y||"left"===y?Q:"r"===y||"right"===y?H-g.eow-Q:"off"!==g.rsp_o?y*i[o].bw:y,b="m"===b||"c"===b||"center"===b||"middle"===b?N/2-g.eoh/2+A:"t"===b||"top"==b?A:"b"===b||"bottom"==b?N-g.eoh-A:"off"!==g.rsp_o?b*i[o].bw:b,y=g._slidelink?0:i[o].rtl&&"100%"!==g.width[i[o].level]?y+g.eow:y,g.calcx=parseInt(y,0)+l,g.calcy=parseInt(b,0)+d,"row"!==g.type&&"column"!==g.type?punchgs.TweenMax.set(g.p,{zIndex:g.zindex,top:g.calcy,left:g.calcx,overwrite:"auto"}):"row"!==g.type?punchgs.TweenMax.set(g.p,{zIndex:g.zindex,width:g.columnwidth,top:0,left:0,overwrite:"auto"}):"row"===g.type&&(punchgs.TweenMax.set(g.p,{zIndex:g.zindex,width:"grid"===g.basealign?H+"px":"100%",top:0,left:l,overwrite:"auto"}),g.cbreak<=i[o].level?h[0].classList.add("rev_break_columns"):h[0].classList.remove("rev_break_columns")),void 0!==g.blendmode&&punchgs.TweenMax.set(g.p,{mixBlendMode:g.blendmode}),void 0!==g.frame_loop&&punchgs.TweenMax.set(g.lp,{minWidth:g.eow,minHeight:g.eoh}),g._ingroup&&(void 0!==g._groupw&&!jQuery.isNumeric(g._groupw)&&g._groupw.indexOf("%")>0&&punchgs.TweenMax.set([g.lp,g.p,g.m],{minWidth:g._groupw}),void 0!==g._grouph&&!jQuery.isNumeric(g._grouph)&&g._grouph.indexOf("%")>0&&punchgs.TweenMax.set([g.lp,g.p,g.m],{minHeight:g._grouph}))}}},animcompleted:function(e,t){if(void 0!==i[t].videos){var a=i[t].videos[e[0].id];null!=a&&null!=a.type&&"none"!=a.type&&(1==a.aplay||"true"==a.aplay||"on"==a.aplay||"1sttime"==a.aplay?("carousel"===i[t].sliderType&&e.closest("rs-slide").index()!=i[t].pr_active_key||i.playVideo(e,t),i.toggleState(e.data("videotoggledby")),(a.aplay1||"1sttime"==a.aplay)&&(a.aplay1=!1,a.aplay=!1)):("no1sttime"==a.aplay&&(a.aplay=!0),i.unToggleState(e.data("videotoggledby"))))}},handleStaticLayers:function(e,t){var a=0,r=i[t].realslideamount+1;if(void 0!==e[0].dataset.onslides){var o=e[0].dataset.onslides.split(";");for(var s in o)if(o.hasOwnProperty(s)){var n=o[s].split(":");"s"===n[0]&&(a=parseInt(n[1],0)),"e"===n[0]&&(r=parseInt(n[1],0))}}a=Math.max(0,a),r=Math.min(i[t].realslideamount,r<0?i[t].realslideamount:r),r=1!==a&&0!==a||r!==i[t].realslideamount?r:i[t].realslideamount+1,e.data("startslide",a),e.data("endslide",r),e[0].dataset.startslide=a,e[0].dataset.endslide=r},animateTheLayers:function(e){if(void 0===e.slide)return!1;var t=e.id;if(void 0===i[t].slides[e.slide])return!1;var a=i[t].slides[e.slide].dataset.key,r=i[t].pr_processing_key||i[t].pr_active_key||0;if(i[t].layers=i[t].layers||{},i[t].layers[a]=void 0===i[t].layers[a]?x(jQuery(i[t].slides[e.slide]),"rs-layer"):i[t].layers[a],i[t].layers.static=void 0===i[t].layers.static?x(jQuery(i[t].c.find("rs-static-layers")),"rs-layer"):i[t].layers.static,i[t].sbas[a]=void 0===i[t].sbas[a]?x(jQuery(i[t].slides[e.slide]),"rs-sba"):i[t].sbas[a],i.updateDimensions(t),void 0!==a&&i[t].layers[a]&&i.initLayer({id:t,skey:a,mode:e.mode,animcompleted:"rebuild"===e.mode&&"carousel"===i[t].sliderType&&i[t].carousel.showLayersAllTime}),i[t].layers.static&&i.initLayer({id:t,skey:"static",mode:e.mode,animcompleted:"rebuild"===e.mode&&"carousel"===i[t].sliderType&&i[t].carousel.showLayersAllTime}),i[t].dimensionReCheck||(setTimeout(function(){void 0!==a&&i[t].layers[a]&&i.checkLayerDimensions({id:t,skey:a})&&i.initLayer({id:t,skey:a,mode:"updateposition"}),i[t].layers.static&&i.checkLayerDimensions({id:t,skey:"static"})&&i.initLayer({id:t,skey:"static",mode:"updateposition"})},200),i[t].dimensionReCheck=!0),(void 0!==i[t].rowzones&&i[t].rowzones.length>0&&r>=0&&i[t].rowzones[Math.min(r,i[t].rowzones.length)].length>0||void 0!==i[t].srowzones&&i[t].srowzones.length>0||void 0!==i[t].smiddleZones&&i[t].smiddleZones.length>0)&&(i.setSize(t),i.updateDimensions(t),i.initLayer({id:t,skey:a,mode:"updateposition"}),i.initLayer({id:t,skey:"static",mode:"updateposition"})),void 0!==a&&i[t].layers[a])for(var o in i[t].layers[a])i[t].layers[a].hasOwnProperty(o)&&i.renderLayerAnimation({layer:jQuery(i[t].layers[a][o]),id:t,mode:e.mode});if(i[t].layers.static)for(var o in i[t].layers.static)i[t].layers.static.hasOwnProperty(o)&&i.renderLayerAnimation({layer:jQuery(i[t].layers.static[o]),id:t,mode:e.mode});null!=i[t].mtl&&setTimeout(function(){null!=i[t].mtl&&i[t].mtl.resume()},30)},removeTheLayers:function(e,t,a){var r=e[0].dataset.key;if(i[t].sloops&&i[t].sloops[r]&&i[t].sloops[r].tl&&i[t].sloops[r].tl.stop(),"carousel"===i[t].sliderType&&i[t].carousel.showLayersAllTime);else{for(var o in i[t].layers[r])i[t].layers[r].hasOwnProperty(o)&&i.renderLayerAnimation({layer:jQuery(i[t].layers[r][o]),frame:"frame_999",mode:"continue",remove:!0,id:t,allforce:a});for(var o in i[t].layers.static)i[t].layers.static.hasOwnProperty(o)&&i.renderLayerAnimation({layer:jQuery(i[t].layers.static[o]),frame:"frame_999",mode:"continue",remove:!0,id:t,allforce:a})}},renderLayerAnimation:function(e){var d=e.layer,c=e.id,p=i[c].level,u=i[c]._L[d[0].id],f=void 0!==u.timeline?u.timeline.time():void 0,b=!1,w=!1,_="none";if("preset"!==e.mode||!0===u.frames.frame_1.timeline.waitoncall||void 0!==u.scrollBasedOffset||!0===u.forceRender){if("trigger"==e.mode&&(u.triggeredFrame=e.frame),u._isstatic){var x="carousel"===i[c].sliderType&&void 0!==i[c].carousel.oldfocused?i[c].carousel.oldfocused:void 0===i[c].pr_lastshown_key?1:parseInt(i[c].pr_lastshown_key,0)+1,k="carousel"===i[c].sliderType?void 0===i[c].pr_next_key?0===x?1:x:parseInt(i[c].pr_next_key,0)+1:void 0===i[c].pr_processing_key?x:parseInt(i[c].pr_processing_key,0)+1,T=x>=u.startslide&&x<=u.endslide,L=k>=u.startslide&&k<=u.endslide;if(_=x===u.endslide&&"continue"===e.mode||("continue"===e.mode||x===u.endslide)&&"none",!0===e.allforce||!0===_);else{if("preset"===e.mode&&(u.elementHovered||!L))return;if("rebuild"===e.mode&&!T&&!L)return;if("start"===e.mode&&L&&"frame_1"===u.lastRequestedMainFrame)return;if("continue"===e.mode&&"frame_999"===e.frame&&L)return;if("start"===e.mode&&!L)return}}else"start"===e.mode&&"keep"!==u.triggercache&&(u.triggeredFrame=void 0);for(var R in"start"===e.mode&&void 0!==u.layerLoop&&(u.layerLoop.count=0),"start"===e.mode&&(e.frame=void 0===u.triggeredFrame?0:u.triggeredFrame),"continue"!==e.mode&&"trigger"!==e.mode&&void 0!==u.timeline&&u.timeline.pause(0),"continue"!==e.mode&&"trigger"!==e.mode||void 0===u.timeline||u.timeline.pause(),u.timeline=new punchgs.TimelineMax({paused:!0}),"text"!==u.type&&"button"!==u.type||void 0!==u.splitText&&(void 0!==u.splitTextFix||"start"!==e.mode&&"preset"!==e.mode)||(h({layer:d,id:c}),"start"===e.mode&&(u.splitTextFix=!0)),u.ford)if(u.ford.hasOwnProperty(R)){var I=u.ford[R],z=!1;if("frame_0"!==I&&"frame_hover"!==I&&"loop"!==I){if("frame_999"===I&&!u.frames[I].timeline.waitoncall&&u.frames[I].timeline.start>=i[c].duration&&!0!==e.remove&&(u.frames[I].timeline.waitoncall=!0),"start"===e.mode&&"keep"!==u.triggercache&&(u.frames[I].timeline.callstate=u.frames[I].timeline.waitoncall?"waiting":""),"trigger"===e.mode&&u.frames[I].timeline.waitoncall&&(I===e.frame?(u.frames[I].timeline.triggered=!0,u.frames[I].timeline.callstate="called"):u.frames[I].timeline.triggered=!1),"rebuild"===e.mode||u.frames[I].timeline.triggered||(u.frames[I].timeline.callstate=u.frames[I].timeline.waitoncall?"waiting":""),!1!==e.fastforward){if(("continue"===e.mode||"trigger"===e.mode)&&!1===w&&I!==e.frame)continue;if(("rebuild"===e.mode||"preset"===e.mode)&&!1===w&&void 0!==u.triggeredFrame&&I!==u.triggeredFrame)continue;(I===e.frame||"rebuild"===e.mode&&I===u.triggeredFrame)&&(w=!0)}else I===e.frame&&(w=!0);if(I!==e.frame&&u.frames[I].timeline.waitoncall&&"called"!==u.frames[I].timeline.callstate&&(b=!0),I!==e.frame&&w&&(b=!0===b&&u.frames[I].timeline.waitoncall?"skiprest":!0!==b&&b),void 0===u.hideonfirststart&&"frame_1"===I&&u.frames[I].timeline.waitoncall&&(u.hideonfirststart=!0),b&&"waiting"===u.frames[I].timeline.callstate&&"preset"===e.mode&&1!=u.firstTimeRendered)z=!0,u.firstTimeRendered=!0;else if("skiprest"===b||"called"!==u.frames[I].timeline.callstate&&b&&e.toframe!==I)continue;if("frame_999"!==I||!1!==_||"continue"!==e.mode&&"start"!==e.mode&&"rebuild"!==e.mode){u.fff="frame_1"===I&&("trigger"!==e.mode||"frame_999"===u.currentframe||"frame_0"===u.currentframe||void 0===u.currentframe),z||(u.frames[I].timeline.callstate="called",u.currentframe=I);var S=u.frames[I],M=u.fff?u.frames.frame_0:void 0,O=new punchgs.TimelineMax,C=new punchgs.TimelineMax,P=u.c,j=void 0!==S.sfx&&g(S.sfx.effect,u.m,S.timeline.ease),A=S.timeline.speed/1e3,Q=0,H=m({id:c,frame:S,layer:d,ease:S.timeline.ease,splitAmount:P.length,target:I,forcefilter:void 0!==u.frames.frame_hover&&void 0!==u.frames.frame_hover.filter}),N=u.fff?m({id:c,frame:M,layer:d,ease:S.timeline.ease,splitAmount:P.length,target:"frame_0"}):void 0,D=void 0!==S.mask?m({id:c,frame:{transform:{x:S.mask.x,y:S.mask.y}},layer:d,ease:H.ease,target:"mask"}):void 0,B=void 0!==D&&u.fff?m({id:c,frame:{transform:{x:M.mask.x,y:M.mask.y}},layer:d,ease:H.ease,target:"frommask"}):void 0,W=H.ease;"block"===j.type&&(j.ft[0].background=S.sfx.fxc,O.add(punchgs.TweenMax.fromTo(j.bmask_in,A/2,j.ft[0],j.ft[1],0)),O.add(punchgs.TweenMax.fromTo(j.bmask_in,A/2,j.ft[1],j.t,A/2)),"frame_0"===I||"frame_1"===I?N.opacity=0:"frame_999"===I&&O.add(C.staggerFromTo(P,.05,{autoAlpha:1},{autoAlpha:0,delay:A/2},0),.001)),void 0!==S.color?H.color=S.color:void 0!==u.color&&"npc"!==u.color[p]&&(H.color=u.color[p]),void 0!==M&&void 0!==M.color?N.color=M.color:void 0!==M&&void 0!==u.color&&"npc"!==u.color[p]&&(N.color=u.color[p]),void 0!==S.bgcolor?S.bgcolor.indexOf("gradient")>=0?H.background=S.bgcolor:H.backgroundColor=S.bgcolor:!0===u.bgcolinuse&&(u.bgcol.indexOf("gradient")>=0?H.background=u.bgcol:H.backgroundColor=u.bgcol),void 0!==M&&(void 0!==M.bgcolor?M.bgcolor.indexOf("gradient")>=0?N.background=M.bgcolor:N.backgroundColor=M.bgcolor:!0===u.bgcolinuse&&(u.bgcol.indexOf("gradient")>=0?N.background=u.bgcol:N.backgroundColor=u.bgcol));var V=0;if(void 0!==u.splitText&&!1!==u.splitText)for(var Y in t)if(void 0===S[t[Y]]||u.quickRendering)u.fff?O.add(C.fromTo(u.splitText[t[Y]],A,{immediateRender:!1,color:N.color},{color:H.color},0),0):O.add(C.to(u.splitText[t[Y]],A,{color:H.color},0),0);else{var F=y(u.splitText[t[Y]],S[t[Y]].dir),E=m({id:c,frame:S,source:t[Y],ease:W,layer:d,splitAmount:F.length,target:I+"_"+t[Y]}),X=u.fff?m({id:c,frame:M,ease:E.ease,source:t[Y],layer:d,splitAmount:F.length,target:"frame_0_"+t[Y]}):void 0;Q=void 0===S[t[Y]].delay?.05:S[t[Y]].delay/100,E.color=H.color,void 0!==N&&(X.color=N.color);var Z=v(jQuery.extend(!0,{},E)),q=u.fff?v(jQuery.extend(!0,{},X)):void 0;delete Z.dir,Z.data={splitted:!0},void 0!==q&&delete q.dir,u.fff?O.add(C.staggerFromTo(F,A,q,Z,u.frames[I].split?Q:0,0),0):O.add(C.staggerTo(F,A,Z,u.frames[I].split?Q:0,0),0),V=F.length>V?F.length:V}A+=u.frames[I].split?Q*V:0,u.pxundermask||void 0!==D&&(void 0!==M&&"hidden"===M.mask.overflow||"hidden"===S.mask.overflow)?(O.add(punchgs.TweenMax.to(u.m,.001,{overflow:"hidden"}),0),"column"===u.type&&O.add(punchgs.TweenMax.to(u.cbgmask,.001,{overflow:"hidden"}),0),u.btrans&&(B&&(B.rotationX=u.btrans.rX,B.rotationY=u.btrans.rY,B.rotationZ=u.btrans.rZ,B.opacity=u.btrans.o),D.rotationX=u.btrans.rX,D.rotationY=u.btrans.rY,D.rotationZ=u.btrans.rZ,D.opacity=u.btrans.o),u.fff?O.add(punchgs.TweenMax.fromTo([u.m,u.cbgmask],A,jQuery.extend(!0,{},B),jQuery.extend(!0,{},D)),.001):O.add(punchgs.TweenMax.to([u.m,u.cbgmask],A,jQuery.extend(!0,{},D)),.001)):void 0!==u.btrans?O.add(punchgs.TweenMax.to(u.m,.001,{x:0,y:0,filter:"none",opacity:u.btrans.o,rotationX:u.btrans.rX,rotationY:u.btrans.rY,rotationZ:u.btrans.rZ,overflow:"visible"}),0):O.add(punchgs.TweenMax.to(u.m,.001,{clearProps:"transform",overflow:"visible"}),0),H.force3D="auto",u.fff?(H.visibility="visible",void 0!==u.cbg&&O.fromTo(u.cbg,A,N,H,0),i[c].BUG_safari_clipPath&&(N.clipPath||H.clipPath||u.spike)&&(N.z&&parseInt(N.z,10)||(N.z=-1e-4),H.z&&parseInt(H.z,10)||(H.z=0)),void 0!==u.cbg&&"column"===u.type?O.fromTo(P,A,a(N),a(H),0):O.fromTo(P,A,N,H,0)):(void 0!==u.cbg&&O.to(u.cbg,A,H,0),!i[c].BUG_safari_clipPath||!H.clipPath&&!u.spike||H.z&&parseInt(H.z,10)||(H.z=0-.01*Math.random()),void 0!==u.cbg&&"column"===u.type?O.to(P,A,a(H),0):O.to(P,A,H,0)),void 0!==W&&"object"!=typeof W&&W.indexOf("SFXBounce")>=0&&O.to(P,A,{scaleY:.5,scaleX:1.3,ease:H.ease+"-squash",transformOrigin:"bottom"},1e-4);var U="trigger"!==e.mode&&(!0!==b&&"skiprest"!==b||"rebuild"!==e.mode)||e.frame===I||void 0===S.timeline.start||!jQuery.isNumeric(S.timeline.start)?"+=0"===S.timeline.start||void 0===S.timeline.start?"+=0.005":parseInt(S.timeline.start,0)/1e3:"+="+parseInt(S.timeline.startRelative,0)/1e3;u.timeline.addLabel(I,U),u.timeline.add(O,U),u.timeline.addLabel(I+"_end","+=0.01"),O.eventCallback("onStart",o,[{id:c,frame:I,L:d}]),"true"==u.animationonscroll||1==u.animationonscroll?(O.eventCallback("onUpdate",s,[{id:c,frame:I,L:d}]),O.smoothChildTiming=!0):O.eventCallback("onUpdate",s,[{id:c,frame:I,L:d}]),O.eventCallback("onComplete",n,[{id:c,frame:I,L:d}])}}}if(void 0!==u.frames.loop){var G=u.frames.loop.frame_0,J=u.frames.loop.frame_999,K=new punchgs.TimelineMax({}),$=new punchgs.TimelineMax({repeat:-1,yoyo:u.frames.loop.timeline.yoyo_move}),ee=new punchgs.TimelineMax({repeat:-1,yoyo:u.frames.loop.timeline.yoyo_rotate}),te=new punchgs.TimelineMax({repeat:-1,yoyo:u.frames.loop.timeline.yoyo_scale}),ie=new punchgs.TimelineMax({repeat:-1,yoyo:u.frames.loop.timeline.yoyo_filter}),ae=parseInt(u.frames.loop.timeline.speed,0)/1e3,re=parseInt(u.frames.loop.timeline.start)/1e3||0,oe=re+.2;if(K.add($,0),K.add(ee,0),K.add(te,0),K.add(ie,0),J.originX=G.originX,J.originY=G.originY,J.originZ=G.originZ,u.frames.loop.timeline.curved){var se=parseInt(u.frames.loop.timeline.radiusAngle,0)||0,ne=[{x:(G.x-G.xr)*i[c].bw,y:0,z:(G.z-G.zr)*i[c].bw},{x:0,y:(G.y+G.yr)*i[c].bw,z:0},{x:(J.x+J.xr)*i[c].bw,y:0,z:(J.z+J.zr)*i[c].bw},{x:0,y:(J.y-J.yr)*i[c].bw,z:0}],le={type:"thru",curviness:u.frames.loop.timeline.curviness,values:[],autoRotate:u.frames.loop.timeline.autoRotate};for(var de in ne)ne.hasOwnProperty(de)&&(le.values[de]=ne[se],se=++se==ne.length?0:se);u.timeline.fromTo(u.lp,.2,{"-webkit-filter":"blur("+(G.blur||0)+"px) grayscale("+(G.grayscale||0)+"%) brightness("+(G.brightness||100)+"%)",filter:"blur("+(G.blur||0)+"px) grayscale("+(G.grayscale||0)+"%) brightness("+(G.brightness||100)+"%)",x:0,y:0,z:0,minWidth:u._incolumn||u._ingroup?"100%":void 0===u.eow?0:u.eow,minHeight:u._incolumn||u._ingroup?"100%":void 0===u.eoh?0:u.eoh,scaleX:1,scaleY:1,skew:0,rotationX:0,rotationY:0,rotationZ:0,transformPerspective:600,transformOrigin:J.originX+" "+J.originY+" "+J.originZ,opacity:1},{x:le.values[3].x,y:le.values[3].y,z:le.values[3].z,scaleX:G.scaleX,skewX:G.skewX,skewY:G.skewY,scaleY:G.scaleY,rotationX:G.rotationX,rotationY:G.rotationY,rotationZ:G.rotationZ,"-webkit-filter":"blur("+parseInt(G.blur,0)+"px) grayscale("+parseInt(G.grayscale,0)+"%) brightness("+parseInt(G.brightness,0)+"%)",filter:"blur("+parseInt(G.blur,0)+"px) grayscale("+parseInt(G.grayscale,0)+"%) brightness("+parseInt(G.brightness,0)+"%)",ease:punchgs.Sine.easeInOut,opacity:G.opacity},re),$.to(u.lp,u.frames.loop.timeline.yoyo_move?ae/2:ae,{bezier:le,ease:u.frames.loop.timeline.ease})}else u.timeline.fromTo(u.lp,.2,{"-webkit-filter":"blur("+(G.blur||0)+"px) grayscale("+(G.grayscale||0)+"%) brightness("+(G.brightness||100)+"%)",filter:"blur("+(G.blur||0)+"px) grayscale("+(G.grayscale||0)+"%) brightness("+(G.brightness||100)+"%)",x:0,y:0,z:0,minWidth:u._incolumn||u._ingroup?"100%":void 0===u.eow?0:u.eow,minHeight:u._incolumn||u._ingroup?"100%":void 0===u.eoh?0:u.eoh,scaleX:1,scaleY:1,skew:0,rotationX:0,rotationY:0,rotationZ:0,transformPerspective:600,transformOrigin:J.originX+" "+J.originY+" "+J.originZ,opacity:1},{x:G.x*i[c].bw,y:G.y*i[c].bw,z:G.z*i[c].bw,scaleX:G.scaleX,skewX:G.skewX,skewY:G.skewY,scaleY:G.scaleY,rotationX:G.rotationX,rotationY:G.rotationY,rotationZ:G.rotationZ,ease:punchgs.Sine.easeOut,opacity:G.opacity,"-webkit-filter":"blur("+parseInt(G.blur||0,0)+"px) grayscale("+parseInt(G.grayscale||0,0)+"%) brightness("+parseInt(G.brightness||100,0)+"%)",filter:"blur("+parseInt(G.blur||0,0)+"px) grayscale("+parseInt(G.grayscale||0,0)+"%) brightness("+parseInt(G.brightness||100,0)+"%)"},re),$.to(u.lp,u.frames.loop.timeline.yoyo_move?ae/2:ae,{x:J.x*i[c].bw,y:J.y*i[c].bw,z:J.z*i[c].bw,ease:u.frames.loop.timeline.ease});ee.to(u.lp,u.frames.loop.timeline.yoyo_rotate?ae/2:ae,{rotationX:J.rotationX,rotationY:J.rotationY,rotationZ:J.rotationZ,ease:u.frames.loop.timeline.ease}),te.to(u.lp,u.frames.loop.timeline.yoyo_scale?ae/2:ae,{scaleX:J.scaleX,scaleY:J.scaleY,skewX:J.skewX,skewY:J.skewY,ease:u.frames.loop.timeline.ease});var ce={opacity:J.opacity||1,ease:u.frames.loop.timeline.ease,"-webkit-filter":"blur("+(J.blur||0)+"px) grayscale("+(J.grayscale||0)+"%) brightness("+(J.brightness||100)+"%)",filter:"blur("+(J.blur||0)+"px) grayscale("+(J.grayscale||0)+"%) brightness("+(J.brightness||100)+"%)"};ie.to(u.lp,u.frames.loop.timeline.yoyo_filter?ae/2:ae,ce),u.timeline.add(K,oe)}if(void 0!==u.frames.frame_hover&&("start"===e.mode||void 0===u.hoverframeadded)){u.hoverframeadded=!0;var pe=u.frames.frame_hover.timeline.speed/1e3;pe=0===pe?1e-5:pe,u.hoverlistener||(u.hoverlistener=!0,jQuery(document).on("mouseenter mousemove",("column"===u.type?"#"+u.cbg[0].id+",":"")+"#"+u.c[0].id,function(e){if(("mousemove"!==e.type||!0!==u.ignoremousemove)&&u.readyForHover){if(u.ignoremousemove=!0,u.elementHovered=!0,u.hovertimeline||(u.hovertimeline=new punchgs.TimelineMax),u.hovertimeline.to([u.m,u.cbgmask],pe,{overflow:u.frames.frame_hover.mask?"hidden":"visible"},0),"column"===u.type&&u.hovertimeline.to(u.cbg,pe,jQuery.extend(!0,{},l(u.frames.frame_hover,u.cbg)),0),u.hovertimeline.pause(),"text"!==u.type&&"button"!==u.type||void 0===u.splitText||!1===u.splitText||u.hovertimeline.to([u.splitText.lines,u.splitText.words,u.splitText.chars],pe,{color:u.frames.frame_hover.color,ease:u.frames.frame_hover.transform.ease},0),"column"===u.type?u.hovertimeline.to(u.c,pe,a(jQuery.extend(!0,{},l(u.frames.frame_hover,u.c))),0):u.hovertimeline.to(u.c,pe,jQuery.extend(!0,{},l(u.frames.frame_hover,u.c)),0),"svg"===u.type){u.svgHTemp=jQuery.extend(!0,{},u.svgH);var t=Array.isArray(u.svgHTemp.fill)?u.svgHTemp.fill[i[c].level]:u.svgHTemp.fill;u.svgHTemp.fill=t,u.hovertimeline.to(u.svg,pe,u.svgHTemp,0),u.hovertimeline.to(u.svgPath,pe,{fill:t},0)}u.hovertimeline.play()}}),jQuery(document).on("mouseleave",("column"===u.type?"#"+u.cbg[0].id+",":"")+"#"+u.c[0].id,function(){u.elementHovered=!1,u.readyForHover&&void 0!==u.hovertimeline&&(u.hovertimeline.reverse(),u.hovertimeline.eventCallback("onReverseComplete",r,[{id:c,L:d}]))}))}if(z||(u.lastRequestedMainFrame="start"===e.mode?"frame_1":"continue"===e.mode?e.frame:u.lastRequestedMainFrame),void 0!==e.totime?u.tSTART=e.totime:void 0!==f&&void 0===e.frame?u.tSTART=f:void 0!==e.frame?u.tSTART=e.frame:u.tSTART=0,0===u.tSTART&&void 0===u.startedAnimOnce&&void 0===u.leftstage&&void 0===u.startedAnimOnce&&!0===u.hideonfirststart&&"preset"===e.mode&&(i[c]._L[d[0].id].p[0].classList.add("rs-forcehidden"),u.hideonfirststart=!1),"frame_999"!==u.tSTART&&"frame_999"!==u.triggeredFrame||!u.leftstage&&void 0!==u.startedAnimOnce){if("true"!=u.animationonscroll&&1!=u.animationonscroll?u.timeline.play(u.tSTART):u.timeline.time(u.tSTART),jQuery.inArray(u.type,["group","row","column"])>=0&&!0===e.updateChildren){if(void 0===u.childrenJS)for(var Y in u.childrenJS={},i[c]._L)void 0!==i[c]._L[Y]._lig&&void 0!==i[c]._L[Y]._lig[0]&&i[c]._L[Y]._lig[0].id===d[0].id&&i[c]._L[Y]._lig[0].id!==i[c]._L[Y].c[0].id&&(u.childrenJS[i[c]._L[Y].c[0].id]=i[c]._L[Y].c);var ue=void 0===e.totime?void 0!==u.frames[e.frame].timeline.startAbsolute?parseInt(u.frames[e.frame].timeline.startAbsolute,0)/1e3:void 0!==u.frames[e.frame].timeline.start?jQuery.isNumeric(u.frames[e.frame].timeline.start)?parseInt(u.frames[e.frame].timeline.start,0)/1e3:e.totime:.001:e.totime;for(var Y in u.childrenJS)u.childrenJS.hasOwnProperty(Y)&&i.renderLayerAnimation({layer:u.childrenJS[Y],fastforward:!1,id:c,mode:"continue",updateChildren:!0,totime:ue})}}else;}}});var a=function(e){var t=jQuery.extend(!0,{},e);return delete t.backgroundColor,delete t.background,delete t.backgroundImage,delete t.borderSize,delete t.borderStyle,t},r=function(e){i[e.id]._L[e.L[0].id].textDecoration&&punchgs.TweenMax.set(i[e.id]._L[e.L[0].id].c,{textDecoration:i[e.id]._L[e.L[0].id].textDecoration})},o=function(e){i[e.id].BUG_safari_clipPath&&e.L[0].classList.remove("rs-pelock"),(i[e.id]._L[e.L[0].id]._ingroup||i[e.id]._L[e.L[0].id]._incolumn||i[e.id]._L[e.L[0].id]._inrow)&&void 0!==i[e.id]._L[i[e.id]._L[e.L[0].id]._ligid]&&void 0!==i[e.id]._L[i[e.id]._L[e.L[0].id]._ligid].timeline&&(i[e.id]._L[i[e.id]._L[e.L[0].id]._ligid].timeline.isActive()||void 0===i[e.id]._L[e.L[0].id]||void 0===i[e.id]._L[e.L[0].id].frames[i[e.id]._L[e.L[0].id].timeline.currentLabel()]||(null==i[e.id]._L[i[e.id]._L[e.L[0].id]._ligid].timezone||i[e.id]._L[i[e.id]._L[e.L[0].id]._ligid].timezone.to<=parseInt(i[e.id]._L[e.L[0].id].frames[i[e.id]._L[e.L[0].id].timeline.currentLabel()].timeline.start,0))&&!0!==i[e.id]._L[e.L[0].id].animOnScrollForceDisable&&i[e.id]._L[e.L[0].id].timeline.pause());var t=i[e.id]._L[e.L[0].id],a=t.hovertimeline;a&&a.time()>0&&(a.pause(),a.time(0),a.kill(),delete t.hovertimeline),i[e.id]._L[e.L[0].id].p[0].classList.remove("rs-forcehidden");var r={};i[e.id]._L[e.L[0].id].ignoremousemove=!1,i[e.id]._L[e.L[0].id].leftstage=!1,i[e.id]._L[e.L[0].id].readyForHover=!1,r.layer=e.L,void 0!==i[e.id]._L[e.L[0].id].layerLoop&&i[e.id]._L[e.L[0].id].layerLoop.from===e.frame&&i[e.id]._L[e.L[0].id].layerLoop.count++,"frame_999"!==e.frame&&(i[e.id]._L[e.L[0].id].startedAnimOnce=!0,punchgs.TweenMax.set([i[e.id]._L[e.L[0].id].c,i[e.id]._L[e.L[0].id].l,i[e.id]._L[e.L[0].id].m],{visibility:"visible"}),punchgs.TweenMax.set(i[e.id]._L[e.L[0].id].p,{pointerEvents:i[e.id]._L[e.L[0].id].noPevents?"none":"auto",visibility:"visible"})),r.eventtype="frame_0"===e.frame||"frame_1"===e.frame?"enterstage":"frame_999"===e.frame?"leavestage":"framestarted",r.layertype=i[e.id]._L[e.L[0].id].type,r.frame_index=e.frame,r.layersettings=i[e.id]._L[e.L[0].id],i[e.id].c.trigger("revolution.layeraction",[r]),"enterstage"===r.eventtype&&i.toggleState(i[e.id]._L[e.L[0].id].layertoggledby),"frame_1"===e.frame&&i.animcompleted(e.L,e.id)},s=function(e){"frame_999"===e.frame&&(i[e.id]._L[e.L[0].id].leftstage&&i[e.id]._L[e.L[0].id].p[0].classList.remove("rs-forcehidden"),i[e.id]._L[e.L[0].id].leftstage=!1,punchgs.TweenMax.set(i[e.id]._L[e.L[0].id].c,{visibility:"visible"}),punchgs.TweenMax.set(i[e.id]._L[e.L[0].id].p,{pointerEvents:i[e.id]._L[e.L[0].id].noPevents?"none":"auto",visibility:"visible"}))},n=function(e){var t=!0;if("column"===i[e.id]._L[e.L[0].id].type||"row"===i[e.id]._L[e.L[0].id].type||"group"===i[e.id]._L[e.L[0].id].type){var a=i[e.id]._L[e.L[0].id].timeline.currentLabel(),r=jQuery.inArray(a,i[e.id]._L[e.L[0].id].ford);r++,r=i[e.id]._L[e.L[0].id].ford.length>r?i[e.id]._L[e.L[0].id].ford[r]:a,void 0!==i[e.id]._L[e.L[0].id].frames[r]&&void 0!==i[e.id]._L[e.L[0].id].frames[a]&&(i[e.id]._L[e.L[0].id].timezone={from:parseInt(i[e.id]._L[e.L[0].id].frames[a].timeline.startAbsolute,0),to:parseInt(i[e.id]._L[e.L[0].id].frames[r].timeline.startAbsolute,0)})}"frame_999"===e.frame&&(punchgs.TweenMax.set(i[e.id]._L[e.L[0].id].c,{visibility:"hidden"}),punchgs.TweenMax.set(i[e.id]._L[e.L[0].id].p,{pointerEvents:"none",visibility:"hidden"}),t=!1);var o={};o.layer=e.L,o.eventtype="frame_0"===e.frame||"frame_1"===e.frame?"enteredstage":"frame_999"===e.frame?"leftstage":"frameended",i[e.id]._L[e.L[0].id].readyForHover=!0,o.layertype=i[e.id]._L[e.L[0].id].type,o.frame_index=e.frame,o.layersettings=i[e.id]._L[e.L[0].id],i[e.id].c.trigger("revolution.layeraction",[o]),"frame_999"===e.frame&&"leftstage"===o.eventtype&&(i[e.id]._L[e.L[0].id].leftstage=!0,i[e.id]._L[e.L[0].id].p[0].classList.add("rs-forcehidden")),"leftstage"===o.eventtype&&void 0!==i[e.id].videos&&void 0!==i[e.id].videos[e.L[0].id]&&i.stopVideo&&i.stopVideo(e.L,e.id),"column"===i[e.id]._L[e.L[0].id].type&&punchgs.TweenMax.to(i[e.id]._L[e.L[0].id].cbg,.01,{visibility:"visible"}),"leftstage"===o.eventtype&&(i.unToggleState(e.layertoggledby),"video"===i[e.id]._L[e.L[0].id].type&&i.resetVideo&&setTimeout(function(){i.resetVideo(e.L,e.id)},100)),i[e.id].BUG_safari_clipPath&&!t&&e.L[0].classList.add("rs-pelock"),void 0!==i[e.id]._L[e.L[0].id].layerLoop&&i[e.id]._L[e.L[0].id].layerLoop.to===e.frame&&(-1==i[e.id]._L[e.L[0].id].layerLoop.repeat||i[e.id]._L[e.L[0].id].layerLoop.repeat>i[e.id]._L[e.L[0].id].layerLoop.count)&&i.renderLayerAnimation({layer:i[e.id]._L[e.L[0].id].c,frame:i[e.id]._L[e.L[0].id].layerLoop.from,updateChildren:i[e.id]._L[e.L[0].id].layerLoop.children,mode:"continue",fastforward:!0===i[e.id]._L[e.L[0].id].layerLoop.keep,id:e.id})},l=function(e,t){var i=jQuery.extend(!0,{},e.transform);return(i.originX||i.originY||i.originZ)&&(i.transformOrigin=(void 0===i.originX?"50%":i.originX)+" "+(void 0===i.originY?"50%":i.originY)+" "+(void 0===i.originZ?"50%":i.originZ),delete i.originX,delete i.originY,delete i.originZ),void 0!==e&&void 0!==e.filter&&(i["-webkit-filter"]="blur("+(e.filter.blur||0)+"px) grayscale("+(e.filter.grayscale||0)+"%) brightness("+(e.filter.brightness||100)+"%)",i.filter="blur("+(e.filter.blur||0)+"px) grayscale("+(e.filter.grayscale||0)+"%) brightness("+(e.filter.brightness||100)+"%)"),i.color=void 0===i.color?"rgba(255,255,255,1)":i.color,i.force3D="auto",i.backgroundImage&&"string"==typeof i.backgroundImage&&-1!==i.backgroundImage.search("gradient")&&180!==c(t.css("backgroundImage"))&&180===c(i.backgroundImage)&&(i.backgroundImage=d(i.backgroundImage,180)),i},d=function(e,t){var i=(e=e.split("("))[0];return e.shift(),i+"("+t+"deg, "+e.join("(")},c=function(e){if(-1!==e.search("deg,")){var t=e.split("deg,")[0];if(-1!==t.search(/\(/))return parseInt(t.split("(")[1],10)}return 180},p=function(e,t){e=void 0===e?"":e.split(";");var a={fill:i.revToResp("#ffffff",i[t].rle),stroke:"transparent","stroke-width":"0px","stroke-dasharray":"0","stroke-dashoffset":"0"};for(var r in e)if(e.hasOwnProperty(r)){var o=e[r].split(":");switch(o[0]){case"c":a.fill=i.revToResp(o[1],i[t].rle,void 0,"||");break;case"sw":a["stroke-width"]=o[1];break;case"sc":a.stroke=o[1];break;case"so":a["stroke-dashoffset"]=o[1];break;case"sa":a["stroke-dasharray"]=o[1]}}return a},u=function(e){return"c"===e?"center":"l"===e?"left":"r"===e?"right":e},h=function(e){var t=i[e.id]._L[e.layer[0].id],a=!1;if(t.splitText&&!1!==t.splitText&&t.splitText.revert(),"text"===t.type||"button"===t.type){for(var r in t.frames)if(void 0!==t.frames[r].chars||void 0!==t.frames[r].words||void 0!==t.frames[r].lines){a=!0;break}t.splitText=!!a&&new punchgs.SplitText(t.c,{type:"lines,words,chars",wordsClass:"rs_splitted_words",linesClass:"rs_splitted_lines",charsClass:"rs_splitted_chars"})}else t.splitText=!1},g=function(e,t,i){if(void 0!==e&&e.indexOf("block")>=0){var a={};switch(0===t.find(".tp-blockmask_in").length&&(t.append('<div class="tp-blockmask_in"></div>'),t.append('<div class="tp-blockmask_out"></div>')),i=void 0===i?punchgs.Power3.easeInOut:i,a.ft=[{scaleY:1,scaleX:0,transformOrigin:"0% 50%"},{scaleY:1,scaleX:1,ease:i,immediateRender:!1}],a.t={scaleY:1,scaleX:0,transformOrigin:"100% 50%",ease:i,immediateRender:!1},a.bmask_in=t.find(".tp-blockmask_in"),a.bmask_out=t.find(".tp-blockmask_out"),a.type="block",e){case"blocktoleft":case"blockfromright":a.ft[0].transformOrigin="100% 50%",a.t.transformOrigin="0% 50%";break;case"blockfromtop":case"blocktobottom":a.ft=[{scaleX:1,scaleY:0,transformOrigin:"50% 0%"},{scaleX:1,scaleY:1,ease:i,immediateRender:!1}],a.t={scaleX:1,scaleY:0,transformOrigin:"50% 100%",ease:i,immediateRender:!1};break;case"blocktotop":case"blockfrombottom":a.ft=[{scaleX:1,scaleY:0,transformOrigin:"50% 100%"},{scaleX:1,scaleY:1,ease:i,immediateRender:!1}],a.t={scaleX:1,scaleY:0,transformOrigin:"50% 0%",ease:i,immediateRender:!1}}return a.ft[1].overwrite="auto",a.t.overwrite="auto",a}return!1},f=function(e,t,a,r,o){return 0===i[o].sdir||void 0===t?e:("mask"===a?r="x"===r?"mX":"y"===r?"mY":r:"chars"===a?r="x"===r?"cX":"y"===r?"cY":"dir"===r?"cD":r:"words"===a?r="x"===r?"wX":"y"===r?"wY":"dir"===r?"wD":r:"lines"===a&&(r="x"===r?"lX":"y"===r?"lY":"dir"===r?"lD":r),void 0===t[r]||!1===t[r]?e:void 0!==t&&!0===t[r]?"t"===e||"top"===e?"b":"b"===e||"bottom"===e?"t":"l"===e||"left"===e?"r":"r"===e||"right"===e?"l":-1*e:void 0)},m=function(e){var t=i[e.id]._L[e.layer[0].id],a=void 0===e.source?jQuery.extend(!0,{},e.frame.transform):jQuery.extend(!0,{},e.frame[e.source]),r={originX:"50%",originY:"50%",originZ:"0"},o=i[e.id].conw,s=i[e.id].conh;for(var n in a)if(a.hasOwnProperty(n))if(a[n]="object"==typeof a[n]?a[n][i[e.id].level]:a[n],"inherit"===a[n]||"delay"===n||"direction"===n||"use"===n)delete a[n];else if("originX"===n||"originY"===n||"originZ"===n)r[n]=a[n],delete a[n];else if(jQuery.isNumeric(a[n],0))a[n]=f(a[n],e.frame.reverse,e.target,n,e.id,e.id);else if("r"===a[n][0]&&"a"===a[n][1]&&"random"!==a[n]){a[n]=a[n].replace("ran(","").replace(")","");var l=a[n].indexOf("%")>=0?"%":"",d=a[n].split("|");if(d[0]=parseFloat(d[0]),d[1]=parseFloat(d[1]),void 0!==e.splitAmount&&e.splitAmount>1){a[n]="["+(Math.random()*(d[1]-d[0])+d[0])+l;for(var c=0;c<e.splitAmount;c++)a[n]=a[n]+"|"+(Math.random()*(d[1]-d[0])+d[0])+l;a[n]=a[n]+"]"}else a[n]=Math.random()*(d[1]-d[0])+d[0]+l}else{a[n]=a[n].replace("[","").replace("]",""),a[n]=a[n].replace("cyc(","").replace(")","");var p=parseInt(a[n],0);if(a[n].indexOf("%")>=0&&jQuery.isNumeric(p))"x"==n?a[n]=f(t.eow*p/100,e.frame.reverse,e.target,n,e.id):"y"==n&&(a[n]=f(t.eoh*p/100,e.frame.reverse,e.target,n,e.id));else switch(a[n]=f(a[n],e.frame.reverse,e.target,n,e.id,e.id),a[n]){case"t":case"top":a[n]=0-t.eoh-("column"===t.type?0:t.calcy);break;case"b":case"bottom":a[n]=s-("column"===t.type?0:t.calcy);break;case"l":case"left":a[n]=0-t.eow-("column"===t.type?0:t.calcx);break;case"r":case"right":a[n]=o-("column"===t.type?0:t.calcx);break;case"m":case"c":case"middle":case"center":"x"===n&&(a[n]=f(o/2-("column"===t.type?0:t.calcx)-t.eow/2,e.frame.reverse,e.target,n,e.id)),"y"===n&&(a[n]=f(s/2-("column"===t.type?0:t.calcy)-t.eoh/2,e.frame.reverse,e.target,n,e.id))}}if(a.transformOrigin=r.originX+" "+r.originY+" "+r.originZ,!i[e.id].BUG_ie_clipPath&&void 0!==a.clip&&void 0!==t.clipPath&&t.clipPath.use){var u="rectangle"==t.clipPath.type,h=parseInt(a.clip,0),g=100-parseInt(a.clipB,0),m=Math.round(h/2);switch(t.clipPath.origin){case"invh":a.clipPath="polygon(0% 0%, 0% 100%, "+h+"% 100%, "+h+"% 0%, 100% 0%, 100% 100%, "+g+"% 100%, "+g+"% 0%, 0% 0%)";break;case"invv":a.clipPath="polygon(100% 0%, 0% 0%, 0% "+h+"%, 100% "+h+"%, 100% 100%, 0% 100%, 0% "+g+"%, 100% "+g+"%, 100% 0%)";break;case"cv":a.clipPath=u?"polygon("+(50-m)+"% 0%, "+(50+m)+"% 0%, "+(50+m)+"% 100%, "+(50-m)+"% 100%)":"circle("+h+"% at 50% 50%)";break;case"ch":a.clipPath=u?"polygon(0% "+(50-m)+"%, 0% "+(50+m)+"%, 100% "+(50+m)+"%, 100% "+(50-m)+"%)":"circle("+h+"% at 50% 50%)";break;case"l":a.clipPath=u?"polygon(0% 0%, "+h+"% 0%, "+h+"% 100%, 0% 100%)":"circle("+h+"% at 0% 50%)";break;case"r":a.clipPath=u?"polygon("+(100-h)+"% 0%, 100% 0%, 100% 100%, "+(100-h)+"% 100%)":"circle("+h+"% at 100% 50%)";break;case"t":a.clipPath=u?"polygon(0% 0%, 100% 0%, 100% "+h+"%, 0% "+h+"%)":"circle("+h+"% at 50% 0%)";break;case"b":a.clipPath=u?"polygon(0% 100%, 100% 100%, 100% "+(100-h)+"%, 0% "+(100-h)+"%)":"circle("+h+"% at 50% 100%)";break;case"lt":a.clipPath=u?"polygon(0% 0%,"+2*h+"% 0%, 0% "+2*h+"%)":"circle("+h+"% at 0% 0%)";break;case"lb":a.clipPath=u?"polygon(0% "+(100-2*h)+"%, 0% 100%,"+2*h+"% 100%)":"circle("+h+"% at 0% 100%)";break;case"rt":a.clipPath=u?"polygon("+(100-2*h)+"% 0%, 100% 0%, 100% "+2*h+"%)":"circle("+h+"% at 100% 0%)";break;case"rb":a.clipPath=u?"polygon("+(100-2*h)+"% 100%, 100% 100%, 100% "+(100-2*h)+"%)":"circle("+h+"% at 100% 100%)";break;case"clr":a.clipPath=u?"polygon(0% 0%, 0% "+h+"%, "+(100-h)+"% 100%, 100% 100%, 100% "+(100-h)+"%, "+h+"% 0%)":"circle("+h+"% at 50% 50%)";break;case"crl":a.clipPath=u?"polygon(0% "+(100-h)+"%, 0% 100%, "+h+"% 100%, 100% "+h+"%, 100% 0%, "+(100-h)+"% 0%)":"circle("+h+"% at 50% 50%)"}a["-webkit-clip-path"]=a.clipPath,delete a.clip}else delete a.clip;return"mask"!==e.target&&(void 0===e.frame||void 0===e.frame.filter&&!e.forcefilter||(a["-webkit-filter"]="blur("+(null==e.frame.filter?0:e.frame.filter.blur||0)+"px) grayscale("+(null==e.frame.filter?0:e.frame.filter.grayscale||0)+"%) brightness("+(null==e.frame.filter?100:e.frame.filter.brightness||100)+"%)",a.filter="blur("+(null==e.frame.filter?0:e.frame.filter.blur||0)+"px) grayscale("+(null==e.frame.filter?0:e.frame.filter.grayscale||0)+"%) brightness("+(null==e.frame.filter?100:e.frame.filter.brightness||100)+"%)"),jQuery.inArray(e.source,["chars","words","lines"])>=0&&(void 0!==e.frame[e.source].blur||e.forcefilter)&&(a["-webkit-filter"]="blur("+(parseInt(e.frame[e.source].blur,0)||0)+"px) grayscale("+(parseInt(e.frame[e.source].grayscale,0)||0)+"%) brightness("+(parseInt(e.frame[e.source].brightness,0)||100)+"%)",a.filter="blur("+(parseInt(e.frame[e.source].blur,0)||0)+"px) grayscale("+(parseInt(e.frame[e.source].grayscale,0)||0)+"%) brightness("+(parseInt(e.frame[e.source].brightness,0)||100)+"%)")),a.ease=void 0!==a.ease?a.ease:void 0===a.ease&&void 0!==e.ease||void 0!==a.ease&&void 0!==e.ease&&"inherit"===a.ease?e.ease:e.frame.timeline.ease,a.ease=void 0===a.ease||"default"===a.ease?punchgs.Power3.easeInOut:a.ease,a},v=function(e){var t;for(var i in e)"string"==typeof e[i]&&e[i].indexOf("|")>=0&&((t=void 0===t?{}:t)[i]=e[i].replace("[","").replace("]","").split("|"),delete e[i]);return void 0!==t&&(e.cycle=t),e},y=function(e,t){var i,a,r,o=e.length-1,s=[];switch(t){case"forward":case"f":case"random":case"r":for(i=0;i<=o;i++)s.push(i);"random"!==t&&"r"!==t||(s=function(e){for(var t,i,a=e.length;0!==a;)i=Math.floor(Math.random()*a),t=e[a-=1],e[a]=e[i],e[i]=t;return e}(s));break;case"b":case"backward":for(i=0;i<=o;i++)s.push(o-i);break;case"m":case"middletoedge":var n=Math.ceil(o/2);for(r=n-1,a=n+1,s.push(n),i=0;i<n;i++)r>=0&&s.push(r),a<=o&&s.push(a),r--,a++;break;case"e":case"edgetomiddle":for(r=o,a=0,i=0;i<=Math.floor(o/2);i++)s.push(r),a<r&&s.push(a),r--,a++;break;default:for(i=0;i<=o;i++)s.push(i)}var l=[];for(var d in s)s.hasOwnProperty(d)&&l.push(e[s[d]]);return l},b=function(e,t,a,r,o){var s,n,l={},d={},c={};for(var p in r=void 0===r?"transform":r,"loop"===o?(c.autoRotate=!1,c.yoyo_filter=!1,c.yoyo_rotate=!1,c.yoyo_move=!1,c.yoyo_scale=!1,c.curved=!1,c.curviness=2,c.ease="Linear.easeNone",c.speed=1e3,c.st=0,l.x=0,l.y=0,l.z=0,l.xr=0,l.yr=0,l.zr=0,l.scaleX=1,l.scaleY=1,l.originX="50%",l.originY="50%",l.originZ="0",l.rotationX="0deg",l.rotationY="0deg",l.rotationZ="0deg"):(c.speed=300,a?c.ease="default":l.ease="default"),"sfx"===o&&(l.fxc="#ffffff"),e=e.split(";"))if(e.hasOwnProperty(p)){var u=e[p].split(":");switch(u[0]){case"u":l.use="true"===u[1]||"t"===u[1]||fasle;break;case"c":s=u[1];break;case"fxc":l.fxc=u[1];break;case"bgc":n=u[1];break;case"auto":l.auto="t"===u[1]||void 0===u[1]||"true"===u[1];break;case"o":l.opacity=u[1];break;case"oX":l.originX=u[1];break;case"oY":l.originY=u[1];break;case"oZ":l.originZ=u[1];break;case"sX":l.scaleX=u[1];break;case"sY":l.scaleY=u[1];break;case"skX":l.skewX=u[1];break;case"skY":l.skewY=u[1];break;case"rX":l.rotationX=u[1];break;case"rY":l.rotationY=u[1];break;case"rZ":l.rotationZ=u[1];break;case"sc":l.color=u[1];break;case"se":l.effect=u[1];break;case"bos":l.borderStyle=u[1];break;case"boc":l.borderColor=u[1];break;case"td":l.textDecoration=u[1];break;case"zI":l.zIndex=u[1];break;case"tp":l.transformPerspective=u[1];break;case"cp":l.clip=parseInt(u[1],0);break;case"cpb":l.clipB=parseInt(u[1],0);break;case"fpr":l.fpr="t"===u[1]||"true"===u[1]||!0===u[1];break;case"aR":c.autoRotate="t"==u[1];break;case"rA":c.radiusAngle=u[1];break;case"yyf":c.yoyo_filter="t"==u[1];break;case"yym":c.yoyo_move="t"==u[1];break;case"yyr":c.yoyo_rotate="t"==u[1];break;case"yys":c.yoyo_scale="t"==u[1];break;case"crd":c.curved="t"==u[1];break;case"x":l.x="reverse"===o?"t"===u[1]||!0===u[1]||"true"==u[1]:"loop"===o?parseInt(u[1],0):i.revToResp(u[1],i[t].rle);break;case"y":l.y="reverse"===o?"t"===u[1]||!0===u[1]||"true"==u[1]:"loop"===o?parseInt(u[1],0):i.revToResp(u[1],i[t].rle);break;case"z":l.z="loop"===o?parseInt(u[1],0):i.revToResp(u[1],i[t].rle);break;case"bow":l.borderWidth=i.revToResp(u[1],4,0).toString().replace(/,/g," ");break;case"bor":l.borderRadius=i.revToResp(u[1],4,0).toString().replace(/,/g," ");break;case"m":l.mask="t"===u[1]||"f"!==u[1]&&u[1];break;case"xR":l.xr=parseInt(u[1],0);break;case"yR":l.yr=parseInt(u[1],0);break;case"zR":l.zr=parseInt(u[1],0);break;case"blu":"loop"===o?l.blur=parseInt(u[1],0):d.blur=parseInt(u[1],0);break;case"gra":"loop"===o?l.grayscale=parseInt(u[1],0):d.grayscale=parseInt(u[1],0);break;case"bri":"loop"===o?l.brightness=parseInt(u[1],0):d.brightness=parseInt(u[1],0);break;case"sp":c.speed=parseInt(u[1],0);break;case"d":l.delay=parseInt(u[1],0);break;case"crns":c.curviness=parseInt(u[1],0);break;case"st":c.start="w"===u[1]||"a"===u[1]?"+=0":u[1],c.waitoncall="w"===u[1]||"a"===u[1];break;case"sA":c.startAbsolute=u[1];break;case"sR":c.startRelative=u[1];break;case"e":a?c.ease=u[1]:l.ease=u[1];break;default:u[0].length>0&&(l[u[0]]="t"===u[1]||"f"!==u[1]&&u[1])}}var h={timeline:c};return jQuery.isEmptyObject(d)||("split"===o?l=jQuery.extend(!0,l,d):h.filter=d),"split"===o&&void 0===l.dir&&(l.dir="forward"),jQuery.isEmptyObject(s)||(h.color=s),jQuery.isEmptyObject(n)||(h.bgcolor=n),h[r]=l,h},w=function(e,t){var a={},r=0;if(void 0===window.rdF0){var o=b("x:0;y:0;z:0;rX:0;rY:0;rZ:0;o:0;skX:0;skY:0;sX:0;sY:0;oX:50%;oY:50%;oZ:0;dir:forward;d:5",t).transform;window.rdF0=window.rdF1={transform:b("x:0;y:0;z:0;rX:0;rY:0;rZ:0;o:0;skX:0;skY:0;sX:0;sY:0;oX:50%;oY:50%;oZ:0;tp:600px",t,!0).transform,mask:b("x:0;y:0",t,!0).transform,chars:jQuery.extend(!0,{blur:0,grayscale:0,brightness:100},o),words:jQuery.extend(!0,{blur:0,grayscale:0,brightness:100},o),lines:jQuery.extend(!0,{blur:0,grayscale:0,brightness:100},o)},window.rdF1.transform.opacity=window.rdF1.chars.opacity=window.rdF1.words.opacity=window.rdF1.lines.opacity=window.rdF1.transform.scaleX=window.rdF1.chars.scaleX=window.rdF1.words.scaleX=window.rdF1.lines.scaleX=window.rdF1.transform.scaleY=window.rdF1.chars.scaleY=window.rdF1.words.scaleY=window.rdF1.lines.scaleY=1}for(var r in void 0===e.frame_0&&(e.frame_0="x:0"),void 0===e.frame_1&&(e.frame_1="x:0"),e.ford)if(e.ford.hasOwnProperty(r)){var s=e.ford[r];if(e[s]){if(a[s]=b(e[s],t,!0),void 0!==a[s].bgcolor&&(e.bgcolinuse=!0),i[t].BUG_ie_clipPath&&void 0!==e.clipPath&&e.clipPath.use&&void 0!==a[s].transform.clip){var n="rectangle"===e.clipPath.type?100-parseInt(a[s].transform.clip):100-Math.min(100,2*parseInt(a[s].transform.clip));switch(e.clipPath.origin){case"clr":case"rb":case"rt":case"r":e[s+"_mask"]="u:t;x:"+n+"%;y:0px;",a[s].transform.x=i.revToResp("-"+n+"%",i[t].rle);break;case"crl":case"lb":case"lt":case"cv":case"l":e[s+"_mask"]="u:t;x:-"+n+"%;y:0px;",a[s].transform.x=i.revToResp(n+"%",i[t].rle);break;case"ch":case"t":e[s+"_mask"]="u:t;y:-"+n+"%;y:0px;",a[s].transform.y=i.revToResp(n+"%",i[t].rle);break;case"b":e[s+"_mask"]="u:t;y:"+n+"%;y:0px;",a[s].transform.y=i.revToResp("-"+n+"%",i[t].rle)}delete a[s].transform.clip,delete a[s].transform.clipB,e.maskinuse=!0}e[s+"_mask"]&&(a[s].mask=b(e[s+"_mask"],t).transform),null!=a[s].mask&&a[s].mask.use?(a[s].mask.x=void 0===a[s].mask.x?0:a[s].mask.x,a[s].mask.y=void 0===a[s].mask.y?0:a[s].mask.y,delete a[s].mask.use,a[s].mask.overflow="hidden"):a[s].mask={ease:"default",overflow:"visible"},e[s+"_chars"]&&(a[s].chars=b(e[s+"_chars"],t,void 0,void 0,"split").transform),e[s+"_words"]&&(a[s].words=b(e[s+"_words"],t,void 0,void 0,"split").transform),e[s+"_lines"]&&(a[s].lines=b(e[s+"_lines"],t,void 0,void 0,"split").transform),(e[s+"_chars"]||e[s+"_words"]||e[s+"_lines"])&&(a[s].split=!0),a.frame_0=void 0===a.frame_0?{transform:{}}:a.frame_0,a[s].transform.auto&&(a[s].transform=jQuery.extend(!0,{},a.frame_0.transform),a[s].transform.opacity=void 0===a[s].transform.opacity?0:a[s].transform.opacity,void 0!==a.frame_0.filter&&(a[s].filter=jQuery.extend(!0,{},a.frame_0.filter)),void 0!==a.frame_0.mask&&(a[s].mask=jQuery.extend(!0,{},a.frame_0.mask)),void 0!==a.frame_0.chars&&(a[s].chars=jQuery.extend(!0,{},a.frame_0.chars)),void 0!==a.frame_0.words&&(a[s].words=jQuery.extend(!0,{},a.frame_0.words)),void 0!==a.frame_0.lines&&(a[s].lines=jQuery.extend(!0,{},a.frame_0.lines))),e[s+"_sfx"]&&(a[s].sfx=b(e[s+"_sfx"],t,!1,void 0,"sfx").transform),e[s+"_reverse"]&&(a[s].reverse=b(e[s+"_reverse"],t,!1,void 0,"reverse").transform)}}if(a.frame_0.split&&(a.frame_1.split=!0),void 0!==a.frame_0.transform.fpr&&(e.forceRender=a.frame_0.transform.fpr,delete a.frame_0.transform.fpr),void 0===e.frame_hover&&void 0===e.svgh||(a.frame_hover=b(void 0===e.frame_hover?"":e.frame_hover,t),a.frame_hover.transform.color=a.frame_hover.color,void 0===a.frame_hover.transform.color&&delete a.frame_hover.transform.color,void 0!==a.frame_hover.bgcolor&&a.frame_hover.bgcolor.indexOf("gradient")>=0?a.frame_hover.transform.backgroundImage=a.frame_hover.bgcolor:void 0!==a.frame_hover.bgcolor&&(a.frame_hover.transform.backgroundColor=a.frame_hover.bgcolor),void 0!==a.frame_hover.bgcolor&&(e.bgcolinuse=!0),a.frame_hover.transform.opacity=void 0===a.frame_hover.transform.opacity?1:a.frame_hover.transform.opacity,a.frame_hover.mask=void 0!==a.frame_hover.transform.mask&&a.frame_hover.transform.mask,delete a.frame_hover.transform.mask,void 0!==a.frame_hover.transform&&((a.frame_hover.transform.borderWidth||a.frame_hover.transform.borderStyle)&&(a.frame_hover.transform.borderColor=void 0===a.frame_hover.transform.borderColor?"transparent":a.frame_hover.transform.borderColor),"none"!==a.frame_hover.transform.borderStyle&&void 0===a.frame_hover.transform.borderWidth&&(a.frame_hover.transform.borderWidth=i.revToResp(0,4,0).toString().replace(/,/g," ")),void 0===e.bordercolor&&void 0!==a.frame_hover.transform.borderColor&&(e.bordercolor="transparent"),void 0===e.borderwidth&&void 0!==a.frame_hover.transform.borderWidth&&(e.borderwidth=i.revToResp(a.frame_hover.transform.borderWidth,4,0)),void 0===e.borderstyle&&void 0!==a.frame_hover.transform.borderStyle&&(e.borderstyle=i.revToResp(a.frame_hover.transform.borderStyle,4,0)))),void 0!==e.tloop){e.layerLoop={from:"frame_1",to:"frame_999",repeat:-1,keep:!0,children:!0};var l=e.tloop.split(";");for(var r in l)if(l.hasOwnProperty(r)){var d=l[r].split(":");switch(d[0]){case"f":e.layerLoop.from=d[1];break;case"t":e.layerLoop.to=d[1];break;case"k":e.layerLoop.keep=d[1];break;case"r":e.layerLoop.repeat=parseInt(d[1],0);break;case"c":e.layerLoop.children=d[1]}}e.layerLoop.count=0}for(var r in(e.loop_0||e.loop_999)&&(a.loop=b(e.loop_999,t,!0,"frame_999","loop"),a.loop.frame_0=b(e.loop_0||"",t,!1,void 0,"loop").transform),a.frame_0.transform.opacity=void 0===a.frame_0.transform.opacity?0:a.frame_0.transform.opacity,a.frame_1.transform.opacity=void 0===a.frame_1.transform.opacity?1:a.frame_1.transform.opacity,a.frame_999.transform.opacity=void 0===a.frame_999.transform.opacity?"inherit":a.frame_999.transform.opacity,a.frame_0.transform.transformPerspective=void 0===a.frame_0.transform.transformPerspective?"600px":a.frame_0.transform.transformPerspective,e.clipPath&&e.clipPath.use&&(a.frame_0.transform.clip=void 0===a.frame_0.transform.clip?100:parseInt(a.frame_0.transform.clip),a.frame_1.transform.clip=void 0===a.frame_1.transform.clip?100:parseInt(a.frame_1.transform.clip)),e.resetfilter=!1,a)void 0!==a[r].filter&&(e.resetfilter=!0);return e.resetfilter&&(a.frame_0.filter=jQuery.extend(!0,{},a.frame_0.filter),a.frame_0.filter.blur=void 0===a.frame_0.filter.blur?0:a.frame_0.filter.blur,a.frame_0.filter.brightness=void 0===a.frame_0.filter.brightness?100:a.frame_0.filter.brightness,a.frame_0.filter.grayscale=void 0===a.frame_0.filter.grayscale?0:a.frame_0.filter.grayscale),void 0!==a.frame_0.filter&&(a.frame_1.filter=jQuery.extend(!0,{},a.frame_1.filter),void 0!==a.frame_0.filter.blur&&0!==a.frame_1.filter.blur&&(a.frame_1.filter.blur=void 0===a.frame_1.filter.blur?0:a.frame_1.filter.blur),void 0!==a.frame_0.filter.brightness&&100!==a.frame_1.filter.brightness&&(a.frame_1.filter.brightness=void 0===a.frame_1.filter.brightness?100:a.frame_1.filter.brightness),void 0!==a.frame_0.filter.grayscale&&0!==a.frame_1.filter.grayscale&&(a.frame_1.filter.grayscale=void 0===a.frame_1.filter.grayscale?0:a.frame_1.filter.grayscale)),_(a)},_=function(e){var t,i={},a=["transform","words","chars","lines","mask"];for(var r in e)"loop"!==r&&"frame_hover"!==r&&(i=jQuery.extend(!0,i,e[r]));for(var r in e)if(e.hasOwnProperty(r)&&"loop"!==r&&"frame_hover"!==r){for(t in i.transform)i.transform.hasOwnProperty(t)&&(i.transform[t]=void 0===e[r].transform[t]?"frame_0"===r?window.rdF0.transform[t]:"frame_1"===r?window.rdF1.transform[t]:i.transform[t]:e[r].transform[t],e[r].transform[t]=void 0===e[r].transform[t]?i.transform[t]:e[r].transform[t]);for(var o=1;o<=4;o++)for(t in i[a[o]])i[a[o]].hasOwnProperty(t)&&(e[r][a[o]]=void 0===e[r][a[o]]?{}:e[r][a[o]],i[a[o]][t]=void 0===e[r][a[o]][t]?"frame_0"===r?window.rdF0[a[o]][t]:"frame_1"===r?window.rdF1[a[o]][t]:i[a[o]][t]:e[r][a[o]][t],e[r][a[o]][t]=void 0===e[r][a[o]][t]?i[a[o]][t]:e[r][a[o]][t])}return e},x=function(e,t){if(0===e.length)return{};for(var i=e[0].getElementsByClassName(t),a={},r=0;r<i.length;r++)a[i[r].id]=i[r];return a},k=function(e,t,a){if("BR"==e[0].nodeName||"br"==e[0].tagName||"object"!=typeof e[0].className&&e[0].className.indexOf("rs_splitted_")>=0)return!1;e[0].dataset.stylerecorder=!0;var r=window.getComputedStyle(e[0],null),o=void 0!==e[0].id&&void 0!==i[a]._L[e[0].id]?i[a]._L[e[0].id]:e.data(),s="rekursive"===t?e.closest(".rs-layer"):void 0,n=void 0!==s&&r.fontSize===s.css("fontSize")&&r.fontWeight===s.css("fontWeight")&&r.lineHeight===s.css("lineHeight"),l=n?void 0!==s[0].id&&void 0!==i[a]._L[s[0].id]?i[a]._L[s[0].id]:s.data():void 0,d=0;o.basealign=void 0===o.basealign?"grid":o.basealign,o._isnotext||(o.fontSize=i.revToResp(n?void 0===l.fontsize?parseInt(s.css("fontSize"),0)||20:l.fontsize:void 0===o.fontsize?"rekursive"!==t?20:"inherit":o.fontsize,i[a].rle),o.fontWeight=i.revToResp(n?void 0===l.fontweight?s.css("fontWeight")||"inherit":l.fontweight:void 0===o.fontweight?e.css("fontWeight")||"inherit":o.fontweight,i[a].rle),o.whiteSpace=i.revToResp(n?void 0===l.whitespace?"nowrap":l.whitespace:void 0===o.whitespace?"nowrap":o.whitespace,i[a].rle),o.textAlign=i.revToResp(n?void 0===l.textalign?"left":l.textalign:void 0===o.textalign?"left":o.textalign,i[a].rle),o.letterSpacing=i.revToResp(n?void 0===l.letterspacing?parseInt(s.css("letterSpacing"),0)||"inherit":l.letterspacing:void 0===o.letterspacing?parseInt(e.css("letterSpacing"),0)||"inherit":o.letterspacing,i[a].rle),o.textDecoration=n?void 0===l.textDecoration?"none":l.textDecoration:void 0===o.textDecoration?"none":o.textDecoration,d=25,d=void 0!==s&&"I"===e[0].tagName?"inherit":d,void 0!==o.tshadow&&(o.tshadow.b=i.revToResp(o.tshadow.b,i[a].rle),o.tshadow.h=i.revToResp(o.tshadow.h,i[a].rle),o.tshadow.v=i.revToResp(o.tshadow.v,i[a].rle))),void 0!==o.bshadow&&(o.bshadow.b=i.revToResp(o.bshadow.b,i[a].rle),o.bshadow.h=i.revToResp(o.bshadow.h,i[a].rle),o.bshadow.v=i.revToResp(o.bshadow.v,i[a].rle),o.bshadow.s=i.revToResp(o.bshadow.s,i[a].rle)),o.display=n?void 0===l.display?s.css("display"):l.display:void 0===o.display?e.css("display"):o.display,o.float=i.revToResp(n?void 0===l.float?s.css("float")||"none":l.float:void 0===o.float?"none":o.float,i[a].rle),o.clear=i.revToResp(n?void 0===l.clear?s.css("clear")||"none":l.clear:void 0===o.clear?"none":o.clear,i[a].rle),o.lineHeight=i.revToResp(e.is("img")||-1!=jQuery.inArray(o.layertype,["video","image","audio"])?d:n?void 0===l.lineheight?parseInt(s.css("lineHeight"),0)||d:l.lineheight:void 0===o.lineheight?d:o.lineheight,i[a].rle),o.zIndex=n?void 0===l.zindex?parseInt(s.css("zIndex"),0)||"inherit":l.zindex:void 0===o.zindex?parseInt(e.css("zIndex"),0)||"inherit":o.zindex,o.paddingTop=i.revToResp(void 0===o.paddingtop?parseInt(r.paddingTop,0)||0:o.paddingtop,i[a].rle),o.paddingBottom=i.revToResp(void 0===o.paddingbottom?parseInt(r.paddingBottom,0)||0:o.paddingbottom,i[a].rle),o.paddingLeft=i.revToResp(void 0===o.paddingleft?parseInt(r.paddingLeft,0)||0:o.paddingleft,i[a].rle),o.paddingRight=i.revToResp(void 0===o.paddingright?parseInt(r.paddingRight,0)||0:o.paddingright,i[a].rle),o.marginTop=i.revToResp(void 0===o.margintop?parseInt(r.marginTop,0)||0:o.margintop,i[a].rle),o.marginBottom=i.revToResp(void 0===o.marginbottom?parseInt(r.marginBottom,0)||0:o.marginbottom,i[a].rle),o.marginLeft=i.revToResp(void 0===o.marginleft?parseInt(r.marginLeft,0)||0:o.marginleft,i[a].rle),o.marginRight=i.revToResp(void 0===o.marginright?parseInt(r.marginRight,0)||0:o.marginright,i[a].rle),o.borderTopWidth=void 0===o.borderwidth?parseInt(r.borderTopWidth,0)||0:o.borderwidth[0],o.borderBottomWidth=void 0===o.borderwidth?parseInt(r.borderBottomWidth,0)||0:o.borderwidth[2],o.borderLeftWidth=void 0===o.borderwidth?parseInt(r.borderLeftWidth,0)||0:o.borderwidth[3],o.borderRightWidth=void 0===o.borderwidth?parseInt(r.borderRightWidth,0)||0:o.borderwidth[1],o.borderTopLeftRadius=i.revToResp(void 0===o.borderradius?r.borderTopLeftRadius||0:o.borderradius[0],i[a].rle),o.borderTopRightRadius=i.revToResp(void 0===o.borderradius?r.borderTopRightRadius||0:o.borderradius[1],i[a].rle),o.borderBottomLeftRadius=i.revToResp(void 0===o.borderradius?r.borderBottomLeftRadius||0:o.borderradius[3],i[a].rle),o.borderBottomRightRadius=i.revToResp(void 0===o.borderradius?r.borderBottomRightRadius||0:o.borderradius[2],i[a].rle),o.borderStyle=i.revToResp(void 0===o.borderstyle?r.borderStyle||0:o.borderstyle,i[a].rle),o.borderBottomColor=void 0===o.bordercolor?r["border-bottom-color"]:o.bordercolor,o.borderTopColor=void 0===o.bordercolor?r["border-top-color"]:o.bordercolor,o.borderLeftColor=void 0===o.bordercolor?r["border-left-color"]:o.bordercolor,o.borderRightColor=void 0===o.bordercolor?r["border-right-color"]:o.bordercolor,"rekursive"!==t?(o.color=i.revToResp(void 0===o.color?"#ffffff":o.color,i[a].rle,void 0,"||"),o.minWidth=i.revToResp(void 0===o.minwidth?parseInt(r.minWidth,0)||0:o.minwidth,i[a].rle),o.minHeight=i.revToResp(void 0===o.minheight?parseInt(r.minHeight,0)||0:o.minheight,i[a].rle),o.width=i.revToResp(void 0===o.width?"auto":i.smartConvertDivs(o.width),i[a].rle),o.height=i.revToResp(void 0===o.height?"auto":i.smartConvertDivs(o.height),i[a].rle),o.maxWidth=i.revToResp(void 0===o.maxwidth?parseInt(r.maxWidth,0)||"none":o.maxwidth,i[a].rle),o.maxHeight=i.revToResp(-1!==jQuery.inArray(o.type,["column","row"])?"none":void 0!==o.maxheight?parseInt(r.maxHeight,0)||"none":o.maxheight,i[a].rle)):"html"===o.layertype&&(o.width=i.revToResp(e[0].width,i[a].rle),o.height=i.revToResp(e[0].height,i[a].rle)),o.styleProps={background:e[0].style.background,"background-color":e[0].style["background-color"],color:e[0].style.color,cursor:e[0].style.cursor,"font-style":e[0].style["font-style"]},null==o.bshadow&&(o.styleProps.boxShadow=e[0].style.boxShadow),""!==o.styleProps.background&&void 0!==o.styleProps.background&&o.styleProps.background!==o.styleProps["background-color"]||delete o.styleProps.background,""==o.styleProps.color&&(o.styleProps.color=r.color)},T=function(e,t){if(void 0!==e){if("BR"==e[0].nodeName||"br"==e[0].tagName)return!1;var a=i[t].level,r=void 0!==e[0]&&void 0!==e[0].id&&void 0!==i[t]._L[e[0].id]?i[t]._L[e[0].id]:e.data(),o={basealign:void 0===(r=void 0===r.basealign?e.closest("rs-layer").data():r).basealign?"grid":r.basealign,lineHeight:void 0===r.basealign?"inherit":parseInt(r.lineHeight[a]),color:void 0===r.color?void 0:r.color[a],width:void 0===r.width?void 0:"a"===r.width[a]?"auto":r.width[a],height:void 0===r.height?void 0:"a"===r.height[a]?"auto":r.height[a],minWidth:void 0===r.minWidth?void 0:"n"===r.minWidth[a]?"none":r.minWidth[a],minHeight:void 0===r.minHeight?void 0:"n"==r.minHeight[a]?"none":r.minHeight[a],maxWidth:void 0===r.maxWidth?void 0:"n"==r.maxWidth[a]?"none":r.maxWidth[a],maxHeight:void 0===r.maxHeight?void 0:"n"==r.maxHeight[a]?"none":r.maxHeight[a],paddingTop:r.paddingTop[a],paddingBottom:parseInt(r.paddingBottom[a]),paddingLeft:parseInt(r.paddingLeft[a]),paddingRight:parseInt(r.paddingRight[a]),marginTop:parseInt(r.marginTop[a]),marginBottom:parseInt(r.marginBottom[a]),marginLeft:parseInt(r.marginLeft[a]),marginRight:parseInt(r.marginRight[a]),borderTopWidth:parseInt(r.borderTopWidth),borderBottomWidth:parseInt(r.borderBottomWidth),borderLeftWidth:parseInt(r.borderLeftWidth),borderRightWidth:parseInt(r.borderRightWidth),borderTopLeftRadius:r.borderTopLeftRadius[a],borderTopRightRadius:r.borderTopRightRadius[a],borderBottomLeftRadius:r.borderBottomLeftRadius[a],borderBottomRightRadius:r.borderBottomRightRadius[a],borderStyle:r.borderStyle[a],float:r.float[a],clear:r.clear[a]};return o.borderTopColor=r.borderTopColor,o.borderBottomColor=r.borderBottomColor,o.borderLeftColor=r.borderLeftColor,o.borderRightColor=r.borderRightColor,r._isnotext||(o.textDecoration=r.textDecoration,o.fontSize=parseInt(r.fontSize[a]),o.fontWeight=parseInt(r.fontWeight[a]),o.letterSpacing=parseInt(r.letterSpacing[a])||0,o.textAlign=r.textAlign[a],o.whiteSpace=r.whiteSpace[a],o.whiteSpace="normal"===o.whiteSpace&&"auto"===o.width&&!0!==r._incolumn?"nowrap":o.whiteSpace,o.display=r.display,void 0!==r.tshadow&&(o.textShadow=parseInt(r.tshadow.h[a],0)+"px "+parseInt(r.tshadow.v[a],0)+"px "+r.tshadow.b[a]+" "+r.tshadow.c)),void 0!==r.bshadow&&(o.boxShadow=parseInt(r.bshadow.h[a],0)+"px "+parseInt(r.bshadow.v[a],0)+"px "+parseInt(r.bshadow.b[a],0)+"px "+parseInt(r.bshadow.s[a],0)+"px "+r.bshadow.c),o}},L=function(e,t,i,a,r){var o=jQuery.isNumeric(e)||void 0===e?"":e.indexOf("px")>=0?"px":e.indexOf("%")>=0?"%":"";return e=jQuery.isNumeric(parseInt(e))?parseInt(e):e,e=null==(e="full"===(e=jQuery.isNumeric(e)?e*t+o:e)?a:"auto"===e||"none"===e?i:e)?r:e},R=function(e,t,a,r){var o=i[t]._L[e[0].id];o=void 0===o?{}:o;var s=e[0].className;if("object"==typeof s&&(s=""),void 0!==e&&void 0!==e[0]&&(s.indexOf("rs_splitted")>=0||"BR"==e[0].nodeName||"br"==e[0].tagName||e[0].tagName.indexOf("FCR")>0||e[0].tagName.indexOf("BCR")>0))return!1;var n,l,d,c,p=T(e,t),u="off"===r?1:i[t].bw,h="off"===r?1:i[t].bh,g="column"!==o.type?{t:p.marginTop,b:p.marginBottom,l:p.marginLeft,r:p.marginRight}:{t:0,b:0,l:0,r:0};if("column"===o.type&&punchgs.TweenMax.set(o._column,{paddingTop:Math.round(p.marginTop*h)+"px",paddingBottom:Math.round(p.marginBottom*h)+"px",paddingLeft:Math.round(p.marginLeft*u)+"px",paddingRight:Math.round(p.marginRight*u)+"px"}),-1===s.indexOf("rs_splitted_")){var f={paddingTop:Math.round(p.paddingTop*h)+"px",paddingBottom:Math.round(p.paddingBottom*h)+"px",paddingLeft:Math.round(p.paddingLeft*u)+"px",paddingRight:Math.round(p.paddingRight*u)+"px",borderTopLeftRadius:p.borderTopLeftRadius,borderTopRightRadius:p.borderTopRightRadius,borderBottomLeftRadius:p.borderBottomLeftRadius,borderBottomRightRadius:p.borderBottomRightRadius,overwrite:"auto"};if(o._incolumn||(f.marginTop="row"===o.type?0:g.t*h+"px",f.marginBottom="row"===o.type?0:g.b*h+"px",f.marginLeft="row"===o.type?0:g.l*u+"px",f.marginRight="row"===o.type?0:g.r*u+"px"),void 0!==o.spike&&(f["clip-path"]=f["-webkit-clip-path"]=o.spike),p.boxShadow&&(f.boxShadow=p.boxShadow),"column"!==o.type&&(void 0!==p.borderStyle&&"none"!==p.borderStyle&&(0!==p.borderTopWidth||p.borderBottomWidth>0||p.borderLeftWidth>0||p.borderRightWidth>0)?(f.borderTopWidth=Math.round(p.borderTopWidth*h)+"px",f.borderBottomWidth=Math.round(p.borderBottomWidth*h)+"px",f.borderLeftWidth=Math.round(p.borderLeftWidth*u)+"px",f.borderRightWidth=Math.round(p.borderRightWidth*u)+"px",f.borderStyle=p.borderStyle,f.borderTopColor=p.borderTopColor,f.borderBottomColor=p.borderBottomColor,f.borderLeftColor=p.borderLeftColor,f.borderRightColor=p.borderRightColor):("none"===p.borderStyle&&(f.borderStyle="none"),f.borderTopColor=p.borderTopColor,f.borderBottomColor=p.borderBottomColor,f.borderLeftColor=p.borderLeftColor,f.borderRightColor=p.borderRightColor)),"shape"!==o.type&&"image"!==o.type||0===p.borderTopLeftRadius&&0===p.borderTopRightRadius&&0===p.borderBottomLeftRadius&&0===p.borderBottomRightRadius||(f.overflow="hidden"),o._isnotext||(f.fontSize=Math.round(p.fontSize*u)+"px",f.fontWeight=p.fontWeight,f.letterSpacing=p.letterSpacing*u+"px",f.lineHeight=Math.round(p.lineHeight*h)+"px",f.textAlign=p.textAlign,p.textShadow&&(f.textShadow=p.textShadow)),"column"===o.type&&(void 0===o.cbg_set&&(o.cbg_set=o.styleProps["background-color"],o.cbg_set=""==o.cbg_set||void 0===o.cbg_set||0==o.cbg_set.length?"transparent":o.cbg_set,o.cbg_img=e.css("backgroundImage"),o.cbg_img_r=e.css("backgroundRepeat"),o.cbg_img_p=e.css("backgroundPosition"),o.cbg_img_s=e.css("backgroundSize"),o.cbg_o=o.bgopacity?1:o.bgopacity,punchgs.TweenMax.set(e,{backgroundColor:"transparent",backgroundImage:""})),f.backgroundColor="transparent",f.backgroundImage="none"),o._isstatic&&o.elementHovered&&(n=e.data("frames"))&&n.frame_hover&&n.frame_hover.transform)for(l in f)f.hasOwnProperty(l)&&n.frame_hover.transform.hasOwnProperty(l)&&delete f[l];if("IFRAME"==e[0].nodeName&&"html"===e[0].dataset.layertype&&(d="slide"==p.basealign?i[t].ulw:i[t].gridwidth[i[t].level],c="slide"==p.basealign?i[t].ulh:i[t].gridheight[i[t].level],f.width=!jQuery.isNumeric(p.width)&&p.width.indexOf("%")>=0?!o._isstatic||o._incolumn||o._ingroup?p.width:d*parseInt(p.width,0)/100:L(p.width,u,"auto",d,"auto"),f.height=!jQuery.isNumeric(p.height)&&p.height.indexOf("%")>=0?!o._isstatic||o._incolumn||o._ingroup?p.height:c*parseInt(p.height,0)/100:L(p.height,h,"auto",d,"auto")),punchgs.TweenMax.set(e,f),"rekursive"!=a){d="slide"==p.basealign?i[t].ulw:i[t].gridwidth[i[t].level],c="slide"==p.basealign?i[t].ulh:i[t].gridheight[i[t].level];var m=!jQuery.isNumeric(p.width)&&p.width.indexOf("%")>=0?!o._isstatic||o._incolumn||o._ingroup?p.width:d*parseInt(p.width,0)/100:L(p.width,u,"auto",d,"auto"),v=!jQuery.isNumeric(p.height)&&p.height.indexOf("%")>=0?!o._isstatic||o._incolumn||o._ingroup?p.height:c*parseInt(p.height,0)/100:L(p.height,h,"auto",d,"auto"),y={maxWidth:L(p.maxWidth,u,"none",d,"none"),maxHeight:L(p.maxHeight,h,"none",c,"none"),minWidth:L(p.minWidth,u,"0px",d,0),minHeight:L(p.minHeight,h,"0px",c,0),height:v,width:m,overwrite:"auto"};if(1==o.heightSetByVideo&&delete y.height,o._incolumn?(punchgs.TweenMax.set([o.p],{minWidth:m,maxWidth:m,marginTop:g.t*h+"px",marginBottom:g.b*h+"px",marginLeft:g.l*u+"px",marginRight:g.r*u+"px",float:p.float,clear:p.clear}),punchgs.TweenMax.set("block"===p.display?[o.lp]:[o.lp,o.m],{width:"100%"}),y.width=!jQuery.isNumeric(p.width)&&p.width.indexOf("%")>=0?"100%":m,"image"===o.type&&punchgs.TweenMax.set(o.img,{width:y.width})):!jQuery.isNumeric(p.width)&&p.width.indexOf("%")>=0&&(punchgs.TweenMax.set([o.p],{minWidth:"slide"===o.basealign||!0===o._ingroup?m:i[t].gridwidth[i[t].level]*i[t].bw+"px"}),punchgs.TweenMax.set([o.lp,o.m],{width:"100%"})),!jQuery.isNumeric(p.height)&&p.height.indexOf("%")>=0&&(punchgs.TweenMax.set([o.p],{minHeight:"slide"===o.basealign||!0===o._ingroup?v:i[t].gridheight[i[t].level]*i[t].bw+"px"}),punchgs.TweenMax.set([o.lp,o.m],{height:"100%"})),o._isnotext||(y.whiteSpace=p.whiteSpace,y.textAlign=p.textAlign,y.textDecoration=p.textDecoration),"npc"!=p.color&&void 0!==p.color&&(y.color=p.color),o._ingroup&&(o._groupw=y.minWidth,o._grouph=y.minHeight),"row"===o.type&&(jQuery.isNumeric(y.minHeight)||y.minHeight.indexOf("px")>=0)&&"0px"!==y.minHeight&&0!==y.minHeight&&"0"!==y.minHeight&&"none"!==y.minHeight?y.height=y.minHeight:"row"===o.type&&(y.height="auto"),o._isstatic&&o.elementHovered&&(n=e.data("frames"))&&n.frame_hover&&n.frame_hover.transform)for(l in y)y.hasOwnProperty(l)&&n.frame_hover.transform.hasOwnProperty(l)&&delete y[l];"image"===o.type&&(!jQuery.isNumeric(y.width)&&y.width.indexOf("%")>=0&&(y.width="100%"),!jQuery.isNumeric(y.height)&&y.height.indexOf("%")>=0&&(y.height="100%")),o._isgroup&&(!jQuery.isNumeric(y.width)&&y.width.indexOf("%")>=0&&(y.width="100%"),punchgs.TweenMax.set(o.p,{height:y.height})),punchgs.TweenMax.set(e,y),null!=o.svg_src&&void 0!==o.svgI&&("string"==typeof o.svgI.fill&&(o.svgI.fill=[o.svgI.fill]),o.svgTemp=jQuery.extend(!0,{},o.svgI),o.svgTemp.fill=o.svgTemp.fill[i[t].level],punchgs.TweenMax.set(o.svg,o.svgTemp),punchgs.TweenMax.set(o.svgPath,{fill:o.svgI.fill[i[t].level]}))}"row"===o.type&&(f={paddingTop:g.t*h+"px",paddingBottom:g.b*h+"px",paddingLeft:g.l*u+"px",paddingRight:g.r*u+"px"},punchgs.TweenMax.set(o.p,f)),"column"===o.type&&o.cbg&&o.cbg.length>0&&(o.cbg[0].style.backgroundSize=o.cbg_img_s,punchgs.TweenMax.set(o.cbg,{cursor:o.styleProps.cursor,borderTopWidth:Math.round(p.borderTopWidth*h)+"px",borderBottomWidth:Math.round(p.borderBottomWidth*h)+"px",borderLeftWidth:Math.round(p.borderLeftWidth*u)+"px",borderRightWidth:Math.round(p.borderRightWidth*u)+"px",borderStyle:p.borderStyle,borderTopColor:p.borderTopColor,borderBottomColor:p.borderBottomColor,borderLeftColor:p.borderLeftColor,borderRightColor:p.borderRightColor,borderTopLeftRadius:p.borderTopLeftRadius,borderTopRightRadius:p.borderTopRightRadius,borderBottomLeftRadius:p.borderBottomLeftRadius,borderBottomRightRadius:p.borderBottomRightRadius,backgroundColor:o.cbg_set,backgroundImage:o.cbg_img,backgroundRepeat:o.cbg_img_r,backgroundPosition:o.cbg_img_p,opacity:o.cbg_o}),punchgs.TweenMax.set(o.cbgmask,{top:p.marginTop*h+"px",left:p.marginLeft*u+"px",right:p.marginRight*u+"px",bottom:p.marginBottom*h+"px"}))}},I=function(e){var t={l:"none",lw:10,r:"none",rw:10};for(var i in e=e.split(";"))if(e.hasOwnProperty(i)){var a=e[i].split(":");switch(a[0]){case"l":t.l=a[1];break;case"r":t.r=a[1];break;case"lw":t.lw=a[1];break;case"rw":t.rw=a[1]}}return"polygon("+z(t.l,0,parseFloat(t.lw))+","+z(t.r,100,100-parseFloat(t.rw),!0)+")"},z=function(e,t,i,a){var r;switch(e){case"none":r=t+"% 100%,"+t+"% 0%";break;case"top":r=i+"% 100%,"+t+"% 0%";break;case"middle":r=i+"% 100%,"+t+"% 50%,"+i+"% 0%";break;case"bottom":r=t+"% 100%,"+i+"% 0%";break;case"two":r=i+"% 100%,"+t+"% 75%,"+i+"% 50%,"+t+"% 25%,"+i+"% 0%";break;case"three":r=t+"% 100%,"+i+"% 75%,"+t+"% 50%,"+i+"% 25%,"+t+"% 0%";break;case"four":r=t+"% 100%,"+i+"% 87.5%,"+t+"% 75%,"+i+"% 62.5%,"+t+"% 50%,"+i+"% 37.5%,"+t+"% 25%,"+i+"% 12.5%,"+t+"% 0%";break;case"five":r=t+"% 100%,"+i+"% 90%,"+t+"% 80%,"+i+"% 70%,"+t+"% 60%,"+i+"% 50%,"+t+"% 40%,"+i+"% 30%,"+t+"% 20%,"+i+"% 10%,"+t+"% 0%"}if(a){var o=r.split(",");for(var i in r="",o)o.hasOwnProperty(i)&&(r+=o[o.length-1-i]+(i<o.length-1?",":""))}return r}}(jQuery),function(e){"use strict";var t=jQuery.fn.revolution,i=t.is_mobile();function a(e,i){var a=new Object({single:".tp-"+i,c:t[e].cpar.find(".tp-"+i+"s")});return a.mask=a.c.find(".tp-"+i+"-mask"),a.wrap=a.c.find(".tp-"+i+"s-inner-wrapper"),a}jQuery.extend(!0,t,{hideUnHideNav:function(e){var i=t[e].c.width(),a=t[e].navigation.arrows,r=t[e].navigation.bullets,o=t[e].navigation.thumbnails,s=t[e].navigation.tabs;p(a)&&k(t[e].c.find(".tparrows"),a.hide_under,i,a.hide_over),p(r)&&k(t[e].c.find(".tp-bullets"),r.hide_under,i,r.hide_over),p(o)&&k(o.c,o.hide_under,i,o.hide_over),p(s)&&k(s.c,s.hide_under,i,s.hide_over),x(e)},resizeThumbsTabs:function(e,i){if(void 0!==t[e]&&t[e].navigation.use&&(t[e].navigation&&t[e].navigation.bullets.enable||t[e].navigation&&t[e].navigation.tabs.enable||t[e].navigation&&t[e].navigation.thumbnails.enable)){var a=(jQuery(window).width()-480)/500,r=new punchgs.TimelineLite,s=t[e].navigation.tabs,n=t[e].navigation.thumbnails,l=t[e].navigation.bullets;if(r.pause(),a=a>1?1:a<0?0:a,p(s)&&(i||s.width>s.min_width)&&o(a,r,t[e].c,s,t[e].slideamount,"tab"),p(n)&&(i||n.width>n.min_width)&&o(a,r,t[e].c,n,t[e].slideamount,"thumb"),p(l)&&i){var d=t[e].c.find(".tp-bullets");d.find(".tp-bullet").each(function(e){var t=jQuery(this),i=e+1,a=t.outerWidth()+parseInt(void 0===l.space?0:l.space,0),r=t.outerHeight()+parseInt(void 0===l.space?0:l.space,0);"vertical"===l.direction?(t.css({top:(i-1)*r+"px",left:"0px"}),d.css({height:(i-1)*r+t.outerHeight(),width:t.outerWidth()})):(t.css({left:(i-1)*a+"px",top:"0px"}),d.css({width:(i-1)*a+t.outerWidth(),height:t.outerHeight()}))})}r.play(),x(e)}return!0},updateNavIndexes:function(e){var i=t[e].c;function a(e){i.find(e).lenght>0&&i.find(e).each(function(e){jQuery(this).data("liindex",e)})}a("rs-tab"),a("rs-bullet"),a("rs-thumb"),t.resizeThumbsTabs(e,!0),t.manageNavigation(e)},manageNavigation:function(e,i){if(t[e].navigation.use){var a=t.getHorizontalOffset(t[e].cpar,"left"),o=t.getHorizontalOffset(t[e].cpar,"right");p(t[e].navigation.bullets)&&("fullscreen"!=t[e].sliderLayout&&"fullwidth"!=t[e].sliderLayout&&(t[e].navigation.bullets.h_offset_old=void 0===t[e].navigation.bullets.h_offset_old?parseInt(t[e].navigation.bullets.h_offset,0):t[e].navigation.bullets.h_offset_old,t[e].navigation.bullets.h_offset="center"===t[e].navigation.bullets.h_align?t[e].navigation.bullets.h_offset_old+a/2-o/2:t[e].navigation.bullets.h_offset_old+a-o),b(t[e].c.find(".tp-bullets"),t[e].navigation.bullets,e)),p(t[e].navigation.thumbnails)&&b(t[e].navigation.thumbnails.c,t[e].navigation.thumbnails,e),p(t[e].navigation.tabs)&&b(t[e].navigation.tabs.c,t[e].navigation.tabs,e),p(t[e].navigation.arrows)&&("fullscreen"!=t[e].sliderLayout&&"fullwidth"!=t[e].sliderLayout&&(t[e].navigation.arrows.left.h_offset_old=void 0===t[e].navigation.arrows.left.h_offset_old?parseInt(t[e].navigation.arrows.left.h_offset,0):t[e].navigation.arrows.left.h_offset_old,t[e].navigation.arrows.left.h_offset="right"===t[e].navigation.arrows.left.h_align?t[e].navigation.arrows.left.h_offset_old+o:t[e].navigation.arrows.left.h_offset_old+a,t[e].navigation.arrows.right.h_offset_old=void 0===t[e].navigation.arrows.right.h_offset_old?parseInt(t[e].navigation.arrows.right.h_offset,0):t[e].navigation.arrows.right.h_offset_old,t[e].navigation.arrows.right.h_offset="right"===t[e].navigation.arrows.right.h_align?t[e].navigation.arrows.right.h_offset_old+o:t[e].navigation.arrows.right.h_offset_old+a),b(t[e].c.find(".tp-leftarrow.tparrows"),t[e].navigation.arrows.left,e),b(t[e].c.find(".tp-rightarrow.tparrows"),t[e].navigation.arrows.right,e)),!1!==i&&(p(t[e].navigation.thumbnails)&&r(t[e].navigation.thumbnails,e),p(t[e].navigation.tabs)&&r(t[e].navigation.tabs,e))}},showFirstTime:function(e){h(e),t.callContWidthManager(e)},createNavigation:function(e){var o=t[e].navigation.arrows,l=t[e].navigation.bullets,f=t[e].navigation.thumbnails,v=t[e].navigation.tabs,y=p(o),b=p(l),x=p(f),k=p(v);s(e),n(e),y&&(m(o,e),o.c=t[e].cpar.find(".tparrows")),t[e].slides.each(function(i){if(-1===this.className.indexOf("not-in-nav")){var a=jQuery(t[e].slides[t[e].slides.length-1-i]),r=jQuery(this);b&&(t[e].navigation.bullets.rtl?w(t[e].c,l,a,e):w(t[e].c,l,r,e)),x&&(t[e].navigation.thumbnails.rtl?_(t[e].c,f,a,"tp-thumb",e):_(t[e].c,f,r,"tp-thumb",e)),k&&(t[e].navigation.tabs.rtl?_(t[e].c,v,a,"tp-tab",e):_(t[e].c,v,r,"tp-tab",e))}}),b&&(l.c=t[e].cpar.find(".tp-bullets")),x&&jQuery.extend(!0,f,a(e,"thumb")),k&&jQuery.extend(!0,v,a(e,"tab")),t[e].c.bind("revolution.slide.onafterswap revolution.nextslide.waiting",function(i){if(void 0!==t[e].pr_next_key||void 0!==t[e].pr_active_key){var a=void 0===t[e].pr_next_key?t[e].slides[t[e].pr_active_key].dataset.key:t[e].slides[t[e].pr_next_key].dataset.key;t[e].c.find(".tp-bullet").each(function(){this.dataset.key===a?this.classList.add("selected"):this.classList.remove("selected")}),t[e].cpar.find(".tp-thumb, .tp-tab").each(function(){this.dataset.key===a?(this.classList.add("selected"),"RS-TAB"===this.nodeName?r(v,e):r(f,e)):this.classList.remove("selected")});var s=0,n=!1;t[e].thumbs&&jQuery.each(t[e].thumbs,function(e,t){s=!1===n?e:s,n=void 0!==t&&t.id===a||e===a||n});var l=s>0?s-1:t[e].slideamount-1,d=s+1==t[e].slideamount?0:s+1;if(!0===o.enable){var c=o.tmp;if(null!=t[e].thumbs[l]&&jQuery.each(t[e].thumbs[l].params,function(e,t){c=c.replace(t.from,t.to)}),o.left.j.html(c),c=o.tmp,d>t[e].slideamount)return;jQuery.each(t[e].thumbs[d].params,function(e,t){c=c.replace(t.from,t.to)}),o.right.j.html(c),o.rtl?(punchgs.TweenLite.set(o.left.j.find(".tp-arr-imgholder"),{backgroundImage:"url("+t[e].thumbs[d].src+")"}),punchgs.TweenLite.set(o.right.j.find(".tp-arr-imgholder"),{backgroundImage:"url("+t[e].thumbs[l].src+")"})):(punchgs.TweenLite.set(o.left.j.find(".tp-arr-imgholder"),{backgroundImage:"url("+t[e].thumbs[l].src+")"}),punchgs.TweenLite.set(o.right.j.find(".tp-arr-imgholder"),{backgroundImage:"url("+t[e].thumbs[d].src+")"}))}}}),c(o),c(l),c(f),c(v),t[e].cpar.on("mouseenter mousemove",function(a){t[e].cpar.hasClass("tp-mouseover")||(t[e].cpar.addClass("tp-mouseover"),t[e].firstSlideAvailable&&(h(e),i&&(u(t[e].hideAllNavElementTimer),t[e].hideAllNavElementTimer=setTimeout(function(){t[e].cpar.removeClass("tp-mouseover"),g(e)},150))))}),t[e].cpar.on("mouseleave ",function(){t[e].cpar.removeClass("tp-mouseover"),g(e)}),x&&d(f.c,e),k&&d(v.c,e),"carousel"===t[e].sliderType&&d(t[e].c,e,!0),(t[e].navigation.touch.touchOnDesktop||t[e].navigation.touch.touchenabled&&i)&&d(t[e].c,e,"swipebased")}});var r=function(e,i){var a="vertical"===e.direction?e.mask.find(e.single).first().outerHeight(!0)+e.space:e.mask.find(e.single).first().outerWidth(!0)+e.space,r="vertical"===e.direction?e.mask.height():e.mask.width(),o=e.mask.find(e.single+".selected").data("liindex");o=(o=void 0===o?0:o)>0&&1===t[i].sdir?o-1:o;var s=r/a,n="vertical"===e.direction?e.mask.height():e.mask.width(),l=0-o*a,d="vertical"===e.direction?e.wrap.height():e.wrap.width(),c=l<0-(d-n)?0-(d-n):l,p=e.wrap[0].dataset.offset;s>2&&(c=l-(p+a)<=0?l-(p+a)<0-a?p:c+a:c,c=l-a+p+r<a&&l+(Math.round(s)-2)*a<p?l+(Math.round(s)-2)*a:c),c="vertical"!==e.direction&&e.mask.width()>=e.wrap.width()||"vertical"===e.direction&&e.mask.height()>=e.wrap.height()?0:c<0-(d-n)?0-(d-n):c>0?0:c,e.c.hasClass("dragged")||("vertical"===e.direction?e.wrap.data("tmmove",punchgs.TweenLite.to(e.wrap,.5,{top:c+"px",ease:punchgs.Power3.easeInOut})):e.wrap.data("tmmove",punchgs.TweenLite.to(e.wrap,.5,{left:c+"px",ease:punchgs.Power3.easeInOut})),e.wrap.data("offset",c))},o=function(e,t,i,a,r,o){var s=i.parent().find(".tp-"+o+"s"),n=s.find(".tp-"+o+"s-inner-wrapper"),l=s.find(".tp-"+o+"-mask"),d=a.width*e<a.min_width?a.min_width:Math.round(a.width*e),c=Math.round(d/a.width*a.height),p="vertical"===a.direction?d:d*r+a.space*(r-1),u="vertical"===a.direction?c*r+a.space*(r-1):c,h="vertical"===a.direction?{width:d+"px"}:{height:c+"px"};t.add(punchgs.TweenLite.set(s,h)),t.add(punchgs.TweenLite.set(n,{width:p+"px",height:u+"px"})),t.add(punchgs.TweenLite.set(l,{width:p+"px",height:u+"px"}));var g=n.find(".tp-"+o);return g&&jQuery.each(g,function(e,i){"vertical"===a.direction?t.add(punchgs.TweenLite.set(i,{top:e*(c+parseInt(void 0===a.space?0:a.space,0)),width:d+"px",height:c+"px"})):"horizontal"===a.direction&&t.add(punchgs.TweenLite.set(i,{left:e*(d+parseInt(void 0===a.space?0:a.space,0)),width:d+"px",height:c+"px"}))}),t},s=function(e){!0===t[e].navigation.keyboardNavigation&&jQuery(document).keydown(function(i){("horizontal"==t[e].navigation.keyboard_direction&&39==i.keyCode||"vertical"==t[e].navigation.keyboard_direction&&40==i.keyCode)&&(t[e].sc_indicator="arrow",t[e].sc_indicator_dir=0,t.callingNewSlide(e,1)),("horizontal"==t[e].navigation.keyboard_direction&&37==i.keyCode||"vertical"==t[e].navigation.keyboard_direction&&38==i.keyCode)&&(t[e].sc_indicator="arrow",t[e].sc_indicator_dir=1,t.callingNewSlide(e,-1))})},n=function(e){if(!0===t[e].navigation.mouseScrollNavigation||"on"===t[e].navigation.mouseScrollNavigation||"carousel"===t[e].navigation.mouseScrollNavigation){t[e].isIEEleven=!!navigator.userAgent.match(/Trident.*rv\:11\./),t[e].isSafari=!!navigator.userAgent.match(/safari/i),t[e].ischrome=!!navigator.userAgent.match(/chrome/i);var i=t[e].ischrome?-49:t[e].isIEEleven||t[e].isSafari?-9:navigator.userAgent.match(/mozilla/i)?-29:-49,a=t[e].ischrome?49:t[e].isIEEleven||t[e].isSafari?9:navigator.userAgent.match(/mozilla/i)?29:49;t[e].c.on("mousewheel DOMMouseScroll",function(r){var o,s,n,l,d,c=(o=r.originalEvent,s=0,n=0,l=0,d=0,"detail"in o&&(n=o.detail),"wheelDelta"in o&&(n=-o.wheelDelta/120),"wheelDeltaY"in o&&(n=-o.wheelDeltaY/120),"wheelDeltaX"in o&&(s=-o.wheelDeltaX/120),"axis"in o&&o.axis===o.HORIZONTAL_AXIS&&(s=n,n=0),l=1*s,d=1*n,"deltaY"in o&&(d=o.deltaY),"deltaX"in o&&(l=o.deltaX),(l||d)&&o.deltaMode&&(o.deltaMode,l*=1,d*=1),l&&!s&&(s=l<1?-1:1),d&&!n&&(n=d<1?-1:1),((d=navigator.userAgent.match(/mozilla/i)?10*d:d)>300||d<-300)&&(d/=10),{spinX:s,spinY:n,pixelX:l,pixelY:d}),p=!0,u=0==t[e].pr_active_key||0==t[e].pr_processing_key,h=t[e].pr_active_key==t[e].slideamount-1||t[e].pr_processing_key==t[e].slideamount-1;"carousel"==t[e].navigation.mouseScrollNavigation&&(u=h=!1),void 0===t[e].pr_processing_key?c.pixelY<i?(u||(t[e].sc_indicator="arrow","reverse"!==t[e].navigation.mouseScrollReverse&&(t[e].sc_indicator_dir=1,t.callingNewSlide(e,-1)),p=!1),h||(t[e].sc_indicator="arrow","reverse"===t[e].navigation.mouseScrollReverse&&(t[e].sc_indicator_dir=0,t.callingNewSlide(e,1)),p=!1)):c.pixelY>a&&(h||(t[e].sc_indicator="arrow","reverse"!==t[e].navigation.mouseScrollReverse&&(t[e].sc_indicator_dir=0,t.callingNewSlide(e,1)),p=!1),u||(t[e].sc_indicator="arrow","reverse"===t[e].navigation.mouseScrollReverse&&(t[e].sc_indicator_dir=1,t.callingNewSlide(e,-1)),p=!1)):p=!1;var g=t[e].c.offset().top-jQuery("body").scrollTop(),f=g+t[e].c.height();return"carousel"!=t[e].navigation.mouseScrollNavigation?("reverse"!==t[e].navigation.mouseScrollReverse&&(g>0&&c.pixelY>0||f<jQuery(window).height()&&c.pixelY<0)&&(p=!0),"reverse"===t[e].navigation.mouseScrollReverse&&(g<0&&c.pixelY<0||f>jQuery(window).height()&&c.pixelY>0)&&(p=!0)):p=!1,p?void 0:(r.preventDefault(r),!1)})}},l=function(e,t,a){return!0===(e=i?jQuery(a.target).closest(e).length||jQuery(a.srcElement).closest(e).length:jQuery(a.toElement).closest(e).length||jQuery(a.originalTarget).closest(e).length)||1===e?1:0},d=function(e,a,r){var o=t[a].carousel;jQuery(".bullet, .bullets, .tp-bullets, .tparrows").addClass("noSwipe"),o.Limit="endless";var s=e,n="vertical"===t[a].navigation.thumbnails.direction||"vertical"===t[a].navigation.tabs.direction?"none":"vertical",d=t[a].navigation.touch.swipe_direction||"horizontal";n="swipebased"==r&&"vertical"==d?"none":r?"vertical":n,jQuery.fn.swipetp||(jQuery.fn.swipetp=jQuery.fn.swipe),jQuery.fn.swipetp.defaults&&jQuery.fn.swipetp.defaults.excludedElements||jQuery.fn.swipetp.defaults||(jQuery.fn.swipetp.defaults={}),jQuery.fn.swipetp.defaults.excludedElements="label, button, input, select, textarea, .noSwipe",s.swipetp({allowPageScroll:n,triggerOnTouchLeave:!0,treshold:t[a].navigation.touch.swipe_treshold,fingers:t[a].navigation.touch.swipe_min_touches>5?1:t[a].navigation.touch.swipe_min_touches,excludeElements:jQuery.fn.swipetp.defaults.excludedElements,swipeStatus:function(r,s,n,c,p,u,h){var g=l("rs-module-wrap",0,r),f=l(".tp-thumbs",0,r),m=l(".tp-tabs",0,r),v=!!jQuery(this).attr("class").match(/tp-tabs|tp-thumb/gi);if("carousel"===t[a].sliderType&&(("move"===s||"end"===s||"cancel"==s)&&t[a].dragStartedOverSlider&&!t[a].dragStartedOverThumbs&&!t[a].dragStartedOverTabs||"start"===s&&g>0&&0===f&&0===m)){if(i&&("up"===n||"down"===n))return;switch(void 0!==o.positionanim&&o.positionanim.pause(),t[a].dragStartedOverSlider=!0,c=n&&n.match(/left|up/g)?Math.round(-1*c):c=Math.round(1*c),s){case"start":void 0!==o.positionanim&&(o.positionanim.kill(),o.slide_globaloffset="off"===o.infinity?o.slide_offset:t.simp(o.slide_offset,o.maxwidth)),o.overpull="none",o.wrap.addClass("dragged");break;case"move":if(Math.abs(c)>=10||t[a].carousel.isDragged){if(t[a].carousel.isDragged=!0,t[a].c.find(".rs-waction").addClass("tp-temporarydisabled"),o.slide_offset="off"===o.infinity?o.slide_globaloffset+c:t.simp(o.slide_globaloffset+c,o.maxwidth),"off"===o.infinity){var y="center"===o.horizontal_align?(o.wrapwidth/2-o.slide_width/2-o.slide_offset)/o.slide_width:(0-o.slide_offset)/o.slide_width;"none"!==o.overpull&&0!==o.overpull||!(y<0||y>t[a].slideamount-1)?y>=0&&y<=t[a].slideamount-1&&(y>=0&&c>o.overpull||y<=t[a].slideamount-1&&c<o.overpull)&&(o.overpull=0):o.overpull=c,o.slide_offset=y<0?o.slide_offset+(o.overpull-c)/1.1+Math.sqrt(Math.abs((o.overpull-c)/1.1)):y>t[a].slideamount-1?o.slide_offset+(o.overpull-c)/1.1-Math.sqrt(Math.abs((o.overpull-c)/1.1)):o.slide_offset}t.organiseCarousel(a,n,!0,!0)}break;case"end":case"cancel":t[a].carousel.isDragged=!1,o.slide_globaloffset=o.slide_offset,o.wrap.removeClass("dragged"),t.carouselToEvalPosition(a,n),t[a].dragStartedOverSlider=!1,t[a].dragStartedOverThumbs=!1,t[a].dragStartedOverTabs=!1,setTimeout(function(){t[a].c.find(".rs-waction").removeClass("tp-temporarydisabled")},19)}}else{if(("move"!==s&&"end"!==s&&"cancel"!=s||t[a].dragStartedOverSlider||!t[a].dragStartedOverThumbs&&!t[a].dragStartedOverTabs)&&!("start"===s&&g>0&&(f>0||m>0))){if("end"==s&&!v){if(t[a].sc_indicator="arrow","horizontal"==d&&"left"==n||"vertical"==d&&"up"==n)return t[a].sc_indicator_dir=0,t.callingNewSlide(a,1),!1;if("horizontal"==d&&"right"==n||"vertical"==d&&"down"==n)return t[a].sc_indicator_dir=1,t.callingNewSlide(a,-1),!1}return t[a].dragStartedOverSlider=!1,t[a].dragStartedOverThumbs=!1,t[a].dragStartedOverTabs=!1,!0}f>0&&(t[a].dragStartedOverThumbs=!0),m>0&&(t[a].dragStartedOverTabs=!0);var b=t[a].dragStartedOverThumbs?".tp-thumbs":".tp-tabs",w=t[a].dragStartedOverThumbs?".tp-thumb-mask":".tp-tab-mask",_=t[a].dragStartedOverThumbs?".tp-thumbs-inner-wrapper":".tp-tabs-inner-wrapper",x=t[a].dragStartedOverThumbs?".tp-thumb":".tp-tab",k=t[a].dragStartedOverThumbs?t[a].navigation.thumbnails:t[a].navigation.tabs;c=n&&n.match(/left|up/g)?Math.round(-1*c):c=Math.round(1*c);var T=e.parent().find(w),L=T.find(_),R=k.direction,I="vertical"===R?L.height():L.width(),z="vertical"===R?T.height():T.width(),S="vertical"===R?T.find(x).first().outerHeight(!0)+k.space:T.find(x).first().outerWidth(!0)+k.space,M=void 0===L.data("offset")?0:parseInt(L.data("offset"),0),O=0;switch(s){case"start":e.parent().find(b).addClass("dragged"),M="vertical"===R?L.position().top:L.position().left,L.data("offset",M),L.data("tmmove")&&L.data("tmmove").pause();break;case"move":if(I<=z)return!1;O=(O=M+c)>0?"horizontal"===R?O-L.width()*(O/L.width()*O/L.width()):O-L.height()*(O/L.height()*O/L.height()):O;var C="vertical"===R?0-(L.height()-T.height()):0-(L.width()-T.width());O=O<C?"horizontal"===R?O+L.width()*(O-C)/L.width()*(O-C)/L.width():O+L.height()*(O-C)/L.height()*(O-C)/L.height():O,"vertical"===R?punchgs.TweenLite.set(L,{top:O+"px"}):punchgs.TweenLite.set(L,{left:O+"px"});break;case"end":case"cancel":if(v)return O=M+c,O=(O="vertical"===R?O<0-(L.height()-T.height())?0-(L.height()-T.height()):O:O<0-(L.width()-T.width())?0-(L.width()-T.width()):O)>0?0:O,O=Math.abs(c)>S/10?c<=0?Math.floor(O/S)*S:Math.ceil(O/S)*S:c<0?Math.ceil(O/S)*S:Math.floor(O/S)*S,O=(O="vertical"===R?O<0-(L.height()-T.height())?0-(L.height()-T.height()):O:O<0-(L.width()-T.width())?0-(L.width()-T.width()):O)>0?0:O,"vertical"===R?punchgs.TweenLite.to(L,.5,{top:O+"px",ease:punchgs.Power3.easeOut}):punchgs.TweenLite.to(L,.5,{left:O+"px",ease:punchgs.Power3.easeOut}),O=O||("vertical"===R?L.position().top:L.position().left),L.data("offset",O),L.data("distance",c),setTimeout(function(){t[a].dragStartedOverSlider=!1,t[a].dragStartedOverThumbs=!1,t[a].dragStartedOverTabs=!1},100),e.parent().find(b).removeClass("dragged"),!1}}}})},c=function(e){e.hide_delay=jQuery.isNumeric(parseInt(e.hide_delay,0))?e.hide_delay:.2,e.hide_delay_mobile=jQuery.isNumeric(parseInt(e.hide_delay_mobile,0))?e.hide_delay_mobile:.2},p=function(e){return e&&e.enable},u=function(e){clearTimeout(e)},h=function(e){var i=t[e].navigation.maintypes;for(var a in i)i.hasOwnProperty(a)&&p(t[e].navigation[i[a]])&&(u(t[e].navigation[i[a]].showCall),t[e].navigation[i[a]].showCall=setTimeout(function(i){u(i.hideCall),i.hide_onleave&&!t[e].cpar.hasClass("tp-mouseover")||(void 0===i.tween?i.tween=f(i):i.tween.play())},t[e].navigation[i[a]].hide_onleave&&!t[e].cpar.hasClass("tp-mouseover")?0:parseInt(t[e].navigation[i[a]].animDelay),t[e].navigation[i[a]]))},g=function(e,a){var r=t[e].navigation.maintypes;for(var o in r)r.hasOwnProperty(o)&&void 0!==t[e].navigation[r[o]]&&t[e].navigation[r[o]].hide_onleave&&p(t[e].navigation[r[o]])&&(u(t[e].navigation[r[o]].hideCall),t[e].navigation[r[o]].hideCall=setTimeout(function(e){u(e.showCall),e.tween&&e.tween.reverse()},i?parseInt(t[e].navigation[r[o]].hide_delay_mobile,0):parseInt(t[e].navigation[r[o]].hide_delay,0),t[e].navigation[r[o]]))},f=function(e){e.speed=void 0===e.speed?.5:e.speed,e.anims=[],void 0!==e.anim&&void 0===e.left&&e.anims.push(e.anim),void 0!==e.left&&e.anims.push(e.left.anim),void 0!==e.right&&e.anims.push(e.right.anim);var t=new punchgs.TimelineLite;for(var i in t.add(punchgs.TweenLite.to(e.c,e.speed,{autoAlpha:1,opacity:1,ease:punchgs.Power3.easeInOut}),0),e.anims)if(e.anims.hasOwnProperty(i))switch(e.anims[i]){case"left":t.add(punchgs.TweenLite.fromTo(e.c[i],e.speed,{marginLeft:-50},{marginLeft:0,ease:punchgs.Power3.easeInOut}),0);break;case"right":t.add(punchgs.TweenLite.fromTo(e.c[i],e.speed,{marginLeft:50},{marginLeft:0,ease:punchgs.Power3.easeInOut}),0);break;case"top":t.add(punchgs.TweenLite.fromTo(e.c[i],e.speed,{marginTop:-50},{marginTop:0,ease:punchgs.Power3.easeInOut}),0);break;case"bottom":t.add(punchgs.TweenLite.fromTo(e.c[i],e.speed,{marginTop:50},{marginTop:0,ease:punchgs.Power3.easeInOut}),0);break;case"zoomin":t.add(punchgs.TweenLite.fromTo(e.c[i],e.speed,{scale:.5},{scale:1,ease:punchgs.Power3.easeInOut}),0);break;case"zoomout":t.add(punchgs.TweenLite.fromTo(e.c[i],e.speed,{scale:1.2},{scale:1,ease:punchgs.Power3.easeInOut}),0)}return t.play(),t},m=function(e,i){e.style=void 0===e.style?"":e.style,e.left.style=void 0===e.left.style?"":e.left.style,e.right.style=void 0===e.right.style?"":e.right.style,0===t[i].c.find(".tp-leftarrow.tparrows").length&&t[i].c.append('<rs-arrow style="opacity:0" class="tp-leftarrow tparrows '+e.style+" "+e.left.style+'">'+e.tmp+"</rs-arrow>"),0===t[i].c.find(".tp-rightarrow.tparrows").length&&t[i].c.append('<rs-arrow style="opacity:0"  class="tp-rightarrow tparrows '+e.style+" "+e.right.style+'">'+e.tmp+"</rs-arrow>");var a=t[i].c.find(".tp-leftarrow.tparrows"),r=t[i].c.find(".tp-rightarrow.tparrows");e.rtl?(a.click(function(){"carousel"===t[i].sliderType&&(t[i].ctNavElement=!0),t[i].sc_indicator="arrow",t[i].sc_indicator_dir=0,t[i].c.revnext()}),r.click(function(){"carousel"===t[i].sliderType&&(t[i].ctNavElement=!0),t[i].sc_indicator="arrow",t[i].sc_indicator_dir=1,t[i].c.revprev()})):(r.click(function(){"carousel"===t[i].sliderType&&(t[i].ctNavElement=!0),t[i].sc_indicator="arrow",t[i].sc_indicator_dir=0,t[i].c.revnext()}),a.click(function(){"carousel"===t[i].sliderType&&(t[i].ctNavElement=!0),t[i].sc_indicator="arrow",t[i].sc_indicator_dir=1,t[i].c.revprev()})),e.right.j=t[i].c.find(".tp-rightarrow.tparrows"),e.left.j=t[i].c.find(".tp-leftarrow.tparrows"),e.padding_top=parseInt(t[i].carousel.padding_top||0,0),e.padding_bottom=parseInt(t[i].carousel.padding_bottom||0,0),b(a,e.left,i),b(r,e.right,i),"outer-left"!=e.position&&"outer-right"!=e.position||(t[i].outernav=!0)},v=function(e,i,a){var r=e.outerHeight(!0),o=null==t[a]?0:0==t[a].conh?t[a].height:t[a].conh,s="layergrid"==i.container?"fullscreen"==t[a].sliderLayout?t[a].height/2-t[a].gridheight[t[a].level]*t[a].bh/2:t[a].autoHeight||null!=t[a].minHeight&&t[a].minHeight>0?o/2-t[a].gridheight[t[a].level]*t[a].bh/2:0:0,n="top"===i.v_align?{top:"0px",y:Math.round(i.v_offset+s)+"px"}:"center"===i.v_align?{top:"50%",y:Math.round(0-r/2+i.v_offset)+"px"}:{top:"100%",y:Math.round(0-(r+i.v_offset+s))+"px"};e.hasClass("outer-bottom")||punchgs.TweenLite.set(e,n)},y=function(e,i,a){var r=e.outerWidth(!0),o="layergrid"===i.container?t[a].width/2-t[a].gridwidth[t[a].level]*t[a].bw/2:0,s="left"===i.h_align?{left:"0px",x:Math.round(i.h_offset+o)+"px"}:"center"===i.h_align?{left:"50%",x:Math.round(0-r/2+i.h_offset)+"px"}:{left:"100%",x:Math.round(0-(r+i.h_offset+o))+"px"};punchgs.TweenLite.set(e,s)},b=function(e,i,a){var r="fullwidth"==t[a].sliderLayout||"fullscreen"==t[a].sliderLayout,o=r?t[a].c.width():t[a].topc.width(),s=t[a].c.height();if(v(e,i,a),y(e,i,a),"outer-left"===i.position&&r?punchgs.TweenLite.set(e,{left:0-e.outerWidth()+"px",x:i.h_offset+"px"}):"outer-right"===i.position&&r&&punchgs.TweenLite.set(e,{right:0-e.outerWidth()+"px",x:i.h_offset+"px"}),e.hasClass("tp-thumbs")||e.hasClass("tp-tabs")){var n=e.data("wr_padding"),l=e.data("maxw"),d=e.data("maxh"),c=e.hasClass("tp-thumbs")?e.find(".tp-thumb-mask"):e.find(".tp-tab-mask"),p=parseInt(i.padding_top||0,0),u=parseInt(i.padding_bottom||0,0),h={},g={};l>o&&"outer-left"!==i.position&&"outer-right"!==i.position?(h.left="0px",h.x=0,h.maxWidth=o-2*n+"px",g.maxWidth=o-2*n+"px"):(h.maxWidth=l,g.maxWidth=o+"px"),d+2*n>s&&"outer-bottom"!==i.position&&"outer-top"!==i.position?(h.top="0px",h.y=0,h.maxHeight=p+u+(s-2*n)+"px",g.maxHeight=p+u+(s-2*n)+"px"):(h.maxHeight=d+"px",g.maxHeight=d+"px"),i.span?("layergrid"==i.container&&"outer-left"!==i.position&&"outer-right"!==i.position&&(p=u=0),"vertical"===i.direction?(h.maxHeight=p+u+(s-2*n)+"px",h.height=p+u+(s-2*n)+"px",h.top=0-p,h.y=0,g.maxHeight=p+u+(Math.min(d,s)-2*n)+"px",punchgs.TweenLite.set(e,h),punchgs.TweenLite.set(c,g),v(c,i,a)):"horizontal"===i.direction&&(h.maxWidth="100%",h.width=o-2*n+"px",h.left=0,h.x=0,g.maxWidth=l>=o?"100%":Math.min(l,o)+"px",punchgs.TweenLite.set(e,h),punchgs.TweenLite.set(c,g),y(c,i,a))):(punchgs.TweenLite.set(e,h),punchgs.TweenLite.set(c,g))}},w=function(e,i,a,r){0===e.find(".tp-bullets").length&&(i.style=void 0===i.style?"":i.style,e.append('<rs-bullets style="opacity:0"  class="tp-bullets '+i.style+" "+i.direction+'"></rs-bullets>'));var o=e.find(".tp-bullets"),s=a.data("key"),n=i.tmp;void 0!==t[r].thumbs[a.index()]&&jQuery.each(t[r].thumbs[a.index()].params,function(e,t){n=n.replace(t.from,t.to)}),o.append('<rs-bullet data-key="'+s+'" class="justaddedbullet tp-bullet">'+n+"</rs-bullet>");var l=e.find(".justaddedbullet"),d=e.find(".tp-bullet").length,c=l.outerWidth()+parseInt(void 0===i.space?0:i.space,0),p=l.outerHeight()+parseInt(void 0===i.space?0:i.space,0);"vertical"===i.direction?(l.css({top:(d-1)*p+"px",left:"0px"}),o.css({height:(d-1)*p+l.outerHeight(),width:l.outerWidth()})):(l.css({left:(d-1)*c+"px",top:"0px"}),o.css({width:(d-1)*c+l.outerWidth(),height:l.outerHeight()})),void 0!==t[r].thumbs[a.index()]&&l.find(".tp-bullet-image").css({backgroundImage:"url("+t[r].thumbs[a.index()].src+")"}),l.click(function(){t[r].sc_indicator="bullet",e.revcallslidewithid(s),e.find(".tp-bullet").removeClass("selected"),jQuery(this).addClass("selected")}),l.removeClass("justaddedbullet"),i.padding_top=parseInt(t[r].carousel.padding_top||0,0),i.padding_bottom=parseInt(t[r].carousel.padding_bottom||0,0),"outer-left"!=i.position&&"outer-right"!=i.position||(t[r].outernav=!0),o.addClass("nav-pos-hor-"+i.h_align),o.addClass("nav-pos-ver-"+i.v_align),o.addClass("nav-dir-"+i.direction),b(o,i,r)},_=function(e,i,a,r,o){var s="tp-thumb"===r?".tp-thumbs":".tp-tabs",n="tp-thumb"===r?".tp-thumb-mask":".tp-tab-mask",l="tp-thumb"===r?".tp-thumbs-inner-wrapper":".tp-tabs-inner-wrapper",d="tp-thumb"===r?".tp-thumb":".tp-tab",c="tp-thumb"===r?".tp-thumb-image":".tp-tab-image",p="tp-thumb"===r?"rs-thumb":"rs-tab";if(i.visibleAmount=i.visibleAmount>t[o].slideamount?t[o].slideamount:i.visibleAmount,i.sliderLayout=t[o].sliderLayout,0===e.parent().find(s).length){i.style=void 0===i.style?"":i.style;var u="<"+p+'s style="opacity:0" class="'+r+"s "+(!0===i.span?"tp-span-wrapper":"")+" "+i.position+" "+i.style+'"><rs-navmask class="'+r+'-mask"><'+p+'s-wrap class="'+r+'s-inner-wrapper" style="position:relative;"></'+p+"s-wrap></rs-navmask></"+p+"s>";"outer-top"===i.position?e.parent().prepend(u):"outer-bottom"===i.position?e.after(u):e.append(u),"outer-left"!==i.position&&"outer-right"!==i.position||punchgs.TweenLite.set(t[o].c,{overflow:"visible"}),i.padding_top=parseInt(t[o].carousel.padding_top||0,0),i.padding_bottom=parseInt(t[o].carousel.padding_bottom||0,0),"outer-left"!=i.position&&"outer-right"!=i.position||(t[o].outernav=!0)}var h=a.data("key"),g=e.parent().find(s),f=g.find(n),m=f.find(l),v="horizontal"===i.direction?i.width*i.visibleAmount+i.space*(i.visibleAmount-1):i.width,y="horizontal"===i.direction?i.height:i.height*i.visibleAmount+i.space*(i.visibleAmount-1),w=i.tmp;void 0!==t[o].thumbs[a.index()]&&jQuery.each(t[o].thumbs[a.index()].params,function(e,t){w=w.replace(t.from,t.to)}),m.append("<"+p+' data-liindex="'+a.index()+'" data-key="'+h+'" class="justaddedthumb '+r+'" style="width:'+i.width+"px;height:"+i.height+'px;">'+w+"<"+p+">");var _=g.find(".justaddedthumb"),x=g.find(d).length,k=_.outerWidth()+parseInt(void 0===i.space?0:i.space,0),T=_.outerHeight()+parseInt(void 0===i.space?0:i.space,0);_.find(c).css({backgroundImage:"url("+t[o].thumbs[a.index()].src+")"}),"vertical"===i.direction?(_.css({top:(x-1)*T+"px",left:"0px"}),m.css({height:(x-1)*T+_.outerHeight(),width:_.outerWidth()})):(_.css({left:(x-1)*k+"px",top:"0px"}),m.css({width:(x-1)*k+_.outerWidth(),height:_.outerHeight()})),g.data("maxw",v),g.data("maxh",y),g.data("wr_padding",i.wrapper_padding);var L="outer-top"===i.position||"outer-bottom"===i.position?"relative":"absolute";f.css({maxWidth:v+"px",maxHeight:y+"px",overflow:"hidden",position:"relative"}),g.css({maxWidth:v+"px",maxHeight:y+"px",overflow:"visible",position:L,background:i.wrapper_color,padding:i.wrapper_padding+"px",boxSizing:"contet-box"}),_.click(function(){t[o].sc_indicator="bullet";var i=e.parent().find(l).data("distance");i=void 0===i?0:i,Math.abs(i)<10&&(e.revcallslidewithid(h),e.parent().find(s).removeClass("selected"),jQuery(this).addClass("selected"))}),_.removeClass("justaddedthumb"),g.addClass("nav-pos-hor-"+i.h_align),g.addClass("nav-pos-ver-"+i.v_align),g.addClass("nav-dir-"+i.direction),b(g,i,o),t.callContWidthManager(o)},x=function(e){var i=t[e].cpar.find(".outer-top"),a=t[e].cpar.find(".outer-bottom");t[e].top_outer=i.hasClass("tp-forcenotvisible")?0:i.outerHeight()||0,t[e].bottom_outer=a.hasClass("tp-forcenotvisible")?0:a.outerHeight()||0},k=function(e,t,i,a){t>i||i>a?e.addClass("tp-forcenotvisible"):e.removeClass("tp-forcenotvisible")}}(jQuery),function(e){"use strict";var t=jQuery.fn.revolution;jQuery.extend(!0,t,{stopPanZoom:function(e){null!=e.data("pztl")&&e.data("pztl").pause()},startPanZoom:function(e,i,a){var r=e.data(),o=e.find("rs-sbg"),s=o.data("lazyload")||o.data("src"),n=(r.owidth,r.oheight,"carousel"===t[i].sliderType?t[i].carousel.slide_width:t[i].canvas.width()),l=t[i].canvas.height();if(void 0!==r.panzoom&&null!==r.panzoom){if(e.data("pztl")&&e.data("pztl").kill(),a=a||0,0==e.find(".rs-pzimg").length){var d=o.data("mediafilter");d=void 0===d?"":d,e.append('<rs-pzimg-wrap class="'+d+'" style="z-index:2;width:100%;height:100%;top:0px;left:0px;position:absolute;display:block"><img class="rs-pzimg" src="'+s+'" style="position:absolute;" width="'+r.owidth+'" height="'+r.oheight+'"></rs-pzimg-wrap>'),e.data("pzimg",e.find(".rs-pzimg"))}var c=function(e,t,i,a,r,o,s){var n=e*i,l=t*i,d=Math.abs(a-n),c=Math.abs(r-l),p=new Object;return p.l=(0-o)*d,p.r=p.l+n,p.t=(0-s)*c,p.b=p.t+l,p.h=o,p.v=s,p};null!=e.data("pztl")&&(e.data("pztl").kill(),e.removeData("pztl"));var p=e.data("pzimg"),u=p.parent(),h=function(e,t,i){var a=void 0===i.panvalues?jQuery.extend(!0,{},function(e){var t=e.panzoom.split(";"),i={duration:10,ease:"Linear.easeNone",scalestart:1,scaleend:1,rotatestart:.01,rotateend:0,blurstart:0,blurend:0,offsetstart:"0/0",offsetend:"0/0"};for(var a in t)if(t.hasOwnProperty(a)){var r=t[a].split(":"),o=r[0],s=r[1];switch(o){case"d":i.duration=parseInt(s,0)/1e3;break;case"e":i.ease=s;break;case"ss":i.scalestart=parseInt(s,0)/100;break;case"se":i.scaleend=parseInt(s,0)/100;break;case"rs":i.rotatestart=parseInt(s,0);break;case"re":i.rotateend=parseInt(s,0);break;case"bs":i.blurstart=parseInt(s,0);break;case"be":i.blurend=parseInt(s,0);break;case"os":i.offsetstart=s;break;case"oe":i.offsetend=s}}return i.offsetstart=i.offsetstart.split("/")||[0,0],i.offsetend=i.offsetend.split("/")||[0,0],i.rotatestart=0===i.rotatestart?.01:i.rotatestart,e.panvalues=i,e.bgposition="center center"==e.bgposition?"50% 50%":e.bgposition,i}(i)):jQuery.extend(!0,{},i.panvalues),r=a.offsetstart,o=a.offsetend,s={start:{width:e,height:e/i.owidth*i.oheight,rotation:a.rotatestart+"deg",scale:a.scalestart,transformOrigin:i.bgposition},starto:{},end:{rotation:a.rotateend+"deg",scale:a.scaleend},endo:{}};a.scalestart,i.owidth,i.oheight,a.scaleend,i.owidth,i.oheight;if(s.start.height<t){var n=t/s.start.height;s.start.height=t,s.start.width=s.start.width*n}var l=function(e,t,i,a){var r=e.bgposition.split(" ")||"center center",o="center"==r[0]?"50%":"left"==r[0]||"left"==r[1]?"0%":"right"==r[0]||"right"==r[1]?"100%":r[0],s="center"==r[1]?"50%":"top"==r[0]||"top"==r[1]?"0%":"bottom"==r[0]||"bottom"==r[1]?"100%":r[1];o=parseInt(o,0)/100||0,s=parseInt(s,0)/100||0;var n=new Object;return n.start=c(a.start.width,a.start.height,a.start.scale,t,i,o,s),n.end=c(a.start.width,a.start.height,a.end.scale,t,i,o,s),n}(i,e,t,s);r[0]=parseFloat(r[0])+l.start.l,o[0]=parseFloat(o[0])+l.end.l,r[1]=parseFloat(r[1])+l.start.t,o[1]=parseFloat(o[1])+l.end.t;var d=l.start.r-l.start.l,p=l.start.b-l.start.t,u=l.end.r-l.end.l,h=l.end.b-l.end.t;return r[0]=r[0]>0?0:d+r[0]<e?e-d:r[0],o[0]=o[0]>0?0:u+o[0]<e?e-u:o[0],r[1]=r[1]>0?0:p+r[1]<t?t-p:r[1],o[1]=o[1]>0?0:h+o[1]<t?t-h:o[1],s.starto.x=r[0]+"px",s.starto.y=r[1]+"px",s.endo.x=o[0]+"px",s.endo.y=o[1]+"px",s.end.ease=s.endo.ease=a.ease,s.end.force3D=s.endo.force3D=!0,s}(n,l,r),g=new punchgs.TimelineLite;if(g.pause(),h.start.transformOrigin="0% 0%",h.starto.transformOrigin="0% 0%",r.panvalues.duration=NaN===r.panvalues.duration||void 0===r.panvalues.duration?10:r.panvalues.duration,g.add(punchgs.TweenLite.fromTo(p,r.panvalues.duration,h.start,h.end),0),g.add(punchgs.TweenLite.fromTo(u,r.panvalues.duration,h.starto,h.endo),0),void 0!==r.panvalues.blurstart&&void 0!==r.panvalues.blurend&&(0!==r.panvalues.blurstart||0!==r.panvalues.blurend)){var f={a:r.panvalues.blurstart},m={a:r.panvalues.blurend,ease:h.endo.ease},v=new punchgs.TweenLite(f,r.panvalues.duration,m);v.eventCallback("onUpdate",function(e){punchgs.TweenLite.set(e,{filter:"blur("+f.a+"px)",webkitFilter:"blur("+f.a+"px)"})},[u]),g.add(v,0)}g.progress(a),g.play(),e.data("pztl",g)}}})}(jQuery),function(e){"use strict";var t=jQuery.fn.revolution,i=t.is_mobile();jQuery.extend(!0,t,{checkForParallax:function(e){var a=t[e].parallax;if(!a.done){if(a.done=!0,i&&a.disable_onmobile)return!1;if(("3D"==a.type||"3d"==a.type)&&(punchgs.TweenLite.set(t[e].c,{overflow:a.ddd_overflow}),punchgs.TweenLite.set(t[e].canvas,{overflow:a.ddd_overflow}),"carousel"!=t[e].sliderType&&a.ddd_shadow)){var r=jQuery('<div class="dddwrappershadow"></div>');punchgs.TweenLite.set(r,{force3D:"auto",transformPerspective:1600,transformOrigin:"50% 50%",width:"100%",height:"100%",position:"absolute",top:0,left:0,zIndex:0}),t[e].c.prepend(r)}t[e].slides.each(function(){n(jQuery(this))}),("3D"==a.type||"3d"==a.type)&&t[e].c.find("rs-static-layers").length>0&&(punchgs.TweenLite.set(t[e].c.find("rs-static-layers"),{top:0,left:0,width:"100%",height:"100%"}),n(t[e].c.find("rs-static-layers"))),a.pcontainers=[],a.pcontainer_depths=[],a.bgcontainers=[],a.bgcontainer_depths=[],a.speed=void 0===a.speed?0:parseInt(a.speed,0),a.speedbg=void 0===a.speedbg?0:parseInt(a.speedbg,0),a.speedls=void 0===a.speedls?0:parseInt(a.speedls,0),t[e].c.find("rs-slide rs-sbg-wrap, rs-slide rs-bgvideo").each(function(){var i=jQuery(this),r=i.data("parallax");void 0!==(r="on"==r||!0===r?1:r)&&"off"!==r&&!1!==r&&(a.bgcontainers.push(i.closest("rs-sbg-px")),a.bgcontainer_depths.push(t[e].parallax.levels[parseInt(r,0)-1]/100))});for(var o=1;o<=a.levels.length;o++)t[e].c.find(".rs-pxl-"+o).each(function(){var e=jQuery(this),t=this.className.indexOf("rs-pxmask")>=0?e.closest("rs-px-mask"):e.closest(".rs-parallax-wrap");t.data("parallaxlevel",a.levels[o-1]),t.addClass("tp-parallax-container"),a.pcontainers.push(t),a.pcontainer_depths.push(a.levels[o-1])});"mouse"!=a.type&&"mousescroll"!=a.type&&"3D"!=a.type&&"3d"!=a.type||(t[e].c.mouseenter(function(i){var a=t[e].c.offset().top,r=t[e].c.offset().left;void 0!==t[e].pr_active_key&&(t[e].slides[t[e].pr_active_key].dataset.enterx=i.pageX-r,t[e].slides[t[e].pr_active_key].dataset.entery=i.pageY-a)}),t[e].c.on("mousemove.hoverdir, mouseleave.hoverdir, trigger3dpath",function(i,r){var o=r&&r.li?r.li:jQuery(t[e].slides[t[e].pr_active_key]);if("enterpoint"==a.origo){var s=t[e].c.offset().top,n=t[e].c.offset().left;null==o.data("enterx")&&o.data("enterx",i.pageX-n),null==o.data("entery")&&o.data("entery",i.pageY-s);var l=o.data("enterx")||i.pageX-n,d=o.data("entery")||i.pageY-s,c=l-(i.pageX-n),p=d-(i.pageY-s),u=a.speed/1e3||.4}else s=t[e].c.offset().top,n=t[e].c.offset().left,c=t[e].conw/2-(i.pageX-n),p=t[e].conh/2-(i.pageY-s),u=a.speed/1e3||3;"mouseleave"==i.type&&(c=a.ddd_lasth||0,p=a.ddd_lastv||0,u=1.5);for(var h=0;h<a.pcontainers.length;h++){var g=a.pcontainers[h],f=a.pcontainer_depths[h],m="3D"==a.type||"3d"==a.type?f/200:f/100,v=c*m,y=p*m;"mousescroll"==a.type?punchgs.TweenLite.to(g,u,{force3D:"auto",x:v,ease:punchgs.Power3.easeOut,overwrite:"all"}):punchgs.TweenLite.to(g,u,{force3D:"auto",x:v,y:y,ease:punchgs.Power3.easeOut,overwrite:"all"})}if("3D"==a.type||"3d"==a.type){var b="rs-slide .dddwrapper, .dddwrappershadow, rs-slide .dddwrapper-layer, rs-static-layers .dddwrapper-layer";"carousel"===t[e].sliderType&&(b="rs-slide .dddwrapper, rs-slide .dddwrapper-layer, rs-static-layers .dddwrapper-layer"),t[e].c.find(b).each(function(){var r=jQuery(this),o=a.levels[a.levels.length-1]/200,s=c*o,n=p*o,l=0==t[e].conw?0:Math.round(c/t[e].conw*o*100)||0,d=0==t[e].conh?0:Math.round(p/t[e].conh*o*100)||0,h=r.closest("rs-slide"),g=0,f=!1;r.hasClass("dddwrapper-layer")&&(g=a.ddd_z_correction||65,f=!0),r.hasClass("dddwrapper-layer")&&(s=0,n=0),h.index()===t[e].pr_active_key||"carousel"!=t[e].sliderType?!a.ddd_bgfreeze||f?punchgs.TweenLite.to(r,u,{rotationX:d,rotationY:-l,x:s,z:g,y:n,ease:punchgs.Power3.easeOut,overwrite:"all"}):punchgs.TweenLite.to(r,.5,{force3D:"auto",rotationY:0,rotationX:0,z:0,ease:punchgs.Power3.easeOut,overwrite:"all"}):punchgs.TweenLite.to(r,.5,{force3D:"auto",rotationY:0,x:0,y:0,rotationX:0,z:0,ease:punchgs.Power3.easeOut,overwrite:"all"}),"mouseleave"==i.type&&punchgs.TweenLite.to(jQuery(this),3.8,{z:0,ease:punchgs.Power3.easeOut})})}}),i&&(window.ondeviceorientation=function(i){var r=Math.round(i.beta||0)-70,o=Math.round(i.gamma||0),s=jQuery(t[e].slides[t[e].pr_active_key]);if(jQuery(window).width()>jQuery(window).height()){var n=o;o=r,r=n}var l=t[e].c.width(),d=t[e].c.height(),c=360/l*o,p=180/d*r,u=a.speed/1e3||3,h=[];if(s.find(".tp-parallax-container").each(function(e){h.push(jQuery(this))}),t[e].c.find("rs-static-layers .tp-parallax-container").each(function(){h.push(jQuery(this))}),jQuery.each(h,function(){var e=jQuery(this),t=parseInt(e.data("parallaxlevel"),0)/100,i=c*t*2,a=p*t*4;punchgs.TweenLite.to(e,u,{force3D:"auto",x:i,y:a,ease:punchgs.Power3.easeOut,overwrite:"all"})}),"3D"==a.type||"3d"==a.type){var g="rs-slide .dddwrapper, .dddwrappershadow, rs-slide .dddwrapper-layer, rs-static-layers .dddwrapper-layer";"carousel"===t[e].sliderType&&(g="rs-slide .dddwrapper, rs-slide .dddwrapper-layer, rs-static-layers .dddwrapper-layer"),t[e].c.find(g).each(function(){var r=jQuery(this),o=a.levels[a.levels.length-1]/200,s=c*o,n=p*o*3,l=0==t[e].conw?0:Math.round(c/t[e].conw*o*500)||0,d=0==t[e].conh?0:Math.round(p/t[e].conh*o*700)||0,h=r.closest("rs-slide"),g=0,f=!1;r.hasClass("dddwrapper-layer")&&(g=a.ddd_z_correction||65,f=!0),r.hasClass("dddwrapper-layer")&&(s=0,n=0),h.hasClass("active-rs-slide")||"carousel"!=t[e].sliderType?!a.ddd_bgfreeze||f?punchgs.TweenLite.to(r,u,{rotationX:d,rotationY:-l,x:s,z:g,y:n,ease:punchgs.Power3.easeOut,overwrite:"all"}):punchgs.TweenLite.to(r,.5,{force3D:"auto",rotationY:0,rotationX:0,z:0,ease:punchgs.Power3.easeOut,overwrite:"all"}):punchgs.TweenLite.to(r,.5,{force3D:"auto",rotationY:0,z:0,x:0,y:0,rotationX:0,ease:punchgs.Power3.easeOut,overwrite:"all"}),"mouseleave"==i.type&&punchgs.TweenLite.to(jQuery(this),3.8,{z:0,ease:punchgs.Power3.easeOut})})}}));var s=t[e].scrolleffect;s.set&&(s.multiplicator_layers=parseFloat(s.multiplicator_layers),s.multiplicator=parseFloat(s.multiplicator)),void 0!==s._L&&0===s._L.length&&(s._L=!1),void 0!==s.bgs&&0===s.bgs.length&&(s.bgs=!1),t.scrollTicker(e)}function n(i){if("3D"==a.type||"3d"==a.type){i.find("rs-sbg-wrap").wrapAll('<div class="dddwrapper" style="width:100%;height:100%;position:absolute;top:0px;left:0px;overflow:hidden"></div>'),i.find(".rs-parallax-wrap").wrapAll('<div class="dddwrapper-layer" style="width:100%;height:100%;position:absolute;top:0px;left:0px;z-index:5;overflow:'+a.ddd_layer_overflow+';"></div>'),i.find(".rs-pxl-tobggroup").closest(".rs-parallax-wrap").wrapAll('<div class="dddwrapper-layertobggroup" style="position:absolute;top:0px;left:0px;z-index:50;width:100%;height:100%"></div>');var r=i.find(".dddwrapper"),o=i.find(".dddwrapper-layer");i.find(".dddwrapper-layertobggroup").appendTo(r),"carousel"==t[e].sliderType&&(a.ddd_shadow&&r.addClass("dddwrappershadow"),punchgs.TweenLite.set(r,{borderRadius:t[e].carousel.border_radius})),punchgs.TweenLite.set(i,{overflow:"visible",transformStyle:"preserve-3d",perspective:1600}),punchgs.TweenLite.set(r,{force3D:"auto",transformOrigin:"50% 50%",transformStyle:"preserve-3d",transformPerspective:1600}),punchgs.TweenLite.set(o,{force3D:"auto",transformOrigin:"50% 50%",zIndex:5,transformStyle:"flat",transformPerspective:1600}),punchgs.TweenLite.set(t[e].canvas,{transformStyle:"preserve-3d",transformPerspective:1600})}}},scrollTicker:function(e){1!=t[e].scrollTicker&&(t[e].scrollTicker=!0,i?(punchgs.TweenLite.ticker.fps(150),punchgs.TweenLite.ticker.addEventListener("tick",function(){t.scrollHandling(e)},t[e].c,!1,1)):document.addEventListener("scroll",function(i){t.scrollHandling(e,!0)},{passive:!0})),t.scrollHandling(e,!0)},scrollHandling:function(e,a,r,o){if(void 0!==t[e]){if(t[e].lastwindowheight=t[e].lastwindowheight||window.innerHeight,t[e].conh=0===t[e].conh||void 0===t[e].conh?t[e].infullscreenmode?t[e].minHeight:t[e].c.height():t[e].conh,t[e].lastscrolltop==window.scrollY&&!t[e].duringslidechange&&!a)return!1;punchgs.TweenLite.delayedCall(.2,function(e,i){t[e].lastscrolltop=i},[e,window.scrollY]);var s=void 0!==t[e].topc?t[e].topc[0].getBoundingClientRect():0===t[e].c.height()?t[e].cpar[0].getBoundingClientRect():t[e].c[0].getBoundingClientRect(),n=t[e].viewPort,l=t[e].parallax,d=t[e].slides[void 0===t[e].pr_active_key?0:t[e].pr_active_key];s.hheight=0===s.height?0===t[e].c.height()?t[e].cpar.height():t[e].c.height():s.height;var c=s.top<0||s.hheight>t[e].lastwindowheight?s.top/s.hheight:s.bottom>t[e].lastwindowheight?(s.bottom-t[e].lastwindowheight)/s.hheight:0,p=t[e].fixedOnTop?Math.min(1,Math.max(0,window.scrollY/t[e].lastwindowheight)):Math.min(1,Math.max(0,1-(s.top+s.hheight)/(s.hheight+t[e].lastwindowheight))),u=s.top>=0&&s.top<=t[e].lastwindowheight||s.top<=0&&s.bottom>=0||s.top<=0&&s.bottom>=0;t[e].scrollproc=c,t.callBackHandling&&t.callBackHandling(e,"parallax","start");var h=Math.max(0,1-Math.abs(c));if(u?t[e].sbtimeline.fixed?(t[e].curheight=void 0===t[e].curheight?t[e].cpar.height():t[e].curheight,void 0===t[e].sbtimeline.rest&&t.updateFixedScrollTimes(e),s.top>=0&&s.top<=t[e].lastwindowheight?(p=t[e].sbtimeline.fixStart*(1-s.top/t[e].lastwindowheight)/1e3,t[e].topc.removeClass("rs-fixedscrollon"),punchgs.TweenLite.set(t[e].cpar,{top:0})):s.top<=0&&s.bottom>=t[e].curheight?(t[e].topc.addClass("rs-fixedscrollon"),punchgs.TweenLite.set(t[e].cpar,{top:0}),p=(t[e].sbtimeline.fixStart+t[e].sbtimeline.time*(Math.abs(s.top)/(s.hheight-t[e].curheight)))/1e3):(punchgs.TweenLite.set(t[e].cpar,{top:s.height-t[e].curheight}),t[e].topc.removeClass("rs-fixedscrollon"),p=(t[e].sbtimeline.fixEnd+t[e].sbtimeline.rest*(1-s.bottom/t[e].curheight))/1e3)):p=t[e].duration*p/1e3:t[e].sbtimeline.fixed&&(t[e].topc.removeClass("rs-fixedscrollon"),punchgs.TweenLite.set(t[e].cpar,{top:0})),n.enable&&(void 0===t[e].viewPort.vaType&&t.updateVisibleArea(e),"%"===n.vaType[t[e].level]&&n.visible_area[t[e].level]<=h||"px"===n.vaType[t[e].level]&&(s.top<=0&&s.bottom>=t[e].lastwindowheight||s.top>=0&&s.bottom<=t[e].lastwindowheight||s.top>=0&&s.top<t[e].lastwindowheight-n.visible_area[t[e].level]||s.bottom>=n.visible_area[t[e].level]&&s.bottom<t[e].lastwindowheight)?t[e].inviewport||(t[e].inviewport=!0,t.enterInViewPort(e)):t[e].inviewport&&(t[e].inviewport=!1,t.leaveViewPort(e))),u&&void 0!==d&&void 0!==d.dataset&&void 0!==d.dataset.key&&!0!==o)for(var g in t[e].sbas[d.dataset.key])void 0===t[e]._L[g]||void 0===t[e]._L[g].timeline||1!=t[e]._L[g].animationonscroll&&"true"!=t[e]._L[g].animationonscroll||(void 0!==t[e]._L[g].scrollBasedOffset&&(p+=t[e]._L[g].scrollBasedOffset),p>0&&t[e]._L[g].animOnScrollRepeats<5?(t[e]._L[g].timeline.time(p),t[e]._L[g].animOnScrollRepeats++):punchgs.TweenMax.to(t[e]._L[g].timeline,t[e].sbtimeline.speed,{time:p,ease:t[e].sbtimeline.ease}));if(i&&l.disable_onmobile)return!1;if("3d"!=l.type&&"3D"!=l.type){if(("scroll"==l.type||"mousescroll"==l.type)&&l.pcontainers)for(var f=0;f<l.pcontainers.length;f++)if(l.pcontainers[f].length>0){var m=l.pcontainers[f],v=l.pcontainer_depths[f]/100,y=Math.round(c*(-v*t[e].conh)*10)/10||0,b=void 0!==r?r:l.speedls/1e3||0;m.data("parallaxoffset",y),punchgs.TweenLite.to(m,b,{overwrite:"auto",force3D:"auto",y:y})}if(l.bgcontainers)for(f=0;f<l.bgcontainers.length;f++){var w=l.bgcontainers[f];y=c*(-l.bgcontainer_depths[f]*t[e].conh)||0,b=void 0!==r?r:l.speedbg/1e3||.015;b=void 0!==t[e].parallax.lastBGY&&0===b&&Math.abs(y-t[e].parallax.lastBGY)>50?.15:b,punchgs.TweenLite.to(w,b,{position:"absolute",top:"0px",left:"0px",backfaceVisibility:"hidden",force3D:"true",y:y+"px"}),t[e].parallax.lastBGY=y}}var _=t[e].scrolleffect;if(_.set&&(!_.mobile||!i)){var x=Math.abs(c)-_.tilt/100;if(x=x<0?0:x,!1!==_._L){var k=1-x*_.multiplicator_layers,T={force3D:"true"};if("top"==_.direction&&c>=0&&(k=1),"bottom"==_.direction&&c<=0&&(k=1),k=k>1?1:k<0?0:k,_.fade&&(T.opacity=k),_.scale){var L=k;T.scale=1-L+1}if(_.blur){var R=(1-k)*_.maxblur;T["-webkit-filter"]="blur("+R+"px)",T.filter="blur("+R+"px)"}if(_.grayscale){var I="grayscale("+100*(1-k)+"%)";T["-webkit-filter"]=void 0===T["-webkit-filter"]?I:T["-webkit-filter"]+" "+I,T.filter=void 0===T.filter?I:T.filter+" "+I}punchgs.TweenLite.set(_._L,T)}if(!1!==_.bgs){k=1-x*_.multiplicator,T={backfaceVisibility:"hidden",force3D:"true"};for(var z in"top"==_.direction&&c>=0&&(k=1),"bottom"==_.direction&&c<=0&&(k=1),k=k>1?1:k<0?0:k,_.bgs)if(_.bgs.hasOwnProperty(z)){if(_.bgs[z].fade&&(T.opacity=k),_.bgs[z].blur){R=(1-k)*_.maxblur;T["-webkit-filter"]="blur("+R+"px)",T.filter="blur("+R+"px)"}if(_.bgs[z].grayscale){I="grayscale("+100*(1-k)+"%)";T["-webkit-filter"]=void 0===T["-webkit-filter"]?I:T["-webkit-filter"]+" "+I,T.filter=void 0===T.filter?I:T.filter+" "+I}punchgs.TweenLite.set(_.bgs[z].c,T)}}}t.callBackHandling&&t.callBackHandling(e,"parallax","end")}}})}(jQuery),function(e){"use strict";var t=jQuery.fn.revolution;jQuery.extend(!0,t,{animateSlide:function(e){return a(e)}});var i=function(e,t){var i;return void 0!==(i=jQuery.isArray(e)?e.length>=t?e[t]:e[e.length-1]:e)&&jQuery.isNumeric(i)?parseInt(e,0):i},a=function(e){var a=e.id,o="arrow"==t[a].sc_indicator?void 0===t[a].sc_indicator_dir?t[a].sdir:t[a].sc_indicator_dir:t[a].sdir,s=!0===e.recall?jQuery.extend(!0,{},t[a].lastSliderTransition):function(e,i,a){var r="Power1.easeIn",o="Power1.easeOut",s="Power1.easeInOut",n="Power2.easeIn",l="Power2.easeOut",d="Power2.easeInOut",c="Power3.easeInOut",p=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45],u=[17,18,19,20,21,22,23,24,25,27],h=0,g=1,f=0,m=[["boxslide",0,0,10,"box",!1,null,0,o,o,1e3,6],["boxrandomrotate",0,1,10,"box",!1,null,60,o,o,1e3,6],["boxfade",1,0,10,"box",!1,null,1,s,s,1e3,5],["slotslide-horizontal",2,0,0,"horizontal",!0,!1,2,d,d,1e3,3],["slotslide-vertical",3,0,0,"vertical",!0,!1,3,d,d,1e3,3],["curtain-1",4,3,0,"horizontal",!0,!0,4,o,o,900,5],["curtain-2",5,3,0,"horizontal",!0,!0,5,o,o,900,5],["curtain-3",6,3,25,"horizontal",!0,!0,6,o,o,900,5],["slotzoom-horizontal",7,0,0,"horizontal",!0,!0,7,o,o,1e3,7],["slotzoom-vertical",8,0,0,"vertical",!0,!0,8,l,l,1e3,8],["slotzoom-mixed",8,1,0,"vertical",!0,!0,59,l,l,1e3,8],["slotfade-horizontal",9,0,0,"horizontal",!0,null,9,d,d,1500,10],["slotfade-vertical",10,0,0,"vertical",!0,null,10,d,d,1500,10],["crossfade-horizontal",9,0,0,"horizontal",!0,null,9,d,d,0,10],["crossfade-vertical",10,0,0,"vertical",!0,null,10,d,d,0,10],["fade",11,0,1,"horizontal",!0,null,11,d,d,1e3,1],["crossfade",11,1,1,"horizontal",!0,null,11,d,d,1e3,1],["fadethroughdark",11,2,1,"horizontal",!0,null,11,d,d,1e3,1],["fadethroughlight",11,3,1,"horizontal",!0,null,11,d,d,1e3,1],["fadethroughtransparent",11,4,1,"horizontal",!0,null,11,d,d,1e3,1],["slideleft",12,0,1,"horizontal",!0,!0,12,c,c,1e3,1],["slideup",13,0,1,"horizontal",!0,!0,13,c,c,1e3,1],["slidedown",14,0,1,"horizontal",!0,!0,14,c,c,1e3,1],["slideright",15,0,1,"horizontal",!0,!0,15,c,c,1e3,1],["slideoverleft",12,7,1,"horizontal",!0,!0,12,c,c,1e3,1],["slideoverup",13,7,1,"horizontal",!0,!0,13,c,c,1e3,1],["slideoverdown",14,7,1,"horizontal",!0,!0,14,c,c,1e3,1],["slideoverright",15,7,1,"horizontal",!0,!0,15,c,c,1e3,1],["slideremoveleft",12,8,1,"horizontal",!0,!0,12,c,c,1e3,1],["slideremoveup",13,8,1,"horizontal",!0,!0,13,c,c,1e3,1],["slideremovedown",14,8,1,"horizontal",!0,!0,14,c,c,1e3,1],["slideremoveright",15,8,1,"horizontal",!0,!0,15,c,c,1e3,1],["papercut",16,0,0,"vertical",null,!0,16,c,c,1e3,2],["3dcurtain-horizontal",17,0,20,"vertical",!0,!0,17,s,s,2e3,7],["3dcurtain-vertical",18,0,10,"horizontal",!0,!0,18,s,s,2e3,7],["cubic",19,0,20,"horizontal",!1,!0,19,d,d,1e3,1],["cube",19,0,20,"horizontal",!1,!0,20,d,d,1e3,1],["flyin",20,0,4,"vertical",!1,!0,21,"Power3.easeOut",c,1e3,1],["turnoff",21,0,1,"horizontal",!1,!0,22,c,c,1e3,1],["incube",22,0,20,"horizontal",!1,!0,23,d,d,1e3,1],["cubic-horizontal",23,0,20,"vertical",!1,!0,24,d,d,1e3,1],["cube-horizontal",23,0,20,"vertical",!1,!0,25,d,d,1e3,1],["incube-horizontal",24,0,20,"vertical",!1,!0,26,d,d,1e3,1],["turnoff-vertical",25,0,1,"horizontal",!1,!0,27,d,d,1e3,1],["fadefromright",12,1,1,"horizontal",!0,!0,28,d,d,1e3,1],["fadefromleft",15,1,1,"horizontal",!0,!0,29,d,d,1e3,1],["fadefromtop",14,1,1,"horizontal",!0,!0,30,d,d,1e3,1],["fadefrombottom",13,1,1,"horizontal",!0,!0,31,d,d,1e3,1],["fadetoleftfadefromright",12,2,1,"horizontal",!0,!0,32,d,d,1e3,1],["fadetorightfadefromleft",15,2,1,"horizontal",!0,!0,33,d,d,1e3,1],["fadetobottomfadefromtop",14,2,1,"horizontal",!0,!0,34,d,d,1e3,1],["fadetotopfadefrombottom",13,2,1,"horizontal",!0,!0,35,d,d,1e3,1],["parallaxtoright",15,3,1,"horizontal",!0,!0,36,d,d,1500,1],["parallaxtoleft",12,3,1,"horizontal",!0,!0,37,d,d,1500,1],["parallaxtotop",14,3,1,"horizontal",!0,!0,38,d,d,1500,1],["parallaxtobottom",13,3,1,"horizontal",!0,!0,39,d,d,1500,1],["scaledownfromright",12,4,1,"horizontal",!0,!0,40,d,n,1e3,1],["scaledownfromleft",15,4,1,"horizontal",!0,!0,41,d,n,1e3,1],["scaledownfromtop",14,4,1,"horizontal",!0,!0,42,d,n,1e3,1],["scaledownfrombottom",13,4,1,"horizontal",!0,!0,43,d,n,1e3,1],["zoomout",13,5,1,"horizontal",!0,!0,44,d,d,1e3,1],["zoomin",13,6,1,"horizontal",!0,!0,45,d,d,1e3,1],["slidingoverlayup",27,0,1,"horizontal",!0,!0,47,s,o,2e3,1],["slidingoverlaydown",28,0,1,"horizontal",!0,!0,48,s,o,2e3,1],["slidingoverlayright",30,0,1,"horizontal",!0,!0,49,s,o,2e3,1],["slidingoverlayleft",29,0,1,"horizontal",!0,!0,50,s,o,2e3,1],["parallaxcirclesup",31,0,1,"horizontal",!0,!0,51,d,r,1500,1],["parallaxcirclesdown",32,0,1,"horizontal",!0,!0,52,d,r,1500,1],["parallaxcirclesright",33,0,1,"horizontal",!0,!0,53,d,r,1500,1],["parallaxcirclesleft",34,0,1,"horizontal",!0,!0,54,d,r,1500,1],["notransition",26,0,1,"horizontal",!0,null,46,d,n,1e3,1],["parallaxright",15,3,1,"horizontal",!0,!0,55,d,n,1500,1],["parallaxleft",12,3,1,"horizontal",!0,!0,56,d,n,1500,1],["parallaxup",14,3,1,"horizontal",!0,!0,57,d,r,1500,1],["parallaxdown",13,3,1,"horizontal",!0,!0,58,d,r,1500,1],["grayscale",11,5,1,"horizontal",!0,null,11,d,d,1e3,1],["grayscalecross",11,6,1,"horizontal",!0,null,11,d,d,1e3,1],["brightness",11,7,1,"horizontal",!0,null,11,d,d,1e3,1],["brightnesscross",11,8,1,"horizontal",!0,null,11,d,d,1e3,1],["blurlight",11,9,1,"horizontal",!0,null,11,d,d,1e3,1],["blurlightcross",11,10,1,"horizontal",!0,null,11,d,d,1e3,1],["blurstrong",11,9,1,"horizontal",!0,null,11,d,d,1e3,1],["blurstrongcross",11,10,1,"horizontal",!0,null,11,d,d,1e3,1]];return t[e].duringslidechange=!0,jQuery.each(["parallaxcircles","slidingoverlay","slide","slideover","slideremove","parallax","parralaxto"],function(e,t){i==t+"horizontal"&&(i=1!=a?t+"left":t+"right"),i==t+"vertical"&&(i=1!=a?t+"up":t+"down")}),"random"==i?i=Math.min(Math.round(Math.random()*(m.length-1)),m.length-1):"random-static"==i?i=p[Math.min(Math.round(Math.random()*p.length-1),p.length-1)]:"random-premium"==i&&(i=u[Math.min(Math.round(Math.random()*u.length-1),u.length-1)]),1==t[e].isJoomla&&null!=window.MooTools&&-1!=[12,13,14,15,16,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45].indexOf(i)&&(i=u[Math.max(0,Math.min(u.length-1,Math.round(Math.random()*(u.length-2))+1))]),jQuery.each(m,function(e,t){t[0]!=i&&t[7]!=i||(h=t[1],g=t[2],f=e)}),{nTR:h=Math.max(0,Math.min(30,h)),TR:m[f],trC:g}}(a,e.animation.transition[e.ntrid],o),n=t[a].pr_next_bg&&void 0!==t[a].pr_next_bg.data("panzoom")&&(s.nTR<11||17==s.nTR||18===s.nTR||s.nTR>=27&&s.nTR<=30)?11:s.nTR;!0!==e.recall?(t[a].lastSliderAnimation=jQuery.extend(!0,{},e.animation),t[a].lastSliderTransition=jQuery.extend(!0,{},s)):e.animation=jQuery.extend(!0,{},t[a].lastSliderAnimation);var l=!0===e.recall?s.ntrid:e.ntrid||0,d=i(e.animation.masterspeed,l);d=(d="default"===d||"d"===d?s.TR[10]:"random"===d?Math.round(1e3*Math.random()+300):null!=d?parseInt(d,0):s.TR[10])>t[a].duration?t[a].duration:d,t[a].rotate=i(e.animation.rotate,l),t[a].rotate=null==t[a].rotate||"default"==t[a].rotate||"d"==t[a].rotate?0:999==t[a].rotate||"random"==t[a].rotate?Math.round(360*Math.random()):t[a].rotate,t[a].rotate=window._rs_ie||window._rs_ie9?0:t[a].rotate,(n<11||16===n||17===n||18===n||s.nTR>=27&&s.nTR<=30)&&(t[a].slots=i(e.animation.slotamount,l),t[a].slots=null==t[a].slots||"default"==t[a].slots||"d"==t[a].slots?s.TR[11]:"random"==t[a].slots?Math.round(12*Math.random()+4):t[a].slots,t[a].slots=t[a].slots<1?"boxslide"==s.TR[0]?Math.round(6*Math.random()+3):"boxslide"==s.TR[0]||"flyin"==s.TR[0]?Math.round(4*Math.random()+1):t[a].slots:t[a].slots,t[a].slots=(4==n||5==n||6==n)&&t[a].slots<3?3:t[a].slots,t[a].slots=0!=s.TR[3]?Math.min(t[a].slots,s.TR[3]):t[a].slots,t[a].slots=9==n?t[a].width/t[a].slots:10==n?t[a].height/t[a].slots:t[a].slots,t[a].slots=jQuery.inArray(n,[19,20,21,22,23,24,25,27])>=0?1:t[a].slots,t[a].slots=3!=n&&8!=n&&10!=n||"vertical"!==s.TR[4]?t[a].slots:t[a].slots+2,null!=s.TR[6]&&r(t[a].pr_active_bg,a,s.TR[6],s.TR[4]),null!=s.TR[5]&&r(t[a].pr_next_bg,a,s.TR[5],s.TR[4]),t[a].mtl.delay(.075));var c=7===n||16===n||8===n||17===n||18===n?0:1,p=n<11||17===n||18===n?0:1;t[a].mtl.add(punchgs.TweenLite.set(t[a].pr_active_bg.find("rs-sbg"),{scale:1,rotationX:0,rotationY:0,rotationZ:0,z:0,top:0,left:0,x:0,y:0,clearProps:"filter, transform",opacity:c}),0),t[a].mtl.add(punchgs.TweenLite.set(t[a].pr_next_bg.find("rs-sbg"),{scale:1,rotationX:0,rotationY:0,rotationZ:0,z:0,top:0,left:0,x:0,y:0,clearProps:"filter, transform",opacity:p}),0),t[a].mtl.add(punchgs.TweenLite.set(t[a].pr_next_bg,{transformOrigin:"50% 50% 0",transformPerspective:600,scale:1,rotationX:0,rotationY:0,rotationZ:0,z:0,autoAlpha:1,top:0,left:0,x:0,y:0,clearProps:"filter, transform"}),0),t[a].mtl.add(punchgs.TweenLite.set(t[a].pr_active_bg,{transformOrigin:"50% 50% 0",transformPerspective:600,scale:1,rotationX:0,rotationY:0,rotationZ:0,z:0,autoAlpha:1,top:0,left:0,x:0,y:0,clearProps:"filter, transform"}),0),t[a].mtl.add(punchgs.TweenLite.set(t[a].pr_next_bg.parent(),{backgroundColor:"transparent"}),0),t[a].mtl.add(punchgs.TweenLite.set(t[a].pr_active_bg.parent(),{backgroundColor:"transparent"}),0);var u=i(e.animation.easein,l),h=i(e.animation.easeout,l);if(u="default"===u||"d"===u?s.TR[8]||punchgs.Power2.easeInOut:u||s.TR[8]||punchgs.Power2.easeInOut,h="default"===h||"d"===h?s.TR[9]||punchgs.Power2.easeInOut:h||s.TR[9]||punchgs.Power2.easeInOut,0==n){var g=Math.ceil(t[a].height/t[a].sloth),f=0;t[a].pr_next_bg.find(".slotslide").each(function(e){f=++f===g?0:f,t[a].rotate=1===s.trC?45:t[a].rotate,t[a].mtl.add(punchgs.TweenLite.from(this,d/2e3,{opacity:0,transformStyle:"flat",transformPerspective:600,scale:0,rotationZ:0!==t[a].rotate?Math.random()*t[a].rotate-t[a].rotate/2:0,force3D:"auto",ease:u}),(10*e+30*f)/3e3)})}else if(1==n)t[a].pr_next_bg.find(".slotslide").each(function(e){t[a].mtl.add(punchgs.TweenLite.from(this,(Math.random()*d+300)/1e3,{autoAlpha:0,force3D:"auto",rotation:t[a].rotate,ease:u}),(500*Math.random()+200)/1e3)});else if(2==n||3==n)t[a].pr_active_bg.find(".slotslide").each(function(){t[a].mtl.add(punchgs.TweenLite.to(this,d/1e3,{top:3===n?t[a].sloth:0,left:2===n?t[a].slotw:0,ease:u,force3D:"auto",rotation:0-t[a].rotate}),0)}),t[a].pr_next_bg.find(".slotslide").each(function(){t[a].mtl.add(punchgs.TweenLite.from(this,d/1e3,{top:3==n?1===o?0-t[a].sloth:t[a].sloth:0,left:2==n?1===o?0-t[a].slotw:t[a].slotw:0,ease:u,force3D:"auto",rotation:t[a].rotate}),0)});else if(4==n||5==n||6==n){var m=new punchgs.TimelineLite,v=d/1e3-d/1e3/t[a].slots;t[a].slots-=t[a].slots%2==1?1:0,t[a].pr_active_bg.find(".slotslide").each(function(e){var i=6!==n?e:e>t[a].slots/2?t[a].slots-e:e;m.add(punchgs.TweenLite.to(this,v,{transformPerspective:600,force3D:"auto",top:1!==o?t[a].height:-t[a].height,opacity:.75,rotation:t[a].rotate,ease:u,delay:(5!==n?i:t[a].slots-i)*(v/t[a].slots)/(6===n?1.3:1)}),0),t[a].mtl.add(m,0)}),t[a].pr_next_bg.find(".slotslide").each(function(e){var i=6!==n?e:e>t[a].slots/2?t[a].slots-e:e;m.add(punchgs.TweenLite.from(this,v,{top:1==o?t[a].height:-t[a].height,opacity:.75,rotation:t[a].rotate,force3D:"auto",ease:punchgs.eo,delay:(5!==n?i:t[a].slots-i)*(v/t[a].slots)/(6===n?1.3:1)}),0),t[a].mtl.add(m,0)})}else if(7==n||8==n)d=Math.min(t[a].duration||d,d),t[a].pr_active_bg.find(".slotslide").each(function(e){var i=e>t[a].slots/2?t[a].slots-e:e;t[a].mtl.add(punchgs.TweenLite.to(this.getElementsByTagName("div"),d/1e3,{x:8===n&&0===s.trC?0:i*t[a].slotw/3,y:8===n&&0===s.trC?i*t[a].sloth/3:0,ease:u,transformPerspective:600,force3D:"auto",filter:"blur(2px)",scale:1.2,opacity:0}),0)}),t[a].pr_next_bg.find(".slotslide").each(function(e){var i=e>t[a].slots/2?t[a].slots-e:e;t[a].mtl.add(punchgs.TweenLite.fromTo(this.getElementsByTagName("div"),d/1e3,{x:8===n&&0===s.trC?0:0-i*t[a].slotw/3,y:8===n&&0===s.trC?0-i*t[a].sloth/3:0,filter:"blur(2px)",opacity:0,transformPerspective:600,scale:1.2},{x:0,y:0,ease:h,force3D:"auto",scale:1,filter:"blur(0px)",opacity:1,rotation:0}),0)});else if(9==n||10==n)for(var y=t[a].pr_next_bg[0].getElementsByClassName("slotslide"),b=d-d/1.8,w=0;w<y.length;w++)t[a].mtl.add(punchgs.TweenLite.fromTo(y[w],(d-w*(b/t[a].slots))/1e3,{opacity:0,force3D:"auto",transformPerspective:600},{opacity:1,ease:"Linear.easeNone",delay:w*(b/t[a].slots)/1e3}),0);else if(11==n){s.trC=Math.min(12,s.trC);var _=2==s.trC?"#000000":3==s.trC?"#ffffff":"transparent";switch(s.trC){case 0:t[a].mtl.add(punchgs.TweenLite.fromTo(t[a].pr_next_bg,d/1e3,{autoAlpha:0},{autoAlpha:1,force3D:"auto",ease:u}),0);break;case 1:t[a].mtl.add(punchgs.TweenLite.fromTo(t[a].pr_next_bg,d/1e3,{autoAlpha:0},{autoAlpha:1,force3D:"auto",ease:u}),0),t[a].mtl.add(punchgs.TweenLite.fromTo(t[a].pr_active_bg,d/1e3,{autoAlpha:1},{autoAlpha:0,force3D:"auto",ease:u}),0);break;case 2:case 3:case 4:t[a].mtl.add(punchgs.TweenLite.set(t[a].pr_active_bg.parent(),{backgroundColor:_,force3D:"auto"}),0),t[a].mtl.add(punchgs.TweenLite.set(t[a].pr_next_bg.parent(),{backgroundColor:"transparent",force3D:"auto"}),0),t[a].mtl.add(punchgs.TweenLite.to(t[a].pr_active_bg,d/2e3,{autoAlpha:0,force3D:"auto",ease:u}),0),t[a].mtl.add(punchgs.TweenLite.fromTo(t[a].pr_next_bg,d/2e3,{autoAlpha:0},{autoAlpha:1,force3D:"auto",ease:u}),d/2e3);break;case 5:case 6:case 7:case 8:case 9:case 10:case 11:case 12:var x="blur("+(jQuery.inArray(s.trC,[9,10])>=0?5:jQuery.inArray(s.trC,[11,12])>=0?10:0)+"px) grayscale("+(jQuery.inArray(s.trC,[5,6,7,8])>=0?100:0)+"%) brightness("+(jQuery.inArray(s.trC,[7,8])>=0?300:0)+"%)",k="blur(0px) grayscale(0%) brightness(100%)";t[a].mtl.add(punchgs.TweenLite.fromTo(t[a].pr_next_bg,d/1e3,{autoAlpha:0,filter:x,"-webkit-filter":x},{autoAlpha:1,filter:k,"-webkit-filter":k,force3D:"auto",ease:u}),0),jQuery.inArray(s.trC,[6,8,10])>=0&&t[a].mtl.add(punchgs.TweenLite.fromTo(t[a].pr_active_bg,d/1e3,{autoAlpha:1,filter:k,"-webkit-filter":k},{autoAlpha:0,force3D:"auto",ease:u,filter:x,"-webkit-filter":x}),0)}t[a].mtl.add(punchgs.TweenLite.set(t[a].pr_next_bg.find("rs-sbg"),{autoAlpha:1}),0),t[a].mtl.add(punchgs.TweenLite.set(t[a].pr_active_bg.find("rs-sbg"),{autoAlpha:1}),0)}else if(12==n||13==n||14==n||15==n){var T=3==s.trC?d/1300:d/1e3,L=d/1e3,R=5==s.trC||6==s.trC?0:t[a].width,I=5==s.trC||6==s.trC?0:t[a].currentSlideHeight,z=12==n?R:15==n?0-R:0,S=13==n?5==s.trC||6==s.trC?0:t[a].height:14==n?5==s.trC||6==s.trC?0:0-t[a].height:0,M=1==s.trC||2==s.trC||5==s.trC||6==s.trC?0:1,O=4==s.trC||5==s.trC?.6:6==s.trC?1.4:1,C=5==s.trC?1.4:6==s.trC?.6:1;if(7!=s.trC&&4!=s.trC||(R=0,I=0),8==s.trC?(t[a].mtl.add(punchgs.TweenLite.set(t[a].pr_active_slide,{zIndex:20}),0),t[a].mtl.add(punchgs.TweenLite.set(t[a].pr_next_slide,{zIndex:15}),0),t[a].mtl.add(punchgs.TweenLite.to(t[a].pr_next_bg,.01,{overflow:"hidden",left:0,top:0,x:0,y:0,scale:1,autoAlpha:1,rotation:0,overwrite:!0,immediateRender:!0,force3D:"auto"}),0)):(t[a].mtl.add(punchgs.TweenLite.set(t[a].pr_active_slide,{zIndex:15}),0),t[a].mtl.add(punchgs.TweenLite.set(t[a].pr_next_slide,{zIndex:20}),0),t[a].mtl.add(punchgs.TweenLite.from(t[a].pr_next_bg,T,{left:z,top:S,overflow:"hidden",scale:C,autoAlpha:M,rotation:t[a].rotate,ease:u,force3D:"auto"}),0)),1!=s.trC)switch(n){case 12:t[a].mtl.add(punchgs.TweenLite.to(t[a].pr_active_bg,L,{left:0-R+"px",overflow:"hidden",force3D:"auto",scale:O,autoAlpha:M,rotation:t[a].rotate,ease:h}),0);break;case 15:t[a].mtl.add(punchgs.TweenLite.to(t[a].pr_active_bg,L,{left:R+"px",overflow:"hidden",force3D:"auto",scale:O,autoAlpha:M,rotation:t[a].rotate,ease:h}),0);break;case 13:t[a].mtl.add(punchgs.TweenLite.to(t[a].pr_active_bg,L,{top:0-I+"px",overflow:"hidden",force3D:"auto",scale:O,autoAlpha:M,rotation:t[a].rotate,ease:h}),0);break;case 14:t[a].mtl.add(punchgs.TweenLite.to(t[a].pr_active_bg,L,{top:I+"px",overflow:"hidden",force3D:"auto",scale:O,autoAlpha:M,rotation:t[a].rotate,ease:h}),0)}}else if(16==n){var P=1===o?"80% 50% 0":"20%  50% 0";t[a].mtl.add(punchgs.TweenLite.set(t[a].pr_active_slide,{zIndex:20}),0),t[a].mtl.add(punchgs.TweenLite.set(t[a].pr_next_slide,{zIndex:15}),0),t[a].pr_active_bg.find(".slotslide").each(function(e){t[a].mtl.add(punchgs.TweenLite.fromTo(this,d/1e3,{left:0,rotationZ:0,opacity:1,top:0,z:0,scale:1},{opacity:1,left:1===o?0==e?-t[a].width/1.6:-t[a].width/1.8:0===e?t[a].width/1.6:t[a].width/1.8,rotationZ:1===o?0===e?-35:25:0===e?25:-35,z:0,top:0==e?"-120%":"140%",scale:.8,force3D:"auto",transformPerspective:600,transformOrigin:P,delay:0,ease:u}),0),t[a].mtl.add(punchgs.TweenLite.fromTo(this,d/2e3,{opacity:1},{opacity:0,delay:d/2e3}),0)}),t[a].mtl.add(punchgs.TweenLite.fromTo(t[a].pr_next_bg,d/1e3-d/7e3,{x:100*Math.random()-50,opacity:1,scale:.9,rotationZ:10*Math.random()-5},{x:0,opacity:1,scale:1,rotationZ:0,ease:u,force3D:"auto",delay:d/7e3}),0)}else if(17==n||18==n)t[a].pr_next_bg.find(".slotslide").each(function(e){t[a].mtl.add(punchgs.TweenLite.fromTo(this,d/t[a].slots/1e3,{opacity:0,top:0,left:0,rotationY:17===n?0:90,scale:1,rotationX:17===n?-90:0,force3D:"auto",transformPerspective:600,transformOrigin:17===n?"top center":"center left"},{opacity:1,top:0,left:0,rotationX:0,rotationY:0,force3D:"auto",ease:h,delay:e*(d/t[a].slots/2e3)}),0)}),t[a].pr_active_bg.find(".slotslide").each(function(e){t[a].mtl.add(punchgs.TweenLite.fromTo(this,d/t[a].slots/1e3,{opacity:1,rotationY:0,scale:1,rotationX:0,force3D:"auto",transformPerspective:600,transformOrigin:17===n?"bottom center":"center right"},{opacity:0,rotationX:17===n?110:0,rotationY:17===n?0:110,force3D:"auto",ease:u,delay:e*(d/t[a].slots/2e3)}),0)});else if(19==n||22==n||23==n||24==n){t[a].mtl.add(punchgs.TweenLite.set(t[a].pr_active_slide,{zIndex:20}),0),t[a].mtl.add(punchgs.TweenLite.set(t[a].pr_next_slide,{zIndex:10}),0);P=19===n?"center center -"+t[a].height/2:22===n?"center center "+t[a].height/2:23===n?"center center -"+t[a].width/2:"center center "+t[a].width/2;punchgs.TweenLite.set(t[a].c,{transformStyle:"flat",backfaceVisibility:"hidden",transformPerspective:600}),t[a].mtl.add(punchgs.TweenLite.fromTo(t[a].pr_next_bg,d/1e3,{rotationX:19==n||22===n?1==o?-90:90:0,rotationY:23==n||24===n?1==o?-90:90:0,left:0,top:0,scale:1,x:0,y:0,overflow:"hidden",autoAlpha:1,transformStyle:"flat",backfaceVisibility:"hidden",force3D:"auto",transformPerspective:1200,transformOrigin:P},{overflow:"hidden",left:0,autoAlpha:1,rotationX:0,rotationY:0,top:0,scale:1,delay:0,ease:u,transformStyle:"flat",backfaceVisibility:"hidden",force3D:"auto",transformPerspective:1200,transformOrigin:P}),0),t[a].mtl.add(punchgs.TweenLite.fromTo(t[a].pr_next_bg,d/2e3,{z:19==n||23===n?-200:0},{z:19===n||23===n?0:-200,ease:"Power3.easeInOut",delay:19===n||23===n?d/2e3:0}),0),22!==n&&24!==n||t[a].mtl.add(punchgs.TweenLite.fromTo([t[a].pr_active_bg,t[a].pr_next_bg],d/2e3,{z:-200},{z:0,ease:"Power2.easeIn",delay:d/2e3}),0),t[a].mtl.add(punchgs.TweenLite.fromTo(t[a].pr_active_bg,d/2e3,{z:0},{z:-200,ease:"Power3.easeInOut",delay:0,force3D:"auto"}),0),19!==n&&23!==n||t[a].mtl.add(punchgs.TweenLite.fromTo(t[a].pr_active_bg,d/2e3,{autoAlpha:1},{autoAlpha:0,ease:"LinearEase.none",delay:d/2e3,force3D:"auto"}),0),t[a].mtl.add(punchgs.TweenLite.fromTo(t[a].pr_active_bg,d/1e3,{overflow:"hidden",rotationX:0,rotationY:0,rotationZ:0,top:0,left:0,scale:1,transformStyle:"flat",backfaceVisibility:"hidden",force3D:"auto",transformPerspective:1200,transformOrigin:P},{rotationX:19===n||22===n?1==o?90:-90:0,rotationY:23===n||24===n?1==o?90:-90:0,overflow:"hidden",top:0,scale:1,delay:0,force3D:"auto",ease:u,transformStyle:"flat",backfaceVisibility:"hidden",transformPerspective:1200,transformOrigin:P}),0)}else if(20==n){P=1===o?"20% ":"80% ";P+="60% -50%",t[a].mtl.add(punchgs.TweenLite.fromTo(t[a].pr_next_bg,d/1e3,{left:1===o?-t[a].width:t[a].width,rotationX:20,z:-t[a].width,autoAlpha:0,top:0,scale:1,force3D:"auto",transformPerspective:600,transformOrigin:P,rotationY:1===o?50:-50},{left:0,rotationX:0,autoAlpha:1,top:0,z:0,scale:1,rotationY:0,delay:0,ease:u}),0),P=1!=o?"20% ":"80% ",P+="60% -50%",t[a].mtl.add(punchgs.TweenLite.fromTo(t[a].pr_active_bg,d/1e3,{autoAlpha:1,rotationX:0,top:0,z:0,scale:1,left:0,force3D:"auto",transformPerspective:600,transformOrigin:P,rotationY:0},{autoAlpha:1,rotationX:20,top:0,z:-t[a].width,left:1!=o?-t[a].width/1.2:t[a].width/1.2,force3D:"auto",rotationY:1===o?-50:50,delay:0,ease:"Power2.easeInOut"}),0)}else if(21==n||25==n){var j=25===n?t[a].rotate:1===o?90:-90,A=25===n?1===o?-90:90:t[a].rotate;P=1===o?25===n?"center top 0":"left center 0":25===n?"center bottom 0":"right center 0";t[a].mtl.add(punchgs.TweenLite.fromTo(t[a].pr_next_bg,d/1e3,{transformStyle:"flat",rotationX:A,top:0,left:0,autoAlpha:0,force3D:"auto",transformPerspective:1200,transformOrigin:P,rotationY:j},{autoAlpha:1,rotationX:0,rotationY:0,ease:u}),0),P=1===o?25===n?"center bottom 0":"right center 0":25===n?"center top 0":"left center 0",j=25!==n?-j:j,A=25!==n?A:-A,t[a].mtl.add(punchgs.TweenLite.fromTo(t[a].pr_active_bg,d/1e3,{rotationX:0,rotationY:0,transformStyle:"flat",transformPerspective:1200,force3D:"auto"},{immediateRender:!0,rotationX:A,transformOrigin:P,rotationY:j,ease:h}),0)}else if(26==n)d=0,t[a].mtl.add(punchgs.TweenLite.fromTo(t[a].pr_next_bg,.001,{autoAlpha:0},{autoAlpha:1,force3D:"auto",ease:u}),0),t[a].mtl.add(punchgs.TweenLite.to(t[a].pr_active_bg,.001,{autoAlpha:0,force3D:"auto",ease:u}),0),t[a].mtl.add(punchgs.TweenLite.set(t[a].pr_next_bg.find("rs-sbg"),{autoAlpha:1}),0),t[a].mtl.add(punchgs.TweenLite.set(t[a].pr_active_bg.find("rs-sbg"),{autoAlpha:1}),0);else if(27==n||28==n||29==n||30==n){var Q=t[a].pr_next_bg.find(".slot"),H=27==n||29==n?"-100%":"+100%",N=27==n||29==n?"+100%":"-100%",D=27==n||29==n?"-80%":"80%",B=27==n||29==n?"+80%":"-80%",W=27==n||29==n?"+10%":"-10%",V={overwrite:"all"},Y={autoAlpha:0,zIndex:1,force3D:"auto",ease:u},F={position:"inherit",autoAlpha:0,overwrite:"all",zIndex:1},E={autoAlpha:1,force3D:"auto",ease:h},X={overwrite:"all",zIndex:2,opacity:1,autoAlpha:1},Z={autoAlpha:1,force3D:"auto",overwrite:"all",ease:u},q={overwrite:"all",zIndex:2,autoAlpha:1},U={autoAlpha:1,force3D:"auto",ease:u},G=1==(27==n||28==n?1:2)?"y":"x";V[G]="0px",Y[G]=H,F[G]=W,E[G]="0%",X[G]=N,Z[G]=H,q[G]=D,U[G]=B,Q.append('<span style="background-color:rgba(0,0,0,0.6);width:100%;height:100%;position:absolute;top:0px;left:0px;display:block;z-index:2"></span>'),t[a].mtl.add(punchgs.TweenLite.fromTo(t[a].pr_active_bg,d/1e3,V,Y),0),t[a].mtl.add(punchgs.TweenLite.fromTo(t[a].pr_next_bg.find("rs-sbg"),d/2e3,F,E),d/2e3),t[a].mtl.add(punchgs.TweenLite.fromTo(Q,d/1e3,X,Z),0),t[a].mtl.add(punchgs.TweenLite.fromTo(Q.find(".slotslide div"),d/1e3,q,U),0)}},r=function(e,i,a,r){var o=e.find("rs-sbg"),s=o.data("mediafilter"),n=e.data("zoomstart"),l=e.data("rotationstart");null!=o.data("currotate")&&(l=o.data("currotate")),null!=o.data("curscale")&&"box"==r?n=100*o.data("curscale"):null!=o.data("curscale")&&(n=o.data("curscale")),function(e,i){t[i].slotw=Math.ceil(t[i].width/t[i].slots),"fullscreen"==t[i].sliderLayout?t[i].sloth=Math.ceil(jQuery(window).height()/t[i].slots):t[i].sloth=Math.ceil(t[i].height/t[i].slots),t[i].autoHeight&&void 0!==e&&""!==e&&(t[i].sloth=Math.ceil(e.height()/t[i].slots))}(o,i);var d=void 0!==o[0]&&void 0!==o[0].dataset&&void 0!==o[0].dataset.lazyload?o[0].dataset.lazyload:o.attr("src"),c=t[i].width,p=t[i].autoHeight?t[i].c.height():t[i].height,u=o.data("fxof"),h=0,g=e.data("bgcolor")||o.css("backgroundColor"),f=e.data("bgfit")||"cover",m=e.data("bgrepeat")||"no-repeat",v=e.data("bgposition")||"center center",y=void 0!==g&&g.indexOf("gradient")>=0?"background:"+g:"background-color:"+g+";background-image:url("+d+");background-repeat:"+m+";background-size:"+f+";background-position:"+v,b="";if(u=null==u?0:u,e.find(".slot").each(function(){jQuery(this).remove()}),"box"===r)for(var w=0,_=0,x=0;x<t[i].slots;x++){_=0;for(var k=0;k<t[i].slots;k++)b+='<div class="slot" style="'+(null!=n&&null!=l?"transform:rotateZ("+l+"deg)":"")+";position:absolute;overflow:hidden;top:"+(0+_)+"px;left:"+(u+w)+"px;width:"+t[i].slotw+"px;height:"+t[i].sloth+'px;"><div class="slotslide '+s+'" data-x="'+w+'" data-y="'+_+'" style="position:absolute;top:0px;left:0px;width:'+t[i].slotw+"px;height:"+t[i].sloth+'px;overflow:hidden;"><div style="position:absolute;top:'+(0-_)+"px;left:"+(0-w)+"px;width:"+c+"px;height:"+p+"px;"+y+';"></div></div></div>',_+=t[i].sloth;w+=t[i].slotw}else if("horizontal"===r){if(!a)h=0-t[i].slotw;for(k=0;k<t[i].slots;k++)b+='<div class="slot" style="'+(null!=n&&null!=l?"transform:rotateZ("+l+"deg)":"")+";position:absolute;overflow:hidden;top:0px;left:"+(u+k*t[i].slotw)+"px;width:"+(t[i].slotw+.3)+"px;height:"+p+'px"><div class="slotslide '+s+'" style="position:absolute;top:0px;left:'+h+"px;width:"+(t[i].slotw+.6)+"px;height:"+p+'px;overflow:hidden;"><div style="position:absolute;top:0px;left:'+(0-k*t[i].slotw)+"px;width:"+c+"px;height:"+p+"px;"+y+';"></div></div></div>'}if("vertical"===r){if(!a)h=0-t[i].sloth;for(k=0;k<t[i].slots;k++)b+='<div class="slot" style="'+(null!=n&&null!=l?"transform:rotateZ("+l+"deg)":"")+";position:absolute;overflow:hidden;top:"+(0+k*t[i].sloth)+"px;left:"+u+"px;width:"+c+"px;height:"+t[i].sloth+'px"><div class="slotslide '+s+'" style="position:absolute;top:'+h+"px;left:0px;width:"+c+"px;height:"+t[i].sloth+'px;overflow:hidden;"><div style="position:absolute;top:'+(0-k*t[i].sloth)+"px;left:0px;width:"+c+"px;height:"+p+"px;"+y+';"></div></div></div>'}e.append(b)}}(jQuery),function(e){"use strict";var t=jQuery.fn.revolution,i=t.is_mobile();t.is_android();function a(e){return null==e?-1:jQuery.isNumeric(e)?e:e.split(":").length>1?60*parseInt(e.split(":")[0],0)+parseInt(e.split(":")[1],0):e}jQuery.extend(!0,t,{preLoadAudio:function(e,i){t[i].videos=void 0===t[i].videos?{}:t[i].videos,e.find(".rs-layer-audio").each(function(){var e=jQuery(this),a=t[i].videos[e[0].id]=void 0===t[i].videos[e[0].id]?y(e.data(),"audio"):t[i].videos[e[0].id],r={};0===e.find("audio").length&&(r.src=null!=a.mp4?a.mp4:"",r.pre=a.pload||"",this.id=void 0===this.id||""===this.id?e.attr("audio-layer-"+Math.round(199999*Math.random())):this.id,r.id=this.id,r.status="prepared",r.start=jQuery.now(),r.waittime=void 0!==a.ploadwait?1e3*a.ploadwait:5e3,"auto"!=r.pre&&"canplaythrough"!=r.pre&&"canplay"!=r.pre&&"progress"!=r.pre||(void 0===t[i].audioqueue&&(t[i].audioqueue=[]),t[i].audioqueue.push(r),t.manageVideoLayer(e,i)))})},preLoadAudioDone:function(e,i,a){var r=t[i].videos[e[0].id];t[i].audioqueue&&t[i].audioqueue.length>0&&jQuery.each(t[i].audioqueue,function(e,t){r.mp4!==t.src||t.pre!==a&&"auto"!==t.pre||(t.status="loaded")})},resetVideo:function(e,a,r,o){var s=t[a].videos[e[0].id];switch(s.type){case"youtube":s.rwd&&null!=s.player&&void 0!==s.player.seekTo&&(s.player.seekTo(-1==s.ssec?0:s.ssec),s.player.pauseVideo()),0!=e.find("rs-poster").length||s.bgvideo||"preset"===r||punchgs.TweenLite.to(e.find("iframe"),.3,{opacity:1,display:"block",ease:punchgs.Power3.easeInOut});break;case"vimeo":void 0!==s.vimeoplayer&&!o&&s.rwd&&(0!==s.ssec&&-1!==s.ssec||s.bgvideo||e.find("rs-poster").length>0)&&(s.vimeoplayer.setCurrentTime(-1==s.ssec?0:s.ssec),s.vimeoplayer.pause()),0!=e.find("rs-poster").length||s.bgvideo||"preset"===r||punchgs.TweenLite.to(e.find("iframe"),.3,{opacity:1,display:"block",ease:punchgs.Power3.easeInOut});break;case"html5":if(i&&s.notonmobile)return!1;punchgs.TweenLite.to(s.jvideo,.3,{opacity:1,display:"block",ease:punchgs.Power3.easeInOut}),s.rwd&&!e.hasClass("videoisplaying")&&(s.video.currentTime=-1==s.ssec?0:s.ssec),("mute"==s.volume||t.lastToggleState(e.videomutetoggledby)||!0===t[a].globalmute)&&(s.video.muted=!0)}},Mute:function(e,i,a){var r=!1,o=t[i].videos[e[0].id];switch(o.type){case"youtube":o.player&&(!0===a&&o.player.mute(),!1===a&&l(o,parseInt(o.volcache,0)),r=o.player.isMuted());break;case"vimeo":o.volcachecheck||(o.volcache=o.volcache>1?o.volcache/100:o.volcache,o.volcachecheck=!0),o.volume=!0===a?"mute":!1===a?o.volcache:o.volume,void 0!==a&&null!=o.vimeoplayer&&n(o,!0===a?0:o.volcache),r="mute"==o.volume||0===o.volume;break;case"html5":o.volcachecheck||(o.volcache=o.volcache>1?o.volcache/100:o.volcache,o.volcachecheck=!0),o.video.volume=o.volcache,void 0!==a&&o.video&&(o.video.muted=a),r=void 0!==o.video?o.video.muted:r}if(void 0===a)return r},stopVideo:function(e,i){if(void 0!==t[i]&&void 0!==t[i]){var a=t[i].videos[e[0].id];if(void 0!==a)switch(t[i].leaveViewPortBasedStop||(t[i].lastplayedvideos=[]),t[i].leaveViewPortBasedStop=!1,a.type){case"youtube":if(void 0===a.player||2===a.player.getPlayerState()||5===a.player.getPlayerState())return;a.player.pauseVideo(),a.youtubepausecalled=!0,setTimeout(function(){a.youtubepausecalled=!1},80);break;case"vimeo":if(void 0===a.vimeoplayer)return;a.vimeoplayer.pause(),a.vimeopausecalled=!0,setTimeout(function(){a.vimeopausecalled=!1},80);break;case"html5":a.video&&a.video.pause()}}},playVideo:function(e,i){var a=t[i].videos[e[0].id];switch(clearTimeout(a.videoplaywait),a.type){case"youtube":if(0==e.find("iframe").length)e.append(a.videomarkup),h(e,i,!0);else if(null!=a.player.playVideo){var o=a.player.getCurrentTime();a.nseTriggered&&(o=-1,a.nseTriggered=!1),-1!=a.ssec&&a.ssec>o&&a.player.seekTo(a.ssec),!0!==a.youtubepausecalled&&p(a)}else a.videoplaywait=setTimeout(function(){!0!==a.youtubepausecalled&&t.playVideo(e,i)},50);break;case"vimeo":0==e.find("iframe").length?(delete a.vimeoplayer,e.append(a.videomarkup),h(e,i,!0)):e.hasClass("rs-apiready")?(a.vimeoplayer=null==a.vimeoplayer?new Vimeo.Player(e.find("iframe").attr("id")):a.vimeoplayer,a.vimeoplayer.getPaused()?setTimeout(function(){var r=void 0===a.currenttime?0:a.currenttime;a.nseTriggered&&(r=-1,a.nseTriggered=!1),-1!=a.ssec&&a.ssec>r&&a.vimeoplayer.setCurrentTime(a.ssec),("mute"==a.volume||0===a.volume||t.lastToggleState(e.data("videomutetoggledby"))||!0===t[i].globalmute)&&a.vimeoplayer.setVolume(0),c(a.vimeoplayer)},510):a.videoplaywait=setTimeout(function(){!0!==a.vimeopausecalled&&t.playVideo(e,i)},50)):a.videoplaywait=setTimeout(function(){!0!==a.vimeopausecalled&&t.playVideo(e,i)},100);break;case"html5":if(a.metaloaded){d(a.video);o=a.video.currentTime;a.nseTriggered&&(o=-1,a.nseTriggered=!1),-1!=a.ssec&&a.ssec>o&&(a.video.currentTime=a.ssec)}else r(a.video,"loadedmetadata",function(e){t.resetVideo(e,i),a.video.play();var r=a.video.currentTime;a.nseTriggered&&(r=-1,a.nseTriggered=!1),-1!=a.ssec&&a.ssec>r&&(a.video.currentTime=a.ssec)}(e))}},isVideoPlaying:function(e,i){var a=!1;return null!=t[i].playingvideos&&jQuery.each(t[i].playingvideos,function(t,i){e.attr("id")==i.attr("id")&&(a=!0)}),a},removeMediaFromList:function(e,t){w(e,t)},prepareCoveredVideo:function(e,i){var a=t[e].videos[i[0].id];if(void 0===a.vimeoid||void 0!==a.vimeoplayerloaded){if(a.ifr=i.find("iframe, video"),a.vd=a.ratio.split(":").length>1?a.ratio.split(":")[0]/a.ratio.split(":")[1]:1,0===t[e].conw||0===t[e].conh)return t.setSize(e),clearTimeout(a.resizelistener),void(a.resizelistener=setTimeout(function(){t.prepareCoveredVideo(e,i)},100));var r=t[e].conw/t[e].conh,o=r/a.vd*100,s=a.vd/r*100;"html5"===a.type&&"Edge"!==t.get_browser()&&"IE"!==t.get_browser()&&(s=100,o=100),"Edge"===t.get_browser()?r>a.vd?punchgs.TweenLite.set(a.ifr,{minWidth:"100%",x:"-50%",y:"-50%",top:"50%",left:"50%",position:"absolute"}):punchgs.TweenLite.set(a.ifr,{minHeight:"100%",x:"-50%",y:"-50%",top:"50%",left:"50%",position:"absolute"}):r>a.vd?punchgs.TweenLite.set(a.ifr,{height:o+"%",width:"100%",top:-(o-100)/2+"%",left:"0px",position:"absolute"}):punchgs.TweenLite.set(a.ifr,{width:s+"%",height:"100%",left:-(s-100)/2+"%",top:"0px",position:"absolute"}),a.ifr.hasClass("resizelistener")||(a.ifr.addClass("resizelistener"),jQuery(window).resize(function(){t.prepareCoveredVideo(e,i),clearTimeout(a.resizelistener),a.resizelistener=setTimeout(function(){t.prepareCoveredVideo(e,i)},90)}))}},checkVideoApis:function(e,i){location.protocol;if(!t[i].youtubeapineeded&&((null!=e.data("ytid")||e.find("iframe").length>0&&e.find("iframe").attr("src").toLowerCase().indexOf("youtube")>0)&&(t[i].youtubeapineeded=!0),t[i].youtubeapineeded&&!window.rs_addedyt)){t[i].youtubestarttime=jQuery.now(),window.rs_addedyt=!0;var a=document.createElement("script"),r=document.getElementsByTagName("script")[0],o=!0;a.src="https://www.youtube.com/iframe_api",jQuery("head").find("*").each(function(){"https://www.youtube.com/iframe_api"==jQuery(this).attr("src")&&(o=!1)}),o&&r.parentNode.insertBefore(a,r)}if(!t[i].vimeoapineeded&&((null!=e.data("vimeoid")||e.find("iframe").length>0&&e.find("iframe").attr("src").toLowerCase().indexOf("vimeo")>0)&&(t[i].vimeoapineeded=!0),t[i].vimeoapineeded&&!window.rs_addedvim)){t[i].vimeostarttime=jQuery.now(),window.rs_addedvim=!0;var s=document.createElement("script");r=document.getElementsByTagName("script")[0],o=!0;s.src="https://player.vimeo.com/api/player.js",jQuery("head").find("*").each(function(){"https://player.vimeo.com/api/player.js"==jQuery(this).attr("src")&&(o=!1)}),o&&r.parentNode.insertBefore(s,r)}},manageVideoLayer:function(e,a){if(e[0].dataset.videoLayerManaged)return!1;t[a].videos=void 0===t[a].videos?{}:t[a].videos;var o=t[a].videos[e[0].id]=void 0===t[a].videos[e[0].id]?y(e.data()):t[a].videos[e[0].id];if(o.audio=void 0!==o.audio&&o.audio,i&&o.opom)0==e.find("rs-poster").length&&e.append('<rs-poster class="noSwipe" style="background-image:url('+o.poster+');"></rs-poster>');else{switch(o.id=e[0].id,o.pload="auto"===o.pload||"canplay"===o.pload||"canplaythrough"===o.pload||"progress"===o.pload?"auto":o.pload,o.type=null!=o.mp4||null!=o.webm?"html5":null!=o.ytid&&String(o.ytid).length>1?"youtube":null!=o.vimeoid&&String(o.vimeoid).length>1?"vimeo":"none",o.newtype="html5"==o.type&&0==e.find(o.audio?"audio":"video").length?"html5":"youtube"==o.type&&0==e.find("iframe").length?"youtube":"vimeo"==o.type&&0==e.find("iframe").length?"vimeo":"none",!o.audio&&"1sttime"==o.aplay&&o.pausetimer&&o.bgvideo&&e.closest("rs-slide").addClass("rs-pause-timer-once"),o.audio||!o.bgvideo||!o.pausetimer||1!=o.aplay&&"true"!=o.aplay&&"no1sttime"!=o.aplay||e.closest("rs-slide").addClass("rs-pause-timer-always"),o.noInt&&e.addClass("rs-nointeraction"),o.newtype){case"html5":o.audio&&e.addClass("rs-audio"),o.tag=o.audio?"audio":"video";var s="video"===o.tag&&(t.is_mobile()||t.isSafari11())?o.aplay||"true"===o.aplay?"muted playsinline autoplay":o.inline?" playsinline":"":"",n="<"+o.tag+" "+s+" "+(o.controls?" controls ":"")+' style="'+("Edge"!==t.get_browser()?"object-fit:cover;background-size:cover;opacity:0;width:100%; height:100%":"")+'" class="" '+(o.loop?"loop":"")+' preload="'+o.pload+'">';"video"===o.tag&&null!=o.webm&&"firefox"==t.get_browser().toLowerCase()&&(n=n+'<source src="'+o.webm+'" type="video/webm" />'),null!=o.mp4&&(n=n+'<source src="'+o.mp4+'" type="'+("video"===o.tag?"video/mp4":"audio/mpeg")+'" />'),null!=o.ogv&&(n=n+'<source src="'+o.mp4+'" type="'+o.tag+'/ogg" />'),n+="</"+o.tag+">",o.videomarkup=n,i&&o.notonmobile||t.isIE(8)||e.append(n),e.find(o.tag).parent().hasClass("html5vid")||e.find(o.tag).wrap('<div class="html5vid" style="position:relative;top:0px;left:0px;width:100%;height:100%; overflow:hidden;"></div>'),o.jvideo=e.find(o.tag),o.video=o.jvideo[0],o.html5vid=o.jvideo.parent(),o.metaloaded||r(o.video,"loadedmetadata",function(e){m(e,a),t.resetVideo(e,a)}(e));break;case"youtube":o.controls||(o.vatr=o.vatr.replace("controls=1","controls=0"),-1==o.vatr.toLowerCase().indexOf("controls")&&(o.vatr=o.vatr+"&controls=0")),(o.inline||"RS-BGVIDEO"===e[0].tagName)&&(o.vatr=o.vatr+"&playsinline=1"),-1!=o.ssec&&(o.vatr+="&start="+o.ssec),-1!=o.esec&&(o.vatr+="&end="+o.esec);var l=o.vatr.split("origin=https://");o.vatrnew=l.length>1?l[0]+"origin=https://"+(self.location.href.match(/www/gi)&&!l[1].match(/www/gi)?"www."+l[1]:l[1]):o.vatr,o.videomarkup='<iframe allow="autoplay; fullscreen" type="text/html" src="https://www.youtube.com/embed/'+o.ytid+"?"+o.vatrnew+'" '+(!0===o.afs?"allowfullscreen":"")+' width="100%" height="100%" style="opacity:0;visibility:visible;width:100%;height:100%"></iframe>';break;case"vimeo":o.controls?(o.vatr=o.vatr.replace("background=0","background=1"),-1==o.vatr.toLowerCase().indexOf("background")&&(o.vatr=o.vatr+"&background=1")):(o.vatr=o.vatr.replace("background=1","background=0"),-1==o.vatr.toLowerCase().indexOf("background")&&(o.vatr=o.vatr+"&background=0")),o.vatr="autoplay="+(!0===o.aplay?1:0)+"&"+o.vatr,o.loop&&(o.vatr="loop=1&"+o.vatr),o.videomarkup='<iframe  allow="autoplay; fullscreen" src="https://player.vimeo.com/video/'+o.vimeoid+"?"+o.vatr+'" webkitallowfullscreen mozallowfullscreen allowfullscreen width="100%" height="100%" style="opacity:0;visibility:visible;100%;height:100%"></iframe>'}if(!(null!=o.poster&&o.poster.length>2)||i&&o.npom){if(i&&o.notonmobile)return!1;0!=e.find("iframe").length||"youtube"!=o.type&&"vimeo"!=o.type||(delete o.vimeoplayer,e.append(o.videomarkup),h(e,a,!1))}else 0==e.find("rs-poster").length&&e.append('<rs-poster class="noSwipe" style="background-image:url('+o.poster+');"></rs-poster>'),0==e.find("iframe").length&&e.find("rs-poster").click(function(){if(t.playVideo(e,a),i){if(o.notonmobile)return!1;punchgs.TweenLite.to(e.find("rs-poster"),.3,{opacity:0,visibility:"hidden",force3D:"auto",ease:punchgs.Power3.easeInOut}),punchgs.TweenLite.to(e.find("iframe"),.3,{opacity:1,display:"block",ease:punchgs.Power3.easeInOut})}});"none"!==o.doverlay&&void 0!==o.doverlay&&(o.bgvideo?1!=e.closest("rs-sbg-wrap").find("rs-dotted").length&&e.closest("rs-sbg-wrap").append('<rs-dotted class="'+o.doverlay+'"></rs-dotted>'):1!=e.find("rs-dotted").length&&e.append('<rs-dotted class="'+o.doverlay+'"></rs-dotted>')),e[0].dataset.videoLayerManaged=!0,o.bgvideo&&punchgs.TweenLite.set(e.find("video, iframe"),{opacity:0})}}});var r=function(e,t,i){e.addEventListener?e.addEventListener(t,i,{capture:!1,passive:!0}):e.attachEvent(t,i,{capture:!1,passive:!0})},o=function(e,t,i){var a={};return a.video=e,a.type=t,a.settings=i,a},s=function(e,i){var a=t[e].videos[i[0].id];(a.bgvideo||a.fcover)&&(a.fcover&&i.removeClass("rs-fsv").addClass("coverscreenvideo"),(void 0===a.ratio||a.ratio.split(":").length<=1)&&(a.ratio="16:9"),t.prepareCoveredVideo(e,i))},n=function(e,t){var i=e.vimeoplayer;i.getPaused().then(function(a){var r=!a,o=i.setVolume(t);void 0!==o&&o.then(function(t){i.getPaused().then(function(t){r===t&&(e.volume="mute",i.setVolume(0),i.play())}).catch(function(e){console.log("Get Paused Function Failed for Vimeo Volume Changes Inside the Promise")})}).catch(function(t){r&&(e.volume="mute",i.setVolume(0),i.play())})}).catch(function(){console.log("Get Paused Function Failed for Vimeo Volume Changes")})},l=function(e,t){var i=e.player.getPlayerState();"mute"===t?e.player.mute():(e.player.unMute(),e.player.setVolume(t)),setTimeout(function(){1===i&&1!==e.player.getPlayerState()&&(e.player.mute(),e.player.playVideo())},39)},d=function(e){var t=e.play();void 0!==t&&t.then(function(e){}).catch(function(t){e.pause()})},c=function(e){var t=e.play();void 0!==t&&t.then(function(e){}).catch(function(t){e.setVolume(0),e.play()})},p=function(e){e.player.playVideo(),setTimeout(function(){1!==e.player.getPlayerState()&&3!==e.player.getPlayerState()&&(e.volume="mute",e.player.mute(),e.player.playVideo())},39)},u=function(e,i,a){e.vimeostarted=!0,e.nextslidecalled=!1,punchgs.TweenLite.to(i.find("rs-poster"),.3,{opacity:0,visibility:"hidden",force3D:"auto",ease:punchgs.Power3.easeInOut}),punchgs.TweenLite.to(i.find("iframe"),.3,{opacity:1,display:"block",ease:punchgs.Power3.easeInOut}),t[a].c.trigger("revolution.slide.onvideoplay",o(e.vimeoplayer,"vimeo",e)),t[a].stopByVideo=e.pausetimer,b(i,a),"mute"==e.volume||0===e.volume||t.lastToggleState(i.data("videomutetoggledby"))||!0===t[a].globalmute?e.vimeoplayer.setVolume(0):n(e,parseInt(e.volcache,0)/100||.75),t.toggleState(e.videotoggledby)},h=function(e,a,r){var n=t[a].videos[e[0].id],d="iframe"+Math.round(1e5*Math.random()+1);if(n.ifr=e.find("iframe"),s(a,e),n.ifr.attr("id",d),n.startvideonow=r,n.videolistenerexist){if(r)switch(n.type){case"youtube":p(n),-1!=n.ssec&&n.player.seekTo(n.ssec);break;case"vimeo":c(n.vimeoplayer),-1!=n.ssec&&n.vimeoplayer.seekTo(n.ssec)}}else switch(n.type){case"youtube":n.player=new YT.Player(d,{events:{onStateChange:function(i){i.data==YT.PlayerState.PLAYING?(punchgs.TweenLite.to(e.find("rs-poster"),.3,{opacity:0,visibility:"hidden",force3D:"auto",ease:punchgs.Power3.easeInOut}),punchgs.TweenLite.to(n.ifr,.3,{opacity:1,display:"block",ease:punchgs.Power3.easeInOut}),"mute"==n.volume||0===n.volume||t.lastToggleState(e.data("videomutetoggledby"))||!0===t[a].globalmute?n.player.mute():l(n,parseInt(n.volcache,0)||75),t[a].stopByVideo=!0,b(e,a),n.pausetimer?t[a].c.trigger("stoptimer"):t[a].stopByVideo=!1,t[a].c.trigger("revolution.slide.onvideoplay",o(n.player,"youtube",n)),t.toggleState(n.videotoggledby)):(0==i.data&&n.loop&&(-1!=n.ssec&&n.player.seekTo(n.ssec),p(n),t.toggleState(n.videotoggledby)),f()||0!=i.data&&2!=i.data||!(n.scop&&e.find("rs-poster").length>0||n.bgvideo&&e.find(".rs-fullvideo-cover").length>0)||(n.bgvideo?punchgs.TweenLite.to(e.find(".rs-fullvideo-cover"),.1,{opacity:1,force3D:"auto",ease:punchgs.Power3.easeInOut}):punchgs.TweenLite.to(e.find("rs-poster"),.1,{opacity:1,visibility:"visible",force3D:"auto",ease:punchgs.Power3.easeInOut}),punchgs.TweenLite.to(n.ifr,.1,{opacity:0,ease:punchgs.Power3.easeInOut})),-1!=i.data&&3!=i.data&&(t[a].stopByVideo=!1,t[a].tonpause=!1,w(e,a),t[a].c.trigger("starttimer"),t[a].c.trigger("revolution.slide.onvideostop",o(n.player,"youtube",n)),null!=t[a].videoIsPlaying&&t[a].videoIsPlaying.attr("id")!=e.attr("id")||t.unToggleState(n.videotoggledby)),0==i.data&&n.nse?(g(),n.nseTriggered=!0,t[a].c.revnext(),w(e,a)):(w(e,a),t[a].stopByVideo=!1,3!==i.data&&(-1!=n.lasteventdata&&3!=n.lasteventdata&&void 0!==n.lasteventdata||-1!=i.data&&3!=i.data)&&t[a].c.trigger("starttimer"),t[a].c.trigger("revolution.slide.onvideostop",o(n.player,"youtube",n)),null!=t[a].videoIsPlaying&&t[a].videoIsPlaying.attr("id")!=e.attr("id")||t.unToggleState(n.videotoggledby))),n.lasteventdata=i.data},onReady:function(a){var r,o=t.is_mobile(),s=e.hasClass("rs-layer-video");!o&&(!t.isSafari11()||o&&s)||"RS-BGVIDEO"!==e[0].tagName&&(!s||!0!==n.aplay&&"true"!==n.aplay)||(r=!0,n.player.setVolume(0),n.volume="mute",n.player.mute(),clearTimeout(e.data("mobilevideotimr")),e.data("mobilevideotimr",setTimeout(function(){p(n)},500))),r||"mute"!=n.volume||(n.player.setVolume(0),n.player.mute()),e.addClass("rs-apiready"),null==n.speed&&1===n.speed||a.target.setPlaybackRate(parseFloat(n.speed)),e.find("rs-poster").unbind("click"),e.find("rs-poster").click(function(){i||p(n)}),n.startvideonow&&(p(n),-1!=n.ssec&&n.player.seekTo(n.ssec)),n.videolistenerexist=!0}}});break;case"vimeo":for(var h,m=n.ifr.attr("src"),v={},y=m,_=/([^&=]+)=([^&]*)/g;h=_.exec(y);)v[decodeURIComponent(h[1])]=decodeURIComponent(h[2]);m=(m=null!=v.player_id?m.replace(v.player_id,d):m+"&player_id="+d).replace(/&api=0|&api=1/g,"");var x,k=t.is_mobile(),T=k||t.isSafari11(),L="RS-BGVIDEO"===e[0].tagName;if(T&&L&&(m+="&background=1"),n.ifr.attr("src",m),n.vimeoplayer=void 0===n.vimeoplayer||!1===n.vimeoplayer?new Vimeo.Player(d):n.vimeoplayer,T)L?x=!0:(n.aplay||"true"===n.aplay)&&(k&&(n.aplay=!1),x=!0),x&&(n.vimeoplayer.setVolume(0),n.volume="mute");n.vimeoplayer.on("play",function(t){n.vimeostarted||u(n,e,a)}),n.vimeoplayer.on("loaded",function(t){var i={};n.vimeoplayer.getVideoWidth().then(function(t){i.width=t,void 0!==i.width&&void 0!==i.height&&(n.ratio=i.width+":"+i.height,n.vimeoplayerloaded=!0,s(a,e))}),n.vimeoplayer.getVideoHeight().then(function(t){i.height=t,void 0!==i.width&&void 0!==i.height&&(n.ratio=i.width+":"+i.height,n.vimeoplayerloaded=!0,s(a,e))}),n.startvideonow&&("mute"===n.volume&&n.vimeoplayer.setVolume(0),c(n.vimeoplayer),-1!=n.ssec&&n.vimeoplayer.setCurrentTime(n.ssec))}),e.addClass("rs-apiready"),n.vimeoplayer.on("volumechange",function(e){n.volume=e.volume}),n.vimeoplayer.on("timeupdate",function(i){n.vimeostarted||u(n,e,a),n.pausetimer&&"playing"==t[a].sliderstatus&&(t[a].stopByVideo=!0,t[a].c.trigger("stoptimer")),n.currenttime=i.seconds,0!=n.esec&&-1!==n.esec&&n.esec<i.seconds&&!0!==n.nextslidecalled&&(n.loop?(c(n.vimeoplayer),n.vimeoplayer.setCurrentTime(-1!==n.ssec?n.ssec:0)):(n.nse&&(n.nseTriggered=!0,n.nextslidecalled=!0,t[a].c.revnext()),n.vimeoplayer.pause()))}),n.vimeoplayer.on("ended",function(i){n.vimeostarted=!1,w(e,a),t[a].stopByVideo=!1,t[a].c.trigger("starttimer"),t[a].c.trigger("revolution.slide.onvideostop",o(n.vimeoplayer,"vimeo",n)),n.nse&&(n.nseTriggered=!0,t[a].c.revnext()),null!=t[a].videoIsPlaying&&t[a].videoIsPlaying.attr("id")!=e.attr("id")||t.unToggleState(n.videotoggledby)}),n.vimeoplayer.on("pause",function(i){n.vimeostarted=!1,(n.scop&&e.find("rs-poster").length>0||n.bgvideo&&e.find(".rs-fullvideo-cover").length>0)&&(n.bgvideo?punchgs.TweenLite.to(e.find(".rs-fullvideo-cover"),.1,{opacity:1,force3D:"auto",ease:punchgs.Power3.easeInOut}):punchgs.TweenLite.to(e.find("rs-poster"),.1,{opacity:1,visibility:"visible",force3D:"auto",ease:punchgs.Power3.easeInOut}),punchgs.TweenLite.to(e.find("iframe"),.1,{opacity:0,ease:punchgs.Power3.easeInOut})),t[a].stopByVideo=!1,t[a].tonpause=!1,w(e,a),t[a].c.trigger("starttimer"),t[a].c.trigger("revolution.slide.onvideostop",o(n.vimeoplayer,"vimeo",n)),null!=t[a].videoIsPlaying&&t[a].videoIsPlaying.attr("id")!=e.attr("id")||t.unToggleState(n.videotoggledby)}),e.find("rs-poster").unbind("click"),e.find("rs-poster").click(function(){if(!i)return c(n.vimeoplayer),!1}),n.videolistenerexist=!0}},g=function(){document.exitFullscreen&&document.fullscreen?document.exitFullscreen():document.mozCancelFullScreen&&document.mozFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen&&document.webkitIsFullScreen&&document.webkitExitFullscreen()},f=function(){if(void 0!==window.fullScreen)return window.fullScreen;if(void 0!==document.fullscreen)return document.fullscreen;if(void 0!==document.mozFullScreen)return document.mozFullScreen;if(void 0!==document.webkitIsFullScreen)return document.webkitIsFullScreen;var e=jQuery.browser.webkit&&/Apple Computer/.test(navigator.vendor)?42:5;return screen.width==window.innerWidth&&Math.abs(screen.height-window.innerHeight)<e},m=function(e,a,s){var n=t[a].videos[e[0].id];if(i&&n.notonmobile)return!1;n.metaloaded=!0,n.control&&!n.audio||(0!=e.find(".tp-video-play-button").length||i||e.append('<div class="tp-video-play-button"><i class="revicon-right-dir"></i><span class="tp-revstop">&nbsp;</span></div>'),e.find("video, rs-poster, .tp-video-play-button").click(function(){e.hasClass("videoisplaying")?n.video.pause():n.video.play()})),(n.fcover||e.hasClass("rs-fsv")||n.bgvideo)&&(n.fcover||n.bgvideo?(n.html5vid.addClass("fullcoveredvideo"),void 0!==n.ratio&&1!=n.ratio.split(":").length||(n.ratio="16:9"),t.prepareCoveredVideo(a,e)):n.html5vid.addClass("rs-fsv")),r(n.video,"canplaythrough",function(){t.preLoadAudioDone(e,a,"canplaythrough")}),r(n.video,"canplay",function(){t.preLoadAudioDone(e,a,"canplay")}),r(n.video,"progress",function(){t.preLoadAudioDone(e,a,"progress")}),r(n.video,"timeupdate",function(e){0!=n.esec&&-1!=n.esec&&n.esec<n.video.currentTime&&!n.nextslidecalled&&(n.loop?(n.video.play(),n.video.currentTime=-1===n.ssec?0:n.ssec):(n.nse&&(n.nseTriggered=!0,n.nextslidecalled=!0,t[a].jcnah=!0,t[a].c.revnext(),setTimeout(function(){t[a].jcnah=!1},1e3)),n.video.pause()))}),r(n.video,"play",function(){n.nextslidecalled=!1,n.volume=null!=n.volume&&"mute"!=n.volume?parseFloat(n.volcache):n.volume,n.volcache=null!=n.volcache&&"mute"!=n.volcache?parseFloat(n.volcache):n.volcache,t.is_mobile()||t.isSafari11()||(!0===t[a].globalmute?n.video.muted=!0:n.video.muted="mute"==n.volume,n.volcache=jQuery.isNumeric(n.volcache)&&n.volcache>1?n.volcache/100:n.volcache,"mute"==n.volume?n.video.muted=!0:null!=n.volcache&&(n.video.volume=n.volcache)),e.addClass("videoisplaying"),b(e,a),!0!==n.pausetimer||"audio"==n.tag?(t[a].stopByVideo=!1,t[a].c.trigger("revolution.slide.onvideostop",o(n.video,"html5",n))):(t[a].stopByVideo=!0,t[a].c.trigger("revolution.slide.onvideoplay",o(n.video,"html5",n))),n.pausetimer&&"playing"==t[a].sliderstatus&&(t[a].stopByVideo=!0,t[a].c.trigger("stoptimer")),punchgs.TweenLite.to(e.find("rs-poster"),.3,{opacity:0,visibility:"hidden",force3D:"auto",ease:punchgs.Power3.easeInOut}),punchgs.TweenLite.to(e.find(n.tag),.3,{opacity:1,display:"block",ease:punchgs.Power3.easeInOut}),t.toggleState(n.videotoggledby)}),r(n.video,"pause",function(i){!f()&&e.find("rs-poster").length>0&&n.scop&&(punchgs.TweenLite.to(e.find("rs-poster"),.3,{opacity:1,visibility:"visible",force3D:"auto",ease:punchgs.Power3.easeInOut}),punchgs.TweenLite.to(e.find(n.tag),.3,{opacity:0,ease:punchgs.Power3.easeInOut})),e.removeClass("videoisplaying"),t[a].stopByVideo=!1,w(e,a),"audio"!=n.tag&&t[a].c.trigger("starttimer"),t[a].c.trigger("revolution.slide.onvideostop",o(n.video,"html5",n)),null!=t[a].videoIsPlaying&&t[a].videoIsPlaying.attr("id")!=e.attr("id")||t.unToggleState(n.videotoggledby)}),r(n.video,"ended",function(){g(),w(e,a),t[a].stopByVideo=!1,w(e,a),"audio"!=n.tag&&t[a].c.trigger("starttimer"),t[a].c.trigger("revolution.slide.onvideostop",o(n.video,"html5",e.data())),n.nse&&n.video.currentTime>0&&(1==!t[a].jcnah&&(n.nseTriggered=!0,t[a].c.revnext(),t[a].jcnah=!0),setTimeout(function(){t[a].jcnah=!1},1500)),e.removeClass("videoisplaying")})},v=function(e){return"t"===e||!0===e||"true"===e||"f"!==e&&!1!==e&&"false"!==e&&e},y=function(e,t){e.audio="audio"===t;var i=void 0===e.video?[]:e.video.split(";"),r={volume:e.audio?1:"mute",pload:"auto",ratio:"16:9",loop:!0,aplay:"true",fcover:1===e.bgvideo,afs:!0,controls:!1,nse:!0,npom:!1,opom:!1,inline:!0,notonmobile:!1,start:-1,end:-1,doverlay:"none",scop:!1,rwd:!0,speed:1,ploadwait:5,stopAV:1!==e.bgvideo,noInt:!1,volcache:75};for(var o in i)if(i.hasOwnProperty(o)){var s=i[o].split(":");switch(s[0]){case"v":r.volume=s[1];break;case"vd":r.volcache=s[1];break;case"p":r.pload=s[1];break;case"ar":r.ratio=s[1]+(void 0!==s[2]?":"+s[2]:"");break;case"ap":r.aplay=v(s[1]);break;case"fc":r.fcover=v(s[1]);break;case"afs":r.afs=v(s[1]);break;case"vc":r.controls=s[1];break;case"nse":r.nse=v(s[1]);break;case"npom":r.npom=v(s[1]);break;case"opom":r.opom=v(s[1]);break;case"t":r.vtype=s[1];break;case"inl":r.inline=v(s[1]);break;case"nomo":r.notonmobile=v(s[1]);break;case"sta":r.start=s[1]+(void 0!==s[2]?":"+s[2]:"");break;case"end":r.end=s[1]+(void 0!==s[2]?":"+s[2]:"");break;case"do":r.doverlay=s[1];break;case"scop":r.scop=v(s[1]);break;case"rwd":r.rwd=v(s[1]);break;case"sp":r.speed=s[1];break;case"vw":r.ploadwait=parseInt(s[1],0)||5;break;case"sav":r.stopAV=v(s[1]);break;case"noint":r.noInt=v(s[1]);break;case"l":r.loopcache=s[1],r.loop="loop"===s[1]||"loopandnoslidestop"===s[1]||"none"!==s[1]&&v(s[1]);break;case"ptimer":r.pausetimer=v(s[1])}}return void 0!==e.bgvideo&&(r.bgvideo=e.bgvideo),void 0===e.bgvideo||!1!==r.fcover&&"false"!==r.fcover||(r.doverlay="none"),r.noInt&&(r.controls=!1),void 0!==e.mp4&&(r.mp4=e.mp4),void 0!==e.videomp4&&(r.mp4=e.videomp4),void 0!==e.ytid&&(r.ytid=e.ytid),void 0!==e.ogv&&(r.ogv=e.ogv),void 0!==e.webm&&(r.webm=e.webm),void 0!==e.vimeoid&&(r.vimeoid=e.vimeoid),void 0!==e.vatr&&(r.vatr=e.vatr),void 0!==e.videoattributes&&(r.vatr=e.videoattributes),void 0!==e.poster&&(r.poster=e.poster),r.aplay="true"===r.aplay||r.aplay,r.aplay=1!=e.audio&&r.aplay,1===r.bgvideo&&(r.volume="mute"),r.ssec=a(r.start),r.esec=a(r.end),r.pausetimer=void 0===r.pausetimer?"loopandnoslidestop"!==r.loopcache:r.pausetimer,r.inColumn=e._incolumn,r.audio=e.audio,!0!==r.loop&&"true"!==r.loop||!0!==r.nse&&"true"!==r.nse||(r.loop=!1),r},b=function(e,i){if(t[i].playingvideos=void 0===t[i].playingvideos?new Array:t[i].playingvideos,t[i].videos[e[0].id].stopAV&&void 0!==t[i].playingvideos&&t[i].playingvideos.length>0)for(var a in t[i].lastplayedvideos=jQuery.extend(!0,[],t[i].playingvideos),t[i].playingvideos)t[i].playingvideos.hasOwnProperty(a)&&t.stopVideo(t[i].playingvideos[a],i);t[i].playingvideos.push(e),t[i].videoIsPlaying=e},w=function(e,i){void 0!==t[i]&&void 0!==t[i]&&null!=t[i].playingvideos&&jQuery.inArray(e,t[i].playingvideos)>=0&&t[i].playingvideos.splice(jQuery.inArray(e,t[i].playingvideos),1)}}(jQuery);
;
//# sourceMappingURL=scripts.js.map