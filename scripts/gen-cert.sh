#!/usr/bin/env bash
# Génère un certificat TLS local pour servir EurekAI en HTTPS (cf. CLAUDE.md
# "Clé Mistral navigateur"). HTTPS débloque WebCrypto/IndexedDB sur tablette/LAN
# (secure context) et chiffre la clé en transit.
#
# Usage :
#   ./scripts/gen-cert.sh                 # localhost uniquement
#   ./scripts/gen-cert.sh 192.168.1.42    # + IP LAN (tablette)
#
# Puis :
#   export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
#   npm run dev      # dev (Vite + Express en HTTPS)
#   npm start        # prod (Express sert dist/ en HTTPS)
set -euo pipefail

CERT_DIR="${CERT_DIR:-certs}"
mkdir -p "$CERT_DIR"
KEY="$CERT_DIR/key.pem"
CERT="$CERT_DIR/cert.pem"
LAN_IP="${1:-}"

if command -v mkcert >/dev/null 2>&1; then
  echo "→ mkcert (CA locale, zéro warning navigateur après 'mkcert -install' sur chaque appareil)"
  # shellcheck disable=SC2086
  mkcert -key-file "$KEY" -cert-file "$CERT" localhost 127.0.0.1 ::1 ${LAN_IP}
else
  echo "→ openssl self-signed (warning navigateur à accepter une fois ; mkcert recommandé)"
  SAN="DNS:localhost,IP:127.0.0.1,IP:::1"
  [ -n "$LAN_IP" ] && SAN="$SAN,IP:$LAN_IP"
  openssl req -x509 -newkey rsa:2048 -nodes -days 825 \
    -keyout "$KEY" -out "$CERT" \
    -subj "/CN=localhost" -addext "subjectAltName=$SAN"
fi

echo "✓ clé : $KEY"
echo "✓ cert: $CERT"
echo ""
echo "  export HTTPS_KEY=$KEY HTTPS_CERT=$CERT"
