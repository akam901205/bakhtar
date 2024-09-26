{ pkgs ? import <nixpkgs> {} }:

let
  openssl = pkgs.openssl_3;
in
pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs
    mysql80
    openssl
    pkg-config
  ];
  shellHook = ''
    export OPENSSL_DIR="${openssl}"
    export OPENSSL_LIB_DIR="${openssl.out}/lib"
    export OPENSSL_INCLUDE_DIR="${openssl.dev}/include"
    export LD_LIBRARY_PATH="${openssl.out}/lib:$LD_LIBRARY_PATH"
    export PKG_CONFIG_PATH="${openssl.dev}/lib/pkgconfig:$PKG_CONFIG_PATH"
    export PRISMA_CLI_QUERY_ENGINE_TYPE=binary
    export PRISMA_CLIENT_ENGINE_TYPE=binary
    export NODE_OPTIONS="--experimental-loader=file://$PWD/loader.mjs"
  '';
}