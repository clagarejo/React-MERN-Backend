const { isValid } = require('date-fns');

 const isDate = ( value) => {

    if ( !value ) return false

    const fecha = value

    return isValid( fecha )
};

module.exports = {
    isDate
};
