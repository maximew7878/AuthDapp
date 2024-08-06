module.exports = {
    contracts_build_directory: "./src/contracts",
    networks: {
        development: {
            host: "127.0.0.1", // Localhost (default: none)
            port: 7545, // Standard Ethereum port (default: none)
            network_id: "*", // Any network (default: none)
            gas: 6721975,
            gasPrice: 20000000000,
        },
    },

    // Configure your compilers
    compilers: {
        solc: {
            version: "0.5.1", // Fetch exact version from solc-bin (default: truffle's version)
        },
    },
};
