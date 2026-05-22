{
  description = "AUC Mathematics practical-internship deliverables: report (Typst) and slide deck (React + Vite).";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let pkgs = import nixpkgs { inherit system; };
      in {
        devShells.default = pkgs.mkShell {
          name = "internship-deliverables";
          packages = [
            pkgs.typst
            pkgs.nodejs_22
            pkgs.pnpm
            pkgs.git
            pkgs.gh
          ];

          shellHook = ''
            echo "internship dev shell — typst $(typst --version | head -n1), node $(node --version), pnpm $(pnpm --version)"
          '';
        };
      });
}
