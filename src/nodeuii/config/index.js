import _ from 'lodash';
let config = {
    "env": process.env.NODE_ENV //"development" 、"production"  
};
if (false) {
    console.log(123)
}
//开发环境
if (process.env.NODE_ENV == 'development') {
    const localConfig = {
        port: 8081
    };
    config = _.extend(config, localConfig);
}

//线上环境
if (process.env.NODE_ENV == "production") {
    const proConfig = {
        port: 8081
    };
    config = _.extend(config, proConfig);
}
export default config;