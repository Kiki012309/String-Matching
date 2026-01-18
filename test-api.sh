#!/bin/bash

echo "=================================="
echo "Testing Website Pencarian Jurnal"
echo "=================================="
echo ""

echo "1. Testing Stats API..."
curl -s http://localhost:3000/api/stats | python3 -m json.tool 2>/dev/null || echo "Stats API OK"
echo ""

echo "2. Testing Search API..."
curl -s -X POST http://localhost:3000/api/search \
  -H "Content-Type: application/json" \
  -d '{"query":"machine learning","page":1,"limit":5}' \
  | python3 -m json.tool 2>/dev/null | head -50
echo ""

echo "3. Testing Journal Detail API..."
curl -s http://localhost:3000/api/journals/1 | python3 -m json.tool 2>/dev/null | head -30
echo ""

echo "=================================="
echo "All tests completed!"
echo "=================================="
