#!/bin/bash

# AlgoTracker - API Testing Script
# This script demonstrates how to test all backend endpoints
# Prerequisites: curl installed, backend running on localhost:5001

BASE_URL="http://localhost:5001/api"

echo "🧪 AlgoTracker - API Testing"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# ============================================================================
# 1. HEALTH CHECK
# ============================================================================
echo -e "${BLUE}[1] Testing Health Check${NC}"
curl -s -X GET "$BASE_URL/health" | jq '.'
echo ""

# ============================================================================
# 2. REGISTER NEW USER
# ============================================================================
echo -e "${BLUE}[2] Registering New User${NC}"
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "password": "password123"
  }')

echo "$REGISTER_RESPONSE" | jq '.'

# Extract and save token
TOKEN=$(echo "$REGISTER_RESPONSE" | jq -r '.token')
echo -e "${GREEN}✓ Token: ${TOKEN:0:20}...${NC}"
echo ""

# ============================================================================
# 3. LOGIN WITH CREDENTIALS
# ============================================================================
echo -e "${BLUE}[3] Login with Email & Password${NC}"
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "password123"
  }')

echo "$LOGIN_RESPONSE" | jq '.'
echo ""

# ============================================================================
# 4. GET CURRENT USER INFO
# ============================================================================
echo -e "${BLUE}[4] Get Current User Info (Protected)${NC}"
curl -s -X GET "$BASE_URL/auth/me" \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""

# ============================================================================
# 5. CREATE PROBLEMS
# ============================================================================
echo -e "${BLUE}[5] Creating DSA Problems${NC}"

# Problem 1: Arrays - Easy
echo "Creating Problem 1: Two Sum"
PROB1=$(curl -s -X POST "$BASE_URL/problems" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Two Sum",
    "topic": "Arrays",
    "difficulty": "Easy",
    "solvedDate": "2024-01-15T10:00:00Z"
  }')
echo "$PROB1" | jq '.'
PROB1_ID=$(echo "$PROB1" | jq -r '.data._id')
echo -e "${GREEN}✓ Problem 1 ID: $PROB1_ID${NC}"
echo ""

# Problem 2: Linked Lists - Medium
echo "Creating Problem 2: Reverse Linked List"
PROB2=$(curl -s -X POST "$BASE_URL/problems" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Reverse a Linked List",
    "topic": "Linked Lists",
    "difficulty": "Medium",
    "solvedDate": "2024-01-14T15:00:00Z"
  }')
echo "$PROB2" | jq '.'
PROB2_ID=$(echo "$PROB2" | jq -r '.data._id')
echo -e "${GREEN}✓ Problem 2 ID: $PROB2_ID${NC}"
echo ""

# Problem 3: Trees - Hard
echo "Creating Problem 3: Binary Tree Max Path Sum"
PROB3=$(curl -s -X POST "$BASE_URL/problems" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Binary Tree Maximum Path Sum",
    "topic": "Trees",
    "difficulty": "Hard",
    "solvedDate": "2024-01-13T09:00:00Z"
  }')
echo "$PROB3" | jq '.'
PROB3_ID=$(echo "$PROB3" | jq -r '.data._id')
echo -e "${GREEN}✓ Problem 3 ID: $PROB3_ID${NC}"
echo ""

# ============================================================================
# 6. GET ALL PROBLEMS
# ============================================================================
echo -e "${BLUE}[6] Get All Problems${NC}"
curl -s -X GET "$BASE_URL/problems" \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""

# ============================================================================
# 7. GET PROBLEMS WITH FILTERS
# ============================================================================
echo -e "${BLUE}[7] Get Problems Filtered by Topic (Arrays)${NC}"
curl -s -X GET "$BASE_URL/problems?topic=Arrays" \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""

# ============================================================================
# 8. GET TODAY'S PROBLEMS (Before Revision)
# ============================================================================
echo -e "${BLUE}[8] Get Problems Due Today (Before Revisions)${NC}"
curl -s -X GET "$BASE_URL/problems/today" \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""

# ============================================================================
# 9. MARK PROBLEM AS REVISED (SUCCESS)
# ============================================================================
echo -e "${BLUE}[9] Mark Problem 1 as Revised (SUCCESS)${NC}"
echo "Problem: Two Sum (Stage 0 → 1, Next review in 3 days)"
REVISE1=$(curl -s -X PUT "$BASE_URL/problems/$PROB1_ID/revise" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "success"
  }')
echo "$REVISE1" | jq '.'
echo ""

# ============================================================================
# 10. MARK PROBLEM AS FAILED
# ============================================================================
echo -e "${BLUE}[10] Mark Problem 2 as Failed (Forgot)${NC}"
echo "Problem: Reverse Linked List (Reset to Stage 0, Next review in 1 day)"
REVISE2=$(curl -s -X PUT "$BASE_URL/problems/$PROB2_ID/revise" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "failed"
  }')
echo "$REVISE2" | jq '.'
echo ""

# ============================================================================
# 11. GET SINGLE PROBLEM
# ============================================================================
echo -e "${BLUE}[11] Get Single Problem Details${NC}"
curl -s -X GET "$BASE_URL/problems/$PROB1_ID" \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""

# ============================================================================
# 12. UPDATE A PROBLEM
# ============================================================================
echo -e "${BLUE}[12] Update Problem Title & Difficulty${NC}"
curl -s -X PUT "$BASE_URL/problems/$PROB1_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Two Sum (Updated)",
    "difficulty": "Medium"
  }' | jq '.'
echo ""

# ============================================================================
# 13. GET REVISION STATISTICS
# ============================================================================
echo -e "${BLUE}[13] Get Revision Statistics${NC}"
curl -s -X GET "$BASE_URL/problems/stats/overview" \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""

# ============================================================================
# 14. SIMULATE MULTIPLE REVISIONS (Show Progression)
# ============================================================================
echo -e "${BLUE}[14] Simulating Multiple Revisions for Problem 3${NC}"
echo "Revision 1 (Stage 0→1, Next: Day 3)"
curl -s -X PUT "$BASE_URL/problems/$PROB3_ID/revise" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "success"}' | jq '.data | {revisionStage, nextRevisionDate, revisionCount}'
echo ""

echo "Revision 2 (Stage 1→2, Next: Day 10)"
curl -s -X PUT "$BASE_URL/problems/$PROB3_ID/revise" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "success"}' | jq '.data | {revisionStage, nextRevisionDate, revisionCount}'
echo ""

echo "Revision 3 (Stage 2→3, Next: Day 17)"
curl -s -X PUT "$BASE_URL/problems/$PROB3_ID/revise" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "success"}' | jq '.data | {revisionStage, nextRevisionDate, revisionCount}'
echo ""

# ============================================================================
# 15. DELETE A PROBLEM
# ============================================================================
echo -e "${BLUE}[15] Delete a Problem${NC}"
echo "Deleting Problem with ID: $PROB2_ID"
curl -s -X DELETE "$BASE_URL/problems/$PROB2_ID" \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""

# ============================================================================
# 16. FINAL STATISTICS
# ============================================================================
echo -e "${BLUE}[16] Final Revision Statistics${NC}"
curl -s -X GET "$BASE_URL/problems/stats/overview" \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""

# ============================================================================
# 17. ERROR HANDLING TESTS
# ============================================================================
echo -e "${BLUE}[17] Error Handling Tests${NC}"

echo "Test 17a: Invalid Email Registration"
curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bob",
    "email": "invalid-email",
    "password": "pass123"
  }' | jq '.'
echo ""

echo "Test 17b: Password Too Short"
curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bob",
    "email": "bob@example.com",
    "password": "123"
  }' | jq '.'
echo ""

echo "Test 17c: Access Protected Route Without Token"
curl -s -X GET "$BASE_URL/problems" \
  -H "Content-Type: application/json" | jq '.'
echo ""

echo "Test 17d: Invalid Problem Topic"
curl -s -X POST "$BASE_URL/problems" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Some Problem",
    "topic": "InvalidTopic",
    "difficulty": "Easy"
  }' | jq '.'
echo ""

# ============================================================================
# SUMMARY
# ============================================================================
echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ API Testing Complete!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
echo ""
echo "Summary of Tests:"
echo "✓ Health check"
echo "✓ User registration & login"
echo "✓ Create 3 problems"
echo "✓ Retrieve all problems"
echo "✓ Filter problems by topic"
echo "✓ Mark problems as revised/failed"
echo "✓ Update problem details"
echo "✓ Get revision statistics"
echo "✓ Simulate revision progression"
echo "✓ Delete problem"
echo "✓ Error handling"
echo ""
echo -e "${BLUE}User Token (save for Postman testing):${NC}"
echo "$TOKEN"
echo ""
