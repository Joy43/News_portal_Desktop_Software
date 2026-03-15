

rm -f "app/(start)/._welcome.tsx"

find . -type f \( -name '._*' -o -name '.__*' -o -name '.DS_Store' \) -delete

dot_clean . || true

rm -rf .expo
rm -rf node_modules/.cache

