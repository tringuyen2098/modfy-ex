const dev = {
    host: 'a',
    port: 'b',
    name: 'c'
}


const prod = {
    host: 'a',
    port: 'b',
    name: 'c'
}

const config = {dev, prod};
const env = process.env.NODE_ENV;

export default config[env];
