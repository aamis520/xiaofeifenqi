/**
 * 路由管理
*/
const path = require('path');
const glob = require('glob');
const utils = require('./utils');

function getAllRouteFiles () {
    return new Promise( ( resolve,reject ) => {
        const routesFilesPathScheme = path.join( utils.projectPath,'./router/**/*.js' );

        glob( routesFilesPathScheme,{ dot: false }, ( err,files ) => {
            if ( err ) throw err 

            resolve( files );
        } )
    } );
}

const routerManager = {
    async addRoutes ( app ) {
        if ( !app ) {
            return false;
        }

        const routeFiles = await getAllRouteFiles();

        let exportObj;
        for ( let routeFile of routeFiles ) {
            exportObj = require(routeFile);
            exportObj( app );
        }

        return true;
    }
};

module.exports = routerManager;