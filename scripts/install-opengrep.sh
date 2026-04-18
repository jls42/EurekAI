#!/bin/bash
# Installe Opengrep (SAST) dans ~/.local/bin/ si non deja present.
# Binaire standalone ~40Mo, fork open-source de Semgrep CE.
#
# Usage : ./scripts/install-opengrep.sh
# Verification : opengrep --version
set -euo pipefail

VERSION="v1.19.0"
INSTALL_DIR="$HOME/.local/bin"
BIN="$INSTALL_DIR/opengrep"

if [ -x "$BIN" ] && "$BIN" --version 2>/dev/null | grep -q "^${VERSION#v}"; then
  echo "opengrep ${VERSION} deja installe dans $BIN"
  exit 0
fi

os="$(uname -s)"
arch="$(uname -m)"

case "$os-$arch" in
  Linux-x86_64)  asset="opengrep_manylinux_x86"     ;;
  Linux-aarch64) asset="opengrep_manylinux_aarch64" ;;
  Darwin-x86_64) asset="opengrep_osx_x86"           ;;
  Darwin-arm64)  asset="opengrep_osx_arm64"         ;;
  *)
    echo "error: plateforme non supportee ($os-$arch). Voir https://github.com/opengrep/opengrep/releases" >&2
    exit 1
    ;;
esac

mkdir -p "$INSTALL_DIR"
url="https://github.com/opengrep/opengrep/releases/download/${VERSION}/${asset}"
echo "Telechargement $url vers $BIN..."
curl -fsSL -o "$BIN" "$url"
chmod +x "$BIN"

"$BIN" --version
echo "Installation reussie. Ajouter $INSTALL_DIR au PATH si necessaire."
