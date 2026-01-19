/**
 * BRUTE FORCE Algorithm
 * Simple pattern matching by checking every position
 */
export function bruteForce(text, pattern) {
  const startTime = performance.now()
  const matches = []
  const n = text.length
  const m = pattern.length
  let comparisons = 0

  const textLower = text.toLowerCase()
  const patternLower = pattern.toLowerCase()

  for (let i = 0; i <= n - m; i++) {
    let j = 0
    while (j < m && textLower[i + j] === patternLower[j]) {
      comparisons++
      j++
    }
    if (j < m) comparisons++
    
    if (j === m) {
      matches.push(i)
    }
  }

  const endTime = performance.now()
  return {
    algorithm: 'Brute Force',
    matches: matches.length,
    positions: matches,
    comparisons,
    executionTime: (endTime - startTime).toFixed(4),
    timeComplexity: 'O(n×m)'
  }
}

/**
 * KNUTH-MORRIS-PRATT (KMP) Algorithm
 */
export function kmp(text, pattern) {
  const startTime = performance.now()
  const matches = []
  let comparisons = 0

  const textLower = text.toLowerCase()
  const patternLower = pattern.toLowerCase()
  const n = textLower.length
  const m = patternLower.length

  const failure = buildFailureFunction(patternLower)
  
  let i = 0, j = 0
  while (i < n) {
    comparisons++
    if (textLower[i] === patternLower[j]) {
      i++
      j++
      if (j === m) {
        matches.push(i - j)
        j = failure[j - 1]
      }
    } else {
      if (j > 0) {
        j = failure[j - 1]
      } else {
        i++
      }
    }
  }

  const endTime = performance.now()
  return {
    algorithm: 'KMP',
    matches: matches.length,
    positions: matches,
    comparisons,
    executionTime: (endTime - startTime).toFixed(4),
    timeComplexity: 'O(n+m)'
  }
}

function buildFailureFunction(pattern) {
  const m = pattern.length
  const failure = new Array(m).fill(0)
  let j = 0

  for (let i = 1; i < m; i++) {
    while (j > 0 && pattern[i] !== pattern[j]) {
      j = failure[j - 1]
    }
    if (pattern[i] === pattern[j]) {
      j++
    }
    failure[i] = j
  }
  return failure
}

/**
 * BOYER-MOORE Algorithm
 */
export function boyerMoore(text, pattern) {
  const startTime = performance.now()
  const matches = []
  let comparisons = 0

  const textLower = text.toLowerCase()
  const patternLower = pattern.toLowerCase()
  const n = textLower.length
  const m = patternLower.length

  const badChar = buildBadCharTable(patternLower)

  let shift = 0
  while (shift <= n - m) {
    let j = m - 1
    while (j >= 0 && patternLower[j] === textLower[shift + j]) {
      comparisons++
      j--
    }
    if (j >= 0) comparisons++

    if (j < 0) {
      matches.push(shift)
      shift += (shift + m < n) ? m - badChar[textLower.charCodeAt(shift + m)] : 1
    } else {
      const badCharShift = Math.max(1, j - badChar[textLower.charCodeAt(shift + j)])
      shift += badCharShift
    }
  }

  const endTime = performance.now()
  return {
    algorithm: 'Boyer-Moore',
    matches: matches.length,
    positions: matches,
    comparisons,
    executionTime: (endTime - startTime).toFixed(4),
    timeComplexity: 'O(n/m)'
  }
}

function buildBadCharTable(pattern) {
  const m = pattern.length
  const badChar = new Array(256).fill(-1)
  for (let i = 0; i < m; i++) {
    badChar[pattern.charCodeAt(i)] = i
  }
  return badChar
}

/**
 * Search journals with all three algorithms
 */
export function searchWithAllAlgorithms(journals, query) {
  if (!query || query.trim() === '') {
    return null
  }

  const queryLower = query.toLowerCase().trim()
  const results = {
    bruteForce: { journals: [], totalComparisons: 0, totalTime: 0 },
    kmp: { journals: [], totalComparisons: 0, totalTime: 0 },
    boyerMoore: { journals: [], totalComparisons: 0, totalTime: 0 }
  }

  // Brute Force
  const bfStart = performance.now()
  journals.forEach(journal => {
    const searchText = `${journal.title} ${journal.authors} ${journal.keywords || ''}`
    const result = bruteForce(searchText, queryLower)
    results.bruteForce.totalComparisons += result.comparisons
    if (result.matches > 0) {
      results.bruteForce.journals.push(journal)
    }
  })
  results.bruteForce.totalTime = performance.now() - bfStart

  // KMP
  const kmpStart = performance.now()
  journals.forEach(journal => {
    const searchText = `${journal.title} ${journal.authors} ${journal.keywords || ''}`
    const result = kmp(searchText, queryLower)
    results.kmp.totalComparisons += result.comparisons
    if (result.matches > 0) {
      results.kmp.journals.push(journal)
    }
  })
  results.kmp.totalTime = performance.now() - kmpStart

  // Boyer-Moore
  const bmStart = performance.now()
  journals.forEach(journal => {
    const searchText = `${journal.title} ${journal.authors} ${journal.keywords || ''}`
    const result = boyerMoore(searchText, queryLower)
    results.boyerMoore.totalComparisons += result.comparisons
    if (result.matches > 0) {
      results.boyerMoore.journals.push(journal)
    }
  })
  results.boyerMoore.totalTime = performance.now() - bmStart

  return {
    query: query,
    bruteForce: {
      algorithm: 'Brute Force',
      matches: results.bruteForce.journals.length,
      comparisons: results.bruteForce.totalComparisons,
      executionTime: results.bruteForce.totalTime.toFixed(4),
      timeComplexity: 'O(n×m)',
      journals: results.bruteForce.journals
    },
    kmp: {
      algorithm: 'Knuth-Morris-Pratt (KMP)',
      matches: results.kmp.journals.length,
      comparisons: results.kmp.totalComparisons,
      executionTime: results.kmp.totalTime.toFixed(4),
      timeComplexity: 'O(n+m)',
      journals: results.kmp.journals
    },
    boyerMoore: {
      algorithm: 'Boyer-Moore',
      matches: results.boyerMoore.journals.length,
      comparisons: results.boyerMoore.totalComparisons,
      executionTime: results.boyerMoore.totalTime.toFixed(4),
      timeComplexity: 'O(n/m) best',
      journals: results.boyerMoore.journals
    }
  }
}

// Levenshtein Distance untuk fuzzy matching
function levenshteinDistance(str1, str2) {
  const len1 = str1.length
  const len2 = str2.length
  const matrix = []

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i]
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      )
    }
  }
  return matrix[len1][len2]
}

function calculateSimilarity(str1, str2) {
  const distance = levenshteinDistance(str1.toLowerCase(), str2.toLowerCase())
  const maxLength = Math.max(str1.length, str2.length)
  return maxLength === 0 ? 1 : 1 - distance / maxLength
}

function isFuzzyMatch(str1, str2, tolerance = 3) {
  const distance = levenshteinDistance(str1.toLowerCase(), str2.toLowerCase())
  return distance <= tolerance
}

export { calculateSimilarity, isFuzzyMatch, levenshteinDistance }

