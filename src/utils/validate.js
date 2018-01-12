/**
*  校验
*	@date: 2017.09.06
*/

export function validateName ( name ) {
	const reg = /A-Za-z/;

	return reg.test( name )
}

export function validateMachineCode ( code ) {
	if ( !code ) {
		return false;
	}

	if ( code.length < 6 || code.length > 32 ) {
		return -1;
	}

	const strRegex = /[^A-Za-z0-9_]/;
	if ( strRegex.test(code) ) {
		return -2;
	}

	return true;
}

export function validateCryptKey ( key ) {
	if ( !key ) {
		return false;
	}

	if ( key.length < 4 || key.length > 40 ) {
		return -1;
	}

	const strRegex = /[^A-Za-z0-9]/;
	if ( strRegex.test(key) ) {
		return -2;
	}

	return true;
}

export function validateUrl ( url ) {
	const strRegex = "(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]";      
    const re = new RegExp(strRegex);      
    const ret = re.test(url);

    return ret;  
}


