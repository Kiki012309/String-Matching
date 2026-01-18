-- Create journals table
CREATE TABLE IF NOT EXISTS journals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  authors TEXT NOT NULL,
  publication_date DATE NOT NULL,
  abstract TEXT,
  keywords VARCHAR(500),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FULLTEXT INDEX idx_title (title),
  FULLTEXT INDEX idx_authors (authors),
  FULLTEXT INDEX idx_keywords (keywords)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
