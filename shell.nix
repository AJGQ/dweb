{ pkgs ? import <nixpkgs> {} }:
with pkgs;

stdenv.mkDerivation {
  name = "dweb-env";
  buildInputs = [
    # Project dependencies
    mongodb
    nodejs-10_x
    nodePackages_10_x.npm
    libxslt
    libxml2
  ];
}
