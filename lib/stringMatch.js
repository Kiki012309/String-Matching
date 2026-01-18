// Levenshtein Distance Algorithm untuk fuzzy matching
function levenshteinDistance(str1, str2) {
  const len1 = str1.length
  const len2 = str2.length
  const matrix = []

  // Initialize matrix
  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i]
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j
  }

  // Fill matrix
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      )
    }
  }

  return matrix[len1][len2]
}

// Calculate similarity score (0-1, where 1 is perfect match)
function calculateSimilarity(str1, str2) {
  const distance = levenshteinDistance(str1.toLowerCase(), str2.toLowerCase())
  const maxLength = Math.max(str1.length, str2.length)
  return maxLength === 0 ? 1 : 1 - distance / maxLength
}

// Check if fuzzy match is acceptable (tolerance of 2-3 characters difference)
function isFuzzyMatch(str1, str2, tolerance = 3) {
  const distance = levenshteinDistance(str1.toLowerCase(), str2.toLowerCase())
  return distance <= tolerance
}

export { calculateSimilarity, isFuzzyMatch, levenshteinDistance }

